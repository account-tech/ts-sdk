import { lockCap } from "src/.gen/account-actions/access-control/functions";
import { Transaction, TransactionObjectInput } from "@mysten/sui/transactions";

/// Deposits and locks a Cap object in the Account
export function depositCap(
    tx: Transaction,
    accountGenerics: [string, string],
    capType: string,
    auth: TransactionObjectInput,
    account: string,
    capObject: TransactionObjectInput,
) {
    lockCap(
        tx,
        [...accountGenerics, capType],
        { auth, account, cap: capObject },
    );
}