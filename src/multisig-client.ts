import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SUI_FRAMEWORK, ACCOUNT_CONFIG, MULTISIG_GENERICS, TRANSFER_POLICY_RULES } from "./types/constants";
import { AccountType } from "./types/account-types";
import { User } from "./lib/user";
import { Member, Multisig, Threshold } from "./lib/account/configs/multisig";
import { TransactionPureInput } from "./types/helper-types";
import * as commands from "./lib/commands";
import { ActionsArgs, IntentArgs, intentRegistry, IntentType } from "./types/intent-types";
import { Extensions } from "./lib/extensions";
import { Approvals } from "./lib/outcomes/variants/approvals";
import { ConfigDepsIntent } from "./lib/intents/account-actions/config";
import { WithdrawAndBurnIntent, UpdateMetadataIntent } from "./lib/intents/account-actions/currency";
// import { CommandTypes } from "./types/command-types";
import { ConfigMultisigIntent } from "./lib/intents/account-actions/multisig";
import { Dep } from "./lib/account/account";
import { IntentStatus } from "./lib/intents/intent";
// import { RoleTypes, roleUtils } from "./lib/roles";

export class MultisigClient {

	private constructor(
		public client: SuiClient,
		public user: User,
		public multisig: Multisig,
		public extensions: Extensions,
	) { }

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
				target: `${SUI_FRAMEWORK}::object::id`,
				typeArguments: [`${ACCOUNT_CONFIG.V1}::user::User`],
				arguments: [tx.object(createdAccount)],
			});
		}
		// create the multisig
		const multisig = this.multisig?.newMultisig(tx);
		// add name
		this.modifyName(tx, name, multisig);
		// update multisig rules if members are provided
		if (memberAddresses) {
			const members = memberAddresses.map((address: string) => ({ address, weight: 1, roles: [] }));
			members.push({ address: this.user.address!, weight: 1, roles: [] }); // add creator to the members

			this.multisig.configMultisig(
				tx,
				{ key: "init_members" },
				{ members, thresholds: { global: globalThreshold ?? 1, roles: [] } },
				multisig
			); // atomic intent
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

	/// Factory function to call the appropriate request function
	request(
		tx: Transaction,
		proposalType: IntentType,
		proposalArgs: IntentArgs,
		actionsArgs: ActionsArgs,
		role?: string,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx, role ?? "");
		const outcome = this.multisig.emptyOutcome(tx);

		const proposalClass = intentRegistry[proposalType];
		const method = proposalClass.prototype.request;
		method.call(proposalClass, tx, MULTISIG_GENERICS, auth, outcome, this.multisig.id, proposalArgs, actionsArgs);
		// directly approve after proposing
		return this.multisig.approveIntent(tx, proposalArgs.key, this.multisig.id);
	}

	/// Approves a intent
	approve(
		tx: Transaction,
		intentKey: string
	): TransactionResult {
		return this.multisig.approveIntent(tx, intentKey, this.multisig.id);
	}

	/// Removes approval from a intent
	disapprove(
		tx: Transaction,
		intentKey: string
	): TransactionResult {
		return this.multisig.disapproveIntent(tx, intentKey, this.multisig.id);
	}

	/// Calls the execute function for the intent, approve if not already done
	execute(
		tx: Transaction,
		caller: string,
		intentKey: string
	): TransactionResult {
		const intent = this.multisig.intent(intentKey);
		if (!intent) throw new Error("Proposal not found");

		(intent.outcome as Approvals).maybeApprove(tx, caller);
		const executable = (intent.outcome as Approvals).constructExecutable(tx);
		
		let result;
		result = intent.execute(tx, MULTISIG_GENERICS, executable);
		// if no more executions scheduled after this one, destroy intent
		if (intent.fields.executionTimes.length == 1) {
			result = intent.clearEmpty(tx, MULTISIG_GENERICS, this.multisig.id, intentKey);
		}
		return result;
	}

	/// Deletes a intent if it has expired
	delete(
		tx: Transaction,
		intentKey: string,
	) {
		const intent = this.multisig.intent(intentKey);
		if (!intent) throw new Error("Proposal not found");
		if (!intent.hasExpired()) throw new Error("Proposal has not expired");

		intent.deleteExpired(tx, MULTISIG_GENERICS, this.multisig.id, intentKey);
	}

	/// Returns true if the intent can be executed after potential approval
	canExecute(key: string): boolean {
		const intent = this.multisig.intent(key);
		const outcome = intent?.outcome as Approvals;
		const member = this.multisig.member(this.user.address!);

		switch (this.multisig.intentStatus(key)) {
			case IntentStatus.Executable:
				return true;
			case IntentStatus.Pending:
				const hasRole = member.roles.includes(intent.fields.role);

				const thresholdReachedAfterApproval =
					(outcome.totalWeight + member.weight) >= this.multisig.global.threshold ||
					(hasRole ? outcome.roleWeight + member.weight : outcome.roleWeight) >= this.multisig.roles[intent.fields.role].threshold;
				const executionTimeReached = intent!.fields.executionTimes[0] <= Date.now();

				return thresholdReachedAfterApproval && executionTimeReached;
			default:
				return false;
		}
	}

	// === Commands ===

	/// Deposits and locks a Cap object in the Account
	depositCap(
		tx: Transaction,
		capType: string,
		capObject: TransactionObjectInput,
		multisig: TransactionObjectInput = this.multisig.id
	): TransactionResult {
		const auth = this.multisig.authenticate(tx, multisig);
		return commands.depositCap(tx, MULTISIG_GENERICS, capType, auth, multisig, capObject);
	}

	/// Modifies the name of the Account
	modifyName(
		tx: Transaction,
		newName: string,
		multisig: TransactionObjectInput = this.multisig.id
	): TransactionResult {
		const auth = this.multisig.authenticate(tx, multisig);
		return commands.replaceMetadata(tx, MULTISIG_GENERICS, auth, multisig, ["name"], [newName]);
	}

	/// Deposits and locks a TreasuryCap object in the Account
	depositTreasuryCap(
		tx: Transaction,
		coinType: string,
		treasuryCap: TransactionObjectInput,
		multisig: TransactionObjectInput = this.multisig.id		
	): TransactionResult {
		const auth = this.multisig.authenticate(tx, multisig);
		return commands.depositTreasuryCap(tx, MULTISIG_GENERICS, coinType, auth, multisig, treasuryCap);
	}

	/// Opens a Kiosk in the Account
	openKiosk(
		tx: Transaction,
		kioskName: string,
		multisig: TransactionObjectInput = this.multisig.id
	): TransactionResult {
		const auth = this.multisig.authenticate(tx, multisig);
		return commands.openKiosk(tx, MULTISIG_GENERICS, auth, multisig, kioskName);
	}

	/// Places an NFT in a Kiosk managed by the Account
	async placeInKiosk(
		tx: Transaction,
		nftType: string,
		senderKiosk: TransactionObjectInput,
		senderCap: TransactionObjectInput,
		kioskName: string,
		nftId: string,
		multisig: TransactionObjectInput = this.multisig.id
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
		const auth = this.multisig.authenticate(tx, multisig);
		const request = commands.placeInKiosk(tx, MULTISIG_GENERICS, nftType, auth, multisig, accountKioskId, senderKiosk, senderCap, policyId, kioskName, nftId);
		return tx.moveCall({
			target: `${SUI_FRAMEWORK}::transfer_policy::confirm_request`,
			typeArguments: [nftType],
			arguments: [tx.object(policyId), request],
		});
	}

	/// Delists an NFT from a Kiosk managed by the Account
	delistFromKiosk(
		tx: Transaction,
		kioskName: string,
		nftId: string,
		multisig: TransactionObjectInput = this.multisig.id
	): TransactionResult {
		// get the account kiosk from its name 
		const accountKioskId = this.multisig.managedAssets.kiosks[kioskName].id;
		// get the nft type from the nft id
		const nftType = this.multisig.managedAssets.kiosks[kioskName].items.find(item => item.id === nftId)?.type;
		if (!nftType) throw new Error("NFT not found in kiosk");
		const auth = this.multisig.authenticate(tx, multisig);
		return commands.delistFromKiosk(tx, MULTISIG_GENERICS, nftType, auth, multisig, accountKioskId, kioskName, nftId);
	}

	/// Withdraws the profits from a Kiosk managed by the Account
	withdrawProfitsFromKiosk(
		tx: Transaction,
		kioskName: string,
		multisig: TransactionObjectInput = this.multisig.id
	): TransactionResult {
		// get the account kiosk from its name 
		const accountKioskId = this.multisig.managedAssets.kiosks[kioskName].id;
		const auth = this.multisig.authenticate(tx, multisig);
		return commands.withdrawProfitsFromKiosk(tx, MULTISIG_GENERICS, auth, multisig, accountKioskId, kioskName);
	}

	/// Closes an empty Kiosk managed by the Account
	closeKiosk(
		tx: Transaction,
		kioskName: string,
		multisig: TransactionObjectInput = this.multisig.id
	): TransactionResult {
		// get the account kiosk from its name 
		const accountKioskId = this.multisig.managedAssets.kiosks[kioskName].id;
		const auth = this.multisig.authenticate(tx, multisig);
		return commands.closeKiosk(tx, MULTISIG_GENERICS, auth, multisig, accountKioskId, kioskName);
	}

	/// Opens a Treasury in the Account
	openVault(
		tx: Transaction,
		treasuryName: string,
		multisig: TransactionObjectInput = this.multisig.id
	): TransactionResult {
		const auth = this.multisig.authenticate(tx, multisig);
		return commands.openVault(tx, MULTISIG_GENERICS, auth, multisig, treasuryName);
	}

	/// Deposits an object into the Treasury from the caller wallet
	depositFromWallet(
		tx: Transaction,
		coinType: string,
		treasuryName: string,
		coin: TransactionObjectInput,
		multisig: TransactionObjectInput = this.multisig.id
	): TransactionResult {
		const auth = this.multisig.authenticate(tx, multisig);
		return commands.depositFromWallet(tx, MULTISIG_GENERICS, coinType, auth, multisig, treasuryName, coin);
	}

	/// Closes an empty Treasury managed by the Account
	closeVault(
		tx: Transaction,
		treasuryName: string,
		multisig: TransactionObjectInput = this.multisig.id
	): TransactionResult {
		const auth = this.multisig.authenticate(tx, multisig);
		return commands.closeVault(tx, MULTISIG_GENERICS, auth, multisig, treasuryName);
	}

	/// Deposits and locks an UpgradeCap object in the Account
	depositUpgradeCap(
		tx: Transaction,
		packageName: string,
		multisig: TransactionObjectInput = this.multisig.id,
		upgradeCap: TransactionObjectInput,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx, multisig);
		return commands.depositUpgradeCap(tx, MULTISIG_GENERICS, auth, multisig, upgradeCap, packageName, 0);
	}

	// === Intents ===

	requestConfigMultisig(
		tx: Transaction,
		globalThreshold: number,
		roleThresholds: Threshold[],
		members: Member[],
		key: string,
		description?: string, // default is empty
		executionTime?: bigint, // default is now
		expirationTime?: bigint, // default is 1 week
	) {
		const auth = this.multisig.authenticate(tx, "");
		const outcome = this.multisig.emptyOutcome(tx);

		ConfigMultisigIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: [executionTime ?? 0n], expirationTime },
			{ members, thresholds: { global: globalThreshold, roles: roleThresholds } },
		);

		return this.multisig.approveIntent(tx, key, this.multisig.id);
	}

	requestConfigDeps(
		tx: Transaction,
		deps: Dep[],
		key: string,
		description?: string, // default is empty
		executionTime?: bigint, // default is now
		expirationTime?: bigint, // default is 1 week
	) {
		const auth = this.multisig.authenticate(tx, "");
		const outcome = this.multisig.emptyOutcome(tx);

		ConfigDepsIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: [executionTime ?? 0n], expirationTime },
			{ deps },
		);

		return this.multisig.approveIntent(tx, key, this.multisig.id);
	}

	requestWithdrawAndBurn(
		tx: Transaction,
		coinType: string,
		coinId: string,
		amount: bigint,
		key: string,
		description?: string, // default is empty
		executionTime?: bigint, // default is now
		expirationTime?: bigint, // default is 1 week
	) {
		const auth = this.multisig.authenticate(tx, "");
		const outcome = this.multisig.emptyOutcome(tx);

		WithdrawAndBurnIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: [executionTime ?? 0n], expirationTime },
			{ coinType, coinId, amount },
		);

		return this.multisig.approveIntent(tx, key, this.multisig.id);
	}

	requestUpdateMetadata(
		tx: Transaction,
		coinType: string,
		newName: string | null,
		newSymbol: string | null,
		newDescription: string | null,
		newIcon: string | null,
		key: string,
		description?: string, // default is empty
		executionTime?: bigint, // default is now
		expirationTime?: bigint, // default is 1 week
	) {
		const auth = this.multisig.authenticate(tx, "");
		const outcome = this.multisig.emptyOutcome(tx);

		UpdateMetadataIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: [executionTime ?? 0n], expirationTime },
			{ coinType, name: newName, symbol: newSymbol, description: newDescription, icon: newIcon },
		);

		return this.multisig.approveIntent(tx, key, this.multisig.id);
	}
}

