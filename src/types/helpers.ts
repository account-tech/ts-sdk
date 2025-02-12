import { TransactionArgument } from "@mysten/sui/transactions";

export type TransactionPureInput = string | TransactionArgument;

export type DepStatus = {
    name: string;
    currentAddr: string;
    currentVersion: number;
    latestAddr: string;
    latestVersion: number;
}