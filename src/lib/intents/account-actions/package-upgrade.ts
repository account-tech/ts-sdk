import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import * as accountProtocol from "../../../.gen/account-protocol/account/functions";
import * as intents from "../../../.gen/account-protocol/intents/functions";
import * as upgradePolicies from "../../../.gen/account-actions/package-upgrade/functions";
import * as upgradePoliciesIntents from "../../../.gen/account-actions/package-upgrade-intents/functions";
import { RestrictAction, UpgradeAction } from "../../../.gen/account-actions/package-upgrade/structs";

import { IntentArgs, IntentFields, RestrictPolicyArgs, UpgradePackageArgs } from "../types";
import { Intent } from "../intent";
import { Outcome } from "../../outcomes";
import { CLOCK } from "../../../types";

export class UpgradePackageIntent extends Intent {
    declare args: UpgradePackageArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: IntentFields,
    ): Promise<UpgradePackageIntent> {
        const intent = new UpgradePackageIntent(client, account, outcome, fields);
        // resolve actions
        const actions = await intent.fetchActions(fields.actionsId);
        const upgradeAction = UpgradeAction.fromFieldsWithTypes(actions[0]);

        intent.args = {
            packageName: upgradeAction.name,
            digest: upgradeAction.digest,
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
        actionArgs: UpgradePackageArgs,
    ): TransactionResult {
        return upgradePoliciesIntents.requestUpgradePackage(
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
                packageName: actionArgs.packageName,
                digest: actionArgs.digest,
                clock: CLOCK
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return upgradePoliciesIntents.executeUpgradePackage(
            tx,
            accountGenerics,
            {
                executable,
                account: this.account!,
                clock: CLOCK
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
        upgradePolicies.deleteUpgrade(
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
        upgradePolicies.deleteUpgrade(
            tx,
            expired
        );
        return intents.destroyEmptyExpired(
            tx,
            expired,
        );
    }
}

export class RestrictPolicyIntent extends Intent {
    declare args: RestrictPolicyArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: IntentFields,
    ): Promise<RestrictPolicyIntent> {
        const intent = new RestrictPolicyIntent(client, account, outcome, fields);
        // resolve actions
        const actions = await intent.fetchActions(fields.actionsId);
        const restrictAction = RestrictAction.fromFieldsWithTypes(actions[0]);

        intent.args = {
            packageName: restrictAction.name,
            policy: restrictAction.policy,
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
        actionArgs: RestrictPolicyArgs,
    ): TransactionResult {
        return upgradePoliciesIntents.requestRestrictPolicy(
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
                packageName: actionArgs.packageName,
                policy: actionArgs.policy,
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return upgradePoliciesIntents.executeRestrictPolicy(
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
        upgradePolicies.deleteRestrict(
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
        upgradePolicies.deleteRestrict(
            tx,
            expired
        );
        return intents.destroyEmptyExpired(
            tx,
            expired,
        );
    }
}