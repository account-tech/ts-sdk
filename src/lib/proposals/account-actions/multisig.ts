import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import * as multisig from "../../../.gen/account-config/multisig/functions";
import { ConfigMultisigAction } from "../../../.gen/account-config/multisig/structs";
import { ConfigMultisigArgs, ProposalArgs, ProposalFields } from "../../../types/proposal-types";
import { Proposal } from "../proposal";
import { Outcome } from "../outcome";

export class ConfigMultisigProposal extends Proposal {
    args?: ConfigMultisigArgs;

    static async init(
        client: SuiClient,
        multisig: string,
        outcome: Outcome,
        fields: ProposalFields,
    ): Promise<ConfigMultisigProposal> {
        const proposal = new ConfigMultisigProposal(client, multisig, outcome, fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actionsId);
        const configMultisigAction = ConfigMultisigAction.fromFieldsWithTypes(actions[0]);

        proposal.args = {
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

        return proposal;
    }

    propose(
        tx: Transaction,
        _accountGenerics: [string, string], // can be anything, this is just to respect the interface
        auth: TransactionObjectInput,
        outcome: TransactionObjectInput,
        account: string,
        proposalArgs: ProposalArgs,
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

        return multisig.proposeConfigMultisig(
            tx,
            {
                auth,
                account,
                outcome,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                executionTime: BigInt(proposalArgs.executionTime ?? 0),
                expirationTime: BigInt(proposalArgs.expirationTime ?? Math.floor(Date.now()) + 7 * 24 * 60 * 60 * 1000),
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
}
