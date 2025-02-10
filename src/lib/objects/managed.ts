/// Managed assets are objects added as dynamic fields with the different interfaces

import { KioskClient, Network } from "@mysten/kiosk";
import { DynamicFieldInfo, SuiClient } from "@mysten/sui/client";
import { ManagedKeyTypes, ManagedData, Cap, Currency, UpgradePolicy, Kiosk, Vault, Df } from "./types";
import { processCurrencies } from "./dynamic-fields/currency";
import { processUpgradePolicies } from "./dynamic-fields/upgrade-policies";
import { processVaults } from "./dynamic-fields/vault";
import { processKiosks } from "./dynamic-fields/kiosk";

export class Managed implements ManagedData {
    kioskClient: KioskClient;
    caps: Cap[] = []; // cap types
    currencies: Record<string, Currency> = {}; // coinType -> currency
    kiosks: Record<string, Kiosk> = {}; // name -> Kiosk
    vaults: Record<string, Vault> = {}; // coinType -> Vault
    upgradePolicies: Record<string, UpgradePolicy> = {}; // name -> packageId

    private constructor(
        public client: SuiClient,
        public accountId: string,
    ) {
        this.client = client;
        this.kioskClient = new KioskClient({ client, network: Network.TESTNET });
        this.accountId = accountId;
    }

    static async init(client: SuiClient, accountId: string): Promise<Managed> {
        const managed = new Managed(client, accountId);
        await managed.refresh();
        return managed;
    }

    async fetch(accountId: string = this.accountId): Promise<ManagedData> {
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
        const upgradePolicyDfs = new Map<string, Df>(); // name -> df ids
        const kioskDfs = new Map<string, string>(); // name -> df id
        const vaultDfs = new Map<string, string>(); // name -> df id

        dfs.forEach(df => {
            switch (df.name.type.split("<")[0]) { // keep only package::module::structname
                case ManagedKeyTypes.Cap:
                    const capType = df.name.type.match(/<(.+?)>/)?.[1];
                    caps.push({ type: capType! });
                    break;
                case ManagedKeyTypes.TreasuryCap: {
                    const name = (df.name.value as any).name;
                    if (!currencyDfs.has(name)) {
                        currencyDfs.set(name, { capId: "", rulesId: "" });
                    }
                    currencyDfs.get(name)!.capId = df.objectId;
                    break;
                }
                case ManagedKeyTypes.CurrencyRules: {
                    const name = (df.name.value as any).name;
                    if (!currencyDfs.has(name)) {
                        currencyDfs.set(name, { capId: "", rulesId: "" });
                    }
                    currencyDfs.get(name)!.rulesId = df.objectId;
                    break;
                }
                case ManagedKeyTypes.KioskOwner: {
                    const name = (df.name.value as any).name;
                    kioskDfs.set(name, df.objectId);
                    break;
                }
                case ManagedKeyTypes.Vault: {
                    const name = (df.name.value as any).name;
                    vaultDfs.set(name, df.objectId);
                    break;
                }
                case ManagedKeyTypes.UpgradeRules: {
                    const name = (df.name.value as any).name;
                    if (!upgradePolicyDfs.has(name)) {
                        upgradePolicyDfs.set(name, { capId: "", rulesId: "" });
                    }
                    upgradePolicyDfs.get(name)!.rulesId = df.objectId;
                    break;
                }
                case ManagedKeyTypes.UpgradeCap: {
                    const name = (df.name.value as any).name;
                    if (!upgradePolicyDfs.has(name)) {
                        upgradePolicyDfs.set(name, { capId: "", rulesId: "" });
                    }
                    upgradePolicyDfs.get(name)!.capId = df.objectId;
                    break;
                }
                case ManagedKeyTypes.UpgradeIndex:
                    // do nothing
                    break;
                default:
                    console.log("Unknown dynamic field type: ", df.name.type);
            }
        });

        return {
            caps,
            currencies: await processCurrencies(this.client, currencyDfs),
            kiosks: await processKiosks(this.kioskClient, kioskDfs),
            vaults: await processVaults(this.client, vaultDfs),
            upgradePolicies: await processUpgradePolicies(this.client, upgradePolicyDfs),
        };
    }

    async refresh(accountId: string = this.accountId) {
        const managedData = await this.fetch(accountId);
        this.setData(managedData);
    }

    getData(): ManagedData {
        return {
            caps: this.caps,
            currencies: this.currencies,
            kiosks: this.kiosks,
            vaults: this.vaults,
            upgradePolicies: this.upgradePolicies,
        }
    }

    setData(data: ManagedData) {
        this.caps = data.caps;
        this.currencies = data.currencies;
        this.kiosks = data.kiosks;
        this.vaults = data.vaults;
        this.upgradePolicies = data.upgradePolicies;
    }
}
