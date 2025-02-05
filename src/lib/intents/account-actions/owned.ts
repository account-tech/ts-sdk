import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import * as accountProtocol from "../../../.gen/account-protocol/account/functions";
import * as intents from "../../../.gen/account-protocol/intents/functions";
import * as owned from "../../../.gen/account-protocol/owned/functions";
import * as ownedIntents from "../../../.gen/account-actions/owned-intents/functions";
import * as transfer from "../../../.gen/account-actions/transfer/functions";
import * as vesting from "../../../.gen/account-actions/vesting/functions";
import * as vault from "../../../.gen/account-actions/vault/functions";
import { IntentArgs, IntentFields, WithdrawAndTransferArgs, WithdrawAndTransferToVaultArgs, WithdrawAndVestArgs } from "../../../types/intent-types";
import { Intent } from "../intent";
import { Outcome } from "../../outcomes/variants/outcome";
import { WithdrawAction } from "src/.gen/account-protocol/owned/structs";
import { TransferAction } from "src/.gen/account-actions/transfer/structs";
import { VestAction } from "src/.gen/account-actions/vesting/structs";
import { CLOCK } from "src/types/constants";
import { DepositAction } from "src/.gen/account-actions/vault/structs";

export class WithdrawAndTransferToVaultIntent extends Intent {
    declare args?: WithdrawAndTransferToVaultArgs;
    // TODO: get object info from ./objects/owned.ts

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: IntentFields,
    ): Promise<WithdrawAndTransferToVaultIntent> {
        const intent = new WithdrawAndTransferToVaultIntent(client, account, outcome, fields);
        // resolve actions
        const actions = await intent.fetchActions(fields.actionsId);
        const coinType = actions[1].type.match(/<([^>]*)>/)[1];

        intent.args = {
            coinType,
            coinId: WithdrawAction.fromFieldsWithTypes(actions[0]).objectId,
            coinAmount: DepositAction.fromFieldsWithTypes(coinType, actions[1]).amount,
            vaultName: DepositAction.fromFieldsWithTypes(coinType, actions[1]).name,
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
        actionArgs: WithdrawAndTransferToVaultArgs,
    ): TransactionResult {
        return ownedIntents.requestWithdrawAndTransferToVault(
            tx,
            [...accountGenerics, actionArgs.coinType],
            {
                auth,
                account,
                outcome,
                key: intentArgs.key,
                description: intentArgs.description ?? "",
                executionTime: intentArgs.executionTimes?.[0] ?? 0n,
                expirationTime: intentArgs.expirationTime ?? 0n,
                coinId: actionArgs.coinId,
                coinAmount: actionArgs.coinAmount,
                vaultName: actionArgs.vaultName,
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return ownedIntents.executeWithdrawAndTransferToVault(
            tx,
            [...accountGenerics, this.args!.coinType],
            {
                executable,
                account: this.account!,
                receiving: this.args!.coinId,
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
        owned.deleteWithdraw(
            tx,
            accountGenerics,
            {
                expired,
                account
            }
        );
        vault.deleteDeposit(
            tx,
            this.args!.coinType,
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
        owned.deleteWithdraw(
            tx,
            accountGenerics,
            {
                expired,
                account
            }
        );
        vault.deleteDeposit(
            tx,
            this.args!.coinType,
            expired
        );
        return intents.destroyEmptyExpired(
            tx,
            expired,
        );
    }
}

export class WithdrawAndTransferIntent extends Intent {
    declare args?: WithdrawAndTransferArgs;
    // TODO: get object info from ./objects/owned.ts

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: IntentFields,
    ): Promise<WithdrawAndTransferIntent> {
        const intent = new WithdrawAndTransferIntent(client, account, outcome, fields);
        // resolve actions
        const actions = await intent.fetchActions(fields.actionsId);

        intent.args = {
            transfers: Array.from({ length: actions.length / 2 }, (_, i) => ({
                objectId: WithdrawAction.fromFieldsWithTypes(actions[i * 2]).objectId,
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
        actionArgs: WithdrawAndTransferArgs,
    ): TransactionResult {
        return ownedIntents.requestWithdrawAndTransfer(
            tx,
            accountGenerics,
            {
                auth,
                account,
                outcome,
                key: intentArgs.key,
                description: intentArgs.description ?? "",
                executionTime: intentArgs.executionTimes?.[0] ?? 0n,
                expirationTime: intentArgs.expirationTime ?? 0n,
                objectIds: actionArgs.transfers.map(transfer => transfer.objectId),
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
            result = ownedIntents.executeWithdrawAndTransfer(
                tx,
                [...accountGenerics, ""], // TODO: get object type
                {
                    executable,
                    account: this.account!,
                    receiving: this.args!.transfers[i].objectId,
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
            owned.deleteWithdraw(
                tx,
                accountGenerics,
                {
                    expired,
                    account
                }
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
            owned.deleteWithdraw(
                tx,
                accountGenerics,
                {
                    expired,
                    account
                }
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

export class WithdrawAndVestIntent extends Intent {
    declare args?: WithdrawAndVestArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: IntentFields,
    ): Promise<WithdrawAndVestIntent> {
        const intent = new WithdrawAndVestIntent(client, account, outcome, fields);
        // resolve actions
        const actions = await intent.fetchActions(fields.actionsId);

        intent.args = {
            coinId: WithdrawAction.fromFieldsWithTypes(actions[0]).objectId,
            start: VestAction.fromFieldsWithTypes(actions[1]).startTimestamp,
            end: VestAction.fromFieldsWithTypes(actions[1]).endTimestamp,
            recipient: VestAction.fromFieldsWithTypes(actions[1]).recipient,
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
        actionArgs: WithdrawAndVestArgs,
    ): TransactionResult {
        return ownedIntents.requestWithdrawAndVest(
            tx,
            accountGenerics,
            {
                auth,
                account,
                outcome,
                key: intentArgs.key,
                description: intentArgs.description ?? "",
                executionTime: intentArgs.executionTimes?.[0] ?? 0n,
                expirationTime: intentArgs.expirationTime ?? 0n,
                coinId: actionArgs.coinId,
                startTimestamp: actionArgs.start,
                endTimestamp: actionArgs.end,
                recipient: actionArgs.recipient,
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return ownedIntents.executeWithdrawAndVest(
            tx,
            [...accountGenerics, ""], // TODO: get CoinType
            {
                executable,
                account: this.account!,
                receiving: this.args!.coinId,
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
        owned.deleteWithdraw(
            tx,
            accountGenerics,
            {
                expired,
                account
            }
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
        owned.deleteWithdraw(
            tx,
            accountGenerics,
            {
                expired,
                account
            }
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