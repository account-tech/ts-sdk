import { Intent } from "./intent";
import { BorrowCapIntent } from "./account-actions/access-control";
import { ConfigDepsIntent } from "./account-actions/config";
import { DisableRulesIntent, UpdateMetadataIntent, MintAndTransferIntent, MintAndVestIntent, WithdrawAndBurnIntent } from "./account-actions/currency";
import { ConfigMultisigIntent } from "./account-actions/multisig";
import { ACCOUNT_ACTIONS, ACCOUNT_CONFIG, ACCOUNT_PROTOCOL } from "../../types/constants";
import { ListNftsIntent, TakeNftsIntent } from "./account-actions/kiosk";
import { WithdrawAndTransferIntent, WithdrawAndTransferToVaultIntent, WithdrawAndVestIntent } from "./account-actions/owned";
import { SpendAndTransferIntent, SpendAndVestIntent } from "./account-actions/vault";
import { UpgradePackageIntent, RestrictPolicyIntent } from "./account-actions/package-upgrade";
import { Dep } from "../account/account";
import { Threshold, Member } from "../account/configs/multisig";

export type IntentType = typeof IntentTypes[keyof typeof IntentTypes];

export const IntentTypes = {
    // Protocol
    ConfigDeps: `${ACCOUNT_PROTOCOL.V1.slice(2)}::config::ConfigDepsIntent`,
    // Config
    ConfigMultisig: `${ACCOUNT_CONFIG.V1.slice(2)}::multisig::ConfigMultisigIntent`,
    // Actions
    BorrowCap: `${ACCOUNT_ACTIONS.V1.slice(2)}::access_control_intents::BorrowCapIntent`,

    DisableRules: `${ACCOUNT_ACTIONS.V1.slice(2)}::currency_intents::DisableRulesIntent`,
    UpdateMetadata: `${ACCOUNT_ACTIONS.V1.slice(2)}::currency_intents::UpdateMetadataIntent`,
    MintAndTransfer: `${ACCOUNT_ACTIONS.V1.slice(2)}::currency_intents::MintAndTransferIntent`,
    MintAndVest: `${ACCOUNT_ACTIONS.V1.slice(2)}::currency_intents::MintAndVestIntent`,
    WithdrawAndBurn: `${ACCOUNT_ACTIONS.V1.slice(2)}::currency_intents::WithdrawAndBurnIntent`,

    TakeNfts: `${ACCOUNT_ACTIONS.V1.slice(2)}::kiosk_intents::TakeNftsIntent`,
    ListNfts: `${ACCOUNT_ACTIONS.V1.slice(2)}::kiosk_intents::ListNftsIntent`,

    WithdrawAndTransferToVault: `${ACCOUNT_ACTIONS.V1.slice(2)}::owned_intents::WithdrawAndTransferToVaultIntent`,
    WithdrawAndTransfer: `${ACCOUNT_ACTIONS.V1.slice(2)}::owned_intents::WithdrawAndTransferIntent`,
    WithdrawAndVest: `${ACCOUNT_ACTIONS.V1.slice(2)}::owned_intents::WithdrawAndVestIntent`,

    UpgradePackage: `${ACCOUNT_ACTIONS.V1.slice(2)}::package_upgrade_intents::UpgradePackageIntent`,
    RestrictPolicy: `${ACCOUNT_ACTIONS.V1.slice(2)}::package_upgrade_intents::RestrictPolicyIntent`,

    SpendAndTransfer: `${ACCOUNT_ACTIONS.V1.slice(2)}::vault_intents::SpendAndTransferIntent`,
    SpendAndVest: `${ACCOUNT_ACTIONS.V1.slice(2)}::vault_intents::SpendAndVestIntent`,
} as const;

export const intentRegistry: Record<IntentType, typeof Intent> = {
    [IntentTypes.ConfigDeps]: ConfigDepsIntent,
    [IntentTypes.ConfigMultisig]: ConfigMultisigIntent,

    [IntentTypes.BorrowCap]: BorrowCapIntent,

    [IntentTypes.DisableRules]: DisableRulesIntent,
    [IntentTypes.UpdateMetadata]: UpdateMetadataIntent,
    [IntentTypes.MintAndTransfer]: MintAndTransferIntent,
    [IntentTypes.MintAndVest]: MintAndVestIntent,
    [IntentTypes.WithdrawAndBurn]: WithdrawAndBurnIntent,

    [IntentTypes.TakeNfts]: TakeNftsIntent,
    [IntentTypes.ListNfts]: ListNftsIntent,

    [IntentTypes.WithdrawAndTransferToVault]: WithdrawAndTransferToVaultIntent,
    [IntentTypes.WithdrawAndTransfer]: WithdrawAndTransferIntent,
    [IntentTypes.WithdrawAndVest]: WithdrawAndVestIntent,

    [IntentTypes.UpgradePackage]: UpgradePackageIntent,
    [IntentTypes.RestrictPolicy]: RestrictPolicyIntent,

    [IntentTypes.SpendAndTransfer]: SpendAndTransferIntent,
    [IntentTypes.SpendAndVest]: SpendAndVestIntent,
} as const;

export enum IntentStatus {
    Pending, // can be approved
    Approved, // has been approved by user but cannot be executed because execution time not reached
    Executable, // can be executed because execution time reached, and threshold reached or reachable by user
    Expired, // can be deleted because expiration time reached 
}

export type Issuer = {
    accountAddr: string;
    intentType: string;
}

export type IntentFields = {
    issuer: Issuer;
    key: string;
    description: string;
    executionTimes: bigint[];
    expirationTime: bigint;
    role: string;
    actionsId: string;
}

export type IntentArgs = {
    key: string;
    description?: string;
    executionTimes?: bigint[];
    expirationTime?: bigint;
}

export type ActionsArgs =
    ConfigDepsArgs | ToggleUnverifiedAllowedArgs | ConfigMultisigArgs |
    BorrowCapArgs |
    DisableRulesArgs | UpdateMetadataArgs | MintAndTransferArgs | MintAndVestArgs | WithdrawAndBurnArgs |
    TakeNftsArgs | ListNftsArgs |
    WithdrawAndTransferToVaultArgs | WithdrawAndTransferArgs | WithdrawAndVestArgs |
    SpendAndTransferArgs | SpendAndVestArgs |
    UpgradePackageArgs | RestrictPolicyArgs;

export type ConfigDepsArgs = {
    deps: Dep[];
}

export type ToggleUnverifiedAllowedArgs = {
    newValue?: boolean;
}

export type ConfigMultisigArgs = {
    members?: Member[];
    thresholds?: { global: number, roles: Threshold[] };
}

export type BorrowCapArgs = {
    capType: string;
}

export type DisableRulesArgs = {
    coinType: string;
    mint: boolean;
    burn: boolean;
    updateSymbol: boolean;
    updateName: boolean;
    updateDescription: boolean;
    updateIcon: boolean;
}

export type UpdateMetadataArgs = {
    coinType: string;
    name: string | null;
    symbol: string | null;
    description: string | null;
    icon: string | null;
}

export type MintAndTransferArgs = {
    coinType: string;
    transfers: { amount: bigint, recipient: string }[];
}

export type MintAndVestArgs = {
    coinType: string;
    amount: bigint;
    start: bigint; // ms
    end: bigint; // ms
    recipient: string;
}

export type WithdrawAndBurnArgs = {
    coinType: string;
    coinId: string;
    amount: bigint;
}

export type TakeNftsArgs = {
    kioskName: string;
    nftIds: string[];
    recipient: string;
}

export type ListNftsArgs = {
    kioskName: string;
    listings: { nftId: string, price: bigint }[];
}

export type WithdrawAndTransferToVaultArgs = {
    coinType: string;
    coinId: string;
    coinAmount: bigint;
    vaultName: string;
}

export type WithdrawAndTransferArgs = {
    transfers: { objectId: string, recipient: string }[];
}

export type WithdrawAndVestArgs = {
    coinId: string;
    start: bigint;
    end: bigint;
    recipient: string;
}

export type SpendAndTransferArgs = {
    treasuryName: string;
    coinType: string;
    transfers: { amount: bigint, recipient: string }[];
}

export type SpendAndVestArgs = {
    treasuryName: string;
    coinType: string;
    amount: bigint;
    start: bigint;
    end: bigint;
    recipient: string;
}

export type UpgradePackageArgs = {
    packageName: string;
    digest: number[];
}

export type RestrictPolicyArgs = {
    packageName: string;
    policy: number;
}