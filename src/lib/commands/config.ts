import { editMetadata } from "src/.gen/account-actions/config/functions";
import { Transaction, TransactionObjectInput } from "@mysten/sui/transactions";

/// Replaces the metadata of an account, first element must be "name"
export function replaceMetadata(
    tx: Transaction,
    accountGenerics: [string, string],
    auth: TransactionObjectInput,
    account: string,
    metadata: Map<string, string>,
) {
    if (Array.from(metadata.keys())[0] !== "name") throw new Error("'name' must be the first key in metadata");

    editMetadata(
        tx,
        accountGenerics,
        { auth, account, keys: Array.from(metadata.keys()), values: Array.from(metadata.values()) },
    );
}