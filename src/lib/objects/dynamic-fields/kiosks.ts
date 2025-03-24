import { SuiMoveObject } from "@mysten/sui/client";
import { KioskClient } from "@mysten/kiosk";
import { Kiosk } from "../types";

export async function processKiosks(
    client: KioskClient,
    kioskDfs: Map<string, string>
): Promise<Record<string, Kiosk>> {
    const result: Record<string, Kiosk> = {};

    // First get all kiosk cap objects to get kiosk IDs
    // Process in batches of 50 due to API limitations
    const kioskCapObjs = [];
    const capIds = Array.from(kioskDfs.values());
    for (let i = 0; i < capIds.length; i += 50) {
        const batch = capIds.slice(i, i + 50);
        const batchResults = await client.client.multiGetObjects({
            ids: batch,
            options: { showContent: true }
        });
        kioskCapObjs.push(...batchResults);
    }

    // Map cap IDs to kiosk IDs
    const capToKioskId: Record<string, string> = {};
    kioskCapObjs.forEach(obj => {
        if (!obj.data?.content) return;
        const moveObj = obj.data.content as SuiMoveObject;
        const capId = (moveObj.fields as any).id.id;
        const kioskId = (moveObj.fields as any).for;
        capToKioskId[capId] = kioskId;
    });

    // Process each kiosk in parallel
    await Promise.all(Array.from(kioskDfs.entries()).map(async ([name, capId]) => {
        const kioskId = capToKioskId[capId];
        if (!kioskId) return;

        const res = await client.getKiosk({
            id: kioskId,
            options: {
                withKioskFields: true,
                withListingPrices: true,
            }
        });

        result[name] = {
            id: kioskId,
            cap: capId,
            profits: BigInt(res.kiosk!.profits),
            listed: res.listingIds,
            items: res.items.map(item => ({
                id: item.objectId,
                type: item.type,
                display: item.data?.display,
                fields: (item.data?.content as any).fields,
            })),
        };
    }));

    return result;
}