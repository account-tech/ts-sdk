import { Transaction, TransactionResult } from "@mysten/sui/transactions";
import { approveProposal, disapproveProposal, executeProposal } from "../../../.gen/account-config/multisig/functions";
import { CLOCK } from "../../../types/constants";
import { Outcome } from "../outcome";

export class Approvals extends Outcome {    
    constructor(
        public multisig: string,
        public key: string,
        // Approvals Data
        public totalWeight: number,
        public roleWeight: number,
        public approved: string[],
    ) {
        super(multisig, key);
    }

    hasApproved(addr: string): boolean {
        return this.approved!.includes(addr);
    }

    approve(tx: Transaction): TransactionResult {
        return approveProposal(tx, { account: this.multisig, key: this.key });
    }
    
    maybeApprove(tx: Transaction, caller: string) {
        if (!this.hasApproved(caller)) {
            this.approve(tx);
        }
    }

    disapprove(tx: Transaction): TransactionResult {
        return disapproveProposal(tx, { account: this.multisig, key: this.key });
    }

    constructExecutable(tx: Transaction): TransactionResult {
        return executeProposal(tx, { account: this.multisig, key: this.key, clock: CLOCK });
    }
}
