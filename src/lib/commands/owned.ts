import { Transaction, TransactionArgument } from "@mysten/sui/transactions";
import { ACCOUNT_PROTOCOL } from "src/types";

/// Deposits and locks a Cap object in the Account
export function mergeAndSplit(
    tx: Transaction,
    configType: string,
    coinType: string,
    auth: TransactionArgument,
    account: string,
    toMergeRefs: { objectId: string, version: string, digest: string }[],
    toSplitAmounts: bigint[],
) {
    const toMergeRefsVec = tx.makeMoveVec({
        type: `0x2::transfer::Receiving<0x2::coin::Coin<${coinType}>>`,
        elements: toMergeRefs.map(ref => tx.receivingRef(ref)),
    });

    tx.moveCall({
        target: `${ACCOUNT_PROTOCOL.V1}::owned::merge_and_split`,
        typeArguments: [configType, coinType],
        arguments: [
            auth, 
            tx.object(account), 
            toMergeRefsVec, 
            tx.pure.vector("u64", toSplitAmounts)
        ],
    });
}