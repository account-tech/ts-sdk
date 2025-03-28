import { mergeAndSplit as mergeAndSplitFun } from "src/.gen/account-protocol/owned/functions";
import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";

/// Deposits and locks a Cap object in the Account
export function mergeAndSplit(
    tx: Transaction,
    configType: string,
    coinType: string,
    auth: TransactionObjectInput,
    account: TransactionObjectInput,
    toMerge: TransactionObjectInput[],
    toSplit: bigint[],
): TransactionResult {
    return mergeAndSplitFun(
        tx,
        [configType, coinType],
        { auth, account, toMerge, toSplit },
    );
}