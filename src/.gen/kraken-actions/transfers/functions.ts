import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {Coin} from "../../_dependencies/source/0x2/coin/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {Receiving} from "../../_dependencies/source/0x2/transfer/structs";
import {GenericArg, generic, obj, option, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface AccessCoinArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; receiving: (TransactionObjectInput | TransactionArgument | null); witness: GenericArg }

export function accessCoin( tx: Transaction, typeArgs: [string, string], args: AccessCoinArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::access_coin`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.multisig), option(tx, `${Receiving.$typeName}<${Coin.$typeName}<${typeArgs[0]}>>`, args.receiving), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }

export function isMint( tx: Transaction, typeArg: string, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::is_mint`, typeArguments: [typeArg], arguments: [ obj(tx, executable) ], }) }

export function isSpend( tx: Transaction, typeArg: string, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::is_spend`, typeArguments: [typeArg], arguments: [ obj(tx, executable) ], }) }

export function isWithdraw( tx: Transaction, typeArg: string, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::is_withdraw`, typeArguments: [typeArg], arguments: [ obj(tx, executable) ], }) }

export function completeTransfers( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::complete_transfers`, arguments: [ obj(tx, executable) ], }) }

export function confirmTransferCoin( tx: Transaction, typeArg: string, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::confirm_transfer_coin`, typeArguments: [typeArg], arguments: [ obj(tx, executable) ], }) }

export function confirmTransferObjects( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::confirm_transfer_objects`, arguments: [ obj(tx, executable) ], }) }

export interface DestroyTransferCoinArgs { executable: TransactionObjectInput; witness: GenericArg }

export function destroyTransferCoin( tx: Transaction, typeArgs: [string, string], args: DestroyTransferCoinArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::destroy_transfer_coin`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }

export interface DestroyTransferObjectsArgs { executable: TransactionObjectInput; witness: GenericArg }

export function destroyTransferObjects( tx: Transaction, typeArg: string, args: DestroyTransferObjectsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::destroy_transfer_objects`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface ExecuteTransferCoinArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; receiving: (TransactionObjectInput | TransactionArgument | null) }

export function executeTransferCoin( tx: Transaction, typeArg: string, args: ExecuteTransferCoinArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::execute_transfer_coin`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), option(tx, `${Receiving.$typeName}<${Coin.$typeName}<${typeArg}>>`, args.receiving) ], }) }

export interface ExecuteTransferObjectArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; receiving: TransactionObjectInput }

export function executeTransferObject( tx: Transaction, typeArg: string, args: ExecuteTransferObjectArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::execute_transfer_object`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.receiving) ], }) }

export interface NewTransferCoinMintedArgs { proposal: TransactionObjectInput; amount: bigint | TransactionArgument; recipient: string | TransactionArgument }

export function newTransferCoinMinted( tx: Transaction, typeArg: string, args: NewTransferCoinMintedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::new_transfer_coin_minted`, typeArguments: [typeArg], arguments: [ obj(tx, args.proposal), pure(tx, args.amount, `u64`), pure(tx, args.recipient, `address`) ], }) }

export interface NewTransferCoinOwnedArgs { proposal: TransactionObjectInput; objects: Array<string | TransactionArgument> | TransactionArgument; recipient: string | TransactionArgument }

export function newTransferCoinOwned( tx: Transaction, args: NewTransferCoinOwnedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::new_transfer_coin_owned`, arguments: [ obj(tx, args.proposal), pure(tx, args.objects, `vector<${ID.$typeName}>`), pure(tx, args.recipient, `address`) ], }) }

export interface NewTransferCoinTreasuryArgs { proposal: TransactionObjectInput; treasuryName: string | TransactionArgument; coinTypes: Array<string | TransactionArgument> | TransactionArgument; amounts: Array<bigint | TransactionArgument> | TransactionArgument; recipient: string | TransactionArgument }

export function newTransferCoinTreasury( tx: Transaction, args: NewTransferCoinTreasuryArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::new_transfer_coin_treasury`, arguments: [ obj(tx, args.proposal), pure(tx, args.treasuryName, `${String.$typeName}`), pure(tx, args.coinTypes, `vector<${String.$typeName}>`), pure(tx, args.amounts, `vector<u64>`), pure(tx, args.recipient, `address`) ], }) }

export interface NewTransferObjectsArgs { proposal: TransactionObjectInput; objects: Array<string | TransactionArgument> | TransactionArgument; recipient: string | TransactionArgument }

export function newTransferObjects( tx: Transaction, args: NewTransferObjectsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::new_transfer_objects`, arguments: [ obj(tx, args.proposal), pure(tx, args.objects, `vector<${ID.$typeName}>`), pure(tx, args.recipient, `address`) ], }) }

export interface ProposeTransferCoinMintedArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; amounts: Array<bigint | TransactionArgument> | TransactionArgument; recipients: Array<string | TransactionArgument> | TransactionArgument }

export function proposeTransferCoinMinted( tx: Transaction, typeArg: string, args: ProposeTransferCoinMintedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::propose_transfer_coin_minted`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.amounts, `vector<u64>`), pure(tx, args.recipients, `vector<address>`) ], }) }

export interface ProposeTransferCoinOwnedArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; coinObjects: Array<Array<string | TransactionArgument> | TransactionArgument> | TransactionArgument; recipients: Array<string | TransactionArgument> | TransactionArgument }

export function proposeTransferCoinOwned( tx: Transaction, args: ProposeTransferCoinOwnedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::propose_transfer_coin_owned`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.coinObjects, `vector<vector<${ID.$typeName}>>`), pure(tx, args.recipients, `vector<address>`) ], }) }

export interface ProposeTransferCoinTreasuryArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; treasuryName: string | TransactionArgument; coinTypes: Array<Array<string | TransactionArgument> | TransactionArgument> | TransactionArgument; coinAmounts: Array<Array<bigint | TransactionArgument> | TransactionArgument> | TransactionArgument; recipients: Array<string | TransactionArgument> | TransactionArgument }

export function proposeTransferCoinTreasury( tx: Transaction, args: ProposeTransferCoinTreasuryArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::propose_transfer_coin_treasury`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.treasuryName, `${String.$typeName}`), pure(tx, args.coinTypes, `vector<vector<${String.$typeName}>>`), pure(tx, args.coinAmounts, `vector<vector<u64>>`), pure(tx, args.recipients, `vector<address>`) ], }) }

export interface ProposeTransferObjectsArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; objects: Array<Array<string | TransactionArgument> | TransactionArgument> | TransactionArgument; recipients: Array<string | TransactionArgument> | TransactionArgument }

export function proposeTransferObjects( tx: Transaction, args: ProposeTransferObjectsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::propose_transfer_objects`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.objects, `vector<vector<${ID.$typeName}>>`), pure(tx, args.recipients, `vector<address>`) ], }) }

export interface TransferCoinArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; coin: TransactionObjectInput; witness: GenericArg }

export function transferCoin( tx: Transaction, typeArgs: [string, string], args: TransferCoinArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::transfer_coin`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.coin), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }

export interface TransferObjectArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; receiving: TransactionObjectInput; witness: GenericArg }

export function transferObject( tx: Transaction, typeArgs: [string, string], args: TransferObjectArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::transfer_object`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.receiving), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }
