import { open, deposit, close } from "src/.gen/account-actions/vault/functions";
import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";

/// Opens a Vault managed by the Account
export function openVault(
    tx: Transaction,
    accountGenerics: [string, string],
    auth: TransactionObjectInput,
    account: TransactionObjectInput,
    name: string,
): TransactionResult {
    return open(
        tx,
        accountGenerics,
        { auth, account, name },
    );
}

/// Deposits an object into the Vault from the caller wallet
export function depositFromWallet(
    tx: Transaction,
    accountGenerics: [string, string],
    coinType: string,
    auth: TransactionObjectInput,
    account: TransactionObjectInput,
    name: string,
    coin: TransactionObjectInput,
): TransactionResult {
    return deposit(
        tx,
        [...accountGenerics, coinType],
        { auth, account, name, coin },
    );
}

/// Closes the Vault if empty
export function closeVault(
    tx: Transaction,
    accountGenerics: [string, string],
    auth: TransactionObjectInput,
    account: TransactionObjectInput,
    name: string,
): TransactionResult {
    return close(
        tx,
        accountGenerics,
        { auth, account, name },
    );
}