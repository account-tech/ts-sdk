import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface LockCapArgs { auth: TransactionObjectInput; account: TransactionObjectInput; cap: TransactionObjectInput; name: string | TransactionArgument; delayMs: bigint | TransactionArgument }

export function lockCap( tx: Transaction, typeArgs: [string, string], args: LockCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade::lock_cap`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), obj(tx, args.cap), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.delayMs, `u64`) ], }) }

export interface HasCapArgs { account: TransactionObjectInput; name: string | TransactionArgument }

export function hasCap( tx: Transaction, typeArgs: [string, string], args: HasCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade::has_cap`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface BorrowCapArgs { account: TransactionObjectInput; packageAddr: string | TransactionArgument }

export function borrowCap( tx: Transaction, typeArgs: [string, string], args: BorrowCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade::borrow_cap`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.packageAddr, `address`) ], }) }

export interface ConfirmUpgradeArgs { executable: TransactionObjectInput; account: TransactionObjectInput; receipt: TransactionObjectInput; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function confirmUpgrade( tx: Transaction, typeArgs: [string, string, string], args: ConfirmUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade::confirm_upgrade`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.receipt), obj(tx, args.versionWitness), generic(tx, `${typeArgs[2]}`, args.intentWitness) ], }) }

export function deleteRestrict( tx: Transaction, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade::delete_restrict`, arguments: [ obj(tx, expired) ], }) }

export function deleteUpgrade( tx: Transaction, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade::delete_upgrade`, arguments: [ obj(tx, expired) ], }) }

export interface DoRestrictArgs { executable: TransactionObjectInput; account: TransactionObjectInput; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function doRestrict( tx: Transaction, typeArgs: [string, string, string], args: DoRestrictArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade::do_restrict`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.versionWitness), generic(tx, `${typeArgs[2]}`, args.intentWitness) ], }) }

export interface DoUpgradeArgs { executable: TransactionObjectInput; account: TransactionObjectInput; clock: TransactionObjectInput; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function doUpgrade( tx: Transaction, typeArgs: [string, string, string], args: DoUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade::do_upgrade`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.clock), obj(tx, args.versionWitness), generic(tx, `${typeArgs[2]}`, args.intentWitness) ], }) }

export interface GetCapPackageArgs { account: TransactionObjectInput; name: string | TransactionArgument }

export function getCapPackage( tx: Transaction, typeArgs: [string, string], args: GetCapPackageArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade::get_cap_package`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface GetCapPolicyArgs { account: TransactionObjectInput; name: string | TransactionArgument }

export function getCapPolicy( tx: Transaction, typeArgs: [string, string], args: GetCapPolicyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade::get_cap_policy`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface GetCapVersionArgs { account: TransactionObjectInput; name: string | TransactionArgument }

export function getCapVersion( tx: Transaction, typeArgs: [string, string], args: GetCapVersionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade::get_cap_version`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface GetPackageAddrArgs { account: TransactionObjectInput; packageName: string | TransactionArgument }

export function getPackageAddr( tx: Transaction, typeArgs: [string, string], args: GetPackageAddrArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade::get_package_addr`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.packageName, `${String.$typeName}`) ], }) }

export interface GetPackageNameArgs { account: TransactionObjectInput; packageAddr: string | TransactionArgument }

export function getPackageName( tx: Transaction, typeArgs: [string, string], args: GetPackageNameArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade::get_package_name`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.packageAddr, `address`) ], }) }

export function getPackagesInfo( tx: Transaction, typeArgs: [string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade::get_packages_info`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export interface GetTimeDelayArgs { account: TransactionObjectInput; name: string | TransactionArgument }

export function getTimeDelay( tx: Transaction, typeArgs: [string, string], args: GetTimeDelayArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade::get_time_delay`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface IsPackageManagedArgs { account: TransactionObjectInput; packageAddr: string | TransactionArgument }

export function isPackageManaged( tx: Transaction, typeArgs: [string, string], args: IsPackageManagedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade::is_package_managed`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.packageAddr, `address`) ], }) }

export interface NewRestrictArgs { intent: TransactionObjectInput; account: TransactionObjectInput; name: string | TransactionArgument; policy: number | TransactionArgument; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function newRestrict( tx: Transaction, typeArgs: [string, string, string], args: NewRestrictArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade::new_restrict`, typeArguments: typeArgs, arguments: [ obj(tx, args.intent), obj(tx, args.account), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.policy, `u8`), obj(tx, args.versionWitness), generic(tx, `${typeArgs[2]}`, args.intentWitness) ], }) }

export interface NewUpgradeArgs { intent: TransactionObjectInput; account: TransactionObjectInput; name: string | TransactionArgument; digest: Array<number | TransactionArgument> | TransactionArgument; clock: TransactionObjectInput; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function newUpgrade( tx: Transaction, typeArgs: [string, string, string], args: NewUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::package_upgrade::new_upgrade`, typeArguments: typeArgs, arguments: [ obj(tx, args.intent), obj(tx, args.account), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.digest, `vector<u8>`), obj(tx, args.clock), obj(tx, args.versionWitness), generic(tx, `${typeArgs[2]}`, args.intentWitness) ], }) }
