import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface AddArgs { proposals: TransactionObjectInput; proposal: TransactionObjectInput }

export function add( tx: Transaction, typeArg: string, args: AddArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::add`, typeArguments: [typeArg], arguments: [ obj(tx, args.proposals), obj(tx, args.proposal) ], }) }

export interface ContainsArgs { proposals: TransactionObjectInput; key: string | TransactionArgument }

export function contains( tx: Transaction, typeArg: string, args: ContainsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::contains`, typeArguments: [typeArg], arguments: [ obj(tx, args.proposals), pure(tx, args.key, `${String.$typeName}`) ], }) }

export function empty( tx: Transaction, typeArg: string, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::empty`, typeArguments: [typeArg], arguments: [ ], }) }

export function length( tx: Transaction, typeArg: string, proposals: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::length`, typeArguments: [typeArg], arguments: [ obj(tx, proposals) ], }) }

export interface RemoveArgs { proposals: TransactionObjectInput; key: string | TransactionArgument; clock: TransactionObjectInput }

export function remove( tx: Transaction, typeArg: string, args: RemoveArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::remove`, typeArguments: [typeArg], arguments: [ obj(tx, args.proposals), pure(tx, args.key, `${String.$typeName}`), obj(tx, args.clock) ], }) }

export interface GetArgs { proposals: TransactionObjectInput; key: string | TransactionArgument }

export function get( tx: Transaction, typeArg: string, args: GetArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::get`, typeArguments: [typeArg], arguments: [ obj(tx, args.proposals), pure(tx, args.key, `${String.$typeName}`) ], }) }

export interface DeleteArgs { proposals: TransactionObjectInput; key: string | TransactionArgument; clock: TransactionObjectInput }

export function delete_( tx: Transaction, typeArg: string, args: DeleteArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::delete`, typeArguments: [typeArg], arguments: [ obj(tx, args.proposals), pure(tx, args.key, `${String.$typeName}`), obj(tx, args.clock) ], }) }

export interface GetIdxArgs { proposals: TransactionObjectInput; key: string | TransactionArgument }

export function getIdx( tx: Transaction, typeArg: string, args: GetIdxArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::get_idx`, typeArguments: [typeArg], arguments: [ obj(tx, args.proposals), pure(tx, args.key, `${String.$typeName}`) ], }) }

export function description( tx: Transaction, typeArg: string, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::description`, typeArguments: [typeArg], arguments: [ obj(tx, proposal) ], }) }

export interface GetMutArgs { proposals: TransactionObjectInput; idx: bigint | TransactionArgument }

export function getMut( tx: Transaction, typeArg: string, args: GetMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::get_mut`, typeArguments: [typeArg], arguments: [ obj(tx, args.proposals), pure(tx, args.idx, `u64`) ], }) }

export function issuer( tx: Transaction, typeArg: string, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::issuer`, typeArguments: [typeArg], arguments: [ obj(tx, proposal) ], }) }

export function actionIndex( tx: Transaction, typeArgs: [string, string], expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::action_index`, typeArguments: typeArgs, arguments: [ obj(tx, expired) ], }) }

export function actionsLength( tx: Transaction, typeArg: string, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::actions_length`, typeArguments: [typeArg], arguments: [ obj(tx, proposal) ], }) }

export interface AddActionArgs { proposal: TransactionObjectInput; action: GenericArg; witness: GenericArg }

export function addAction( tx: Transaction, typeArgs: [string, string, string], args: AddActionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::add_action`, typeArguments: typeArgs, arguments: [ obj(tx, args.proposal), generic(tx, `${typeArgs[1]}`, args.action), generic(tx, `${typeArgs[2]}`, args.witness) ], }) }

export interface AllIdxArgs { proposals: TransactionObjectInput; key: string | TransactionArgument }

export function allIdx( tx: Transaction, typeArg: string, args: AllIdxArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::all_idx`, typeArguments: [typeArg], arguments: [ obj(tx, args.proposals), pure(tx, args.key, `${String.$typeName}`) ], }) }

export function executionTime( tx: Transaction, typeArg: string, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::execution_time`, typeArguments: [typeArg], arguments: [ obj(tx, proposal) ], }) }

export function expirationTime( tx: Transaction, typeArg: string, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::expiration_time`, typeArguments: [typeArg], arguments: [ obj(tx, proposal) ], }) }

export interface NewProposalArgs { issuer: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationTime: bigint | TransactionArgument; outcome: GenericArg }

export function newProposal( tx: Transaction, typeArg: string, args: NewProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::new_proposal`, typeArguments: [typeArg], arguments: [ obj(tx, args.issuer), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationTime, `u64`), generic(tx, `${typeArg}`, args.outcome) ], }) }

export function outcome( tx: Transaction, typeArg: string, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::outcome`, typeArguments: [typeArg], arguments: [ obj(tx, proposal) ], }) }

export function outcomeMut( tx: Transaction, typeArg: string, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::outcome_mut`, typeArguments: [typeArg], arguments: [ obj(tx, proposal) ], }) }

export function removeExpiredAction( tx: Transaction, typeArgs: [string, string], expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::remove_expired_action`, typeArguments: typeArgs, arguments: [ obj(tx, expired) ], }) }

export function removeExpiredOutcome( tx: Transaction, typeArg: string, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposals::remove_expired_outcome`, typeArguments: [typeArg], arguments: [ obj(tx, expired) ], }) }
