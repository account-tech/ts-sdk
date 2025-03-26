import { Transaction, TransactionResult } from "@mysten/sui/transactions";
import { approveIntent, disapproveIntent, executeIntent } from "../../../.gen/account-multisig/multisig/functions";
import { CLOCK } from "../../../types/constants";
import { Outcome } from "../outcome";
import { IntentStatus } from "src/lib/intents";
import { Approvals as ApprovalsRaw } from "src/.gen/account-multisig/multisig/structs";

export class Approvals implements Outcome {
    status!: IntentStatus; // TODO: add status
    multisig: string;
    key: string;
    // Approvals Data
    totalWeight: number;
    roleWeight: number;
    approved: string[];

    constructor(multisigId: string, key: string, fields: any) {
        let approvals = ApprovalsRaw.fromFieldsWithTypes(fields);
        this.multisig = multisigId;
        this.key = key;
        this.totalWeight = Number(approvals.totalWeight);
        this.roleWeight = Number(approvals.roleWeight);
        this.approved = approvals.approved.contents;
        // this.status = this.computeStatus(
        //     totalWeight,
        //     roleWeight,
        //     executionTime,
        //     expirationTime,
        //     globalThreshold,
        //     roleThreshold,
        // );
    }

    hasApproved(addr: string): boolean {
        return this.approved!.includes(addr);
    }

    approve(tx: Transaction): TransactionResult {
        return approveIntent(tx, { account: this.multisig, key: this.key });
    }

    maybeApprove(tx: Transaction, caller: string) {
        if (!this.hasApproved(caller)) {
            this.approve(tx);
        }
    }

    disapprove(tx: Transaction): TransactionResult {
        return disapproveIntent(tx, { account: this.multisig, key: this.key });
    }

    execute(tx: Transaction): TransactionResult {
        return executeIntent(tx, { account: this.multisig, key: this.key, clock: CLOCK });
    }

    computeStatus(
        totalWeight: number,
        roleWeight: number,
        executionTime: bigint,
        expirationTime: bigint,
        globalThreshold: number,
        roleThreshold?: number,
    ): IntentStatus {
        const now = Date.now();

        let [stage, deletable] = ['pending', false];

        // Check expiration first
        if (now >= expirationTime) {
            deletable = true;
        }

        // Check if intent has reached threshold
        const hasReachedThreshold =
            totalWeight >= globalThreshold ||
            (roleThreshold && roleWeight >= roleThreshold);

        // If threshold is reached, check execution time
        if (hasReachedThreshold) {
            stage = now >= executionTime ? 'executable' : 'resolved';
        }

        return {
            stage: stage as 'pending' | 'executable' | 'resolved',
            deletable,
        };
    }
}
