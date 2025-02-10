import { ACCOUNT_ACTIONS } from "../../types/constants";

export type ManagedKeyType = typeof ManagedKeyTypes[keyof typeof ManagedKeyTypes];

export const ManagedKeyTypes = {
    Cap: `${ACCOUNT_ACTIONS.V1}::access_control::CapKey`,
    TreasuryCap: `${ACCOUNT_ACTIONS.V1}::currency::TreasuryCapKey`,
    CurrencyRules: `${ACCOUNT_ACTIONS.V1}::currency::CurrencyRulesKey`,
    KioskOwner: `${ACCOUNT_ACTIONS.V1}::kiosk::KioskOwnerKey`,
    Vault: `${ACCOUNT_ACTIONS.V1}::vault::VaultKey`,
    UpgradeCap: `${ACCOUNT_ACTIONS.V1}::package_upgrade::UpgradeCapKey`,
    UpgradeRules: `${ACCOUNT_ACTIONS.V1}::package_upgrade::UpgradeRulesKey`,
    UpgradeIndex: `${ACCOUNT_ACTIONS.V1}::package_upgrade::UpgradeIndexKey`,
} as const;

export type Df = {
    capId: string;
    rulesId: string;
}

export type ManagedData = {
    caps: Cap[]; // cap types
    currencies: Record<string, Currency>; // coinType -> currency
    kiosks: Record<string, Kiosk>; // name -> Kiosk
    vaults: Record<string, Vault>; // coinType -> Vault
    upgradePolicies: Record<string, UpgradePolicy>; // name -> upgrade & package info
}

export type Cap = {
    type: string;
}

export type Currency = {
    currentSupply: bigint;
    // rules
    maxSupply: bigint | null;
    totalMinted: bigint;
    totalBurned: bigint;
    canMint: boolean;
    canBurn: boolean;
    canUpdateSymbol: boolean;
    canUpdateName: boolean;
    canUpdateDescription: boolean;
    canUpdateIcon: boolean;
}

export type Item = {
    type: string;
    display: any; // null if no Display object for the type
    id: string;
    fields: any;
}

export type Kiosk = {
    id: string;
    cap: string;
    profits: bigint;
    items: Item[];
    listed: string[];
}

export type Vault = {
    coins: Record<string, bigint>;
}

export type UpgradePolicy = {
    packageId: string;
    capId: string;
    delayMs: bigint;
}