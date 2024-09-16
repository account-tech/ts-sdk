import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function new_( tx: Transaction, global: bigint | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::thresholds::new`, arguments: [ pure(tx, global, `u64`) ], }) }

export interface AddArgs { roles: TransactionObjectInput; name: string | TransactionArgument; threshold: bigint | TransactionArgument }

export function add( tx: Transaction, args: AddArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::thresholds::add`, arguments: [ obj(tx, args.roles), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.threshold, `u64`) ], }) }

export interface GetIdxArgs { roles: TransactionObjectInput; name: string | TransactionArgument }

export function getIdx( tx: Transaction, args: GetIdxArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::thresholds::get_idx`, arguments: [ obj(tx, args.roles), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface AssertReachedArgs { thresholds: TransactionObjectInput; proposal: TransactionObjectInput }

export function assertReached( tx: Transaction, args: AssertReachedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::thresholds::assert_reached`, arguments: [ obj(tx, args.thresholds), obj(tx, args.proposal) ], }) }

export interface ExistsArgs { roles: TransactionObjectInput; name: string | TransactionArgument }

export function exists( tx: Transaction, args: ExistsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::thresholds::exists`, arguments: [ obj(tx, args.roles), pure(tx, args.name, `${String.$typeName}`) ], }) }

export function getGlobalThreshold( tx: Transaction, roles: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::thresholds::get_global_threshold`, arguments: [ obj(tx, roles) ], }) }

export interface GetRoleThresholdArgs { roles: TransactionObjectInput; name: string | TransactionArgument }

export function getRoleThreshold( tx: Transaction, args: GetRoleThresholdArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::thresholds::get_role_threshold`, arguments: [ obj(tx, args.roles), pure(tx, args.name, `${String.$typeName}`) ], }) }

export function rolesToVec( tx: Transaction, roles: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::thresholds::roles_to_vec`, arguments: [ obj(tx, roles) ], }) }
