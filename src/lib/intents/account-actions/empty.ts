import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import * as accountProtocol from "../../../.gen/account-protocol/account/functions";
import * as intents from "../../../.gen/account-protocol/intents/functions";
import * as emptyIntent from "../../../.gen/account-actions/empty-intents/functions";

import { ActionsIntentTypes } from "../types";
import { Intent } from "../intent";
import { CLOCK } from "../../../types";

export class EmptyIntent extends Intent {
    static type = ActionsIntentTypes.Empty;

    async init() {}

    request(
        tx: Transaction,
        accountGenerics: [string, string],
        auth: TransactionObjectInput,
        account: string,
        params: TransactionObjectInput,
        outcome: TransactionObjectInput,
    ): TransactionResult {
        return emptyIntent.requestEmpty(
            tx,
            [...accountGenerics],
            {
                auth,
                account,
                params,
                outcome,
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return emptyIntent.executeEmpty(
            tx,
            [...accountGenerics],
            {
                executable,
                account: this.account,
            }
        );
    }

    clearEmpty(
        tx: Transaction,
        accountGenerics: [string, string],
        key: string,
    ): TransactionResult {
        const expired = accountProtocol.destroyEmptyIntent(
            tx,
            accountGenerics,
            {
                account: this.account,
                key,
            }
        );
        return intents.destroyEmptyExpired(
            tx,
            expired,
        );
    }

    deleteExpired(
        tx: Transaction,
        accountGenerics: [string, string],
        key: string,
    ): TransactionResult {
        const expired = accountProtocol.deleteExpiredIntent(
            tx,
            accountGenerics,
            {
                account: this.account,
                key,
                clock: CLOCK,
            }
        );
        return intents.destroyEmptyExpired(
            tx,
            expired,
        );
    }
}