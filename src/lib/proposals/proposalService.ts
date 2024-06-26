
import { bcs } from "@mysten/sui/bcs";
import { Transaction, TransactionResult } from "@mysten/sui/transactions";

export class ProposalService {
    public packageId: string;
    public multisig?: TransactionResult | string;
    
    constructor(packageId: string, multisig?: TransactionResult | string) {
        this.packageId = packageId;
        this.multisig = multisig;
    }

    setMultisig(multisig: TransactionResult | string) {
        this.multisig = multisig;
    }

    // withPackageId(packageId: string) {
    //     this.packageId = packageId;
    //     return this;
    // }
    
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
        return tx.moveCall({
            target: `${this.packageId}::config::propose_modify`,
            arguments: [
                typeof(this.multisig) === "string" ? tx.object(this.multisig) : this.multisig!, 
                tx.pure.string(key), 
                tx.pure.u64(executionTime), 
                tx.pure.u64(expirationEpoch), 
                tx.pure.string(description), 
                name ? tx.pure(bcs.vector(bcs.String).serialize([name])) : tx.pure(bcs.vector(bcs.String).serialize([])), 
                threshold ? tx.pure(bcs.vector(bcs.U64).serialize([threshold])) : tx.pure(bcs.vector(bcs.U64).serialize([])), 
                toRemove ? tx.pure(bcs.vector(bcs.Address).serialize(toRemove)) : tx.pure(bcs.vector(bcs.Address).serialize([])), 
                toAdd ? tx.pure(bcs.vector(bcs.Address).serialize(toAdd)) : tx.pure(bcs.vector(bcs.Address).serialize([])),
                weights ? tx.pure(bcs.vector(bcs.U64).serialize(weights)) : tx.pure(bcs.vector(bcs.U64).serialize([])),
            ],
        });	
    }
    
    executeModify(
        tx: Transaction,
        executable: TransactionResult,
    ): TransactionResult {
        console.log(this)
        return tx.moveCall({
            target: `${this.packageId}::config::execute_modify`,
            arguments: [
                executable, 
                typeof(this.multisig) === "string" ? tx.object(this.multisig) : this.multisig!, 
            ],
        });
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