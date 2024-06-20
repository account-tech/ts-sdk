import {PUBLISHED_AT} from "..";
import {ObjectArg, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export interface NewArgs { username: string | TransactionArgument; profilePicture: string | TransactionArgument }

export function new_( txb: TransactionBlock, args: NewArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::account::new`, arguments: [ pure(txb, args.username, `0x1::string::String`), pure(txb, args.profilePicture, `0x1::string::String`) ], }) }

export function destroy( txb: TransactionBlock, account: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::account::destroy`, arguments: [ obj(txb, account) ], }) }

export interface AcceptInviteArgs { account: ObjectArg; multisig: ObjectArg; invite: ObjectArg }

export function acceptInvite( txb: TransactionBlock, args: AcceptInviteArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::account::accept_invite`, arguments: [ obj(txb, args.account), obj(txb, args.multisig), obj(txb, args.invite) ], }) }

export interface JoinMultisigArgs { account: ObjectArg; multisig: ObjectArg }

export function joinMultisig( txb: TransactionBlock, args: JoinMultisigArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::account::join_multisig`, arguments: [ obj(txb, args.account), obj(txb, args.multisig) ], }) }

export interface LeaveMultisigArgs { account: ObjectArg; multisig: ObjectArg }

export function leaveMultisig( txb: TransactionBlock, args: LeaveMultisigArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::account::leave_multisig`, arguments: [ obj(txb, args.account), obj(txb, args.multisig) ], }) }

export function multisigId( txb: TransactionBlock, invite: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::account::multisig_id`, arguments: [ obj(txb, invite) ], }) }

export function multisigIds( txb: TransactionBlock, account: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::account::multisig_ids`, arguments: [ obj(txb, account) ], }) }

export function username( txb: TransactionBlock, account: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::account::username`, arguments: [ obj(txb, account) ], }) }

export function profilePicture( txb: TransactionBlock, account: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::account::profile_picture`, arguments: [ obj(txb, account) ], }) }

export function refuseInvite( txb: TransactionBlock, invite: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::account::refuse_invite`, arguments: [ obj(txb, invite) ], }) }

export interface SendInviteArgs { multisig: ObjectArg; recipient: string | TransactionArgument }

export function sendInvite( txb: TransactionBlock, args: SendInviteArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::account::send_invite`, arguments: [ obj(txb, args.multisig), pure(txb, args.recipient, `address`) ], }) }
