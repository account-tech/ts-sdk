import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface SpendArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; witness: GenericArg }

export function spend( tx: Transaction, typeArgs: [string, string], args: SpendArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::spend`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.multisig), generic(tx, `${typeArgs[0]}`, args.witness) ], }) }

export interface CloseArgs { multisig: TransactionObjectInput; name: string | TransactionArgument }

export function close( tx: Transaction, args: CloseArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::close`, arguments: [ obj(tx, args.multisig), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface CoinTypeExistsArgs { treasury: TransactionObjectInput; coinType: string | TransactionArgument }

export function coinTypeExists( tx: Transaction, args: CoinTypeExistsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::coin_type_exists`, arguments: [ obj(tx, args.treasury), pure(tx, args.coinType, `${String.$typeName}`) ], }) }

export function coinTypeString( tx: Transaction, typeArg: string, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::coin_type_string`, typeArguments: [typeArg], arguments: [ ], }) }

export interface CoinTypeValueArgs { treasury: TransactionObjectInput; coinType: string | TransactionArgument }

export function coinTypeValue( tx: Transaction, typeArg: string, args: CoinTypeValueArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::coin_type_value`, typeArguments: [typeArg], arguments: [ obj(tx, args.treasury), pure(tx, args.coinType, `${String.$typeName}`) ], }) }

export interface DepositArgs { multisig: TransactionObjectInput; name: string | TransactionArgument; coin: TransactionObjectInput }

export function deposit( tx: Transaction, typeArg: string, args: DepositArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::deposit`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), pure(tx, args.name, `${String.$typeName}`), obj(tx, args.coin) ], }) }

export interface DepositOwnedArgs { multisig: TransactionObjectInput; name: string | TransactionArgument; receiving: TransactionObjectInput }

export function depositOwned( tx: Transaction, typeArg: string, args: DepositOwnedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::deposit_owned`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), pure(tx, args.name, `${String.$typeName}`), obj(tx, args.receiving) ], }) }

export interface DestroyOpenArgs { executable: TransactionObjectInput; witness: GenericArg }

export function destroyOpen( tx: Transaction, typeArg: string, args: DestroyOpenArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::destroy_open`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface DestroySpendArgs { executable: TransactionObjectInput; witness: GenericArg }

export function destroySpend( tx: Transaction, typeArg: string, args: DestroySpendArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::destroy_spend`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface ExecuteOpenArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput }

export function executeOpen( tx: Transaction, args: ExecuteOpenArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::execute_open`, arguments: [ obj(tx, args.executable), obj(tx, args.multisig) ], }) }

export interface NewOpenArgs { proposal: TransactionObjectInput; name: string | TransactionArgument }

export function newOpen( tx: Transaction, args: NewOpenArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::new_open`, arguments: [ obj(tx, args.proposal), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface NewSpendArgs { proposal: TransactionObjectInput; name: string | TransactionArgument; coinTypes: Array<string | TransactionArgument> | TransactionArgument; amounts: Array<bigint | TransactionArgument> | TransactionArgument }

export function newSpend( tx: Transaction, args: NewSpendArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::new_spend`, arguments: [ obj(tx, args.proposal), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.coinTypes, `vector<${String.$typeName}>`), pure(tx, args.amounts, `vector<u64>`) ], }) }

export interface OpenArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; witness: GenericArg }

export function open( tx: Transaction, typeArg: string, args: OpenArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::open`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface ProposeOpenArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; name: string | TransactionArgument }

export function proposeOpen( tx: Transaction, args: ProposeOpenArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::propose_open`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.name, `${String.$typeName}`) ], }) }

export function spendIsExecuted( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::spend_is_executed`, arguments: [ obj(tx, executable) ], }) }

export interface TreasuryExistsArgs { multisig: TransactionObjectInput; name: string | TransactionArgument }

export function treasuryExists( tx: Transaction, args: TreasuryExistsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::treasury::treasury_exists`, arguments: [ obj(tx, args.multisig), pure(tx, args.name, `${String.$typeName}`) ], }) }
