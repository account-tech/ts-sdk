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
    V1 = "0xc08762cd4fba158150867638f1308b8d84c54420fce392b8f45984c3aad5145e",
}
export enum ACCOUNT_PROTOCOL {
    V1 = "0x16cea975ee5807af93e297491dbb68d22227861e8c793bfbf39bf5c70a4f38e2",
}
export enum ACCOUNT_CONFIG {
    V1 = "0x9515bb7d79ecbe71f051b9fb3058ecf05590d615de38f07c934b32d7cb597593",
}
export enum ACCOUNT_ACTIONS {
    V1 = "0xc44f14b2c2355191f186b5bf6296088b555b102c7589d681a9175a187a594c0b",
}
// Shared objects
export const EXTENSIONS = "0x53f128135c69b8b90151fe2fa5d58bff08bb7a0cebd4af4c0967ee96f4da426f";
export const USER_REGISTRY = "0x83ad7f451b83a67837acf1449fed8edd64433eda663e2dbce64692f24c666aa1";
// Types
export const MULTISIG_GENERICS: [string, string] = [`${ACCOUNT_CONFIG.V1}::multisig::Multisig`, `${ACCOUNT_CONFIG.V1}::multisig::Approvals`];
