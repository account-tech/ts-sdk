// import { TransactionBlock, TransactionResult } from "@mysten/sui.js/transactions";

// export function mergeCoins(
//     tx: TransactionBlock, 
//     packageId: string, 
//     multisigId: string, 
//     toKeep: string, 
//     toMerge: string[], 
//     coinType: string
// ): TransactionResult {
//     return tx.moveCall({
//         target: `${packageId}::coin_operations::merge`,
//         arguments: [
//             tx.object(multisigId), 
//             tx.pure(toKeep),
//             tx.pure(toMerge),
//         ],
//         typeArguments: [coinType]
//     });
// }

// export function splitCoins(
//     tx: TransactionBlock, 
//     packageId: string, 
//     multisigId: string, 
//     toKeep: string, 
//     toSplit: string[], 
//     coinType: string
// ): TransactionResult {
//     return tx.moveCall({
//         target: `${packageId}::coin_operations::split`,
//         arguments: [
//             tx.object(multisigId), 
//             tx.pure(toKeep),
//             tx.pure(toSplit),
//         ],
//         typeArguments: [coinType]
//     });
// }