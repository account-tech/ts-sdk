import { SuiClient } from "@mysten/sui/client";
import { Proposal } from "../proposals/proposal";
import { ProposalFields } from "src/types/proposal-types";
import { Outcome } from "../proposals/outcome";
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
    proposals: Proposal[]; // different for each account type
	managedAssets: Managed;

	init(client: SuiClient, userAddr: string, accountId?: string): Promise<Account>; 
	// Factory function to create the appropriate proposal type
	initProposalWithActions(client: SuiClient, outcome: Outcome, fields: ProposalFields): Promise<Proposal>;
}

export class Account implements Account {
	constructor(
		public client: SuiClient,
	) {}

	getName(): string {
		return this.metadata.find(m => m.key == "name")?.value!;
	}
}
