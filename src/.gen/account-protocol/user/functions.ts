import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function new_( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::new`, arguments: [ ], }) }

export interface TransferArgs { registry: TransactionObjectInput; user: TransactionObjectInput; recipient: string | TransactionArgument }

export function transfer( tx: Transaction, args: TransferArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::transfer`, arguments: [ obj(tx, args.registry), obj(tx, args.user), pure(tx, args.recipient, `address`) ], }) }

export interface DestroyArgs { registry: TransactionObjectInput; user: TransactionObjectInput }

export function destroy( tx: Transaction, args: DestroyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::destroy`, arguments: [ obj(tx, args.registry), obj(tx, args.user) ], }) }

export function init( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::init`, arguments: [ ], }) }

export interface AcceptInviteArgs { user: TransactionObjectInput; invite: TransactionObjectInput }

export function acceptInvite( tx: Transaction, args: AcceptInviteArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::accept_invite`, arguments: [ obj(tx, args.user), obj(tx, args.invite) ], }) }

export interface AddAccountArgs { user: TransactionObjectInput; account: TransactionObjectInput; configWitness: GenericArg }

export function addAccount( tx: Transaction, typeArgs: [string, string, string], args: AddAccountArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::add_account`, typeArguments: typeArgs, arguments: [ obj(tx, args.user), obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.configWitness) ], }) }

export function allIds( tx: Transaction, user: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::all_ids`, arguments: [ obj(tx, user) ], }) }

export interface IdsForTypeArgs { user: TransactionObjectInput; accountType: string | TransactionArgument }

export function idsForType( tx: Transaction, args: IdsForTypeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::ids_for_type`, arguments: [ obj(tx, args.user), pure(tx, args.accountType, `${String.$typeName}`) ], }) }

export function refuseInvite( tx: Transaction, invite: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::refuse_invite`, arguments: [ obj(tx, invite) ], }) }

export interface RemoveAccountArgs { user: TransactionObjectInput; account: TransactionObjectInput; configWitness: GenericArg }

export function removeAccount( tx: Transaction, typeArgs: [string, string, string], args: RemoveAccountArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::remove_account`, typeArguments: typeArgs, arguments: [ obj(tx, args.user), obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.configWitness) ], }) }

export interface SendInviteArgs { account: TransactionObjectInput; recipient: string | TransactionArgument; configWitness: GenericArg }

export function sendInvite( tx: Transaction, typeArgs: [string, string, string], args: SendInviteArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::send_invite`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.recipient, `address`), generic(tx, `${typeArgs[2]}`, args.configWitness) ], }) }

export function users( tx: Transaction, registry: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::user::users`, arguments: [ obj(tx, registry) ], }) }
