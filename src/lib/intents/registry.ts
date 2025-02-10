import { Intent } from "./intent";
import { IntentTypes, IntentType } from "./types";
import { BorrowCapIntent } from "./account-actions/access-control";
import { ConfigDepsIntent, ToggleUnverifiedAllowedIntent } from "./account-actions/config";
import { DisableRulesIntent, UpdateMetadataIntent, MintAndTransferIntent, MintAndVestIntent, WithdrawAndBurnIntent } from "./account-actions/currency";
import { TakeNftsIntent, ListNftsIntent } from "./account-actions/kiosk";
import { ConfigMultisigIntent } from "./account-actions/multisig";
import { WithdrawAndTransferToVaultIntent, WithdrawAndVestIntent, WithdrawAndTransferIntent } from "./account-actions/owned";
import { UpgradePackageIntent, RestrictPolicyIntent } from "./account-actions/package-upgrade";
import { SpendAndTransferIntent, SpendAndVestIntent } from "./account-actions/vault";

export const intentRegistry: Record<IntentType, typeof Intent> = {
    [IntentTypes.ConfigDeps]: ConfigDepsIntent,
    [IntentTypes.ToggleUnverifiedAllowed]: ToggleUnverifiedAllowedIntent,
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