import { KioskClient } from "@mysten/kiosk";

export type Item = {
    type: string;
    display: any; // null if no Display object for the type
    id: string;
    fields: any; 
}

export class Kiosk {
    public profits: number = 0;
    public items: Item[] = [];
    public listed: string[] = []; // ids of listed items

    private constructor(
        public client: KioskClient,
        public id: string,
    ) {}

    static async init(client: KioskClient, id: string): Promise<Kiosk> {
        const kiosk = new Kiosk(client, id);

        const res = await client.getKiosk({
            id,
            options: {
                withKioskFields: true, // this flag also returns the `kiosk` object in the response, which includes the base setup
                withListingPrices: true, // This flag enables / disables the fetching of the listing prices.
            }
        });

        kiosk.profits = Number(res.kiosk!.profits);
        kiosk.listed = res.listingIds;
        kiosk.items = res.items.map(item => ({
            id: item.objectId,
            type: item.type,
            display: item.data?.display,
            fields: (item.data?.content as any).fields,
        }));

        return kiosk;
    }
}