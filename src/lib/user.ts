import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient, SuiObjectResponse } from "@mysten/sui/client";
import { SuinsClient } from '@mysten/suins-toolkit';
import { User as UserRaw } from "../.gen/account-config/user/structs";
import { sendInvite, acceptInvite, refuseInvite } from "../.gen/account-config/multisig/functions";
import { new_, transfer, destroy } from "../.gen/account-config/user/functions";
import { USER_REGISTRY, ACCOUNT_CONFIG, contractObjects } from "../types/constants";
// import { TransactionPureInput } from "src/types/helper-types";
import { AccountType } from "src/types/account-types";

export interface UserData {
    id: string;
    username: string;
    avatar: string;
    accounts: {id: string, name: string}[];
}

export class User implements UserData {
    id: string = ""	;
	username: string = ""; 
	avatar: string = ""; // TODO: add default
    accounts: {id: string, name: string}[] = [];
	
	constructor(
		public client: SuiClient,
		public address: string,
		public accountType: AccountType
	) {}

	static async init(
        client: SuiClient,
        address: string, 
        accountType: AccountType
    ): Promise<User> {
		const user = new User(client, address, accountType);
		user.setUser(await user.fetchUser());
		return user;
	}
	
	async fetchUser(owner: string = this.address): Promise<UserData> {
		const { data } = await this.client.getOwnedObjects({
			owner,
			filter: { StructType: `${ACCOUNT_CONFIG.V1}::user::User` },
			options: { showContent: true }
		});
		const userRaw = data.length !== 0 ? UserRaw.fromSuiParsedData(data[0].data?.content!) : null;
		
		if (userRaw) {
			// get accounts objects depending on the account type
			let accounts: {id: string, name: string}[] = [];
			if (userRaw.accounts.contents.length > 0) {
				const accountsObjs = await this.client.multiGetObjects({
					ids: userRaw.accounts.contents.find((entry) => entry.key === this.accountType)?.value!,
					options: { showContent: true }
				});
				// get accounts name
				accounts = await Promise.all(accountsObjs.map(async (acc: SuiObjectResponse) => {
					const content = acc.data?.content! as any;
					return {
						id: content.fields.id.id,
						name: content.fields.metadata.fields.inner.fields.contents.find((entry: any) => entry.fields.key === "name")?.fields.value!
					}
				}));
			}
			// get user name and avatar
			const suinsClient = new SuinsClient(this.client, { networkType: 'testnet', contractObjects });
			const name = await suinsClient.getName(this.address);
			
			let username = this.address.slice(0,5) + "..." + this.address.slice(-3);
			let avatar = "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-1024.png";
			
			if (name) {
				username = name;
				const nameObject = await suinsClient.getNameObject(name, { showOwner: true });
				if (nameObject?.avatar) {
					avatar = nameObject.avatar;
				}
			}
			
			return {
				id: userRaw.id,
				username,
				avatar,
				accounts
			}
		} else {
			return {
				id: "",
				username: "",
				avatar: "",
				accounts: []
			}
		}
	}

	setUser(account: UserData) {
		this.id = account.id;
		this.username = account.username;
		this.avatar = account.avatar;
		this.accounts = account.accounts;
	}

	getUser(): UserData {
		return {
			id: this.id,
			username: this.username,
			avatar: this.avatar,
			accounts: this.accounts
		}
	}

	// returns an account object that can be used in the ptb before being transferred
	createUser(tx: Transaction): TransactionResult {
		// TODO: if no suins, create a sub domain
		return new_(tx);
	}

	transferUser(tx: Transaction, user: TransactionObjectInput, recipient: string): TransactionResult {
		return transfer(tx, { registry: USER_REGISTRY, user, recipient });
	}

	deleteUser(tx: Transaction, user: TransactionObjectInput): TransactionResult {
		return destroy(tx, { registry: USER_REGISTRY, user });
	}

	sendInvite(tx: Transaction, account: TransactionObjectInput, recipient: string): TransactionResult {
		return sendInvite(tx, { account, recipient });
	}

	acceptInvite(tx: Transaction, user: TransactionObjectInput, invite: TransactionObjectInput): TransactionResult {
		return acceptInvite(tx, { user, invite });
	}

	refuseInvite(tx: Transaction, invite: TransactionObjectInput): TransactionResult {
		return refuseInvite(tx, invite);
	}
}

