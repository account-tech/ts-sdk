import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import {
	User, Extensions,
	Multisig, Approvals, Member, Threshold, Dep,
	IntentStatus, ActionsArgs, IntentArgs, intentRegistry, IntentType,
	ConfigDepsIntent, WithdrawAndBurnIntent, UpdateMetadataIntent, ConfigMultisigIntent,
	AccountPreview,
	Intent,
	ManagedData,
	OwnedData,
	ToggleUnverifiedAllowedIntent,
	BorrowCapIntent,
	DisableRulesIntent,
	MintAndTransferIntent,
	MintAndVestIntent,
	TakeNftsIntent,
	ListNftsIntent,
	WithdrawAndTransferToVaultIntent,
	WithdrawAndTransferIntent,
	WithdrawAndVestIntent,
	UpgradePackageIntent,
	RestrictPolicyIntent,
	SpendAndTransferIntent,
	SpendAndVestIntent,
} from "./lib";
import {
	SUI_FRAMEWORK, MULTISIG_GENERICS, TRANSFER_POLICY_RULES, ACCOUNT_PROTOCOL,
	TransactionPureInput, DepStatus
} from "./types";
import * as commands from "./lib/commands";
import { AccountTypes, MultisigData } from "./lib/account/types";
import { Invite, Profile } from "./lib/user/types";

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

		const user = await User.init(client, userAddr);
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
		newUser?: { username: string, profilePicture: string },
		memberAddresses?: string[],
		globalThreshold?: number,
	): TransactionResult {
		// create the user if the user doesn't have one
		let userId: TransactionPureInput = this.user.id;
		let createdUser: TransactionPureInput | null = null;
		if (userId === "") {
			if (!newUser) throw new Error("User must create an user before creating a multisig");
			createdUser = this.user.createUser(tx); // TODO: add optional params for username and avatar 
			userId = tx.moveCall({
				target: `${SUI_FRAMEWORK}::object::id`,
				typeArguments: [`${ACCOUNT_PROTOCOL.V1}::user::User`],
				arguments: [tx.object(createdUser)],
			});
		}
		// create the multisig
		const multisig = this.multisig?.newMultisig(tx);
		// add AccountProtocol, AccountConfig and AccountActions dependency (AccountProtocol and AccountConfig are already added)
		this.multisig.atomicConfigDeps(tx, { deps: this.extensions.getLatestDeps().slice(0, 3) }, multisig); // atomic intent
		// add name
		const auth = this.multisig.authenticate(tx, multisig);
		commands.replaceMetadata(tx, MULTISIG_GENERICS, auth, multisig, ["name"], [name]);
		// update multisig rules if members are provided
		if (memberAddresses) {
			const members = memberAddresses.map((address: string) => ({ address, weight: 1, roles: [] }));
			members.push({ address: this.user.address!, weight: 1, roles: [] }); // add creator to the members

			this.multisig.atomicConfigMultisig(
				tx,
				{ members, thresholds: { global: globalThreshold ?? 1, roles: [] } },
				multisig
			); // atomic intent
		}
		// creator register the multisig in his user
		this.multisig.joinMultisig(tx, createdUser ? createdUser : userId, multisig);
		// send invites to added members
		memberAddresses?.forEach(address => { this.multisig.sendInvite(tx, address, multisig) });
		// transfer the user if just created
		if (createdUser) this.user.transferUser(tx, createdUser, this.user.address!);
		// share the multisig
		return this.multisig?.shareMultisig(tx, multisig);
	}

	/// Factory function to call the appropriate request function
	request(
		tx: Transaction,
		proposalType: IntentType,
		proposalArgs: IntentArgs,
		actionsArgs: ActionsArgs,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

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

	acceptInvite(tx: Transaction, invite: TransactionObjectInput): TransactionResult {
		return this.user.acceptInvite(tx, this.user.id, invite);
	}

	refuseInvite(tx: Transaction, invite: TransactionObjectInput): TransactionResult {
		return this.user.refuseInvite(tx, invite);
	}

	// === Getters ===

	/// Returns the latest deps from the extensions
	getLatestExtensions(): Dep[] {
		return this.extensions.getLatestDeps();
	}

	getUserProfile(): Profile {
		return this.user.profile;
	}

	getUserMultisigs(): AccountPreview[] {
		return this.user.getAccounts(AccountTypes.Multisig);
	}

	getUserInvites(): Invite[] {
		return this.user.getInvites(AccountTypes.Multisig);
	}

	getMultisigName(): string {
		return this.multisig.getName();
	}

	getMultisigDeps(): Dep[] {
		return this.multisig.deps;
	}

	/// Returns deps that are in Multisig and in Extensions
	getVerifiedDeps(): Dep[] {
		const currentDeps = this.getMultisigDeps();
		const latestDeps = this.getLatestExtensions();

		return currentDeps.filter(dep => latestDeps.some(latestDep => latestDep.name === dep.name));
	}

	/// Returns deps that are in Multisig but not in Extensions
	getUnverifiedDeps(): Dep[] {
		const currentDeps = this.getMultisigDeps();
		const latestDeps = this.getLatestExtensions();

		return currentDeps.filter(dep => !latestDeps.some(latestDep => latestDep.name === dep.name));
	}

	/// Returns the status of verified deps, with the latest version available
	getDepsStatus(): DepStatus[] {
		const currentDeps = this.getVerifiedDeps();
		const latestDeps = this.getLatestExtensions();

		return currentDeps.map(dep => {
			const latestDep = latestDeps.find(latestDep => latestDep.name === dep.name);
			return {
				name: dep.name,
				currentAddr: dep.addr,
				currentVersion: dep.version,
				latestAddr: latestDep!.addr,
				latestVersion: latestDep!.version,
			};
		});
	}

	getMultisigConfig(): Pick<MultisigData, "global" | "roles" | "members"> {
		return {
			global: this.multisig.global,
			roles: this.multisig.roles,
			members: this.multisig.members,
		};
	}

	getIntents(): Intent[] {
		return this.multisig.intents;
	}

	getIntent(key: string): Intent {
		return this.multisig.intent(key);
	}

	getIntentStatus(key: string): IntentStatus {
		return this.multisig.intentStatus(key);
	}

	canApproveIntent(key: string): boolean {
		const outcome = this.multisig.intent(key)?.outcome as Approvals;
		return outcome.approved.includes(this.user.address!);
	}

	/// Returns true if the intent can be executed after potential approval
	canExecuteIntent(key: string): boolean {
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

	getManagedAssets(): ManagedData {
		return this.multisig.managedAssets.getData();
	}

	getOwnedObjects(): OwnedData {
		return this.multisig.ownedObjects.getData();
	}

	// === Commands ===

	/// Automatically merges and splits coins, then returns the ids of the newly created coins to be used in an intent
	mergeAndSplit(
		tx: Transaction,
		coinType: string,
		toSplit: bigint[], // amounts
	): TransactionResult {
		const coin = this.multisig.ownedObjects.getCoin(coinType);
		if (!coin || coin.amount < toSplit.reduce((acc, curr) => acc + curr, 0n)) throw new Error("Not enough coins");

		const auth = this.multisig.authenticate(tx);
		return commands.mergeAndSplit(tx, MULTISIG_GENERICS, coinType, auth, this.multisig.id, coin.ids.slice(0, 500), toSplit);
	}

	/// Deposits and locks a Cap object in the Account
	depositCap(
		tx: Transaction,
		capType: string,
		capObject: TransactionObjectInput,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		return commands.depositCap(tx, MULTISIG_GENERICS, capType, auth, this.multisig.id, capObject);
	}

	/// Modifies the name of the Account
	modifyName(
		tx: Transaction,
		newName: string,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		return commands.replaceMetadata(tx, MULTISIG_GENERICS, auth, this.multisig.id, ["name"], [newName]);
	}

	/// Updates the verified deps to the latest version
	updateVerifiedDeps(
		tx: Transaction,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		return commands.updateVerifiedDepsToLatest(tx, MULTISIG_GENERICS, auth, this.multisig.id);
	}

	/// Deposits and locks a TreasuryCap object in the Account
	depositTreasuryCap(
		tx: Transaction,
		coinType: string,
		treasuryCap: TransactionObjectInput,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		return commands.depositTreasuryCap(tx, MULTISIG_GENERICS, coinType, auth, this.multisig.id, treasuryCap);
	}

	/// Opens a Kiosk in the Account
	openKiosk(
		tx: Transaction,
		kioskName: string,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
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
		const auth = this.multisig.authenticate(tx);
		const request = commands.placeInKiosk(tx, MULTISIG_GENERICS, nftType, auth, this.multisig.id, accountKioskId, senderKiosk, senderCap, policyId, kioskName, nftId);
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
	): TransactionResult {
		// get the account kiosk from its name 
		const accountKioskId = this.multisig.managedAssets.kiosks[kioskName].id;
		// get the nft type from the nft id
		const nftType = this.multisig.managedAssets.kiosks[kioskName].items.find(item => item.id === nftId)?.type;
		if (!nftType) throw new Error("NFT not found in kiosk");
		const auth = this.multisig.authenticate(tx);
		return commands.delistFromKiosk(tx, MULTISIG_GENERICS, nftType, auth, this.multisig.id, accountKioskId, kioskName, nftId);
	}

	/// Withdraws the profits from a Kiosk managed by the Account
	withdrawProfitsFromKiosk(
		tx: Transaction,
		kioskName: string,
	): TransactionResult {
		// get the account kiosk from its name 
		const accountKioskId = this.multisig.managedAssets.kiosks[kioskName].id;
		const auth = this.multisig.authenticate(tx);
		return commands.withdrawProfitsFromKiosk(tx, MULTISIG_GENERICS, auth, this.multisig.id, accountKioskId, kioskName);
	}

	/// Closes an empty Kiosk managed by the Account
	closeKiosk(
		tx: Transaction,
		kioskName: string,
	): TransactionResult {
		// get the account kiosk from its name 
		const accountKioskId = this.multisig.managedAssets.kiosks[kioskName].id;
		const auth = this.multisig.authenticate(tx);
		return commands.closeKiosk(tx, MULTISIG_GENERICS, auth, this.multisig.id, accountKioskId, kioskName);
	}

	/// Deposits and locks an UpgradeCap object in the Account
	depositUpgradeCap(
		tx: Transaction,
		packageName: string,
		upgradeCap: TransactionObjectInput,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		return commands.depositUpgradeCap(tx, MULTISIG_GENERICS, auth, this.multisig.id, upgradeCap, packageName, 0);
	}

	/// Opens a Treasury in the Account
	openVault(
		tx: Transaction,
		treasuryName: string,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		return commands.openVault(tx, MULTISIG_GENERICS, auth, this.multisig.id, treasuryName);
	}

	/// Deposits an object into the Treasury from the caller wallet
	depositFromWallet(
		tx: Transaction,
		coinType: string,
		treasuryName: string,
		coin: TransactionObjectInput,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		return commands.depositFromWallet(tx, MULTISIG_GENERICS, coinType, auth, this.multisig.id, treasuryName, coin);
	}

	/// Closes an empty Treasury managed by the Account
	closeVault(
		tx: Transaction,
		treasuryName: string,
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		return commands.closeVault(tx, MULTISIG_GENERICS, auth, this.multisig.id, treasuryName);
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
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

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
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

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

	requestToggleUnverifiedDepsAllowed(
		tx: Transaction,
		newValue: boolean, // true to allow unverified deps, false to disallow
		key: string,
		description?: string, // default is empty
		executionTime?: bigint, // default is now
		expirationTime?: bigint, // default is 1 week
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

		ToggleUnverifiedAllowedIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: [executionTime ?? 0n], expirationTime },
			{ newValue }, // useless argument, just to respect the interface
		);

		return this.multisig.approveIntent(tx, key, this.multisig.id);
	}

	requestBorrowCap(
		tx: Transaction,
		capType: string,
		key: string,
		description?: string, // default is empty
		executionTime?: bigint, // default is now
		expirationTime?: bigint, // default is 1 week
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

		BorrowCapIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: [executionTime ?? 0n], expirationTime },
			{ capType },
		);

		return this.multisig.approveIntent(tx, key, this.multisig.id);
	}

	requestDisableRules(
		tx: Transaction,
		coinType: string,
		disableMint: boolean,
		disableBurn: boolean,
		disableUpdateSymbol: boolean,
		disableUpdateName: boolean,
		disableUpdateDescription: boolean,
		disableUpdateIcon: boolean,
		key: string,
		description?: string, // default is empty
		executionTime?: bigint, // default is now
		expirationTime?: bigint, // default is 1 week
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

		DisableRulesIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: [executionTime ?? 0n], expirationTime },
			{ coinType, disableMint, disableBurn, disableUpdateSymbol, disableUpdateName, disableUpdateDescription, disableUpdateIcon },
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
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

		UpdateMetadataIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: [executionTime ?? 0n], expirationTime },
			{ coinType, newName, newSymbol, newDescription, newIcon },
		);

		return this.multisig.approveIntent(tx, key, this.multisig.id);
	}

	requestMintAndTransfer(
		tx: Transaction,
		coinType: string,
		transfers: { amount: bigint, recipient: string }[],
		key: string,
		description?: string, // default is empty
		executionTimes?: bigint[], // default is now
		expirationTime?: bigint, // default is 1 week
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

		MintAndTransferIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: executionTimes ?? [0n], expirationTime },
			{ coinType, transfers },
		);

		return this.multisig.approveIntent(tx, key, this.multisig.id);
	}

	requestMintAndVest(
		tx: Transaction,
		coinType: string,
		amount: bigint,
		start: bigint,
		end: bigint,
		recipient: string,
		key: string,
		description?: string, // default is empty
		executionTime?: bigint, // default is now
		expirationTime?: bigint, // default is 1 week
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

		MintAndVestIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: [executionTime ?? 0n], expirationTime },
			{ coinType, amount, start, end, recipient },
		);

		return this.multisig.approveIntent(tx, key, this.multisig.id);
	}

	requestWithdrawAndBurn(
		tx: Transaction,
		coinType: string,
		amount: bigint,
		key: string,
		description?: string, // default is empty
		executionTime?: bigint, // default is now
		expirationTime?: bigint, // default is 1 week
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

		const coinId = this.mergeAndSplit(tx, coinType, [amount]);

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

	requestTakeNfts(
		tx: Transaction,
		kioskName: string,
		nftIds: string[],
		recipient: string,
		key: string,
		description?: string, // default is empty
		executionTime?: bigint, // default is now
		expirationTime?: bigint, // default is 1 week
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

		TakeNftsIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: [executionTime ?? 0n], expirationTime },
			{ kioskName, nftIds, recipient },
		);

		return this.multisig.approveIntent(tx, key, this.multisig.id);
	}

	requestListNfts(
		tx: Transaction,
		kioskName: string,
		listings: { nftId: string, price: bigint }[],
		key: string,
		description?: string, // default is empty
		executionTime?: bigint, // default is now
		expirationTime?: bigint, // default is 1 week
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

		ListNftsIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: [executionTime ?? 0n], expirationTime },
			{ kioskName, listings },
		);

		return this.multisig.approveIntent(tx, key, this.multisig.id);
	}

	requestWithdrawAndTransferToVault(
		tx: Transaction,
		coinType: string,
		coinAmount: bigint,
		vaultName: string,
		key: string,
		description?: string, // default is empty
		executionTime?: bigint, // default is now
		expirationTime?: bigint, // default is 1 week
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

		const coinId = this.mergeAndSplit(tx, coinType, [coinAmount]);

		WithdrawAndTransferToVaultIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: [executionTime ?? 0n], expirationTime },
			{ coinType, coinId, coinAmount, vaultName },
		);

		return this.multisig.approveIntent(tx, key, this.multisig.id);
	}

	requestWithdrawAndTransfer(
		tx: Transaction,
		coinTransfers: { coinType: string, coinAmount: bigint, recipient: string }[], 
		objTransfers: { objectId: string, recipient: string }[], 
		key: string,
		description?: string, // default is empty
		executionTime?: bigint, // default is now
		expirationTime?: bigint, // default is 1 week
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

		let transfers: { objectId: TransactionPureInput, recipient: string }[] = objTransfers;

		coinTransfers.forEach(transfer => {
			const objectId = this.mergeAndSplit(tx, transfer.coinType, [transfer.coinAmount]);
			transfers.push({ objectId, recipient: transfer.recipient });
		});

		WithdrawAndTransferIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: [executionTime ?? 0n], expirationTime },
			{ transfers },
		);

		return this.multisig.approveIntent(tx, key, this.multisig.id);
	}

	requestWithdrawAndVest(
		tx: Transaction,
		coinType: string,
		coinAmount: bigint,
		start: bigint,
		end: bigint,
		recipient: string,
		key: string,
		description?: string, // default is empty
		executionTime?: bigint, // default is now
		expirationTime?: bigint, // default is 1 week
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

		const coinId = this.mergeAndSplit(tx, coinType, [coinAmount]);

		WithdrawAndVestIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: [executionTime ?? 0n], expirationTime },
			{ coinId, start, end, recipient },
		);

		return this.multisig.approveIntent(tx, key, this.multisig.id);
	}

	requestUpgradePackage(
		tx: Transaction,
		packageName: string,
		digest: number[],
		key: string,
		description?: string, // default is empty
		executionTime?: bigint, // default is now
		expirationTime?: bigint, // default is 1 week
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

		UpgradePackageIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: [executionTime ?? 0n], expirationTime },
			{ packageName, digest },
		);

		return this.multisig.approveIntent(tx, key, this.multisig.id);
	}

	requestRestrictPolicy(
		tx: Transaction,
		packageName: string,
		policy: number,
		key: string,
		description?: string, // default is empty
		executionTime?: bigint, // default is now
		expirationTime?: bigint, // default is 1 week
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

		RestrictPolicyIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: [executionTime ?? 0n], expirationTime },
			{ packageName, policy },
		);

		return this.multisig.approveIntent(tx, key, this.multisig.id);
	}

	requestSpendAndTransfer(
		tx: Transaction,
		treasuryName: string,
		coinType: string,
		transfers: { amount: bigint, recipient: string }[],
		key: string,
		description?: string, // default is empty
		executionTimes?: bigint[], // default is now
		expirationTime?: bigint, // default is 1 week
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

		SpendAndTransferIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: executionTimes ?? [0n], expirationTime },
			{ treasuryName, coinType, transfers },
		);

		return this.multisig.approveIntent(tx, key, this.multisig.id);
	}

	requestSpendAndVest(
		tx: Transaction,
		treasuryName: string,
		coinType: string,
		amount: bigint,
		start: bigint,
		end: bigint,
		recipient: string,
		key: string,
		description?: string, // default is empty
		executionTime?: bigint, // default is now
		expirationTime?: bigint, // default is 1 week
	): TransactionResult {
		const auth = this.multisig.authenticate(tx);
		const outcome = this.multisig.emptyApprovalsOutcome(tx);

		SpendAndVestIntent.prototype.request(
			tx,
			MULTISIG_GENERICS,
			auth,
			outcome,
			this.multisig.id,
			{ key, description, executionTimes: [executionTime ?? 0n], expirationTime },
			{ treasuryName, coinType, amount, start, end, recipient },
		);

		return this.multisig.approveIntent(tx, key, this.multisig.id);
	}
}

