import { DynamicFieldInfo, SuiClient } from "@mysten/sui/client";

export type TreasuryData = {
    coins: Record<string, number>;
}

export class Treasury {
    public coins: Record<string, number> = {};

    private constructor(
        public client: SuiClient,
        public bagId: string,
    ) { }

    static async init(client: SuiClient, bagId: string): Promise<Treasury> {
        const treasury = new Treasury(client, bagId);
        await treasury.refresh(bagId);
        return treasury;
    }

    async fetch(bagId: string = this.bagId): Promise<TreasuryData> {
        if (!bagId && !this.bagId) {
            throw new Error("Bag id missing");
        }

        let fieldIdsToCoinType: Record<string, string> = {};
        let fieldIdsToCoinBalance: Record<string, number> = {};
        let dfs: DynamicFieldInfo[] = [];
        let data: DynamicFieldInfo[];
        let nextCursor: string | null = null;
        let hasNextPage = true;
        while (hasNextPage) {
            ({ data, nextCursor, hasNextPage } = await this.client.getDynamicFields({
                parentId: bagId,
                cursor: nextCursor
            }));
            dfs.push(...data);
            nextCursor = nextCursor;
        }
        
        dfs.forEach(df => {
            fieldIdsToCoinType[df.objectId] = (df.name.value as any).name;
        });

        const coinObjs = await this.client.multiGetObjects({
            ids: Object.keys(fieldIdsToCoinType),
            options: { showContent: true }
        });
        coinObjs.forEach(coin => {
            fieldIdsToCoinBalance[coin.data!.objectId] = Number((coin.data?.content as any).fields.value);
        });

        let coins: Record<string, number> = {};
        Object.keys(fieldIdsToCoinType).forEach(fieldId => {
            coins[fieldIdsToCoinType[fieldId]] = fieldIdsToCoinBalance[fieldId];
        });

        return { coins };
    }

    async refresh(bagId: string = this.bagId) {
        const treasuryData = await this.fetch(bagId);
        this.setData(treasuryData);
    }

    getData(): TreasuryData {
        return {
            coins: this.coins,
        }
    }

    setData(data: TreasuryData) {
        this.coins = data.coins;
    }
}