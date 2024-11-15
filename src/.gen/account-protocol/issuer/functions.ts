import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function accountAddr( tx: Transaction, issuer: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::issuer::account_addr`, arguments: [ obj(tx, issuer) ], }) }

export interface AssertIsAccountArgs { issuer: TransactionObjectInput; accountAddr: string | TransactionArgument }

export function assertIsAccount( tx: Transaction, args: AssertIsAccountArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::issuer::assert_is_account`, arguments: [ obj(tx, args.issuer), pure(tx, args.accountAddr, `address`) ], }) }

export interface AssertIsConstructorArgs { issuer: TransactionObjectInput; w: GenericArg }

export function assertIsConstructor( tx: Transaction, typeArg: string, args: AssertIsConstructorArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::issuer::assert_is_constructor`, typeArguments: [typeArg], arguments: [ obj(tx, args.issuer), generic(tx, `${typeArg}`, args.w) ], }) }

export interface ConstructArgs { accountAddr: string | TransactionArgument; version: GenericArg; role: GenericArg; roleName: string | TransactionArgument }

export function construct( tx: Transaction, typeArgs: [string, string], args: ConstructArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::issuer::construct`, typeArguments: typeArgs, arguments: [ pure(tx, args.accountAddr, `address`), generic(tx, `${typeArgs[0]}`, args.version), generic(tx, `${typeArgs[1]}`, args.role), pure(tx, args.roleName, `${String.$typeName}`) ], }) }

export function roleName( tx: Transaction, issuer: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::issuer::role_name`, arguments: [ obj(tx, issuer) ], }) }

export function fullRole( tx: Transaction, issuer: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::issuer::full_role`, arguments: [ obj(tx, issuer) ], }) }

export function roleType( tx: Transaction, issuer: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::issuer::role_type`, arguments: [ obj(tx, issuer) ], }) }
