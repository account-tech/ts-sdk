import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface NewArgs { multisig: TransactionObjectInput; name: string | TransactionArgument }

export function new_( tx: Transaction, args: NewArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::new`, arguments: [ obj(tx, args.multisig), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface ListArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; kiosk: TransactionObjectInput; witness: GenericArg }

export function list( tx: Transaction, typeArgs: [string, string], args: ListArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::list`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.kiosk), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }

export interface TakeArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; multisigKiosk: TransactionObjectInput; recipientKiosk: TransactionObjectInput; recipientCap: TransactionObjectInput; policy: TransactionObjectInput; witness: GenericArg }

export function take( tx: Transaction, typeArgs: [string, string], args: TakeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::take`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.multisigKiosk), obj(tx, args.recipientKiosk), obj(tx, args.recipientCap), obj(tx, args.policy), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }

export interface DelistArgs { multisig: TransactionObjectInput; kiosk: TransactionObjectInput; name: string | TransactionArgument; nft: string | TransactionArgument }

export function delist( tx: Transaction, typeArg: string, args: DelistArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::delist`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), obj(tx, args.kiosk), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.nft, `${ID.$typeName}`) ], }) }

export interface PlaceArgs { multisig: TransactionObjectInput; multisigKiosk: TransactionObjectInput; senderKiosk: TransactionObjectInput; senderCap: TransactionObjectInput; name: string | TransactionArgument; nftId: string | TransactionArgument; policy: TransactionObjectInput }

export function place( tx: Transaction, typeArg: string, args: PlaceArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::place`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), obj(tx, args.multisigKiosk), obj(tx, args.senderKiosk), obj(tx, args.senderCap), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.nftId, `${ID.$typeName}`), obj(tx, args.policy) ], }) }

export interface BorrowLockArgs { multisig: TransactionObjectInput; name: string | TransactionArgument }

export function borrowLock( tx: Transaction, args: BorrowLockArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::borrow_lock`, arguments: [ obj(tx, args.multisig), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface BorrowLockMutArgs { multisig: TransactionObjectInput; name: string | TransactionArgument }

export function borrowLockMut( tx: Transaction, args: BorrowLockMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::borrow_lock_mut`, arguments: [ obj(tx, args.multisig), pure(tx, args.name, `${String.$typeName}`) ], }) }

export function completeList( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::complete_list`, arguments: [ obj(tx, executable) ], }) }

export function completeTake( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::complete_take`, arguments: [ obj(tx, executable) ], }) }

export interface DestroyListArgs { executable: TransactionObjectInput; witness: GenericArg }

export function destroyList( tx: Transaction, typeArg: string, args: DestroyListArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::destroy_list`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface DestroyTakeArgs { executable: TransactionObjectInput; witness: GenericArg }

export function destroyTake( tx: Transaction, typeArg: string, args: DestroyTakeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::destroy_take`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface ExecuteListArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; kiosk: TransactionObjectInput }

export function executeList( tx: Transaction, typeArg: string, args: ExecuteListArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::execute_list`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.kiosk) ], }) }

export interface ExecuteTakeArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; multisigKiosk: TransactionObjectInput; recipientKiosk: TransactionObjectInput; recipientCap: TransactionObjectInput; policy: TransactionObjectInput }

export function executeTake( tx: Transaction, typeArg: string, args: ExecuteTakeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::execute_take`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.multisigKiosk), obj(tx, args.recipientKiosk), obj(tx, args.recipientCap), obj(tx, args.policy) ], }) }

export interface NewListArgs { proposal: TransactionObjectInput; name: string | TransactionArgument; nftIds: Array<string | TransactionArgument> | TransactionArgument; prices: Array<bigint | TransactionArgument> | TransactionArgument }

export function newList( tx: Transaction, args: NewListArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::new_list`, arguments: [ obj(tx, args.proposal), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.nftIds, `vector<${ID.$typeName}>`), pure(tx, args.prices, `vector<u64>`) ], }) }

export interface NewTakeArgs { proposal: TransactionObjectInput; nftIds: Array<string | TransactionArgument> | TransactionArgument; recipient: string | TransactionArgument }

export function newTake( tx: Transaction, args: NewTakeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::new_take`, arguments: [ obj(tx, args.proposal), pure(tx, args.nftIds, `vector<${ID.$typeName}>`), pure(tx, args.recipient, `address`) ], }) }

export interface ProposeListArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; name: string | TransactionArgument; nftIds: Array<string | TransactionArgument> | TransactionArgument; prices: Array<bigint | TransactionArgument> | TransactionArgument }

export function proposeList( tx: Transaction, args: ProposeListArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::propose_list`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.nftIds, `vector<${ID.$typeName}>`), pure(tx, args.prices, `vector<u64>`) ], }) }

export interface ProposeTakeArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; name: string | TransactionArgument; nftIds: Array<string | TransactionArgument> | TransactionArgument; recipient: string | TransactionArgument }

export function proposeTake( tx: Transaction, args: ProposeTakeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::propose_take`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.nftIds, `vector<${ID.$typeName}>`), pure(tx, args.recipient, `address`) ], }) }

export interface WithdrawProfitsArgs { multisig: TransactionObjectInput; kiosk: TransactionObjectInput; name: string | TransactionArgument }

export function withdrawProfits( tx: Transaction, args: WithdrawProfitsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::withdraw_profits`, arguments: [ obj(tx, args.multisig), obj(tx, args.kiosk), pure(tx, args.name, `${String.$typeName}`) ], }) }
