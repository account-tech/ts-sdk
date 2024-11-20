import { SuiClient } from "@mysten/sui/client";
import { Proposal } from "../proposal/proposal";
import { Dep } from "../../types/account-types";
import { ProposalFields } from "src/types/proposal-types";
import { Outcome } from "../proposal/outcome";

export interface Account {
	userAddr: string;
	// Account Data
	generics: [string, string];
    id: string;
    name: string;
    deps: Dep[];
    proposals: Proposal[];

	init(client: SuiClient, userAddr: string, accountId?: string): Promise<Account>; 
	// Factory function to create the appropriate proposal type
	initProposalWithActions(client: SuiClient, outcome: Outcome, fields: ProposalFields): Promise<Proposal>;
}

export class Account implements Account {
	constructor(public client: SuiClient) {}
}