import {PUBLISHED_AT} from "..";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function deleteTransfer( tx: Transaction, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfer::delete_transfer`, arguments: [ obj(tx, expired) ], }) }

export interface DoTransferArgs { executable: TransactionObjectInput; account: TransactionObjectInput; object: GenericArg; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function doTransfer( tx: Transaction, typeArgs: [string, string, string, string], args: DoTransferArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfer::do_transfer`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.object), obj(tx, args.versionWitness), generic(tx, `${typeArgs[3]}`, args.intentWitness) ], }) }

export interface NewTransferArgs { intent: TransactionObjectInput; account: TransactionObjectInput; recipient: string | TransactionArgument; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function newTransfer( tx: Transaction, typeArgs: [string, string, string], args: NewTransferArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfer::new_transfer`, typeArguments: typeArgs, arguments: [ obj(tx, args.intent), obj(tx, args.account), pure(tx, args.recipient, `address`), obj(tx, args.versionWitness), generic(tx, `${typeArgs[2]}`, args.intentWitness) ], }) }
