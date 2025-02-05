import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface CompleteListNftsArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function completeListNfts( tx: Transaction, typeArgs: [string, string], args: CompleteListNftsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk_intents::complete_list_nfts`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export interface CompleteTakeNftsArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function completeTakeNfts( tx: Transaction, typeArgs: [string, string], args: CompleteTakeNftsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk_intents::complete_take_nfts`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export interface ExecuteListNftsArgs { executable: TransactionObjectInput; account: TransactionObjectInput; kiosk: TransactionObjectInput }

export function executeListNfts( tx: Transaction, typeArgs: [string, string, string], args: ExecuteListNftsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk_intents::execute_list_nfts`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.kiosk) ], }) }

export interface ExecuteTakeNftsArgs { executable: TransactionObjectInput; account: TransactionObjectInput; accountKiosk: TransactionObjectInput; recipientKiosk: TransactionObjectInput; recipientCap: TransactionObjectInput; policy: TransactionObjectInput }

export function executeTakeNfts( tx: Transaction, typeArgs: [string, string, string], args: ExecuteTakeNftsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk_intents::execute_take_nfts`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.accountKiosk), obj(tx, args.recipientKiosk), obj(tx, args.recipientCap), obj(tx, args.policy) ], }) }

export interface RequestListNftsArgs { auth: TransactionObjectInput; outcome: GenericArg; account: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationTime: bigint | TransactionArgument; kioskName: string | TransactionArgument; nftIds: Array<string | TransactionArgument> | TransactionArgument; prices: Array<bigint | TransactionArgument> | TransactionArgument }

export function requestListNfts( tx: Transaction, typeArgs: [string, string], args: RequestListNftsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk_intents::request_list_nfts`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), generic(tx, `${typeArgs[1]}`, args.outcome), obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationTime, `u64`), pure(tx, args.kioskName, `${String.$typeName}`), pure(tx, args.nftIds, `vector<${ID.$typeName}>`), pure(tx, args.prices, `vector<u64>`) ], }) }

export interface RequestTakeNftsArgs { auth: TransactionObjectInput; outcome: GenericArg; account: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationTime: bigint | TransactionArgument; kioskName: string | TransactionArgument; nftIds: Array<string | TransactionArgument> | TransactionArgument; recipient: string | TransactionArgument }

export function requestTakeNfts( tx: Transaction, typeArgs: [string, string], args: RequestTakeNftsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::kiosk_intents::request_take_nfts`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), generic(tx, `${typeArgs[1]}`, args.outcome), obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationTime, `u64`), pure(tx, args.kioskName, `${String.$typeName}`), pure(tx, args.nftIds, `vector<${ID.$typeName}>`), pure(tx, args.recipient, `address`) ], }) }
