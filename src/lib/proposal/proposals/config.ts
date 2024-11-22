import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import * as config from "src/.gen/account-actions/config/functions";
import { Proposal } from "../proposal";
import { EXTENSIONS } from "src/types/constants";
import { ConfigDepsArgs, ConfigMetadataArgs, ProposalArgs, ProposalFields } from "src/types/proposal-types";
import { Outcome } from "../outcome";

export class ConfigMetadataProposal extends Proposal {
    args?: ConfigMetadataArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: ProposalFields,
    ): Promise<ConfigMetadataProposal> {
        const proposal = new ConfigMetadataProposal(client, account, outcome, fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actionsId);
        if (actions.length === 0) {
            throw new Error('No actions found for the ConfigMetadata proposal');
        }

        proposal.args = {
            name: actions[0].metadata.inner.contents[0],
            other: actions[0].metadata.inner.contents.slice(1),
        };
        return proposal;
    }

    propose(
        tx: Transaction,
        auth: TransactionObjectInput,
        outcome: TransactionObjectInput,
        account: string,
        accountGenerics: [string, string],
        proposalArgs: ProposalArgs,
        actionArgs: ConfigMetadataArgs,
    ): TransactionResult {
        const keys: string[] = ["name"];
        const values: string[] = [actionArgs.name];
        actionArgs.other?.forEach(([key, value]) => {
            keys.push(key);
            values.push(value);
        });

        return config.proposeConfigMetadata(
            tx,
            accountGenerics,
            {
                auth,
                account,
                outcome,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                executionTime: BigInt(proposalArgs.executionTime ?? 0),
                expirationTime: BigInt(proposalArgs.expirationTime ?? Math.floor(Date.now()) + 7*24*60*60*1000),
                keys,
                values,
            }
        );
    }

    execute(
        tx: Transaction,
        executable: TransactionObjectInput,
        accountGenerics: [string, string],
    ): TransactionResult {
        return config.executeConfigMetadata(
            tx,
            accountGenerics,
            {
                executable,
                account: this.account!,
            }
        );
    }
}

export class ConfigDepsProposal extends Proposal {
    args?: ConfigDepsArgs;

    static async init(
        client: SuiClient,
        account: string,
        outcome: Outcome,
        fields: ProposalFields,
    ): Promise<ConfigDepsProposal> {
        const proposal = new ConfigDepsProposal(client, account, outcome, fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actionsId);
        if (actions.length === 0) {
            throw new Error('No actions found for the ConfigDeps proposal');
        }

        proposal.args = {
            deps: actions[0].deps.inner,
        };
        return proposal;
    }

    propose(
        tx: Transaction,
        auth: TransactionObjectInput,
        outcome: TransactionObjectInput,
        account: string,
        accountGenerics: [string, string],
        proposalArgs: ProposalArgs,
        actionArgs: ConfigDepsArgs,
    ): TransactionResult {
        const names: string[] = [];
        const addresses: string[] = [];
        const versions: bigint[] = [];
        actionArgs.deps.forEach((dep) => {
            names.push(dep.name);
            addresses.push(dep.addr);
            versions.push(BigInt(dep.version));
        });

        return config.proposeConfigDeps(
            tx,
            accountGenerics,
            {
                auth,
                account,
                outcome,
                key: proposalArgs.key,
                description: proposalArgs.description ?? "",
                executionTime: BigInt(proposalArgs.executionTime ?? 0),
                expirationTime: BigInt(proposalArgs.expirationTime ?? Math.floor(Date.now()) + 7*24*60*60*1000),
                extensions: EXTENSIONS,
                names,
                addresses,
                versions,
            }
        );
    }

    execute(
        tx: Transaction,
        executable: TransactionObjectInput,
        accountGenerics: [string, string],
    ): TransactionResult {
        return config.executeConfigDeps(
            tx,
            accountGenerics,
            {
                executable,
                account: this.account!,
            }
        );
    }
}