import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { FRAMEWORK, ACCOUNT_CONFIG, MULTISIG_GENERICS, TRANSFER_POLICY_RULES } from "./types/constants";
import { AccountType } from "./types/account-types";
import { User } from "./lib/user";
import { Member, Multisig, Threshold } from "./lib/account/configs/multisig";
import { TransactionPureInput } from "./types/helper-types";
import * as commands from "./lib/commands";
import { ActionsArgs, ProposalArgs, proposalRegistry, ProposalType } from "./types/proposal-types";
import { Proposal } from "./lib/proposals/proposal";
import { Extensions } from "./lib/extensions";
import { Approvals } from "./lib/proposals/outcomes/approvals";
import { ConfigDepsProposal } from "./lib/proposals/account-actions/config";
import { BurnProposal, MintProposal, UpdateProposal } from "./lib/proposals/account-actions/currency";
import { CommandTypes } from "./types/command-types";
import { ConfigMultisigProposal } from "./lib/proposals/account-actions/multisig";
import { roleWithName } from "./lib/helpers";
import { Dep } from "./lib/account/account";

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

		const user = await User.init(client, AccountType.MULTISIG, userAddr);
		const multisig = await Multisig.init(client, multisigId);
		const extensions = await Extensions.init(client);

		const msClient = new MultisigClient(client, user, multisig, extensions);
		return msClient;
	}

	async refresh() {
		await this.user.refresh();
		await this.multisig.refresh();
		await this.extensions.refresh();
	}

	/// Creates a multisig with default weights of 1 (1 member = 1 voice)
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
			members.push({ address: this.user.address!, weight: 1, roles: [] }); // add creator to the members
			
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
		if (createdAccount) this.user.transferUser(tx, createdAccount, this.user.address!);
		// share the multisig
		return this.multisig?.shareMultisig(tx, multisig);
	}

	/// Factory function to call the appropriate propose function
	propose(
		tx: Transaction,
		proposalType: ProposalType,
		proposalArgs: ProposalArgs,
		actionsArgs: ActionsArgs,
		role?: string,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx, role ?? "");
		const outcome = this.multisig.emptyOutcome(tx);

		const proposalClass = proposalRegistry[proposalType];
		const method = proposalClass.prototype.propose;
		method.call(proposalClass, tx, MULTISIG_GENERICS, auth, outcome, this.multisig.id, proposalArgs, actionsArgs);
		// directly approve after proposing
		return this.multisig.approveProposal(tx, proposalArgs.key, this.multisig.id);
	}

	/// Calls the execute function for the proposal
	execute(
		tx: Transaction,
		caller: string,
		proposalKey: string
	): TransactionResult {
		const proposal = this.proposal(proposalKey);
		if (!proposal) throw new Error("Proposal not found");

		(proposal.outcome as Approvals).maybeApprove(tx, caller);
		const executable = (proposal.outcome as Approvals).constructExecutable(tx);
		return proposal.execute(tx, MULTISIG_GENERICS, executable);
	}

	/// Deletes a proposal if it has expired
	delete(
		tx: Transaction,
		proposalKey: string,
	) {
		const proposal = this.proposal(proposalKey);
		if (!proposal) throw new Error("Proposal not found");
		if (!proposal.hasExpired()) throw new Error("Proposal has not expired");

		let expired = this.multisig.deleteProposal(tx, proposalKey);
		proposal.delete(tx, MULTISIG_GENERICS, expired);
		return this.multisig.deleteExpiredOutcome(tx, expired);
	}

	// === Commands ===

	/// Deposits and locks a Cap object in the Account
	depositCap(
		tx: Transaction,
		capType: string,
		capObject: TransactionObjectInput,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx, CommandTypes.LockCap);
		return commands.depositCap(tx, MULTISIG_GENERICS, capType, auth, this.multisig.id, capObject);
	}

	/// Modifies the name of the Account
	modifyName(
		tx: Transaction,
		newName: string,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx, CommandTypes.ConfigMetadata);	
		return commands.replaceMetadata(tx, MULTISIG_GENERICS, auth, this.multisig.id, ["name"], [newName]);
	}	

	/// Deposits and locks a TreasuryCap object in the Account
	depositTreasuryCap(
		tx: Transaction,
		coinType: string,
		treasuryCap: TransactionObjectInput,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx, CommandTypes.LockTreasuryCap);
		return commands.depositTreasuryCap(tx, MULTISIG_GENERICS, coinType, auth, this.multisig.id, treasuryCap);
	}

	/// Opens a Kiosk in the Account
	openKiosk(
		tx: Transaction,
		kioskName: string,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx, CommandTypes.Kiosk);
		return commands.openKiosk(tx, MULTISIG_GENERICS, auth, this.multisig.id, kioskName);
	}

	/// Places an NFT in a Kiosk managed by the Account
	async placeInKiosk(
		tx: Transaction,
		nftType: string,
		senderKiosk: TransactionObjectInput,
		senderCap: TransactionObjectInput,
		kioskName: string,
		nftId: string,
	): Promise<TransactionResult> {
		const policies = await this.multisig.managedAssets.kioskClient.getTransferPolicies({ type: nftType });
		// find a correct policy
		let policyId = "";
		if (policies.length == 0) {
			throw new Error("No transfer policy found for the given NFT type");
		} else if (policies.length == 1) {
			policyId = policies[0].id;
		} else {
			// Find first policy that only contains known rules
			const validPolicy = policies.find(policy => 
				policy.rules.every(rule => TRANSFER_POLICY_RULES.includes(rule))
			);
			if (!validPolicy) throw new Error("No transfer policy found with only known rules");
			policyId = validPolicy.id;
		}
		
		// get the account kiosk from its name 
		const accountKioskId = this.multisig.managedAssets.kiosks[kioskName].id;
		const auth = this.multisig.authenticate(tx, roleWithName(CommandTypes.Place, kioskName));
		const request = commands.placeInKiosk(tx, MULTISIG_GENERICS, nftType, auth, this.multisig.id, accountKioskId, senderKiosk, senderCap, policyId, kioskName, nftId);
		return tx.moveCall({
			target: `${FRAMEWORK}::transfer_policy::confirm_request`,
			typeArguments: [nftType],
			arguments: [tx.object(policyId), request],
		});
	}

	/// Delists an NFT from a Kiosk managed by the Account
	delistFromKiosk(
		tx: Transaction,
		kioskName: string,
		nftId: string,
	): TransactionResult {
		// get the account kiosk from its name 
		const accountKioskId = this.multisig.managedAssets.kiosks[kioskName].id;
		// get the nft type from the nft id
		const nftType = this.multisig.managedAssets.kiosks[kioskName].items.find(item => item.id === nftId)?.type;
		if (!nftType) throw new Error("NFT not found in kiosk");
		const auth = this.multisig.authenticate(tx, roleWithName(CommandTypes.Delist, kioskName));
		return commands.delistFromKiosk(tx, MULTISIG_GENERICS, nftType, auth, this.multisig.id, accountKioskId, kioskName, nftId);
	}

	/// Withdraws the profits from a Kiosk managed by the Account
	withdrawProfitsFromKiosk(
		tx: Transaction,
		kioskName: string,
	): TransactionResult {
		// get the account kiosk from its name 
		const accountKioskId = this.multisig.managedAssets.kiosks[kioskName].id;
		const auth = this.multisig.authenticate(tx, CommandTypes.Kiosk);
		return commands.withdrawProfitsFromKiosk(tx, MULTISIG_GENERICS, auth, this.multisig.id, accountKioskId, kioskName);
	}

	/// Closes an empty Kiosk managed by the Account
	closeKiosk(
		tx: Transaction,
		kioskName: string,
	): TransactionResult {
		// get the account kiosk from its name 
		const accountKioskId = this.multisig.managedAssets.kiosks[kioskName].id;
		const auth = this.multisig.authenticate(tx, CommandTypes.Kiosk);
		return commands.closeKiosk(tx, MULTISIG_GENERICS, auth, this.multisig.id, accountKioskId, kioskName);
	}

	/// Opens a Treasury in the Account
	openTreasury(
		tx: Transaction,
		treasuryName: string,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx, CommandTypes.Treasury);
		return commands.openTreasury(tx, MULTISIG_GENERICS, auth, this.multisig.id, treasuryName);
	}

	/// Deposits an object owned by the Account into the Treasury
	depositFromAccount(
		tx: Transaction,
		treasuryName: string,
		coin: TransactionObjectInput,
	): TransactionResult {
		// get the coinType from the coin id 
		const coinType = ""; // TODO: ./objects/owned.ts
		const auth = this.multisig.authenticate(tx, roleWithName(CommandTypes.Deposit, treasuryName));
		return commands.depositFromAccount(tx, MULTISIG_GENERICS, coinType, auth, this.multisig.id, treasuryName, coin);
	}

	/// Deposits an object into the Treasury from the caller wallet
	depositFromWallet(
		tx: Transaction,
		coinType: string,
		treasuryName: string,
		coin: TransactionObjectInput,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx, roleWithName(CommandTypes.Deposit, treasuryName));
		return commands.depositFromWallet(tx, MULTISIG_GENERICS, coinType, auth, this.multisig.id, treasuryName, coin);
	}

	/// Closes an empty Treasury managed by the Account
	closeTreasury(
		tx: Transaction,
		treasuryName: string,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx, CommandTypes.Treasury);
		return commands.closeTreasury(tx, MULTISIG_GENERICS, auth, this.multisig.id, treasuryName);
	}

	/// Deposits and locks an UpgradeCap object in the Account
	depositUpgradeCap(
		tx: Transaction,
		packageName: string,
		upgradeCap: TransactionObjectInput,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx, CommandTypes.LockUpgradeCap);
		return commands.depositUpgradeCap(tx, MULTISIG_GENERICS, auth, this.multisig.id, upgradeCap, packageName, 0);
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

	hasApproved(key: string, userAddr: string = this.user.address!): boolean {
		if (!userAddr && !this.user.address) throw new Error("No user address provided to check approval status");
		const has = (this.proposal(key)?.outcome as Approvals).approved?.includes(userAddr);
		if (!has) throw new Error("Proposal not found");
		return has;
	}
}

