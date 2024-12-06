import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { KioskClient, Network } from "@mysten/kiosk";
import { FRAMEWORK, ACCOUNT_PROTOCOL, ACCOUNT_CONFIG, MULTISIG_GENERICS } from "./types/constants";
import { AccountType, Dep, Kiosk, Member, Threshold, TransferPolicy } from "./types/account-types";
import { User } from "./lib/user";
import { Multisig } from "./lib/account/configs/multisig";
import { TransactionPureInput } from "./types/helper-types";
import * as commands from "./lib/commands";
import { ActionsArgs, ConfigDepsArgs, ProposalArgs, proposalRegistry, ProposalType, ProposalTypes } from "./types/proposal-types";
import { Proposal } from "./lib/proposals/proposal";
import { Extensions } from "./lib/extensions";
import { Approvals } from "./lib/proposals/outcomes/approvals";
import { ConfigDepsProposal } from "./lib/proposals/account-actions/config";
import { BurnProposal, MintProposal, UpdateProposal } from "./lib/proposals/account-actions/currency";
import { CommandTypes } from "./types/command-types";
import { ConfigMultisigProposal } from "./lib/proposals/account-actions/multisig";

export class MultisigClient {

	private constructor(
		public client: SuiClient,
		public user: User,
		public multisig: Multisig,
		public extensions: Extensions,
	) {}
	
	static async init(
		network: "mainnet" | "testnet" | "devnet" | "localnet" | string,
        userAddr: string, 
		multisigId?: string,
    ): Promise<MultisigClient> {
		const url = (network == "mainnet" || network == "testnet" || network == "devnet" || network == "localnet") ? getFullnodeUrl(network) : network;
		const client = new SuiClient({ url });

		const user = await User.init(client, userAddr, AccountType.MULTISIG);
		const multisig = await Multisig.init(client, userAddr, multisigId);
		const extensions = await Extensions.init(client);

		const msClient = new MultisigClient(client, user, multisig, extensions);
		return msClient;
	}

	async refreshAccount(address: string = this.user.address) {
		let user = await this.user.fetchUser(address);
		this.user.setData(user);
	}

	async refreshMultisig(address: string = this.multisig.id) {
		let multisig = await this.multisig.fetchMultisig(address);
		this.multisig.setData(multisig);
	}

	// creates a multisig with default weights of 1 (1 member = 1 voice)
	createMultisig(
		tx: Transaction, 
		name: string,
		newAccount?: { username: string, profilePicture: string },
		memberAddresses?: string[],
		globalThreshold?: number,
	): TransactionResult {
		// create the user if the user doesn't have one
		let accountId: TransactionPureInput = this.user.id;
		let createdAccount: TransactionPureInput | null = null;
		if (accountId === "") {
			if (!newAccount) throw new Error("User must create an user before creating a multisig");
			createdAccount = this.user.createUser(tx); // TODO: add optional params for username and avatar 
			accountId = tx.moveCall({
				target: `${FRAMEWORK}::object::id`,
				typeArguments: [`${ACCOUNT_CONFIG.V1}::user::User`],
				arguments: [tx.object(createdAccount)],
			});
		}
		// create the multisig
		const multisig = this.multisig?.newMultisig(tx, name);
		// update multisig rules if members are provided
		if (memberAddresses) {
			const members = memberAddresses.map((address: string) => ({ address, weight: 1, roles: [] }));
			members.push({ address: this.user.address, weight: 1, roles: [] }); // add creator to the members
			
			this.multisig.configMultisig(
				tx,
				{ key: "init_members" },
				{ members, thresholds: { global: globalThreshold ?? 1, roles: [] } },
				multisig
			); // atomic proposal
		}
		// creator register the multisig in his user
		this.multisig.joinMultisig(tx, createdAccount ? createdAccount : accountId, multisig);
		// send invites to added members
		memberAddresses?.forEach(address => { this.user?.sendInvite(tx, multisig, address) });
		// transfer the user if just created
		if (createdAccount) this.user.transferUser(tx, createdAccount, this.user.address);
		// share the multisig
		return this.multisig?.shareMultisig(tx, multisig);
	}

	// Factory function to call the appropriate propose function
	propose(
		tx: Transaction,
		proposalType: ProposalType,
		proposalArgs: ProposalArgs,
		actionsArgs: ActionsArgs,
		role?: string,
	) {
		const auth = this.multisig.authenticate(tx, role ?? "");
		const outcome = this.multisig.emptyOutcome(tx);

		const proposalClass = proposalRegistry[proposalType];
		const method = proposalClass.prototype.propose;
		method.call(proposalClass, tx, MULTISIG_GENERICS, auth, outcome, this.multisig.id, proposalArgs, actionsArgs);
		// directly approve after proposing
		this.multisig.approveProposal(tx, proposalArgs.key, this.multisig.id);
	}

	// calls the execute function for the proposal
	execute(
		tx: Transaction,
		caller: string,
		proposalKey: string
	) {
		const proposal = this.proposal(proposalKey);
		(proposal?.outcome as Approvals).maybeApprove(tx, caller);
		const executable = (proposal?.outcome as Approvals).constructExecutable(tx);
		proposal?.execute(tx, MULTISIG_GENERICS, executable);
	}

	// === Commands ===

	depositCap(
		tx: Transaction,
		capType: string,
		capObject: TransactionObjectInput,
	) {
		const auth = this.multisig.authenticate(tx, CommandTypes.LockCap);
		commands.depositCap(tx, MULTISIG_GENERICS, capType, auth, this.multisig.id, capObject);
	}

	modifyName(
		tx: Transaction,
		newName: string,
	) {
		const auth = this.multisig.authenticate(tx, CommandTypes.ConfigMetadata);	
		commands.replaceMetadata(tx, MULTISIG_GENERICS, auth, this.multisig.id, ["name"], [newName]);
	}	

	// === Proposals ===

	proposeConfigMultisig(
		tx: Transaction,
		globalThreshold: number,
		roleThresholds: Threshold[],
		members: Member[],
		key: string,
		description?: string, // default is empty
		executionTime?: number, // default is now
		expirationTime?: number, // default is 1 week
	) {
		const auth = this.multisig.authenticate(tx, "");
		const outcome = this.multisig.emptyOutcome(tx);

		ConfigMultisigProposal.prototype.propose(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTime, expirationTime },
			{ members, thresholds: { global: globalThreshold, roles: roleThresholds } },
		);

		return this.multisig.approveProposal(tx, key, this.multisig.id);
	}
	
	proposeConfigDeps(
		tx: Transaction,
		deps: Dep[],
		key: string,
		description?: string, // default is empty
		executionTime?: number, // default is now
		expirationTime?: number, // default is 1 week
	) {
		const auth = this.multisig.authenticate(tx, "");
		const outcome = this.multisig.emptyOutcome(tx);
		
		ConfigDepsProposal.prototype.propose(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTime, expirationTime },
			{ deps },
		);
		
		return this.multisig.approveProposal(tx, key, this.multisig.id);
	}

	proposeMint(
		tx: Transaction,
		coinType: string,
		amount: number,
		key: string,
		description?: string, // default is empty
		executionTime?: number, // default is now
		expirationTime?: number, // default is 1 week
	) {
		const auth = this.multisig.authenticate(tx, "");
		const outcome = this.multisig.emptyOutcome(tx);

		MintProposal.prototype.propose(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTime, expirationTime },
			{ coinType, amount },
		);

		return this.multisig.approveProposal(tx, key, this.multisig.id);
	}

	proposeBurn(
		tx: Transaction,
		coinType: string,
		coinId: string,
		amount: number,
		key: string,
		description?: string, // default is empty
		executionTime?: number, // default is now
		expirationTime?: number, // default is 1 week
	) {
		const auth = this.multisig.authenticate(tx, "");
		const outcome = this.multisig.emptyOutcome(tx);

		BurnProposal.prototype.propose(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTime, expirationTime },
			{ coinType, coinId, amount },
		);

		return this.multisig.approveProposal(tx, key, this.multisig.id);
	}

	proposeUpdate(
		tx: Transaction,
		coinType: string,
		newName: string | null,
		newSymbol: string | null,
		newDescription: string | null,
		newIcon: string | null,
		key: string,
		description?: string, // default is empty
		executionTime?: number, // default is now
		expirationTime?: number, // default is 1 week
	) {
		const auth = this.multisig.authenticate(tx, "");
		const outcome = this.multisig.emptyOutcome(tx);

		UpdateProposal.prototype.propose(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTime, expirationTime },
			{ coinType, name: newName, symbol: newSymbol, description: newDescription, icon: newIcon },
		);

		return this.multisig.approveProposal(tx, key, this.multisig.id);
	}

	
	
	// === Helpers ===

	proposal(key: string): Proposal | undefined {
		return this.multisig?.getProposal(key);
	}

	hasApproved(key: string, userAddr: string = this.user.address): boolean {
		const has = (this.proposal(key)?.outcome as Approvals).approved?.includes(userAddr);
		if (!has) throw new Error("Proposal not found");
		return has;
	}
}

