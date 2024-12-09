import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import { ListAction, TakeAction } from "../../../.gen/account-actions/kiosk/structs";
import * as kiosk from "../../../.gen/account-actions/kiosk/functions";
import { ListArgs, ProposalArgs, ProposalFields, TakeArgs } from "../../../types/proposal-types";
import { Proposal } from "../proposal";
import { Outcome } from "../outcome";

export class TakeProposal extends Proposal {
    args?: TakeArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: ProposalFields,
    ): Promise<TakeProposal> {
        const proposal = new TakeProposal(client, account, outcome, fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actionsId);
        const takeActions = actions.map(action => TakeAction.fromFieldsWithTypes(action));

        proposal.args = {
            name: fields.issuer.roleName,
            nftIds: takeActions.map(action => action.nftId),
            recipient: takeActions[0].recipient,
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
        actionArgs: TakeArgs,
    ): TransactionResult {
        return kiosk.proposeTake(
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
                kioskName: actionArgs.name,
                nftIds: actionArgs.nftIds,
                recipient: actionArgs.recipient,
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
        typesAndPolicies: { type: string, policy: string }[],
        accountKiosk: string,
        recipientKiosk: string,
        recipientCap: string,
    ): TransactionResult {
        let result;
        for (const { type, policy } of typesAndPolicies) {
            result = kiosk.executeTake(
                tx,
                [...accountGenerics, type],
                {
                    executable,
                    account: this.account!,
                    accountKiosk,
                    recipientKiosk,
                    recipientCap,
                    policy,
                }
            );
        }
        return result!;
    }
}

export class ListProposal extends Proposal {
    args?: ListArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: ProposalFields,
    ): Promise<ListProposal> {
        const proposal = new ListProposal(client, account, outcome, fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actionsId);
        const listActions = actions.map(action => ListAction.fromFieldsWithTypes(action));

        proposal.args = {
            name: fields.issuer.roleName,
            listings: listActions.map(action => ({ nftId: action.nftId, price: Number(action.price) })),
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
        actionArgs: ListArgs,
    ): TransactionResult {
        return kiosk.proposeList(
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
                kioskName: actionArgs.name,
                nftIds: actionArgs.listings.map(listing => listing.nftId),
                prices: actionArgs.listings.map(listing => BigInt(listing.price)),
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
        nftTypes: string[],
        accountKiosk: string,
    ): TransactionResult {
        let result;
        for (const type of nftTypes) {
            result = kiosk.executeList(
                tx,
                [...accountGenerics, type],
                {
                    executable,
                    account: this.account!,
                    kiosk: accountKiosk,
                }
            );
        }
        return result!;
    }
}