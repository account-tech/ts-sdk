
import { bcs } from "@mysten/sui/bcs";
import { Transaction, TransactionResult, TransactionArgument } from "@mysten/sui/transactions";
import { proposeModify, executeModify } from "../../../.gen/kraken/config/functions.js";

export class ProposalService {
    public packageId: string;
    public multisig?: string | TransactionArgument;
    
    constructor(packageId: string, multisig?: string) {
        this.packageId = packageId;
        this.multisig = multisig;
    }

    // setMultisig(multisigId: string) {
    //     this.multisigId = multisigId;
    // }

    withMultisig(multisig: string | TransactionArgument): this {
        this.multisig = multisig;
        return this;
    }
    
    // === Config ===
    
    proposeModify(
        tx: Transaction,
        key: string, 
        executionTime: number,
        expirationEpoch: number,
        description: string,
        name?: string,
        threshold?: number,
        toRemove?: string[],
        toAdd?: string[],
        weights?: number[],
    ): TransactionResult {
        if ((toAdd || weights) && (toAdd?.length !== weights?.length)) {
            throw new Error("The number of members to add does not match the number of weights provided.");
        }

        return proposeModify(
            tx,
            {
                multisig: this.multisig!, 
                key,
                executionTime: BigInt(executionTime),
                expirationEpoch: BigInt(expirationEpoch),
                description,
                name: name ?? null,
                threshold: threshold ? BigInt(threshold) : null, 
                toRemove: toRemove ?? [],
                toAdd: toAdd ?? [],
                weights: weights ? weights.map(BigInt) : [],
            }
        )
    }
    
    executeModify(
        tx: Transaction,
        executable: TransactionResult,
    ): TransactionResult {
        return executeModify(
            tx,
            {
                executable,
                multisig: this.multisig!,
            }
        )
    }

    // === Transfers ===

    // proposeSend(
    //     tx: Transaction,
    //     key: string,
    //     executionTime: number,
    //     expirationEpoch: number,
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
    //             typeof(this.multisig) === "string" ? tx.object(this.multisig) : this.multisig, 
    //             tx.pure(key), 
    //             tx.pure(executionTime), 
    //             tx.pure(expirationEpoch), 
    //             tx.pure(description), 
    //             name ? tx.pure([name]) : tx.pure([]), 
    //             threshold ? tx.pure([threshold]) : tx.pure([]), 
    //             toRemove ? tx.pure(toRemove) : tx.pure([]), 
    //             toAdd ? tx.pure(toAdd) : tx.pure([]),
    //             weights ? tx.pure(weights) : tx.pure([]),
    //         ],
    //     });
    // }
}