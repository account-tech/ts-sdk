
import { Transaction, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import { ProposalFields } from "../../.gen/kraken-multisig/proposals/structs"
import { approveProposal, removeApproval, executeProposal } from "../../.gen/kraken-multisig/multisig/functions"
import { CLOCK } from "src/types/constants";

export abstract class Proposal {
    auth?: { witness: string, name: string };
    key?: string;
    description?: string;
    executionTime?: number;
    expirationEpoch?: number;
    totalWeight?: number;
    roleWeight?: number;
    approved?: string[];
    
    constructor(
        public client: SuiClient,
        public multisig: string,
    ) {
        this.client = client;
        this.multisig = multisig;
    }
    
    init(fields: ProposalFields) {
        this.setProposalFromFields(fields);
    }
    
    abstract propose(tx: Transaction, multisigId: string, ...args: any[]): TransactionResult;

    abstract execute(tx: Transaction, ...args: any[]): TransactionResult;

    async fetchActions(parentId: string) {
        // get the actions in each proposal bag
        const { data } = await this.client.getDynamicFields({ parentId });
        // sort actions by ascending order 
        const ids = data
            .sort((a, b) => Number(a.name.value) - Number(b.name.value))
            .map(df => df.objectId);

        let actions: any[] = [];
        if (data.length > 0) {
            const actionDfs = await this.client.multiGetObjects({
                ids,
                options: { showContent: true }
            });
            actions = actionDfs.map((df: any) => df.data?.content?.fields.value.fields);
        }

        return actions;
    }

    hasApproved(addr: string): boolean {
        this.assertProposal();
        return this.approved!.includes(addr);
    }

    approve(
        tx: Transaction,
    ): TransactionResult {
        this.assertProposal();
        return approveProposal(tx, { multisig: this.multisig, key: this.key! });
    }

    maybeApprove(
        tx: Transaction,
        caller: string,
    ) {
        if (!this.hasApproved(caller)) {
            this.approve(tx);
        }
    }

    constructExecutable(
        tx: Transaction,
    ): TransactionResult {
        return executeProposal(tx, { multisig: this.multisig, key: this.key!, clock: CLOCK });
    }

    removeApproval(tx: Transaction): TransactionResult {
        return removeApproval(tx, { multisig: this.multisig, key: this.key! });
    }

    assertProposal() {
        if (!this.key) {
            throw new Error("Proposal is not set. Please set the proposal before calling this method.");
        }
    }

    setProposalFromFields(fields: ProposalFields) {
        this.auth = { witness: fields.auth.witness.name, name: fields.auth.name };
        this.key = fields.key;
        this.description = fields.description;
        this.executionTime = Number(fields.executionTime);
        this.expirationEpoch = Number(fields.expirationEpoch);
        this.totalWeight = Number(fields.totalWeight);
        this.roleWeight = Number(fields.roleWeight);
        this.approved = fields.approved.contents;
    }

    // setMultisig(multisigId: string) {
    //     this.multisigId = multisigId;
    // }

    // withMultisig(multisig: TransactionObjectInput): this {
    //     this.multisig = multisig;
    //     return this;
    // }
    
    // executeConfigDeps(
    //     tx: Transaction,
    //     executable: TransactionResult,
    // ): TransactionResult {
    //     this.assertMultisig();
    //     return config.executeConfigDeps(
    //         tx,
    //         {
    //             executable,
    //             multisig: this.multisig!,
    //         }
    //     );
    // }

    // // === Currency ===

    // proposeMint(
    //     tx: Transaction,
    //     args: MintArgs,
    // ): TransactionResult {
    //     this.assertMultisig();
    //     return currency.proposeMint(
    //         tx,
    //         args.coinType,
    //         {
    //             multisig: this.multisig!,
    //             key: args.key,
    //             description: args.description,
    //             executionTime: BigInt(args.executionTime),
    //             expirationEpoch: BigInt(args.expirationEpoch),
    //             amount: BigInt(args.amount),
    //         }
    //     );
    // }

    // executeMint(
    //     tx: Transaction,
    //     executable: TransactionResult,
    //     coinType: string,
    // ): TransactionResult {
    //     this.assertMultisig();
    //     return currency.executeMint(
    //         tx,
    //         coinType,
    //         {
    //             executable,
    //             multisig: this.multisig!,
    //         }
    //     );
    // }

    // proposeBurn(
    //     tx: Transaction,
    //     args: BurnArgs,
    // ): TransactionResult {
    //     this.assertMultisig();
    //     return currency.proposeBurn(
    //         tx,
    //         args.coinType,
    //         {
    //             multisig: this.multisig!,
    //             key: args.key,
    //             description: args.description,
    //             executionTime: BigInt(args.executionTime),
    //             expirationEpoch: BigInt(args.expirationEpoch),
    //             coinId: args.coinId,
    //             amount: BigInt(args.amount),
    //         }
    //     );
    // }

    // executeBurn(
    //     tx: Transaction,
    //     executable: TransactionResult,
    //     coinType: string,
    //     coinId: string,
    // ): TransactionResult {
    //     this.assertMultisig();
    //     return currency.executeBurn(
    //         tx,
    //         coinType,
    //         {
    //             executable,
    //             multisig: this.multisig!,
    //             receiving: coinId,
    //         }
    //     );
    // }

    // proposeUpdate(
    //     tx: Transaction,
    //     args: UpdateArgs,
    // ): TransactionResult {
    //     this.assertMultisig();
    //     return currency.proposeUpdate(
    //         tx,
    //         args.coinType,
    //         {
    //             multisig: this.multisig!,
    //             key: args.key,
    //             description: args.description,
    //             executionTime: BigInt(args.executionTime),
    //             expirationEpoch: BigInt(args.expirationEpoch),
    //             mdName: args.name,
    //             mdSymbol: args.symbol,
    //             mdDescription: args.description,
    //             mdIcon: args.icon,
    //         }
    //     );
    // }

    // executeUpdate(
    //     tx: Transaction,
    //     executable: TransactionResult,
    //     coinType: string,
    //     metadataId: string,
    // ): TransactionResult {
    //     this.assertMultisig();
    //     return currency.executeUpdate(
    //         tx,
    //         coinType,
    //         {
    //             executable,
    //             multisig: this.multisig!,
    //             metadata: metadataId,
    //         }
    //     );
    // }

    // // === Kiosk === 

    // proposeTake(
    //     tx: Transaction,
    //     args: TakeArgs,
    // ): TransactionResult {
    //     this.assertMultisig();
    //     return kiosk.proposeTake(
    //         tx,
    //         {
    //             multisig: this.multisig!,
    //             key: args.key,
    //             description: args.description,
    //             executionTime: BigInt(args.executionTime),
    //             expirationEpoch: BigInt(args.expirationEpoch),
    //             name: args.name,
    //             nftIds: args.nftIds,
    //             recipient: args.recipient,
    //         }
    //     );
    // }


    // === Transfers ===

    // proposeSend(
    //     tx: Transaction,
    //     key: string,
    //     executionTime: number,
    //     expirationEpoch: number,
    //     description: string,
    //     objects: string[],
    //     recipients: string[],
    // ) {
    //     if ((toAdd || weights) && (toAdd?.length !== weights?.length)) {
    //         throw new Error("The number of members to add does not match the number of weights provided.");
    //     }
    //     tx.moveCall({
    //         target: `${this.packageId}::config::propose_modify`,
    //         arguments: [
    //             typeof(this.multisig) === "string" ? tx.object(this.multisig) : this.multisig, 
    //             tx.pure(key), 
    //             tx.pure(executionTime), 
    //             tx.pure(expirationEpoch), 
    //             tx.pure(description), 
    //             name ? tx.pure([name]) : tx.pure([]), 
    //             threshold ? tx.pure([threshold]) : tx.pure([]), 
    //             toRemove ? tx.pure(toRemove) : tx.pure([]), 
    //             toAdd ? tx.pure(toAdd) : tx.pure([]),
    //             weights ? tx.pure(weights) : tx.pure([]),
    //         ],
    //     });
    // }
}

