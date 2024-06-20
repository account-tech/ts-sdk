import {PUBLISHED_AT} from "..";
import {GenericArg, ObjectArg, generic, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export interface BorrowArgs { executable: ObjectArg; multisig: ObjectArg; receiving: ObjectArg; witness: GenericArg; idx: bigint | TransactionArgument }

export function borrow( txb: TransactionBlock, typeArgs: [string, string], args: BorrowArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::owned::borrow`, typeArguments: typeArgs, arguments: [ obj(txb, args.executable), obj(txb, args.multisig), obj(txb, args.receiving), generic(txb, `${typeArgs[1]}`, args.witness), pure(txb, args.idx, `u64`) ], }) }

export interface PutBackArgs { executable: ObjectArg; multisig: ObjectArg; returned: GenericArg; witness: GenericArg; idx: bigint | TransactionArgument }

export function putBack( txb: TransactionBlock, typeArgs: [string, string], args: PutBackArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::owned::put_back`, typeArguments: typeArgs, arguments: [ obj(txb, args.executable), obj(txb, args.multisig), generic(txb, `${typeArgs[0]}`, args.returned), generic(txb, `${typeArgs[1]}`, args.witness), pure(txb, args.idx, `u64`) ], }) }

export interface WithdrawArgs { executable: ObjectArg; multisig: ObjectArg; receiving: ObjectArg; witness: GenericArg; idx: bigint | TransactionArgument }

export function withdraw( txb: TransactionBlock, typeArgs: [string, string], args: WithdrawArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::owned::withdraw`, typeArguments: typeArgs, arguments: [ obj(txb, args.executable), obj(txb, args.multisig), obj(txb, args.receiving), generic(txb, `${typeArgs[1]}`, args.witness), pure(txb, args.idx, `u64`) ], }) }

export interface DestroyBorrowArgs { executable: ObjectArg; witness: GenericArg }

export function destroyBorrow( txb: TransactionBlock, typeArg: string, args: DestroyBorrowArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::owned::destroy_borrow`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), generic(txb, `${typeArg}`, args.witness) ], }) }

export interface DestroyWithdrawArgs { executable: ObjectArg; witness: GenericArg }

export function destroyWithdraw( txb: TransactionBlock, typeArg: string, args: DestroyWithdrawArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::owned::destroy_withdraw`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), generic(txb, `${typeArg}`, args.witness) ], }) }

export interface NewBorrowArgs { proposal: ObjectArg; objects: Array<string | TransactionArgument> | TransactionArgument }

export function newBorrow( txb: TransactionBlock, args: NewBorrowArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::owned::new_borrow`, arguments: [ obj(txb, args.proposal), pure(txb, args.objects, `vector<0x2::object::ID>`) ], }) }

export interface NewWithdrawArgs { proposal: ObjectArg; objects: Array<string | TransactionArgument> | TransactionArgument }

export function newWithdraw( txb: TransactionBlock, args: NewWithdrawArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::owned::new_withdraw`, arguments: [ obj(txb, args.proposal), pure(txb, args.objects, `vector<0x2::object::ID>`) ], }) }
