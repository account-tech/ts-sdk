import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface ContainsArgs { proposals: TransactionObjectInput; name: string | TransactionArgument }

export function contains( tx: Transaction, args: ContainsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::contains`, arguments: [ obj(tx, args.proposals), pure(tx, args.name, `${String.$typeName}`) ], }) }

export function length( tx: Transaction, proposals: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::length`, arguments: [ obj(tx, proposals) ], }) }

export interface RemoveArgs { proposals: TransactionObjectInput; name: string | TransactionArgument }

export function remove( tx: Transaction, args: RemoveArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::remove`, arguments: [ obj(tx, args.proposals), pure(tx, args.name, `${String.$typeName}`) ], }) }

export function new_( tx: Transaction, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::new`, arguments: [ ], }) }

export interface GetArgs { proposals: TransactionObjectInput; name: string | TransactionArgument }

export function get( tx: Transaction, args: GetArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::get`, arguments: [ obj(tx, args.proposals), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface AddArgs { proposals: TransactionObjectInput; proposal: TransactionObjectInput }

export function add( tx: Transaction, args: AddArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::add`, arguments: [ obj(tx, args.proposals), obj(tx, args.proposal) ], }) }

export interface GetIdxArgs { proposals: TransactionObjectInput; name: string | TransactionArgument }

export function getIdx( tx: Transaction, args: GetIdxArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::get_idx`, arguments: [ obj(tx, args.proposals), pure(tx, args.name, `${String.$typeName}`) ], }) }

export function description( tx: Transaction, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::description`, arguments: [ obj(tx, proposal) ], }) }

export interface GetMutArgs { proposals: TransactionObjectInput; name: string | TransactionArgument }

export function getMut( tx: Transaction, args: GetMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::get_mut`, arguments: [ obj(tx, args.proposals), pure(tx, args.name, `${String.$typeName}`) ], }) }

export function auth( tx: Transaction, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::auth`, arguments: [ obj(tx, proposal) ], }) }

export function actionsLength( tx: Transaction, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::actions_length`, arguments: [ obj(tx, proposal) ], }) }

export interface AddActionArgs { proposal: TransactionObjectInput; action: GenericArg }

export function addAction( tx: Transaction, typeArg: string, args: AddActionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::add_action`, typeArguments: [typeArg], arguments: [ obj(tx, args.proposal), generic(tx, `${typeArg}`, args.action) ], }) }

export interface ApproveArgs { proposal: TransactionObjectInput; member: TransactionObjectInput }

export function approve( tx: Transaction, args: ApproveArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::approve`, arguments: [ obj(tx, args.proposal), obj(tx, args.member) ], }) }

export function approved( tx: Transaction, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::approved`, arguments: [ obj(tx, proposal) ], }) }

export interface DisapproveArgs { proposal: TransactionObjectInput; member: TransactionObjectInput }

export function disapprove( tx: Transaction, args: DisapproveArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::disapprove`, arguments: [ obj(tx, args.proposal), obj(tx, args.member) ], }) }

export function executionTime( tx: Transaction, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::execution_time`, arguments: [ obj(tx, proposal) ], }) }

export function expirationEpoch( tx: Transaction, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::expiration_epoch`, arguments: [ obj(tx, proposal) ], }) }

export interface HasApprovedArgs { proposal: TransactionObjectInput; addr: string | TransactionArgument }

export function hasApproved( tx: Transaction, args: HasApprovedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::has_approved`, arguments: [ obj(tx, args.proposal), pure(tx, args.addr, `address`) ], }) }

export interface NewProposalArgs { auth: TransactionObjectInput; name: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument }

export function newProposal( tx: Transaction, args: NewProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::new_proposal`, arguments: [ obj(tx, args.auth), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`) ], }) }

export function roleWeight( tx: Transaction, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::role_weight`, arguments: [ obj(tx, proposal) ], }) }

export function totalWeight( tx: Transaction, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::total_weight`, arguments: [ obj(tx, proposal) ], }) }
