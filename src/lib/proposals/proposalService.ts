
import { TransactionBlock, TransactionResult } from "@mysten/sui.js/transactions";

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
    
    // === Config ===
    
    proposeModify(
        tx: TransactionBlock,
        key: string, 
        executionTime: number,
        expirationEpoch: number,
        description: string,
        threshold?: number,
        toRemove?: string[],
        toAdd?: string[],
        weights?: number[],
        name?: string,
    ) {
        tx.moveCall({
            target: `${this.packageId}::config::propose_modify`,
            arguments: [
                typeof(this.multisig) === "string" ? tx.object(this.multisig) : this.multisig, 
                tx.pure(key), 
                tx.pure(executionTime), 
                tx.pure(expirationEpoch), 
                tx.pure(description), 
                name ? tx.pure([name]) : tx.pure([]), 
                threshold ? tx.pure([threshold]) : tx.pure([]), 
                toRemove ? tx.pure(toRemove) : tx.pure([]), 
                toAdd ? tx.pure(toAdd) : tx.pure([]),
                weights ? tx.pure(weights) : tx.pure([]),
            ],
        });	
    }
    
    executeModify(
        tx: TransactionBlock,
        executable: TransactionResult,
    ) {
        tx.moveCall({
            target: `${this.packageId}::config::execute_modify`,
            arguments: [
                executable, 
                typeof(this.multisig) === "string" ? tx.object(this.multisig) : this.multisig, 
            ],
        });
    }
}