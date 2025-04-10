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
    V1 = "0x2c137265d68d158493ba021f7c59913785fe524c6f19c22c8dea8e591a1d9c20",
}
export enum ACCOUNT_PROTOCOL {
    V1 = "0xee067c667ba529cfe69c2768a483b4269fa02eebacf69e0e69329c596873812c",
}
export enum ACCOUNT_ACTIONS {
    V1 = "0x03a13a30a15aeed4cffa6d9438ff4636e589f02dac2c0ce7d518c9cdab4f3118",
}
// Shared objects
export const EXTENSIONS = "0x44ec0adaedee769c7f469e9b3915548da2528d7f51d8913efdbf8c4a2c16e34e";
export const USER_REGISTRY = "0x46aeae3166c2955885162c1f4e9b3f265bd665a838b2990e473bd6e5805826e7";