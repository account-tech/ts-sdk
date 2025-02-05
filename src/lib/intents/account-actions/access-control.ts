import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import * as accountProtocol from "../../../.gen/account-protocol/account/functions";
import * as intents from "../../../.gen/account-protocol/intents/functions";
import * as accessControlIntent from "../../../.gen/account-actions/access-control-intents/functions";
import * as accessControl from "../../../.gen/account-actions/access-control/functions";
import { BorrowCapArgs, IntentArgs, IntentFields } from "../../../types/intent-types";
import { Intent } from "../intent";
import { Outcome } from "../../outcomes/variants/outcome";
import { CLOCK } from "src/types/constants";

export class BorrowCapIntent extends Intent {
    declare args?: BorrowCapArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: IntentFields,
    ): Promise<BorrowCapIntent> {
        const intent = new BorrowCapIntent(client, account, outcome, fields);
        // resolve actions
        const actions = await intent.fetchActions(fields.actionsId);
        const capType = actions[0].type;

        intent.args = {
            capType,
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
        actionArgs: BorrowCapArgs,
    ): TransactionResult {
        return accessControlIntent.requestBorrowCap(
            tx,
            [...accountGenerics, actionArgs.capType],
            {
                auth,
                account,
                outcome,
                key: intentArgs.key,
                description: intentArgs.description ?? "",
                executionTimes: intentArgs.executionTimes ?? [0n],
                expirationTime: intentArgs.expirationTime ?? BigInt(Math.floor(Date.now()) + 7 * 24 * 60 * 60 * 1000),
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return accessControlIntent.executeBorrowCap(
            tx,
            [...accountGenerics, this.args!.capType],
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
        accessControl.deleteBorrow(
            tx,
            this.args!.capType,
            expired,
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
        accessControl.deleteBorrow(
            tx,
            this.args!.capType,
            expired,
        );
        return intents.destroyEmptyExpired(
            tx,
            expired,
        );
    }
}