import {PUBLISHED_AT} from "..";
import {Coin} from "../../_dependencies/source/0x2/coin/structs";
import {Receiving} from "../../_dependencies/source/0x2/transfer/structs";
import {obj, pure, vector} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface SplitArgs { account: TransactionObjectInput; coin: TransactionObjectInput; amounts: Array<bigint | TransactionArgument> | TransactionArgument }

export function split( tx: Transaction, typeArgs: [string, string, string], args: SplitArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::coin_operations::split`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.coin), pure(tx, args.amounts, `vector<u64>`) ], }) }

export function merge( tx: Transaction, typeArg: string, coins: Array<TransactionObjectInput> | TransactionArgument ) { return tx.moveCall({ target: `${PUBLISHED_AT}::coin_operations::merge`, typeArguments: [typeArg], arguments: [ vector(tx, `${Coin.$typeName}<${typeArg}>`, coins) ], }) }

export interface MergeAndSplitArgs { auth: TransactionObjectInput; account: TransactionObjectInput; toMerge: Array<TransactionObjectInput> | TransactionArgument; toSplit: Array<bigint | TransactionArgument> | TransactionArgument }

export function mergeAndSplit( tx: Transaction, typeArgs: [string, string, string], args: MergeAndSplitArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::coin_operations::merge_and_split`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), vector(tx, `${Receiving.$typeName}<${Coin.$typeName}<${typeArgs[2]}>>`, args.toMerge), pure(tx, args.toSplit, `vector<u64>`) ], }) }
