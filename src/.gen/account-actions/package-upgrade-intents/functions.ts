import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface CompleteUpgradePackageArgs { executable: TransactionObjectInput; account: TransactionObjectInput; receipt: TransactionObjectInput }

export function completeUpgradePackage( tx: Transaction, typeArgs: [string, string], args: CompleteUpgradePackageArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade_intents::complete_upgrade_package`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.receipt) ], }) }

export interface ExecuteRestrictPolicyArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function executeRestrictPolicy( tx: Transaction, typeArgs: [string, string], args: ExecuteRestrictPolicyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade_intents::execute_restrict_policy`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export interface ExecuteUpgradePackageArgs { executable: TransactionObjectInput; account: TransactionObjectInput; clock: TransactionObjectInput }

export function executeUpgradePackage( tx: Transaction, typeArgs: [string, string], args: ExecuteUpgradePackageArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade_intents::execute_upgrade_package`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.clock) ], }) }

export interface RequestRestrictPolicyArgs { auth: TransactionObjectInput; outcome: GenericArg; account: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationTime: bigint | TransactionArgument; packageName: string | TransactionArgument; policy: number | TransactionArgument }

export function requestRestrictPolicy( tx: Transaction, typeArgs: [string, string], args: RequestRestrictPolicyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade_intents::request_restrict_policy`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), generic(tx, `${typeArgs[1]}`, args.outcome), obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationTime, `u64`), pure(tx, args.packageName, `${String.$typeName}`), pure(tx, args.policy, `u8`) ], }) }

export interface RequestUpgradePackageArgs { auth: TransactionObjectInput; outcome: GenericArg; account: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationTime: bigint | TransactionArgument; packageName: string | TransactionArgument; digest: Array<number | TransactionArgument> | TransactionArgument; clock: TransactionObjectInput }

export function requestUpgradePackage( tx: Transaction, typeArgs: [string, string], args: RequestUpgradePackageArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade_intents::request_upgrade_package`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), generic(tx, `${typeArgs[1]}`, args.outcome), obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationTime, `u64`), pure(tx, args.packageName, `${String.$typeName}`), pure(tx, args.digest, `vector<u8>`), obj(tx, args.clock) ], }) }
