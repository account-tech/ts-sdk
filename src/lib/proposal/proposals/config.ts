
import { Transaction, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import * as config from "../../../.gen/kraken-actions/config/functions";
import { Proposal } from "../proposal";
import { ProposalFields } from "src/.gen/kraken-multisig/proposals/structs";
import { EXTENSIONS } from "src/types/constants";
import { ConfigDepsFields, ConfigNameFields, ConfigRulesFields, ProposalArgs } from "src/types/proposalTypes";

export class ConfigNameProposal extends Proposal {
    public args?: ConfigNameFields;

    constructor(
        public client: SuiClient,
        public multisig: string,
    ) {
        super(client, multisig);
        this.multisig = multisig;
    }
    
    static async init(
        self: ConfigNameProposal,
        proposal: ProposalFields,
    ): Promise<ConfigNameProposal> {
        self.setProposalFromFields(proposal);
        // resolve actions
        const actions = await self.fetchActions(proposal.actions.id);
        self.args = { name: actions[0].inner };

        return self;
    }

    propose(
        tx: Transaction,
        multisig: string,
        proposalArgs: ProposalArgs,
        actionArgs: ConfigNameFields,
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
    public args?: ConfigRulesFields;

    constructor(
        public client: SuiClient,
        public multisig: string,
    ) {
        super(client, multisig);
        this.multisig = multisig;
    }

    static async init(
        self: ConfigRulesProposal,
        proposal: ProposalFields,
    ): Promise<ConfigRulesProposal> {
        self.setProposalFromFields(proposal);
        // resolve actions
        const actions = await self.fetchActions(proposal.actions.id);
        self.args = { 
            members: actions[0].inner,
            thresholds: actions[1].inner,
        };

        return self;
    }

    propose(
        tx: Transaction,
        multisig: string,
        proposalArgs: ProposalFields,
        actionArgs: ConfigRulesFields,
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
    public args?: ConfigDepsFields;

    constructor(
        public client: SuiClient,
        public multisig: string,
    ) {
        super(client, multisig);
        this.multisig = multisig;
    }

    static async init(
        self: ConfigDepsProposal,
        proposal: ProposalFields,
    ): Promise<ConfigDepsProposal> {
        self.setProposalFromFields(proposal);
        // resolve actions
        const actions = await self.fetchActions(proposal.actions.id);
        self.args = {
            deps: actions[0].inner,
        };

        return self;
    }

    propose(
        tx: Transaction,
        multisig: string,
        proposalArgs: ProposalFields,
        actionArgs: ConfigDepsFields,
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