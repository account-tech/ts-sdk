import {PUBLISHED_AT} from "..";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface AddFeeArgs { adminCap: TransactionObjectInput; fees: TransactionObjectInput; recipient: string | TransactionArgument; bps: bigint | TransactionArgument }

export function addFee( tx: Transaction, args: AddFeeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::fees::add_fee`, arguments: [ obj(tx, args.adminCap), obj(tx, args.fees), pure(tx, args.recipient, `address`), pure(tx, args.bps, `u64`) ], }) }

export function assertFeesNotTooHigh( tx: Transaction, fees: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::fees::assert_fees_not_too_high`, arguments: [ obj(tx, fees) ], }) }

export interface CollectArgs { fees: TransactionObjectInput; coin: TransactionObjectInput }

export function collect( tx: Transaction, typeArg: string, args: CollectArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::fees::collect`, typeArguments: [typeArg], arguments: [ obj(tx, args.fees), obj(tx, args.coin) ], }) }

export interface EditFeeArgs { adminCap: TransactionObjectInput; fees: TransactionObjectInput; recipient: string | TransactionArgument; bps: bigint | TransactionArgument }

export function editFee( tx: Transaction, args: EditFeeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::fees::edit_fee`, arguments: [ obj(tx, args.adminCap), obj(tx, args.fees), pure(tx, args.recipient, `address`), pure(tx, args.bps, `u64`) ], }) }

export function init( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::fees::init`, arguments: [ ], }) }

export function inner( tx: Transaction, fees: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::fees::inner`, arguments: [ obj(tx, fees) ], }) }

export interface RemoveFeeArgs { adminCap: TransactionObjectInput; fees: TransactionObjectInput; recipient: string | TransactionArgument }

export function removeFee( tx: Transaction, args: RemoveFeeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::fees::remove_fee`, arguments: [ obj(tx, args.adminCap), obj(tx, args.fees), pure(tx, args.recipient, `address`) ], }) }
