import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { TransactionBlock, TransactionResult } from "@mysten/sui.js/transactions";
import { normalizeSuiAddress } from "@mysten/sui.js/utils";
import { KioskClient, Network } from "@mysten/kiosk";
import { CLOCK, FRAMEWORK } from "./types/constants.js";
import { Kiosk, Proposal, TransferPolicy } from "./types/types.js";
import { Account } from "./lib/account.js";
import { Multisig } from "./lib/multisig.js";
import { ProposalService } from "./lib/proposals/proposalService.js";

export class KrakenClient {
	/**
	 * @description SDK to interact with Kraken package.
	 * @param client connection to fullnode
	 */

	public client: SuiClient;
	public account?: Account;
	public multisig?: Multisig;
	public proposalService?: ProposalService;

	private constructor(
		public network: "mainnet" | "testnet" | "devnet" | "localnet" | string,
		public packageId: string,
		public userAddr: string,
	) {
		const url = (network == "mainnet" || network == "testnet" || network == "devnet" || network == "localnet") ? getFullnodeUrl(network) : network;
		this.client = new SuiClient({ url });
		this.packageId = normalizeSuiAddress(packageId);
	}
	
	static async init(
        network: "mainnet" | "testnet" | "devnet" | "localnet" | string,
        packageId: string, 
        userAddr: string, 
		multisigId?: string,
    ): Promise<KrakenClient> {
		const kraken = new KrakenClient(network, packageId, userAddr);
		kraken.account = await Account.init(network, packageId, userAddr);
		kraken.multisig = await Multisig.init(network, packageId, userAddr, multisigId);
		kraken.proposalService = new ProposalService(packageId, multisigId);
		return kraken;
	}

	async fetch(id: string = this.multisig?.id!) {
		await this.account?.fetchAccount();
		await this.multisig?.fetchMultisig(id);
		this.proposalService?.setMultisig(id);
	}

	// creates a multisig with default weights of 1 (1 member = 1 voice)
	createMultisig(
		tx: TransactionBlock, 
		name: string, 
		threshold?: number, // if none then 1, minimum members.length + 1
		members?: string[], // creator is added by default, everyone added with weight of 1
	): TransactionResult {
		if (!this.account?.id) {
			throw new Error("User doesn't have an Account or its ID is not set.");
		}
		if (!this.multisig) {
			throw new Error("Multisig not initialized.");
		}
		
		const [multisig] = this.multisig?.newMultisig(tx, this.account.id, name);
		
		// update multisig parameters if any of them are provided
		if (threshold || members) {
			const weights = members ? new Array(members.length).fill(1) : [];			
			this.proposalService!.setMultisig(multisig);
			this.proposalService!.proposeModify(tx, "init_members", 0, 0, "", name, threshold, undefined, members, weights);
			this.multisig.approveProposal(tx, "init_members", multisig);
			const [executable] = this.multisig.executeProposal(tx, "init_members", multisig);
			this.proposalService!.executeModify(tx, executable);
		}
		// creator register the multisig in his account
		this.account.joinMultisig(tx, this.account.id, multisig);
		// send invites to added members
		members?.forEach(member => { if (member !== this.userAddr) this.account?.sendInvite(tx, multisig, member) });
		// share the multisig
		return this.multisig?.shareMultisig(tx, multisig);
	}

	// creates a multisig with custom weights for each member, creator address and weight must be added
	createMultisigWithWeights(
		tx: TransactionBlock, 
		name: string, 
		threshold: number, // sum of required weights
		members: string[], // creator must be added with his weight
		weights: number[], // weight for each member
	): TransactionResult {
		if (!this.account?.id) {
			throw new Error("User doesn't have an Account or its ID is not set.");
		}
		if (!this.multisig) {
			throw new Error("Multisig not initialized.");
		}
		
		const [multisig] = this.multisig?.newMultisig(tx, this.account.id, name);
		
		let toRemove: string[] = [];
		if (members || weights) {
			if (members?.length !== weights?.length) {
				throw new Error("Members and weights must have the same length.");
			}
			// if we add members (including creator) we must remove it first
			toRemove = [this.userAddr];
		};
		// update multisig parameters if any of them are provided
		if (threshold || members) {
			this.proposalService?.proposeModify(tx, "init_members", 0, 0, "", name, threshold, toRemove, members, weights);
			this.multisig.approveProposal(tx, "init_members", multisig);
			const [executable] = this.multisig.executeProposal(tx, "init_members", multisig);
			this.proposalService?.executeModify(tx, executable);
		}
		// creator register the multisig in his account
		this.account.joinMultisig(tx, this.account.id, multisig);
		// send invites to added members
		members?.forEach(member => { if (member !== this.userAddr) this.account?.sendInvite(tx, this.multisig?.id!, member) });
		// share the multisig
		return this.multisig?.shareMultisig(tx, multisig);
	}

	// multisig must be up to date before calling this function
	// returns if proposal reaches threshold after approval with weight
	isExecutableAfterApproval(key: string, member: string = this.userAddr): boolean {
		const weight = this.multisig?.getMemberWeight(member);
		const proposal = this.multisig?.proposals?.find(p => p.key == key);
		let approvalWeight = proposal?.approvalWeight || 0;
		return (approvalWeight + weight! >= this.multisig?.threshold!);
	}

	approveAndMaybeExecute(tx: TransactionBlock, key: string, executeFunction: any, ...args: any) {
		const approvalResult = this.multisig?.approveProposal(tx, key, tx.object(this.multisig?.id!));
		if (this.isExecutableAfterApproval(key)) {
			const [executable] = this.multisig?.executeProposal(tx, key, tx.object(this.multisig?.id!));
			return executeFunction(tx, executable);
		} else {
			return approvalResult;
		}
	}

	// must be executable including caller approval
	maybeApproveAndExecute(tx: TransactionBlock, key: string, executeFunction: any, ...args: any) {
		if (!this.multisig?.hasApproved(key, this.userAddr)) {
			this.multisig?.approveProposal(tx, key, this.multisig?.id!);
		}
		const [executable] = this.multisig?.executeProposal(tx, key, this.multisig?.id!);
		return executeFunction(tx, executable);
	}

	// ===== PROPOSALS =====

	proposeModify(
        tx: TransactionBlock,
        key: string, 
        executionTime: number,
        expirationEpoch: number,
        description: string,
        name?: string,
        threshold?: number,
        toRemove?: string[],
        toAdd?: string[],
        weights?: number[], // if no weights are provided, all members are added with weight of 1
	): TransactionResult {
		if (toAdd && !weights) { weights = new Array(toAdd.length).fill(1) }
		this.proposalService?.proposeModify(tx, key, executionTime, expirationEpoch, description, name, threshold, toRemove, toAdd, weights);
		// TODO FIX: return this.approveAndMaybeExecute(tx, key, this.proposalService?.executeModify);
		this.multisig?.approveProposal(tx, key, tx.object(this.multisig?.id!));
		const [executable] = this.multisig?.executeProposal(tx, key, tx.object(this.multisig?.id!));
		return this.proposalService!.executeModify(tx, executable);
	}

	executeModify(tx: TransactionBlock, key: string): TransactionResult {
		return this.maybeApproveAndExecute(tx, key, this.proposalService?.executeModify);
	}

	

	// === Kiosk ===

	// initKioskClient(): KioskClient {
	// 	let network: Network;
	// 	if (this.network == "mainnet") {
	// 		network = Network.MAINNET;
	// 	} else if (this.network == "testnet") {
	// 		network = Network.TESTNET;
	// 	} else {
	// 		network = Network.CUSTOM;
	// 	}

	// 	return new KioskClient({
	// 		client: this.client,
	// 		network,
	// 	});
	// }

	// async getKiosks(): Promise<Kiosk[]> {
	// 	const kioskClient = this.initKioskClient();
	// 	const { kioskOwnerCaps } = await kioskClient.getOwnedKiosks({address: this.multisigId});
		
	// 	let kiosks: Kiosk[] = [];

	// 	for (let i = 0; i < kioskOwnerCaps.length; i += 25) {
	// 		const ids = kioskOwnerCaps.map(cap => cap.kioskId).slice(i, i + 25);
	// 		const kioskObjects = await this.client.multiGetObjects({
	// 			ids,
	// 			options: { showContent: true }
	// 		});
			
	// 		kiosks = kiosks.concat(await Promise.all(kioskObjects.map(async (obj: any, index) => {
	// 			const kioskDecoded = await defaultMoveCoder().decodedType(obj.data?.content, kiosk.Kiosk.type());
	// 			return {
	// 				cap: kioskOwnerCaps[i + index].objectId,
	// 				kiosk: kioskOwnerCaps[i + index].kioskId,
	// 				profits: kioskDecoded!.profits,
	// 				itemCount: kioskDecoded!.item_count,
	// 			}
	// 		})));
	// 	}

	// 	return kiosks;
	// }
	
	// async getPolicy(nftType: string): Promise<TransferPolicy> {
	// 	const kioskClient = this.initKioskClient();
	// 	const policies = await kioskClient.getTransferPolicies({type: nftType});

	// 	return {
	// 		id: policies[0].id,
	// 		hasFloorPrice: policies[0].rules.find(rule => rule.includes("floor_price_rule")) ? true : false,
	// 		hasRoyalty: policies[0].rules.find(rule => rule.includes("royalty_rule")) ? true : false,
	// 		isLocked: policies[0].rules.find(rule => rule.includes("kiosk_lock_rule")) ? true : false,
	// 	};
	// }

	// // return the Kiosk (must be shared)
	// createKiosk(tx: TransactionBlock): TransactionResult {
	// 	return tx.moveCall({
	// 		target: `${this.packageId}::kiosk::new`,
	// 		arguments: [tx.object(this.multisigId)],
	// 	});
	// }	

	// // 1. create a Kiosk if the Multisig doesn't have one OR
	// // 1(bis) get the Kiosk if it already exists
	// // 2. get the TransferPolicy for the type
	// // 3. transferFrom for each nft of this type
	// // 4. repeat for each type
	// // (5. share the Kiosk if it has been created in this PTB)
	// // not a proposal
	// transferFrom(
	// 	tx: TransactionBlock, 
	// 	policy: TransferPolicy,
	// 	multisigKiosk: string,
	// 	multisigCap: string,
	// 	senderKiosk: string,
	// 	senderCap: string,
	// 	nftId: string,
	// 	nftType: string,
	// ): TransactionResult {
	// 	const [request] = tx.moveCall({
	// 		target: `${this.packageId}::kiosk::transfer_from`,
	// 		arguments: [
	// 			tx.object(this.multisigId), 
	// 			tx.object(multisigKiosk),
	// 			tx.object(multisigCap),
	// 			tx.object(senderKiosk),
	// 			tx.object(senderCap),
	// 			tx.pure(nftId),
	// 		],
	// 		typeArguments: [nftType]
	// 	});
	// 	// fill the request
	// 	const tpId = this.resolveRules(tx, policy, multisigKiosk, request, nftType);
	// 	// destroy the request
	// 	tx.moveCall({
	// 		target: `${FRAMEWORK}::transfer_policy::confirm_request`,
	// 		arguments: [
	// 			tx.object(tpId), 
	// 			request, 
	// 		],
	// 	});
	// }

	// proposeTransferTo(
	// 	tx: TransactionBlock,
	// 	key: string,
	// 	executionTime: number,
	// 	expirationEpoch: number,
	// 	description: string,
	// 	capId: string,
	// 	nfts: string,
	// 	recipient: string,
	// ) {
	// 	tx.moveCall({
	// 		target: `${this.packageId}::kiosk::propose_transfer_to`,
	// 		arguments: [
	// 			tx.object(this.multisigId), 
	// 			tx.pure(key), 
	// 			tx.pure(executionTime),
	// 			tx.pure(expirationEpoch),
	// 			tx.pure(description),
	// 			tx.pure(capId),
	// 			tx.pure(nfts),
	// 			tx.pure(recipient),
	// 		],
	// 	});
	// 	this.approveProposal(tx, key);
	// }

	// async executeTransferTo(tx: TransactionBlock, key: string, capId: string) {
	// 	const ids = this.multisigData?.proposals.filter(p => p.key == key).map(p => p.action.fields.nfts);
	// 	if (!ids) throw new Error("Proposal is not valid");
	// 	const nfts = await this.client.multiGetObjects({
	// 		ids,
	// 		options: { showContent: true }
	// 	});
	// 	// TODO: get their type
	// 	const [action] = this.executeProposal(tx, key);
	// 	const [cap] = tx.moveCall({
	// 		target: `${this.packageId}::kiosk::borrow_cap_transfer`,
	// 		arguments: [action, tx.object(this.multisigId), tx.object(capId)],
	// 	});
	// 	// TODO: complete the function
	// }

	// private resolveRules(
	// 	tx: TransactionBlock, 
	// 	policy: TransferPolicy,
	// 	kiosk: string, 
	// 	transferRequest: any, 
	// 	nftType: string
	// ) {
	// 	if (policy.hasFloorPrice) {
	// 		tx.moveCall({
	// 			target: `${this.packageId}::floor_price_rule::prove`,
	// 			typeArguments: [nftType],
	// 			arguments: [tx.object(policy.id), transferRequest],
	// 		});
	// 	}
	// 	if (policy.hasRoyalty) {
	// 		const fee = tx.splitCoins(tx.gas, [0]);
	// 		tx.moveCall({
	// 			target: `${this.packageId}::royalty_rule::pay`,
	// 			typeArguments: [nftType],
	// 			arguments: [tx.object(policy.id), transferRequest, fee],
	// 		});
	// 	} 
	// 	if (policy.isLocked) {
	// 		tx.moveCall({
	// 			target: `${this.packageId}::kiosk_lock_rule::prove`,
	// 			typeArguments: [nftType],
	// 			arguments: [transferRequest, tx.object(kiosk)],
	// 		});
	// 	}
	// }
}

