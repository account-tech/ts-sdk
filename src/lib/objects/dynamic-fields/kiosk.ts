import { SuiMoveObject } from "@mysten/sui/client";
import { KioskClient } from "@mysten/kiosk";
import { Kiosk } from "../types";

// // get the kiosks and construct the classes
// const kioskCapObjs = await this.client.multiGetObjects({
//     ids: Object.keys(kioskIdsToName),
//     options: { showContent: true }
// });
// kioskCapObjs.forEach(obj => {
//     const kioskCap = (obj.data!.content as any).fields;
//     kioskIdsToCap[obj.data!.objectId] = kioskCap.id.id;
//     kioskCapToKiosk[kioskCap.id.id] = kioskCap.for;
// });
// const kiosks = await Promise.all(Object.keys(kioskCapToKiosk).map(async kioskCapId => {
//     return await Kiosk.init(this.kioskClient, kioskCapToKiosk[kioskCapId], kioskCapId);
// }));
// Object.keys(kioskIdsToName).forEach(kioskId => {
//     const kiosk = kiosks.find(kiosk => kioskIdsToCap[kioskId] === kiosk.cap);
//     if (!kiosk) throw new Error(`Kiosk not found for id ${kioskId}`);
//     this.kiosks[kioskIdsToName[kioskId]] = kiosk;
// });

export async function processKiosks(
    client: KioskClient,
    kioskDfs: Map<string, string>
): Promise<Record<string, Kiosk>> {
    const result: Record<string, Kiosk> = {};

    // First get all kiosk cap objects to get kiosk IDs
    const kioskCapObjs = await client.client.multiGetObjects({
        ids: Array.from(kioskDfs.values()),
        options: { showContent: true }
    });

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