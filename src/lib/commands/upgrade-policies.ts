import { lockCap } from "src/.gen/account-actions/upgrade-policies/functions";
import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";

/// Deposits and locks an UpgradeCap in the Account
export function depositUpgradeCap(
    tx: Transaction,
    accountGenerics: [string, string],
    auth: TransactionObjectInput,
    account: string,
    upgradeCap: TransactionObjectInput,
    packageName: string, // can be anything
    delayMs: number,
): TransactionResult {
    return lockCap(
        tx,
        accountGenerics,
        { auth, account, cap: upgradeCap, name: packageName, delayMs: BigInt(delayMs) },
    );
}