/// Managed assets are objects added as dynamic fields with the different interfaces

import { KioskClient, Network } from "@mysten/kiosk";
import { DynamicFieldInfo, SuiClient } from "@mysten/sui/client";
import { UpgradeCap } from "src/.gen/_dependencies/source/0x2/package/structs";
import { CurrencyRules } from "src/.gen/account-actions/currency/structs";
import { UpgradeRules } from "src/.gen/account-actions/package-upgrade/structs";
import { Kiosk } from "./kiosk";
import { ManagedKeyTypes } from "src/types/managed-types";
import { phantom } from "src/.gen/_framework/reified";
import { Treasury } from "./treasury";

export type ManagedData = {
    caps: string[]; // cap types
    currencies: Record<string, Currency>; // coinType -> currency
    kiosks: Record<string, Kiosk>; // name -> Kiosk
    treasuries: Record<string, Treasury>; // coinType -> Treasury
    upgradePolicies: Record<string, UpgradePolicy>; // name -> upgrade & package info
}

export type Currency = {
    maxSupply: number | null;
    totalMinted: number;
    totalBurned: number;
    canMint: boolean;
    canBurn: boolean;
    canUpdateSymbol: boolean;
    canUpdateName: boolean;
    canUpdateDescription: boolean;
    canUpdateIcon: boolean;
}

export type UpgradePolicy = {
    packageId: string;
    capId: string;
    delayMs: bigint;
}

export class Managed implements ManagedData {
    kioskClient: KioskClient;
    caps: string[] = []; // cap types
    currencies: Record<string, Currency> = {}; // coinType -> currency
    kiosks: Record<string, Kiosk> = {}; // name -> Kiosk
    treasuries: Record<string, Treasury> = {}; // coinType -> Treasury
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

    async fetch(accountId: string = this.accountId): Promise<any> {
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

        let currencyRulesIds: string[] = [];
        let upgradeNameToRulesId: Record<string, string> = {};
        let upgradeNameToCapId: Record<string, string> = {};
        let vaultIdsToName: Record<string, string> = {};
        let vaultIdsToBagId: Record<string, string> = {};
        let kioskIdsToName: Record<string, string> = {};
        let kioskIdsToCap: Record<string, string> = {};
        let kioskCapToKiosk: Record<string, string> = {};

        dfs.forEach(async df => {
            switch (df.name.type.split("<")[0]) { // keep only package::module::structname
                case ManagedKeyTypes.Cap:
                    const capType = df.name.type.match(/<(.+?)>/)?.[1];
                    this.caps.push(capType!);
                    break;
                case ManagedKeyTypes.TreasuryCap:
                    // TODO: can add get the supply
                    break;
                case ManagedKeyTypes.CurrencyRules:
                    currencyRulesIds.push(df.objectId);
                    break;
                case ManagedKeyTypes.KioskOwner:
                    kioskIdsToName[df.objectId] = (df.name.value as any).name;
                    break;
                case ManagedKeyTypes.Vault:
                    vaultIdsToName[df.objectId] = (df.name.value as any).name;
                    break;
                case ManagedKeyTypes.UpgradeRules:
                    upgradeNameToRulesId[(df.name.value as any).name] = df.objectId;
                    break;
                case ManagedKeyTypes.UpgradeCap:
                    upgradeNameToCapId[(df.name.value as any).name] = df.objectId;
                    break;
                default:
                    console.log("Unknown dynamic field type: ", df.name.type);
            }
        });

        // get the currency rules
        const currencyRulesObjs = await this.client.multiGetObjects({
            ids: currencyRulesIds,
            options: { showContent: true }
        });
        currencyRulesObjs.forEach((obj: any) => {
            const coinType: string = obj.data.content.fields.name.type.split("<")[1].split(">")[0];
            const currencyRules = CurrencyRules.fromFieldsWithTypes(phantom(coinType), obj.data.content.fields.value);
            this.currencies[coinType] = {
                maxSupply: currencyRules.maxSupply ? Number(currencyRules.maxSupply) : null,
                totalMinted: Number(currencyRules.totalMinted),
                totalBurned: Number(currencyRules.totalBurned),
                canMint: currencyRules.canMint,
                canBurn: currencyRules.canBurn,
                canUpdateSymbol: currencyRules.canUpdateSymbol,
                canUpdateName: currencyRules.canUpdateName,
                canUpdateDescription: currencyRules.canUpdateDescription,
                canUpdateIcon: currencyRules.canUpdateIcon,
            }
        });

        // get the upgrade rules
        const upgradeRulesObjs = await this.client.multiGetObjects({
            ids: Object.values(upgradeNameToRulesId),
            options: { showContent: true }
        });
        const upgradeCapsObjs = await this.client.multiGetObjects({
            ids: Object.values(upgradeNameToCapId),
            options: { showContent: true }
        });
        Object.keys(upgradeNameToCapId).forEach((name: string) => {
            let ruleIdx = Object.keys(upgradeNameToCapId).findIndex(n => n === name);
            let capIdx = Object.keys(upgradeNameToCapId).findIndex(n => n === name);

            const upgradeCap = UpgradeCap.fromFieldsWithTypes((upgradeCapsObjs[capIdx].data?.content as any).fields.value);
            const upgradeRules = UpgradeRules.fromFieldsWithTypes((upgradeRulesObjs[ruleIdx].data?.content as any).fields.value);
            this.upgradePolicies[name] = {
                packageId: upgradeCap.package,
                capId: upgradeCap.id,
                delayMs: upgradeRules.delayMs,
            }
        });

        // get the vaults with their bags of coins
        const vaultStructs = await this.client.multiGetObjects({
            ids: Object.keys(vaultIdsToName),
            options: { showContent: true }
        });
        vaultStructs.forEach(v => vaultIdsToBagId[v.data!.objectId] = (v.data?.content as any).fields.value.fields.bag.fields.id.id);
        const vaults = await Promise.all(Object.values(vaultIdsToBagId).map(async bagId => {
            return await Treasury.init(this.client, bagId);
        }));
        vaults.forEach(vault => {
            this.treasuries[vaultIdsToName[vault.bagId]] = vault;
        });

        // get the kiosks and construct the classes
        const kioskCapObjs = await this.client.multiGetObjects({
            ids: Object.keys(kioskIdsToName),
            options: { showContent: true }
        });
        kioskCapObjs.forEach(obj => {
            const kioskCap = (obj.data!.content as any).fields;
            kioskIdsToCap[obj.data!.objectId] = kioskCap.id.id;
            kioskCapToKiosk[kioskCap.id.id] = kioskCap.for;
        });
        const kiosks = await Promise.all(Object.keys(kioskCapToKiosk).map(async kioskCapId => {
            return await Kiosk.init(this.kioskClient, kioskCapToKiosk[kioskCapId], kioskCapId);
        }));
        Object.keys(kioskIdsToName).forEach(kioskId => {
            const kiosk = kiosks.find(kiosk => kioskIdsToCap[kioskId] === kiosk.cap);
            if (!kiosk) throw new Error(`Kiosk not found for id ${kioskId}`);
            this.kiosks[kioskIdsToName[kioskId]] = kiosk;
        });
    }

    async refresh(accountId: string = this.accountId) {
        await this.fetch(accountId);
    }
}