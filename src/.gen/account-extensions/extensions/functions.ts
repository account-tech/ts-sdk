import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface AddArgs { extensions: TransactionObjectInput; adminCap: TransactionObjectInput; name: string | TransactionArgument; addr: string | TransactionArgument; version: bigint | TransactionArgument }

export function add( tx: Transaction, args: AddArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::add`, arguments: [ obj(tx, args.extensions), obj(tx, args.adminCap), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.addr, `address`), pure(tx, args.version, `u64`) ], }) }

export interface RemoveArgs { extensions: TransactionObjectInput; adminCap: TransactionObjectInput; name: string | TransactionArgument }

export function remove( tx: Transaction, args: RemoveArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::remove`, arguments: [ obj(tx, args.extensions), obj(tx, args.adminCap), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface UpdateArgs { extensions: TransactionObjectInput; adminCap: TransactionObjectInput; name: string | TransactionArgument; addr: string | TransactionArgument; version: bigint | TransactionArgument }

export function update( tx: Transaction, args: UpdateArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::update`, arguments: [ obj(tx, args.extensions), obj(tx, args.adminCap), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.addr, `address`), pure(tx, args.version, `u64`) ], }) }

export interface AssertIsCoreExtensionArgs { extensions: TransactionObjectInput; addr: string | TransactionArgument }

export function assertIsCoreExtension( tx: Transaction, args: AssertIsCoreExtensionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::assert_is_core_extension`, arguments: [ obj(tx, args.extensions), pure(tx, args.addr, `address`) ], }) }

export interface AssertIsExtensionArgs { extensions: TransactionObjectInput; name: string | TransactionArgument; addr: string | TransactionArgument; version: bigint | TransactionArgument }

export function assertIsExtension( tx: Transaction, args: AssertIsExtensionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::assert_is_extension`, arguments: [ obj(tx, args.extensions), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.addr, `address`), pure(tx, args.version, `u64`) ], }) }

export function getCoreDepsAddresses( tx: Transaction, extensions: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::get_core_deps_addresses`, arguments: [ obj(tx, extensions) ], }) }

export interface GetIdxForNameArgs { extensions: TransactionObjectInput; name: string | TransactionArgument }

export function getIdxForName( tx: Transaction, args: GetIdxForNameArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::get_idx_for_name`, arguments: [ obj(tx, args.extensions), pure(tx, args.name, `${String.$typeName}`) ], }) }

export function getLatestCoreDeps( tx: Transaction, extensions: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::get_latest_core_deps`, arguments: [ obj(tx, extensions) ], }) }

export function init( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::init`, arguments: [ ], }) }

export interface IsExtensionArgs { extensions: TransactionObjectInput; name: string | TransactionArgument; addr: string | TransactionArgument; version: bigint | TransactionArgument }

export function isExtension( tx: Transaction, args: IsExtensionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::extensions::is_extension`, arguments: [ obj(tx, args.extensions), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.addr, `address`), pure(tx, args.version, `u64`) ], }) }
