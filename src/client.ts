import { PACKAGE, CLOCK, FRAMEWORK } from "./constants";
import { Account, Kiosk, Multisig, Proposal } from "./types";
import { SuiClient, SuiParsedData, getFullnodeUrl } from "@mysten/sui.js/client";
import { TransactionBlock, TransactionResult } from "@mysten/sui.js/transactions";
import { normalizeSuiAddress } from "@mysten/sui.js/utils";
import { KioskClient, Network } from "@mysten/kiosk";

export class KrakenClient {
	/**
	 * @description SDK to interact with Kraken package.
	 * @param client connection to fullnode
	 */

	private client: SuiClient;
	private multisigData: Multisig | null;

	constructor(
		public network: string,
		public user: string,
		public multisigId: string,
	) {
		let url = "";
		if (network == "mainnet"
			|| network == "testnet"
			|| network == "devnet"
			|| network == "localnet") {
			url = getFullnodeUrl(network);
		} else {
			url = network as string;
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
		const { data } = await this.client.getObject({
			id,
			options: {
				showContent: true
			}
		});

		const content = data?.content as any;

		const proposals = content.fields.proposals.fields.contents.map((proposal: any) => {
			return {
				key: proposal.fields.key,
				description: proposal.fields.value.fields.description,
				executionTime: proposal.fields.value.fields.execution_time,
				expirationEpoch: proposal.fields.value.fields.expiration_epoch,
				approved: proposal.fields.value.fields.approved.fields.contents,
			}
		});

		return {
			name: content.fields.name,
			threshold: content.fields.threshold,
			members: content.fields.members.fields.contents,
			proposals,
		}
	}

	createMultisig(tx: TransactionBlock, members: string[]): TransactionResult {
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
			target: `${PACKAGE}::multisig::share`,
			arguments: [multisig],
		});
	}

	cleanProposals(tx: TransactionBlock): TransactionResult {
		return tx.moveCall({
			target: `${PACKAGE}::multisig::clean_proposals`,
			arguments: [tx.object(this.multisigId)],
		});
	}

	approveProposal(tx: TransactionBlock, proposal: string): TransactionResult {
		return tx.moveCall({
			target: `${PACKAGE}::multisig::approve_proposal`,
			arguments: [tx.object(this.multisigId), tx.pure(proposal)],
		});
	}

	removeApproval(tx: TransactionBlock, proposal: string): TransactionResult {
		return tx.moveCall({
			target: `${PACKAGE}::multisig::remove_approval`,
			arguments: [tx.object(this.multisigId), tx.pure(proposal)],
		});
	}

	executeProposal(tx: TransactionBlock, proposal: string): TransactionResult {
		return tx.moveCall({
			target: `${PACKAGE}::multisig::execute_proposal`,
			arguments: [tx.object(this.multisigId), tx.pure(proposal), tx.object(CLOCK)],
		});
	}

	// === Account ===

	// TODO: implement merge accounts
	async getAccount(user: string = this.user): Promise<Account> {
		const { data: accounts } = await this.client.getOwnedObjects({
			owner: user,
			filter: {
				StructType: `${PACKAGE}::account::Account`
			},
			options: {
				showContent: true
			}
		});

		const content = accounts[0].data?.content as any;

		return {
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

	// submit and approve proposal, execute if only member
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
	): TransactionResult {
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

		tx.moveCall({
			target: `${PACKAGE}::multisig::approve_proposal`,
			arguments: [
				tx.object(this.multisigId), 
				tx.pure(key), 
			],
		});

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
	): TransactionResult {
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

