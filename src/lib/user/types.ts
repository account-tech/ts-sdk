export type Profile = {
    username: string;
    avatar: string;
}

export type AccountPreview = {
    id: string;
    name: string;
};

export type Invite = {
    id: string;
    accountAddr: string;
    accountName: string;
}

export type UserData = {
    id: string;
    profile: Profile;
    accounts: AccountPreview[];
    invites: Invite[];
}