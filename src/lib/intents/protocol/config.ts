import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import * as config from "../../../.gen/account-protocol/config/functions";
import * as accountProtocol from "../../../.gen/account-protocol/account/functions";
import * as intents from "../../../.gen/account-protocol/intents/functions";
import { ConfigDepsAction, ToggleUnverifiedAllowedAction } from "../../../.gen/account-protocol/config/structs";

import { CLOCK, EXTENSIONS } from "../../../types";
import { ConfigDepsArgs, ProtocolIntentTypes, ToggleUnverifiedAllowedArgs } from "../types";
import { Intent } from "../intent";

export class ConfigDepsIntent extends Intent {
    static type = ProtocolIntentTypes.ConfigDeps;
    declare args: ConfigDepsArgs;

    async init() {
        const actions = await this.fetchActions(this.fields.actionsId);
        const configDepsAction = ConfigDepsAction.fromFieldsWithTypes(actions[0]);

        this.args = {
            deps: configDepsAction.deps.map((dep) => ({
                name: dep.name,
                addr: dep.addr,
                version: Number(dep.version),
            })),
        };
    }

    request(
        tx: Transaction,
        accountGenerics: [string, string],
        auth: TransactionObjectInput,
        account: string,
        params: TransactionObjectInput,
        outcome: TransactionObjectInput,
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
                params,
                outcome,
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
    static type = ProtocolIntentTypes.ToggleUnverifiedAllowed;
    declare args: ToggleUnverifiedAllowedArgs;

    async init() {
        const actions = await this.fetchActions(this.fields.actionsId);
        ToggleUnverifiedAllowedAction.fromFieldsWithTypes(actions[0]);

        this.args = {};
    }

    request(
        tx: Transaction,
        accountGenerics: [string, string],
        auth: TransactionObjectInput,
        account: string,
        params: TransactionObjectInput,
        outcome: TransactionObjectInput,
        _actionArgs: ToggleUnverifiedAllowedArgs,
    ): TransactionResult {
        return config.requestToggleUnverifiedAllowed(
            tx,
            accountGenerics,
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
        return config.executeToggleUnverifiedAllowed(
            tx,
            accountGenerics,
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
