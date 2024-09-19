import { Dep, Member, Threshold } from "./multisigTypes";

export type ProposalArgs = {
    key: string;
    description?: string;
    executionTime?: number;
    expirationEpoch?: number;
}

export type ConfigNameFields = {
    name: string;
}

export type ConfigRulesFields = {
    members?: Member[];
    thresholds?: { global: number, roles: Threshold[] };
}

export type ConfigDepsFields = {
    deps: Dep[];
}

export type MintFields = {
    coinType: string;
    amount: bigint;
}

export type BurnFields = {
    coinType: string;
    coinId: string;
    amount: bigint;
}

export type UpdateFields = {
    coinType: string;
    name: string | null;
    symbol: string | null;
    description: string | null;
    icon: string | null;
}

export type TakeFields = {
    name: string;
    nftIds: string[];
    recipient: string;
}