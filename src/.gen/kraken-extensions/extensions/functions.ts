import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure, vector} from "../../_framework/util";
import {History} from "./structs";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface AddArgs { extensions: TransactionObjectInput; name: string | TransactionArgument; package: string | TransactionArgument; version: bigint | TransactionArgument }

export function add( tx: Transaction, args: AddArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::add`, arguments: [ obj(tx, args.extensions), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.package, `address`), pure(tx, args.version, `u64`) ], }) }

export interface AssertExtensionExistsArgs { extensions: TransactionObjectInput; name: string | TransactionArgument; package: string | TransactionArgument; version: bigint | TransactionArgument }

export function assertExtensionExists( tx: Transaction, args: AssertExtensionExistsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::assert_extension_exists`, arguments: [ obj(tx, args.extensions), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.package, `address`), pure(tx, args.version, `u64`) ], }) }

export interface ContainsHistoryArgs { extensions: TransactionObjectInput; name: string | TransactionArgument }

export function containsHistory( tx: Transaction, args: ContainsHistoryArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::contains_history`, arguments: [ obj(tx, args.extensions), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface ContainsVersionArgs { history: Array<TransactionObjectInput> | TransactionArgument; package: string | TransactionArgument }

export function containsVersion( tx: Transaction, args: ContainsVersionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::contains_version`, arguments: [ vector(tx, `${History.$typeName}`, args.history), pure(tx, args.package, `address`) ], }) }

export interface GetHistoryArgs { extensions: TransactionObjectInput; name: string | TransactionArgument }

export function getHistory( tx: Transaction, args: GetHistoryArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::get_history`, arguments: [ obj(tx, args.extensions), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface GetIdxForHistoryArgs { extensions: TransactionObjectInput; name: string | TransactionArgument }

export function getIdxForHistory( tx: Transaction, args: GetIdxForHistoryArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::get_idx_for_history`, arguments: [ obj(tx, args.extensions), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface GetIdxForPackageArgs { history: Array<TransactionObjectInput> | TransactionArgument; package: string | TransactionArgument }

export function getIdxForPackage( tx: Transaction, args: GetIdxForPackageArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::get_idx_for_package`, arguments: [ vector(tx, `${History.$typeName}`, args.history), pure(tx, args.package, `address`) ], }) }

export function getLatestCoreDeps( tx: Transaction, extensions: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::get_latest_core_deps`, arguments: [ obj(tx, extensions) ], }) }

export interface GetVersionArgs { history: Array<TransactionObjectInput> | TransactionArgument; package: string | TransactionArgument }

export function getVersion( tx: Transaction, args: GetVersionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::get_version`, arguments: [ vector(tx, `${History.$typeName}`, args.history), pure(tx, args.package, `address`) ], }) }

export function init( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::init`, arguments: [ ], }) }

export interface InitCoreDepsArgs { adminCap: TransactionObjectInput; extensions: TransactionObjectInput; packages: Array<string | TransactionArgument> | TransactionArgument }

export function initCoreDeps( tx: Transaction, args: InitCoreDepsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::init_core_deps`, arguments: [ obj(tx, args.adminCap), obj(tx, args.extensions), pure(tx, args.packages, `vector<address>`) ], }) }
