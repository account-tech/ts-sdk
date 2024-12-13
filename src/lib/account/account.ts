import { SuiClient } from "@mysten/sui/client";
import { Proposal } from "../proposals/proposal";
import { Dep } from "../../types/account-types";
import { ProposalFields } from "src/types/proposal-types";
import { Outcome } from "../proposals/outcome";
import { KioskClient, Network } from "@mysten/kiosk";
import { Kiosk } from "../objects/kiosk";

export interface Account {
	kioskClient: KioskClient;
	kiosks: Kiosk[];
	// Account Data
    id: string;
    metadata: { key: string, value: string }[];
    deps: Dep[];
    proposals: Proposal[];

	init(client: SuiClient, userAddr: string, accountId?: string): Promise<Account>; 
	// Factory function to create the appropriate proposal type
	initProposalWithActions(client: SuiClient, outcome: Outcome, fields: ProposalFields): Promise<Proposal>;
}

export class Account implements Account {
	constructor(
		public client: SuiClient,
	) {
		this.kioskClient = new KioskClient({ client, network: Network.TESTNET });
	}

	async fetchKiosks() {
		const { kioskOwnerCaps, kioskIds } = await this.kioskClient.getOwnedKiosks({ address: this.id });
		this.kiosks = await Promise.all(kioskIds.map(async (kioskId) => {
			return await Kiosk.init(this.kioskClient, kioskId);
		}));
	}

	getName(): string {
		return this.metadata.find(m => m.key == "name")?.value!;
	}
}
