export type Profile = {
    username: string;
    avatar: string;
}

export type AccountPreview = {
    id: string;
    name: string;
};

export type AccountsByType = Record<string, AccountPreview[]>;

export type Invite = {
    id: string;
    accountAddr: string;
    accountName: string;
}

export type InvitesByType = Record<string, Invite[]>;

export type UserData = {
    id: string;
    profile: Profile;
    accounts: AccountsByType;
    invites: InvitesByType;
}