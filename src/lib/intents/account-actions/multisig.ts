import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import * as multisig from "../../../.gen/account-config/multisig/functions";
import * as accountProtocol from "../../../.gen/account-protocol/account/functions";
import * as intents from "../../../.gen/account-protocol/intents/functions";
import { ConfigMultisigAction } from "../../../.gen/account-config/multisig/structs";

import { ConfigMultisigArgs, IntentArgs, IntentFields } from "../types";
import { Intent } from "../intent";
import { Outcome } from "../../outcomes";
import { CLOCK } from "../../../types";

export class ConfigMultisigIntent extends Intent {
    declare args: ConfigMultisigArgs;

    static async init(
        client: SuiClient,
        multisig: string,
        outcome: Outcome,
        fields: IntentFields,
    ): Promise<ConfigMultisigIntent> {
        const intent = new ConfigMultisigIntent(client, multisig, outcome, fields);
        // resolve actions
        const actions = await intent.fetchActions(fields.actionsId);
        const configMultisigAction = ConfigMultisigAction.fromFieldsWithTypes(actions[0]);

        intent.args = {
            members: configMultisigAction.config.members.map((member) => ({
                address: member.addr,
                weight: Number(member.weight),
                roles: member.roles.contents,
            })),
            thresholds: {
                global: Number(configMultisigAction.config.global),
                roles: configMultisigAction.config.roles.map((role) => ({
                    name: role.name,
                    threshold: Number(role.threshold),
                })),
            },
        };

        return intent;
    }

    request(
        tx: Transaction,
        _accountGenerics: [string, string], // can be anything, this is just to respect the interface
        auth: TransactionObjectInput,
        outcome: TransactionObjectInput,
        account: string,
        intentArgs: IntentArgs,
        actionArgs: ConfigMultisigArgs,
    ): TransactionResult {
        let addresses: string[] = [];
        let weights: bigint[] = [];
        let roles: string[][] = [];
        if (actionArgs.members) {
            actionArgs.members.forEach((member) => {
                addresses.push(member.address);
                weights.push(BigInt(member.weight));
                roles.push(member.roles);
            });
        }

        let global = 0n;
        let roleNames: string[] = [];
        let roleThresholds: bigint[] = [];
        if (actionArgs.thresholds) {
            global = BigInt(actionArgs.thresholds.global);
            actionArgs.thresholds.roles.forEach((role) => {
                roleNames.push(role.name);
                roleThresholds.push(BigInt(role.threshold));
            });
        }

        return multisig.requestConfigMultisig(
            tx,
            {
                auth,
                account,
                outcome,
                key: intentArgs.key,
                description: intentArgs.description ?? "",
                executionTime: intentArgs.executionTimes?.[0] ?? 0n,
                expirationTime: intentArgs.expirationTime ?? BigInt(Math.floor(Date.now()) + 7 * 24 * 60 * 60 * 1000),
                addresses,
                weights,
                roles,
                global,
                roleNames,
                roleThresholds,
            }
        );
    }

    execute(
        tx: Transaction,
        _accountGenerics: [string, string], // can be anything, this is just to respect the interface
        executable: TransactionObjectInput,
    ): TransactionResult {
        return multisig.executeConfigMultisig(
            tx,
            {
                executable,
                account: this.account,
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
        multisig.deleteConfigMultisig(
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
        multisig.deleteConfigMultisig(
            tx,
            expired
        );
        return intents.destroyEmptyExpired(
            tx,
            expired,
        );
    }
}