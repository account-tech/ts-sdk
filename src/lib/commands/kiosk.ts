import { open, place, delist, withdrawProfits, close } from "src/.gen/account-actions/kiosk/functions";
import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { TransactionPureInput } from "src/types/helper-types";

/// Opens a Kiosk managed by the Account
export function openKiosk(
    tx: Transaction,
    accountGenerics: [string, string],
    auth: TransactionObjectInput,
    account: string,
    name: string,
): TransactionResult {
    return open(
        tx,
        accountGenerics,
        { auth, account, name },
    );
}

/// Places an object in the Kiosk, the object must come from another Kiosk
export function placeInKiosk(
    tx: Transaction,
    accountGenerics: [string, string],
    nftType: string,
    auth: TransactionObjectInput,
    account: string,
    accountKiosk: TransactionObjectInput,
    senderKiosk: TransactionObjectInput,
    senderCap: TransactionObjectInput,
    transferPolicy: TransactionObjectInput,
    kioskName: string,
    nftId: TransactionPureInput,
): TransactionResult {
    return place(
        tx,
        [...accountGenerics, nftType],
        { auth, account, accountKiosk, senderKiosk, senderCap, policy: transferPolicy, name: kioskName, nftId },
    );
}

/// Delists an object from the Kiosk
export function delistFromKiosk(
    tx: Transaction,
    accountGenerics: [string, string],
    nftType: string,
    auth: TransactionObjectInput,
    account: string,
    kiosk: TransactionObjectInput,
    name: string,
    nftId: TransactionPureInput,
): TransactionResult {
    return delist(
        tx,
        [...accountGenerics, nftType],
        { auth, account, kiosk, name, nftId },
    );
}

/// Withdraws the profits from the Kiosk to the Account
export function withdrawProfitsFromKiosk(
    tx: Transaction,
    accountGenerics: [string, string],
    auth: TransactionObjectInput,
    account: string,
    kiosk: TransactionObjectInput,
    name: string,
): TransactionResult {
    return withdrawProfits(
        tx,
        accountGenerics,
        { auth, account, kiosk, name },
    );
}

/// Closes an empty Kiosk managed by the Account
export function closeKiosk(
    tx: Transaction,
    accountGenerics: [string, string],
    auth: TransactionObjectInput,
    account: string,
    kiosk: TransactionObjectInput,
    name: string,
): TransactionResult {
    return close(
        tx,
        accountGenerics,
        { auth, account, kiosk, name },
    );
}