import {PUBLISHED_AT} from "..";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function destroyEmpty( tx: Transaction, typeArg: string, stream: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vesting::destroy_empty`, typeArguments: [typeArg], arguments: [ obj(tx, stream) ], }) }

export function recipient( tx: Transaction, typeArg: string, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vesting::recipient`, typeArguments: [typeArg], arguments: [ obj(tx, self) ], }) }

export interface ClaimArgs { stream: TransactionObjectInput; cap: TransactionObjectInput; clock: TransactionObjectInput }

export function claim( tx: Transaction, typeArg: string, args: ClaimArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vesting::claim`, typeArguments: [typeArg], arguments: [ obj(tx, args.stream), obj(tx, args.cap), obj(tx, args.clock) ], }) }

export function balanceValue( tx: Transaction, typeArg: string, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vesting::balance_value`, typeArguments: [typeArg], arguments: [ obj(tx, self) ], }) }

export interface CancelPaymentArgs { auth: TransactionObjectInput; stream: TransactionObjectInput; account: TransactionObjectInput }

export function cancelPayment( tx: Transaction, typeArgs: [string, string, string], args: CancelPaymentArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vesting::cancel_payment`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.stream), obj(tx, args.account) ], }) }

export function deleteVest( tx: Transaction, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vesting::delete_vest`, arguments: [ obj(tx, expired) ], }) }

export function destroyCap( tx: Transaction, cap: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vesting::destroy_cap`, arguments: [ obj(tx, cap) ], }) }

export interface DisburseArgs { stream: TransactionObjectInput; clock: TransactionObjectInput }

export function disburse( tx: Transaction, typeArg: string, args: DisburseArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vesting::disburse`, typeArguments: [typeArg], arguments: [ obj(tx, args.stream), obj(tx, args.clock) ], }) }

export interface DoVestArgs { executable: TransactionObjectInput; account: TransactionObjectInput; coin: TransactionObjectInput; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function doVest( tx: Transaction, typeArgs: [string, string, string, string], args: DoVestArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vesting::do_vest`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.coin), obj(tx, args.versionWitness), generic(tx, `${typeArgs[3]}`, args.intentWitness) ], }) }

export function endTimestamp( tx: Transaction, typeArg: string, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vesting::end_timestamp`, typeArguments: [typeArg], arguments: [ obj(tx, self) ], }) }

export function lastClaimed( tx: Transaction, typeArg: string, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vesting::last_claimed`, typeArguments: [typeArg], arguments: [ obj(tx, self) ], }) }

export interface NewVestArgs { intent: TransactionObjectInput; account: TransactionObjectInput; startTimestamp: bigint | TransactionArgument; endTimestamp: bigint | TransactionArgument; recipient: string | TransactionArgument; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function newVest( tx: Transaction, typeArgs: [string, string, string], args: NewVestArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vesting::new_vest`, typeArguments: typeArgs, arguments: [ obj(tx, args.intent), obj(tx, args.account), pure(tx, args.startTimestamp, `u64`), pure(tx, args.endTimestamp, `u64`), pure(tx, args.recipient, `address`), obj(tx, args.versionWitness), generic(tx, `${typeArgs[2]}`, args.intentWitness) ], }) }

export function startTimestamp( tx: Transaction, typeArg: string, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::vesting::start_timestamp`, typeArguments: [typeArg], arguments: [ obj(tx, self) ], }) }
