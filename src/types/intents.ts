import { ACCOUNT_PROTOCOL, ACCOUNT_MULTISIG, ACCOUNT_ACTIONS } from "./constants";
import { Intent } from "../lib";
import * as AccountActions from "../lib/intents/account-actions";

// Composable types

export type ProtocolIntentType = typeof ProtocolIntentTypes[keyof typeof ProtocolIntentTypes];  
export type MultisigIntentType = typeof MultisigIntentTypes[keyof typeof MultisigIntentTypes];
export type ActionsIntentType = typeof ActionsIntentTypes[keyof typeof ActionsIntentTypes];

export const ProtocolIntentTypes = {
    ConfigDeps: `${ACCOUNT_PROTOCOL.V1.slice(2)}::config::ConfigDepsIntent`,
    ToggleUnverifiedAllowed: `${ACCOUNT_PROTOCOL.V1.slice(2)}::config::ToggleUnverifiedAllowedIntent`,
} as const;

export const MultisigIntentTypes = {
    ConfigMultisig: `${ACCOUNT_MULTISIG.V1.slice(2)}::config::ConfigMultisigIntent`,
} as const;

export const ActionsIntentTypes = {
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

// Types for clients 

export type AccountMultisigIntentType = typeof AccountMultisigIntentTypes[keyof typeof AccountMultisigIntentTypes];

export const AccountMultisigIntentTypes = {
    ...ProtocolIntentTypes,
    ...MultisigIntentTypes,
    ...ActionsIntentTypes,
} as const;

export const AccountMultisigIntentRegistry: Record<AccountMultisigIntentType, typeof Intent> = {
    [AccountMultisigIntentTypes.ConfigDeps]: AccountActions.ConfigDepsIntent,
    [AccountMultisigIntentTypes.ToggleUnverifiedAllowed]: AccountActions.ToggleUnverifiedAllowedIntent,
    [AccountMultisigIntentTypes.ConfigMultisig]: AccountActions.ConfigMultisigIntent,

    [AccountMultisigIntentTypes.BorrowCap]: AccountActions.BorrowCapIntent,

    [AccountMultisigIntentTypes.DisableRules]: AccountActions.DisableRulesIntent,
    [AccountMultisigIntentTypes.UpdateMetadata]: AccountActions.UpdateMetadataIntent,
    [AccountMultisigIntentTypes.MintAndTransfer]: AccountActions.MintAndTransferIntent,
    [AccountMultisigIntentTypes.MintAndVest]: AccountActions.MintAndVestIntent,
    [AccountMultisigIntentTypes.WithdrawAndBurn]: AccountActions.WithdrawAndBurnIntent,

    [AccountMultisigIntentTypes.TakeNfts]: AccountActions.TakeNftsIntent,
    [AccountMultisigIntentTypes.ListNfts]: AccountActions.ListNftsIntent,

    [AccountMultisigIntentTypes.WithdrawAndTransferToVault]: AccountActions.WithdrawAndTransferToVaultIntent,
    [AccountMultisigIntentTypes.WithdrawAndTransfer]: AccountActions.WithdrawAndTransferIntent,
    [AccountMultisigIntentTypes.WithdrawAndVest]: AccountActions.WithdrawAndVestIntent,

    [AccountMultisigIntentTypes.UpgradePackage]: AccountActions.UpgradePackageIntent,
    [AccountMultisigIntentTypes.RestrictPolicy]: AccountActions.RestrictPolicyIntent,

    [AccountMultisigIntentTypes.SpendAndTransfer]: AccountActions.SpendAndTransferIntent,
    [AccountMultisigIntentTypes.SpendAndVest]: AccountActions.SpendAndVestIntent,
} as const;