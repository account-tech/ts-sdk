import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface CompleteAccessArgs { executable: TransactionObjectInput; account: TransactionObjectInput; borrow: TransactionObjectInput; cap: GenericArg }

export function completeAccess( tx: Transaction, typeArgs: [string, string, string], args: CompleteAccessArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control::complete_access`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.borrow), generic(tx, `${typeArgs[2]}`, args.cap) ], }) }

export function deleteAccessAction( tx: Transaction, typeArgs: [string, string], expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control::delete_access_action`, typeArguments: typeArgs, arguments: [ obj(tx, expired) ], }) }

export interface DoAccessArgs { executable: TransactionObjectInput; account: TransactionObjectInput; version: TransactionObjectInput; witness: GenericArg }

export function doAccess( tx: Transaction, typeArgs: [string, string, string, string], args: DoAccessArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control::do_access`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.version), generic(tx, `${typeArgs[3]}`, args.witness) ], }) }

export interface ExecuteAccessArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function executeAccess( tx: Transaction, typeArgs: [string, string, string], args: ExecuteAccessArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control::execute_access`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export function hasLock( tx: Transaction, typeArgs: [string, string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control::has_lock`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export interface LockCapArgs { auth: TransactionObjectInput; account: TransactionObjectInput; cap: GenericArg }

export function lockCap( tx: Transaction, typeArgs: [string, string, string], args: LockCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control::lock_cap`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.cap) ], }) }

export interface NewAccessArgs { proposal: TransactionObjectInput; witness: GenericArg }

export function newAccess( tx: Transaction, typeArgs: [string, string, string], args: NewAccessArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control::new_access`, typeArguments: typeArgs, arguments: [ obj(tx, args.proposal), generic(tx, `${typeArgs[2]}`, args.witness) ], }) }

export interface ProposeAccessArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument }

export function proposeAccess( tx: Transaction, typeArgs: [string, string, string], args: ProposeAccessArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control::propose_access`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`) ], }) }

export interface ReturnCapArgs { account: TransactionObjectInput; borrow: TransactionObjectInput; cap: GenericArg; version: TransactionObjectInput }

export function returnCap( tx: Transaction, typeArgs: [string, string, string], args: ReturnCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control::return_cap`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.borrow), generic(tx, `${typeArgs[2]}`, args.cap), obj(tx, args.version) ], }) }

export function typeToName( tx: Transaction, typeArg: string, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control::type_to_name`, typeArguments: [typeArg], arguments: [ ], }) }
