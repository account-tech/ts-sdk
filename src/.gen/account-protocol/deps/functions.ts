import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface AddArgs { deps: TransactionObjectInput; extensions: TransactionObjectInput; name: string | TransactionArgument; addr: string | TransactionArgument; version: bigint | TransactionArgument }

export function add( tx: Transaction, args: AddArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::add`, arguments: [ obj(tx, args.deps), obj(tx, args.extensions), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.addr, `address`), pure(tx, args.version, `u64`) ], }) }

export function length( tx: Transaction, deps: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::length`, arguments: [ obj(tx, deps) ], }) }

export function new_( tx: Transaction, extensions: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::new`, arguments: [ obj(tx, extensions) ], }) }

export function name( tx: Transaction, dep: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::name`, arguments: [ obj(tx, dep) ], }) }

export function version( tx: Transaction, dep: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::version`, arguments: [ obj(tx, dep) ], }) }

export function addr( tx: Transaction, dep: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::addr`, arguments: [ obj(tx, dep) ], }) }

export interface AddWithUpgradeCapArgs { deps: TransactionObjectInput; upgradeCap: TransactionObjectInput; name: string | TransactionArgument; addr: string | TransactionArgument; version: bigint | TransactionArgument }

export function addWithUpgradeCap( tx: Transaction, args: AddWithUpgradeCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::add_with_upgrade_cap`, arguments: [ obj(tx, args.deps), obj(tx, args.upgradeCap), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.addr, `address`), pure(tx, args.version, `u64`) ], }) }

export interface AssertIsCoreDepArgs { deps: TransactionObjectInput; versionType: TransactionObjectInput }

export function assertIsCoreDep( tx: Transaction, args: AssertIsCoreDepArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::assert_is_core_dep`, arguments: [ obj(tx, args.deps), obj(tx, args.versionType) ], }) }

export interface AssertIsDepArgs { deps: TransactionObjectInput; versionType: TransactionObjectInput }

export function assertIsDep( tx: Transaction, args: AssertIsDepArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::assert_is_dep`, arguments: [ obj(tx, args.deps), obj(tx, args.versionType) ], }) }

export interface ContainsAddrArgs { deps: TransactionObjectInput; addr: string | TransactionArgument }

export function containsAddr( tx: Transaction, args: ContainsAddrArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::contains_addr`, arguments: [ obj(tx, args.deps), pure(tx, args.addr, `address`) ], }) }

export interface ContainsNameArgs { deps: TransactionObjectInput; name: string | TransactionArgument }

export function containsName( tx: Transaction, args: ContainsNameArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::contains_name`, arguments: [ obj(tx, args.deps), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface GetFromAddrArgs { deps: TransactionObjectInput; addr: string | TransactionArgument }

export function getFromAddr( tx: Transaction, args: GetFromAddrArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::get_from_addr`, arguments: [ obj(tx, args.deps), pure(tx, args.addr, `address`) ], }) }

export interface GetFromNameArgs { deps: TransactionObjectInput; name: string | TransactionArgument }

export function getFromName( tx: Transaction, args: GetFromNameArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::get_from_name`, arguments: [ obj(tx, args.deps), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface GetIdxForAddrArgs { deps: TransactionObjectInput; addr: string | TransactionArgument }

export function getIdxForAddr( tx: Transaction, args: GetIdxForAddrArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::get_idx_for_addr`, arguments: [ obj(tx, args.deps), pure(tx, args.addr, `address`) ], }) }
