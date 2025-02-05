import {PUBLISHED_AT} from "..";
import {GenericArg, generic, obj} from "../../_framework/util";
import {Transaction, TransactionObjectInput} from "@mysten/sui/transactions";

export function deleteBorrow( tx: Transaction, typeArg: string, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control::delete_borrow`, typeArguments: [typeArg], arguments: [ obj(tx, expired) ], }) }

export interface DoBorrowArgs { executable: TransactionObjectInput; account: TransactionObjectInput; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function doBorrow( tx: Transaction, typeArgs: [string, string, string, string], args: DoBorrowArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control::do_borrow`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.versionWitness), generic(tx, `${typeArgs[3]}`, args.intentWitness) ], }) }

export function hasLock( tx: Transaction, typeArgs: [string, string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control::has_lock`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export interface LockCapArgs { auth: TransactionObjectInput; account: TransactionObjectInput; cap: GenericArg }

export function lockCap( tx: Transaction, typeArgs: [string, string, string], args: LockCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control::lock_cap`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.cap) ], }) }

export interface NewBorrowArgs { intent: TransactionObjectInput; account: TransactionObjectInput; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function newBorrow( tx: Transaction, typeArgs: [string, string, string, string], args: NewBorrowArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control::new_borrow`, typeArguments: typeArgs, arguments: [ obj(tx, args.intent), obj(tx, args.account), obj(tx, args.versionWitness), generic(tx, `${typeArgs[3]}`, args.intentWitness) ], }) }

export interface ReturnBorrowedArgs { account: TransactionObjectInput; borrow: TransactionObjectInput; cap: GenericArg; versionWitness: TransactionObjectInput }

export function returnBorrowed( tx: Transaction, typeArgs: [string, string, string], args: ReturnBorrowedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control::return_borrowed`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.borrow), generic(tx, `${typeArgs[2]}`, args.cap), obj(tx, args.versionWitness) ], }) }
