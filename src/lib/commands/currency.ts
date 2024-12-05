import { lockCap, publicBurn } from "src/.gen/account-actions/currency/functions";
import { Transaction, TransactionObjectInput } from "@mysten/sui/transactions";

/// Deposits and locks a TreasuryCap in the Account
export function depositTreasuryCap(
    tx: Transaction,
    accountGenerics: [string, string],
    coinType: string,
    auth: TransactionObjectInput,
    account: string,
    treasuryCap: TransactionObjectInput,
    maxSupply?: number,
) {
    lockCap(
        tx,
        [...accountGenerics, coinType],
        { auth, account, treasuryCap, maxSupply: maxSupply ? BigInt(maxSupply) : null },
    );
}

/// Public function to allow anyone to burn coins using a TreasuryCap attached to the Account (if can_burn enabled)
export function burnCoins(
    tx: Transaction,
    accountGenerics: [string, string],
    coinType: string,
    account: string,
    coin: TransactionObjectInput,
) {
    // caller should check if TreasuryCap exist and can_burn is enabled
    publicBurn(
        tx,
        [...accountGenerics, coinType],
        { account, coin },
    );
}