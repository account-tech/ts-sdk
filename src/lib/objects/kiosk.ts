import { KioskClient } from "@mysten/kiosk";

export type Item = {
    type: string;
    display: any; // null if no Display object for the type
    id: string;
    fields: any; 
}

export type KioskData = {
    id: string;
    cap: string;
    profits: number;
    items: Item[];
    listed: string[];
}

export class Kiosk {
    public profits: number = 0;
    public items: Item[] = [];
    public listed: string[] = []; // ids of listed items

    private constructor(
        public client: KioskClient,
        public id: string,
        public cap: string,
    ) {}

    static async init(client: KioskClient, id: string, cap: string): Promise<Kiosk> {
        const kiosk = new Kiosk(client, id, cap);
        await kiosk.refresh(id, cap);
        return kiosk;
    }

    async fetch(id: string = this.id, cap: string = this.cap): Promise<KioskData> {
        if (!id && !cap && !this.id && !this.cap) {
            throw new Error("Kiosk and/or Cap id missing");
        }
        
        const res = await this.client.getKiosk({
            id,
            options: {
                withKioskFields: true, // this flag also returns the `kiosk` object in the response, which includes the base setup
                withListingPrices: true, // This flag enables / disables the fetching of the listing prices.
            }
        });

        return {
            id,
            cap,
            profits: Number(res.kiosk!.profits),
            listed: res.listingIds,
            items: res.items.map(item => ({
                id: item.objectId,
                type: item.type,
                display: item.data?.display,
                fields: (item.data?.content as any).fields,
            })),
        }   
    }

    async refresh(id: string = this.id, cap: string = this.cap) {
        const kioskData = await this.fetch(id, cap);
        this.setData(kioskData);
    }

    getData(): KioskData {
        return {
            id: this.id,
            cap: this.cap,
            profits: this.profits,
            listed: this.listed,
            items: this.items,
        }
    }

    setData(data: KioskData) {
        this.id = data.id;
        this.cap = data.cap;
        this.profits = data.profits;
        this.listed = data.listed;
        this.items = data.items;
    }
}