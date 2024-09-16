import {PUBLISHED_AT} from "..";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface NewArgs { auth: TransactionObjectInput; actions: TransactionObjectInput }

export function new_( tx: Transaction, args: NewArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::new`, arguments: [ obj(tx, args.auth), obj(tx, args.actions) ], }) }

export interface DestroyArgs { executable: TransactionObjectInput; issuer: GenericArg }

export function destroy( tx: Transaction, typeArg: string, args: DestroyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::destroy`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.issuer) ], }) }

export function action( tx: Transaction, typeArg: string, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::action`, typeArguments: [typeArg], arguments: [ obj(tx, executable) ], }) }

export function auth( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::auth`, arguments: [ obj(tx, executable) ], }) }

export function actionsLength( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::actions_length`, arguments: [ obj(tx, executable) ], }) }

export function actionIndex( tx: Transaction, typeArg: string, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::action_index`, typeArguments: [typeArg], arguments: [ obj(tx, executable) ], }) }

export interface ActionMutArgs { executable: TransactionObjectInput; issuer: GenericArg; multisigAddr: string | TransactionArgument }

export function actionMut( tx: Transaction, typeArgs: [string, string], args: ActionMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::action_mut`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), generic(tx, `${typeArgs[0]}`, args.issuer), pure(tx, args.multisigAddr, `address`) ], }) }

export function nextToDestroy( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::next_to_destroy`, arguments: [ obj(tx, executable) ], }) }

export interface RemoveActionArgs { executable: TransactionObjectInput; issuer: GenericArg }

export function removeAction( tx: Transaction, typeArgs: [string, string], args: RemoveActionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::remove_action`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), generic(tx, `${typeArgs[0]}`, args.issuer) ], }) }
