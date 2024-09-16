import { Transaction, TransactionArgument, TransactionResult } from '@mysten/sui/transactions';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Multisig as MultisigRaw } from '../.gen/kraken-multisig/multisig/structs';
import { new_, share, approveProposal, removeApproval, executeProposal } from '../.gen/kraken-multisig/multisig/functions';
import { DepFields } from 'src/.gen/kraken-multisig/deps/structs';
import { MemberFields } from 'src/.gen/kraken-multisig/members/structs';
import { RoleFields } from 'src/.gen/kraken-multisig/thresholds/structs';
import { ProposalFields } from 'src/.gen/kraken-multisig/proposals/structs';
import { CLOCK, EXTENSIONS } from '../types/constants';
import { Proposal, Member, Dep, Role } from '../types/types';
import { Account } from './account';

export interface MultisigData {
	id: string;
    name: string;
    deps: Dep[];
    roles: Map<string, Role>;
    members: Member[];
    proposals: Proposal[];
}

export class Multisig {
	public client: SuiClient;
    public id: string = '';
    public name: string = '';
    public deps: Dep[] = [];
    public roles: Map<string, Role> = new Map();
    public members: Member[] = [];
    public proposals: Proposal[] = [];

	private constructor(
		public network: 'mainnet' | 'testnet' | 'devnet' | 'localnet' | string,
		public userAddr: string,
	) {
		console.log(network)
		const url = (network == 'mainnet' || network == 'testnet' || network == 'devnet' || network == 'localnet') ? getFullnodeUrl(network) : network;
		this.client = new SuiClient({ url });
	}

	static async init(
        network: 'mainnet' | 'testnet' | 'devnet' | 'localnet' | string,
        userAddr: string, 
        multisigId?: string,
    ): Promise<Multisig> {
		const multisig = new Multisig(network, userAddr);
        multisigId && multisig.fetchMultisig(multisigId);
		return multisig;
	}

	async fetchMultisig(id: string = this.id!) {
		const multisigData = await this.getMultisig(id);
		this.id = id;
		this.name = multisigData.name;
		this.deps = multisigData.deps;
		this.roles = multisigData.roles;
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

	async getMultisig(id: string): Promise<MultisigData> {
		const multisigRaw = await this.getMultisigRaw(id);

		// get deps
		const deps: Dep[] = multisigRaw.deps.inner.map((dep: DepFields) => {
			return { name: dep.name, package: dep.package, version: Number(dep.version) };
		});

        // get all members' data (from account and member)
		const membersAddress: string[] = multisigRaw.members.inner.map((member: MemberFields) => member.addr);
		const members = await Promise.all(membersAddress.map(async memberAddr => {
			const weight = multisigRaw.members.inner.find((m: MemberFields) => m.addr == memberAddr)?.weight;
			const roles = multisigRaw.members.inner.find((m: MemberFields) => m.addr == memberAddr)?.roles.contents;
			const account = await Account.init(this.network, this.userAddr);
			const accountRaw = await account.getAccountRaw(memberAddr);
			return {
				address: memberAddr,
				accountId: accountRaw?.id!,
				username: accountRaw?.username!,
				profilePicture: accountRaw?.profilePicture!,
				weight: Number(weight)!,
				roles: roles!
			}
		}));

		// calculate total weights
		const globalWeight = members.reduce((acc, member) => acc + member.weight, 0);
		// Calculate total weights for each role
		const roleWeights = new Map<string, number>();
		members.forEach(member => {
			member.roles.forEach(role => {
				const currentWeight = roleWeights.get(role) || 0;
				roleWeights.set(role, currentWeight + member.weight);
			});
		});
		// get thresholds
		const roles = new Map<string, Role>();
		roles.set('global', { threshold: Number(multisigRaw.thresholds.global), totalWeight: globalWeight });
		multisigRaw.thresholds.roles.forEach((role: RoleFields) => {
			roles.set(role.name, { threshold: Number(role.threshold), totalWeight: roleWeights.get(role.name) || 0 });
		});

		// get Proposals with actions
		const proposals = await this.getProposals(multisigRaw);
		
		return {
			id: multisigRaw.id,
			name: multisigRaw.name,
			deps,
			roles,
			members,
			proposals,
		}
	}
	
	// get proposals in multisig and all actions in each proposal's bag in order
	async getProposals(multisigRaw: MultisigRaw): Promise<Proposal[]> {
		return await Promise.all(multisigRaw!.proposals.inner.map(async (proposal: ProposalFields) => {
			// get the actions in each proposal bag
			const parentId = proposal.actions.id;
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
					type: df.data?.content?.fields.value.type.split('::').pop(), // The action Struct name
					...df.data?.content?.fields.value.fields // The action Struct fields
				}));
			}
			
			return {
				auth: { issuer: proposal.auth.issuer.name, name: proposal.auth.name },
				name: proposal.name,
				description: proposal.description,
				expirationEpoch: proposal.expirationEpoch,
				executionTime: proposal.executionTime,
				actions,
				totalWeight: Number(proposal.totalWeight),
				roleWeight: Number(proposal.roleWeight),
				approved: proposal.approved.contents,
			}
		}));
	}

	getProposal(name: string): Proposal {
		const proposal = this.proposals?.find(p => p.name == name);
		if (!proposal) {
			throw new Error(`Proposal with name ${name} not found.`);
		}
		return proposal;
	}

	getMemberWeight(addr: string): number {
		const member = this.members?.find(m => m.address == addr);
		if (!member) {
			throw new Error(`Member with address ${addr} not found.`);
		}
		return member.weight;
	}

	hasApproved(key: string, addr: string): boolean {
		const proposal = this.getProposal(key);
		return proposal.approved.includes(addr);
	}

	newMultisig(
		tx: Transaction, 
		name: string,
		accountId: string, 
		deps: Dep[],
	): TransactionResult {
		let depNames: string[] = [];
		let depPackages: string[] = [];
		let depVersions: bigint[] = [];

		deps.forEach(dep => {
			depNames.push(dep.name);
			depPackages.push(dep.package);
			depVersions.push(BigInt(dep.version));
		});

		return new_(
			tx, 
			{ extensions: EXTENSIONS, name, accountId, depNames, depPackages, depVersions }
		);
	}

    shareMultisig(tx: Transaction, multisig: TransactionArgument): TransactionResult {
        return share(tx, multisig);
    }

	approveProposal(
		tx: Transaction, 
		key: string, 
		multisig: string | TransactionArgument = this.id!
	): TransactionResult {
		return approveProposal(tx, { multisig, key });
	}

	removeApproval(tx: Transaction, multisig: string, key: string): TransactionResult {
		return removeApproval(tx, { multisig, key });
	}
	
	executeProposal(
		tx: Transaction, 
		key: string, 
		multisig: string | TransactionArgument = this.id!
	): TransactionResult {
		return executeProposal(tx, { multisig, key, clock: CLOCK });
	}
}

