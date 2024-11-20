import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface AddRuleArgs { lock: TransactionObjectInput; key: GenericArg; rule: GenericArg }

export function addRule( tx: Transaction, typeArgs: [string, string], args: AddRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::add_rule`, typeArguments: typeArgs, arguments: [ obj(tx, args.lock), generic(tx, `${typeArgs[0]}`, args.key), generic(tx, `${typeArgs[1]}`, args.rule) ], }) }

export interface GetRuleArgs { lock: TransactionObjectInput; key: GenericArg }

export function getRule( tx: Transaction, typeArgs: [string, string], args: GetRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::get_rule`, typeArguments: typeArgs, arguments: [ obj(tx, args.lock), generic(tx, `${typeArgs[0]}`, args.key) ], }) }

export interface HasRuleArgs { lock: TransactionObjectInput; key: GenericArg }

export function hasRule( tx: Transaction, typeArg: string, args: HasRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::has_rule`, typeArguments: [typeArg], arguments: [ obj(tx, args.lock), generic(tx, `${typeArg}`, args.key) ], }) }

export function upgradeCap( tx: Transaction, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::upgrade_cap`, arguments: [ obj(tx, lock) ], }) }

export interface HasLockArgs { account: TransactionObjectInput; package: string | TransactionArgument }

export function hasLock( tx: Transaction, typeArgs: [string, string], args: HasLockArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::has_lock`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.package, `address`) ], }) }

export interface LockCapArgs { auth: TransactionObjectInput; account: TransactionObjectInput; lock: TransactionObjectInput }

export function lockCap( tx: Transaction, typeArgs: [string, string], args: LockCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::lock_cap`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), obj(tx, args.lock) ], }) }

export interface BorrowLockArgs { account: TransactionObjectInput; package: string | TransactionArgument }

export function borrowLock( tx: Transaction, typeArgs: [string, string], args: BorrowLockArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::borrow_lock`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.package, `address`) ], }) }

export interface CompleteUpgradeArgs { executable: TransactionObjectInput; account: TransactionObjectInput; receipt: TransactionObjectInput; lock: TransactionObjectInput }

export function completeUpgrade( tx: Transaction, typeArgs: [string, string], args: CompleteUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::complete_upgrade`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.receipt), obj(tx, args.lock) ], }) }

export interface ConfirmUpgradeArgs { executable: TransactionObjectInput; account: TransactionObjectInput; receipt: TransactionObjectInput; lock: TransactionObjectInput; version: TransactionObjectInput; witness: GenericArg }

export function confirmUpgrade( tx: Transaction, typeArgs: [string, string, string], args: ConfirmUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::confirm_upgrade`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.receipt), obj(tx, args.lock), obj(tx, args.version), generic(tx, `${typeArgs[2]}`, args.witness) ], }) }

export function deleteRestrictAction( tx: Transaction, typeArg: string, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::delete_restrict_action`, typeArguments: [typeArg], arguments: [ obj(tx, expired) ], }) }

export function deleteUpgradeAction( tx: Transaction, typeArg: string, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::delete_upgrade_action`, typeArguments: [typeArg], arguments: [ obj(tx, expired) ], }) }

export interface DoRestrictArgs { executable: TransactionObjectInput; account: TransactionObjectInput; version: TransactionObjectInput; witness: GenericArg }

export function doRestrict( tx: Transaction, typeArgs: [string, string, string], args: DoRestrictArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::do_restrict`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.version), generic(tx, `${typeArgs[2]}`, args.witness) ], }) }

export interface DoUpgradeArgs { executable: TransactionObjectInput; account: TransactionObjectInput; version: TransactionObjectInput; witness: GenericArg }

export function doUpgrade( tx: Transaction, typeArgs: [string, string, string], args: DoUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::do_upgrade`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.version), generic(tx, `${typeArgs[2]}`, args.witness) ], }) }

export interface ExecuteRestrictArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function executeRestrict( tx: Transaction, typeArgs: [string, string], args: ExecuteRestrictArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::execute_restrict`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export interface ExecuteUpgradeArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function executeUpgrade( tx: Transaction, typeArgs: [string, string], args: ExecuteUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::execute_upgrade`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export function hasTimelock( tx: Transaction, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::has_timelock`, arguments: [ obj(tx, lock) ], }) }

export interface LockCapWithTimelockArgs { auth: TransactionObjectInput; account: TransactionObjectInput; name: string | TransactionArgument; delayMs: bigint | TransactionArgument; upgradeCap: TransactionObjectInput }

export function lockCapWithTimelock( tx: Transaction, typeArgs: [string, string], args: LockCapWithTimelockArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::lock_cap_with_timelock`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.delayMs, `u64`), obj(tx, args.upgradeCap) ], }) }

export interface NewLockArgs { upgradeCap: TransactionObjectInput; name: string | TransactionArgument }

export function newLock( tx: Transaction, args: NewLockArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::new_lock`, arguments: [ obj(tx, args.upgradeCap), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface NewRestrictArgs { proposal: TransactionObjectInput; package: string | TransactionArgument; currentPolicy: number | TransactionArgument; policy: number | TransactionArgument; witness: GenericArg }

export function newRestrict( tx: Transaction, typeArgs: [string, string], args: NewRestrictArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::new_restrict`, typeArguments: typeArgs, arguments: [ obj(tx, args.proposal), pure(tx, args.package, `address`), pure(tx, args.currentPolicy, `u8`), pure(tx, args.policy, `u8`), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }

export interface NewUpgradeArgs { proposal: TransactionObjectInput; package: string | TransactionArgument; digest: Array<number | TransactionArgument> | TransactionArgument; witness: GenericArg }

export function newUpgrade( tx: Transaction, typeArgs: [string, string], args: NewUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::new_upgrade`, typeArguments: typeArgs, arguments: [ obj(tx, args.proposal), pure(tx, args.package, `address`), pure(tx, args.digest, `vector<u8>`), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }

export interface ProposeRestrictArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; expirationTime: bigint | TransactionArgument; package: string | TransactionArgument; policy: number | TransactionArgument; clock: TransactionObjectInput }

export function proposeRestrict( tx: Transaction, typeArgs: [string, string], args: ProposeRestrictArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::propose_restrict`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.expirationTime, `u64`), pure(tx, args.package, `address`), pure(tx, args.policy, `u8`), obj(tx, args.clock) ], }) }

export interface ProposeUpgradeArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; expirationTime: bigint | TransactionArgument; package: string | TransactionArgument; digest: Array<number | TransactionArgument> | TransactionArgument; clock: TransactionObjectInput }

export function proposeUpgrade( tx: Transaction, typeArgs: [string, string], args: ProposeUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::propose_upgrade`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.expirationTime, `u64`), pure(tx, args.package, `address`), pure(tx, args.digest, `vector<u8>`), obj(tx, args.clock) ], }) }

export function timeDelay( tx: Transaction, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::time_delay`, arguments: [ obj(tx, lock) ], }) }
