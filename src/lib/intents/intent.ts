import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import { newParams } from "../../.gen/account-protocol/intents/functions";
import { confirmExecution } from "../../.gen/account-protocol/account/functions";
import { ActionsArgs, IntentArgs, IntentFields } from "./types";
import { Outcome } from "../outcomes";
import { CLOCK } from "../../types/constants";

export abstract class Intent {
    args!: ActionsArgs;

    constructor(
        public client: SuiClient,
        public account: string,
        public outcome: Outcome,
        public fields: IntentFields,
    ) { }

    // abstract init(client: SuiClient, account: string, outcome: Outcome, fields: IntentFields): Promise<Intent>;
    abstract request(
        tx: Transaction, 
        accountGenerics: [string, string], 
        auth: TransactionObjectInput, 
        account: string, 
        params: TransactionObjectInput, 
        outcome: TransactionObjectInput, 
        actionArgs: ActionsArgs
    ): TransactionResult;
    
    abstract execute(
        tx: Transaction, 
        accountGenerics: [string, string], 
        executable: TransactionObjectInput, 
        ...args: any[]
    ): TransactionResult;
    
    abstract clearEmpty(
        tx: Transaction, 
        accountGenerics: [string, string], 
        account: TransactionObjectInput, 
        key: string
    ): TransactionResult;
    
    abstract deleteExpired(
        tx: Transaction, 
        accountGenerics: [string, string], 
        account: TransactionObjectInput, 
        key: string
    ): TransactionResult;

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
            const actionDfs = await this.client.multiGetObjects({
                ids,
                options: { showContent: true }
            });
            actions = actionDfs.map((df: any) => df.data?.content.fields.value);
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
