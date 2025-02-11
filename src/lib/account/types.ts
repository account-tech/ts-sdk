import { ACCOUNT_CONFIG } from "src/types/constants";
import { Intent } from "../intents";
import { Managed, Owned } from "../objects";

export type AccountType = typeof AccountTypes[keyof typeof AccountTypes];

export const AccountTypes = {
    Multisig: `${ACCOUNT_CONFIG.V1}::multisig::Multisig`,
    // Dao: `${ACCOUNT_CONFIG.V1}::dao::Dao`,
} as const;

// Account

export type AccountData = {
    id: string;
    metadata: Metadata[];
    deps: Dep[];
    managedAssets: Managed;
    ownedObjects: Owned;
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
    members: MemberUser[];
    intents: Intent[];
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

export type MemberUser = Member & {
    accountId: string,
    username: string,
    avatar: string,
};