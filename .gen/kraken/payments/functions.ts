import {PUBLISHED_AT} from "..";
import {GenericArg, ObjectArg, generic, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function amount( txb: TransactionBlock, typeArg: string, self: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::payments::amount`, typeArguments: [typeArg], arguments: [ obj(txb, self) ], }) }

export function recipient( txb: TransactionBlock, typeArg: string, self: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::payments::recipient`, typeArguments: [typeArg], arguments: [ obj(txb, self) ], }) }

export function balance( txb: TransactionBlock, typeArg: string, self: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::payments::balance`, typeArguments: [typeArg], arguments: [ obj(txb, self) ], }) }

export interface PayArgs { executable: ObjectArg; multisig: ObjectArg; receiving: ObjectArg; witness: GenericArg; idx: bigint | TransactionArgument }

export function pay( txb: TransactionBlock, typeArgs: [string, string], args: PayArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::payments::pay`, typeArguments: typeArgs, arguments: [ obj(txb, args.executable), obj(txb, args.multisig), obj(txb, args.receiving), generic(txb, `${typeArgs[0]}`, args.witness), pure(txb, args.idx, `u64`) ], }) }

export interface CancelPaymentStreamArgs { stream: ObjectArg; multisig: ObjectArg }

export function cancelPaymentStream( txb: TransactionBlock, typeArg: string, args: CancelPaymentStreamArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::payments::cancel_payment_stream`, typeArguments: [typeArg], arguments: [ obj(txb, args.stream), obj(txb, args.multisig) ], }) }

export function destroyEmptyStream( txb: TransactionBlock, typeArg: string, stream: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::payments::destroy_empty_stream`, typeArguments: [typeArg], arguments: [ obj(txb, stream) ], }) }

export interface DestroyPayArgs { executable: ObjectArg; witness: GenericArg }

export function destroyPay( txb: TransactionBlock, typeArg: string, args: DestroyPayArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::payments::destroy_pay`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), generic(txb, `${typeArg}`, args.witness) ], }) }

export function disburse( txb: TransactionBlock, typeArg: string, stream: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::payments::disburse`, typeArguments: [typeArg], arguments: [ obj(txb, stream) ], }) }

export interface ExecutePayArgs { executable: ObjectArg; multisig: ObjectArg; receiving: ObjectArg }

export function executePay( txb: TransactionBlock, typeArg: string, args: ExecutePayArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::payments::execute_pay`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), obj(txb, args.multisig), obj(txb, args.receiving) ], }) }

export function interval( txb: TransactionBlock, typeArg: string, self: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::payments::interval`, typeArguments: [typeArg], arguments: [ obj(txb, self) ], }) }

export function lastEpoch( txb: TransactionBlock, typeArg: string, self: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::payments::last_epoch`, typeArguments: [typeArg], arguments: [ obj(txb, self) ], }) }

export interface NewPayArgs { proposal: ObjectArg; coin: string | TransactionArgument; amount: bigint | TransactionArgument; interval: bigint | TransactionArgument; recipient: string | TransactionArgument }

export function newPay( txb: TransactionBlock, args: NewPayArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::payments::new_pay`, arguments: [ obj(txb, args.proposal), pure(txb, args.coin, `0x2::object::ID`), pure(txb, args.amount, `u64`), pure(txb, args.interval, `u64`), pure(txb, args.recipient, `address`) ], }) }

export interface ProposePayArgs { multisig: ObjectArg; key: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument; coin: string | TransactionArgument; amount: bigint | TransactionArgument; interval: bigint | TransactionArgument; recipient: string | TransactionArgument }

export function proposePay( txb: TransactionBlock, args: ProposePayArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::payments::propose_pay`, arguments: [ obj(txb, args.multisig), pure(txb, args.key, `0x1::string::String`), pure(txb, args.executionTime, `u64`), pure(txb, args.expirationEpoch, `u64`), pure(txb, args.description, `0x1::string::String`), pure(txb, args.coin, `0x2::object::ID`), pure(txb, args.amount, `u64`), pure(txb, args.interval, `u64`), pure(txb, args.recipient, `address`) ], }) }
