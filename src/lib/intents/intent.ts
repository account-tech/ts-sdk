import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { DynamicFieldInfo, SuiClient } from "@mysten/sui/client";
import { newParams } from "../../.gen/account-protocol/intents/functions";
import { confirmExecution } from "../../.gen/account-protocol/account/functions";
import { ActionsArgs, IntentArgs, IntentFields } from "./types";
import { Outcome } from "../outcomes";
import { CLOCK } from "../../types/constants";

export interface Intent {
    init(): Promise<void>;

    request(
        tx: Transaction, 
        accountGenerics: [string, string], 
        auth: TransactionObjectInput, 
        account: string, 
        params: TransactionObjectInput, 
        outcome: TransactionObjectInput, 
        actionArgs: ActionsArgs
    ): TransactionResult;
    
    execute(
        tx: Transaction, 
        accountGenerics: [string, string], 
        executable: TransactionObjectInput, 
        ...args: any[]
    ): TransactionResult;
    
    clearEmpty(
        tx: Transaction, 
        accountGenerics: [string, string], 
        account: TransactionObjectInput, 
        key: string
    ): TransactionResult;
    
    deleteExpired(
        tx: Transaction, 
        accountGenerics: [string, string], 
        account: TransactionObjectInput, 
        key: string
    ): TransactionResult;
}

export class Intent {
    args!: ActionsArgs;

    constructor(
        public client: SuiClient,
        public account: string,
        public outcome: Outcome,
        public fields: IntentFields,
    ) { }

    static createParams(tx: Transaction, intentArgs: IntentArgs): TransactionResult {
        return newParams(tx, { 
            key: intentArgs.key, 
            description: intentArgs.description ?? "",
            executionTimes: intentArgs.executionTimes ?? [0n],
            expirationTime: intentArgs.expirationTime ?? BigInt(Math.floor(Date.now()) + 7 * 24 * 60 * 60 * 1000),
            clock: CLOCK 
        });
    }

    completeExecution(tx: Transaction, accountGenerics: [string, string], executable: TransactionObjectInput): TransactionResult {
        return confirmExecution(tx, accountGenerics, { account: this.account!, executable });
    }

    async fetchActions(parentId: string) {
        // get the actions in each proposal bag
        const { data } = await this.client.getDynamicFields({ parentId });
        // sort actions by ascending order 
        const ids = data
            .sort((a, b) => Number(a.name.value) - Number(b.name.value))
            .map(df => df.objectId);

        let actions: any[] = [];
        if (data.length > 0) {
            // Process in batches of 50 due to API limitations
            const allActionDfs = [];
            for (let i = 0; i < ids.length; i += 50) {
                const batchIds = ids.slice(i, i + 50);
                const batchResults = await this.client.multiGetObjects({
                    ids: batchIds,
                    options: { showContent: true }
                });
                allActionDfs.push(...batchResults);
            }
            actions = allActionDfs.map((df: any) => df.data?.content.fields.value);
        }
        if (actions.length === 0) {
            throw new Error('No actions found for the proposal');
        }

        return actions;
    }

    assertProposalExists() {
        if (!this.fields?.key) {
            throw new Error(`Intent key does not exist: ${this.fields.key}`);
        }
    }

    hasExpired(): boolean {
        return this.fields.expirationTime < Date.now();
    }
}

export class Intents {
    private intentRegistry: Record<string, typeof Intent>;
    private outcomeRegistry: Record<string, typeof Outcome>;
    intents: Record<string, Intent> = {};

    private constructor(
        public client: SuiClient,
        public accountId: string,
        public intentsBagId: string,
        intentRegistry: Record<string, typeof Intent>,
        outcomeRegistry: Record<string, typeof Outcome>,
    ) { 
        this.intentRegistry = intentRegistry;
        this.outcomeRegistry = outcomeRegistry;
    }

    static async init(
        client: SuiClient,
        accountId: string,
        intentsBagId: string,
        intentRegistry: Record<string, typeof Intent>,
        outcomeRegistry: Record<string, typeof Outcome>,
    ) {
        const intents = new Intents(client, accountId, intentsBagId, intentRegistry, outcomeRegistry);
        await intents.refresh();
        return intents;
    }

    async fetchIntents(intentsBagId: string): Promise<Intent[]> {
        // get Intents with actions
        let dfs: DynamicFieldInfo[] = [];
        let data: DynamicFieldInfo[];
        let nextCursor: string | null = null;
        let hasNextPage = true;
        while (hasNextPage) {
            ({ data, nextCursor, hasNextPage } = await this.client.getDynamicFields({
                parentId: intentsBagId,
                cursor: nextCursor
            }));
            dfs.push(...data);
            nextCursor = nextCursor;
        }
        const dfIds = dfs.map((df) => df.objectId);
        // Process in batches of 50 due to API limitations
        const intentsDfs = [];
        for (let i = 0; i < dfIds.length; i += 50) {
            const batch = dfIds.slice(i, i + 50);
            const batchResults = await this.client.multiGetObjects({
                ids: batch,
                options: { showContent: true }
            });
            intentsDfs.push(...batchResults);
        }
        const intents = await Promise.all(intentsDfs.map(async (df: any) => {
            const intentRaw = (df.data?.content as any).fields.value;
            
            const outcomeType = this.outcomeRegistry[intentRaw.outcome.type.name];
            if (!outcomeType) {
                throw new Error(`Outcome type ${intentRaw.outcome.type.name} not found`);
            }
            const outcome = new outcomeType(this.accountId, intentRaw.key, intentRaw.outcome);
            
            const fields: IntentFields = {
                type: intentRaw.type.name,
                key: intentRaw.key,
                description: intentRaw.description,
                account: intentRaw.account,
                creator: intentRaw.creator,
                creationTime: intentRaw.creationTime,
                executionTimes: intentRaw.executionTimes,
                expirationTime: intentRaw.expirationTime,
                role: intentRaw.role,
                actionsId: intentRaw.actions.id,
            }

            let intentType = this.intentRegistry[fields.type];
            if (!intentType) {
                throw new Error(`Intent type ${fields.type} not found`);
            }
            let intent = new intentType(this.client, this.accountId, outcome, fields);
            await intent.init();
            return intent;
        }));

        return intents;
    }

    async refresh() {
        const intents = await this.fetchIntents(this.intentsBagId);
        this.intents = intents.reduce((acc, intent) => {
            acc[intent.fields.key] = intent;
            return acc;
        }, {} as Record<string, Intent>);
    }
}