import {PUBLISHED_AT} from "..";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface BorrowArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; receiving: TransactionObjectInput; issuer: GenericArg }

export function borrow( tx: Transaction, typeArgs: [string, string], args: BorrowArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned::borrow`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.receiving), generic(tx, `${typeArgs[1]}`, args.issuer) ], }) }

export interface PutBackArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; returned: GenericArg; issuer: GenericArg }

export function putBack( tx: Transaction, typeArgs: [string, string], args: PutBackArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned::put_back`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.multisig), generic(tx, `${typeArgs[0]}`, args.returned), generic(tx, `${typeArgs[1]}`, args.issuer) ], }) }

export interface WithdrawArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; receiving: TransactionObjectInput; issuer: GenericArg }

export function withdraw( tx: Transaction, typeArgs: [string, string], args: WithdrawArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned::withdraw`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.receiving), generic(tx, `${typeArgs[1]}`, args.issuer) ], }) }

export interface DestroyBorrowArgs { executable: TransactionObjectInput; issuer: GenericArg }

export function destroyBorrow( tx: Transaction, typeArg: string, args: DestroyBorrowArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned::destroy_borrow`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.issuer) ], }) }

export interface DestroyWithdrawArgs { executable: TransactionObjectInput; issuer: GenericArg }

export function destroyWithdraw( tx: Transaction, typeArg: string, args: DestroyWithdrawArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned::destroy_withdraw`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.issuer) ], }) }

export interface NewBorrowArgs { proposal: TransactionObjectInput; objects: Array<string | TransactionArgument> | TransactionArgument }

export function newBorrow( tx: Transaction, args: NewBorrowArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned::new_borrow`, arguments: [ obj(tx, args.proposal), pure(tx, args.objects, `vector<${ID.$typeName}>`) ], }) }

export interface NewWithdrawArgs { proposal: TransactionObjectInput; objects: Array<string | TransactionArgument> | TransactionArgument }

export function newWithdraw( tx: Transaction, args: NewWithdrawArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned::new_withdraw`, arguments: [ obj(tx, args.proposal), pure(tx, args.objects, `vector<${ID.$typeName}>`) ], }) }

export function withdrawIsExecuted( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned::withdraw_is_executed`, arguments: [ obj(tx, executable) ], }) }
