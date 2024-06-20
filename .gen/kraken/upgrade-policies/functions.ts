import {PUBLISHED_AT} from "..";
import {GenericArg, ObjectArg, generic, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export interface RestrictArgs { executable: ObjectArg; multisig: ObjectArg; lock: ObjectArg; witness: GenericArg; idx: bigint | TransactionArgument }

export function restrict( txb: TransactionBlock, typeArg: string, args: RestrictArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::restrict`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), obj(txb, args.multisig), obj(txb, args.lock), generic(txb, `${typeArg}`, args.witness), pure(txb, args.idx, `u64`) ], }) }

export interface AddRuleArgs { lock: ObjectArg; key: Array<number | TransactionArgument> | TransactionArgument; rule: GenericArg }

export function addRule( txb: TransactionBlock, typeArg: string, args: AddRuleArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::add_rule`, typeArguments: [typeArg], arguments: [ obj(txb, args.lock), pure(txb, args.key, `vector<u8>`), generic(txb, `${typeArg}`, args.rule) ], }) }

export interface HasRuleArgs { lock: ObjectArg; key: Array<number | TransactionArgument> | TransactionArgument }

export function hasRule( txb: TransactionBlock, args: HasRuleArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::has_rule`, arguments: [ obj(txb, args.lock), pure(txb, args.key, `vector<u8>`) ], }) }

export interface UpgradeArgs { executable: ObjectArg; lock: ObjectArg; witness: GenericArg; idx: bigint | TransactionArgument }

export function upgrade( txb: TransactionBlock, typeArg: string, args: UpgradeArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::upgrade`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), obj(txb, args.lock), generic(txb, `${typeArg}`, args.witness), pure(txb, args.idx, `u64`) ], }) }

export interface BorrowCapArgs { multisig: ObjectArg; lock: ObjectArg }

export function borrowCap( txb: TransactionBlock, args: BorrowCapArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::borrow_cap`, arguments: [ obj(txb, args.multisig), obj(txb, args.lock) ], }) }

export function putBackCap( txb: TransactionBlock, lock: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::put_back_cap`, arguments: [ obj(txb, lock) ], }) }

export interface ConfirmUpgradeArgs { upgradeLock: ObjectArg; receipt: ObjectArg }

export function confirmUpgrade( txb: TransactionBlock, args: ConfirmUpgradeArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::confirm_upgrade`, arguments: [ obj(txb, args.upgradeLock), obj(txb, args.receipt) ], }) }

export interface DestroyRestrictArgs { executable: ObjectArg; witness: GenericArg }

export function destroyRestrict( txb: TransactionBlock, typeArg: string, args: DestroyRestrictArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::destroy_restrict`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), generic(txb, `${typeArg}`, args.witness) ], }) }

export interface DestroyUpgradeArgs { executable: ObjectArg; witness: GenericArg }

export function destroyUpgrade( txb: TransactionBlock, typeArg: string, args: DestroyUpgradeArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::destroy_upgrade`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), generic(txb, `${typeArg}`, args.witness) ], }) }

export interface ExecuteRestrictArgs { executable: ObjectArg; multisig: ObjectArg; lock: ObjectArg }

export function executeRestrict( txb: TransactionBlock, args: ExecuteRestrictArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::execute_restrict`, arguments: [ obj(txb, args.executable), obj(txb, args.multisig), obj(txb, args.lock) ], }) }

export interface ExecuteUpgradeArgs { executable: ObjectArg; lock: ObjectArg }

export function executeUpgrade( txb: TransactionBlock, args: ExecuteUpgradeArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::execute_upgrade`, arguments: [ obj(txb, args.executable), obj(txb, args.lock) ], }) }

export function getTimeDelay( txb: TransactionBlock, lock: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::get_time_delay`, arguments: [ obj(txb, lock) ], }) }

export interface LockCapArgs { multisig: ObjectArg; label: string | TransactionArgument; upgradeCap: ObjectArg }

export function lockCap( txb: TransactionBlock, args: LockCapArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::lock_cap`, arguments: [ obj(txb, args.multisig), pure(txb, args.label, `0x1::string::String`), obj(txb, args.upgradeCap) ], }) }

export interface LockCapWithTimelockArgs { multisig: ObjectArg; label: string | TransactionArgument; delayMs: bigint | TransactionArgument; upgradeCap: ObjectArg }

export function lockCapWithTimelock( txb: TransactionBlock, args: LockCapWithTimelockArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::lock_cap_with_timelock`, arguments: [ obj(txb, args.multisig), pure(txb, args.label, `0x1::string::String`), pure(txb, args.delayMs, `u64`), obj(txb, args.upgradeCap) ], }) }

export interface NewRestrictArgs { proposal: ObjectArg; lock: ObjectArg; policy: number | TransactionArgument }

export function newRestrict( txb: TransactionBlock, args: NewRestrictArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::new_restrict`, arguments: [ obj(txb, args.proposal), obj(txb, args.lock), pure(txb, args.policy, `u8`) ], }) }

export interface NewUpgradeArgs { proposal: ObjectArg; digest: Array<number | TransactionArgument> | TransactionArgument; lockId: string | TransactionArgument }

export function newUpgrade( txb: TransactionBlock, args: NewUpgradeArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::new_upgrade`, arguments: [ obj(txb, args.proposal), pure(txb, args.digest, `vector<u8>`), pure(txb, args.lockId, `0x2::object::ID`) ], }) }

export interface ProposeRestrictArgs { multisig: ObjectArg; key: string | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument; policy: number | TransactionArgument; lock: ObjectArg; clock: ObjectArg }

export function proposeRestrict( txb: TransactionBlock, args: ProposeRestrictArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::propose_restrict`, arguments: [ obj(txb, args.multisig), pure(txb, args.key, `0x1::string::String`), pure(txb, args.expirationEpoch, `u64`), pure(txb, args.description, `0x1::string::String`), pure(txb, args.policy, `u8`), obj(txb, args.lock), obj(txb, args.clock) ], }) }

export interface ProposeUpgradeArgs { multisig: ObjectArg; key: string | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument; digest: Array<number | TransactionArgument> | TransactionArgument; lock: ObjectArg; clock: ObjectArg }

export function proposeUpgrade( txb: TransactionBlock, args: ProposeUpgradeArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::upgrade_policies::propose_upgrade`, arguments: [ obj(txb, args.multisig), pure(txb, args.key, `0x1::string::String`), pure(txb, args.expirationEpoch, `u64`), pure(txb, args.description, `0x1::string::String`), pure(txb, args.digest, `vector<u8>`), obj(txb, args.lock), obj(txb, args.clock) ], }) }
