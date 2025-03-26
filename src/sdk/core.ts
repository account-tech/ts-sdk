import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Account, Intents, Owned, Managed, Extensions, User } from "../lib";
import { SDKConfig } from "./types";

export class AccountSDK {
    private config: SDKConfig;

    private constructor(
        public client: SuiClient,
        public extensions: Extensions,
        public user: User,
        public account: Account,
        public intents: Intents | undefined,
        public managedAssets: Managed | undefined,
        public ownedObjects: Owned | undefined,
        config: SDKConfig,
    ) {
        this.config = config;
    }

    static async init(
        network: "mainnet" | "testnet" | "devnet" | "localnet" | string,
        userAddr: string,
        accountId: string | undefined,
        config: SDKConfig,
    ): Promise<AccountSDK> {
        const url = (network == "mainnet" || network == "testnet" || network == "devnet" || network == "localnet") ? getFullnodeUrl(network) : network;
        const client = new SuiClient({ url });

        const extensions = await Extensions.init(client);
        const user = await User.init(client, userAddr);

        const account = new config.accountType(client);
        await account.init(accountId);

        let intents: Intents | undefined;
        let managedAssets: Managed | undefined;
        let ownedObjects: Owned | undefined;
        if (accountId) {
            intents = await Intents.init(client, accountId, account.intentsBagId, config.intentRegistry, config.outcomeRegistry);
            managedAssets = await Managed.init(client, accountId);
            if (config.ownedObjects) {
                ownedObjects = await Owned.init(client, accountId);
            }
        }

        return new AccountSDK(client, extensions, user, account, intents, managedAssets, ownedObjects, config);
    }

    async refresh() {
        await this.extensions.refresh();
        await this.user.refresh();
        await this.account.refresh();
        if (this.account.id) {
            this.intents = await Intents.init(this.client, this.account.id, this.account.intentsBagId, this.config.intentRegistry, this.config.outcomeRegistry);
            this.managedAssets = await Managed.init(this.client, this.account.id);
            if (this.config.ownedObjects) {
                this.ownedObjects = await Owned.init(this.client, this.account.id);
            }
        }
    }
}