import { TransactionBlock, TransactionResult } from "@mysten/sui.js/transactions";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { normalizeSuiAddress } from "@mysten/sui.js/utils";
import { Account as AccountRaw } from "../../.gen/kraken/account/structs.js";
import { Multisig as MultisigRaw } from "../../.gen/kraken/multisig/structs.js";

export class Account {
	public client: SuiClient;
    public id?: string;
	public username?: string;
	public profilePicture?: string;
    public multisigIds?: {id: string, name: string}[];

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
    ): Promise<Account> {
		const account = new Account(network, packageId, userAddr);
		const accountData = await account.getAccount(userAddr);
        if (accountData) {
			account.id = accountData.id;
			account.username = accountData.username;
            account.profilePicture = accountData.profilePicture;
            account.multisigIds = accountData.multisigIds;
        }
		return account;
	}
	
	async fetchAccount(user: string = this.userAddr) {
		const accountData = await this.getAccount(user);
		if (accountData) {
			this.id = accountData.id;
			this.username = accountData.username;
			this.profilePicture = accountData.profilePicture;
			this.multisigIds = accountData.multisigIds;
		}
	}

	// TODO: implement merge accounts

    // get and decode account data from abi
	async getAccountRaw(owner: string = this.userAddr): Promise<AccountRaw | null> {
		const { data } = await this.client.getOwnedObjects({
			owner,
			filter: { StructType: `${this.packageId}::account::Account` },
			options: { showContent: true }
		});
		
		const userAccount = data.find(acc => {
			if (acc.data?.content?.dataType === "moveObject") {
				return acc.data?.content?.type.includes(this.packageId);
			}
		});

		if (!data || !userAccount) return null;
		return AccountRaw.fromSuiParsedData(userAccount?.data?.content!);
	}

    // get and format user account data
	async getAccount(
        user: string = this.userAddr
    ): Promise<{id: string, username: string, profilePicture: string, multisigIds: {id: string, name: string}[]}> {
		const accountRaw = await this.getAccountRaw(user);
		if (!accountRaw) { 
			return {
				id: "",
				username: "",
				profilePicture: "",
				multisigIds: [],
			}
		}
		
		const multisigsObjs = await this.client.multiGetObjects({
			ids: accountRaw!.multisigIds.contents as string[],
			options: { showContent: true }
		});
		const multisigIds = await Promise.all(multisigsObjs.map(async (ms: any) => { 
			const multisigsRaw = MultisigRaw.fromSuiParsedData(ms.data?.content)
			return {
				id: multisigsRaw!.id,
				name: multisigsRaw!.name
			}
		}));
		
		return {
			id: accountRaw!.id,
			username: accountRaw!.username,
			profilePicture: accountRaw!.profilePicture,
			multisigIds,
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

	joinMultisig(tx: TransactionBlock, account: string, multisig: string | TransactionResult): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::account::join_multisig`,
			arguments: [
				tx.object(account), 
				typeof multisig === "string" ? tx.pure(multisig) : multisig
			],
		});
	}

	leaveMultisig(tx: TransactionBlock, account: string, multisig: string): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::account::leave_multisig`,
			arguments: [tx.object(account), tx.pure(multisig)],
		});
	}

	sendInvite(tx: TransactionBlock, multisig: string | TransactionResult, recipient: string): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::account::send_invite`,
			arguments: [
				typeof multisig === "string" ? tx.object(multisig) : multisig,
				tx.pure(recipient)
			],
		});
	}

	acceptInvite(tx: TransactionBlock, account: string, invite: string): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::account::accept_invite`,
			arguments: [tx.object(account), tx.object(invite)],
		});
	}

	refuseInvite(tx: TransactionBlock, account: string, invite: string): TransactionResult {
        return tx.moveCall({
			target: `${this.packageId}::account::refuse_invite`,
			arguments: [tx.object(account), tx.object(invite)],
		});
	}
}

