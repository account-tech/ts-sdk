import { open, place, delist, withdrawProfits } from "src/.gen/account-actions/kiosk/functions";
import { Transaction, TransactionObjectInput } from "@mysten/sui/transactions";
import { TransactionPureInput } from "src/types/helper-types";

/// Opens a Kiosk managed by the Account
export function openKiosk(
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
) {
    place(
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
    nft: TransactionPureInput,
) {
    delist(
        tx,
        [...accountGenerics, nftType],
        { auth, account, kiosk, name, nft },
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
) {
    withdrawProfits(
        tx,
        accountGenerics,
        { auth, account, kiosk, name },
    );
}