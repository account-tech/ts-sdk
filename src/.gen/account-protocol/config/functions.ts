import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function deleteConfigDeps( tx: Transaction, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::delete_config_deps`, arguments: [ obj(tx, expired) ], }) }

export function deleteToggleUnverifiedAllowed( tx: Transaction, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::delete_toggle_unverified_allowed`, arguments: [ obj(tx, expired) ], }) }

export interface EditMetadataArgs { auth: TransactionObjectInput; account: TransactionObjectInput; keys: Array<string | TransactionArgument> | TransactionArgument; values: Array<string | TransactionArgument> | TransactionArgument }

export function editMetadata( tx: Transaction, typeArgs: [string, string], args: EditMetadataArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::edit_metadata`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), pure(tx, args.keys, `vector<${String.$typeName}>`), pure(tx, args.values, `vector<${String.$typeName}>`) ], }) }

export interface ExecuteConfigDepsArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function executeConfigDeps( tx: Transaction, typeArgs: [string, string], args: ExecuteConfigDepsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::execute_config_deps`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export interface ExecuteToggleUnverifiedAllowedArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function executeToggleUnverifiedAllowed( tx: Transaction, typeArgs: [string, string], args: ExecuteToggleUnverifiedAllowedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::execute_toggle_unverified_allowed`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export interface RequestConfigDepsArgs { auth: TransactionObjectInput; outcome: GenericArg; account: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationTime: bigint | TransactionArgument; extensions: TransactionObjectInput; names: Array<string | TransactionArgument> | TransactionArgument; addresses: Array<string | TransactionArgument> | TransactionArgument; versions: Array<bigint | TransactionArgument> | TransactionArgument }

export function requestConfigDeps( tx: Transaction, typeArgs: [string, string], args: RequestConfigDepsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::request_config_deps`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), generic(tx, `${typeArgs[1]}`, args.outcome), obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationTime, `u64`), obj(tx, args.extensions), pure(tx, args.names, `vector<${String.$typeName}>`), pure(tx, args.addresses, `vector<address>`), pure(tx, args.versions, `vector<u64>`) ], }) }

export interface RequestToggleUnverifiedAllowedArgs { auth: TransactionObjectInput; outcome: GenericArg; account: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationTime: bigint | TransactionArgument }

export function requestToggleUnverifiedAllowed( tx: Transaction, typeArgs: [string, string], args: RequestToggleUnverifiedAllowedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::request_toggle_unverified_allowed`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), generic(tx, `${typeArgs[1]}`, args.outcome), obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationTime, `u64`) ], }) }

export interface UpdateExtensionsToLatestArgs { auth: TransactionObjectInput; account: TransactionObjectInput; extensions: TransactionObjectInput }

export function updateExtensionsToLatest( tx: Transaction, typeArgs: [string, string], args: UpdateExtensionsToLatestArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::update_extensions_to_latest`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), obj(tx, args.extensions) ], }) }
