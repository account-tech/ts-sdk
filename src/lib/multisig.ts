import { TransactionBlock, TransactionResult } from "@mysten/sui.js/transactions";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { defaultMoveCoder } from "@typemove/sui";
import { multisig as multisigAbi } from "../types/sui/0x9f23590424d6ee60f3ee8d8785a07917a07149ac32311527d659e59bda120d62.js";
import { CLOCK } from "../types/constants.js";
import { Proposal, Member } from "../types/types.js";
import { Account } from "./account.js";

export class Multisig {
	private client: SuiClient;
    public id?: string;
    public version?: number;
    public name?: string;
    public threshold?: number;
    public totalWeight?: number;
    public members?: Member[];
    public proposals?: Proposal[];

	private constructor(
		private network: "mainnet" | "testnet" | "devnet" | "localnet" | string,
        private packageId: string,
		private userAddr: string,
	) {
		console.log(network)
		const url = (network == "mainnet" || network == "testnet" || network == "devnet" || network == "localnet") ? getFullnodeUrl(network) : network;
		this.client = new SuiClient({ url });
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

	async getMultisigRaw(id: string): Promise<multisigAbi.Multisig | undefined> {
		const { data } = await this.client.getObject({
			id,
			options: { showContent: true }
		});

		return await defaultMoveCoder().decodedType(data?.content, multisigAbi.Multisig.type());
	}

	async getMultisig(
        id: string
    ): Promise<{version: number, name: string, threshold: number, totalWeight: number, members: Member[], proposals: Proposal[]}> {
		const multisigRaw = await this.getMultisigRaw(id);
		const membersAddress: string[] = multisigRaw!.members.contents.map(member => member.key);
        // get Member for all members
		const members = await Promise.all(membersAddress.map(async member => {
			const weight = multisigRaw?.members.contents.find(m => m.key == member)?.value.weight;
			const account = await Account.init(this.network, this.packageId, this.userAddr);
			const accountRaw = await account.getAccountRaw(member);
			return {
				owner: member,
				id: accountRaw?.id.id!,
				username: accountRaw?.username!,
				profilePicture: accountRaw?.profile_picture!,
				weight: Number(weight),
			}
		}));

		// get proposals in multisig and each action attached to proposals
		const proposals = await Promise.all(multisigRaw!.proposals.contents.map(async (proposal) => {
			// get the dynamic field action for each proposal
			const parentId = proposal.value.id.id;
			const { data } = await this.client.getDynamicFields({ parentId });
			const df: any = await this.client.getObject({
				id: data[0].objectId,
				options: { showContent: true }
			});
			// TODO: generate right types 
			// + separate function for proposals
			// const approved = typeof(proposal.value.approved.contents) == "string" ? [proposal.value.approved.contents] : proposal.value.approved.contents;
			const action = {
				type: df.data?.content?.fields.value.type.split("::").pop(), // The action Struct name
				...df.data?.content?.fields.value.fields // The action Struct fields
			}

			return {
				id,
				key: proposal.key,
				module_witness: proposal.value.module_witness.name,
				description: proposal.value.description,
				executionTime: proposal.value.execution_time,
				expirationEpoch: proposal.value.expiration_epoch,
				approval_weight: Number(proposal.value.approval_weight),
				approved: proposal.value.approved.contents as string[],
				actions: [action]
			}
		}));

		return {
			version: Number(multisigRaw!.version),
			name: multisigRaw!.name,
			threshold: Number(multisigRaw!.threshold),
			totalWeight: Number(multisigRaw!.total_weight),
			members,
			proposals,
		}
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

