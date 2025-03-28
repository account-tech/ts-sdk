import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import * as multisig from "../../../.gen/account-multisig/config/functions";
import * as accountProtocol from "../../../.gen/account-protocol/account/functions";
import * as intents from "../../../.gen/account-protocol/intents/functions";
import { ConfigMultisigAction } from "../../../.gen/account-multisig/config/structs";

import { ConfigMultisigArgs, MultisigIntentTypes } from "../types";
import { Intent } from "../intent";
import { CLOCK } from "../../../types";

export class ConfigMultisigIntent extends Intent {
    static type = MultisigIntentTypes.ConfigMultisig;
    declare args: ConfigMultisigArgs;

    async init() {
        const intent = new ConfigMultisigIntent(this.client, this.account, this.outcome, this.fields);
        // resolve actions
        const actions = await intent.fetchActions(this.fields.actionsId);
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
    }

    request(
        tx: Transaction,
        _accountGenerics: [string, string], // can be anything, this is just to respect the interface
        auth: TransactionObjectInput,
        account: string,
        params: TransactionObjectInput,
        outcome: TransactionObjectInput,
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
                params,
                outcome,
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