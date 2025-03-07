import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface NewArgs { extensions: TransactionObjectInput; config: GenericArg; unverifiedDepsAllowed: boolean | TransactionArgument; names: Array<string | TransactionArgument> | TransactionArgument; addresses: Array<string | TransactionArgument> | TransactionArgument; versions: Array<bigint | TransactionArgument> | TransactionArgument }

export function new_( tx: Transaction, typeArgs: [string, string], args: NewArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::new`, typeArguments: typeArgs, arguments: [ obj(tx, args.extensions), generic(tx, `${typeArgs[0]}`, args.config), pure(tx, args.unverifiedDepsAllowed, `bool`), pure(tx, args.names, `vector<${String.$typeName}>`), pure(tx, args.addresses, `vector<address>`), pure(tx, args.versions, `vector<u64>`) ], }) }

export interface ReceiveArgs { account: TransactionObjectInput; receiving: TransactionObjectInput }

export function receive( tx: Transaction, typeArgs: [string, string, string], args: ReceiveArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::receive`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.receiving) ], }) }

export function config( tx: Transaction, typeArgs: [string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::config`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export function addr( tx: Transaction, typeArgs: [string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::addr`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export function metadata( tx: Transaction, typeArgs: [string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::metadata`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export interface KeepArgs { account: TransactionObjectInput; obj: GenericArg }

export function keep( tx: Transaction, typeArgs: [string, string, string], args: KeepArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::keep`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.obj) ], }) }

export function init( tx: Transaction, otw: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::init`, arguments: [ obj(tx, otw) ], }) }

export function intents( tx: Transaction, typeArgs: [string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::intents`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export interface AddActionArgs { account: TransactionObjectInput; intent: TransactionObjectInput; action: GenericArg; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function addAction( tx: Transaction, typeArgs: [string, string, string, string], args: AddActionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::add_action`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.intent), generic(tx, `${typeArgs[2]}`, args.action), obj(tx, args.versionWitness), generic(tx, `${typeArgs[3]}`, args.intentWitness) ], }) }

export interface AddIntentArgs { account: TransactionObjectInput; intent: TransactionObjectInput; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function addIntent( tx: Transaction, typeArgs: [string, string, string], args: AddIntentArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::add_intent`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.intent), obj(tx, args.versionWitness), generic(tx, `${typeArgs[2]}`, args.intentWitness) ], }) }

export function deps( tx: Transaction, typeArgs: [string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::deps`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export interface AddManagedAssetArgs { account: TransactionObjectInput; key: GenericArg; asset: GenericArg; versionWitness: TransactionObjectInput }

export function addManagedAsset( tx: Transaction, typeArgs: [string, string, string, string], args: AddManagedAssetArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::add_managed_asset`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.key), generic(tx, `${typeArgs[3]}`, args.asset), obj(tx, args.versionWitness) ], }) }

export interface AddManagedDataArgs { account: TransactionObjectInput; key: GenericArg; data: GenericArg; versionWitness: TransactionObjectInput }

export function addManagedData( tx: Transaction, typeArgs: [string, string, string, string], args: AddManagedDataArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::add_managed_data`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.key), generic(tx, `${typeArgs[3]}`, args.data), obj(tx, args.versionWitness) ], }) }

export interface AssertIsConfigModuleArgs { account: TransactionObjectInput; configWitness: GenericArg }

export function assertIsConfigModule( tx: Transaction, typeArgs: [string, string, string], args: AssertIsConfigModuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::assert_is_config_module`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.configWitness) ], }) }

export interface BorrowManagedAssetArgs { account: TransactionObjectInput; key: GenericArg; versionWitness: TransactionObjectInput }

export function borrowManagedAsset( tx: Transaction, typeArgs: [string, string, string, string], args: BorrowManagedAssetArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::borrow_managed_asset`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.key), obj(tx, args.versionWitness) ], }) }

export interface BorrowManagedAssetMutArgs { account: TransactionObjectInput; key: GenericArg; versionWitness: TransactionObjectInput }

export function borrowManagedAssetMut( tx: Transaction, typeArgs: [string, string, string, string], args: BorrowManagedAssetMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::borrow_managed_asset_mut`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.key), obj(tx, args.versionWitness) ], }) }

export interface BorrowManagedDataArgs { account: TransactionObjectInput; key: GenericArg; versionWitness: TransactionObjectInput }

export function borrowManagedData( tx: Transaction, typeArgs: [string, string, string, string], args: BorrowManagedDataArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::borrow_managed_data`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.key), obj(tx, args.versionWitness) ], }) }

export interface BorrowManagedDataMutArgs { account: TransactionObjectInput; key: GenericArg; versionWitness: TransactionObjectInput }

export function borrowManagedDataMut( tx: Transaction, typeArgs: [string, string, string, string], args: BorrowManagedDataMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::borrow_managed_data_mut`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.key), obj(tx, args.versionWitness) ], }) }

export interface ConfigMutArgs { account: TransactionObjectInput; versionWitness: TransactionObjectInput; configWitness: GenericArg }

export function configMut( tx: Transaction, typeArgs: [string, string, string], args: ConfigMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::config_mut`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.versionWitness), generic(tx, `${typeArgs[2]}`, args.configWitness) ], }) }

export interface ConfirmExecutionArgs { account: TransactionObjectInput; executable: TransactionObjectInput; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function confirmExecution( tx: Transaction, typeArgs: [string, string, string], args: ConfirmExecutionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::confirm_execution`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.executable), obj(tx, args.versionWitness), generic(tx, `${typeArgs[2]}`, args.intentWitness) ], }) }

export interface CreateIntentArgs { account: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTimes: Array<bigint | TransactionArgument> | TransactionArgument; expirationTime: bigint | TransactionArgument; managedName: string | TransactionArgument; outcome: GenericArg; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function createIntent( tx: Transaction, typeArgs: [string, string, string], args: CreateIntentArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::create_intent`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTimes, `vector<u64>`), pure(tx, args.expirationTime, `u64`), pure(tx, args.managedName, `${String.$typeName}`), generic(tx, `${typeArgs[1]}`, args.outcome), obj(tx, args.versionWitness), generic(tx, `${typeArgs[2]}`, args.intentWitness) ], }) }

export interface DeleteExpiredIntentArgs { account: TransactionObjectInput; key: string | TransactionArgument; clock: TransactionObjectInput }

export function deleteExpiredIntent( tx: Transaction, typeArgs: [string, string], args: DeleteExpiredIntentArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::delete_expired_intent`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`), obj(tx, args.clock) ], }) }

export interface DepsMutArgs { account: TransactionObjectInput; versionWitness: TransactionObjectInput }

export function depsMut( tx: Transaction, typeArgs: [string, string], args: DepsMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::deps_mut`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.versionWitness) ], }) }

export interface DestroyEmptyIntentArgs { account: TransactionObjectInput; key: string | TransactionArgument }

export function destroyEmptyIntent( tx: Transaction, typeArgs: [string, string], args: DestroyEmptyIntentArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::destroy_empty_intent`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`) ], }) }

export interface ExecuteIntentArgs { account: TransactionObjectInput; key: string | TransactionArgument; clock: TransactionObjectInput; versionWitness: TransactionObjectInput; configWitness: GenericArg }

export function executeIntent( tx: Transaction, typeArgs: [string, string, string], args: ExecuteIntentArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::execute_intent`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`), obj(tx, args.clock), obj(tx, args.versionWitness), generic(tx, `${typeArgs[2]}`, args.configWitness) ], }) }

export interface HasManagedAssetArgs { account: TransactionObjectInput; key: GenericArg }

export function hasManagedAsset( tx: Transaction, typeArgs: [string, string, string], args: HasManagedAssetArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::has_managed_asset`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.key) ], }) }

export interface HasManagedDataArgs { account: TransactionObjectInput; key: GenericArg }

export function hasManagedData( tx: Transaction, typeArgs: [string, string, string], args: HasManagedDataArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::has_managed_data`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.key) ], }) }

export interface IntentsMutArgs { account: TransactionObjectInput; versionWitness: TransactionObjectInput; configWitness: GenericArg }

export function intentsMut( tx: Transaction, typeArgs: [string, string, string], args: IntentsMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::intents_mut`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.versionWitness), generic(tx, `${typeArgs[2]}`, args.configWitness) ], }) }

export interface LockObjectArgs { account: TransactionObjectInput; id: string | TransactionArgument }

export function lockObject( tx: Transaction, typeArgs: [string, string], args: LockObjectArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::lock_object`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.id, `${ID.$typeName}`) ], }) }

export interface MetadataMutArgs { account: TransactionObjectInput; versionWitness: TransactionObjectInput }

export function metadataMut( tx: Transaction, typeArgs: [string, string], args: MetadataMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::metadata_mut`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.versionWitness) ], }) }

export interface NewAuthArgs { account: TransactionObjectInput; versionWitness: TransactionObjectInput; configWitness: GenericArg }

export function newAuth( tx: Transaction, typeArgs: [string, string, string], args: NewAuthArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::new_auth`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.versionWitness), generic(tx, `${typeArgs[2]}`, args.configWitness) ], }) }

export interface ProcessActionArgs { account: TransactionObjectInput; executable: TransactionObjectInput; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function processAction( tx: Transaction, typeArgs: [string, string, string, string], args: ProcessActionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::process_action`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.executable), obj(tx, args.versionWitness), generic(tx, `${typeArgs[3]}`, args.intentWitness) ], }) }

export interface RemoveManagedAssetArgs { account: TransactionObjectInput; key: GenericArg; versionWitness: TransactionObjectInput }

export function removeManagedAsset( tx: Transaction, typeArgs: [string, string, string, string], args: RemoveManagedAssetArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::remove_managed_asset`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.key), obj(tx, args.versionWitness) ], }) }

export interface RemoveManagedDataArgs { account: TransactionObjectInput; key: GenericArg; versionWitness: TransactionObjectInput }

export function removeManagedData( tx: Transaction, typeArgs: [string, string, string, string], args: RemoveManagedDataArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::remove_managed_data`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.key), obj(tx, args.versionWitness) ], }) }

export interface UnlockObjectArgs { account: TransactionObjectInput; id: string | TransactionArgument }

export function unlockObject( tx: Transaction, typeArgs: [string, string], args: UnlockObjectArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::unlock_object`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.id, `${ID.$typeName}`) ], }) }

export interface VerifyArgs { account: TransactionObjectInput; auth: TransactionObjectInput }

export function verify( tx: Transaction, typeArgs: [string, string], args: VerifyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::verify`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.auth) ], }) }
