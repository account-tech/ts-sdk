import { Transaction, TransactionResult } from "@mysten/sui/transactions";
import { CoinMetadata, SuiClient } from "@mysten/sui/client";
import { getCoinMeta } from "@polymedia/coinmeta";
import * as currency from "../../../.gen/kraken-actions/currency/functions";
import { Proposal } from "../proposal";
import { ProposalFields } from "src/.gen/kraken-multisig/proposals/structs";
import { UpdateArgs, BurnArgs, MintArgs, ProposalArgs } from "src/types/proposal-types";

export class MintProposal extends Proposal<MintArgs> {

    static async init(
        client: SuiClient,
        multisig: string,
        fields: ProposalFields,
    ): Promise<MintProposal> {
        const proposal = new MintProposal(client, multisig);
        proposal.setProposalFromFields(fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actions.id);
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
        multisig: string,
        proposalArgs: ProposalArgs,
        actionArgs: MintArgs,
    ): TransactionResult {
        return currency.proposeMint(
            tx,
            actionArgs.coinType,
            {
                multisig,
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
    ): TransactionResult {
        const executable = this.constructExecutable(tx);
        return currency.executeMint(
            tx,
            this.args!.coinType,
            {
                executable,
                multisig: this.multisig!,
            }
        );
    }
}

export class BurnProposal extends Proposal<BurnArgs> {

    static async init(
        client: SuiClient,
        multisig: string,
        fields: ProposalFields,
    ): Promise<BurnProposal> {
        const proposal = new BurnProposal(client, multisig);
        proposal.setProposalFromFields(fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actions.id);
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
        multisig: string,
        proposalArgs: ProposalArgs,
        actionArgs: BurnArgs,
    ): TransactionResult {
        return currency.proposeBurn(
            tx,
            actionArgs.coinType,
            {
                multisig,
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
    ): TransactionResult {
        const executable = this.constructExecutable(tx);
        return currency.executeBurn(
            tx,
            this.args!.coinType,
            {
                executable,
                multisig: this.multisig!,
                receiving: this.args!.coinId,
            }
        );
    }
}

export class UpdateProposal extends Proposal<UpdateArgs> {
    metadata?: CoinMetadata;

    static async init(
        client: SuiClient,
        multisig: string,
        fields: ProposalFields,
    ): Promise<UpdateProposal> {
        const proposal = new UpdateProposal(client, multisig);
        proposal.setProposalFromFields(fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actions.id);
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
        multisig: string,
        proposalArgs: ProposalArgs,
        actionArgs: UpdateArgs,
    ): TransactionResult {
        return currency.proposeUpdate(
            tx,
            actionArgs.coinType,
            {
                multisig,
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
    ): TransactionResult {
        if (!this.metadata?.id) {
            throw new Error('Metadata not found for the Update proposal');
        }
        
        const executable = this.constructExecutable(tx);
        return currency.executeUpdate(
            tx,
            this.args!.coinType,
            {
                executable,
                multisig: this.multisig!,
                metadata: this.metadata?.id!,
            }
        );
    }
}