import { ACCOUNT_MULTISIG } from "src/types/constants";
import { Profile } from "../user/types";

export type AccountType = typeof AccountTypes[keyof typeof AccountTypes];

export const AccountTypes = {
    Multisig: `${ACCOUNT_MULTISIG.V1}::multisig::Multisig`,
    // Dao: `${ACCOUNT_MULTISIG.V1}::dao::Dao`,
} as const;

// Account

export type AccountData = {
    id: string;
    metadata: Metadata[];
    deps: Dep[];
    intentsBagId: string;
}

export type Metadata = {
    key: string;
    value: string;
};

export type Dep = {
    name: string;
    addr: string;
    version: number;
}

// Multisig

export type MultisigData = AccountData & {
    global: Role;
    roles: Record<string, Role>;
    members: MemberProfile[];
}

export type Role = {
    threshold: number,
    totalWeight: number,
}

export type Threshold = {
    name: string,
    threshold: number,
}

export type Member = {
    address: string,
    weight: number,
    roles: string[],
};

export type MemberProfile = Member & Profile;