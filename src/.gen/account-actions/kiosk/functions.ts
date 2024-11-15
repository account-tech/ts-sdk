import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface DelistArgs { auth: TransactionObjectInput; account: TransactionObjectInput; kiosk: TransactionObjectInput; name: string | TransactionArgument; nft: string | TransactionArgument }

export function delist( tx: Transaction, typeArgs: [string, string, string], args: DelistArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::delist`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), obj(tx, args.kiosk), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.nft, `${ID.$typeName}`) ], }) }

export interface PlaceArgs { auth: TransactionObjectInput; account: TransactionObjectInput; accountKiosk: TransactionObjectInput; senderKiosk: TransactionObjectInput; senderCap: TransactionObjectInput; policy: TransactionObjectInput; name: string | TransactionArgument; nftId: string | TransactionArgument }

export function place( tx: Transaction, typeArgs: [string, string, string], args: PlaceArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::place`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), obj(tx, args.accountKiosk), obj(tx, args.senderKiosk), obj(tx, args.senderCap), obj(tx, args.policy), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.nftId, `${ID.$typeName}`) ], }) }

export interface HasLockArgs { account: TransactionObjectInput; name: string | TransactionArgument }

export function hasLock( tx: Transaction, typeArgs: [string, string], args: HasLockArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::has_lock`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface BorrowLockArgs { account: TransactionObjectInput; name: string | TransactionArgument }

export function borrowLock( tx: Transaction, typeArgs: [string, string], args: BorrowLockArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::borrow_lock`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface CloseArgs { auth: TransactionObjectInput; account: TransactionObjectInput; name: string | TransactionArgument; kiosk: TransactionObjectInput }

export function close( tx: Transaction, typeArgs: [string, string], args: CloseArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::close`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), pure(tx, args.name, `${String.$typeName}`), obj(tx, args.kiosk) ], }) }

export function completeList( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::complete_list`, arguments: [ obj(tx, executable) ], }) }

export function completeTake( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::complete_take`, arguments: [ obj(tx, executable) ], }) }

export function deleteListAction( tx: Transaction, typeArg: string, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::delete_list_action`, typeArguments: [typeArg], arguments: [ obj(tx, expired) ], }) }

export function deleteTakeAction( tx: Transaction, typeArg: string, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::delete_take_action`, typeArguments: [typeArg], arguments: [ obj(tx, expired) ], }) }

export interface DoListArgs { executable: TransactionObjectInput; account: TransactionObjectInput; kiosk: TransactionObjectInput; version: TransactionObjectInput; witness: GenericArg }

export function doList( tx: Transaction, typeArgs: [string, string, string, string], args: DoListArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::do_list`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.kiosk), obj(tx, args.version), generic(tx, `${typeArgs[3]}`, args.witness) ], }) }

export interface DoTakeArgs { executable: TransactionObjectInput; account: TransactionObjectInput; accountKiosk: TransactionObjectInput; recipientKiosk: TransactionObjectInput; recipientCap: TransactionObjectInput; policy: TransactionObjectInput; version: TransactionObjectInput; witness: GenericArg }

export function doTake( tx: Transaction, typeArgs: [string, string, string, string], args: DoTakeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::do_take`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.accountKiosk), obj(tx, args.recipientKiosk), obj(tx, args.recipientCap), obj(tx, args.policy), obj(tx, args.version), generic(tx, `${typeArgs[3]}`, args.witness) ], }) }

export interface ExecuteListArgs { executable: TransactionObjectInput; account: TransactionObjectInput; kiosk: TransactionObjectInput }

export function executeList( tx: Transaction, typeArgs: [string, string, string], args: ExecuteListArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::execute_list`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.kiosk) ], }) }

export interface ExecuteTakeArgs { executable: TransactionObjectInput; account: TransactionObjectInput; accountKiosk: TransactionObjectInput; recipientKiosk: TransactionObjectInput; recipientCap: TransactionObjectInput; policy: TransactionObjectInput }

export function executeTake( tx: Transaction, typeArgs: [string, string, string], args: ExecuteTakeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::execute_take`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.accountKiosk), obj(tx, args.recipientKiosk), obj(tx, args.recipientCap), obj(tx, args.policy) ], }) }

export interface NewListArgs { proposal: TransactionObjectInput; nftId: string | TransactionArgument; price: bigint | TransactionArgument; witness: GenericArg }

export function newList( tx: Transaction, typeArgs: [string, string], args: NewListArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::new_list`, typeArguments: typeArgs, arguments: [ obj(tx, args.proposal), pure(tx, args.nftId, `${ID.$typeName}`), pure(tx, args.price, `u64`), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }

export interface NewTakeArgs { proposal: TransactionObjectInput; nftId: string | TransactionArgument; recipient: string | TransactionArgument; witness: GenericArg }

export function newTake( tx: Transaction, typeArgs: [string, string], args: NewTakeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::new_take`, typeArguments: typeArgs, arguments: [ obj(tx, args.proposal), pure(tx, args.nftId, `${ID.$typeName}`), pure(tx, args.recipient, `address`), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }

export interface OpenArgs { auth: TransactionObjectInput; account: TransactionObjectInput; name: string | TransactionArgument }

export function open( tx: Transaction, typeArgs: [string, string], args: OpenArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::open`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface ProposeListArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; kioskName: string | TransactionArgument; nftIds: Array<string | TransactionArgument> | TransactionArgument; prices: Array<bigint | TransactionArgument> | TransactionArgument }

export function proposeList( tx: Transaction, typeArgs: [string, string], args: ProposeListArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::propose_list`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.kioskName, `${String.$typeName}`), pure(tx, args.nftIds, `vector<${ID.$typeName}>`), pure(tx, args.prices, `vector<u64>`) ], }) }

export interface ProposeTakeArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; kioskName: string | TransactionArgument; nftIds: Array<string | TransactionArgument> | TransactionArgument; recipient: string | TransactionArgument }

export function proposeTake( tx: Transaction, typeArgs: [string, string], args: ProposeTakeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::propose_take`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.kioskName, `${String.$typeName}`), pure(tx, args.nftIds, `vector<${ID.$typeName}>`), pure(tx, args.recipient, `address`) ], }) }

export interface WithdrawProfitsArgs { auth: TransactionObjectInput; account: TransactionObjectInput; kiosk: TransactionObjectInput; name: string | TransactionArgument }

export function withdrawProfits( tx: Transaction, typeArgs: [string, string], args: WithdrawProfitsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk::withdraw_profits`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), obj(tx, args.kiosk), pure(tx, args.name, `${String.$typeName}`) ], }) }
