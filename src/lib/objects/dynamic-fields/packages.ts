import { SuiClient } from "@mysten/sui/client";
import { UpgradeCap } from "../../../.gen/_dependencies/source/0x2/package/structs";
import { UpgradeRules } from "../../../.gen/account-actions/package-upgrade/structs";
import { Df, Package } from "../types";
import { SuiMoveObject } from "@mysten/sui/client";

export async function processPackages(
    client: SuiClient,
    upgradePolicyDfs: Map<string, Df>
): Promise<Record<string, Package>> {
    // Extract all IDs we need to fetch
    const allIds = Array.from(upgradePolicyDfs.values()).flatMap(df => [df.rulesId, df.capId]);

    // Fetch all objects in one batch
    const objects = await client.multiGetObjects({
        ids: allIds,
        options: { showContent: true }
    });

    // Create lookup maps
    const rulesById: Record<string, SuiMoveObject> = {};
    const capsById: Record<string, SuiMoveObject> = {};

    objects.forEach(obj => {
        if (!obj.data?.content) return;
        const moveObj = obj.data.content as SuiMoveObject;
        if (moveObj.type?.includes('UpgradeRules')) {
            rulesById[obj.data.objectId] = moveObj;
        } else if (moveObj.type?.includes('UpgradeCap')) {
            capsById[obj.data.objectId] = moveObj;
        }
    });

    // Process each upgrade policy
    const result: Record<string, Package> = {};
    for (const [name, { rulesId, capId }] of upgradePolicyDfs.entries()) {
        const rulesObj = rulesById[rulesId];
        const capObj = capsById[capId];

        if (!rulesObj || !capObj) continue;

        const upgradeRules = UpgradeRules.fromFieldsWithTypes((rulesObj.fields as any).value);
        const upgradeCap = UpgradeCap.fromSuiParsedData(capObj);

        result[name] = {
            packageId: upgradeCap.package,
            capId: upgradeCap.id,
            delayMs: upgradeRules.delayMs,
        };
    }

    return result;
}