// Sui packages and objects
export const STDLIB = "0x0000000000000000000000000000000000000000000000000000000000000001";
export const FRAMEWORK = "0x0000000000000000000000000000000000000000000000000000000000000002";
export const CLOCK = "0x0000000000000000000000000000000000000000000000000000000000000006";
export const SUI_SYSTEM_STATE_INNER = "0x5b890eaf2abcfa2ab90b77b8e6f3d5d8609586c3e583baf3dccd5af17edf48d1";
// Kraken Published Packages (V1)
export const KRAKEN_EXTENSIONS = "0x2d1f315f2b4f5cb64901b054c7f315a03f0aea3f49f6e6c9b74cbd1d12f4b6c7";
export const KRAKEN_MULTISIG = "0xacfd4da2d93e228e252150fc3bd030c8c3ce86b6267706de94ad8f9f6b6eba0d";
export const KRAKEN_ACTIONS = "0x29dd152d8a8a427cb3eb343e2f58f68e9f07587597eb23816df3e2b04a72bdfd";
// Shared objects
export const EXTENSIONS = "0xce279d1dd9558f9f5a7175e2b7bfb3975350dbefcd22b2a8c370b2931cff6c14";
export const ACCOUNT_REGISTRY = "0xd2df54caf2cf9ecd91e10c105a1db673466c619ae0c33651c1dfd9fa22834872";
// Proposal names
export enum ProposalTypes {
    configName = "ConfigName",
    configRules = "ConfigRules",
    configDeps = "ConfigDeps",
};