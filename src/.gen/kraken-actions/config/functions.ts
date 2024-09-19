import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface ConfigDepsArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; witness: GenericArg }

export function configDeps( tx: Transaction, typeArg: string, args: ConfigDepsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::config_deps`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface ConfigMembersArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; witness: GenericArg }

export function configMembers( tx: Transaction, typeArg: string, args: ConfigMembersArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::config_members`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface ConfigNameArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; witness: GenericArg }

export function configName( tx: Transaction, typeArg: string, args: ConfigNameArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::config_name`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface ConfigThresholdsArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; witness: GenericArg }

export function configThresholds( tx: Transaction, typeArg: string, args: ConfigThresholdsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::config_thresholds`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface ExecuteConfigDepsArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput }

export function executeConfigDeps( tx: Transaction, args: ExecuteConfigDepsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::execute_config_deps`, arguments: [ obj(tx, args.executable), obj(tx, args.multisig) ], }) }

export interface ExecuteConfigNameArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput }

export function executeConfigName( tx: Transaction, args: ExecuteConfigNameArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::execute_config_name`, arguments: [ obj(tx, args.executable), obj(tx, args.multisig) ], }) }

export interface ExecuteConfigRulesArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput }

export function executeConfigRules( tx: Transaction, args: ExecuteConfigRulesArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::execute_config_rules`, arguments: [ obj(tx, args.executable), obj(tx, args.multisig) ], }) }

export interface NewConfigDepsArgs { proposal: TransactionObjectInput; extensions: TransactionObjectInput; names: Array<string | TransactionArgument> | TransactionArgument; packages: Array<string | TransactionArgument> | TransactionArgument; versions: Array<bigint | TransactionArgument> | TransactionArgument }

export function newConfigDeps( tx: Transaction, args: NewConfigDepsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::new_config_deps`, arguments: [ obj(tx, args.proposal), obj(tx, args.extensions), pure(tx, args.names, `vector<${String.$typeName}>`), pure(tx, args.packages, `vector<address>`), pure(tx, args.versions, `vector<u64>`) ], }) }

export interface NewConfigMembersArgs { proposal: TransactionObjectInput; addresses: Array<string | TransactionArgument> | TransactionArgument; weights: Array<bigint | TransactionArgument> | TransactionArgument; roles: Array<Array<string | TransactionArgument> | TransactionArgument> | TransactionArgument }

export function newConfigMembers( tx: Transaction, args: NewConfigMembersArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::new_config_members`, arguments: [ obj(tx, args.proposal), pure(tx, args.addresses, `vector<address>`), pure(tx, args.weights, `vector<u64>`), pure(tx, args.roles, `vector<vector<${String.$typeName}>>`) ], }) }

export interface NewConfigNameArgs { proposal: TransactionObjectInput; name: string | TransactionArgument }

export function newConfigName( tx: Transaction, args: NewConfigNameArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::new_config_name`, arguments: [ obj(tx, args.proposal), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface NewConfigThresholdsArgs { proposal: TransactionObjectInput; global: bigint | TransactionArgument; roleNames: Array<string | TransactionArgument> | TransactionArgument; roleThresholds: Array<bigint | TransactionArgument> | TransactionArgument }

export function newConfigThresholds( tx: Transaction, args: NewConfigThresholdsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::new_config_thresholds`, arguments: [ obj(tx, args.proposal), pure(tx, args.global, `u64`), pure(tx, args.roleNames, `vector<${String.$typeName}>`), pure(tx, args.roleThresholds, `vector<u64>`) ], }) }

export interface ProposeConfigDepsArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; extensions: TransactionObjectInput; names: Array<string | TransactionArgument> | TransactionArgument; packages: Array<string | TransactionArgument> | TransactionArgument; versions: Array<bigint | TransactionArgument> | TransactionArgument }

export function proposeConfigDeps( tx: Transaction, args: ProposeConfigDepsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::propose_config_deps`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), obj(tx, args.extensions), pure(tx, args.names, `vector<${String.$typeName}>`), pure(tx, args.packages, `vector<address>`), pure(tx, args.versions, `vector<u64>`) ], }) }

export interface ProposeConfigNameArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; name: string | TransactionArgument }

export function proposeConfigName( tx: Transaction, args: ProposeConfigNameArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::propose_config_name`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface ProposeConfigRulesArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; addresses: Array<string | TransactionArgument> | TransactionArgument; weights: Array<bigint | TransactionArgument> | TransactionArgument; roles: Array<Array<string | TransactionArgument> | TransactionArgument> | TransactionArgument; global: bigint | TransactionArgument; roleNames: Array<string | TransactionArgument> | TransactionArgument; roleThresholds: Array<bigint | TransactionArgument> | TransactionArgument }

export function proposeConfigRules( tx: Transaction, args: ProposeConfigRulesArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::propose_config_rules`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.addresses, `vector<address>`), pure(tx, args.weights, `vector<u64>`), pure(tx, args.roles, `vector<vector<${String.$typeName}>>`), pure(tx, args.global, `u64`), pure(tx, args.roleNames, `vector<${String.$typeName}>`), pure(tx, args.roleThresholds, `vector<u64>`) ], }) }

export interface VerifyNewRulesArgs { addresses: Array<string | TransactionArgument> | TransactionArgument; weights: Array<bigint | TransactionArgument> | TransactionArgument; roles: Array<Array<string | TransactionArgument> | TransactionArgument> | TransactionArgument; global: bigint | TransactionArgument; roleNames: Array<string | TransactionArgument> | TransactionArgument; roleThresholds: Array<bigint | TransactionArgument> | TransactionArgument }

export function verifyNewRules( tx: Transaction, args: VerifyNewRulesArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::verify_new_rules`, arguments: [ pure(tx, args.addresses, `vector<address>`), pure(tx, args.weights, `vector<u64>`), pure(tx, args.roles, `vector<vector<${String.$typeName}>>`), pure(tx, args.global, `u64`), pure(tx, args.roleNames, `vector<${String.$typeName}>`), pure(tx, args.roleThresholds, `vector<u64>`) ], }) }
