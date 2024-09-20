import { Transaction, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import * as currency from "../../../.gen/kraken-actions/currency/functions";
import { Proposal } from "../proposal";
import { ProposalFields } from "src/.gen/kraken-multisig/proposals/structs";
import { UpdateArgs, BurnArgs, MintArgs, ProposalArgs, ProposalTypes } from "src/types/proposalTypes";

export class MintProposal extends Proposal {
    args?: MintArgs;

    constructor(
        public client: SuiClient,
        public multisig: string,
    ) {
        super(client, multisig);
    }

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

    propose<Args>(
        tx: Transaction,
        multisig: string,
        proposalArgs: ProposalArgs,
        actionArgs: Args,
    ): TransactionResult {
        const mintArgs = actionArgs as MintArgs;
        return currency.proposeMint(
            tx,
            mintArgs.coinType,
            {
                multisig,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                executionTime: BigInt(proposalArgs.executionTime ?? 0),
                expirationEpoch: BigInt(proposalArgs.expirationEpoch ?? 0),
                amount: BigInt(mintArgs.amount),
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

export class BurnProposal extends Proposal {
    args?: BurnArgs;

    constructor(
        public client: SuiClient,
        public multisig: string,
    ) {
        super(client, multisig);
    }

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

    propose<Args>(
        tx: Transaction,
        multisig: string,
        proposalArgs: ProposalArgs,
        actionArgs: Args,
    ): TransactionResult {
        const burnArgs = actionArgs as BurnArgs;
        return currency.proposeBurn(
            tx,
            burnArgs.coinType,
            {
                multisig,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                executionTime: BigInt(proposalArgs.executionTime ?? 0),
                expirationEpoch: BigInt(proposalArgs.expirationEpoch ?? 0),
                coinId: burnArgs.coinId,
                amount: BigInt(burnArgs.amount),
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

export class UpdateProposal extends Proposal {
    args?: UpdateArgs;

    constructor(
        public client: SuiClient,
        public multisig: string,
    ) {
        super(client, multisig);
    }

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
        return proposal;
    }

    propose<Args>(
        tx: Transaction,
        multisig: string,
        proposalArgs: ProposalArgs,
        actionArgs: Args,
    ): TransactionResult {
        const updateArgs = actionArgs as UpdateArgs;
        return currency.proposeUpdate(
            tx,
            updateArgs.coinType,
            {
                multisig,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                executionTime: BigInt(proposalArgs.executionTime ?? 0),
                expirationEpoch: BigInt(proposalArgs.expirationEpoch ?? 0),
                mdName: updateArgs.name,
                mdSymbol: updateArgs.symbol,
                mdDescription: updateArgs.description,
                mdIcon: updateArgs.icon,
            }
        );
    }

    execute(
        tx: Transaction,
        metadata: string,
    ): TransactionResult {
        const executable = this.constructExecutable(tx);
        return currency.executeUpdate(
            tx,
            this.args!.coinType,
            {
                executable,
                multisig: this.multisig!,
                metadata,
            }
        );
    }
}