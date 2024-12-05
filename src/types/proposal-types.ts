import { Dep, Member, Threshold } from "./account-types";
import { Proposal } from "src/lib/proposals/proposal";
import { ConfigDepsProposal } from "src/lib/proposals/account-actions/config";
import { MintProposal, BurnProposal, UpdateProposal } from "src/lib/proposals/account-actions/currency";
import { ConfigMultisigProposal } from "src/lib/proposals/account-actions/multisig";

export enum ProposalTypes {
    // Config
    ConfigMultisig = "ConfigMultisig",
    // Actions
    ConfigDeps = "ConfigDeps",
    Mint = "Mint",
    Burn = "Burn",
    Update = "Update",
};

export const proposalRegistry: Record<string, typeof Proposal> = {
    [ProposalTypes.ConfigMultisig]: ConfigMultisigProposal,
    [ProposalTypes.ConfigDeps]: ConfigDepsProposal,
    [ProposalTypes.Mint]: MintProposal,
    [ProposalTypes.Burn]: BurnProposal,
    [ProposalTypes.Update]: UpdateProposal,
};

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

export type ActionsArgs = ConfigMultisigArgs | ConfigDepsArgs | MintArgs | BurnArgs | UpdateArgs | TakeArgs;

export type ConfigMultisigArgs = {
    members?: Member[];
    thresholds?: { global: number, roles: Threshold[] };
}

export type ConfigDepsArgs = {
    deps: Dep[];
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

export type TakeArgs = {
    name: string;
    nftIds: string[];
    recipient: string;
}