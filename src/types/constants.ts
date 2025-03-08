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
    V1 = "0x94308db2bb8510fe049a2753e1f05ab46c94c8f1e5bd5f163d5173318a3a3d30",
}
export enum ACCOUNT_PROTOCOL {
    V1 = "0x378bf5c9174a33e4669c95d8e22231c7739b333d97b2a876e6734f755e72ee56",
}
export enum ACCOUNT_MULTISIG {
    V1 = "0xceacdcf1d8aeb17acb0ad695d2229b818cef98b4fbed673db84ee64ec4b24e86",
}
export enum ACCOUNT_ACTIONS {
    V1 = "0x730a9f336be5b66cc221eb8d5030ee2c65838aad95c7c5a1082733bea9dc2f3d",
}
// Shared objects
export const EXTENSIONS = "0xf4b314447da092b619a8cde4ef13bc40e5ecd0fd30622aab08782301b541e871";
export const USER_REGISTRY = "0x24697c64cc1cff77177866c5a1c20aacb346b6f83c5ac9b738c2beaf6db534cb";
// Types
export const MULTISIG_GENERICS: [string, string] = [`${ACCOUNT_MULTISIG.V1}::multisig::Multisig`, `${ACCOUNT_MULTISIG.V1}::multisig::Approvals`];
