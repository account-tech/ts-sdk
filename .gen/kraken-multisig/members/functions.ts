import {PUBLISHED_AT} from "..";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function toVec( tx: Transaction, members: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::members::to_vec`, arguments: [ obj(tx, members) ], }) }

export function new_( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::members::new`, arguments: [ ], }) }

export interface GetArgs { members: TransactionObjectInput; addr: string | TransactionArgument }

export function get( tx: Transaction, args: GetArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::members::get`, arguments: [ obj(tx, args.members), pure(tx, args.addr, `address`) ], }) }

export interface AddArgs { members: TransactionObjectInput; member: TransactionObjectInput }

export function add( tx: Transaction, args: AddArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::members::add`, arguments: [ obj(tx, args.members), obj(tx, args.member) ], }) }

export interface GetIdxArgs { members: TransactionObjectInput; addr: string | TransactionArgument }

export function getIdx( tx: Transaction, args: GetIdxArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::members::get_idx`, arguments: [ obj(tx, args.members), pure(tx, args.addr, `address`) ], }) }

export interface GetMutArgs { members: TransactionObjectInput; addr: string | TransactionArgument }

export function getMut( tx: Transaction, args: GetMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::members::get_mut`, arguments: [ obj(tx, args.members), pure(tx, args.addr, `address`) ], }) }

export function accountId( tx: Transaction, member: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::members::account_id`, arguments: [ obj(tx, member) ], }) }

export function addresses( tx: Transaction, members: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::members::addresses`, arguments: [ obj(tx, members) ], }) }

export interface HasRoleArgs { member: TransactionObjectInput; role: string | TransactionArgument }

export function hasRole( tx: Transaction, args: HasRoleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::members::has_role`, arguments: [ obj(tx, args.member), pure(tx, args.role, `${String.$typeName}`) ], }) }

export interface IsMemberArgs { members: TransactionObjectInput; addr: string | TransactionArgument }

export function isMember( tx: Transaction, args: IsMemberArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::members::is_member`, arguments: [ obj(tx, args.members), pure(tx, args.addr, `address`) ], }) }

export interface NewMemberArgs { addr: string | TransactionArgument; weight: bigint | TransactionArgument; accountId: (string | TransactionArgument | TransactionArgument | null); roles: Array<string | TransactionArgument> | TransactionArgument }

export function newMember( tx: Transaction, args: NewMemberArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::members::new_member`, arguments: [ pure(tx, args.addr, `address`), pure(tx, args.weight, `u64`), pure(tx, args.accountId, `${Option.$typeName}<${ID.$typeName}>`), pure(tx, args.roles, `vector<${String.$typeName}>`) ], }) }

export function weight( tx: Transaction, member: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::members::weight`, arguments: [ obj(tx, member) ], }) }

export function roles( tx: Transaction, member: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::members::roles`, arguments: [ obj(tx, member) ], }) }

export interface RegisterAccountIdArgs { member: TransactionObjectInput; id: string | TransactionArgument }

export function registerAccountId( tx: Transaction, args: RegisterAccountIdArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::members::register_account_id`, arguments: [ obj(tx, args.member), pure(tx, args.id, `${ID.$typeName}`) ], }) }

export function unregisterAccountId( tx: Transaction, member: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::members::unregister_account_id`, arguments: [ obj(tx, member) ], }) }
