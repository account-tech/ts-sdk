// Sui packages and objects
export const MOVE_STDLIB = "0x0000000000000000000000000000000000000000000000000000000000000001";
export const SUI_FRAMEWORK = "0x0000000000000000000000000000000000000000000000000000000000000002";
export const CLOCK = "0x0000000000000000000000000000000000000000000000000000000000000006";
export const SUI_SYSTEM_STATE_INNER = "0x5b890eaf2abcfa2ab90b77b8e6f3d5d8609586c3e583baf3dccd5af17edf48d1";
// SuiNS packages and objects
export const contractObjects = {
    packageId: '0xfdba31b34a43e058f17c5cf4b12d9b9e0a08c0623d8569092c022e0c77df46d3',
    registry: '0xac06695279c2a92436068cebe5ea778135ac503337642e27493431603ae6a71d',
    reverseRegistry: '0x34a36dd204f8351a157d19b87bada9d448ec40229d56f22bff04fa23713a5c31',
    suins: '0x4acaf19db12fafce1943bbd44c7f794e1d81d00aeb63617096e5caa39499ba88',
}
// TransferPolicy Rules
export const TRANSFER_POLICY_RULES = [
    'a82212d931d3bc7c3401552d935abced7b7fd41d4f57a99f0f47b9196b2f57f5::kiosk_lock_rule::Rule',
    'a82212d931d3bc7c3401552d935abced7b7fd41d4f57a99f0f47b9196b2f57f5::royalty_rule::Rule',
    'a82212d931d3bc7c3401552d935abced7b7fd41d4f57a99f0f47b9196b2f57f5::personal_kiosk_rule::Rule'
];
// Account.tech Published Packages
export enum ACCOUNT_EXTENSIONS {
    V1 = "0x6e4d4fd65ffc3e7b09969bcfc34d4ec0b5bd640279f0027849884af404e9bc09",
}
export enum ACCOUNT_PROTOCOL {
    V1 = "0x77a39df37fab5b6d47c9976f114ef1ac21313edee5a446135c08fdbaf615b623",
}
export enum ACCOUNT_ACTIONS {
    V1 = "0x47f40cba7b543409155238c9ddd0914f2d9f1bd69ebd2116a32dd667da0f4aab",
}
// Shared objects
export const EXTENSIONS = "0x519268651fbc7b3714db3ea0ec6c06ec707e6bb0788559852e1d61bd60c192d1";
export const USER_REGISTRY = "0xf0535de74eb05b832755ff9bc58f6eaf52c48fa72442727dc41f81953b5a4be5";