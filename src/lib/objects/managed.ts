/// Managed assets are objects added as dynamic fields with the different interfaces

import { KioskClient, Network } from "@mysten/kiosk";
import { DynamicFieldInfo, SuiClient } from "@mysten/sui/client";
import { ManagedKeyTypes, ManagedData, Cap, Currency, Kiosk, Vault, Df, Package } from "./types";
import { processCurrencies } from "./dynamic-fields/currencies";
import { processPackages } from "./dynamic-fields/packages";
import { processVaults } from "./dynamic-fields/vaults";
import { processKiosks } from "./dynamic-fields/kiosks";

export class Managed implements ManagedData {
    kioskClient: KioskClient;
    caps: Cap[] = []; // cap types
    currencies: Record<string, Currency> = {}; // coinType -> currency
    kiosks: Record<string, Kiosk> = {}; // name -> Kiosk
    vaults: Record<string, Vault> = {}; // coinType -> Vault
    packages: Record<string, Package> = {}; // name -> packageId

    private constructor(
        public client: SuiClient,
        public accountId: string,
    ) {
        this.client = client;
        this.kioskClient = new KioskClient({ client, network: Network.TESTNET });
        this.accountId = accountId;
    }

    static async init(client: SuiClient, accountId: string, assets?: string[]): Promise<Managed> {
        const managed = new Managed(client, accountId);
        await managed.refresh(accountId, assets);
        return managed;
    }

    async fetch(accountId: string = this.accountId, assets?: string[]): Promise<ManagedData> {
        if (!accountId && !this.accountId) {
            throw new Error("Account id missing");
        }

        let dfs: DynamicFieldInfo[] = [];
        let data: DynamicFieldInfo[];
        let nextCursor: string | null = null;
        let hasNextPage = true;
        while (hasNextPage) {
            ({ data, nextCursor, hasNextPage } = await this.client.getDynamicFields({
                parentId: accountId,
                cursor: nextCursor
            }));
            dfs.push(...data);
            nextCursor = nextCursor;
        }

        let caps: Cap[] = []; // cap types
        const currencyDfs = new Map<string, Df>(); // name -> df ids
        const packagesDfs = new Map<string, Df>(); // name -> df ids
        const kioskDfs = new Map<string, string>(); // name -> df id
        const vaultDfs = new Map<string, string>(); // name -> df id

        dfs.forEach(df => {
            switch (df.name.type.split("<")[0]) { // keep only package::module::structname
                case ManagedKeyTypes.Cap:
                    const capType = df.name.type.match(/<(.+?)>/)?.[1];
                    caps.push({ type: capType! });
                    break;
                case ManagedKeyTypes.TreasuryCap: {
                    const name = (df.name.value as any).pos0;
                    if (!currencyDfs.has(name)) {
                        currencyDfs.set(name, { capId: "", rulesId: "" });
                    }
                    currencyDfs.get(name)!.capId = df.objectId;
                    break;
                }
                case ManagedKeyTypes.CurrencyRules: {
                    const name = (df.name.value as any).pos0;
                    if (!currencyDfs.has(name)) {
                        currencyDfs.set(name, { capId: "", rulesId: "" });
                    }
                    currencyDfs.get(name)!.rulesId = df.objectId;
                    break;
                }
                case ManagedKeyTypes.KioskOwner: {
                    const name = (df.name.value as any).pos0;
                    kioskDfs.set(name, df.objectId);
                    break;
                }
                case ManagedKeyTypes.Vault: {
                    const name = (df.name.value as any).pos0;
                    vaultDfs.set(name, df.objectId);
                    break;
                }
                case ManagedKeyTypes.UpgradeRules: {
                    const name = (df.name.value as any).pos0;
                    if (!packagesDfs.has(name)) {
                        packagesDfs.set(name, { capId: "", rulesId: "" });
                    }
                    packagesDfs.get(name)!.rulesId = df.objectId;
                    break;
                }
                case ManagedKeyTypes.UpgradeCap: {
                    const name = (df.name.value as any).pos0;
                    if (!packagesDfs.has(name)) {
                        packagesDfs.set(name, { capId: "", rulesId: "" });
                    }
                    packagesDfs.get(name)!.capId = df.objectId;
                    break;
                }
                case ManagedKeyTypes.UpgradeIndex:
                    // do nothing
                    break;
                default:
                    console.log("Unknown dynamic field type: ", df.name.type);
            }
        });

        if (assets && assets.length > 0) {
            const result: Partial<ManagedData> = { caps };
            if (assets.includes('currencies') && currencyDfs.size > 0) {
                result.currencies = await processCurrencies(this.client, currencyDfs);
            }
            if (assets.includes('kiosks') && kioskDfs.size > 0) {
                result.kiosks = await processKiosks(this.kioskClient, kioskDfs);
            }
            if (assets.includes('vaults') && vaultDfs.size > 0) {
                result.vaults = await processVaults(this.client, vaultDfs);
            }
            if (assets.includes('packages') && packagesDfs.size > 0) {
                result.packages = await processPackages(this.client, packagesDfs);
            }
            return result as ManagedData;
        }

        return {
            caps,
            currencies: await processCurrencies(this.client, currencyDfs),
            kiosks: await processKiosks(this.kioskClient, kioskDfs),
            vaults: await processVaults(this.client, vaultDfs),
            packages: await processPackages(this.client, packagesDfs),
        };
    }

    async refresh(accountId: string = this.accountId, assets?: string[]) {
        const managedData = await this.fetch(accountId, assets);
        this.setData(managedData);
    }

    getData(): ManagedData {
        return {
            caps: this.caps,
            currencies: this.currencies,
            kiosks: this.kiosks,
            vaults: this.vaults,
            packages: this.packages,
        }
    }

    setData(data: ManagedData) {
        this.caps = data.caps;
        this.currencies = data.currencies;
        this.kiosks = data.kiosks;
        this.vaults = data.vaults;
        this.packages = data.packages;
    }
}
