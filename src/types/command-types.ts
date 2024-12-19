import { ACCOUNT_ACTIONS } from "./constants";

export type CommandType = typeof CommandTypes[keyof typeof CommandTypes];

export const CommandTypes = {
    LockCap: `${ACCOUNT_ACTIONS.V1.slice(2)}::access_control::LockCommand`,
    ConfigMetadata: `${ACCOUNT_ACTIONS.V1.slice(2)}::config::ConfigMetadataCommand`,
    LockTreasuryCap: `${ACCOUNT_ACTIONS.V1.slice(2)}::currency::LockCommand`,
    Kiosk: `${ACCOUNT_ACTIONS.V1.slice(2)}::kiosk::KioskCommand`,
    Place: `${ACCOUNT_ACTIONS.V1.slice(2)}::kiosk::PlaceCommand`,
    Delist: `${ACCOUNT_ACTIONS.V1.slice(2)}::kiosk::DelistCommand`,
    Treasury: `${ACCOUNT_ACTIONS.V1.slice(2)}::treasury::TreasuryCommand`,
    Deposit: `${ACCOUNT_ACTIONS.V1.slice(2)}::treasury::DepositCommand`,
    LockUpgradeCap: `${ACCOUNT_ACTIONS.V1.slice(2)}::upgrade_policies::LockCommand`,
} as const;
