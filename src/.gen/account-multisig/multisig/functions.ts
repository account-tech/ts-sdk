import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function addresses( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::addresses`, arguments: [ obj(tx, multisig) ], }) }

export interface ApproveIntentArgs { account: TransactionObjectInput; key: string | TransactionArgument }

export function approveIntent( tx: Transaction, args: ApproveIntentArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::approve_intent`, arguments: [ obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`) ], }) }

export function approved( tx: Transaction, outcome: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::approved`, arguments: [ obj(tx, outcome) ], }) }

export function assertIsMember( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::assert_is_member`, arguments: [ obj(tx, multisig) ], }) }

export function authenticate( tx: Transaction, account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::authenticate`, arguments: [ obj(tx, account) ], }) }

export function configMut( tx: Transaction, account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::config_mut`, arguments: [ obj(tx, account) ], }) }

export interface DisapproveIntentArgs { account: TransactionObjectInput; key: string | TransactionArgument }

export function disapproveIntent( tx: Transaction, args: DisapproveIntentArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::disapprove_intent`, arguments: [ obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`) ], }) }

export function emptyOutcome( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::empty_outcome`, arguments: [ ], }) }

export interface ExecuteIntentArgs { account: TransactionObjectInput; key: string | TransactionArgument; clock: TransactionObjectInput }

export function executeIntent( tx: Transaction, args: ExecuteIntentArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::execute_intent`, arguments: [ obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`), obj(tx, args.clock) ], }) }

export function getGlobalThreshold( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::get_global_threshold`, arguments: [ obj(tx, multisig) ], }) }

export interface GetMemberIdxArgs { multisig: TransactionObjectInput; addr: string | TransactionArgument }

export function getMemberIdx( tx: Transaction, args: GetMemberIdxArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::get_member_idx`, arguments: [ obj(tx, args.multisig), pure(tx, args.addr, `address`) ], }) }

export interface GetRoleIdxArgs { multisig: TransactionObjectInput; name: string | TransactionArgument }

export function getRoleIdx( tx: Transaction, args: GetRoleIdxArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::get_role_idx`, arguments: [ obj(tx, args.multisig), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface GetRoleThresholdArgs { multisig: TransactionObjectInput; name: string | TransactionArgument }

export function getRoleThreshold( tx: Transaction, args: GetRoleThresholdArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::get_role_threshold`, arguments: [ obj(tx, args.multisig), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface HasRoleArgs { member: TransactionObjectInput; role: string | TransactionArgument }

export function hasRole( tx: Transaction, args: HasRoleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::has_role`, arguments: [ obj(tx, args.member), pure(tx, args.role, `${String.$typeName}`) ], }) }

export interface IsMemberArgs { multisig: TransactionObjectInput; addr: string | TransactionArgument }

export function isMember( tx: Transaction, args: IsMemberArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::is_member`, arguments: [ obj(tx, args.multisig), pure(tx, args.addr, `address`) ], }) }

export interface JoinArgs { user: TransactionObjectInput; account: TransactionObjectInput }

export function join( tx: Transaction, args: JoinArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::join`, arguments: [ obj(tx, args.user), obj(tx, args.account) ], }) }

export interface LeaveArgs { user: TransactionObjectInput; account: TransactionObjectInput }

export function leave( tx: Transaction, args: LeaveArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::leave`, arguments: [ obj(tx, args.user), obj(tx, args.account) ], }) }

export interface MemberArgs { multisig: TransactionObjectInput; addr: string | TransactionArgument }

export function member( tx: Transaction, args: MemberArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::member`, arguments: [ obj(tx, args.multisig), pure(tx, args.addr, `address`) ], }) }

export interface NewAccountArgs { extensions: TransactionObjectInput; fees: TransactionObjectInput; coin: TransactionObjectInput }

export function newAccount( tx: Transaction, args: NewAccountArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::new_account`, arguments: [ obj(tx, args.extensions), obj(tx, args.fees), obj(tx, args.coin) ], }) }

export interface NewConfigArgs { membersAddrs: Array<string | TransactionArgument> | TransactionArgument; membersWeights: Array<bigint | TransactionArgument> | TransactionArgument; membersRoles: Array<Array<string | TransactionArgument> | TransactionArgument> | TransactionArgument; globalThreshold: bigint | TransactionArgument; roleNames: Array<string | TransactionArgument> | TransactionArgument; roleThresholds: Array<bigint | TransactionArgument> | TransactionArgument }

export function newConfig( tx: Transaction, args: NewConfigArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::new_config`, arguments: [ pure(tx, args.membersAddrs, `vector<address>`), pure(tx, args.membersWeights, `vector<u64>`), pure(tx, args.membersRoles, `vector<vector<${String.$typeName}>>`), pure(tx, args.globalThreshold, `u64`), pure(tx, args.roleNames, `vector<${String.$typeName}>`), pure(tx, args.roleThresholds, `vector<u64>`) ], }) }

export interface RoleExistsArgs { multisig: TransactionObjectInput; name: string | TransactionArgument }

export function roleExists( tx: Transaction, args: RoleExistsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::role_exists`, arguments: [ obj(tx, args.multisig), pure(tx, args.name, `${String.$typeName}`) ], }) }

export function roleWeight( tx: Transaction, outcome: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::role_weight`, arguments: [ obj(tx, outcome) ], }) }

export function roles( tx: Transaction, member: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::roles`, arguments: [ obj(tx, member) ], }) }

export interface SendInviteArgs { account: TransactionObjectInput; recipient: string | TransactionArgument }

export function sendInvite( tx: Transaction, args: SendInviteArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::send_invite`, arguments: [ obj(tx, args.account), pure(tx, args.recipient, `address`) ], }) }

export function totalWeight( tx: Transaction, outcome: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::total_weight`, arguments: [ obj(tx, outcome) ], }) }

export interface ValidateOutcomeArgs { outcome: TransactionObjectInput; multisig: TransactionObjectInput; role: string | TransactionArgument }

export function validateOutcome( tx: Transaction, args: ValidateOutcomeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::validate_outcome`, arguments: [ obj(tx, args.outcome), obj(tx, args.multisig), pure(tx, args.role, `${String.$typeName}`) ], }) }

export interface VerifyNewRulesArgs { addresses: Array<string | TransactionArgument> | TransactionArgument; weights: Array<bigint | TransactionArgument> | TransactionArgument; roles: Array<Array<string | TransactionArgument> | TransactionArgument> | TransactionArgument; global: bigint | TransactionArgument; roleNames: Array<string | TransactionArgument> | TransactionArgument; roleThresholds: Array<bigint | TransactionArgument> | TransactionArgument }

export function verifyNewRules( tx: Transaction, args: VerifyNewRulesArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::verify_new_rules`, arguments: [ pure(tx, args.addresses, `vector<address>`), pure(tx, args.weights, `vector<u64>`), pure(tx, args.roles, `vector<vector<${String.$typeName}>>`), pure(tx, args.global, `u64`), pure(tx, args.roleNames, `vector<${String.$typeName}>`), pure(tx, args.roleThresholds, `vector<u64>`) ], }) }

export function weight( tx: Transaction, member: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::weight`, arguments: [ obj(tx, member) ], }) }
