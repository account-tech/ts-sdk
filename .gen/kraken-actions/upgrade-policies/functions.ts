import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface RestrictArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; issuer: GenericArg }

export function restrict( tx: Transaction, typeArg: string, args: RestrictArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::restrict`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), generic(tx, `${typeArg}`, args.issuer) ], }) }

export interface AddRuleArgs { lock: TransactionObjectInput; key: GenericArg; rule: GenericArg }

export function addRule( tx: Transaction, typeArgs: [string, string], args: AddRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::add_rule`, typeArguments: typeArgs, arguments: [ obj(tx, args.lock), generic(tx, `${typeArgs[0]}`, args.key), generic(tx, `${typeArgs[1]}`, args.rule) ], }) }

export interface HasRuleArgs { lock: TransactionObjectInput; key: GenericArg }

export function hasRule( tx: Transaction, typeArg: string, args: HasRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::has_rule`, typeArguments: [typeArg], arguments: [ obj(tx, args.lock), generic(tx, `${typeArg}`, args.key) ], }) }

export interface UpgradeArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; issuer: GenericArg }

export function upgrade( tx: Transaction, typeArg: string, args: UpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::upgrade`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), generic(tx, `${typeArg}`, args.issuer) ], }) }

export interface BorrowLockArgs { multisig: TransactionObjectInput; name: string | TransactionArgument }

export function borrowLock( tx: Transaction, args: BorrowLockArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::borrow_lock`, arguments: [ obj(tx, args.multisig), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface BorrowLockMutArgs { multisig: TransactionObjectInput; name: string | TransactionArgument }

export function borrowLockMut( tx: Transaction, args: BorrowLockMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::borrow_lock_mut`, arguments: [ obj(tx, args.multisig), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface LockCapArgs { lock: TransactionObjectInput; multisig: TransactionObjectInput; name: string | TransactionArgument }

export function lockCap( tx: Transaction, args: LockCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::lock_cap`, arguments: [ obj(tx, args.lock), obj(tx, args.multisig), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface ConfirmUpgradeArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; receipt: TransactionObjectInput }

export function confirmUpgrade( tx: Transaction, args: ConfirmUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::confirm_upgrade`, arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.receipt) ], }) }

export interface DestroyRestrictArgs { executable: TransactionObjectInput; issuer: GenericArg }

export function destroyRestrict( tx: Transaction, typeArg: string, args: DestroyRestrictArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::destroy_restrict`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.issuer) ], }) }

export interface DestroyUpgradeArgs { executable: TransactionObjectInput; issuer: GenericArg }

export function destroyUpgrade( tx: Transaction, typeArg: string, args: DestroyUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::destroy_upgrade`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.issuer) ], }) }

export interface ExecuteRestrictArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput }

export function executeRestrict( tx: Transaction, args: ExecuteRestrictArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::execute_restrict`, arguments: [ obj(tx, args.executable), obj(tx, args.multisig) ], }) }

export interface ExecuteUpgradeArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput }

export function executeUpgrade( tx: Transaction, args: ExecuteUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::execute_upgrade`, arguments: [ obj(tx, args.executable), obj(tx, args.multisig) ], }) }

export interface LockCapWithTimelockArgs { multisig: TransactionObjectInput; name: string | TransactionArgument; delayMs: bigint | TransactionArgument; upgradeCap: TransactionObjectInput }

export function lockCapWithTimelock( tx: Transaction, args: LockCapWithTimelockArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::lock_cap_with_timelock`, arguments: [ obj(tx, args.multisig), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.delayMs, `u64`), obj(tx, args.upgradeCap) ], }) }

export function upgradeCap( tx: Transaction, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::upgrade_cap`, arguments: [ obj(tx, lock) ], }) }

export function newLock( tx: Transaction, upgradeCap: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::new_lock`, arguments: [ obj(tx, upgradeCap) ], }) }

export interface NewRestrictArgs { proposal: TransactionObjectInput; currentPolicy: number | TransactionArgument; policy: number | TransactionArgument }

export function newRestrict( tx: Transaction, args: NewRestrictArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::new_restrict`, arguments: [ obj(tx, args.proposal), pure(tx, args.currentPolicy, `u8`), pure(tx, args.policy, `u8`) ], }) }

export interface NewUpgradeArgs { proposal: TransactionObjectInput; digest: Array<number | TransactionArgument> | TransactionArgument }

export function newUpgrade( tx: Transaction, args: NewUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::new_upgrade`, arguments: [ obj(tx, args.proposal), pure(tx, args.digest, `vector<u8>`) ], }) }

export interface ProposeRestrictArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; expirationEpoch: bigint | TransactionArgument; name: string | TransactionArgument; policy: number | TransactionArgument; clock: TransactionObjectInput }

export function proposeRestrict( tx: Transaction, args: ProposeRestrictArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::propose_restrict`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.policy, `u8`), obj(tx, args.clock) ], }) }

export interface ProposeUpgradeArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; expirationEpoch: bigint | TransactionArgument; name: string | TransactionArgument; digest: Array<number | TransactionArgument> | TransactionArgument; clock: TransactionObjectInput }

export function proposeUpgrade( tx: Transaction, args: ProposeUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::propose_upgrade`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.digest, `vector<u8>`), obj(tx, args.clock) ], }) }

export function timeDelay( tx: Transaction, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::time_delay`, arguments: [ obj(tx, lock) ], }) }
