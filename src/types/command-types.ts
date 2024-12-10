import { ACCOUNT_ACTIONS } from "./constants";

export type CommandType = typeof CommandTypes[keyof typeof CommandTypes];

export const CommandTypes = {
    LockCap: `${ACCOUNT_ACTIONS.V1.slice(2)}::access_control::LockCommand`,
    ConfigMetadata: `${ACCOUNT_ACTIONS.V1.slice(2)}::config::ConfigMetadataCommand`,
    LockTreasuryCap: `${ACCOUNT_ACTIONS.V1.slice(2)}::currency::LockCommand`,
    Kiosk: `${ACCOUNT_ACTIONS.V1.slice(2)}::kiosk::KioskCommand`,
    Place: (kioskName: string) => `${ACCOUNT_ACTIONS.V1.slice(2)}::kiosk::PlaceCommand::${kioskName}`,
    Delist: (kioskName: string) => `${ACCOUNT_ACTIONS.V1.slice(2)}::kiosk::DelistCommand::${kioskName}`,
    Treasury: `${ACCOUNT_ACTIONS.V1.slice(2)}::currency::TreasuryCommand`,
    Deposit: (treasuryName: string) => `${ACCOUNT_ACTIONS.V1.slice(2)}::currency::DepositCommand::${treasuryName}`,
    LockUpgradeCap: `${ACCOUNT_ACTIONS.V1.slice(2)}::upgrade_policies::LockCommand`,
} as const;
