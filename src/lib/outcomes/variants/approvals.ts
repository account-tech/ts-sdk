import { Transaction, TransactionResult } from "@mysten/sui/transactions";
import { approveIntent, disapproveIntent, executeIntent } from "../../../.gen/account-multisig/multisig/functions";
import { CLOCK } from "../../../types/constants";
import { Outcome } from "../outcome";
import { IntentStatus } from "src/lib/intents";

export class Approvals implements Outcome {
    public status: IntentStatus;

    constructor(
        public multisig: string,
        public key: string,
        // Approvals Data
        public totalWeight: number,
        public roleWeight: number,
        public approved: string[],
        // Multisig Data
        executionTime: bigint,
        expirationTime: bigint,
        globalThreshold: number,
        roleThreshold: number,
    ) {
        this.status = this.computeStatus(
            executionTime,
            expirationTime,
            totalWeight,
            roleWeight,
            globalThreshold,
            roleThreshold,
        );
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

    constructExecutable(tx: Transaction): TransactionResult {
        return executeIntent(tx, { account: this.multisig, key: this.key, clock: CLOCK });
    }

    computeStatus(
        executionTime: bigint,
        expirationTime: bigint,
        totalWeight: number,
        roleWeight: number,
        globalThreshold: number,
        roleThreshold: number,
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
            roleWeight >= roleThreshold;

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
