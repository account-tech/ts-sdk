import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface ContainsArgs { intents: TransactionObjectInput; key: string | TransactionArgument }

export function contains( tx: Transaction, typeArg: string, args: ContainsArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::contains`, typeArguments: [typeArg], arguments: [ obj(tx, args.intents), pure(tx, args.key, `${String.$typeName}`) ], }) }

export function empty( tx: Transaction, typeArg: string, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::empty`, typeArguments: [typeArg], arguments: [ ], }) }

export function length( tx: Transaction, typeArg: string, intents: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::length`, typeArguments: [typeArg], arguments: [ obj(tx, intents) ], }) }

export interface GetArgs { intents: TransactionObjectInput; key: string | TransactionArgument }

export function get( tx: Transaction, typeArg: string, args: GetArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::get`, typeArguments: [typeArg], arguments: [ obj(tx, args.intents), pure(tx, args.key, `${String.$typeName}`) ], }) }

export interface DestroyArgs { intents: TransactionObjectInput; key: string | TransactionArgument }

export function destroy( tx: Transaction, typeArg: string, args: DestroyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::destroy`, typeArguments: [typeArg], arguments: [ obj(tx, args.intents), pure(tx, args.key, `${String.$typeName}`) ], }) }

export interface GetIdxArgs { intents: TransactionObjectInput; key: string | TransactionArgument }

export function getIdx( tx: Transaction, typeArg: string, args: GetIdxArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::get_idx`, typeArguments: [typeArg], arguments: [ obj(tx, args.intents), pure(tx, args.key, `${String.$typeName}`) ], }) }

export function description( tx: Transaction, typeArg: string, intent: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::description`, typeArguments: [typeArg], arguments: [ obj(tx, intent) ], }) }

export interface GetMutArgs { intents: TransactionObjectInput; key: string | TransactionArgument }

export function getMut( tx: Transaction, typeArg: string, args: GetMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::get_mut`, typeArguments: [typeArg], arguments: [ obj(tx, args.intents), pure(tx, args.key, `${String.$typeName}`) ], }) }

export interface LockArgs { intents: TransactionObjectInput; id: string | TransactionArgument }

export function lock( tx: Transaction, typeArg: string, args: LockArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::lock`, typeArguments: [typeArg], arguments: [ obj(tx, args.intents), pure(tx, args.id, `${ID.$typeName}`) ], }) }

export function issuer( tx: Transaction, typeArg: string, intent: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::issuer`, typeArguments: [typeArg], arguments: [ obj(tx, intent) ], }) }

export function actions( tx: Transaction, typeArg: string, intent: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::actions`, typeArguments: [typeArg], arguments: [ obj(tx, intent) ], }) }

export interface AddActionArgs { intent: TransactionObjectInput; action: GenericArg }

export function addAction( tx: Transaction, typeArgs: [string, string], args: AddActionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::add_action`, typeArguments: typeArgs, arguments: [ obj(tx, args.intent), generic(tx, `${typeArgs[1]}`, args.action) ], }) }

export interface AddIntentArgs { intents: TransactionObjectInput; intent: TransactionObjectInput }

export function addIntent( tx: Transaction, typeArg: string, args: AddIntentArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::add_intent`, typeArguments: [typeArg], arguments: [ obj(tx, args.intents), obj(tx, args.intent) ], }) }

export function creator( tx: Transaction, typeArg: string, intent: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::creator`, typeArguments: [typeArg], arguments: [ obj(tx, intent) ], }) }

export function destroyEmptyExpired( tx: Transaction, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::destroy_empty_expired`, arguments: [ obj(tx, expired) ], }) }

export function executionTimes( tx: Transaction, typeArg: string, intent: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::execution_times`, typeArguments: [typeArg], arguments: [ obj(tx, intent) ], }) }

export function expirationTime( tx: Transaction, typeArg: string, intent: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::expiration_time`, typeArguments: [typeArg], arguments: [ obj(tx, intent) ], }) }

export function expiredActions( tx: Transaction, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::expired_actions`, arguments: [ obj(tx, expired) ], }) }

export function expiredIssuer( tx: Transaction, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::expired_issuer`, arguments: [ obj(tx, expired) ], }) }

export function expiredKey( tx: Transaction, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::expired_key`, arguments: [ obj(tx, expired) ], }) }

export function expiredStartIndex( tx: Transaction, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::expired_start_index`, arguments: [ obj(tx, expired) ], }) }

export function locked( tx: Transaction, typeArg: string, intents: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::locked`, typeArguments: [typeArg], arguments: [ obj(tx, intents) ], }) }

export interface NewIntentArgs { issuer: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTimes: Array<bigint | TransactionArgument> | TransactionArgument; expirationTime: bigint | TransactionArgument; role: string | TransactionArgument; outcome: GenericArg }

export function newIntent( tx: Transaction, typeArg: string, args: NewIntentArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::new_intent`, typeArguments: [typeArg], arguments: [ obj(tx, args.issuer), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTimes, `vector<u64>`), pure(tx, args.expirationTime, `u64`), pure(tx, args.role, `${String.$typeName}`), generic(tx, `${typeArg}`, args.outcome) ], }) }

export function role( tx: Transaction, typeArg: string, intent: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::role`, typeArguments: [typeArg], arguments: [ obj(tx, intent) ], }) }

export function outcome( tx: Transaction, typeArg: string, intent: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::outcome`, typeArguments: [typeArg], arguments: [ obj(tx, intent) ], }) }

export interface NewRoleArgs { managedName: string | TransactionArgument; intentWitness: GenericArg }

export function newRole( tx: Transaction, typeArg: string, args: NewRoleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::new_role`, typeArguments: [typeArg], arguments: [ pure(tx, args.managedName, `${String.$typeName}`), generic(tx, `${typeArg}`, args.intentWitness) ], }) }

export function outcomeMut( tx: Transaction, typeArg: string, intent: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::outcome_mut`, typeArguments: [typeArg], arguments: [ obj(tx, intent) ], }) }

export function popFrontExecutionTime( tx: Transaction, typeArg: string, intent: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::pop_front_execution_time`, typeArguments: [typeArg], arguments: [ obj(tx, intent) ], }) }

export function removeAction( tx: Transaction, typeArg: string, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::remove_action`, typeArguments: [typeArg], arguments: [ obj(tx, expired) ], }) }

export interface UnlockArgs { intents: TransactionObjectInput; id: string | TransactionArgument }

export function unlock( tx: Transaction, typeArg: string, args: UnlockArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::intents::unlock`, typeArguments: [typeArg], arguments: [ obj(tx, args.intents), pure(tx, args.id, `${ID.$typeName}`) ], }) }
