import { SuiClient } from "@mysten/sui/client";
import { Intent } from "../intents/intent";
import { IntentFields } from "src/types/intent-types";
import { Outcome } from "../outcomes/variants/outcome";
import { Managed } from "../objects/managed";

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
}
