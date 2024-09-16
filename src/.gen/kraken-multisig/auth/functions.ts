import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function name( tx: Transaction, auth: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::auth::name`, arguments: [ obj(tx, auth) ], }) }

export function issuer( tx: Transaction, auth: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::auth::issuer`, arguments: [ obj(tx, auth) ], }) }

export interface AssertCoreDepArgs { deps: TransactionObjectInput; i: GenericArg }

export function assertCoreDep( tx: Transaction, typeArg: string, args: AssertCoreDepArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::auth::assert_core_dep`, typeArguments: [typeArg], arguments: [ obj(tx, args.deps), generic(tx, `${typeArg}`, args.i) ], }) }

export interface AssertDepArgs { deps: TransactionObjectInput; i: GenericArg }

export function assertDep( tx: Transaction, typeArg: string, args: AssertDepArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::auth::assert_dep`, typeArguments: [typeArg], arguments: [ obj(tx, args.deps), generic(tx, `${typeArg}`, args.i) ], }) }

export interface AssertIsIssuerArgs { auth: TransactionObjectInput; i: GenericArg }

export function assertIsIssuer( tx: Transaction, typeArg: string, args: AssertIsIssuerArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::auth::assert_is_issuer`, typeArguments: [typeArg], arguments: [ obj(tx, args.auth), generic(tx, `${typeArg}`, args.i) ], }) }

export interface AssertIsMultisigArgs { auth: TransactionObjectInput; multisigAddr: string | TransactionArgument }

export function assertIsMultisig( tx: Transaction, args: AssertIsMultisigArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::auth::assert_is_multisig`, arguments: [ obj(tx, args.auth), pure(tx, args.multisigAddr, `address`) ], }) }

export function multisigAddr( tx: Transaction, auth: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::auth::multisig_addr`, arguments: [ obj(tx, auth) ], }) }

export interface AssertVersionArgs { deps: TransactionObjectInput; auth: TransactionObjectInput; version: bigint | TransactionArgument }

export function assertVersion( tx: Transaction, args: AssertVersionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::auth::assert_version`, arguments: [ obj(tx, args.deps), obj(tx, args.auth), pure(tx, args.version, `u64`) ], }) }

export interface ConstructArgs { i: GenericArg; name: string | TransactionArgument; multisigAddr: string | TransactionArgument }

export function construct( tx: Transaction, typeArg: string, args: ConstructArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::auth::construct`, typeArguments: [typeArg], arguments: [ generic(tx, `${typeArg}`, args.i), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.multisigAddr, `address`) ], }) }

export function intoRole( tx: Transaction, auth: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::auth::into_role`, arguments: [ obj(tx, auth) ], }) }
