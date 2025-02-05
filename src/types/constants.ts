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
    V1 = "0x4c0e0a778187e0c536aace86a65d948ce81e7d3f07f8a937cfc762e30c74aa26",
}
export enum ACCOUNT_PROTOCOL {
    V1 = "0x2475852c52d75aca46d2a1d95227ca7c79fe8cfe252ffbfbd8f260eab666dda8",
}
export enum ACCOUNT_CONFIG {
    V1 = "0x4e6d1ce7f12e692bcb22e30448eb517f58f2d1be63804c422820c0c9b04f288c",
}
export enum ACCOUNT_ACTIONS {
    V1 = "0x4b7dd49a9209617b5f7b6926068e75c39f098ec658e1fec6da8d1da82541aa38",
}
// Shared objects
export const EXTENSIONS = "0x7f1aeedb6cf1917c5f5e8b97736a3a77bc1a55a4f7977f3f215a7398afdcc6ad";
export const USER_REGISTRY = "0xc89a5e8258945609954e6510ac34770628dc242519615c7e2f038a52b5edee41";
// Types
export const MULTISIG_GENERICS: [string, string] = [`${ACCOUNT_CONFIG.V1}::multisig::Multisig`, `${ACCOUNT_CONFIG.V1}::multisig::Approvals`];
