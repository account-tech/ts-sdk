export type Multisig = {
    name: string,
    threshold: number,
    members: string[],
    proposals: Proposal[],
}

export type Proposal = {
    id: string,
    key: string,
    description: string,
    executionTime: number,
    expirationEpoch: number,
    approved: string[],
    action: any,
}

export type Account = {
    id: string,
	username: string,
	profilePicture: string,
    multisigs: string[],
};

export type Kiosk = {
    cap: string,
    kiosk: string,
    profits: number,
    itemCount: number,
}

export type TransferPolicy = {
    id: string,
    hasFloorPrice: boolean,
    hasRoyalty: boolean,
    isLocked: boolean,
}

