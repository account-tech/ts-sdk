import { Dep, Member, Threshold } from "./account-types";
import { Proposal } from "src/lib/proposal/proposal";
import { ConfigMetadataProposal, ConfigDepsProposal } from "src/lib/proposal/proposals/config";
import { MintProposal, BurnProposal, UpdateProposal } from "src/lib/proposal/proposals/currency";
import { ConfigMultisigProposal } from "src/lib/proposal/proposals/multisig";

export enum ProposalTypes {
    // Config
    ConfigMultisig = "ConfigMultisig",
    // Actions
    ConfigMetadata = "ConfigMetadata",
    ConfigDeps = "ConfigDeps",
    Mint = "Mint",
    Burn = "Burn",
    Update = "Update",
};

export const proposalRegistry: Record<string, typeof Proposal> = {
    [ProposalTypes.ConfigMultisig]: ConfigMultisigProposal,
    [ProposalTypes.ConfigMetadata]: ConfigMetadataProposal,
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

export type ActionsArgs = ConfigMultisigArgs | ConfigMetadataArgs | ConfigDepsArgs | MintArgs | BurnArgs | UpdateArgs | TakeArgs;

export type ConfigMultisigArgs = {
    members?: Member[];
    thresholds?: { global: number, roles: Threshold[] };
}

export type ConfigMetadataArgs = {
    name: string;
    other?: Map<string, string>;
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