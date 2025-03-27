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
import { WithdrawAction } from "../../../.gen/account-protocol/owned/structs";
import { TransferAction } from "../../../.gen/account-actions/transfer/structs";
import { VestAction } from "../../../.gen/account-actions/vesting/structs";

import { UpdateMetadataArgs, WithdrawAndBurnArgs, IntentFields, DisableRulesArgs, MintAndTransferArgs, MintAndVestArgs, ActionsIntentTypes } from "../types";
import { Intent } from "../intent";
import { Outcome } from "../../outcomes";
import { CLOCK } from "../../../types";

export class DisableRulesIntent extends Intent {
    static type = ActionsIntentTypes.DisableRules;
    declare args: DisableRulesArgs;

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
        account: string,
        params: TransactionObjectInput,
        outcome: TransactionObjectInput,
        actionArgs: DisableRulesArgs,
    ): TransactionResult {
        return currencyIntent.requestDisableRules(
            tx,
            [...accountGenerics, actionArgs.coinType],
            {
                auth,
                account,
                params,
                outcome,
                mint: actionArgs.mint,
                burn: actionArgs.burn,
                updateSymbol: actionArgs.updateSymbol,
                updateName: actionArgs.updateName,
                updateDescription: actionArgs.updateDescription,
                updateIcon: actionArgs.updateIcon,
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
    static type = ActionsIntentTypes.UpdateMetadata;
    declare args: UpdateMetadataArgs;
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
            newName: updateAction.name,
            newSymbol: updateAction.symbol,
            newDescription: updateAction.description,
            newIconUrl: updateAction.iconUrl,
        };

        const metadata = await getCoinMeta(client, intent.args.coinType);
        if (!metadata) {
            throw new Error(`Metadata not found for coin type: ${intent.args.coinType}`);
        }
        intent.metadata = metadata;
        return intent;
    }

    request(
        tx: Transaction,
        accountGenerics: [string, string],
        auth: TransactionObjectInput,
        account: string,
        params: TransactionObjectInput,
        outcome: TransactionObjectInput,
        actionArgs: UpdateMetadataArgs,
    ): TransactionResult {
        return currencyIntent.requestUpdateMetadata(
            tx,
            [...accountGenerics, this.args!.coinType],
            {
                auth,
                account,
                params,
                outcome,
                mdName: actionArgs.newName,
                mdSymbol: actionArgs.newSymbol,
                mdDescription: actionArgs.newDescription,
                mdIconUrl: actionArgs.newIconUrl,
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
    static type = ActionsIntentTypes.MintAndTransfer;
    declare args: MintAndTransferArgs;

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
        account: string,
        params: TransactionObjectInput,
        outcome: TransactionObjectInput,
        actionArgs: MintAndTransferArgs,
    ): TransactionResult {
        return currencyIntent.requestMintAndTransfer(
            tx,
            [...accountGenerics, actionArgs.coinType],
            {
                auth,
                account,
                params,
                outcome,
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
    static type = ActionsIntentTypes.MintAndVest;
    declare args: MintAndVestArgs;

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
        account: string,
        params: TransactionObjectInput,
        outcome: TransactionObjectInput,
        actionArgs: MintAndVestArgs,
    ): TransactionResult {
        return currencyIntent.requestMintAndVest(
            tx,
            [...accountGenerics, actionArgs.coinType],
            {
                auth,
                account,
                params,
                outcome,
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
    static type = ActionsIntentTypes.WithdrawAndBurn;
    declare args: WithdrawAndBurnArgs;

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
        account: string,
        params: TransactionObjectInput,
        outcome: TransactionObjectInput,
        actionArgs: WithdrawAndBurnArgs,
    ): TransactionResult {
        return currencyIntent.requestWithdrawAndBurn(
            tx,
            [...accountGenerics, actionArgs.coinType],
            {
                auth,
                account,
                params,
                outcome,
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
            accountGenerics[0],
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
            accountGenerics[0],
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