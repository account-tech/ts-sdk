import {PUBLISHED_AT} from "..";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function deleteTransferAction( tx: Transaction, typeArg: string, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfer::delete_transfer_action`, typeArguments: [typeArg], arguments: [ obj(tx, expired) ], }) }

export interface DoTransferArgs { executable: TransactionObjectInput; account: TransactionObjectInput; object: GenericArg; version: TransactionObjectInput; witness: GenericArg }

export function doTransfer( tx: Transaction, typeArgs: [string, string, string, string], args: DoTransferArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfer::do_transfer`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.object), obj(tx, args.version), generic(tx, `${typeArgs[3]}`, args.witness) ], }) }

export interface NewTransferArgs { proposal: TransactionObjectInput; recipient: string | TransactionArgument; witness: GenericArg }

export function newTransfer( tx: Transaction, typeArgs: [string, string], args: NewTransferArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfer::new_transfer`, typeArguments: typeArgs, arguments: [ obj(tx, args.proposal), pure(tx, args.recipient, `address`), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }
