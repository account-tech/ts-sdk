import {PUBLISHED_AT} from "..";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function deletePay( tx: Transaction, typeArg: string, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::pay::delete_pay`, typeArguments: [typeArg], arguments: [ obj(tx, expired) ], }) }

export interface ExecutePayArgs { executable: TransactionObjectInput; account: TransactionObjectInput; coin: TransactionObjectInput; fees: TransactionObjectInput; clock: TransactionObjectInput }

export function executePay( tx: Transaction, typeArg: string, args: ExecutePayArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::pay::execute_pay`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.coin), obj(tx, args.fees), obj(tx, args.clock) ], }) }

export interface RequestPayArgs { auth: TransactionObjectInput; account: TransactionObjectInput; params: TransactionObjectInput; outcome: TransactionObjectInput; amount: bigint | TransactionArgument }

export function requestPay( tx: Transaction, typeArg: string, args: RequestPayArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::pay::request_pay`, typeArguments: [typeArg], arguments: [ obj(tx, args.auth), obj(tx, args.account), obj(tx, args.params), obj(tx, args.outcome), pure(tx, args.amount, `u64`) ], }) }
