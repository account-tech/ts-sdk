import { Transaction, TransactionArgument, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import { Multisig as MultisigRaw } from "../.gen/kraken-multisig/multisig/structs";
import { new_, share } from "../.gen/kraken-multisig/multisig/functions";
import * as config from "../.gen/kraken-actions/config/functions";
import * as currency from "../.gen/kraken-actions/currency/functions";
import * as kiosk from "../.gen/kraken-actions/kiosk/functions";
import { approveProposal, removeApproval, executeProposal } from "../.gen/kraken-multisig/multisig/functions"
import { DepFields } from "../.gen/kraken-multisig/deps/structs";
import { MemberFields } from "../.gen/kraken-multisig/members/structs";
import { RoleFields } from "../.gen/kraken-multisig/thresholds/structs";
import { ProposalFields } from "../.gen/kraken-multisig/proposals/structs";
import { CLOCK, EXTENSIONS, KRAKEN_ACTIONS } from "../types/constants";
import { getCurrentEpoch } from "./utils";
import { Account } from "./account";
import { Proposal } from "./proposal/proposal";
import { ConfigDepsProposal, ConfigNameProposal, ConfigRulesProposal } from "./proposal/proposals/config";
import { Dep, Role, MemberAccount } from "../types/multisigTypes";
import { BurnArgs, ConfigDepsArgs, ConfigNameArgs, ConfigRulesArgs, MintArgs, ProposalArgs, UpdateArgs } from "../types/proposalTypes";
import { TransactionPureInput } from "src/types/helperTypes";
import { MintProposal } from "./proposal/proposals/currency";

export interface MultisigData {
	id: string;
    name: string;
    deps: Dep[];
    roles: Map<string, Role>;
    members: MemberAccount[];
    proposals: Proposal[];
}

export class Multisig implements MultisigData {
	userAddr: string = "";
	epoch: number = 0;
    id: string = "";
    name: string = "";
    deps: Dep[] = [];
    roles: Map<string, Role> = new Map();
    members: MemberAccount[] = [];
    proposals: Proposal[] = [];

	constructor(
		public client: SuiClient,
	) {}

	static async init(
        client: SuiClient,
        userAddr: string, 
        multisigId?: string,
    ): Promise<Multisig> {
		const multisig = new Multisig(client);
		multisig.userAddr = userAddr;
		multisig.epoch = await getCurrentEpoch(multisig.client);
        if (multisigId) {
			multisig.id = multisigId;
			multisig.setMultisig(await multisig.fetchMultisig(multisigId));
		}
		return multisig;
	}    
	
	async fetchMultisig(id: string): Promise<MultisigData> {
		const { data } = await this.client.getObject({
			id,
			options: { showContent: true }
		});

		if (!data?.content) throw new Error(`Multisig with id ${id} not found.`);

		const multisigRaw = MultisigRaw.fromSuiParsedData(data.content);

		// get deps
		const deps: Dep[] = multisigRaw.deps.inner.map((dep: DepFields) => {
			return { name: dep.name, package: dep.package, version: Number(dep.version) };
		});

		// get all members" data (from account and member)
		const membersAddress: string[] = multisigRaw.members.inner.map((member: MemberFields) => member.addr);
		const members = await Promise.all(membersAddress.map(async memberAddr => {
			const weight = multisigRaw.members.inner.find((m: MemberFields) => m.addr == memberAddr)?.weight;
			const roles = multisigRaw.members.inner.find((m: MemberFields) => m.addr == memberAddr)?.roles.contents;
			const account = await Account.init(this.client, this.userAddr);
			const accountRaw = await account.fetchAccountRaw(memberAddr);
			return {
				address: memberAddr,
				accountId: accountRaw?.id!,
				username: accountRaw?.username!,
				profilePicture: accountRaw?.profilePicture!,
				weight: Number(weight)!,
				roles: roles!
			}
		}));

		// calculate total weights
		const globalWeight = members.reduce((acc, member) => acc + member.weight, 0);
		// Calculate total weights for each role
		const roleWeights = new Map<string, number>();
		members.forEach(member => {
			member.roles.forEach(role => {
				const currentWeight = roleWeights.get(role) || 0;
				roleWeights.set(role, currentWeight + member.weight);
			});
		});
		// get thresholds
		const roles = new Map<string, Role>();
		roles.set("global", { threshold: Number(multisigRaw.thresholds.global), totalWeight: globalWeight });
		multisigRaw.thresholds.roles.forEach((role: RoleFields) => {
			roles.set(role.name, { threshold: Number(role.threshold), totalWeight: roleWeights.get(role.name) || 0 });
		});
		// get Proposals with actions
		const proposals = await Promise.all(multisigRaw!.proposals.inner.map(async (fields: ProposalFields) => {
			return await this.initProposalWithActions(this.client, fields);
		}));
		
		return {
			id: multisigRaw.id,
			name: multisigRaw.name,
			deps,
			roles,
			members,
			proposals,
		}
	}

	setMultisig(multisig: MultisigData) {
		this.id = multisig.id;
		this.name = multisig.name;
		this.deps = multisig.deps;
		this.roles = multisig.roles;
		this.members = multisig.members;
		this.proposals = multisig.proposals;
	}

	getMultisig(): MultisigData {
		return {
			id: this.id,
			name: this.name,
			deps: this.deps,
			roles: this.roles,
			members: this.members,
			proposals: this.proposals,
		}
	}

	getProposal(key: string): Proposal {
		const proposal = this.proposals?.find(p => p.key == key);
		if (!proposal) {
			throw new Error(`Proposal with key ${key} not found.`);
		}
		return proposal;
	}

	getMemberWeight(addr: string): number {
		const member = this.members?.find(m => m.address == addr);
		if (!member) {
			throw new Error(`Member with address ${addr} not found.`);
		}
		return member.weight;
	}

	newMultisig(
		tx: Transaction, 
		name: string,
		accountId: TransactionPureInput, 
	): TransactionResult {
		return new_(
			tx, 
			{ extensions: EXTENSIONS, name, accountId }
		);
	}

    shareMultisig(tx: Transaction, multisig: TransactionArgument): TransactionResult {
        return share(tx, multisig);
	}

	approveProposal(
		tx: Transaction,
		key: string,
		multisig: TransactionObjectInput = this.id,
	): TransactionResult {
		return approveProposal(tx, { multisig, key });
	}
	
	removeApproval(
		tx: Transaction, 
		key: string,
		multisig: TransactionObjectInput = this.id,
	): TransactionResult {
		return removeApproval(tx, { multisig, key });
	}

	executeProposal(
		tx: Transaction,
		key: string,
		multisig: TransactionObjectInput = this.id,
	): TransactionResult {
		return executeProposal(tx, { multisig, key, clock: CLOCK });
	}

	// === Atomic Proposals ===

	configName(
		tx: Transaction,
		proposalArgs: ProposalArgs,
		actionsArgs: ConfigNameArgs,
	): TransactionResult {
		this.assertMultisig();
		this.assertKey(proposalArgs);

		config.proposeConfigName(
			tx,
			{
				multisig: this.id,
				key: proposalArgs.key,
				description: proposalArgs.description ?? "",
				executionTime: BigInt(proposalArgs.executionTime ?? 0),
				expirationEpoch: BigInt(proposalArgs.expirationEpoch ?? this.epoch + 7),
				name: actionsArgs.name,
			}
		);

		this.approveProposal(tx, proposalArgs.key);
		const executable = this.executeProposal(tx, proposalArgs.key);

		return config.executeConfigName(tx, { executable, multisig: this.id });
	}

	configRules(
		tx: Transaction,
		proposalArgs: ProposalArgs,
		actionsArgs: ConfigRulesArgs,
		multisig: TransactionObjectInput = this.id, // need for adding members upon creation
	): TransactionResult {
		this.assertMultisig();
		this.assertKey(proposalArgs);

		let addresses: string[] = [];
		let weights: bigint[] = [];
		let roles: string[][] = [];
		if (actionsArgs.members) {
			actionsArgs.members.forEach((member) => {
				addresses.push(member.address);
				weights.push(BigInt(member.weight));
				roles.push(member.roles);
			});
		}

		let global = 0n;
		let roleNames: string[] = [];
		let roleThresholds: bigint[] = [];
		if (actionsArgs.thresholds) {
			global = BigInt(actionsArgs.thresholds.global);
			actionsArgs.thresholds.roles.forEach((role) => {
				roleNames.push(role.name);
				roleThresholds.push(BigInt(role.threshold));
			});
		}

		config.proposeConfigRules(
			tx,
			{
				multisig: this.id,
				key: proposalArgs.key,
				description: proposalArgs.description ?? "",
				executionTime: BigInt(proposalArgs.executionTime ?? 0),
				expirationEpoch: BigInt(proposalArgs.expirationEpoch ?? this.epoch + 7),
				addresses,
				weights,
				roles,
				global,
				roleNames,
				roleThresholds,
			}
		);

		this.approveProposal(tx, proposalArgs.key);
		const executable = this.executeProposal(tx, proposalArgs.key);

		return config.executeConfigRules(tx, { executable, multisig });
	}

	configDeps(
		tx: Transaction,
		proposalArgs: ProposalArgs,
		actionsArgs: ConfigDepsArgs,
		multisig: TransactionObjectInput = this.id, // need for adding deps upon creation
	): TransactionResult {
		this.assertMultisig();
		this.assertKey(proposalArgs);

		const names: string[] = [];
		const packages: string[] = [];
		const versions: bigint[] = [];
		actionsArgs.deps.forEach((dep) => {
			names.push(dep.name);
			packages.push(dep.package);
			versions.push(BigInt(dep.version));
		});

		config.proposeConfigDeps(
			tx,
			{
				multisig,
				key: proposalArgs.key,
				description: proposalArgs.description ?? "",
				executionTime: BigInt(proposalArgs.executionTime ?? 0),
				expirationEpoch: BigInt(proposalArgs.expirationEpoch ?? this.epoch + 7),
				extensions: EXTENSIONS,
				names,
				packages,
				versions,
			}
		);

		this.approveProposal(tx, proposalArgs.key);
		const executable = this.executeProposal(tx, proposalArgs.key);

		return config.executeConfigDeps(tx, { executable, multisig });
	}

	mint(
		tx: Transaction,
		proposalArgs: ProposalArgs,
		actionsArgs: MintArgs,
		multisig: TransactionObjectInput = this.id,
	): TransactionResult {
		this.assertMultisig();
		this.assertKey(proposalArgs);

		currency.proposeMint(
			tx,
			actionsArgs.coinType,
			{
				multisig: this.id,
				key: proposalArgs.key,
				description: proposalArgs.description ?? "",
				executionTime: BigInt(proposalArgs.executionTime ?? 0),
				expirationEpoch: BigInt(proposalArgs.expirationEpoch ?? this.epoch + 7),
				amount: BigInt(actionsArgs.amount),
			}
		);

		this.approveProposal(tx, proposalArgs.key);
		const executable = this.executeProposal(tx, proposalArgs.key);

		return currency.executeMint(tx, actionsArgs.coinType, { executable, multisig });
	}

	burn(
		tx: Transaction,
		proposalArgs: ProposalArgs,
		actionsArgs: BurnArgs,
	): TransactionResult {
		this.assertMultisig();
		this.assertKey(proposalArgs);

		currency.proposeBurn(
			tx,
			actionsArgs.coinType,
			{
				multisig: this.id,
				key: proposalArgs.key,
				description: proposalArgs.description ?? "",
				executionTime: BigInt(proposalArgs.executionTime ?? 0),
				expirationEpoch: BigInt(proposalArgs.expirationEpoch ?? this.epoch + 7),
				coinId: actionsArgs.coinId,
				amount: BigInt(actionsArgs.amount),
			}
		);

		this.approveProposal(tx, proposalArgs.key);
		const executable = this.executeProposal(tx, proposalArgs.key);

		return currency.executeBurn(tx, actionsArgs.coinType, { executable, multisig: this.id, receiving: actionsArgs.coinId });
	}

	update(
		tx: Transaction,
		proposalArgs: ProposalArgs,
		actionsArgs: UpdateArgs,
		metadata: string, // CoinMetadata<CoinType> ID
	): TransactionResult {
		this.assertMultisig();
		this.assertKey(proposalArgs);

		currency.proposeUpdate(
			tx,
			actionsArgs.coinType,
			{
				multisig: this.id,
				key: proposalArgs.key,
				description: proposalArgs.description ?? "",
				executionTime: BigInt(proposalArgs.executionTime ?? 0),
				expirationEpoch: BigInt(proposalArgs.expirationEpoch ?? this.epoch + 7),
				mdName: actionsArgs.name,
				mdSymbol: actionsArgs.symbol,
				mdDescription: actionsArgs.description,
				mdIcon: actionsArgs.icon,
			}
		);

		this.approveProposal(tx, proposalArgs.key);
		const executable = this.executeProposal(tx, proposalArgs.key);

		return currency.executeUpdate(tx, actionsArgs.coinType, { executable, multisig: this.id, metadata });
	}

	// take(
	// 	tx: Transaction,
	// 	args: TakeArgs,
	// ): TransactionResult {
	// 	this.assertMultisig();
	// 	this.assertKey(args);

	// 	kiosk.proposeTake(
	// 		tx,
	// 		{
	// 			multisig: this.id,
	// 			key: args.key,
	// 			description: args.description ?? "",
	// 			executionTime: BigInt(args.executionTime ?? 0),
	// 			expirationEpoch: BigInt(args.expirationEpoch ?? this.epoch + 7),
	// 			name: args.name,
	// 			nftIds: args.nftIds,
	// 			recipient: args.recipient,
	// 		}
	// 	);

	// 	this.approveProposal(tx, args.key);
	// 	const executable = this.executeProposal(tx, args.key);

	// 	return kiosk.executeTake(tx, { executable, multisig: this.id });
	// }

	// === Helpers ===

	assertMultisig() {
		if (this.id === "") {
			throw new Error("Multisig id is not set. Please fetch the multisig before calling this method.");
		}
	}

	assertKey(args: ProposalArgs) {
		if (!args.key) throw new Error("Key is required.");
	}

	// Factory function to create the appropriate proposal type
	async initProposalWithActions(
		client: SuiClient,
		fields: ProposalFields
	): Promise<Proposal> {
		switch ("0x" + fields.auth.witness.name) {
			case `${KRAKEN_ACTIONS}::config::ConfigNameProposal`:
				return await ConfigNameProposal.init(client, this.id, fields);
			case `${KRAKEN_ACTIONS}::config::ConfigRulesProposal`:
				return await ConfigRulesProposal.init(client, this.id, fields);
			case `${KRAKEN_ACTIONS}::config::ConfigDepsProposal`:
				return await ConfigDepsProposal.init(client, this.id, fields);
			case `${KRAKEN_ACTIONS}::currency::MintProposal`:
				return await MintProposal.init(client, this.id, fields);
			// case `${KRAKEN_ACTIONS}::currency::BurnProposal`:
			// 	return await BurnProposal.init(client, this.id, fields);
			// case `${KRAKEN_ACTIONS}::currency::UpdateProposal`:
			// 	return await UpdateProposal.init(client, this.id, fields);
			// ... other cases for different proposal types
			default:
				throw new Error(`Proposal type ${fields.auth.witness.name} not supported.`);
		}
	}
}

