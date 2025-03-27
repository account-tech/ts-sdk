import { phantom } from "../../../.gen/_framework/reified";
import { TreasuryCap } from "../../../.gen/_dependencies/source/0x2/coin/structs";
import { CurrencyRules } from "../../../.gen/account-actions/currency/structs";
import { Currency, ManagedKeyTypes } from "../types";
import { SuiMoveObject } from "@mysten/sui/client";
import { Asset } from "../managed";

export class Currencies extends Asset {
    override type = "currencies";
    override keys = [ManagedKeyTypes.CurrencyRules, ManagedKeyTypes.TreasuryCap];
    override assets: Record<string, Currency> = {}; // name -> currency struct

    async init() {
        const dfIds = this.dfs.map(df => df.objectId);
        // Fetch all objects in one batch
        // Process in batches of 50 due to API limitations
        const objects = [];
        for (let i = 0; i < dfIds.length; i += 50) {
            const batch = dfIds.slice(i, i + 50);
            const batchResults = await this.client.multiGetObjects({
                ids: batch,
                options: { showContent: true }
            });
            objects.push(...batchResults);
        }
    
        // Create lookup maps
        const coinTypeToCapRules: Record<string, { cap: SuiMoveObject | null, rules: SuiMoveObject | null }> = {};
    
        objects.forEach(obj => {
            if (!obj.data?.content) return;
            const moveObj = obj.data.content as SuiMoveObject;
            if (moveObj.type?.includes('CurrencyRules')) {
                const coinType = moveObj.type.match(/<([^>]*)>/)![1];
                if (!coinTypeToCapRules[coinType]) {
                    coinTypeToCapRules[coinType] = { cap: null, rules: null };
                }
                coinTypeToCapRules[coinType].rules = moveObj;
            } else if (moveObj.type?.includes('TreasuryCap')) {
                const coinType = moveObj.type.match(/<([^>]*)>/)![1];
                if (!coinTypeToCapRules[coinType]) {
                    coinTypeToCapRules[coinType] = { cap: null, rules: null };
                }
                coinTypeToCapRules[coinType].cap = moveObj;
            }
        });
    
        // Process each currency
        for (const [coinType, { cap, rules }] of Object.entries(coinTypeToCapRules)) {
            if (!rules || !cap) continue;
    
            const currencyRules = CurrencyRules.fromFieldsWithTypes(phantom(coinType), (rules.fields as any).value);
            const treasuryCap = TreasuryCap.fromSuiParsedData(phantom(coinType), cap);
    
            this.assets[coinType] = {
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
            } as Currency;
        }
    }
}

