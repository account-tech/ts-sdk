import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient, SuiObjectResponse } from "@mysten/sui/client";
import { Account as AccountRaw } from "../.gen/kraken-multisig/account/structs";
import { Multisig as MultisigRaw } from "../.gen/kraken-multisig/multisig/structs";
import { new_, transfer, destroy, joinMultisig, leaveMultisig, sendInvite, acceptInvite, refuseInvite } from "../.gen/kraken-multisig/account/functions";
import { ACCOUNT_REGISTRY, KRAKEN_MULTISIG } from "../types/constants";
import { TransactionPureInput } from "src/types/helperTypes";

export interface AccountData {
    id: string;
    username: string;
    profilePicture: string;
    multisigs: {id: string, name: string}[];
}

export class Account implements AccountData {
    public id: string = ""	;
	public username: string = "";
	public profilePicture: string = "";
    public multisigs: {id: string, name: string}[] = [];

	constructor(
		public client: SuiClient,
		public userAddr: string,
	) {}

	static async init(
        client: SuiClient,
        userAddr: string, 
    ): Promise<Account> {
		const account = new Account(client, userAddr);
		account.setAccount(await account.fetchAccount());
		return account;
	}

	async fetchAccountRaw(owner: string = this.userAddr): Promise<AccountRaw | null> {
		const { data } = await this.client.getOwnedObjects({
			owner,
			filter: { StructType: `${KRAKEN_MULTISIG}::account::Account` },
			options: { showContent: true }
		});
		return data.length !== 0 ? AccountRaw.fromSuiParsedData(data[0].data?.content!) : null;
	}
	
	async fetchAccount(owner: string = this.userAddr): Promise<AccountData> {
		const accountRaw = await this.fetchAccountRaw(owner);

		if (accountRaw) {
			// get multisigs name
			const multisigsObjs = await this.client.multiGetObjects({
				ids: accountRaw.multisigIds.contents,
				options: { showContent: true }
			});
			const multisigs = await Promise.all(multisigsObjs.map(async (ms: SuiObjectResponse) => {
				const multisigsRaw = MultisigRaw.fromSuiParsedData(ms.data?.content!)
				return {
					id: multisigsRaw.id,
					name: multisigsRaw.name
				}
			}));

			return {
				id: accountRaw.id,
				username: accountRaw.username,
				profilePicture: accountRaw.profilePicture,
				multisigs
			}
		} else {
			return {
				id: "",
				username: "",
				profilePicture: "",
				multisigs: []
			}
		}
	}

	setAccount(account: AccountData) {
		this.id = account.id;
		this.username = account.username;
		this.profilePicture = account.profilePicture;
		this.multisigs = account.multisigs;
	}

	getAccount(): AccountData {
		return {
			id: this.id,
			username: this.username,
			profilePicture: this.profilePicture,
			multisigs: this.multisigs
		}
	}

	// returns an account object that can be used in the ptb before being transferred
	createAccount(tx: Transaction, username: string, profilePicture: string): TransactionResult {
		return new_(tx, { username, profilePicture });
	}

	transferAccount(tx: Transaction, account: TransactionObjectInput, recipient: string): TransactionResult {
		return transfer(tx, { registry: ACCOUNT_REGISTRY, account, recipient });
	}

	deleteAccount(tx: Transaction, account: string): TransactionResult {
		return destroy(tx, account);
	}

	joinMultisig(tx: Transaction, account: TransactionPureInput, multisig: TransactionObjectInput): TransactionResult {
		return joinMultisig(tx, { account, multisig });
	}

	leaveMultisig(tx: Transaction, account: string, multisig: string): TransactionResult {
		return leaveMultisig(tx, { account, multisig });
	}

	sendInvite(tx: Transaction, multisig: TransactionObjectInput, recipient: string): TransactionResult {
		return sendInvite(tx, { multisig, recipient });
	}

	acceptInvite(tx: Transaction, account: string, multisig: string, invite: string): TransactionResult {
		return acceptInvite(tx, { account, multisig, invite });
	}

	refuseInvite(tx: Transaction, invite: string): TransactionResult {
		return refuseInvite(tx, invite);
	}
}

