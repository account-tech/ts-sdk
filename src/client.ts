import { CLOCK, FRAMEWORK } from "./constants.js";
import { Account, Kiosk, Multisig, Proposal, TransferPolicy } from "./types.js";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { TransactionBlock, TransactionResult } from "@mysten/sui.js/transactions";
import { KioskClient, Network } from "@mysten/kiosk";

export class KrakenClient {
	/**
	 * @description SDK to interact with Kraken package.
	 * @param client connection to fullnode
	 */

	public client: SuiClient;
	public multisigData: Multisig | null;

	constructor(
		public network: "mainnet" | "testnet" | "devnet" | "localnet",
		public url: string,
		public packageId: string,
		public user: string,
		public multisigId: string,
	) {
		if (!url) {
			url = getFullnodeUrl(network);
		}

		this.client = new SuiClient({ url });
		this.multisigData = null;
	}

	async fetchMultisigData() {
		this.multisigData = await this.getMultisig(this.multisigId);
	}

	// ===== CORE =====

	// === Multisig ===

	async getMultisig(id: string): Promise<Multisig> {
		// get Multisig 
		const { data } = await this.client.getObject({
			id,
			options: { showContent: true }
		});

		const content = data?.content as any;

		const members = await Promise.all(content.fields.members.fields.contents.map(async (member: any) => {
			return await this.getAccount(member);
		}));

		// get proposals in multisig and each action attached to proposals
		const proposals = content.fields.proposals.fields.contents.map(async (proposal: any) => {
			// get the dynamic field action for each proposal
			const parentId = proposal.fields.value.fields.id.id;
			const { data } = await this.client.getDynamicFields({ parentId });
			const df: any = await this.client.getObject({
				id: data[0].objectId,
				options: { showContent: true }
			});

			const content = df.data?.content?.fields.value;
			const action = {
				type: content.type.split("::").pop(), // The action Struct name
				...content.fields // The action Struct fields
			}

			return {
				id,
				key: proposal.fields.key,
				description: proposal.fields.value.fields.description,
				executionTime: proposal.fields.value.fields.execution_time,
				expirationEpoch: proposal.fields.value.fields.expiration_epoch,
				approved: proposal.fields.value.fields.approved.fields.contents,
				action
			}
		});

		return {
			name: content.fields.name,
			threshold: content.fields.threshold,
			members,
			proposals,
		}
	}

	createMultisig(tx: TransactionBlock, name: string, members: string[], accountId: string): TransactionResult {
		const [multisig] = tx.moveCall({
			target: `${this.packageId}::multisig::new`,
			arguments: [tx.pure(name)],
		});

		const [id] = tx.moveCall({
			target: `${FRAMEWORK}::object::id`,
			arguments: [multisig],
			typeArguments: [`${this.packageId}::multisig::Multisig`]
		});
		
		tx.moveCall({
			target: `${this.packageId}::account::join_multisig`,
			arguments: [tx.object(accountId), id],
		});
		
		if (members.length > 0) {
			tx.moveCall({
				target: `${this.packageId}::config::propose_modify`,
				arguments: [
					multisig, 
					tx.pure("init_members"), 
					tx.pure(0), 
					tx.pure(0), 
					tx.pure(""), 
					tx.pure([]), 
					tx.pure([]), 
					tx.pure(members),
					tx.pure([]), 
				],
			});
			
			tx.moveCall({
				target: `${this.packageId}::multisig::approve_proposal`,
				arguments: [
					multisig, 
					tx.pure("init_members"), 
				],
			});
			
			tx.moveCall({
				target: `${this.packageId}::config::execute_modify`,
				arguments: [
					multisig, 
					tx.pure("init_members"), 
					tx.object(CLOCK),
				],
			});
			
			members.forEach((member) => {
				tx.moveCall({
					target: `${this.packageId}::account::send_invite`,
					arguments: [multisig, tx.pure(member)],
				});
			});
		}

		return tx.moveCall({
			target: `${this.packageId}::multisig::share`,
			arguments: [multisig],
		});
	}

	cleanProposals(tx: TransactionBlock): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::multisig::clean_proposals`,
			arguments: [tx.object(this.multisigId)],
		});
	}

	approveProposal(tx: TransactionBlock, key: string): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::multisig::approve_proposal`,
			arguments: [tx.object(this.multisigId), tx.pure(key)],
		});
	}

	removeApproval(tx: TransactionBlock, key: string): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::multisig::remove_approval`,
			arguments: [tx.object(this.multisigId), tx.pure(key)],
		});
	}

	executeProposal(tx: TransactionBlock, key: string): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::multisig::execute_proposal`,
			arguments: [tx.object(this.multisigId), tx.pure(key), tx.object(CLOCK)],
		});
	}

	// === Account ===

	// TODO: implement merge accounts
	async getAccount(owner: string = this.user): Promise<Account> {
		const { data } = await this.client.getOwnedObjects({
			owner,
			filter: { StructType: `${this.packageId}::account::Account` },
			options: { showContent: true }
		});
		
		if (data.length == 0) { 
			return {
				owner,
				id: "",
				username: "",
				profilePicture: "",
				multisigs: [],
			}
		}

		const content = data[0].data?.content as any;

		const msObjs = await this.client.multiGetObjects({
			ids: content.fields.multisigs.fields.contents,
			options: { showContent: true }
		});
		const multisigs = msObjs.map((ms: any) => { 
			return {
				id: ms.data?.content?.fields.id.id,
				name: ms.data?.content?.fields.name
			}
		});
		console.log(multisigs);

		return {
			owner,
			id: content.fields.id.id,
			username: content.fields.username,
			profilePicture: content.fields.profile_picture,
			multisigs,
		}
	}

	createAccount(tx: TransactionBlock, username: string, profilePicture: string): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::account::new`,
			arguments: [tx.pure(username), tx.pure(profilePicture)],
		});
	}

	deleteAccount(tx: TransactionBlock, account: string): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::account::destroy`,
			arguments: [tx.object(account)],
		});
	}

	joinMultisig(tx: TransactionBlock, account: string, multisig: string): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::account::join_multisig`,
			arguments: [tx.object(account), tx.pure(multisig)],
		});
	}

	leaveMultisig(tx: TransactionBlock, account: string, multisig: string): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::account::leave_multisig`,
			arguments: [tx.object(account), tx.pure(multisig)],
		});
	}

	// member only
	sendInvite(tx: TransactionBlock, recipient: string): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::account::send_invite`,
			arguments: [tx.object(this.multisigId), tx.pure(recipient)],
		});
	}

	// member only
	acceptInvite(tx: TransactionBlock, account: string, invite: string): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::account::accept_invite`,
			arguments: [tx.object(account), tx.object(invite)],
		});
	}

	// member only
	refuseInvite(tx: TransactionBlock, account: string, invite: string): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::account::refuse_invite`,
			arguments: [tx.object(account), tx.object(invite)],
		});
	}

	// === Coin operations (member only) ===

	mergeCoins(tx: TransactionBlock, to_keep: string, to_merge: string[], coinType: string): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::coin_operations::merge`,
			arguments: [
				tx.object(this.multisigId), 
				tx.pure(to_keep),
				tx.pure(to_merge),
			],
			typeArguments: [coinType]
		});
	}
	
	splitCoins(tx: TransactionBlock, to_keep: string, to_split: string[], coinType: string): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::coin_operations::split`,
			arguments: [
				tx.object(this.multisigId), 
				tx.pure(to_keep),
				tx.pure(to_split),
			],
			typeArguments: [coinType]
		});
	}

	// ===== PROPOSALS =====

	// === Config ===

	// submit and approve proposal, execute if is only member
	proposeModify(
		tx: TransactionBlock, 
		key: string, 
		executionTime: number,
		expirationEpoch: number,
		description: string,
		name?: string,
		threshold?: number,
		toAdd?: string[],
		toRemove?: string[],
	) {
		tx.moveCall({
			target: `${this.packageId}::config::propose_modify`,
			arguments: [
				tx.object(this.multisigId), 
				tx.pure(key), 
				tx.pure(executionTime), 
				tx.pure(expirationEpoch), 
				tx.pure(description), 
				name ? tx.pure([name]) : tx.pure([]), 
				threshold ? tx.pure([threshold]) : tx.pure([]), 
				toAdd ? tx.pure(toAdd) : tx.pure([]),
				toRemove ? tx.pure(toRemove) : tx.pure([]), 
			],
		});		
		
		this.approveProposal(tx, key);
		
		if (this.multisigData?.threshold == 1) {
			tx.moveCall({
				target: `${this.packageId}::config::execute_modify`,
				arguments: [
					tx.object(this.multisigId), 
					tx.pure(key), 
					tx.object(CLOCK),
				],
			});
		}
	}

	executeModify(
		tx: TransactionBlock, 
		key: string, 
	) {
		tx.moveCall({
			target: `${this.packageId}::config::execute_modify`,
			arguments: [
				tx.object(this.multisigId), 
				tx.pure(key), 
				tx.object(CLOCK),
			],
		});
	}

	// === Kiosk ===

	async getKiosks(): Promise<Kiosk[]> {
		let capIds: string[] = [];
		let kioskIds: string[] = [];
		let cursor = null;
		let page = true;

		while (page) {
			const { data, nextCursor, hasNextPage } = await this.client.getOwnedObjects({
				owner: this.multisigId,
				filter: { StructType: `${FRAMEWORK}::kiosk::KioskOwnerCap` },
				options: { showContent: true },
				cursor
			});

			capIds = capIds.concat(data.map(cap => cap.data?.objectId!));
			kioskIds = kioskIds.concat(data.map((cap: any) => cap.data?.content?.fields.for));
			cursor = nextCursor;
			page = hasNextPage;
		}
		
		let kiosks: Kiosk[] = [];

		for (let i = 0; i < kioskIds.length; i += 25) {
			const ids = kioskIds.slice(i, i + 25);
			const objects = await this.client.multiGetObjects({
				ids,
				options: { showContent: true }
			});
			kiosks = kiosks.concat(objects.map((obj: any, index) => {
				return {
					cap: capIds[i + index],
					kiosk: kioskIds[i + index],
					profits: obj.data?.content.fields.profits,
					itemCount: obj.data?.content.fields.item_count,
				}
			}));
		}

		return kiosks;
	}

	// return the Kiosk (must be shared)
	createKiosk(tx: TransactionBlock): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::kiosk::new`,
			arguments: [tx.object(this.multisigId)],
		});
	}	
	
	async getPolicy(nftType: string): Promise<TransferPolicy> {
		let network: Network;
		if (this.network == "mainnet") {
			network = Network.MAINNET;
		} else if (this.network == "testnet") {
			network = Network.TESTNET;
		} else {
			network = Network.CUSTOM;
		}
		const kioskClient = new KioskClient({
			client: this.client,
			network,
		});

		const policies = await kioskClient.getTransferPolicies({type: nftType});

		return {
			id: policies[0].id,
			hasFloorPrice: policies[0].rules.find(rule => rule.includes("floor_price_rule")) ? true : false,
			hasRoyalty: policies[0].rules.find(rule => rule.includes("royalty_rule")) ? true : false,
			isLocked: policies[0].rules.find(rule => rule.includes("kiosk_lock_rule")) ? true : false,
		};
	}

	// 1. create a Kiosk if the Multisig doesn't have one OR
	// 1(bis) get the Kiosk if it already exists
	// 2. get the TransferPolicy for the type
	// 3. transferFrom for each nft of this type
	// 4. repeat for each type
	// (5. share the Kiosk if it has been created in this PTB)
	// not a proposal
	transferFrom(
		tx: TransactionBlock, 
		policy: TransferPolicy,
		multisigKiosk: string,
		multisigCap: string,
		senderKiosk: string,
		senderCap: string,
		nftId: string,
		nftType: string,
	): TransactionResult {
		const [request] = tx.moveCall({
			target: `${this.packageId}::kiosk::transfer_from`,
			arguments: [
				tx.object(this.multisigId), 
				tx.object(multisigKiosk),
				tx.object(multisigCap),
				tx.object(senderKiosk),
				tx.object(senderCap),
				tx.pure(nftId),
			],
			typeArguments: [nftType]
		});
		// fill the request
		const tpId = this.resolveRules(tx, policy, multisigKiosk, request, nftType);
		// destroy the request
		tx.moveCall({
			target: `${FRAMEWORK}::transfer_policy::confirm_request`,
			arguments: [
				tx.object(tpId), 
				request, 
			],
		});
	}

	proposeTransferTo(
		tx: TransactionBlock,
		key: string,
		executionTime: number,
		expirationEpoch: number,
		description: string,
		capId: string,
		nfts: string,
		recipient: string,
	) {
		tx.moveCall({
			target: `${this.packageId}::kiosk::propose_transfer_to`,
			arguments: [
				tx.object(this.multisigId), 
				tx.pure(key), 
				tx.pure(executionTime),
				tx.pure(expirationEpoch),
				tx.pure(description),
				tx.pure(capId),
				tx.pure(nfts),
				tx.pure(recipient),
			],
		});
		this.approveProposal(tx, key);
	}

	async executeTransferTo(tx: TransactionBlock, key: string, capId: string) {
		const ids = this.multisigData?.proposals.filter(p => p.key == key).map(p => p.action.fields.nfts);
		if (!ids) throw new Error("Proposal is not valid");
		const nfts = await this.client.multiGetObjects({
			ids,
			options: { showContent: true }
		});
		// TODO: get their type
		const [action] = this.executeProposal(tx, key);
		const [cap] = tx.moveCall({
			target: `${this.packageId}::kiosk::borrow_cap_transfer`,
			arguments: [action, tx.object(this.multisigId), tx.object(capId)],
		});
		// TODO: complete the function
	}

	private resolveRules(
		tx: TransactionBlock, 
		policy: TransferPolicy,
		kiosk: string, 
		transferRequest: any, 
		nftType: string
	) {
		if (policy.hasFloorPrice) {
			tx.moveCall({
				target: `${this.packageId}::floor_price_rule::prove`,
				typeArguments: [nftType],
				arguments: [tx.object(policy.id), transferRequest],
			});
		}
		if (policy.hasRoyalty) {
			const fee = tx.splitCoins(tx.gas, [0]);
			tx.moveCall({
				target: `${this.packageId}::royalty_rule::pay`,
				typeArguments: [nftType],
				arguments: [tx.object(policy.id), transferRequest, fee],
			});
		} 
		if (policy.isLocked) {
			tx.moveCall({
				target: `${this.packageId}::kiosk_lock_rule::prove`,
				typeArguments: [nftType],
				arguments: [transferRequest, tx.object(kiosk)],
			});
		}
	}
}

