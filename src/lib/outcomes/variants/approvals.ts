import { Transaction, TransactionResult } from "@mysten/sui/transactions";
import { approveIntent, disapproveIntent, executeIntent } from "../../../.gen/account-multisig/multisig/functions";
import { ACCOUNT_MULTISIG, CLOCK } from "../../../types/constants";
import { Outcome } from "../outcome";
import { Approvals as ApprovalsRaw } from "src/.gen/account-multisig/multisig/structs";

export class Approvals implements Outcome {
    static type = `${ACCOUNT_MULTISIG.V1}::multisig::Approvals`;

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
}
