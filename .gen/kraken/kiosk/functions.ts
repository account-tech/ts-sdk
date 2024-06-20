import {PUBLISHED_AT} from "..";
import {GenericArg, ObjectArg, generic, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export function new_( txb: TransactionBlock, multisig: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::kiosk::new`, arguments: [ obj(txb, multisig) ], }) }

export interface ListArgs { executable: ObjectArg; kiosk: ObjectArg; lock: ObjectArg; witness: GenericArg; idx: bigint | TransactionArgument }

export function list( txb: TransactionBlock, typeArgs: [string, string], args: ListArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::kiosk::list`, typeArguments: typeArgs, arguments: [ obj(txb, args.executable), obj(txb, args.kiosk), obj(txb, args.lock), generic(txb, `${typeArgs[1]}`, args.witness), pure(txb, args.idx, `u64`) ], }) }

export interface TakeArgs { executable: ObjectArg; multisigKiosk: ObjectArg; lock: ObjectArg; recipientKiosk: ObjectArg; recipientCap: ObjectArg; policy: ObjectArg; witness: GenericArg; idx: bigint | TransactionArgument }

export function take( txb: TransactionBlock, typeArgs: [string, string], args: TakeArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::kiosk::take`, typeArguments: typeArgs, arguments: [ obj(txb, args.executable), obj(txb, args.multisigKiosk), obj(txb, args.lock), obj(txb, args.recipientKiosk), obj(txb, args.recipientCap), obj(txb, args.policy), generic(txb, `${typeArgs[1]}`, args.witness), pure(txb, args.idx, `u64`) ], }) }

export interface DelistArgs { multisig: ObjectArg; kiosk: ObjectArg; lock: ObjectArg; nft: string | TransactionArgument }

export function delist( txb: TransactionBlock, typeArg: string, args: DelistArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::kiosk::delist`, typeArguments: [typeArg], arguments: [ obj(txb, args.multisig), obj(txb, args.kiosk), obj(txb, args.lock), pure(txb, args.nft, `0x2::object::ID`) ], }) }

export interface PlaceArgs { multisig: ObjectArg; multisigKiosk: ObjectArg; lock: ObjectArg; senderKiosk: ObjectArg; senderCap: ObjectArg; nftId: string | TransactionArgument; policy: ObjectArg }

export function place( txb: TransactionBlock, typeArg: string, args: PlaceArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::kiosk::place`, typeArguments: [typeArg], arguments: [ obj(txb, args.multisig), obj(txb, args.multisigKiosk), obj(txb, args.lock), obj(txb, args.senderKiosk), obj(txb, args.senderCap), pure(txb, args.nftId, `0x2::object::ID`), obj(txb, args.policy) ], }) }

export interface BorrowCapArgs { multisig: ObjectArg; kioskOwnerLock: ObjectArg }

export function borrowCap( txb: TransactionBlock, args: BorrowCapArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::kiosk::borrow_cap`, arguments: [ obj(txb, args.multisig), obj(txb, args.kioskOwnerLock) ], }) }

export function completeList( txb: TransactionBlock, executable: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::kiosk::complete_list`, arguments: [ obj(txb, executable) ], }) }

export function completeTake( txb: TransactionBlock, executable: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::kiosk::complete_take`, arguments: [ obj(txb, executable) ], }) }

export interface DestroyListArgs { executable: ObjectArg; witness: GenericArg }

export function destroyList( txb: TransactionBlock, typeArg: string, args: DestroyListArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::kiosk::destroy_list`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), generic(txb, `${typeArg}`, args.witness) ], }) }

export interface DestroyTakeArgs { executable: ObjectArg; witness: GenericArg }

export function destroyTake( txb: TransactionBlock, typeArg: string, args: DestroyTakeArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::kiosk::destroy_take`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), generic(txb, `${typeArg}`, args.witness) ], }) }

export interface ExecuteListArgs { executable: ObjectArg; kiosk: ObjectArg; lock: ObjectArg }

export function executeList( txb: TransactionBlock, typeArg: string, args: ExecuteListArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::kiosk::execute_list`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), obj(txb, args.kiosk), obj(txb, args.lock) ], }) }

export interface ExecuteTakeArgs { executable: ObjectArg; multisigKiosk: ObjectArg; lock: ObjectArg; recipientKiosk: ObjectArg; recipientCap: ObjectArg; policy: ObjectArg }

export function executeTake( txb: TransactionBlock, typeArg: string, args: ExecuteTakeArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::kiosk::execute_take`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), obj(txb, args.multisigKiosk), obj(txb, args.lock), obj(txb, args.recipientKiosk), obj(txb, args.recipientCap), obj(txb, args.policy) ], }) }

export interface NewListArgs { proposal: ObjectArg; nftIds: Array<string | TransactionArgument> | TransactionArgument; prices: Array<bigint | TransactionArgument> | TransactionArgument }

export function newList( txb: TransactionBlock, args: NewListArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::kiosk::new_list`, arguments: [ obj(txb, args.proposal), pure(txb, args.nftIds, `vector<0x2::object::ID>`), pure(txb, args.prices, `vector<u64>`) ], }) }

export interface NewTakeArgs { proposal: ObjectArg; nftIds: Array<string | TransactionArgument> | TransactionArgument; recipient: string | TransactionArgument }

export function newTake( txb: TransactionBlock, args: NewTakeArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::kiosk::new_take`, arguments: [ obj(txb, args.proposal), pure(txb, args.nftIds, `vector<0x2::object::ID>`), pure(txb, args.recipient, `address`) ], }) }

export interface ProposeListArgs { multisig: ObjectArg; key: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument; nftIds: Array<string | TransactionArgument> | TransactionArgument; prices: Array<bigint | TransactionArgument> | TransactionArgument }

export function proposeList( txb: TransactionBlock, args: ProposeListArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::kiosk::propose_list`, arguments: [ obj(txb, args.multisig), pure(txb, args.key, `0x1::string::String`), pure(txb, args.executionTime, `u64`), pure(txb, args.expirationEpoch, `u64`), pure(txb, args.description, `0x1::string::String`), pure(txb, args.nftIds, `vector<0x2::object::ID>`), pure(txb, args.prices, `vector<u64>`) ], }) }

export interface ProposeTakeArgs { multisig: ObjectArg; key: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument; nftIds: Array<string | TransactionArgument> | TransactionArgument; recipient: string | TransactionArgument }

export function proposeTake( txb: TransactionBlock, args: ProposeTakeArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::kiosk::propose_take`, arguments: [ obj(txb, args.multisig), pure(txb, args.key, `0x1::string::String`), pure(txb, args.executionTime, `u64`), pure(txb, args.expirationEpoch, `u64`), pure(txb, args.description, `0x1::string::String`), pure(txb, args.nftIds, `vector<0x2::object::ID>`), pure(txb, args.recipient, `address`) ], }) }

export interface PutBackCapArgs { multisig: ObjectArg; kioskOwnerLock: ObjectArg }

export function putBackCap( txb: TransactionBlock, args: PutBackCapArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::kiosk::put_back_cap`, arguments: [ obj(txb, args.multisig), obj(txb, args.kioskOwnerLock) ], }) }

export interface WithdrawProfitsArgs { multisig: ObjectArg; kiosk: ObjectArg; lock: ObjectArg }

export function withdrawProfits( txb: TransactionBlock, args: WithdrawProfitsArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::kiosk::withdraw_profits`, arguments: [ obj(txb, args.multisig), obj(txb, args.kiosk), obj(txb, args.lock) ], }) }
