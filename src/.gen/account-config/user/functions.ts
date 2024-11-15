import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function new_( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::new`, arguments: [ ], }) }

export interface TransferArgs { registry: TransactionObjectInput; user: TransactionObjectInput; recipient: string | TransactionArgument }

export function transfer( tx: Transaction, args: TransferArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::transfer`, arguments: [ obj(tx, args.registry), obj(tx, args.user), pure(tx, args.recipient, `address`) ], }) }

export interface DestroyArgs { registry: TransactionObjectInput; user: TransactionObjectInput }

export function destroy( tx: Transaction, args: DestroyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::destroy`, arguments: [ obj(tx, args.registry), obj(tx, args.user) ], }) }

export function init( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::init`, arguments: [ ], }) }

export interface AddAccountArgs { user: TransactionObjectInput; accountAddr: string | TransactionArgument; accountType: string | TransactionArgument }

export function addAccount( tx: Transaction, args: AddAccountArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::add_account`, arguments: [ obj(tx, args.user), pure(tx, args.accountAddr, `address`), pure(tx, args.accountType, `${String.$typeName}`) ], }) }

export function allIds( tx: Transaction, user: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::all_ids`, arguments: [ obj(tx, user) ], }) }

export interface IdsForTypeArgs { user: TransactionObjectInput; accountType: string | TransactionArgument }

export function idsForType( tx: Transaction, args: IdsForTypeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::ids_for_type`, arguments: [ obj(tx, args.user), pure(tx, args.accountType, `${String.$typeName}`) ], }) }

export interface RemoveAccountArgs { user: TransactionObjectInput; accountAddr: string | TransactionArgument; accountType: string | TransactionArgument }

export function removeAccount( tx: Transaction, args: RemoveAccountArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::remove_account`, arguments: [ obj(tx, args.user), pure(tx, args.accountAddr, `address`), pure(tx, args.accountType, `${String.$typeName}`) ], }) }

export function users( tx: Transaction, registry: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::users`, arguments: [ obj(tx, registry) ], }) }
