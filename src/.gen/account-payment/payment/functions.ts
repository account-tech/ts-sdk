import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface ApproveIntentArgs { account: TransactionObjectInput; key: string | TransactionArgument }

export function approveIntent( tx: Transaction, args: ApproveIntentArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payment::approve_intent`, arguments: [ obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`) ], }) }

export function approvedBy( tx: Transaction, pending: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payment::approved_by`, arguments: [ obj(tx, pending) ], }) }

export interface AssertHasRoleArgs { payment: TransactionObjectInput; role: string | TransactionArgument }

export function assertHasRole( tx: Transaction, args: AssertHasRoleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payment::assert_has_role`, arguments: [ obj(tx, args.payment), pure(tx, args.role, `${String.$typeName}`) ], }) }

export function assertIsMember( tx: Transaction, payment: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payment::assert_is_member`, arguments: [ obj(tx, payment) ], }) }

export function authenticate( tx: Transaction, account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payment::authenticate`, arguments: [ obj(tx, account) ], }) }

export function configMut( tx: Transaction, account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payment::config_mut`, arguments: [ obj(tx, account) ], }) }

export interface DisapproveIntentArgs { account: TransactionObjectInput; key: string | TransactionArgument }

export function disapproveIntent( tx: Transaction, args: DisapproveIntentArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payment::disapprove_intent`, arguments: [ obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`) ], }) }

export function emptyOutcome( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payment::empty_outcome`, arguments: [ ], }) }

export interface ExecuteIntentArgs { account: TransactionObjectInput; key: string | TransactionArgument; clock: TransactionObjectInput }

export function executeIntent( tx: Transaction, args: ExecuteIntentArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payment::execute_intent`, arguments: [ obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`), obj(tx, args.clock) ], }) }

export interface JoinArgs { user: TransactionObjectInput; account: TransactionObjectInput }

export function join( tx: Transaction, args: JoinArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payment::join`, arguments: [ obj(tx, args.user), obj(tx, args.account) ], }) }

export interface LeaveArgs { user: TransactionObjectInput; account: TransactionObjectInput }

export function leave( tx: Transaction, args: LeaveArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payment::leave`, arguments: [ obj(tx, args.user), obj(tx, args.account) ], }) }

export function members( tx: Transaction, payment: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payment::members`, arguments: [ obj(tx, payment) ], }) }

export function newAccount( tx: Transaction, extensions: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payment::new_account`, arguments: [ obj(tx, extensions) ], }) }

export interface NewConfigArgs { addrs: Array<string | TransactionArgument> | TransactionArgument; roles: Array<Array<string | TransactionArgument> | TransactionArgument> | TransactionArgument }

export function newConfig( tx: Transaction, args: NewConfigArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payment::new_config`, arguments: [ pure(tx, args.addrs, `vector<address>`), pure(tx, args.roles, `vector<vector<${String.$typeName}>>`) ], }) }

export interface SendInviteArgs { account: TransactionObjectInput; recipient: string | TransactionArgument }

export function sendInvite( tx: Transaction, args: SendInviteArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payment::send_invite`, arguments: [ obj(tx, args.account), pure(tx, args.recipient, `address`) ], }) }

export interface ValidateOutcomeArgs { outcome: TransactionObjectInput; config: TransactionObjectInput; role: string | TransactionArgument }

export function validateOutcome( tx: Transaction, args: ValidateOutcomeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payment::validate_outcome`, arguments: [ obj(tx, args.outcome), obj(tx, args.config), pure(tx, args.role, `${String.$typeName}`) ], }) }
