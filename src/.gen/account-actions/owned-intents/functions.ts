import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface CompleteWithdrawAndTransferArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function completeWithdrawAndTransfer( tx: Transaction, typeArgs: [string, string], args: CompleteWithdrawAndTransferArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned_intents::complete_withdraw_and_transfer`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export interface ExecuteWithdrawAndTransferArgs { executable: TransactionObjectInput; account: TransactionObjectInput; receiving: TransactionObjectInput }

export function executeWithdrawAndTransfer( tx: Transaction, typeArgs: [string, string, string], args: ExecuteWithdrawAndTransferArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned_intents::execute_withdraw_and_transfer`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.receiving) ], }) }

export interface ExecuteWithdrawAndTransferToVaultArgs { executable: TransactionObjectInput; account: TransactionObjectInput; receiving: TransactionObjectInput }

export function executeWithdrawAndTransferToVault( tx: Transaction, typeArgs: [string, string, string], args: ExecuteWithdrawAndTransferToVaultArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned_intents::execute_withdraw_and_transfer_to_vault`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.receiving) ], }) }

export interface ExecuteWithdrawAndVestArgs { executable: TransactionObjectInput; account: TransactionObjectInput; receiving: TransactionObjectInput }

export function executeWithdrawAndVest( tx: Transaction, typeArgs: [string, string, string], args: ExecuteWithdrawAndVestArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned_intents::execute_withdraw_and_vest`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.receiving) ], }) }

export interface RequestWithdrawAndTransferArgs { auth: TransactionObjectInput; outcome: GenericArg; account: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationTime: bigint | TransactionArgument; objectIds: Array<string | TransactionArgument> | TransactionArgument; recipients: Array<string | TransactionArgument> | TransactionArgument }

export function requestWithdrawAndTransfer( tx: Transaction, typeArgs: [string, string], args: RequestWithdrawAndTransferArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned_intents::request_withdraw_and_transfer`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), generic(tx, `${typeArgs[1]}`, args.outcome), obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationTime, `u64`), pure(tx, args.objectIds, `vector<${ID.$typeName}>`), pure(tx, args.recipients, `vector<address>`) ], }) }

export interface RequestWithdrawAndTransferToVaultArgs { auth: TransactionObjectInput; outcome: GenericArg; account: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationTime: bigint | TransactionArgument; coinId: string | TransactionArgument; coinAmount: bigint | TransactionArgument; vaultName: string | TransactionArgument }

export function requestWithdrawAndTransferToVault( tx: Transaction, typeArgs: [string, string, string], args: RequestWithdrawAndTransferToVaultArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned_intents::request_withdraw_and_transfer_to_vault`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), generic(tx, `${typeArgs[1]}`, args.outcome), obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationTime, `u64`), pure(tx, args.coinId, `${ID.$typeName}`), pure(tx, args.coinAmount, `u64`), pure(tx, args.vaultName, `${String.$typeName}`) ], }) }

export interface RequestWithdrawAndVestArgs { auth: TransactionObjectInput; outcome: GenericArg; account: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationTime: bigint | TransactionArgument; coinId: string | TransactionArgument; startTimestamp: bigint | TransactionArgument; endTimestamp: bigint | TransactionArgument; recipient: string | TransactionArgument }

export function requestWithdrawAndVest( tx: Transaction, typeArgs: [string, string], args: RequestWithdrawAndVestArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned_intents::request_withdraw_and_vest`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), generic(tx, `${typeArgs[1]}`, args.outcome), obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationTime, `u64`), pure(tx, args.coinId, `${ID.$typeName}`), pure(tx, args.startTimestamp, `u64`), pure(tx, args.endTimestamp, `u64`), pure(tx, args.recipient, `address`) ], }) }
