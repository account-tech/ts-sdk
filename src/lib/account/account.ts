import { SuiClient } from "@mysten/sui/client";
import { Intent } from "../intents/intent";
import { IntentFields, IntentTypes } from "src/types/intent-types";
import { Outcome } from "../outcomes/variants/outcome";
import { Managed } from "../objects/managed";
import { BorrowCapIntent } from "../intents/account-actions/access-control";
import { ConfigDepsIntent } from "../intents/account-actions/config";
import { DisableRulesIntent, UpdateMetadataIntent, MintAndTransferIntent, MintAndVestIntent, WithdrawAndBurnIntent } from "../intents/account-actions/currency";
import { TakeNftsIntent, ListNftsIntent } from "../intents/account-actions/kiosk";
import { ConfigMultisigIntent } from "../intents/account-actions/multisig";
import { WithdrawAndTransferToVaultIntent, WithdrawAndTransferIntent, WithdrawAndVestIntent } from "../intents/account-actions/owned";
import { UpgradePackageIntent, RestrictPolicyIntent } from "../intents/account-actions/package-upgrade";
import { SpendAndTransferIntent, SpendAndVestIntent } from "../intents/account-actions/vault";

export type AccountData = {
	id: string;
	metadata: { key: string, value: string }[];
	deps: Dep[];
	managedAssets: Managed;
}

export type Dep = {
	name: string,
	addr: string,
	version: number,
}

export interface Account extends AccountData {
	// Account Data
	id: string;
	metadata: { key: string, value: string }[];
	deps: Dep[];
	intents: Intent[]; // different for each account type
	managedAssets: Managed;

	init(client: SuiClient, userAddr: string, accountId?: string): Promise<Account>;
	// Factory function to create the appropriate proposal type
	fetchIntentWithActions(client: SuiClient, outcome: Outcome, fields: IntentFields): Promise<Intent>;
}

export class Account implements Account {
	constructor(
		public client: SuiClient,
	) { }

	getName(): string {
		return this.metadata.find(m => m.key == "name")?.value!;
	}

	// Factory function to create the appropriate intent type
	async fetchIntentWithActions(
		client: SuiClient,
		outcome: Outcome,
		fields: IntentFields
	): Promise<Intent> {
		switch (fields.issuer.intentType) {
			case IntentTypes.ConfigDeps:
				return await ConfigDepsIntent.init(client, this.id, outcome, fields);
			case IntentTypes.ConfigMultisig:
				return await ConfigMultisigIntent.init(client, this.id, outcome, fields);
			case IntentTypes.BorrowCap:
				return await BorrowCapIntent.init(client, this.id, outcome, fields);
			case IntentTypes.DisableRules:
				return await DisableRulesIntent.init(client, this.id, outcome, fields);
			case IntentTypes.UpdateMetadata:
				return await UpdateMetadataIntent.init(client, this.id, outcome, fields);
			case IntentTypes.MintAndTransfer:
				return await MintAndTransferIntent.init(client, this.id, outcome, fields);
			case IntentTypes.MintAndVest:
				return await MintAndVestIntent.init(client, this.id, outcome, fields);
			case IntentTypes.WithdrawAndBurn:
				return await WithdrawAndBurnIntent.init(client, this.id, outcome, fields);
			case IntentTypes.TakeNfts:
				return await TakeNftsIntent.init(client, this.id, outcome, fields);
			case IntentTypes.ListNfts:
				return await ListNftsIntent.init(client, this.id, outcome, fields);
			case IntentTypes.WithdrawAndTransferToVault:
				return await WithdrawAndTransferToVaultIntent.init(client, this.id, outcome, fields);
			case IntentTypes.WithdrawAndTransfer:
				return await WithdrawAndTransferIntent.init(client, this.id, outcome, fields);
			case IntentTypes.WithdrawAndVest:
				return await WithdrawAndVestIntent.init(client, this.id, outcome, fields);
			case IntentTypes.UpgradePackage:
				return await UpgradePackageIntent.init(client, this.id, outcome, fields);
			case IntentTypes.RestrictPolicy:
				return await RestrictPolicyIntent.init(client, this.id, outcome, fields);
			case IntentTypes.SpendAndTransfer:
				return await SpendAndTransferIntent.init(client, this.id, outcome, fields);
			case IntentTypes.SpendAndVest:
				return await SpendAndVestIntent.init(client, this.id, outcome, fields);
			default:
				throw new Error(`Intent type ${fields.issuer.intentType} not supported.`);
		}
	}
}
