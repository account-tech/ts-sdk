import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function name( tx: Transaction, rules: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::name`, arguments: [ obj(tx, rules) ], }) }

export function capId( tx: Transaction, rules: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::cap_id`, arguments: [ obj(tx, rules) ], }) }

export interface LockCapArgs { auth: TransactionObjectInput; account: TransactionObjectInput; cap: TransactionObjectInput; name: string | TransactionArgument; delayMs: bigint | TransactionArgument }

export function lockCap( tx: Transaction, typeArgs: [string, string], args: LockCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::lock_cap`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), obj(tx, args.cap), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.delayMs, `u64`) ], }) }

export interface BorrowCapArgs { account: TransactionObjectInput; package: string | TransactionArgument }

export function borrowCap( tx: Transaction, typeArgs: [string, string], args: BorrowCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::borrow_cap`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.package, `address`) ], }) }

export interface BorrowRulesArgs { account: TransactionObjectInput; package: string | TransactionArgument }

export function borrowRules( tx: Transaction, typeArgs: [string, string], args: BorrowRulesArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::borrow_rules`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.package, `address`) ], }) }

export interface CompleteUpgradeArgs { executable: TransactionObjectInput; account: TransactionObjectInput; receipt: TransactionObjectInput; cap: TransactionObjectInput; rules: TransactionObjectInput }

export function completeUpgrade( tx: Transaction, typeArgs: [string, string], args: CompleteUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::complete_upgrade`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.receipt), obj(tx, args.cap), obj(tx, args.rules) ], }) }

export interface ConfirmUpgradeArgs { executable: TransactionObjectInput; account: TransactionObjectInput; receipt: TransactionObjectInput; cap: TransactionObjectInput; rules: TransactionObjectInput; version: TransactionObjectInput; witness: GenericArg }

export function confirmUpgrade( tx: Transaction, typeArgs: [string, string, string], args: ConfirmUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::confirm_upgrade`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.receipt), obj(tx, args.cap), obj(tx, args.rules), obj(tx, args.version), generic(tx, `${typeArgs[2]}`, args.witness) ], }) }

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

export interface HasCapArgs { account: TransactionObjectInput; package: string | TransactionArgument }

export function hasCap( tx: Transaction, typeArgs: [string, string], args: HasCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::has_cap`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.package, `address`) ], }) }

export interface NewRestrictArgs { proposal: TransactionObjectInput; package: string | TransactionArgument; currentPolicy: number | TransactionArgument; policy: number | TransactionArgument; witness: GenericArg }

export function newRestrict( tx: Transaction, typeArgs: [string, string], args: NewRestrictArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::new_restrict`, typeArguments: typeArgs, arguments: [ obj(tx, args.proposal), pure(tx, args.package, `address`), pure(tx, args.currentPolicy, `u8`), pure(tx, args.policy, `u8`), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }

export interface NewUpgradeArgs { proposal: TransactionObjectInput; package: string | TransactionArgument; digest: Array<number | TransactionArgument> | TransactionArgument; witness: GenericArg }

export function newUpgrade( tx: Transaction, typeArgs: [string, string], args: NewUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::new_upgrade`, typeArguments: typeArgs, arguments: [ obj(tx, args.proposal), pure(tx, args.package, `address`), pure(tx, args.digest, `vector<u8>`), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }

export interface ProposeRestrictArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; expirationTime: bigint | TransactionArgument; package: string | TransactionArgument; policy: number | TransactionArgument; clock: TransactionObjectInput }

export function proposeRestrict( tx: Transaction, typeArgs: [string, string], args: ProposeRestrictArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::propose_restrict`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.expirationTime, `u64`), pure(tx, args.package, `address`), pure(tx, args.policy, `u8`), obj(tx, args.clock) ], }) }

export interface ProposeUpgradeArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; expirationTime: bigint | TransactionArgument; package: string | TransactionArgument; digest: Array<number | TransactionArgument> | TransactionArgument; clock: TransactionObjectInput }

export function proposeUpgrade( tx: Transaction, typeArgs: [string, string], args: ProposeUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::propose_upgrade`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.expirationTime, `u64`), pure(tx, args.package, `address`), pure(tx, args.digest, `vector<u8>`), obj(tx, args.clock) ], }) }

export function timeDelay( tx: Transaction, rules: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::time_delay`, arguments: [ obj(tx, rules) ], }) }
