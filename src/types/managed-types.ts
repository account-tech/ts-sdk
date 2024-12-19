import { ACCOUNT_ACTIONS } from "./constants";

export type ManagedKeyType = typeof ManagedKeyTypes[keyof typeof ManagedKeyTypes];

export const ManagedKeyTypes = {
    Cap: `${ACCOUNT_ACTIONS.V1}::access_control::CapKey`,
    TreasuryCap: `${ACCOUNT_ACTIONS.V1}::currency::TreasuryCapKey`,
    CurrencyRules: `${ACCOUNT_ACTIONS.V1}::currency::CurrencyRulesKey`,
    KioskOwner: `${ACCOUNT_ACTIONS.V1}::kiosk::KioskOwnerKey`,
    Treasury: `${ACCOUNT_ACTIONS.V1}::treasury::TreasuryKey`,
    UpgradeCap: `${ACCOUNT_ACTIONS.V1}::upgrade_policies::UpgradeCapKey`,
    UpgradeRules: `${ACCOUNT_ACTIONS.V1}::upgrade_policies::UpgradeRulesKey`,
} as const;
