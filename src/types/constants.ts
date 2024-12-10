// Sui packages and objects
export const STDLIB = "0x0000000000000000000000000000000000000000000000000000000000000001";
export const FRAMEWORK = "0x0000000000000000000000000000000000000000000000000000000000000002";
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
    V1 = "0xbe976e1f23930ad6150dad9b50eb9ccc01466da36b54ad88bd43a77c66ea70bb",
}
export enum ACCOUNT_PROTOCOL {
    V1 = "0x1696024b7ab7419127bbc671bcd216e9a740103bfcb7bf22d8684b36f824ab75",
}
export enum ACCOUNT_CONFIG {
    V1 = "0x24fc7f9bb5edbf709f56db3116ba9c5c8260a911090b141f52c0b02a70758b9b",
}
export enum ACCOUNT_ACTIONS {
    V1 = "0x008a7663da8c03440130edf937fbbc75aee6d624d2171a9dea0dc8c4827336cf",
}
// Shared objects
export const EXTENSIONS = "0xf15ab5a51d8e449155aa338f0f4ab85e320db092a2bb7c8e0f732727705cad08";
export const USER_REGISTRY = "0x79b3822459ac2fd7d25e61c90c84a62088ade86ed0a050610ad856b2d38b273b";
// Types
export const MULTISIG_GENERICS: [string, string] = [`${ACCOUNT_CONFIG.V1}::multisig::Multisig`, `${ACCOUNT_CONFIG.V1}::multisig::Approvals`];
