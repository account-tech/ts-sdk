import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function new_( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::new`, arguments: [ obj(tx, multisig) ], }) }

export interface ListArgs { executable: TransactionObjectInput; kiosk: TransactionObjectInput; lock: TransactionObjectInput; witness: GenericArg; idx: bigint | TransactionArgument }

export function list( tx: Transaction, typeArgs: [string, string], args: ListArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::list`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.kiosk), obj(tx, args.lock), generic(tx, `${typeArgs[1]}`, args.witness), pure(tx, args.idx, `u64`) ], }) }

export interface TakeArgs { executable: TransactionObjectInput; multisigKiosk: TransactionObjectInput; lock: TransactionObjectInput; recipientKiosk: TransactionObjectInput; recipientCap: TransactionObjectInput; policy: TransactionObjectInput; witness: GenericArg; idx: bigint | TransactionArgument }

export function take( tx: Transaction, typeArgs: [string, string], args: TakeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::take`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.multisigKiosk), obj(tx, args.lock), obj(tx, args.recipientKiosk), obj(tx, args.recipientCap), obj(tx, args.policy), generic(tx, `${typeArgs[1]}`, args.witness), pure(tx, args.idx, `u64`) ], }) }

export interface DelistArgs { multisig: TransactionObjectInput; kiosk: TransactionObjectInput; lock: TransactionObjectInput; nft: string | TransactionArgument }

export function delist( tx: Transaction, typeArg: string, args: DelistArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::delist`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), obj(tx, args.kiosk), obj(tx, args.lock), pure(tx, args.nft, `${ID.$typeName}`) ], }) }

export interface PlaceArgs { multisig: TransactionObjectInput; multisigKiosk: TransactionObjectInput; lock: TransactionObjectInput; senderKiosk: TransactionObjectInput; senderCap: TransactionObjectInput; nftId: string | TransactionArgument; policy: TransactionObjectInput }

export function place( tx: Transaction, typeArg: string, args: PlaceArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::place`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), obj(tx, args.multisigKiosk), obj(tx, args.lock), obj(tx, args.senderKiosk), obj(tx, args.senderCap), pure(tx, args.nftId, `${ID.$typeName}`), obj(tx, args.policy) ], }) }

export interface BorrowCapArgs { multisig: TransactionObjectInput; kioskOwnerLock: TransactionObjectInput }

export function borrowCap( tx: Transaction, args: BorrowCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::borrow_cap`, arguments: [ obj(tx, args.multisig), obj(tx, args.kioskOwnerLock) ], }) }

export function putBackCap( tx: Transaction, kioskOwnerLock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::put_back_cap`, arguments: [ obj(tx, kioskOwnerLock) ], }) }

export function completeList( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::complete_list`, arguments: [ obj(tx, executable) ], }) }

export function completeTake( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::complete_take`, arguments: [ obj(tx, executable) ], }) }

export interface DestroyListArgs { executable: TransactionObjectInput; witness: GenericArg }

export function destroyList( tx: Transaction, typeArg: string, args: DestroyListArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::destroy_list`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface DestroyTakeArgs { executable: TransactionObjectInput; witness: GenericArg }

export function destroyTake( tx: Transaction, typeArg: string, args: DestroyTakeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::destroy_take`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface ExecuteListArgs { executable: TransactionObjectInput; kiosk: TransactionObjectInput; lock: TransactionObjectInput }

export function executeList( tx: Transaction, typeArg: string, args: ExecuteListArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::execute_list`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.kiosk), obj(tx, args.lock) ], }) }

export interface ExecuteTakeArgs { executable: TransactionObjectInput; multisigKiosk: TransactionObjectInput; lock: TransactionObjectInput; recipientKiosk: TransactionObjectInput; recipientCap: TransactionObjectInput; policy: TransactionObjectInput }

export function executeTake( tx: Transaction, typeArg: string, args: ExecuteTakeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::execute_take`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisigKiosk), obj(tx, args.lock), obj(tx, args.recipientKiosk), obj(tx, args.recipientCap), obj(tx, args.policy) ], }) }

export interface NewListArgs { proposal: TransactionObjectInput; nftIds: Array<string | TransactionArgument> | TransactionArgument; prices: Array<bigint | TransactionArgument> | TransactionArgument }

export function newList( tx: Transaction, args: NewListArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::new_list`, arguments: [ obj(tx, args.proposal), pure(tx, args.nftIds, `vector<${ID.$typeName}>`), pure(tx, args.prices, `vector<u64>`) ], }) }

export interface NewTakeArgs { proposal: TransactionObjectInput; nftIds: Array<string | TransactionArgument> | TransactionArgument; recipient: string | TransactionArgument }

export function newTake( tx: Transaction, args: NewTakeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::new_take`, arguments: [ obj(tx, args.proposal), pure(tx, args.nftIds, `vector<${ID.$typeName}>`), pure(tx, args.recipient, `address`) ], }) }

export interface ProposeListArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument; nftIds: Array<string | TransactionArgument> | TransactionArgument; prices: Array<bigint | TransactionArgument> | TransactionArgument }

export function proposeList( tx: Transaction, args: ProposeListArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::propose_list`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.nftIds, `vector<${ID.$typeName}>`), pure(tx, args.prices, `vector<u64>`) ], }) }

export interface ProposeTakeArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument; nftIds: Array<string | TransactionArgument> | TransactionArgument; recipient: string | TransactionArgument }

export function proposeTake( tx: Transaction, args: ProposeTakeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::propose_take`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.nftIds, `vector<${ID.$typeName}>`), pure(tx, args.recipient, `address`) ], }) }

export interface WithdrawProfitsArgs { multisig: TransactionObjectInput; kiosk: TransactionObjectInput; lock: TransactionObjectInput }

export function withdrawProfits( tx: Transaction, args: WithdrawProfitsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::withdraw_profits`, arguments: [ obj(tx, args.multisig), obj(tx, args.kiosk), obj(tx, args.lock) ], }) }
