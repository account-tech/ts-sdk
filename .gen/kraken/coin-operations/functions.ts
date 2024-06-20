import {PUBLISHED_AT} from "..";
import {ObjectArg, obj, pure, vector} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export interface SplitArgs { multisig: ObjectArg; coin: ObjectArg; amounts: Array<bigint | TransactionArgument> | TransactionArgument }

export function split( txb: TransactionBlock, typeArg: string, args: SplitArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::coin_operations::split`, typeArguments: [typeArg], arguments: [ obj(txb, args.multisig), obj(txb, args.coin), pure(txb, args.amounts, `vector<u64>`) ], }) }

export function merge( txb: TransactionBlock, typeArg: string, coins: Array<ObjectArg> | TransactionArgument ) { return txb.moveCall({ target: `${PUBLISHED_AT}::coin_operations::merge`, typeArguments: [typeArg], arguments: [ vector(txb, `0x2::coin::Coin<${typeArg}>`, coins) ], }) }

export interface MergeAndSplitArgs { multisig: ObjectArg; toMerge: Array<ObjectArg> | TransactionArgument; toSplit: Array<bigint | TransactionArgument> | TransactionArgument }

export function mergeAndSplit( txb: TransactionBlock, typeArg: string, args: MergeAndSplitArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::coin_operations::merge_and_split`, typeArguments: [typeArg], arguments: [ obj(txb, args.multisig), vector(txb, `0x2::transfer::Receiving<0x2::coin::Coin<${typeArg}>>`, args.toMerge), pure(txb, args.toSplit, `vector<u64>`) ], }) }
