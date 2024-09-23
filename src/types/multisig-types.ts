export type Dep = {
    name: string,
    package: string,
    version: number,
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

export type MemberAccount = {
    address: string,
    accountId: string,
    username: string,
    profilePicture: string,
    weight: number,
    roles: string[],
};

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

