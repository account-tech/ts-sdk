import { editMetadata, updateExtensionsToLatest } from "src/.gen/account-protocol/config/functions";
import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { EXTENSIONS } from "src/types/constants";

/// Replaces the metadata of an account, first element must be "name"
export function replaceMetadata(
    tx: Transaction,
    accountGenerics: [string, string],
    auth: TransactionObjectInput,
    account: TransactionObjectInput,
    keys: string[],
    values: string[],
): TransactionResult {
    if (keys[0] !== "name") throw new Error("'name' must be the first key in metadata");

    return editMetadata(
        tx,
        accountGenerics,
        { auth, account, keys, values },
    );
}

/// Updates the verified dependencies (deps allowed in Extensions) to the latest version
export function updateVerifiedDepsToLatest(
    tx: Transaction,
    accountGenerics: [string, string],
    auth: TransactionObjectInput,
    account: TransactionObjectInput,
) {
    return updateExtensionsToLatest(
        tx,
        accountGenerics,
        { auth, account, extensions: EXTENSIONS },
    );
}
