export type Extension = {
    name: string,
    history: { package: string, version: number }[],
}

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
    id: string,
    key: string,
    module_witness: string,
    description: string,
    expirationEpoch: bigint,
    executionTime: bigint,
    approvalWeight: number,
    approved: string[],
    actions: any[],
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

