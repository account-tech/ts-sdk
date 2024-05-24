import { PACKAGE, CLOCK } from "./constants";
import { SuiClient, SuiParsedData, getFullnodeUrl } from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { normalizeSuiAddress } from "@mysten/sui.js/utils";
import { Account } from "./types";

export class KrakenClient {
	/**
	 * @description SDK to interact with Kraken package.
	 * @param client connection to fullnode
	 */

	private client: SuiClient;

	constructor(
		public network: string = 'mainnet',
		public user: string = normalizeSuiAddress("0x0"),
		public multisig: string = normalizeSuiAddress("0x0"),
	) {
		let url = "";
		if (network == 'mainnet'
			|| network == 'testnet'
			|| network == 'devnet'
			|| network == 'localnet') {
			url = getFullnodeUrl(network);
		}
		else {
			url = network as string;
		}

		this.client = new SuiClient({ url });
	}

	setMultisig(multisig: string) {
		this.multisig = multisig;
	}

	// === Multisig ===

	createMultisig(members: string[]): TransactionBlock {
		const tx = new TransactionBlock();

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

		tx.moveCall({
			target: `${PACKAGE}::multisig::share`,
			arguments: [multisig],
		});

		return tx;
	}

	// === Account ===

	createAccount(username: string, profilePicture: string): TransactionBlock {
		const tx = new TransactionBlock();

		tx.moveCall({
			target: `${PACKAGE}::account::new`,
			arguments: [tx.pure(username), tx.pure(profilePicture)],
		});

		return tx;
	}

	deleteAccount(account: string): TransactionBlock {
		const tx = new TransactionBlock();

		tx.moveCall({
			target: `${PACKAGE}::account::destroy`,
			arguments: [tx.object(account)],
		});

		return tx;
	}

	joinMultisig(account: string, multisig: string): TransactionBlock {
		const tx = new TransactionBlock();

		tx.moveCall({
			target: `${PACKAGE}::account::join_multisig`,
			arguments: [tx.object(account), tx.pure(multisig)],
		});

		return tx;
	}

	leaveMultisig(account: string, multisig: string): TransactionBlock {
		const tx = new TransactionBlock();

		tx.moveCall({
			target: `${PACKAGE}::account::leave_multisig`,
			arguments: [tx.object(account), tx.pure(multisig)],
		});

		return tx;
	}

	// member only
	sendInvite(recipient: string): TransactionBlock {
		const tx = new TransactionBlock();

		tx.moveCall({
			target: `${PACKAGE}::account::send_invite`,
			arguments: [tx.object(this.multisig), tx.pure(recipient)],
		});

		return tx;
	}

	// member only
	acceptInvite(account: string, invite: string): TransactionBlock {
		const tx = new TransactionBlock();

		tx.moveCall({
			target: `${PACKAGE}::account::accept_invite`,
			arguments: [tx.object(account), tx.object(invite)],
		});

		return tx;
	}

	// member only
	refuseInvite(account: string, invite: string): TransactionBlock {
		const tx = new TransactionBlock();

		tx.moveCall({
			target: `${PACKAGE}::account::refuse_invite`,
			arguments: [tx.object(account), tx.object(invite)],
		});

		return tx;
	}

	// TODO: implement merge accounts
	async getAccount(account: string = this.user): Promise<Account> {
		const { data: accounts } = await this.client.getOwnedObjects({
			owner: account,
			filter: {
				StructType: `${PACKAGE}::account::Account`
			},
			options: {
				showContent: true
			}
		});

		const content = accounts[0].data?.content as any;

		return {
			id: content.id.id,
			username: content.username,
			profilePicture: content.profile_picture,
			multisigs: content.multisigs.fields.contents,
		}
	}

	// === Coin operations (member only) ===

	mergeCoins(to_keep: string, to_merge: string[], coinType: string): TransactionBlock {
		const tx = new TransactionBlock();

		tx.moveCall({
			target: `${PACKAGE}::coin_operations::merge`,
			arguments: [
				tx.object(this.multisig), 
				tx.pure(to_keep),
				tx.pure(to_merge),
			],
			typeArguments: [coinType]
		});
		
		return tx;
	}
	
	splitCoins(to_keep: string, to_split: string[], coinType: string): TransactionBlock {
		const tx = new TransactionBlock();
		
		tx.moveCall({
			target: `${PACKAGE}::coin_operations::split`,
			arguments: [
				tx.object(this.multisig), 
				tx.pure(to_keep),
				tx.pure(to_split),
			],
			typeArguments: [coinType]
		});

		return tx;
	}

	
}

