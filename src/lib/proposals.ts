
import { TransactionBlock, TransactionResult } from "@mysten/sui.js/transactions";

// === Config ===

export function proposeModify(
    tx: TransactionBlock, 
    multisig: TransactionResult | string, 
    packageId: string, 
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
        target: `${packageId}::config::propose_modify`,
        arguments: [
            typeof(multisig) === "string" ? tx.pure(multisig) : multisig, 
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

export function executeModify(
    tx: TransactionBlock, 
    executable: TransactionResult,
    multisig: TransactionResult,
    packageId: string,
) {
    tx.moveCall({
        target: `${packageId}::config::execute_modify`,
        arguments: [
            executable, 
            multisig, 
        ],
    });
}