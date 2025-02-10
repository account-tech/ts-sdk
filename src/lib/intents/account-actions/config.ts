import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import * as config from "../../../.gen/account-protocol/config/functions";
import * as accountProtocol from "../../../.gen/account-protocol/account/functions";
import * as intents from "../../../.gen/account-protocol/intents/functions";
import { ConfigDepsAction, ToggleUnverifiedAllowedAction } from "../../../.gen/account-protocol/config/structs";

import { CLOCK, EXTENSIONS } from "../../../types";
import { Outcome } from "../../outcomes";
import { ConfigDepsArgs, IntentArgs, IntentFields, ToggleUnverifiedAllowedArgs } from "../types";
import { Intent } from "../intent";

export class ConfigDepsIntent extends Intent {
    declare args: ConfigDepsArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: IntentFields,
    ): Promise<ConfigDepsIntent> {
        const intent = new ConfigDepsIntent(client, account, outcome, fields);
        // resolve actions
        const actions = await intent.fetchActions(fields.actionsId);
        const configDepsAction = ConfigDepsAction.fromFieldsWithTypes(actions[0]);

        intent.args = {
            deps: configDepsAction.deps.inner.map((dep) => ({
                name: dep.name,
                addr: dep.addr,
                version: Number(dep.version),
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
        actionArgs: ConfigDepsArgs,
    ): TransactionResult {
        const names: string[] = [];
        const addresses: string[] = [];
        const versions: bigint[] = [];
        actionArgs.deps.forEach((dep) => {
            names.push(dep.name);
            addresses.push(dep.addr);
            versions.push(BigInt(dep.version));
        });

        return config.requestConfigDeps(
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
                extensions: EXTENSIONS,
                names,
                addresses,
                versions,
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return config.executeConfigDeps(
            tx,
            accountGenerics,
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
        config.deleteConfigDeps(
            tx,
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
        config.deleteConfigDeps(
            tx,
            expired,
        );
        return intents.destroyEmptyExpired(
            tx,
            expired,
        );
    }
}

export class ToggleUnverifiedAllowedIntent extends Intent {
    declare args: ToggleUnverifiedAllowedArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: IntentFields,
    ): Promise<ToggleUnverifiedAllowedIntent> {
        const intent = new ToggleUnverifiedAllowedIntent(client, account, outcome, fields);
        // resolve actions
        const actions = await intent.fetchActions(fields.actionsId);
        const toggleUnverifiedAllowedAction = ToggleUnverifiedAllowedAction.fromFieldsWithTypes(actions[0]);

        intent.args = {
            newValue: toggleUnverifiedAllowedAction.newValue,
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
        _actionArgs: ToggleUnverifiedAllowedArgs,
    ): TransactionResult {
        return config.requestToggleUnverifiedAllowed(
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
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return config.executeToggleUnverifiedAllowed(
            tx,
            accountGenerics,
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
        config.deleteToggleUnverifiedAllowed(
            tx,
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
        config.deleteToggleUnverifiedAllowed(
            tx,
            expired,
        );
        return intents.destroyEmptyExpired(
            tx,
            expired,
        );
    }
}
