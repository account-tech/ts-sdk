import { SuiClient, SuiMoveObject } from "@mysten/sui/client";
import { OwnedData, Coin, Nft, OtherObj } from "./types";

export class Owned implements OwnedData {
    coins: Coin[] = [];
    nfts: Nft[] = [];
    objects: OtherObj[] = [];

    private constructor(
        public client: SuiClient,
        public accountId: string,
    ) { }

    static async init(client: SuiClient, accountId: string): Promise<Owned> {
        const owned = new Owned(client, accountId);
        await owned.refresh();
        return owned;
    }

    async fetch(accountId: string = this.accountId): Promise<OwnedData> {
        if (!accountId && !this.accountId) {
            throw new Error("Multisig address missing");
        }

        const { data } = await this.client.getOwnedObjects({
            owner: accountId,
            options: { showContent: true, showType: true, showDisplay: true }
        });

        const coinMap = new Map<string, Coin>(); // type -> Coin
        const nfts: Nft[] = [];
        const objects: OtherObj[] = [];

        data.forEach(obj => {
            if (!obj.data?.type || !obj.data?.objectId) return;

            // Check if it's a Coin
            if (obj.data.type.startsWith("0x2::coin::Coin")) {
                const type = obj.data.type.match(/<([^>]*)>/)![1];
                if (!coinMap.has(type)) {
                    coinMap.set(type, {
                        type,
                        ids: [],
                        amount: 0n
                    });
                }
                const coin = coinMap.get(type)!;
                coin.ids.push(obj.data.objectId);
                coin.amount += BigInt((obj.data?.content as any).fields.balance);
            }
            // Check if it's a "visual" NFT
            else if (obj.data.display) {
                const display = obj.data.display;
                nfts.push({
                    type: obj.data.type,
                    id: obj.data.objectId,
                    name: display?.data?.name ?? "",
                    image: display?.data?.image_url ?? "" // TODO: add default
                });
            }
            // Everything else goes to objects
            else {
                objects.push({
                    type: obj.data.type,
                    id: obj.data.objectId,
                    fields: Object.fromEntries(Object.entries((obj.data.content as SuiMoveObject).fields ?? {}).filter(([key]) => key !== 'id'))
                });
            }
        });

        return {
            coins: Array.from(coinMap.values()).sort((a, b) => a.type.localeCompare(b.type)),
            nfts: nfts.sort((a, b) => a.type.localeCompare(b.type)),
            objects: objects.sort((a, b) => a.type.localeCompare(b.type))
        };
    }

    async refresh(accountId: string = this.accountId) {
        const ownedData = await this.fetch(accountId);
        this.setData(ownedData);
    }

    getData(): OwnedData {
        return {
            coins: this.coins,
            nfts: this.nfts,
            objects: this.objects
        };
    }

    setData(data: OwnedData) {
        this.coins = data.coins;
        this.nfts = data.nfts;
        this.objects = data.objects;
    }
}