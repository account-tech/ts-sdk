import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { CoinMetadata, SuiClient } from "@mysten/sui/client";
import { getCoinMeta } from "@polymedia/coinmeta";
import * as currency from "src/.gen/account-actions/currency/functions";
import { UpdateArgs, BurnArgs, MintArgs, ProposalArgs, ProposalFields } from "src/types/proposal-types";
import { Proposal } from "../proposal";
import { Outcome } from "../outcome";
import { getAccountGenerics } from "src/lib/utils";

export class MintProposal extends Proposal {
    args?: MintArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: ProposalFields,
    ): Promise<MintProposal> {
        const proposal = new MintProposal(client, account, outcome, fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actionsId);
        if (actions.length === 0) {
            throw new Error('No actions found for the ConfigName proposal');
        }

        proposal.args = { 
            coinType: actions[0].type.match(/<([^>]*)>/)[1],
            amount: actions[0].amount,
        };
        return proposal;
    }

    propose(
        tx: Transaction,
        account: string,
        accountGenerics: [string, string],
        proposalArgs: ProposalArgs,
        actionArgs: MintArgs,
    ): TransactionResult {
        return currency.proposeMint(
            tx,
            [...accountGenerics, actionArgs.coinType],
            {
                auth: proposalArgs.auth,
                account,
                outcome: proposalArgs.outcome,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                executionTime: BigInt(proposalArgs.executionTime ?? 0),
                expirationEpoch: BigInt(proposalArgs.expirationEpoch ?? 0),
                amount: BigInt(actionArgs.amount),
            }
        );
    }

    execute(
        tx: Transaction,
        executable: TransactionObjectInput,
    ): TransactionResult {
        return currency.executeMint(
            tx,
            [...getAccountGenerics(this.outcome), this.args!.coinType],
            {
                executable,
                account: this.account!,
            }
        );
    }
}

export class BurnProposal extends Proposal {
    args?: BurnArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: ProposalFields,
    ): Promise<BurnProposal> {
        const proposal = new BurnProposal(client, account, outcome, fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actionsId);
        if (actions.length === 0) {
            throw new Error('No actions found for the ConfigName proposal');
        }

        proposal.args = { 
            coinType: actions[0].type.match(/<([^>]*)>/)[1],
            coinId: actions[0].coinId,
            amount: actions[0].amount,
        };
        return proposal;
    }

    propose(
        tx: Transaction,
        account: string,
        accountGenerics: [string, string],
        proposalArgs: ProposalArgs,
        actionArgs: BurnArgs,
    ): TransactionResult {
        return currency.proposeBurn(
            tx,
            [...accountGenerics, actionArgs.coinType],
            {
                auth: proposalArgs.auth,
                account,
                outcome: proposalArgs.outcome,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                executionTime: BigInt(proposalArgs.executionTime ?? 0),
                expirationEpoch: BigInt(proposalArgs.expirationEpoch ?? 0),
                coinId: actionArgs.coinId,
                amount: BigInt(actionArgs.amount),
            }
        );
    }

    execute(
        tx: Transaction,
        executable: TransactionObjectInput,
    ): TransactionResult {
        return currency.executeBurn(
            tx,
            [...getAccountGenerics(this.outcome), this.args!.coinType],
            {
                executable,
                account: this.account!,
                receiving: this.args!.coinId,
            }
        );
    }
}

export class UpdateProposal extends Proposal {
    args?: UpdateArgs;
    metadata?: CoinMetadata;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: ProposalFields,
    ): Promise<UpdateProposal> {
        const proposal = new UpdateProposal(client, account, outcome, fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actionsId);
        if (actions.length === 0) {
            throw new Error('No actions found for the ConfigName proposal');
        }

        proposal.args = { 
            coinType: actions[0].type.match(/<([^>]*)>/)[1],
            name: actions[0].name,
            symbol: actions[0].symbol,
            description: actions[0].description,
            icon: actions[0].icon,
        };

        proposal.metadata = await getCoinMeta(client, proposal.args.coinType);
        return proposal;
    }

    propose(
        tx: Transaction,
        account: string,
        accountGenerics: [string, string],
        proposalArgs: ProposalArgs,
        actionArgs: UpdateArgs,
    ): TransactionResult {
        return currency.proposeUpdate(
            tx,
            [...accountGenerics, this.args!.coinType],
            {
                auth: proposalArgs.auth,
                account,
                outcome: proposalArgs.outcome,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                executionTime: BigInt(proposalArgs.executionTime ?? 0),
                expirationEpoch: BigInt(proposalArgs.expirationEpoch ?? 0),
                mdName: actionArgs.name,
                mdSymbol: actionArgs.symbol,
                mdDescription: actionArgs.description,
                mdIcon: actionArgs.icon,
            }
        );
    }

    execute(
        tx: Transaction,
        executable: TransactionObjectInput,
    ): TransactionResult {
        if (!this.metadata?.id) {
            throw new Error('Metadata not found for the Update proposal');
        }
        
        return currency.executeUpdate(
            tx,
            [...getAccountGenerics(this.outcome), this.args!.coinType],
            {
                executable,
                account: this.account!,
                metadata: this.metadata?.id!,
            }
        );
    }
}