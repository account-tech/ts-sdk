import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import * as upgradePolicies from "src/.gen/account-actions/upgrade-policies/functions";
import { ProposalArgs, ProposalFields, RestrictArgs, UpgradeArgs } from "../../../types/proposal-types";
import { Proposal } from "../proposal";
import { Outcome } from "../outcome";
import { RestrictAction, UpgradeAction } from "src/.gen/account-actions/upgrade-policies/structs";
import { CLOCK } from "src/types/constants";

export class UpgradeProposal extends Proposal {
    args?: UpgradeArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: ProposalFields,
    ): Promise<UpgradeProposal> {
        const proposal = new UpgradeProposal(client, account, outcome, fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actionsId);
        const upgradeAction = UpgradeAction.fromFieldsWithTypes(actions[0]);

        proposal.args = {
            package: upgradeAction.package,
            digest: upgradeAction.digest,
        };
        return proposal;
    }

    propose(
        tx: Transaction,
        accountGenerics: [string, string],
        auth: TransactionObjectInput,
        outcome: TransactionObjectInput,
        account: string,
        proposalArgs: ProposalArgs,
        actionArgs: UpgradeArgs,
    ): TransactionResult {
        return upgradePolicies.proposeUpgrade(
            tx,
            accountGenerics,
            {
                auth,
                account,
                outcome,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                expirationTime: BigInt(proposalArgs.expirationTime ?? Math.floor(Date.now()) + 7 * 24 * 60 * 60 * 1000),
                package: actionArgs.package,
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
        return upgradePolicies.executeUpgrade(
            tx,
            accountGenerics,
            {
                executable,
                account: this.account!,
            }
        );
    }
}

export class RestrictProposal extends Proposal {
    args?: RestrictArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: ProposalFields,
    ): Promise<RestrictProposal> {
        const proposal = new RestrictProposal(client, account, outcome, fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actionsId);
        const restrictAction = RestrictAction.fromFieldsWithTypes(actions[0]);

        proposal.args = {
            package: restrictAction.package,
            policy: restrictAction.policy,
        };
        return proposal;
    }

    propose(
        tx: Transaction,
        accountGenerics: [string, string],
        auth: TransactionObjectInput,
        outcome: TransactionObjectInput,
        account: string,
        proposalArgs: ProposalArgs,
        actionArgs: RestrictArgs,
    ): TransactionResult {
        return upgradePolicies.proposeRestrict(
            tx,
            accountGenerics,
            {
                auth,
                account,
                outcome,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                expirationTime: BigInt(proposalArgs.expirationTime ?? Math.floor(Date.now()) + 7 * 24 * 60 * 60 * 1000),
                package: actionArgs.package,
                policy: actionArgs.policy,
                clock: CLOCK
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return upgradePolicies.executeRestrict(
            tx,
            accountGenerics,
            {
                executable,
                account: this.account!,
            }
        );
    }
}