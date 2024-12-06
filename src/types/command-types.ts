import { ACCOUNT_ACTIONS } from "./constants";

export type CommandType = typeof CommandTypes[keyof typeof CommandTypes];

export const CommandTypes = {
    LockCap: `${ACCOUNT_ACTIONS.V1.slice(2)}::access_control::LockCommand`,
    ConfigMetadata: `${ACCOUNT_ACTIONS.V1.slice(2)}::config::ConfigMetadataCommand`,
} as const;