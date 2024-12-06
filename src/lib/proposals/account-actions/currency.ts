import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { CoinMetadata, SuiClient } from "@mysten/sui/client";
import { getCoinMeta } from "@polymedia/coinmeta";
import * as currency from "../../../.gen/account-actions/currency/functions";
import { MintAction, BurnAction, UpdateAction, DisableAction } from "../../../.gen/account-actions/currency/structs";
import { UpdateArgs, BurnArgs, MintArgs, ProposalArgs, ProposalFields, DisableArgs } from "../../../types/proposal-types";
import { Proposal } from "../proposal";
import { Outcome } from "../outcome";
import { WithdrawAction } from "src/.gen/account-actions/owned/structs";

export class DisableProposal extends Proposal {
    args?: DisableArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: ProposalFields,
    ): Promise<DisableProposal> {
        const proposal = new DisableProposal(client, account, outcome, fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actionsId);

        const coinType = actions[0].type.match(/<([^>]*)>/)[1];
        const disableAction = DisableAction.fromFieldsWithTypes(coinType, actions[0]); // CoinType, DisableAction

        proposal.args = { 
            coinType,
            mint: disableAction.mint,
            burn: disableAction.burn,
            updateSymbol: disableAction.updateSymbol,
            updateName: disableAction.updateName,
            updateDescription: disableAction.updateDescription,
            updateIcon: disableAction.updateIcon,
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
        actionArgs: DisableArgs,
    ): TransactionResult {
        return currency.proposeDisable(
            tx,
            [...accountGenerics, actionArgs.coinType],
            {
                auth,
                account,
                outcome,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                executionTime: BigInt(proposalArgs.executionTime ?? 0),
                expirationTime: BigInt(proposalArgs.expirationTime ?? Math.floor(Date.now()) + 7*24*60*60*1000),
                disableMint: actionArgs.mint,
                disableBurn: actionArgs.burn,
                disableUpdateSymbol: actionArgs.updateSymbol,
                disableUpdateName: actionArgs.updateName,
                disableUpdateDescription: actionArgs.updateDescription,
                disableUpdateIcon: actionArgs.updateIcon,
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return currency.executeDisable(
            tx,
            [...accountGenerics, this.args!.coinType],
            {
                executable,
                account: this.account!,
            }
        );
    }
}

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

        const coinType = actions[0].type.match(/<([^>]*)>/)[1];
        const mintAction = MintAction.fromFieldsWithTypes(coinType, actions[0]); // CoinType, MintAction

        proposal.args = { 
            coinType,
            amount: Number(mintAction.amount),
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
        actionArgs: MintArgs,
    ): TransactionResult {
        return currency.proposeMint(
            tx,
            [...accountGenerics, actionArgs.coinType],
            {
                auth,
                account,
                outcome,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                executionTime: BigInt(proposalArgs.executionTime ?? 0),
                expirationTime: BigInt(proposalArgs.expirationTime ?? Math.floor(Date.now()) + 7*24*60*60*1000),
                amount: BigInt(actionArgs.amount),
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return currency.executeMint(
            tx,
            [...accountGenerics, this.args!.coinType],
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

        const withdrawAction = WithdrawAction.fromFieldsWithTypes(actions[0]); // CoinType, WithdrawAction
        const coinType = actions[0].type.match(/<([^>]*)>/)[1];
        const burnAction = BurnAction.fromFieldsWithTypes(coinType, actions[1]); // CoinType, BurnAction

        proposal.args = { 
            coinType,
            coinId: withdrawAction.objectId,
            amount: Number(burnAction.amount),
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
        actionArgs: BurnArgs,
    ): TransactionResult {
        return currency.proposeBurn(
            tx,
            [...accountGenerics, actionArgs.coinType],
            {
                auth,
                account,
                outcome,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                executionTime: BigInt(proposalArgs.executionTime ?? 0),
                expirationTime: BigInt(proposalArgs.expirationTime ?? Math.floor(Date.now()) + 7*24*60*60*1000),
                coinId: actionArgs.coinId,
                amount: BigInt(actionArgs.amount),
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return currency.executeBurn(
            tx,
            [...accountGenerics, this.args!.coinType],
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

        const coinType = actions[0].type.match(/<([^>]*)>/)[1];
        const updateAction = UpdateAction.fromFieldsWithTypes(coinType, actions[0]); // CoinType, UpdateAction

        proposal.args = { 
            coinType,
            name: updateAction.name,
            symbol: updateAction.symbol,
            description: updateAction.description,
            icon: updateAction.iconUrl,
        };

        proposal.metadata = await getCoinMeta(client, proposal.args.coinType);
        return proposal;
    }

    propose(
        tx: Transaction,
        accountGenerics: [string, string],
        auth: TransactionObjectInput,
        outcome: TransactionObjectInput,
        account: string,
        proposalArgs: ProposalArgs,
        actionArgs: UpdateArgs,
    ): TransactionResult {
        return currency.proposeUpdate(
            tx,
            [...accountGenerics, this.args!.coinType],
            {
                auth,
                account,
                outcome,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                executionTime: BigInt(proposalArgs.executionTime ?? 0),
                expirationTime: BigInt(proposalArgs.expirationTime ?? Math.floor(Date.now()) + 7*24*60*60*1000),
                mdName: actionArgs.name,
                mdSymbol: actionArgs.symbol,
                mdDescription: actionArgs.description,
                mdIcon: actionArgs.icon,
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        if (!this.metadata?.id) {
            throw new Error('Metadata not found for the Update proposal');
        }
        
        return currency.executeUpdate(
            tx,
            [...accountGenerics, this.args!.coinType],
            {
                executable,
                account: this.account!,
                metadata: this.metadata?.id!,
            }
        );
    }
}