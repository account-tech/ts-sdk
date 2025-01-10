import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import * as config from "../../../.gen/account-actions/config/functions";
import { ConfigDepsArgs, ProposalArgs, ProposalFields } from "../../../types/proposal-types";
import { EXTENSIONS } from "../../../types/constants";
import { Proposal } from "../proposal";
import { Outcome } from "../outcome";
import { ConfigDepsAction } from "src/.gen/account-actions/config/structs";

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
        const configDepsAction = ConfigDepsAction.fromFieldsWithTypes(actions[0]);

        proposal.args = {
            deps: configDepsAction.deps.inner.map((dep) => ({
                name: dep.name,
                addr: dep.addr,
                version: Number(dep.version),
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
        accountGenerics: [string, string],
        executable: TransactionObjectInput,
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

    delete(
        tx: Transaction,
        accountGenerics: [string, string],
        expired: TransactionObjectInput,
    ): TransactionResult {
        return config.deleteConfigDepsAction(
            tx,
            accountGenerics[1],
            expired
        );
    }
}
