import { open, depositOwned, deposit, close } from "src/.gen/account-actions/treasury/functions";
import { Transaction, TransactionObjectInput } from "@mysten/sui/transactions";

/// Opens a Treasury managed by the Account
export function openTreasury(
    tx: Transaction,
    accountGenerics: [string, string],
    auth: TransactionObjectInput,
    account: string,
    name: string,
) {
    open(
        tx,
        accountGenerics,
        { auth, account, name },
    );
}

/// Deposits an object owned by the Account into the Treasury
export function depositFromAccount(
    tx: Transaction,
    accountGenerics: [string, string],
    coinType: string,
    auth: TransactionObjectInput,
    account: string,
    name: string,
    coin: TransactionObjectInput,
) {
    depositOwned(
        tx,
        [...accountGenerics, coinType],
        { auth, account, name, receiving: coin },
    );
}

/// Deposits an object into the Treasury from the caller wallet
export function depositFromWallet(
    tx: Transaction,
    accountGenerics: [string, string],
    coinType: string,
    auth: TransactionObjectInput,
    account: string,
    name: string,
    coin: TransactionObjectInput,
) {
    deposit(
        tx,
        [...accountGenerics, coinType],
        { auth, account, name, coin },
    );
}

/// Closes the Treasury if empty
export function closeTreasury(
    tx: Transaction,
    accountGenerics: [string, string],
    auth: TransactionObjectInput,
    account: string,
    name: string,
) {
    close(
        tx,
        accountGenerics,
        { auth, account, name },
    );
}