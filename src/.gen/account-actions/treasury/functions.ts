import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function completeTransfer( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::complete_transfer`, arguments: [ obj(tx, executable) ], }) }

export interface ExecuteTransferArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function executeTransfer( tx: Transaction, typeArgs: [string, string, string], args: ExecuteTransferArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::execute_transfer`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export interface ExecuteVestingArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function executeVesting( tx: Transaction, typeArgs: [string, string, string], args: ExecuteVestingArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::execute_vesting`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export interface ProposeTransferArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; treasuryName: string | TransactionArgument; amounts: Array<bigint | TransactionArgument> | TransactionArgument; recipients: Array<string | TransactionArgument> | TransactionArgument }

export function proposeTransfer( tx: Transaction, typeArgs: [string, string, string], args: ProposeTransferArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::propose_transfer`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.treasuryName, `${String.$typeName}`), pure(tx, args.amounts, `vector<u64>`), pure(tx, args.recipients, `vector<address>`) ], }) }

export interface ProposeVestingArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; treasuryName: string | TransactionArgument; coinAmount: bigint | TransactionArgument; startTimestamp: bigint | TransactionArgument; endTimestamp: bigint | TransactionArgument; recipient: string | TransactionArgument }

export function proposeVesting( tx: Transaction, typeArgs: [string, string, string], args: ProposeVestingArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::propose_vesting`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.treasuryName, `${String.$typeName}`), pure(tx, args.coinAmount, `u64`), pure(tx, args.startTimestamp, `u64`), pure(tx, args.endTimestamp, `u64`), pure(tx, args.recipient, `address`) ], }) }

export interface CloseArgs { auth: TransactionObjectInput; account: TransactionObjectInput; name: string | TransactionArgument }

export function close( tx: Transaction, typeArgs: [string, string], args: CloseArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::close`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface OpenArgs { auth: TransactionObjectInput; account: TransactionObjectInput; name: string | TransactionArgument }

export function open( tx: Transaction, typeArgs: [string, string], args: OpenArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::open`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface BorrowTreasuryArgs { account: TransactionObjectInput; name: string | TransactionArgument }

export function borrowTreasury( tx: Transaction, typeArgs: [string, string], args: BorrowTreasuryArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::borrow_treasury`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.name, `${String.$typeName}`) ], }) }

export function coinTypeExists( tx: Transaction, typeArg: string, treasury: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::coin_type_exists`, typeArguments: [typeArg], arguments: [ obj(tx, treasury) ], }) }

export function coinTypeValue( tx: Transaction, typeArg: string, treasury: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::coin_type_value`, typeArguments: [typeArg], arguments: [ obj(tx, treasury) ], }) }

export function deleteSpendAction( tx: Transaction, typeArgs: [string, string], expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::delete_spend_action`, typeArguments: typeArgs, arguments: [ obj(tx, expired) ], }) }

export interface DepositArgs { auth: TransactionObjectInput; account: TransactionObjectInput; name: string | TransactionArgument; coin: TransactionObjectInput }

export function deposit( tx: Transaction, typeArgs: [string, string, string], args: DepositArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::deposit`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), pure(tx, args.name, `${String.$typeName}`), obj(tx, args.coin) ], }) }

export interface DepositOwnedArgs { auth: TransactionObjectInput; account: TransactionObjectInput; name: string | TransactionArgument; receiving: TransactionObjectInput }

export function depositOwned( tx: Transaction, typeArgs: [string, string, string], args: DepositOwnedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::deposit_owned`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), pure(tx, args.name, `${String.$typeName}`), obj(tx, args.receiving) ], }) }

export interface DoSpendArgs { executable: TransactionObjectInput; account: TransactionObjectInput; version: TransactionObjectInput; witness: GenericArg }

export function doSpend( tx: Transaction, typeArgs: [string, string, string, string], args: DoSpendArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::do_spend`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.version), generic(tx, `${typeArgs[3]}`, args.witness) ], }) }

export interface HasTreasuryArgs { account: TransactionObjectInput; name: string | TransactionArgument }

export function hasTreasury( tx: Transaction, typeArgs: [string, string], args: HasTreasuryArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::has_treasury`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface NewSpendArgs { proposal: TransactionObjectInput; amount: bigint | TransactionArgument; witness: GenericArg }

export function newSpend( tx: Transaction, typeArgs: [string, string, string], args: NewSpendArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::new_spend`, typeArguments: typeArgs, arguments: [ obj(tx, args.proposal), pure(tx, args.amount, `u64`), generic(tx, `${typeArgs[2]}`, args.witness) ], }) }
