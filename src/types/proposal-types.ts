import { Dep, Member, Threshold } from "./account-types";
import { Proposal } from "../lib/proposals/proposal";
import { AccessControlProposal } from "../lib/proposals/account-actions/access-control";
import { ConfigDepsProposal } from "../lib/proposals/account-actions/config";
import { DisableProposal, MintProposal, BurnProposal, UpdateProposal, MintAndTransferProposal, MintAndVestProposal } from "../lib/proposals/account-actions/currency";
import { ConfigMultisigProposal } from "../lib/proposals/account-actions/multisig";
import { ACCOUNT_ACTIONS, ACCOUNT_CONFIG } from "./constants";
import { ListProposal, TakeProposal } from "../lib/proposals/account-actions/kiosk";

export type ProposalType = typeof ProposalTypes[keyof typeof ProposalTypes];

export const ProposalTypes = {
    // Config
    ConfigMultisig: `${ACCOUNT_CONFIG.V1.slice(2)}::multisig::ConfigMultisigProposal`,
    // Actions
    AccessControl: `${ACCOUNT_ACTIONS.V1.slice(2)}::access_control::AccessControlProposal`,
    ConfigDeps: `${ACCOUNT_ACTIONS.V1.slice(2)}::config::ConfigDepsProposal`,
    Disable: `${ACCOUNT_ACTIONS.V1.slice(2)}::currency::DisableProposal`,
    Mint: `${ACCOUNT_ACTIONS.V1.slice(2)}::currency::MintProposal`,
    Burn: `${ACCOUNT_ACTIONS.V1.slice(2)}::currency::BurnProposal`,
    Update: `${ACCOUNT_ACTIONS.V1.slice(2)}::currency::UpdateProposal`,
    MintAndTransfer: `${ACCOUNT_ACTIONS.V1.slice(2)}::currency::MintAndTransferProposal`,
    MintAndVest: `${ACCOUNT_ACTIONS.V1.slice(2)}::currency::MintAndVestProposal`,
    Take: `${ACCOUNT_ACTIONS.V1.slice(2)}::kiosk::TakeProposal`,
    List: `${ACCOUNT_ACTIONS.V1.slice(2)}::kiosk::ListProposal`,
} as const;

export const proposalRegistry: Record<ProposalType, typeof Proposal> = {
    [ProposalTypes.ConfigMultisig]: ConfigMultisigProposal,
    [ProposalTypes.AccessControl]: AccessControlProposal,
    [ProposalTypes.ConfigDeps]: ConfigDepsProposal,
    [ProposalTypes.Disable]: DisableProposal,
    [ProposalTypes.Mint]: MintProposal,
    [ProposalTypes.Burn]: BurnProposal,
    [ProposalTypes.Update]: UpdateProposal,
    [ProposalTypes.MintAndTransfer]: MintAndTransferProposal,
    [ProposalTypes.MintAndVest]: MintAndVestProposal,
    [ProposalTypes.Take]: TakeProposal,
    [ProposalTypes.List]: ListProposal,
} as const;

export type ProposalFields = {
    issuer: { accountAddr: string, roleType: string, roleName: string };
    key: string;
    description: string;
    executionTime: number;
    expirationTime: number;
    actionsId: string;
}

export type ProposalArgs = {
    key: string;
    description?: string;
    executionTime?: number;
    expirationTime?: number;
}

export type ActionsArgs = ConfigMultisigArgs | AccessArgs | ConfigDepsArgs | DisableArgs | MintArgs | BurnArgs | UpdateArgs | MintAndTransferArgs | MintAndVestArgs | TakeArgs | ListArgs;

export type ConfigMultisigArgs = {
    members?: Member[];
    thresholds?: { global: number, roles: Threshold[] };
}

export type AccessArgs = {
    capType: string;
}

export type ConfigDepsArgs = {
    deps: Dep[];
}

export type DisableArgs = {
    coinType: string;
    mint: boolean;
    burn: boolean;
    updateSymbol: boolean;
    updateName: boolean;
    updateDescription: boolean;
    updateIcon: boolean;
}

export type MintArgs = {
    coinType: string;
    amount: number;
}

export type BurnArgs = {
    coinType: string;
    coinId: string;
    amount: number;
}

export type UpdateArgs = {
    coinType: string;
    name: string | null;
    symbol: string | null;
    description: string | null;
    icon: string | null;
}

export type MintAndTransferArgs = {
    coinType: string;
    transfers: { amount: number, recipient: string }[];
}

export type MintAndVestArgs = {
    coinType: string;
    amount: number;
    start: number; // ms
    end: number; // ms
    recipient: string;
}

export type TakeArgs = {
    name: string;
    nftIds: string[];
    recipient: string;
}

export type ListArgs = {
    name: string;
    listings: { nftId: string, price: number }[];
}