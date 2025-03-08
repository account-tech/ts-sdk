import { SuiClient } from "@mysten/sui/client";
import {
	Intent, IntentFields, IntentTypes,
	BorrowCapIntent, ConfigDepsIntent, DisableRulesIntent, UpdateMetadataIntent, MintAndTransferIntent, MintAndVestIntent, WithdrawAndBurnIntent,
	TakeNftsIntent, ListNftsIntent, WithdrawAndTransferToVaultIntent, WithdrawAndTransferIntent, WithdrawAndVestIntent,
	UpgradePackageIntent, RestrictPolicyIntent, SpendAndTransferIntent, SpendAndVestIntent, ConfigMultisigIntent,
	ToggleUnverifiedAllowedIntent
} from "../intents";
import { Outcome } from "../outcomes";
import { Managed, Owned } from "../objects";
import { AccountData, Metadata, Dep } from "./types";

export abstract class Account implements AccountData {
	public id: string = "";
	public metadata: Metadata[] = [];
	public deps: Dep[] = [];
	public intents: Intent[] = []; // different for each account type
	// managed assets and owned objects
	public managedAssets!: Managed;
	public ownedObjects!: Owned;

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
			case IntentTypes.ToggleUnverifiedAllowed:
				return await ToggleUnverifiedAllowedIntent.init(client, this.id, outcome, fields);
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
