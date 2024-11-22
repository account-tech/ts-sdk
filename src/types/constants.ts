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
// Account.tech Published Packages
export enum ACCOUNT_EXTENSIONS {
    V1 = "0xc796940575f9cc85c2b7773907767be737bcc08e8df8d25f7b4a1e23cd83f86d",
}
export enum ACCOUNT_PROTOCOL {
    V1 = "0xf5e80b75b4da9656c3e5bf4de7cd5904f6892050c707d84f2f17fcb55f429ecc",
}
export enum ACCOUNT_CONFIG {
    V1 = "0x8f56ea68e62a1dae01474fa14ac5f1b7d18e329bb7a1c9ae436ed4001b10cc83",
}
export enum ACCOUNT_ACTIONS {
    V1 = "0xf9ebf7a79462158e222d23e68325817fbbc37104b10c4651e7a9b6966619e3a6",
}
// Shared objects
export const EXTENSIONS = "0xea0710456b2a2422474fe4aaa4a1c4025ac9372441fdb7917edf3637fc6fe8ab";
export const USER_REGISTRY = "0x40c1b76fface320427b2022fb25ecfdcaa4b229c677f36481e6cb0575af9a8c8";
// Types
export const MULTISIG_GENERICS: [string, string] = [`${ACCOUNT_CONFIG.V1}::multisig::Multisig`, `${ACCOUNT_CONFIG.V1}::multisig::Approvals`];
