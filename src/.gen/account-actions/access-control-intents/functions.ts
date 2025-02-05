import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface CompleteBorrowCapArgs { executable: TransactionObjectInput; account: TransactionObjectInput; borrow: TransactionObjectInput; cap: GenericArg }

export function completeBorrowCap( tx: Transaction, typeArgs: [string, string, string], args: CompleteBorrowCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control_intents::complete_borrow_cap`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.borrow), generic(tx, `${typeArgs[2]}`, args.cap) ], }) }

export interface ExecuteBorrowCapArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function executeBorrowCap( tx: Transaction, typeArgs: [string, string, string], args: ExecuteBorrowCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control_intents::execute_borrow_cap`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export interface RequestBorrowCapArgs { auth: TransactionObjectInput; outcome: GenericArg; account: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTimes: Array<bigint | TransactionArgument> | TransactionArgument; expirationTime: bigint | TransactionArgument }

export function requestBorrowCap( tx: Transaction, typeArgs: [string, string, string], args: RequestBorrowCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::access_control_intents::request_borrow_cap`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), generic(tx, `${typeArgs[1]}`, args.outcome), obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTimes, `vector<u64>`), pure(tx, args.expirationTime, `u64`) ], }) }
