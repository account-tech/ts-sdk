export type Multisig = {
    id: string;
    name: string;
    threshold: number;
    members: string[];
    proposals: Proposal[];
}

export type Proposal = {
    key: string;
    description: string;
    executionTime: number;
    expirationEpoch: number;
    approved: string[];
}

export type Account = {
    id: string,
	username: string;
	profilePicture: string;
    multisigs: string[];
};

