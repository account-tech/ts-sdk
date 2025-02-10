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
    V1 = "0x97ea2592e9f0ab8a44110dc84c21649139629e31f9b4c8c570753e81fc290fae",
}
export enum ACCOUNT_PROTOCOL {
    V1 = "0xe10f24a9d1f429ebfe37b4960912eaab95263dccd1db8dc71aeede8572525cf3",
}
export enum ACCOUNT_CONFIG {
    V1 = "0x4c3baa44a51df0b52e647321d77be622dd1d7e681089c77967925d06553d462b",
}
export enum ACCOUNT_ACTIONS {
    V1 = "0x5f9e3d054fe82b8cb3715754ada32135b8e7f2c1a063210878a2451c93fe9131",
}
// Shared objects
export const EXTENSIONS = "0x096daced37dd9ea69dbdead4a44cef317ff3a356dff0c00fa6a6eb1c6144f472";
export const USER_REGISTRY = "0xf26522416891e35212bfea482bc1efad4b44171ce288166231f62013202180e9";
// Types
export const MULTISIG_GENERICS: [string, string] = [`${ACCOUNT_CONFIG.V1}::multisig::Multisig`, `${ACCOUNT_CONFIG.V1}::multisig::Approvals`];
