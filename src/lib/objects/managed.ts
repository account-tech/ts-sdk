/// Managed assets are objects added as dynamic fields with the different interfaces

import { KioskClient, Network } from "@mysten/kiosk";
import { DynamicFieldInfo, SuiClient } from "@mysten/sui/client";

export interface Asset {
    init(): Promise<void>;
}

export class Asset {
    client: SuiClient;
    type: string = "";
    keys: string[] = [];
    dfIds: string[] = [];
    assets: Record<string, any> = {}; // name -> asset struct
    // caps: Cap[] = []; // cap types
    // currencies: Record<string, Currency> = {}; // coinType -> currency
    // kiosks: Record<string, Kiosk> = {}; // name -> Kiosk
    // vaults: Record<string, Vault> = {}; // coinType -> Vault
    // packages: Record<string, Package> = {}; // name -> packageId

    constructor(client: SuiClient, dfs: DynamicFieldInfo[]) {
        this.client = client;
        this.dfIds = dfs.filter(df => this.keys.some(key => df.name.type.includes(key))).map(df => df.objectId);
    }
}

export class Managed {
    private assetRegistry: Array<typeof Asset>;
    kioskClient: KioskClient;
    accountId: string;
    assets: Record<string, Asset> = {};

    private constructor(
        client: SuiClient,
        accountId: string,
        assetRegistry: Array<typeof Asset>,
    ) {
        this.kioskClient = new KioskClient({ client, network: Network.TESTNET });
        this.assetRegistry = assetRegistry;
        this.accountId = accountId;
    }

    static async init(
        client: SuiClient, 
        accountId: string, 
        assetRegistry: Array<typeof Asset>
    ): Promise<Managed> {
        const managed = new Managed(client, accountId, assetRegistry);
        await managed.refresh();
        return managed;
    }

    async fetch(accountId: string = this.accountId): Promise<Asset[]> {
        if (!accountId && !this.accountId) {
            throw new Error("Account id missing");
        }

        let dfs: DynamicFieldInfo[] = [];
        let data: DynamicFieldInfo[];
        let nextCursor: string | null = null;
        let hasNextPage = true;
        while (hasNextPage) {
            ({ data, nextCursor, hasNextPage } = await this.kioskClient.client.getDynamicFields({
                parentId: accountId,
                cursor: nextCursor
            }));
            dfs.push(...data);
            nextCursor = nextCursor;
        }
        
        const assets = this.assetRegistry.map(assetClass => {
            let asset = new assetClass(this.kioskClient.client, dfs);
            asset.init();
            return asset;
        });

        return assets;
    }

    async refresh(accountId: string = this.accountId) {
        const managed = await this.fetch(accountId);
        this.assets = managed.reduce((acc, asset) => {
            acc[asset.type] = asset;
            return acc;
        }, {} as Record<string, Asset>);
    }
}
