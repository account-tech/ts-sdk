import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function amount( tx: Transaction, typeArg: string, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::amount`, typeArguments: [typeArg], arguments: [ obj(tx, self) ], }) }

export function recipient( tx: Transaction, typeArg: string, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::recipient`, typeArguments: [typeArg], arguments: [ obj(tx, self) ], }) }

export function balance( tx: Transaction, typeArg: string, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::balance`, typeArguments: [typeArg], arguments: [ obj(tx, self) ], }) }

export interface PayArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; receiving: TransactionObjectInput; witness: GenericArg; idx: bigint | TransactionArgument }

export function pay( tx: Transaction, typeArgs: [string, string], args: PayArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::pay`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.receiving), generic(tx, `${typeArgs[0]}`, args.witness), pure(tx, args.idx, `u64`) ], }) }

export interface CancelPaymentStreamArgs { stream: TransactionObjectInput; multisig: TransactionObjectInput }

export function cancelPaymentStream( tx: Transaction, typeArg: string, args: CancelPaymentStreamArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::cancel_payment_stream`, typeArguments: [typeArg], arguments: [ obj(tx, args.stream), obj(tx, args.multisig) ], }) }

export function destroyEmptyStream( tx: Transaction, typeArg: string, stream: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::destroy_empty_stream`, typeArguments: [typeArg], arguments: [ obj(tx, stream) ], }) }

export interface DestroyPayArgs { executable: TransactionObjectInput; witness: GenericArg }

export function destroyPay( tx: Transaction, typeArg: string, args: DestroyPayArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::destroy_pay`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }

export function disburse( tx: Transaction, typeArg: string, stream: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::disburse`, typeArguments: [typeArg], arguments: [ obj(tx, stream) ], }) }

export interface ExecutePayArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; receiving: TransactionObjectInput }

export function executePay( tx: Transaction, typeArg: string, args: ExecutePayArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::execute_pay`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.receiving) ], }) }

export function interval( tx: Transaction, typeArg: string, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::interval`, typeArguments: [typeArg], arguments: [ obj(tx, self) ], }) }

export function lastEpoch( tx: Transaction, typeArg: string, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::last_epoch`, typeArguments: [typeArg], arguments: [ obj(tx, self) ], }) }

export interface NewPayArgs { proposal: TransactionObjectInput; coin: string | TransactionArgument; amount: bigint | TransactionArgument; interval: bigint | TransactionArgument; recipient: string | TransactionArgument }

export function newPay( tx: Transaction, args: NewPayArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::new_pay`, arguments: [ obj(tx, args.proposal), pure(tx, args.coin, `${ID.$typeName}`), pure(tx, args.amount, `u64`), pure(tx, args.interval, `u64`), pure(tx, args.recipient, `address`) ], }) }

export interface ProposePayArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument; coin: string | TransactionArgument; amount: bigint | TransactionArgument; interval: bigint | TransactionArgument; recipient: string | TransactionArgument }

export function proposePay( tx: Transaction, args: ProposePayArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::propose_pay`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.coin, `${ID.$typeName}`), pure(tx, args.amount, `u64`), pure(tx, args.interval, `u64`), pure(tx, args.recipient, `address`) ], }) }
