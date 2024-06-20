import { TransactionBlock, TransactionResult } from "@mysten/sui.js/transactions";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { normalizeSuiAddress } from "@mysten/sui.js/utils";
import { Account as AccountRaw } from "../../.gen/kraken/account/structs.js";
import { Multisig as MultisigRaw } from "../../.gen/kraken/multisig/structs.js";
import { CLOCK } from "../types/constants.js";
import { Proposal, Member } from "../types/types.js";
import { Account } from "./account.js";

export class Multisig {
	public client: SuiClient;
    public id?: string;
    public version?: number;
    public name?: string;
    public threshold?: number;
    public totalWeight?: number;
    public members?: Member[];
    public proposals?: Proposal[];

	private constructor(
		public network: "mainnet" | "testnet" | "devnet" | "localnet" | string,
        public packageId: string,
		public userAddr: string,
	) {
		console.log(network)
		const url = (network == "mainnet" || network == "testnet" || network == "devnet" || network == "localnet") ? getFullnodeUrl(network) : network;
		this.client = new SuiClient({ url });
		this.packageId = normalizeSuiAddress(packageId);
	}

	static async init(
        network: "mainnet" | "testnet" | "devnet" | "localnet" | string,
        packageId: string, 
        userAddr: string, 
        multisigId?: string,
    ): Promise<Multisig> {
		const multisig = new Multisig(network, packageId, userAddr);
        if (multisigId) {
			const multisigData = await multisig.getMultisig(multisigId);
			multisig.id = multisigId;
            multisig.version = multisigData.version;
            multisig.name = multisigData.name;
            multisig.threshold = multisigData.threshold;
            multisig.totalWeight = multisigData.totalWeight;
            multisig.members = multisigData.members;
            multisig.proposals = multisigData.proposals;
        }
		return multisig;
	}

	async fetchMultisig(id: string = this.id!) {
		const multisigData = await this.getMultisig(id);
		this.id = id;
		this.version = multisigData.version;
		this.name = multisigData.name;
		this.threshold = multisigData.threshold;
		this.totalWeight = multisigData.totalWeight;
		this.members = multisigData.members;
		this.proposals = multisigData.proposals;
	}

	async getMultisigRaw(id: string): Promise<MultisigRaw> {
		const { data } = await this.client.getObject({
			id,
			options: { showContent: true }
		});

		if (!data?.content) throw new Error(`Multisig with id ${id} not found.`);

		return MultisigRaw.fromSuiParsedData(data.content);
	}

	async getMultisig(
        id: string
    ): Promise<{version: number, name: string, threshold: number, totalWeight: number, members: Member[], proposals: Proposal[]}> {
		const multisigRaw = await this.getMultisigRaw(id);
		const membersAddress: string[] = multisigRaw!.members.contents.map((member: any) => member.key);
        // get Member for all members
		const members = await Promise.all(membersAddress.map(async member => {
			const weight = multisigRaw?.members.contents.find((m: any) => m.key == member)?.value.weight;
			const account = await Account.init(this.network, this.packageId, this.userAddr);
			const accountRaw = await account.getAccountRaw(member);
			return {
				owner: member,
				id: accountRaw?.id.id!,
				username: accountRaw?.username!,
				profilePicture: accountRaw?.profilePicture!,
				weight: Number(weight),
			}
		}));
		// get Proposals with actions
		const proposals = await this.getProposals(multisigRaw!);
		
		return {
			version: Number(multisigRaw!.version),
			name: multisigRaw!.name,
			threshold: Number(multisigRaw!.threshold),
			totalWeight: Number(multisigRaw!.totalWeight),
			members,
			proposals,
		}
	}
	
	// get proposals in multisig and all actions in each proposal's bag in order
	async getProposals(multisigRaw: MultisigRaw): Promise<Proposal[]> {
		return await Promise.all(multisigRaw!.proposals.contents.map(async (proposal: any) => {
			// get the actions in each proposal bag
			const parentId = proposal.value.actions.id.id;
			const { data } = await this.client.getDynamicFields({ parentId });
			// sort actions by ascending order 
			const ids = data
				.sort((a, b) => Number(a.name.value) - Number(b.name.value))
				.map(df => df.objectId);
			
			let actions: any[] = [];
			if (data.length > 0) {
				const actionDfs: any = await this.client.multiGetObjects({
					ids,
					options: { showContent: true }
				});
				actions = actionDfs.map((df: any) => ({
					type: df.data?.content?.fields.value.type.split("::").pop(), // The action Struct name
					...df.data?.content?.fields.value.fields // The action Struct fields
				}));
			}
			
			return {
				id: proposal.value.id,
				key: proposal.key,
				moduleWitness: proposal.value.moduleWitness.name,
				description: proposal.value.description,
				expirationEpoch: proposal.value.expirationEpoch,
				executionTime: proposal.value.executionTime,
				approvalWeight: Number(proposal.value.approvalWeight),
				approved: proposal.value.approved.contents as string[],
				actions
			}
		}));
	}

	getProposal(key: string): Proposal {
		const proposal = this.proposals?.find(p => p.key == key);
		if (!proposal) {
			throw new Error(`Proposal with key ${key} not found.`);
		}
		return proposal;
	}

	getMemberWeight(addr: string): number {
		const member = this.members?.find(m => m.owner == addr);
		if (!member) {
			throw new Error(`Member with address ${addr} not found.`);
		}
		return member.weight;
	}

	hasApproved(key: string, addr: string): boolean {
		const proposal = this.getProposal(key);
		return proposal.approved.includes(addr);
	}

	// members and weights are optional, if none are provided then only the creator is added with weight 1
	newMultisig(tx: TransactionBlock, accountId: string, name: string): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::multisig::new`,
			arguments: [tx.pure(name), tx.pure(accountId)],
		});
	}

    shareMultisig(tx: TransactionBlock, multisig: TransactionResult): TransactionResult {
        return tx.moveCall({
            target: `${this.packageId}::multisig::share`,
            arguments: [multisig],
        });
    }

	cleanProposals(tx: TransactionBlock): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::multisig::clean_proposals`,
			arguments: [tx.object(this.id)],
		});
	}

	approveProposal(
		tx: TransactionBlock, 
		key: string, 
		multisig: string | TransactionResult = this.id!
	): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::multisig::approve_proposal`,
			arguments: [
				typeof(multisig) === "string" ? tx.pure(multisig) : multisig, 
				tx.pure(key)
			],
		});
	}

	removeApproval(tx: TransactionBlock, key: string): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::multisig::remove_approval`,
			arguments: [tx.object(this.id), tx.pure(key)],
		});
	}
	
	executeProposal(
		tx: TransactionBlock, 
		key: string, 
		multisig: string | TransactionResult = this.id!
	): TransactionResult {
		return tx.moveCall({
			target: `${this.packageId}::multisig::execute_proposal`,
			arguments: [
				typeof(multisig) === "string" ? tx.pure(multisig) : multisig, 
				tx.pure(key), 
				tx.object(CLOCK)
			],
		});
	}
}

