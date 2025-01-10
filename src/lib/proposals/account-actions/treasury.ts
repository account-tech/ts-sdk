import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import * as treasury from "src/.gen/account-actions/treasury/functions";
import * as transfer from "src/.gen/account-actions/transfer/functions";
import * as vesting from "src/.gen/account-actions/vesting/functions";
import { SpendAction } from "src/.gen/account-actions/treasury/structs";
import { TransferAction } from "src/.gen/account-actions/transfer/structs";
import { VestingAction } from "src/.gen/account-actions/vesting/structs";
import { ProposalArgs, ProposalFields, SpendAndTransferArgs, SpendAndVestArgs } from "../../../types/proposal-types";
import { Proposal } from "../proposal";
import { Outcome } from "../outcome";

export class SpendAndTransferProposal extends Proposal {
    args?: SpendAndTransferArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: ProposalFields,
    ): Promise<SpendAndTransferProposal> {
        const proposal = new SpendAndTransferProposal(client, account, outcome, fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actionsId);
        const coinType = actions[0].type.match(/<([^>]*)>/)[1];

        proposal.args = {
            treasuryName: fields.issuer.roleName,
            coinType,
            transfers: Array.from({ length: actions.length / 2 }, (_, i) => ({
                amount: Number(SpendAction.fromFieldsWithTypes(coinType, actions[i * 2]).amount),
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
        actionArgs: SpendAndTransferArgs,
    ): TransactionResult {
        return treasury.proposeTransfer(
            tx,
            [...accountGenerics, actionArgs.coinType],
            {
                auth,
                account,
                outcome,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                executionTime: BigInt(proposalArgs.executionTime ?? 0),
                expirationTime: BigInt(proposalArgs.expirationTime ?? Math.floor(Date.now()) + 7 * 24 * 60 * 60 * 1000),
                treasuryName: actionArgs.treasuryName,
                amounts: actionArgs.transfers.map(transfer => BigInt(transfer.amount)),
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
            result = treasury.executeTransfer(
                tx,
                [...accountGenerics, this.args!.coinType],
                {
                    executable,
                    account: this.account!,
                }
            );
        }
        return result!;
    }

    delete(
        tx: Transaction,
        accountGenerics: [string, string],
        expired: TransactionObjectInput,
    ): TransactionResult {
        let result;
        for (let i = 0; i < this.args!.transfers.length; i++) {
            result = treasury.deleteSpendAction(
                tx,
                [accountGenerics[1], this.args!.coinType],
                expired
            );
            result = transfer.deleteTransferAction(
                tx,
                accountGenerics[1],
                expired
            );
        }
        return result!;
    }
}

export class SpendAndVestProposal extends Proposal {
    args?: SpendAndVestArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: ProposalFields,
    ): Promise<SpendAndVestProposal> {
        const proposal = new SpendAndVestProposal(client, account, outcome, fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actionsId);
        const coinType = actions[0].type.match(/<([^>]*)>/)[1];

        proposal.args = {
            treasuryName: fields.issuer.roleName,
            coinType,
            amount: Number(SpendAction.fromFieldsWithTypes(coinType, actions[0]).amount),
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
        actionArgs: SpendAndVestArgs,
    ): TransactionResult {
        return treasury.proposeVesting(
            tx,
            [...accountGenerics, actionArgs.coinType],
            {
                auth,
                account,
                outcome,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                executionTime: BigInt(proposalArgs.executionTime ?? 0),
                expirationTime: BigInt(proposalArgs.expirationTime ?? Math.floor(Date.now()) + 7 * 24 * 60 * 60 * 1000),
                treasuryName: actionArgs.treasuryName,
                coinAmount: BigInt(actionArgs.amount),
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
        return treasury.executeVesting(
            tx,
            [...accountGenerics, this.args!.coinType],
            {
                executable,
                account: this.account!,
            }
        );
    }

    delete(
        tx: Transaction,
        accountGenerics: [string, string],
        expired: TransactionObjectInput,
    ): TransactionResult {
        return vesting.deleteVestingAction(
            tx,
            accountGenerics[1],
            expired
        );
    }
}