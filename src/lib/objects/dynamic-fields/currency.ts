import { SuiClient } from "@mysten/sui/client";
import { phantom } from "../../../.gen/_framework/reified";
import { TreasuryCap } from "../../../.gen/_dependencies/source/0x2/coin/structs";
import { CurrencyRules } from "../../../.gen/account-actions/currency/structs";
import { Currency, Df } from "../types";
import { SuiMoveObject } from "@mysten/sui/client";

export async function processCurrencies(
    client: SuiClient,
    currencyDfs: Map<string, Df>
): Promise<Record<string, Currency>> {
    // Extract all IDs we need to fetch
    const allIds = Array.from(currencyDfs.values()).flatMap(df => [df.rulesId, df.capId]);

    // Fetch all objects in one batch
    // Process in batches of 50 due to API limitations
    const objects = [];
    for (let i = 0; i < allIds.length; i += 50) {
        const batch = allIds.slice(i, i + 50);
        const batchResults = await client.multiGetObjects({
            ids: batch,
            options: { showContent: true }
        });
        objects.push(...batchResults);
    }

    // Create lookup maps
    const rulesById: Record<string, SuiMoveObject> = {};
    const capsById: Record<string, SuiMoveObject> = {};

    objects.forEach(obj => {
        if (!obj.data?.content) return;
        const moveObj = obj.data.content as SuiMoveObject;
        if (moveObj.type?.includes('CurrencyRules')) {
            rulesById[obj.data.objectId] = moveObj;
        } else if (moveObj.type?.includes('TreasuryCap')) {
            capsById[obj.data.objectId] = moveObj;
        }
    });

    // Process each currency
    const result: Record<string, Currency> = {};
    for (const [name, { rulesId, capId }] of currencyDfs.entries()) {
        const rulesObj = rulesById[rulesId];
        const capObj = capsById[capId];

        if (!rulesObj || !capObj) continue;

        const coinType = (rulesObj.fields as any).name.type.split("<")[1].split(">")[0];
        const currencyRules = CurrencyRules.fromFieldsWithTypes(phantom(coinType), (rulesObj.fields as any).value);
        const treasuryCap = TreasuryCap.fromSuiParsedData(phantom(coinType), capObj);

        result[name] = {
            currentSupply: treasuryCap.totalSupply.value,
            maxSupply: currencyRules.maxSupply ?? null,
            totalMinted: currencyRules.totalMinted,
            totalBurned: currencyRules.totalBurned,
            canMint: currencyRules.canMint,
            canBurn: currencyRules.canBurn,
            canUpdateSymbol: currencyRules.canUpdateSymbol,
            canUpdateName: currencyRules.canUpdateName,
            canUpdateDescription: currencyRules.canUpdateDescription,
            canUpdateIcon: currencyRules.canUpdateIcon,
        };
    }

    return result;
}
