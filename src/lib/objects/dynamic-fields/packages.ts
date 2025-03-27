import { SuiMoveObject } from "@mysten/sui/client";
import { UpgradeCap } from "../../../.gen/_dependencies/source/0x2/package/structs";
import { UpgradeRules } from "../../../.gen/account-actions/package-upgrade/structs";
import { ManagedKeyTypes, Package } from "../types";
import { Asset } from "../managed";

export class Packages extends Asset {
    override type = "packages";
    override keys = [ManagedKeyTypes.UpgradeCap, ManagedKeyTypes.UpgradeRules];
    override assets: Record<string, Package> = {};
    
    async init() {
        // Extract all IDs we need to fetch
        const allIds = this.dfs.map(df => df.objectId);
    
        // Process in batches of 50 due to API limitations
        const objects = [];
        for (let i = 0; i < allIds.length; i += 50) {
            const batch = allIds.slice(i, i + 50);
            const batchResults = await this.client.multiGetObjects({
                ids: batch,
                options: { showContent: true }
            });
            objects.push(...batchResults);
        }
    
        // Create lookup maps
        const nameToCapRules: Record<string, { cap: SuiMoveObject | null, rules: SuiMoveObject | null }> = {};
    
        objects.forEach(obj => {
            if (!obj.data?.content) return;
            const moveObj = obj.data.content as SuiMoveObject;
            if (moveObj.type?.includes('UpgradeRules')) {
                const name = (this.dfs.find(df => df.objectId === obj.data?.objectId)?.name.value as any).pos0;
                if (!nameToCapRules[name]) {
                    nameToCapRules[name] = { cap: null, rules: null };
                }
                nameToCapRules[name].rules = moveObj;
            } else if (moveObj.type?.includes('UpgradeCap')) {
                const name = (this.dfs.find(df => df.objectId === obj.data?.objectId)?.name.value as any).pos0;
                if (!nameToCapRules[name]) {
                    nameToCapRules[name] = { cap: null, rules: null };
                }
                nameToCapRules[name].cap = moveObj;
            }
        });
    
        // Process each upgrade policy
        for (const [name, { cap, rules }] of Object.entries(nameToCapRules)) {
            if (!rules || !cap) continue;
    
            const upgradeRules = UpgradeRules.fromFieldsWithTypes((rules.fields as any).value);
            const upgradeCap = UpgradeCap.fromSuiParsedData(cap);
    
            this.assets[name] = {
                packageId: upgradeCap.package,
                capId: upgradeCap.id,
                delayMs: upgradeRules.delayMs,
            };
        }
    }
    
    
}