import { DynamicFieldInfo, SuiClient, SuiMoveObject } from "@mysten/sui/client";
import { Vault } from "../types";

export async function processVaults(
    client: SuiClient,
    vaultDfs: Map<string, string>
): Promise<Record<string, Vault>> {
    const result: Record<string, Vault> = {};

    // First get all vault objects to extract bag IDs
    const vaultStructs = await client.multiGetObjects({
        ids: Array.from(vaultDfs.values()),
        options: { showContent: true }
    });

    // Map vault IDs to their bag IDs
    const vaultToBagId: Record<string, string> = {};
    vaultStructs.forEach(v => {
        if (!v.data?.content) return;
        const moveObj = v.data.content as SuiMoveObject;
        vaultToBagId[v.data.objectId] = (moveObj.fields as any).value.fields.bag.fields.id.id;
    });

    // Process each vault in parallel
    await Promise.all(Array.from(vaultDfs.entries()).map(async ([name, vaultId]) => {
        const bagId = vaultToBagId[vaultId];
        if (!bagId) return;

        // Get all dynamic fields (coins) in the bag
        let dfs: DynamicFieldInfo[] = [];
        let data: DynamicFieldInfo[];
        let nextCursor: string | null = null;
        let hasNextPage = true;
        while (hasNextPage) {
            ({ data, nextCursor, hasNextPage } = await client.getDynamicFields({
                parentId: bagId,
                cursor: nextCursor
            }));
            dfs.push(...data);
            nextCursor = nextCursor;
        }

        // Map field IDs to their coin types
        const fieldIdsToCoinType: Record<string, string> = {};
        dfs.forEach(df => {
            fieldIdsToCoinType[df.objectId] = (df.name.value as any).name;
        });

        // Fetch all coin objects in one batch
        const coinObjs = await client.multiGetObjects({
            ids: Object.keys(fieldIdsToCoinType),
            options: { showContent: true }
        });

        // Extract balances from coin objects and combine with types
        const coins: Record<string, bigint> = {};
        coinObjs.forEach(coin => {
            if (!coin.data?.content) return;
            const moveObj = coin.data.content as SuiMoveObject;
            const coinType = fieldIdsToCoinType[coin.data.objectId];
            coins[coinType] = BigInt((moveObj.fields as any).value);
        });

        result[name] = { coins };
    }));

    return result;
}