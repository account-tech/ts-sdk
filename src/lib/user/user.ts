import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient, SuiMoveObject, SuiObjectResponse } from "@mysten/sui/client";
import { SuinsClient } from '@mysten/suins-toolkit';
import { User as UserRaw } from "../../.gen/account-protocol/user/structs";
import { acceptInvite, refuseInvite } from "../../.gen/account-protocol/user/functions";
import { new_, transfer, destroy } from "../../.gen/account-protocol/user/functions";
import { USER_REGISTRY, ACCOUNT_PROTOCOL, contractObjects } from "../../types/constants";
import { UserData, AccountPreviews } from "./types";
import { AccountTypes } from "../account/types";

export class User implements UserData {
	id: string = "";
	username: string = "";
	avatar: string = ""; // TODO: add default
	accounts: AccountPreviews = {};

	constructor(
		public client: SuiClient,
		public address?: string,
	) { }

	static async init(
		client: SuiClient,
		address?: string,
	): Promise<User> {
		const user = new User(client, address);
		if (address) await user.refresh();
		return user;
	}

	async fetch(owner: string = this.address!): Promise<UserData> {
		if (!owner && !this.address) {
			throw new Error("No address provided to refresh account");
		}

		const { data } = await this.client.getOwnedObjects({
			owner,
			filter: { StructType: `${ACCOUNT_PROTOCOL.V1}::user::User` },
			options: { showContent: true }
		});
		const userRaw = data.length !== 0 ? UserRaw.fromSuiParsedData(data[0].data?.content!) : null;

		if (userRaw) {
			// get accounts objects depending on the account type
			let accounts: AccountPreviews = {
				[AccountTypes.Multisig]: []
			};
			if (userRaw.accounts.contents.length > 0) {
				const allIds = userRaw.accounts.contents.flatMap((entry) => entry.value);

				const accountsObjs = await this.client.multiGetObjects({
					ids: allIds,
					options: { showContent: true }
				});
				// get accounts name
				accountsObjs.forEach((acc: SuiObjectResponse) => {
					if (!acc.data?.content) return;
					const moveObj = acc.data?.content as SuiMoveObject;
					
					if (moveObj.type.includes(AccountTypes.Multisig)) {
						accounts[AccountTypes.Multisig].push({
							id: (moveObj.fields as any).id.id,
							name: (moveObj.fields as any).metadata.fields.inner.fields.contents.find((entry: any) => entry.fields.key === "name")?.fields.value!
						})
					}
				});
			}
			// get user name and avatar
			const suinsClient = new SuinsClient(this.client, { networkType: 'testnet', contractObjects });
			const name = await suinsClient.getName(owner);

			let username = owner.slice(0, 5) + "..." + owner.slice(-3);
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
				accounts: {
					[AccountTypes.Multisig]: []
				}
			}
		}
	}

	async refresh(address: string = this.address!) {
		this.setData(await this.fetch(address));
	}

	setData(account: UserData) {
		this.id = account.id;
		this.username = account.username;
		this.avatar = account.avatar;
		this.accounts = account.accounts;
	}

	getData(): UserData {
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

	acceptInvite(tx: Transaction, user: TransactionObjectInput, invite: TransactionObjectInput): TransactionResult {
		return acceptInvite(tx, { user, invite });
	}

	refuseInvite(tx: Transaction, invite: TransactionObjectInput): TransactionResult {
		return refuseInvite(tx, invite);
	}
}

