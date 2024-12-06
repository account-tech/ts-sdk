import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import * as accessControl from "../../../.gen/account-actions/access-control/functions";
import { AccessArgs, ProposalArgs, ProposalFields } from "../../../types/proposal-types";
import { Proposal } from "../proposal";
import { Outcome } from "../outcome";

export class AccessControlProposal extends Proposal {
    args?: AccessArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: ProposalFields,
    ): Promise<AccessControlProposal> {
        const proposal = new AccessControlProposal(client, account, outcome, fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actionsId);
        const capType = actions[0].type;

        proposal.args = {
            capType,
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
        actionArgs: AccessArgs,
    ): TransactionResult {
        return accessControl.proposeAccess(
            tx,
            [...accountGenerics, actionArgs.capType],
            {
                auth,
                account,
                outcome,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                executionTime: BigInt(proposalArgs.executionTime ?? 0),
                expirationTime: BigInt(proposalArgs.expirationTime ?? Math.floor(Date.now()) + 7 * 24 * 60 * 60 * 1000),
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return accessControl.executeAccess(
            tx,
            [...accountGenerics, this.args!.capType],
            {
                executable,
                account: this.account!,
            }
        );
    }
}