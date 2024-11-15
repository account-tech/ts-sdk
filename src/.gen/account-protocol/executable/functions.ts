import {PUBLISHED_AT} from "..";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface NewArgs { deps: TransactionObjectInput; issuer: TransactionObjectInput; actions: TransactionObjectInput }

export function new_( tx: Transaction, args: NewArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::new`, arguments: [ obj(tx, args.deps), obj(tx, args.issuer), obj(tx, args.actions) ], }) }

export interface DestroyArgs { executable: TransactionObjectInput; version: TransactionObjectInput; witness: GenericArg }

export function destroy( tx: Transaction, typeArg: string, args: DestroyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::destroy`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.version), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface ActionArgs { executable: TransactionObjectInput; accountAddr: string | TransactionArgument; version: TransactionObjectInput; witness: GenericArg }

export function action( tx: Transaction, typeArgs: [string, string], args: ActionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::action`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), pure(tx, args.accountAddr, `address`), obj(tx, args.version), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }

export function issuer( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::issuer`, arguments: [ obj(tx, executable) ], }) }

export function deps( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::deps`, arguments: [ obj(tx, executable) ], }) }
