import { PACKAGE, CLOCK, FRAMEWORK } from "./constants";
import { Account, Kiosk, Multisig, Proposal, TransferPolicy } from "./types";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { TransactionBlock, TransactionResult } from "@mysten/sui.js/transactions";
import { KioskClient, Network } from "@mysten/kiosk";

export class KrakenClient {
	/**
	 * @description SDK to interact with Kraken package.
	 * @param client connection to fullnode
	 */

	private client: SuiClient;
	private multisigData: Multisig | null;

	constructor(
		public network: "mainnet" | "testnet" | "devnet" | "localnet",
		public url: string,
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

		const members = content.fields.members.fields.contents.map(async (member: any) => {
			return await this.getAccount(member);
		});

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

	createMultisig(tx: TransactionBlock, members: string[], accountId: string): TransactionResult {
		
		
		const [multisig] = tx.moveCall({
			target: `${PACKAGE}::multisig::new`,
			arguments: [tx.pure("test")],
		});

		if (members) {
			tx.moveCall({
				target: `${PACKAGE}::config::propose_modify`,
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
				target: `${PACKAGE}::multisig::approve_proposal`,
				arguments: [
					multisig, 
					tx.pure("init_members"), 
				],
			});
			
			tx.moveCall({
				target: `${PACKAGE}::config::execute_modify`,
				arguments: [
					multisig, 
					tx.pure("init_members"), 
					tx.object(CLOCK),
				],
			});
			
			members.forEach((member) => {
				tx.moveCall({
					target: `${PACKAGE}::account::send_invite`,
					arguments: [multisig, tx.pure(member)],
				});
			});
		}

		return tx.moveCall({
			target: `${FRAMEWORK}::transfer::share_object`,
			arguments: [multisig],
		});
	}

	cleanProposals(tx: TransactionBlock): TransactionResult {
		return tx.moveCall({
			target: `${PACKAGE}::multisig::clean_proposals`,
			arguments: [tx.object(this.multisigId)],
		});
	}

	approveProposal(tx: TransactionBlock, key: string): TransactionResult {
		return tx.moveCall({
			target: `${PACKAGE}::multisig::approve_proposal`,
			arguments: [tx.object(this.multisigId), tx.pure(key)],
		});
	}

	removeApproval(tx: TransactionBlock, key: string): TransactionResult {
		return tx.moveCall({
			target: `${PACKAGE}::multisig::remove_approval`,
			arguments: [tx.object(this.multisigId), tx.pure(key)],
		});
	}

	executeProposal(tx: TransactionBlock, key: string): TransactionResult {
		return tx.moveCall({
			target: `${PACKAGE}::multisig::execute_proposal`,
			arguments: [tx.object(this.multisigId), tx.pure(key), tx.object(CLOCK)],
		});
	}

	// === Account ===

	// TODO: implement merge accounts
	async getAccount(owner: string = this.user): Promise<Account> {
		const { data: accounts } = await this.client.getOwnedObjects({
			owner,
			filter: {
				StructType: `${PACKAGE}::account::Account`
			},
			options: {
				showContent: true
			}
		});

		const content = accounts[0].data?.content as any;

		return {
			owner,
			id: content.fields.id.id,
			username: content.fields.username,
			profilePicture: content.fields.profile_picture,
			multisigs: content.fields.multisigs.fields.contents,
		}
	}

	createAccount(tx: TransactionBlock, username: string, profilePicture: string): TransactionResult {
		return tx.moveCall({
			target: `${PACKAGE}::account::new`,
			arguments: [tx.pure(username), tx.pure(profilePicture)],
		});
	}

	deleteAccount(tx: TransactionBlock, account: string): TransactionResult {
		return tx.moveCall({
			target: `${PACKAGE}::account::destroy`,
			arguments: [tx.object(account)],
		});
	}

	joinMultisig(tx: TransactionBlock, account: string, multisig: string): TransactionResult {
		return tx.moveCall({
			target: `${PACKAGE}::account::join_multisig`,
			arguments: [tx.object(account), tx.pure(multisig)],
		});
	}

	leaveMultisig(tx: TransactionBlock, account: string, multisig: string): TransactionResult {
		return tx.moveCall({
			target: `${PACKAGE}::account::leave_multisig`,
			arguments: [tx.object(account), tx.pure(multisig)],
		});
	}

	// member only
	sendInvite(tx: TransactionBlock, recipient: string): TransactionResult {
		return tx.moveCall({
			target: `${PACKAGE}::account::send_invite`,
			arguments: [tx.object(this.multisigId), tx.pure(recipient)],
		});
	}

	// member only
	acceptInvite(tx: TransactionBlock, account: string, invite: string): TransactionResult {
		return tx.moveCall({
			target: `${PACKAGE}::account::accept_invite`,
			arguments: [tx.object(account), tx.object(invite)],
		});
	}

	// member only
	refuseInvite(tx: TransactionBlock, account: string, invite: string): TransactionResult {
		return tx.moveCall({
			target: `${PACKAGE}::account::refuse_invite`,
			arguments: [tx.object(account), tx.object(invite)],
		});
	}

	// === Coin operations (member only) ===

	mergeCoins(tx: TransactionBlock, to_keep: string, to_merge: string[], coinType: string): TransactionResult {
		return tx.moveCall({
			target: `${PACKAGE}::coin_operations::merge`,
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
			target: `${PACKAGE}::coin_operations::split`,
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
		name: string,
		threshold: number,
		toAdd: string[],
		toRemove: string[],
	) {
		tx.moveCall({
			target: `${PACKAGE}::config::propose_modify`,
			arguments: [
				tx.object(this.multisigId), 
				tx.pure(key), 
				tx.pure(executionTime), 
				tx.pure(expirationEpoch), 
				tx.pure(description), 
				tx.pure(name), 
				tx.pure(threshold), 
				tx.pure(toAdd),
				tx.pure(toRemove), 
			],
		});		
		
		this.approveProposal(tx, key);
		
		if (this.multisigData?.members.length == 1) {
			tx.moveCall({
				target: `${PACKAGE}::config::execute_modify`,
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
			target: `${PACKAGE}::config::execute_modify`,
			arguments: [
				tx.object(this.multisigId), 
				tx.pure(key), 
				tx.object(CLOCK),
			],
		});
	}
}

