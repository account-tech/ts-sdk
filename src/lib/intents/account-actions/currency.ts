import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { CoinMetadata, SuiClient } from "@mysten/sui/client";
import { getCoinMeta } from "@polymedia/coinmeta";
import * as currency from "../../../.gen/account-actions/currency/functions";
import * as currencyIntent from "../../../.gen/account-actions/currency-intents/functions";
import * as owned from "../../../.gen/account-protocol/owned/functions";
import * as transfer from "../../../.gen/account-actions/transfer/functions";
import * as vesting from "../../../.gen/account-actions/vesting/functions";
import * as accountProtocol from "../../../.gen/account-protocol/account/functions";
import * as intents from "../../../.gen/account-protocol/intents/functions";
import { MintAction, BurnAction, UpdateAction, DisableAction } from "../../../.gen/account-actions/currency/structs";
import { UpdateMetadataArgs, WithdrawAndBurnArgs, IntentArgs, IntentFields, DisableRulesArgs, MintAndTransferArgs, MintAndVestArgs } from "../types";
import { Intent } from "../intent";
import { Outcome } from "../../outcomes/variants/outcome";
import { WithdrawAction } from "src/.gen/account-protocol/owned/structs";
import { TransferAction } from "src/.gen/account-actions/transfer/structs";
import { VestAction } from "src/.gen/account-actions/vesting/structs";
import { CLOCK } from "src/types/constants";

export class DisableRulesIntent extends Intent {
    declare args?: DisableRulesArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: IntentFields,
    ): Promise<DisableRulesIntent> {
        const intent = new DisableRulesIntent(client, account, outcome, fields);
        // resolve actions
        const actions = await intent.fetchActions(fields.actionsId);

        const coinType = actions[0].type.match(/<([^>]*)>/)[1];
        const disableAction = DisableAction.fromFieldsWithTypes(coinType, actions[0]); // CoinType, DisableAction

        intent.args = {
            coinType,
            mint: disableAction.mint,
            burn: disableAction.burn,
            updateSymbol: disableAction.updateSymbol,
            updateName: disableAction.updateName,
            updateDescription: disableAction.updateDescription,
            updateIcon: disableAction.updateIcon,
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
        actionArgs: DisableRulesArgs,
    ): TransactionResult {
        return currencyIntent.requestDisableRules(
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
                disableMint: actionArgs.mint,
                disableBurn: actionArgs.burn,
                disableUpdateSymbol: actionArgs.updateSymbol,
                disableUpdateName: actionArgs.updateName,
                disableUpdateDescription: actionArgs.updateDescription,
                disableUpdateIcon: actionArgs.updateIcon,
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return currencyIntent.executeDisableRules(
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
        currency.deleteDisable(
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
        currency.deleteDisable(
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

export class UpdateMetadataIntent extends Intent {
    declare args?: UpdateMetadataArgs;
    metadata?: CoinMetadata;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: IntentFields,
    ): Promise<UpdateMetadataIntent> {
        const intent = new UpdateMetadataIntent(client, account, outcome, fields);
        // resolve actions
        const actions = await intent.fetchActions(fields.actionsId);

        const coinType = actions[0].type.match(/<([^>]*)>/)[1];
        const updateAction = UpdateAction.fromFieldsWithTypes(coinType, actions[0]); // CoinType, UpdateAction

        intent.args = {
            coinType,
            name: updateAction.name,
            symbol: updateAction.symbol,
            description: updateAction.description,
            icon: updateAction.iconUrl,
        };

        intent.metadata = await getCoinMeta(client, intent.args.coinType);
        return intent;
    }

    request(
        tx: Transaction,
        accountGenerics: [string, string],
        auth: TransactionObjectInput,
        outcome: TransactionObjectInput,
        account: string,
        intentArgs: IntentArgs,
        actionArgs: UpdateMetadataArgs,
    ): TransactionResult {
        return currencyIntent.requestUpdateMetadata(
            tx,
            [...accountGenerics, this.args!.coinType],
            {
                auth,
                account,
                outcome,
                key: intentArgs.key,
                description: intentArgs.description ?? "",
                executionTime: intentArgs.executionTimes?.[0] ?? 0n,
                expirationTime: intentArgs.expirationTime ?? BigInt(Math.floor(Date.now()) + 7 * 24 * 60 * 60 * 1000),
                mdName: actionArgs.name,
                mdSymbol: actionArgs.symbol,
                mdDescription: actionArgs.description,
                mdIcon: actionArgs.icon,
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        if (!this.metadata?.id) {
            throw new Error('Metadata not found for the Update intent');
        }

        return currencyIntent.executeUpdateMetadata(
            tx,
            [...accountGenerics, this.args!.coinType],
            {
                executable,
                account: this.account!,
                metadata: this.metadata?.id!,
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
        currency.deleteUpdate(
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
        currency.deleteUpdate(
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

export class MintAndTransferIntent extends Intent {
    declare args?: MintAndTransferArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: IntentFields,
    ): Promise<MintAndTransferIntent> {
        const intent = new MintAndTransferIntent(client, account, outcome, fields);
        // resolve actions
        const actions = await intent.fetchActions(fields.actionsId);
        const coinType = actions[0].type.match(/<([^>]*)>/)[1];

        intent.args = {
            coinType,
            transfers: Array.from({ length: actions.length / 2 }, (_, i) => ({
                amount: MintAction.fromFieldsWithTypes(coinType, actions[i * 2]).amount,
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
        actionArgs: MintAndTransferArgs,
    ): TransactionResult {
        return currencyIntent.requestMintAndTransfer(
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
            result = currencyIntent.executeMintAndTransfer(
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
        currency.deleteMint(
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
        currency.deleteMint(
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
}

export class MintAndVestIntent extends Intent {
    declare args?: MintAndVestArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: IntentFields,
    ): Promise<MintAndVestIntent> {
        const intent = new MintAndVestIntent(client, account, outcome, fields);
        // resolve actions
        const actions = await intent.fetchActions(fields.actionsId);
        const coinType = actions[0].type.match(/<([^>]*)>/)[1];

        intent.args = {
            coinType,
            amount: MintAction.fromFieldsWithTypes(coinType, actions[0]).amount,
            recipient: VestAction.fromFieldsWithTypes(actions[1]).recipient,
            start: VestAction.fromFieldsWithTypes(actions[1]).startTimestamp,
            end: VestAction.fromFieldsWithTypes(actions[1]).endTimestamp,
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
        actionArgs: MintAndVestArgs,
    ): TransactionResult {
        return currencyIntent.requestMintAndVest(
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
                totalAmount: actionArgs.amount,
                recipient: actionArgs.recipient,
                startTimestamp: actionArgs.start,
                endTimestamp: actionArgs.end,
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return currencyIntent.executeMintAndVest(
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
        currency.deleteMint(
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
        currency.deleteMint(
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

export class WithdrawAndBurnIntent extends Intent {
    declare args?: WithdrawAndBurnArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: IntentFields,
    ): Promise<WithdrawAndBurnIntent> {
        const intent = new WithdrawAndBurnIntent(client, account, outcome, fields);
        // resolve actions
        const actions = await intent.fetchActions(fields.actionsId);

        const withdrawAction = WithdrawAction.fromFieldsWithTypes(actions[0]); // CoinType, WithdrawAction
        const coinType = actions[1].type.match(/<([^>]*)>/)[1];
        const burnAction = BurnAction.fromFieldsWithTypes(coinType, actions[1]); // CoinType, BurnAction

        intent.args = {
            coinType,
            coinId: withdrawAction.objectId,
            amount: burnAction.amount,
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
        actionArgs: WithdrawAndBurnArgs,
    ): TransactionResult {
        return currencyIntent.requestWithdrawAndBurn(
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
                coinId: actionArgs.coinId,
                amount: actionArgs.amount,
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return currencyIntent.executeWithdrawAndBurn(
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
        currency.deleteBurn(
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
        currency.deleteBurn(
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