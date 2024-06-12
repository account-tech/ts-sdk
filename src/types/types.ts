export type Multisig = {
    version: number,
    name: string,
    threshold: number,
    totalWeight: number,
    members: Account[],
    proposals: Proposal[],
}

export type Proposal = {
    id: string,
    key: string,
    module_witness: string,
    description: string,
    expirationEpoch: bigint,
    executionTime: bigint,
    approval_weight: number,
    approved: string[],
    actions: any[],
}

export type Account = {
    owner: string,
    id: string,
	username: string,
	profilePicture: string,
    multisigIds: {id: string, name: string}[],
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

