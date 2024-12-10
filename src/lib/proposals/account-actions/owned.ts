import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import * as owned from "../../../.gen/account-actions/owned/functions";
import { ProposalArgs, ProposalFields, WithdrawAndTransferArgs, WithdrawAndVestArgs } from "../../../types/proposal-types";
import { Proposal } from "../proposal";
import { Outcome } from "../outcome";
import { WithdrawAction } from "src/.gen/account-actions/owned/structs";
import { TransferAction } from "src/.gen/account-actions/transfer/structs";
import { VestingAction } from "src/.gen/account-actions/vesting/structs";

export class WithdrawAndTransferProposal extends Proposal {
    args?: WithdrawAndTransferArgs;
    // TODO: get object info from ./objects/owned.ts

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: ProposalFields,
    ): Promise<WithdrawAndTransferProposal> {
        const proposal = new WithdrawAndTransferProposal(client, account, outcome, fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actionsId);

        proposal.args = {
            transfers: Array.from({ length: actions.length / 2 }, (_, i) => ({
                objectId: WithdrawAction.fromFieldsWithTypes(actions[i * 2]).objectId,
                recipient: TransferAction.fromFieldsWithTypes(actions[i * 2 + 1]).recipient,
            })),
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
        actionArgs: WithdrawAndTransferArgs,
    ): TransactionResult {
        return owned.proposeTransfer(
            tx,
            accountGenerics,
            {
                auth,
                account,
                outcome,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                executionTime: BigInt(proposalArgs.executionTime ?? 0),
                expirationTime: BigInt(proposalArgs.expirationTime ?? Math.floor(Date.now()) + 7 * 24 * 60 * 60 * 1000),
                objectIds: actionArgs.transfers.map(transfer => transfer.objectId),
                recipients: actionArgs.transfers.map(transfer => transfer.recipient),
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        let result;
        for (let i = 0; i < this.args!.transfers.length; i++) {
            result = owned.executeTransfer(
                tx,
                [...accountGenerics, ""], // TODO: get object type
                {
                    executable,
                    account: this.account!,
                    receiving: this.args!.transfers[i].objectId,
                }
            );
        }
        return result!;
    }
}

export class WithdrawAndVestProposal extends Proposal {
    args?: WithdrawAndVestArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: ProposalFields,
    ): Promise<WithdrawAndVestProposal> {
        const proposal = new WithdrawAndVestProposal(client, account, outcome, fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actionsId);

        proposal.args = {
            coinId: WithdrawAction.fromFieldsWithTypes(actions[0]).objectId,
            start: Number(VestingAction.fromFieldsWithTypes(actions[1]).startTimestamp),
            end: Number(VestingAction.fromFieldsWithTypes(actions[1]).endTimestamp),
            recipient: VestingAction.fromFieldsWithTypes(actions[1]).recipient,
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
        actionArgs: WithdrawAndVestArgs,
    ): TransactionResult {
        return owned.proposeVesting(
            tx,
            accountGenerics,
            {
                auth,
                account,
                outcome,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                executionTime: BigInt(proposalArgs.executionTime ?? 0),
                expirationTime: BigInt(proposalArgs.expirationTime ?? Math.floor(Date.now()) + 7 * 24 * 60 * 60 * 1000),
                coinId: actionArgs.coinId,
                startTimestamp: BigInt(actionArgs.start),
                endTimestamp: BigInt(actionArgs.end),
                recipient: actionArgs.recipient,
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return owned.executeVesting(
            tx,
            [...accountGenerics, ""], // TODO: get CoinType
            {
                executable,
                account: this.account!,
                receiving: this.args!.coinId,
            }
        );
    }
}