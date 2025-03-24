import { Outcome, Approvals } from "../lib";
import { ACCOUNT_MULTISIG } from "./constants";

export type MultisigOutcomeType = typeof MultisigOutcomeTypes[keyof typeof MultisigOutcomeTypes];

export const MultisigOutcomeTypes = {
    ConfigMultisig: `${ACCOUNT_MULTISIG.V1.slice(2)}::multisig::Approvals`,
} as const;

export const MultisigOutcomeRegistry: Record<MultisigOutcomeType, typeof Outcome> = {
    [MultisigOutcomeTypes.ConfigMultisig]: Approvals,
} as const;
