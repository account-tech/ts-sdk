import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { ListAction, TakeAction } from "../../../.gen/account-actions/kiosk/structs";
import * as kiosk from "../../../.gen/account-actions/kiosk/functions";
import * as kioskIntent from "../../../.gen/account-actions/kiosk-intents/functions";
import * as accountProtocol from "../../../.gen/account-protocol/account/functions";
import * as intents from "../../../.gen/account-protocol/intents/functions";

import { ListNftsArgs, TakeNftsArgs, ActionsIntentTypes } from "../types";
import { Intent } from "../intent";
import { CLOCK } from "../../../types";

export class TakeNftsIntent extends Intent {
    static type = ActionsIntentTypes.TakeNfts;
    declare args: TakeNftsArgs;

    async init() {
        const intent = new TakeNftsIntent(this.client, this.account, this.outcome, this.fields);
        // resolve actions
        const actions = await intent.fetchActions(this.fields.actionsId);
        const takeActions = actions.map(action => TakeAction.fromFieldsWithTypes(action));

        intent.args = {
            kioskName: takeActions[0].name,
            nftIds: takeActions.map(action => action.nftId),
            recipient: takeActions[0].recipient,
        };
    }

    request(
        tx: Transaction,
        accountGenerics: [string, string],
        auth: TransactionObjectInput,
        account: string,
        params: TransactionObjectInput,
        outcome: TransactionObjectInput,
        actionArgs: TakeNftsArgs,
    ): TransactionResult {
        return kioskIntent.requestTakeNfts(
            tx,
            accountGenerics,
            {
                auth,
                account,
                params,
                outcome,
                kioskName: actionArgs.kioskName,
                nftIds: actionArgs.nftIds,
                recipient: actionArgs.recipient,
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
        typesAndPolicies: { type: string, policy: string }[],
        accountKiosk: string,
        recipientKiosk: string,
        recipientCap: string,
    ): TransactionResult {
        let result;
        for (const { type, policy } of typesAndPolicies) {
            result = kioskIntent.executeTakeNfts(
                tx,
                [...accountGenerics, type],
                {
                    executable,
                    account: this.account!,
                    accountKiosk,
                    recipientKiosk,
                    recipientCap,
                    policy,
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
        for (let i = 0; i < this.args!.nftIds.length; i++) {
            kiosk.deleteTake(
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
        for (let i = 0; i < this.args!.nftIds.length; i++) {
            kiosk.deleteTake(
                tx,
                expired,
            );
        }
        return intents.destroyEmptyExpired(
            tx,
            expired,
        );
    }
}

export class ListNftsIntent extends Intent {
    static type = ActionsIntentTypes.ListNfts;
    declare args: ListNftsArgs;

    async init() {
        const intent = new ListNftsIntent(this.client, this.account, this.outcome, this.fields);
        // resolve actions
        const actions = await intent.fetchActions(this.fields.actionsId);
        const listActions = actions.map(action => ListAction.fromFieldsWithTypes(action));

        intent.args = {
            kioskName: listActions[0].name,
            listings: listActions.map(action => ({ nftId: action.nftId, price: action.price })),
        };
    }

    request(
        tx: Transaction,
        accountGenerics: [string, string],
        auth: TransactionObjectInput,
        account: string,
        params: TransactionObjectInput,
        outcome: TransactionObjectInput,
        actionArgs: ListNftsArgs,
    ): TransactionResult {
        return kioskIntent.requestListNfts(
            tx,
            accountGenerics,
            {
                auth,
                account,
                params,
                outcome,
                kioskName: actionArgs.kioskName,
                nftIds: actionArgs.listings.map(listing => listing.nftId),
                prices: actionArgs.listings.map(listing => BigInt(listing.price)),
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
        nftTypes: string[],
        accountKiosk: string,
    ): TransactionResult {
        let result;
        for (const type of nftTypes) {
            result = kioskIntent.executeListNfts(
                tx,
                [...accountGenerics, type],
                {
                    executable,
                    account: this.account!,
                    kiosk: accountKiosk,
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
        for (let i = 0; i < this.args!.listings.length; i++) {
            kiosk.deleteList(
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
        for (let i = 0; i < this.args!.listings.length; i++) {
            kiosk.deleteList(
                tx,
                expired,
            );
        }
        return intents.destroyEmptyExpired(
            tx,
            expired,
        );
    }
}