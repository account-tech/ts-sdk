import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient, SuiMoveObject, SuiObjectResponse } from "@mysten/sui/client";
import { SuinsClient } from '@mysten/suins-toolkit';
import { User as UserRaw, Invite as InviteRaw } from "../../.gen/account-protocol/user/structs";
import { acceptInvite, refuseInvite, reorderAccounts } from "../../.gen/account-protocol/user/functions";
import { new_, transfer, destroy } from "../../.gen/account-protocol/user/functions";
import { USER_REGISTRY, ACCOUNT_PROTOCOL, contractObjects } from "../../types/constants";
import { UserData, AccountsByType, AccountPreview, Invite, InvitesByType, Profile } from "./types";
import { AccountType, AccountTypes } from "../account/types";

export class User implements UserData {
	id: string = "";
	profile: Profile = { username: "", avatar: "" };
	accounts: AccountsByType = {};
	invites: InvitesByType = {};

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

		// Fetch user object
		const { data: userData } = await this.client.getOwnedObjects({
			owner,
			filter: { StructType: `${ACCOUNT_PROTOCOL.V1}::user::User` },
			options: { showContent: true }
		});
		const userRaw = userData.length !== 0 ? UserRaw.fromSuiParsedData(userData[0].data?.content!) : null;

		const profile = await this.fetchProfile(owner);

		const allIds = userRaw?.accounts.contents.flatMap((entry) => entry.value);
		const accounts = await this.fetchAccounts(allIds);
		const invites = await this.fetchInvites(owner);

		return {
			id: userRaw?.id ?? "",
			profile,
			accounts,
			invites,
		}
	}

	async fetchProfile(owner: string): Promise<Profile> {
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

		return { username, avatar };
	}

	async fetchAccounts(allIds: string[] | undefined): Promise<AccountsByType> {
		const accountsByType: AccountsByType = {};

		if (!allIds || allIds.length === 0) return accountsByType;

		// Fetch all account objects in one batch
		// Process in batches of 50 due to API limitations
		const accountsObjs = [];
		for (let i = 0; i < allIds.length; i += 50) {
			const batch = allIds.slice(i, i + 50);
			const batchResults = await this.client.multiGetObjects({
				ids: batch,
				options: { showContent: true }
			});
			accountsObjs.push(...batchResults);
		}

		// Process each account object
		accountsObjs.forEach((acc: SuiObjectResponse) => {
			if (!acc.data?.content) return;
			const moveObj = acc.data.content as SuiMoveObject;

			// Get account type from the object type
			Object.values(AccountTypes).forEach(accountType => {
				if (moveObj.type.includes(accountType)) {
					if (!accountsByType[accountType]) {
						accountsByType[accountType] = [];
					}

					const name = (moveObj.fields as any).metadata.fields.inner.fields.contents
						.find((entry: any) => entry.fields.key === "name")?.fields.value;

					if (name) {
						accountsByType[accountType].push({
							id: (moveObj.fields as any).id.id,
							name: name
						});
					}
				}
			});
		});

		// Sort each type's accounts by name
		Object.values(accountsByType).forEach(accounts => {
			accounts.sort((a, b) => a.name.localeCompare(b.name));
		});

		return accountsByType;
	}

	async fetchInvites(owner: string = this.address!): Promise<InvitesByType> {
		// Fetch invite objects
		const { data: inviteData } = await this.client.getOwnedObjects({
			owner,
			filter: { StructType: `${ACCOUNT_PROTOCOL.V1}::user::Invite` },
			options: { showContent: true }
		});
		const invites = inviteData.map(invite => InviteRaw.fromSuiParsedData(invite.data?.content!));

		if (invites.length === 0) return {};

		// Get all account addresses from invites
		const accountAddrs = invites.map(invite => invite.accountAddr);

		// Fetch all account objects in one batch
		// Process in batches of 50 due to API limitations
		const accountObjs = [];
		for (let i = 0; i < accountAddrs.length; i += 50) {
			const batch = accountAddrs.slice(i, i + 50);
			const batchResults = await this.client.multiGetObjects({
				ids: batch,
				options: { showContent: true }
			});
			accountObjs.push(...batchResults);
		}

		// Create a map of account address to name
		const accountNames = new Map<string, string>();
		accountObjs.forEach((acc: SuiObjectResponse) => {
			if (!acc.data?.content) return;
			const moveObj = acc.data.content as SuiMoveObject;
			const name = (moveObj.fields as any).metadata.fields.inner.fields.contents
				.find((entry: any) => entry.fields.key === "name")?.fields.value;
			if (name) {
				accountNames.set(acc.data.objectId, name);
			}
		});

		// Group invites by account type
		const invitesByType: InvitesByType = {};
		invites.forEach(invite => {
			const type = "0x" + invite.accountType.toString();
			if (!invitesByType[type]) {
				invitesByType[type] = [];
			}
			invitesByType[type].push({
				id: invite.id,
				accountAddr: invite.accountAddr,
				accountName: accountNames.get(invite.accountAddr) ?? invite.accountAddr
			});
		});

		// Sort each group by name
		Object.values(invitesByType).forEach(invites => {
			invites.sort((a, b) => a.accountName.localeCompare(b.accountName));
		});

		return invitesByType;
	}

	async refresh(address: string = this.address!) {
		this.setData(await this.fetch(address));
	}

	setData(account: UserData) {
		this.id = account.id;
		this.profile = account.profile;
		this.accounts = account.accounts;
		this.invites = account.invites;
	}

	getData(): UserData {
		return {
			id: this.id,
			profile: this.profile,
			accounts: this.accounts,
			invites: this.invites
		}
	}

	getAccounts(type: AccountType): AccountPreview[] {
		return this.accounts[type] ?? [];
	}

	getInvites(type: string): Invite[] {
		return this.invites[type] ?? [];
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

	reorderAccounts(tx: Transaction, user: TransactionObjectInput, accountType: string, accountAddrs: string[]) {
		return reorderAccounts(tx, accountType, { user, addrs: accountAddrs });
	}
}

