import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface ContainsArgs { deps: TransactionObjectInput; package: string | TransactionArgument }

export function contains( tx: Transaction, args: ContainsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::contains`, arguments: [ obj(tx, args.deps), pure(tx, args.package, `${String.$typeName}`) ], }) }

export function new_( tx: Transaction, extensions: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::new`, arguments: [ obj(tx, extensions) ], }) }

export interface AddArgs { deps: TransactionObjectInput; dep: TransactionObjectInput }

export function add( tx: Transaction, args: AddArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::add`, arguments: [ obj(tx, args.deps), obj(tx, args.dep) ], }) }

export interface GetIdxArgs { deps: TransactionObjectInput; package: string | TransactionArgument }

export function getIdx( tx: Transaction, args: GetIdxArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::get_idx`, arguments: [ obj(tx, args.deps), pure(tx, args.package, `address`) ], }) }

export interface GetVersionArgs { deps: TransactionObjectInput; package: string | TransactionArgument }

export function getVersion( tx: Transaction, args: GetVersionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::get_version`, arguments: [ obj(tx, args.deps), pure(tx, args.package, `address`) ], }) }

export interface GetPackageIdxFromStringArgs { deps: TransactionObjectInput; package: string | TransactionArgument }

export function getPackageIdxFromString( tx: Transaction, args: GetPackageIdxFromStringArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::get_package_idx_from_string`, arguments: [ obj(tx, args.deps), pure(tx, args.package, `${String.$typeName}`) ], }) }

export interface GetPackageVersionFromStringArgs { deps: TransactionObjectInput; package: string | TransactionArgument }

export function getPackageVersionFromString( tx: Transaction, args: GetPackageVersionFromStringArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::get_package_version_from_string`, arguments: [ obj(tx, args.deps), pure(tx, args.package, `${String.$typeName}`) ], }) }

export interface NewDepArgs { extensions: TransactionObjectInput; name: string | TransactionArgument; package: string | TransactionArgument; version: bigint | TransactionArgument }

export function newDep( tx: Transaction, args: NewDepArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::deps::new_dep`, arguments: [ obj(tx, args.extensions), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.package, `address`), pure(tx, args.version, `u64`) ], }) }
