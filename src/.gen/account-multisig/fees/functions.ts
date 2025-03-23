import {PUBLISHED_AT} from "..";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function amount( tx: Transaction, fees: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::fees::amount`, arguments: [ obj(tx, fees) ], }) }

export function init( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::fees::init`, arguments: [ ], }) }

export interface ProcessArgs { fees: TransactionObjectInput; coin: TransactionObjectInput }

export function process( tx: Transaction, args: ProcessArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::fees::process`, arguments: [ obj(tx, args.fees), obj(tx, args.coin) ], }) }

export function recipient( tx: Transaction, fees: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::fees::recipient`, arguments: [ obj(tx, fees) ], }) }

export interface SetAmountArgs { adminCap: TransactionObjectInput; fees: TransactionObjectInput; amount: bigint | TransactionArgument }

export function setAmount( tx: Transaction, args: SetAmountArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::fees::set_amount`, arguments: [ obj(tx, args.adminCap), obj(tx, args.fees), pure(tx, args.amount, `u64`) ], }) }
