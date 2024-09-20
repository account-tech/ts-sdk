
import { Transaction, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import * as config from "../../../.gen/kraken-actions/config/functions";
import { Proposal } from "../proposal";
import { ProposalFields } from "src/.gen/kraken-multisig/proposals/structs";
import { EXTENSIONS } from "src/types/constants";
import { ConfigDepsArgs, ConfigNameArgs, ConfigRulesArgs, ProposalArgs } from "src/types/proposalTypes";

export class ConfigNameProposal extends Proposal {
    public args?: ConfigNameArgs;

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
    ): Promise<ConfigNameProposal> {
        const proposal = new ConfigNameProposal(client, multisig);
        proposal.setProposalFromFields(fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actions.id);
        if (actions.length === 0) {
            throw new Error('No actions found for the ConfigName proposal');
        }

        proposal.args = { name: actions[0].inner };
        return proposal;
    }

    propose(
        tx: Transaction,
        multisig: string,
        proposalArgs: ProposalArgs,
        actionArgs: ConfigNameArgs,
    ): TransactionResult {
        return config.proposeConfigName(
            tx,
            {
                multisig,
                key: proposalArgs.key,
                description: proposalArgs.description ? proposalArgs.description : "",
                executionTime: BigInt(proposalArgs.executionTime ? proposalArgs.executionTime : 0),
                expirationEpoch: BigInt(proposalArgs.expirationEpoch ? proposalArgs.expirationEpoch : 0),
                name: actionArgs.name,
            }
        );
    }

    execute(
        tx: Transaction,
    ): TransactionResult {
        const executable = this.constructExecutable(tx);
        return config.executeConfigName(
            tx,
            {
                executable,
                multisig: this.multisig!,
            }
        );
    }
}

export class ConfigRulesProposal extends Proposal {
    public args?: ConfigRulesArgs; 
    
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
    ): Promise<ConfigRulesProposal> {
        const proposal = new ConfigRulesProposal(client, multisig);
        proposal.setProposalFromFields(fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actions.id);
        if (actions.length === 0) {
            throw new Error('No actions found for the ConfigRules proposal');
        }

        proposal.args = { 
            members: actions[0].inner,
            thresholds: actions[1].inner,
        };
        return proposal;
    }

    propose(
        tx: Transaction,
        multisig: string,
        proposalArgs: ProposalArgs,
        actionArgs: ConfigRulesArgs,
    ): TransactionResult {
        let addresses: string[] = [];
        let weights: bigint[] = [];
        let roles: string[][] = [];
        if (actionArgs.members) {
            actionArgs.members.forEach((member) => {
                addresses.push(member.address);
                weights.push(BigInt(member.weight));
                roles.push(member.roles);
            });
        }

        let global = 0n;
        let roleNames: string[] = [];
        let roleThresholds: bigint[] = [];
        if (actionArgs.thresholds) {
            global = BigInt(actionArgs.thresholds.global);
            actionArgs.thresholds.roles.forEach((role) => {
                roleNames.push(role.name);
                roleThresholds.push(BigInt(role.threshold));
            });
        }

        config.proposeConfigRules(
            tx,
            {
                multisig,
                key: proposalArgs.key,
                description: proposalArgs.description ? proposalArgs.description : "",
                executionTime: BigInt(proposalArgs.executionTime ? proposalArgs.executionTime : 0),
                expirationEpoch: BigInt(proposalArgs.expirationEpoch ? proposalArgs.expirationEpoch : 0),
                addresses,
                weights,
                roles,
                global,
                roleNames,
                roleThresholds,
            }
        );
        return this.approve(tx);
    }

    execute(
        tx: Transaction,
    ): TransactionResult {
        const executable = this.constructExecutable(tx);
        return config.executeConfigRules(
            tx,
            {
                executable,
                multisig: this.multisig!,
            }
        );
    }
}

export class ConfigDepsProposal extends Proposal {
    public args?: ConfigDepsArgs;

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
    ): Promise<ConfigDepsProposal> {
        const proposal = new ConfigDepsProposal(client, multisig);
        proposal.setProposalFromFields(fields);
        // resolve actions
        const actions = await proposal.fetchActions(fields.actions.id);
        if (actions.length === 0) {
            throw new Error('No actions found for the ConfigDeps proposal');
        }

        proposal.args = {
            deps: actions[0].inner,
        };
        return proposal;
    }

    propose(
        tx: Transaction,
        multisig: string,
        proposalArgs: ProposalArgs,
        actionArgs: ConfigDepsArgs,
    ): TransactionResult {
        const names: string[] = [];
        const packages: string[] = [];
        const versions: bigint[] = [];
        actionArgs.deps.forEach((dep) => {
            names.push(dep.name);
            packages.push(dep.package);
            versions.push(BigInt(dep.version));
        });

        config.proposeConfigDeps(
            tx,
            {
                multisig,
                key: proposalArgs.key,
                description: proposalArgs.description ? proposalArgs.description : "",
                executionTime: BigInt(proposalArgs.executionTime ? proposalArgs.executionTime : 0),
                expirationEpoch: BigInt(proposalArgs.expirationEpoch ? proposalArgs.expirationEpoch : 0),
                extensions: EXTENSIONS,
                names,
                packages,
                versions,
            }
        );
        return this.approve(tx);
    }

    execute(
        tx: Transaction,
    ): TransactionResult {
        const executable = this.constructExecutable(tx);
        return config.executeConfigDeps(
            tx,
            {
                executable,
                multisig: this.multisig!,
            }
        );
    }
}