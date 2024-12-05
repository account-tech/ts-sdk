import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import { ActionsArgs, ProposalArgs, ProposalFields } from "src/types/proposal-types";
import { Outcome } from "./outcome";

export interface Proposal {
    args?: ActionsArgs;
    
    init(client: SuiClient, account: string): Promise<Proposal>;
    propose(tx: Transaction, auth: TransactionObjectInput, outcome: TransactionObjectInput, account: string, accountGenerics: [string, string], proposalArgs: ProposalArgs, actionArgs: ActionsArgs): TransactionResult;
    execute(tx: Transaction, executable: TransactionObjectInput, accountGenerics: [string, string], ...args: any[]): TransactionResult;
}


export class Proposal {
    constructor(
        public client: SuiClient,
        public account: string,
        public outcome: Outcome,
        public fields: ProposalFields,
    ) {}

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
            actions = actionDfs.map((df: any) => ({
                type: df.data?.content?.fields.value.type,
                ...df.data?.content?.fields.value.fields
            }));
        }

        return actions;
    }

    assertProposal() {
        if (!this.fields?.key) {
            throw new Error("Proposal is not set. Please set the proposal before calling this method.");
        }
    }
}

    // // === Kiosk === 

    // proposeTake(
    //     tx: Transaction,
    //     args: TakeArgs,
    // ): TransactionResult {
    //     this.assertMultisig();
    //     return kiosk.proposeTake(
    //         tx,
    //         {
    //             account: this.account!,
    //             key: args.key,
    //             description: args.description,
    //             executionTime: BigInt(args.executionTime),
    //             expirationTime: BigInt(args.expirationTime),
    //             name: args.name,
    //             nftIds: args.nftIds,
    //             recipient: args.recipient,
    //         }
    //     );
    // }


    // === Transfers ===

    // proposeSend(
    //     tx: Transaction,
    //     key: string,
    //     executionTime: number,
    //     expirationTime: number,
    //     description: string,
    //     objects: string[],
    //     recipients: string[],
    // ) {
    //     if ((toAdd || weights) && (toAdd?.length !== weights?.length)) {
    //         throw new Error("The number of members to add does not match the number of weights provided.");
    //     }
    //     tx.moveCall({
    //         target: `${this.packageId}::config::propose_modify`,
    //         arguments: [
    //             typeof(this.account) === "string" ? tx.object(this.account) : this.account, 
    //             tx.pure(key), 
    //             tx.pure(executionTime), 
    //             tx.pure(expirationTime), 
    //             tx.pure(description), 
    //             name ? tx.pure([name]) : tx.pure([]), 
    //             threshold ? tx.pure([threshold]) : tx.pure([]), 
    //             toRemove ? tx.pure(toRemove) : tx.pure([]), 
    //             toAdd ? tx.pure(toAdd) : tx.pure([]),
    //             weights ? tx.pure(weights) : tx.pure([]),
    //         ],
    //     });
    // }
