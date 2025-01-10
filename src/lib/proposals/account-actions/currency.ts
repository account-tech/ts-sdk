import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { CoinMetadata, SuiClient } from "@mysten/sui/client";
import { getCoinMeta } from "@polymedia/coinmeta";
import * as currency from "../../../.gen/account-actions/currency/functions";
import * as owned from "../../../.gen/account-actions/owned/functions";
import * as transfer from "../../../.gen/account-actions/transfer/functions";
import * as vesting from "../../../.gen/account-actions/vesting/functions";
import { MintAction, BurnAction, UpdateAction, DisableAction } from "../../../.gen/account-actions/currency/structs";
import { UpdateArgs, BurnArgs, MintArgs, ProposalArgs, ProposalFields, DisableArgs, MintAndTransferArgs, MintAndVestArgs } from "../../../types/proposal-types";
import { Proposal } from "../proposal";
import { Outcome } from "../outcome";
import { WithdrawAction } from "src/.gen/account-actions/owned/structs";
import { TransferAction } from "src/.gen/account-actions/transfer/structs";
import { VestingAction } from "src/.gen/account-actions/vesting/structs";

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

    delete(
        tx: Transaction,
        accountGenerics: [string, string],
        expired: TransactionObjectInput,
    ): TransactionResult {
        return currency.deleteDisableAction(
            tx,
            [accountGenerics[1], this.args!.coinType],
            expired
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

    delete(
        tx: Transaction,
        accountGenerics: [string, string],
        expired: TransactionObjectInput,
    ): TransactionResult {
        return currency.deleteMintAction(
            tx,
            [accountGenerics[1], this.args!.coinType],
            expired
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
        const coinType = actions[1].type.match(/<([^>]*)>/)[1];
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

    delete(
        tx: Transaction,
        accountGenerics: [string, string],
        expired: TransactionObjectInput,
    ): TransactionResult {
        owned.deleteWithdrawAction(
            tx,
            accountGenerics[1],
            expired
        );
        return currency.deleteBurnAction(
            tx,
            [accountGenerics[1], this.args!.coinType],
            expired
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

    delete(
        tx: Transaction,
        accountGenerics: [string, string],
        expired: TransactionObjectInput,
    ): TransactionResult {
        return currency.deleteUpdateAction(
            tx,
            [accountGenerics[1], this.args!.coinType],
            expired
        );
    }
}

export class MintAndTransferProposal extends Proposal {
    args?: MintAndTransferArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: ProposalFields,
    ): Promise<MintAndTransferProposal> {
        const proposal = new MintAndTransferProposal(client, account, outcome, fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actionsId);
        const coinType = actions[0].type.match(/<([^>]*)>/)[1];

        proposal.args = {
            coinType,
            transfers: Array.from({ length: actions.length / 2 }, (_, i) => ({
                amount: Number(MintAction.fromFieldsWithTypes(coinType, actions[i * 2]).amount),
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
        actionArgs: MintAndTransferArgs,
    ): TransactionResult {
        return currency.proposeTransfer(
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
            result = currency.executeTransfer(
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
        transfer.deleteTransferAction(
            tx,
            accountGenerics[1],
            expired
        );
        return currency.deleteMintAction(
            tx,
            [accountGenerics[1], this.args!.coinType],
            expired
        );
    }
}

export class MintAndVestProposal extends Proposal {
    args?: MintAndVestArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: ProposalFields,
    ): Promise<MintAndVestProposal> {
        const proposal = new MintAndVestProposal(client, account, outcome, fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actionsId);
        const coinType = actions[0].type.match(/<([^>]*)>/)[1];

        proposal.args = {
            coinType,
            amount: Number(MintAction.fromFieldsWithTypes(coinType, actions[0]).amount),
            recipient: VestingAction.fromFieldsWithTypes(actions[1]).recipient,
            start: Number(VestingAction.fromFieldsWithTypes(actions[1]).startTimestamp),
            end: Number(VestingAction.fromFieldsWithTypes(actions[1]).endTimestamp),
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
        actionArgs: MintAndVestArgs,
    ): TransactionResult {
        return currency.proposeVesting(
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
                totalAmount: BigInt(actionArgs.amount),
                recipient: actionArgs.recipient,
                startTimestamp: BigInt(actionArgs.start),
                endTimestamp: BigInt(actionArgs.end),
            }
        );
    }

    execute(
        tx: Transaction,
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
    ): TransactionResult {
        return currency.executeVesting(
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
        vesting.deleteVestingAction(
            tx,
            accountGenerics[1],
            expired
        );
        return currency.deleteMintAction(
            tx,
            [accountGenerics[1], this.args!.coinType],
            expired
        );
    }
}