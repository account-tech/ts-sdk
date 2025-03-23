import { lockCap } from "src/.gen/account-actions/access-control/functions";
import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";

/// Deposits and locks a Cap object in the Account
export function depositCap(
    tx: Transaction,
    configType: string,
    capType: string,
    auth: TransactionObjectInput,
    account: TransactionObjectInput,
    capObject: TransactionObjectInput,
): TransactionResult {
    return lockCap(
        tx,
        [configType, capType],
        { auth, account, cap: capObject },
    );
}