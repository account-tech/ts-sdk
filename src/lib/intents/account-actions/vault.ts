import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import * as accountProtocol from "../../../.gen/account-protocol/account/functions";
import * as intents from "../../../.gen/account-protocol/intents/functions";
import * as vault from "../../../.gen/account-actions/vault/functions";
import * as vaultIntents from "../../../.gen/account-actions/vault-intents/functions";
import * as transfer from "../../../.gen/account-actions/transfer/functions";
import * as vesting from "../../../.gen/account-actions/vesting/functions";
import { SpendAction } from "../../../.gen/account-actions/vault/structs";
import { TransferAction } from "../../../.gen/account-actions/transfer/structs";
import { VestAction } from "../../../.gen/account-actions/vesting/structs";

import { IntentArgs, IntentFields, SpendAndTransferArgs, SpendAndVestArgs } from "../types";
import { Intent } from "../intent";
import { Outcome } from "../../outcomes";
import { CLOCK } from "../../../types";

export class SpendAndTransferIntent extends Intent {
    declare args: SpendAndTransferArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: IntentFields,
    ): Promise<SpendAndTransferIntent> {
        const intent = new SpendAndTransferIntent(client, account, outcome, fields);
        // resolve actions
        const actions = await intent.fetchActions(fields.actionsId);
        const coinType = actions[0].type.match(/<([^>]*)>/)[1];

        intent.args = {
            coinType,
            treasuryName: SpendAction.fromFieldsWithTypes(coinType, actions[0]).name,
            transfers: Array.from({ length: actions.length / 2 }, (_, i) => ({
                amount: SpendAction.fromFieldsWithTypes(coinType, actions[i * 2]).amount,
                recipient: TransferAction.fromFieldsWithTypes(actions[i * 2 + 1]).recipient,
            })),
        };
        return intent;
    }

    request(
        tx: Transaction,
        accountGenerics: [string, string],
        auth: TransactionObjectInput,
        outcome: TransactionObjectInput,
        account: string,
        intentArgs: IntentArgs,
        actionArgs: SpendAndTransferArgs,
    ): TransactionResult {
        return vaultIntents.requestSpendAndTransfer(
            tx,
            [...accountGenerics, actionArgs.coinType],
            {
                auth,
                account,
                outcome,
                key: intentArgs.key,
                description: intentArgs.description ?? "",
                executionTimes: intentArgs.executionTimes ?? [0n],
                expirationTime: intentArgs.expirationTime ?? BigInt(Math.floor(Date.now()) + 7 * 24 * 60 * 60 * 1000),
                vaultName: actionArgs.treasuryName,
                amounts: actionArgs.transfers.map(transfer => BigInt(transfer.amount)),
                recipients: actionArgs.transfers.map(transfer => transfer.recipient),
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        let result;
        for (let i = 0; i < this.args!.transfers.length; i++) {
            result = vaultIntents.executeSpendAndTransfer(
                tx,
                [...accountGenerics, this.args!.coinType],
                {
                    executable,
                    account: this.account!,
                }
            );
        }
        return result!;
    }

    clearEmpty(
        tx: Transaction,
        accountGenerics: [string, string],
        account: TransactionObjectInput,
        key: string,
    ): TransactionResult {
        const expired = accountProtocol.destroyEmptyIntent(
            tx,
            accountGenerics,
            {
                account,
                key,
            }
        );
        for (let i = 0; i < this.args!.transfers.length; i++) {
            vault.deleteSpend(
                tx,
                this.args!.coinType,
                expired
            );
            transfer.deleteTransfer(
                tx,
                expired
            );
        }
        return intents.destroyEmptyExpired(
            tx,
            expired,
        );
    }

    deleteExpired(
        tx: Transaction,
        accountGenerics: [string, string],
        account: TransactionObjectInput,
        key: string,
    ): TransactionResult {
        const expired = accountProtocol.deleteExpiredIntent(
            tx,
            accountGenerics,
            {
                account,
                key,
                clock: CLOCK,
            }
        );
        for (let i = 0; i < this.args!.transfers.length; i++) {
            vault.deleteSpend(
                tx,
                this.args!.coinType,
                expired
            );
            transfer.deleteTransfer(
                tx,
                expired
            );
        }
        return intents.destroyEmptyExpired(
            tx,
            expired,
        );
    }
}

export class SpendAndVestIntent extends Intent {
    declare args: SpendAndVestArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: IntentFields,
    ): Promise<SpendAndVestIntent> {
        const intent = new SpendAndVestIntent(client, account, outcome, fields);
        // resolve actions
        const actions = await intent.fetchActions(fields.actionsId);
        const coinType = actions[0].type.match(/<([^>]*)>/)[1];

        const spendAction = SpendAction.fromFieldsWithTypes(coinType, actions[0]);
        const vestAction = VestAction.fromFieldsWithTypes(actions[1]);

        intent.args = {
            treasuryName: spendAction.name,
            coinType,
            amount: spendAction.amount,
            start: vestAction.startTimestamp,
            end: vestAction.endTimestamp,
            recipient: vestAction.recipient,
        };
        return intent;
    }

    request(
        tx: Transaction,
        accountGenerics: [string, string],
        auth: TransactionObjectInput,
        outcome: TransactionObjectInput,
        account: string,
        intentArgs: IntentArgs,
        actionArgs: SpendAndVestArgs,
    ): TransactionResult {
        return vaultIntents.requestSpendAndVest(
            tx,
            [...accountGenerics, actionArgs.coinType],
            {
                auth,
                account,
                outcome,
                key: intentArgs.key,
                description: intentArgs.description ?? "",
                executionTime: intentArgs.executionTimes?.[0] ?? 0n,
                expirationTime: intentArgs.expirationTime ?? BigInt(Math.floor(Date.now()) + 7 * 24 * 60 * 60 * 1000),
                vaultName: actionArgs.treasuryName,
                coinAmount: BigInt(actionArgs.amount),
                startTimestamp: BigInt(actionArgs.start),
                endTimestamp: BigInt(actionArgs.end),
                recipient: actionArgs.recipient,
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return vaultIntents.executeSpendAndVest(
            tx,
            [...accountGenerics, this.args!.coinType],
            {
                executable,
                account: this.account!,
            }
        );
    }

    clearEmpty(
        tx: Transaction,
        accountGenerics: [string, string],
        account: TransactionObjectInput,
        key: string,
    ): TransactionResult {
        const expired = accountProtocol.destroyEmptyIntent(
            tx,
            accountGenerics,
            {
                account,
                key,
            }
        );
        vault.deleteSpend(
            tx,
            this.args!.coinType,
            expired
        );
        transfer.deleteTransfer(
            tx,
            expired
        );
        return intents.destroyEmptyExpired(
            tx,
            expired,
        );
    }

    deleteExpired(
        tx: Transaction,
        accountGenerics: [string, string],
        account: TransactionObjectInput,
        key: string,
    ): TransactionResult {
        const expired = accountProtocol.deleteExpiredIntent(
            tx,
            accountGenerics,
            {
                account,
                key,
                clock: CLOCK,
            }
        );
        vault.deleteSpend(
            tx,
            this.args!.coinType,
            expired
        );
        vesting.deleteVest(
            tx,
            expired
        );
        return intents.destroyEmptyExpired(
            tx,
            expired,
        );
    }
}