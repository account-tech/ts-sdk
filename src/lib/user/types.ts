export type AccountPreview = {
    id: string;
    name: string;
};

export type AccountPreviews = Record<string, AccountPreview[]>;

export type UserData = {
    id: string;
    username: string;
    avatar: string;
    accounts: AccountPreviews;
}