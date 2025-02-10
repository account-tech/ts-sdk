import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import { ListAction, TakeAction } from "../../../.gen/account-actions/kiosk/structs";
import * as kiosk from "../../../.gen/account-actions/kiosk/functions";
import * as kioskIntent from "../../../.gen/account-actions/kiosk-intents/functions";
import * as accountProtocol from "../../../.gen/account-protocol/account/functions";
import * as intents from "../../../.gen/account-protocol/intents/functions";
import { ListNftsArgs, TakeNftsArgs, IntentArgs, IntentFields } from "../types";
import { Intent } from "../intent";
import { Outcome } from "../../outcomes/variants/outcome";
import { CLOCK } from "src/types/constants";

export class TakeNftsIntent extends Intent {
    declare args?: TakeNftsArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: IntentFields,
    ): Promise<TakeNftsIntent> {
        const intent = new TakeNftsIntent(client, account, outcome, fields);
        // resolve actions
        const actions = await intent.fetchActions(fields.actionsId);
        const takeActions = actions.map(action => TakeAction.fromFieldsWithTypes(action));

        intent.args = {
            kioskName: takeActions[0].name,
            nftIds: takeActions.map(action => action.nftId),
            recipient: takeActions[0].recipient,
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
        actionArgs: TakeNftsArgs,
    ): TransactionResult {
        return kioskIntent.requestTakeNfts(
            tx,
            accountGenerics,
            {
                auth,
                account,
                outcome,
                key: intentArgs.key,
                description: intentArgs.description ?? "",
                executionTime: intentArgs.executionTimes?.[0] ?? 0n,
                expirationTime: intentArgs.expirationTime ?? BigInt(Math.floor(Date.now()) + 7 * 24 * 60 * 60 * 1000),
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
    declare args?: ListNftsArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: IntentFields,
    ): Promise<ListNftsIntent> {
        const intent = new ListNftsIntent(client, account, outcome, fields);
        // resolve actions
        const actions = await intent.fetchActions(fields.actionsId);
        const listActions = actions.map(action => ListAction.fromFieldsWithTypes(action));

        intent.args = {
            kioskName: listActions[0].name,
            listings: listActions.map(action => ({ nftId: action.nftId, price: action.price })),
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
        actionArgs: ListNftsArgs,
    ): TransactionResult {
        return kioskIntent.requestListNfts(
            tx,
            accountGenerics,
            {
                auth,
                account,
                outcome,
                key: intentArgs.key,
                description: intentArgs.description ?? "",
                executionTime: intentArgs.executionTimes?.[0] ?? 0n,
                expirationTime: intentArgs.expirationTime ?? BigInt(Math.floor(Date.now()) + 7 * 24 * 60 * 60 * 1000),
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