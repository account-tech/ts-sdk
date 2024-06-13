import { TransactionBlock } from "@mysten/sui.js/transactions";
import { ProposalService } from "./proposalService.js";
import { Multisig } from "../multisig.js";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { SuiClient, SuiTransactionBlockResponse } from "@mysten/sui.js/client";

export class ProposalBuilder {
    public tx: TransactionBlock;
    public multisig: Multisig;
    public service: ProposalService;
    public action: string | null = null;

    constructor(tx: TransactionBlock, multisig: Multisig, service: ProposalService) {
        this.tx = tx;
        this.multisig = multisig;
        this.service = service;
    }

    setAction(action: string): this {
        this.action = action;
        return this;
    }

    propose(key: string, executionTime: number, expirationTime: number,description: string, ...args: any): this {
        if (!this.action) {
            throw new Error('Function name is not set');
        }
    
        const capitalizedAction = this.action.charAt(0).toUpperCase() + this.action.slice(1);
        const methodName = `propose${capitalizedAction}`;
        const method = (this.service as any)[methodName];
        if (typeof method === 'function') {
            method.apply(
                this.service, 
                [this.tx, key, executionTime, expirationTime, description, args]
            );
        } else {
            throw new Error(`Function ${this.action} does not exist`);
        }

        return this;
    }

    approve(key: string): this {
        this.multisig.approveProposal(this.tx, key);
        return this;
    }

    execute(key: string, ...args: any): this {
        if (!this.action) {
            throw new Error('Function name is not set');
        }
        const [executable] = this.multisig.executeProposal(this.tx, key);

        const capitalizedAction = this.action.charAt(0).toUpperCase() + this.action.slice(1);
        const methodName = `execute${capitalizedAction}`;
        const method = (this.service as any)[methodName];
        if (typeof method === 'function') {
            method.apply(
                this.service, 
                [this.tx, executable, args]
            );
        } else {
            throw new Error(`Function ${this.action} does not exist`);
        }

        return this;
    }

    async run(client: SuiClient, keypair: Ed25519Keypair): Promise<SuiTransactionBlockResponse> {
        this.tx.setGasBudget(1000000000);
        const result = await client.signAndExecuteTransactionBlock({
            signer: keypair,
            transactionBlock: this.tx,
            options: { showEffects: true, showObjectChanges: true },
            requestType: "WaitForLocalExecution"
        });

        if (result.effects?.status.status == "success") {
            console.log("Transaction executed successfully");
        } else {
            console.log("Transaction failed");
            console.log(result.effects?.status.error);
        }

        return result;
    }
}