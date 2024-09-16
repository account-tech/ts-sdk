export type Dep = {
    name: string,
    package: string,
    version: number,
}

export type Role = {
    threshold: number,
    totalWeight: number,
}

export type Member = {
    address: string,
    accountId: string,
    username: string,
    profilePicture: string,
    weight: number,
    roles: string[],
};

export type Proposal = {
    auth: { issuer: string, name: string },
    name: string,
    description: string,
    expirationEpoch: bigint,
    executionTime: bigint,
    actions: any[],
    totalWeight: number,
    roleWeight: number,
    approved: string[],
}

export type Kiosk = {
    cap: string,
    kiosk: string,
    profits: bigint,
    itemCount: number,
}

export type TransferPolicy = {
    id: string,
    hasFloorPrice: boolean,
    hasRoyalty: boolean,
    isLocked: boolean,
}

