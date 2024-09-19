import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface NewArgs { username: string | TransactionArgument; profilePicture: string | TransactionArgument }

export function new_( tx: Transaction, args: NewArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::new`, arguments: [ pure(tx, args.username, `${String.$typeName}`), pure(tx, args.profilePicture, `${String.$typeName}`) ], }) }

export interface TransferArgs { registry: TransactionObjectInput; account: TransactionObjectInput; recipient: string | TransactionArgument }

export function transfer( tx: Transaction, args: TransferArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::transfer`, arguments: [ obj(tx, args.registry), obj(tx, args.account), pure(tx, args.recipient, `address`) ], }) }

export function destroy( tx: Transaction, account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::destroy`, arguments: [ obj(tx, account) ], }) }

export function init( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::init`, arguments: [ ], }) }

export interface AcceptInviteArgs { account: TransactionObjectInput; multisig: TransactionObjectInput; invite: TransactionObjectInput }

export function acceptInvite( tx: Transaction, args: AcceptInviteArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::accept_invite`, arguments: [ obj(tx, args.account), obj(tx, args.multisig), obj(tx, args.invite) ], }) }

export interface JoinMultisigArgs { account: TransactionObjectInput; multisig: TransactionObjectInput }

export function joinMultisig( tx: Transaction, args: JoinMultisigArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::join_multisig`, arguments: [ obj(tx, args.account), obj(tx, args.multisig) ], }) }

export interface LeaveMultisigArgs { account: TransactionObjectInput; multisig: TransactionObjectInput }

export function leaveMultisig( tx: Transaction, args: LeaveMultisigArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::leave_multisig`, arguments: [ obj(tx, args.account), obj(tx, args.multisig) ], }) }

export function multisigId( tx: Transaction, invite: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::multisig_id`, arguments: [ obj(tx, invite) ], }) }

export function multisigIds( tx: Transaction, account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::multisig_ids`, arguments: [ obj(tx, account) ], }) }

export function username( tx: Transaction, account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::username`, arguments: [ obj(tx, account) ], }) }

export function profilePicture( tx: Transaction, account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::profile_picture`, arguments: [ obj(tx, account) ], }) }

export function refuseInvite( tx: Transaction, invite: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::refuse_invite`, arguments: [ obj(tx, invite) ], }) }

export interface SendInviteArgs { multisig: TransactionObjectInput; recipient: string | TransactionArgument }

export function sendInvite( tx: Transaction, args: SendInviteArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::send_invite`, arguments: [ obj(tx, args.multisig), pure(tx, args.recipient, `address`) ], }) }
