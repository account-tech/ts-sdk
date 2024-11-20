import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function deleteConfigDepsAction( tx: Transaction, typeArg: string, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::delete_config_deps_action`, typeArguments: [typeArg], arguments: [ obj(tx, expired) ], }) }

export function deleteConfigMetadataAction( tx: Transaction, typeArg: string, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::delete_config_metadata_action`, typeArguments: [typeArg], arguments: [ obj(tx, expired) ], }) }

export interface DoConfigDepsArgs { executable: TransactionObjectInput; account: TransactionObjectInput; version: TransactionObjectInput; witness: GenericArg }

export function doConfigDeps( tx: Transaction, typeArgs: [string, string, string], args: DoConfigDepsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::do_config_deps`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.version), generic(tx, `${typeArgs[2]}`, args.witness) ], }) }

export interface DoConfigMetadataArgs { executable: TransactionObjectInput; account: TransactionObjectInput; version: TransactionObjectInput; witness: GenericArg }

export function doConfigMetadata( tx: Transaction, typeArgs: [string, string, string], args: DoConfigMetadataArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::do_config_metadata`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.version), generic(tx, `${typeArgs[2]}`, args.witness) ], }) }

export interface ExecuteConfigDepsArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function executeConfigDeps( tx: Transaction, typeArgs: [string, string], args: ExecuteConfigDepsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::execute_config_deps`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export interface ExecuteConfigMetadataArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function executeConfigMetadata( tx: Transaction, typeArgs: [string, string], args: ExecuteConfigMetadataArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::execute_config_metadata`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export interface NewConfigDepsArgs { proposal: TransactionObjectInput; account: TransactionObjectInput; extensions: TransactionObjectInput; names: Array<string | TransactionArgument> | TransactionArgument; packages: Array<string | TransactionArgument> | TransactionArgument; versions: Array<bigint | TransactionArgument> | TransactionArgument; witness: GenericArg }

export function newConfigDeps( tx: Transaction, typeArgs: [string, string, string], args: NewConfigDepsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::new_config_deps`, typeArguments: typeArgs, arguments: [ obj(tx, args.proposal), obj(tx, args.account), obj(tx, args.extensions), pure(tx, args.names, `vector<${String.$typeName}>`), pure(tx, args.packages, `vector<address>`), pure(tx, args.versions, `vector<u64>`), generic(tx, `${typeArgs[2]}`, args.witness) ], }) }

export interface NewConfigMetadataArgs { proposal: TransactionObjectInput; keys: Array<string | TransactionArgument> | TransactionArgument; values: Array<string | TransactionArgument> | TransactionArgument; witness: GenericArg }

export function newConfigMetadata( tx: Transaction, typeArgs: [string, string], args: NewConfigMetadataArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::new_config_metadata`, typeArguments: typeArgs, arguments: [ obj(tx, args.proposal), pure(tx, args.keys, `vector<${String.$typeName}>`), pure(tx, args.values, `vector<${String.$typeName}>`), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }

export interface ProposeConfigDepsArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationTime: bigint | TransactionArgument; extensions: TransactionObjectInput; names: Array<string | TransactionArgument> | TransactionArgument; addresses: Array<string | TransactionArgument> | TransactionArgument; versions: Array<bigint | TransactionArgument> | TransactionArgument }

export function proposeConfigDeps( tx: Transaction, typeArgs: [string, string], args: ProposeConfigDepsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::propose_config_deps`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationTime, `u64`), obj(tx, args.extensions), pure(tx, args.names, `vector<${String.$typeName}>`), pure(tx, args.addresses, `vector<address>`), pure(tx, args.versions, `vector<u64>`) ], }) }

export interface ProposeConfigMetadataArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationTime: bigint | TransactionArgument; keys: Array<string | TransactionArgument> | TransactionArgument; values: Array<string | TransactionArgument> | TransactionArgument }

export function proposeConfigMetadata( tx: Transaction, typeArgs: [string, string], args: ProposeConfigMetadataArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::propose_config_metadata`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationTime, `u64`), pure(tx, args.keys, `vector<${String.$typeName}>`), pure(tx, args.values, `vector<${String.$typeName}>`) ], }) }
