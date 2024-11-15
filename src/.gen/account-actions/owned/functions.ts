import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function completeTransfer( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned::complete_transfer`, arguments: [ obj(tx, executable) ], }) }

export function deleteWithdrawAction( tx: Transaction, typeArg: string, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned::delete_withdraw_action`, typeArguments: [typeArg], arguments: [ obj(tx, expired) ], }) }

export interface DoWithdrawArgs { executable: TransactionObjectInput; account: TransactionObjectInput; receiving: TransactionObjectInput; version: TransactionObjectInput; witness: GenericArg }

export function doWithdraw( tx: Transaction, typeArgs: [string, string, string, string], args: DoWithdrawArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned::do_withdraw`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.receiving), obj(tx, args.version), generic(tx, `${typeArgs[3]}`, args.witness) ], }) }

export interface ExecuteTransferArgs { executable: TransactionObjectInput; account: TransactionObjectInput; receiving: TransactionObjectInput }

export function executeTransfer( tx: Transaction, typeArgs: [string, string, string], args: ExecuteTransferArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned::execute_transfer`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.receiving) ], }) }

export interface ExecuteVestingArgs { executable: TransactionObjectInput; account: TransactionObjectInput; receiving: TransactionObjectInput }

export function executeVesting( tx: Transaction, typeArgs: [string, string, string], args: ExecuteVestingArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned::execute_vesting`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.receiving) ], }) }

export interface NewWithdrawArgs { proposal: TransactionObjectInput; objectId: string | TransactionArgument; witness: GenericArg }

export function newWithdraw( tx: Transaction, typeArgs: [string, string], args: NewWithdrawArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned::new_withdraw`, typeArguments: typeArgs, arguments: [ obj(tx, args.proposal), pure(tx, args.objectId, `${ID.$typeName}`), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }

export interface ProposeTransferArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; objectIds: Array<string | TransactionArgument> | TransactionArgument; recipients: Array<string | TransactionArgument> | TransactionArgument }

export function proposeTransfer( tx: Transaction, typeArgs: [string, string], args: ProposeTransferArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned::propose_transfer`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.objectIds, `vector<${ID.$typeName}>`), pure(tx, args.recipients, `vector<address>`) ], }) }

export interface ProposeVestingArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; coinId: string | TransactionArgument; startTimestamp: bigint | TransactionArgument; endTimestamp: bigint | TransactionArgument; recipient: string | TransactionArgument }

export function proposeVesting( tx: Transaction, typeArgs: [string, string], args: ProposeVestingArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::owned::propose_vesting`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.coinId, `${ID.$typeName}`), pure(tx, args.startTimestamp, `u64`), pure(tx, args.endTimestamp, `u64`), pure(tx, args.recipient, `address`) ], }) }
