import { ACCOUNT_ACTIONS } from "./constants";

export type ManagedKeyType = typeof ManagedKeyTypes[keyof typeof ManagedKeyTypes];

export const ManagedKeyTypes = {
    Cap: `${ACCOUNT_ACTIONS.V1}::access_control::CapKey`,
    TreasuryCap: `${ACCOUNT_ACTIONS.V1}::currency::TreasuryCapKey`,
    CurrencyRules: `${ACCOUNT_ACTIONS.V1}::currency::CurrencyRulesKey`,
    KioskOwner: `${ACCOUNT_ACTIONS.V1}::kiosk::KioskOwnerKey`,
    Vault: `${ACCOUNT_ACTIONS.V1}::vault::VaultKey`,
    UpgradeCap: `${ACCOUNT_ACTIONS.V1}::package_upgrade::UpgradeCapKey`,
    UpgradeRules: `${ACCOUNT_ACTIONS.V1}::package_upgrade::UpgradeRulesKey`,
} as const;
