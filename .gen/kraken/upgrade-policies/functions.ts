import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface RestrictArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; lock: TransactionObjectInput; witness: GenericArg; idx: bigint | TransactionArgument }

export function restrict( tx: Transaction, typeArg: string, args: RestrictArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::restrict`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.lock), generic(tx, `${typeArg}`, args.witness), pure(tx, args.idx, `u64`) ], }) }

export interface AddRuleArgs { lock: TransactionObjectInput; key: Array<number | TransactionArgument> | TransactionArgument; rule: GenericArg }

export function addRule( tx: Transaction, typeArg: string, args: AddRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::add_rule`, typeArguments: [typeArg], arguments: [ obj(tx, args.lock), pure(tx, args.key, `vector<u8>`), generic(tx, `${typeArg}`, args.rule) ], }) }

export interface HasRuleArgs { lock: TransactionObjectInput; key: Array<number | TransactionArgument> | TransactionArgument }

export function hasRule( tx: Transaction, args: HasRuleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::has_rule`, arguments: [ obj(tx, args.lock), pure(tx, args.key, `vector<u8>`) ], }) }

export interface UpgradeArgs { executable: TransactionObjectInput; lock: TransactionObjectInput; witness: GenericArg; idx: bigint | TransactionArgument }

export function upgrade( tx: Transaction, typeArg: string, args: UpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::upgrade`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.lock), generic(tx, `${typeArg}`, args.witness), pure(tx, args.idx, `u64`) ], }) }

export interface BorrowCapArgs { multisig: TransactionObjectInput; lock: TransactionObjectInput }

export function borrowCap( tx: Transaction, args: BorrowCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::borrow_cap`, arguments: [ obj(tx, args.multisig), obj(tx, args.lock) ], }) }

export interface LockCapArgs { multisig: TransactionObjectInput; label: string | TransactionArgument; upgradeCap: TransactionObjectInput }

export function lockCap( tx: Transaction, args: LockCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::lock_cap`, arguments: [ obj(tx, args.multisig), pure(tx, args.label, `${String.$typeName}`), obj(tx, args.upgradeCap) ], }) }

export function putBackCap( tx: Transaction, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::put_back_cap`, arguments: [ obj(tx, lock) ], }) }

export interface ConfirmUpgradeArgs { upgradeLock: TransactionObjectInput; receipt: TransactionObjectInput }

export function confirmUpgrade( tx: Transaction, args: ConfirmUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::confirm_upgrade`, arguments: [ obj(tx, args.upgradeLock), obj(tx, args.receipt) ], }) }

export interface DestroyRestrictArgs { executable: TransactionObjectInput; witness: GenericArg }

export function destroyRestrict( tx: Transaction, typeArg: string, args: DestroyRestrictArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::destroy_restrict`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface DestroyUpgradeArgs { executable: TransactionObjectInput; witness: GenericArg }

export function destroyUpgrade( tx: Transaction, typeArg: string, args: DestroyUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::destroy_upgrade`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface ExecuteRestrictArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; lock: TransactionObjectInput }

export function executeRestrict( tx: Transaction, args: ExecuteRestrictArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::execute_restrict`, arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.lock) ], }) }

export interface ExecuteUpgradeArgs { executable: TransactionObjectInput; lock: TransactionObjectInput }

export function executeUpgrade( tx: Transaction, args: ExecuteUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::execute_upgrade`, arguments: [ obj(tx, args.executable), obj(tx, args.lock) ], }) }

export function getTimeDelay( tx: Transaction, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::get_time_delay`, arguments: [ obj(tx, lock) ], }) }

export interface LockCapWithTimelockArgs { multisig: TransactionObjectInput; label: string | TransactionArgument; delayMs: bigint | TransactionArgument; upgradeCap: TransactionObjectInput }

export function lockCapWithTimelock( tx: Transaction, args: LockCapWithTimelockArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::lock_cap_with_timelock`, arguments: [ obj(tx, args.multisig), pure(tx, args.label, `${String.$typeName}`), pure(tx, args.delayMs, `u64`), obj(tx, args.upgradeCap) ], }) }

export interface NewRestrictArgs { proposal: TransactionObjectInput; lock: TransactionObjectInput; policy: number | TransactionArgument }

export function newRestrict( tx: Transaction, args: NewRestrictArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::new_restrict`, arguments: [ obj(tx, args.proposal), obj(tx, args.lock), pure(tx, args.policy, `u8`) ], }) }

export interface NewUpgradeArgs { proposal: TransactionObjectInput; digest: Array<number | TransactionArgument> | TransactionArgument; lockId: string | TransactionArgument }

export function newUpgrade( tx: Transaction, args: NewUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::new_upgrade`, arguments: [ obj(tx, args.proposal), pure(tx, args.digest, `vector<u8>`), pure(tx, args.lockId, `${ID.$typeName}`) ], }) }

export interface ProposeRestrictArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument; policy: number | TransactionArgument; lock: TransactionObjectInput; clock: TransactionObjectInput }

export function proposeRestrict( tx: Transaction, args: ProposeRestrictArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::propose_restrict`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.policy, `u8`), obj(tx, args.lock), obj(tx, args.clock) ], }) }

export interface ProposeUpgradeArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument; digest: Array<number | TransactionArgument> | TransactionArgument; lock: TransactionObjectInput; clock: TransactionObjectInput }

export function proposeUpgrade( tx: Transaction, args: ProposeUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::propose_upgrade`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.digest, `vector<u8>`), obj(tx, args.lock), obj(tx, args.clock) ], }) }
