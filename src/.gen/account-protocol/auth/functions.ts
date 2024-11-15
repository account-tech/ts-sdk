import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface NewArgs { extensions: TransactionObjectInput; role: string | TransactionArgument; accountAddr: string | TransactionArgument; version: TransactionObjectInput }

export function new_( tx: Transaction, args: NewArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::auth::new`, arguments: [ obj(tx, args.extensions), pure(tx, args.role, `${String.$typeName}`), pure(tx, args.accountAddr, `address`), obj(tx, args.version) ], }) }

export function accountAddr( tx: Transaction, auth: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::auth::account_addr`, arguments: [ obj(tx, auth) ], }) }

export function role( tx: Transaction, auth: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::auth::role`, arguments: [ obj(tx, auth) ], }) }

export interface VerifyArgs { auth: TransactionObjectInput; addr: string | TransactionArgument }

export function verify( tx: Transaction, args: VerifyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::auth::verify`, arguments: [ obj(tx, args.auth), pure(tx, args.addr, `address`) ], }) }

export interface VerifyWithRoleArgs { auth: TransactionObjectInput; addr: string | TransactionArgument; name: string | TransactionArgument }

export function verifyWithRole( tx: Transaction, typeArg: string, args: VerifyWithRoleArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::auth::verify_with_role`, typeArguments: [typeArg], arguments: [ obj(tx, args.auth), pure(tx, args.addr, `address`), pure(tx, args.name, `${String.$typeName}`) ], }) }
