import {PUBLISHED_AT} from "..";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface NewArgs { accountAddr: string | TransactionArgument; intentWitness: GenericArg }

export function new_( tx: Transaction, typeArg: string, args: NewArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::issuer::new`, typeArguments: [typeArg], arguments: [ pure(tx, args.accountAddr, `address`), generic(tx, `${typeArg}`, args.intentWitness) ], }) }

export function accountAddr( tx: Transaction, issuer: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::issuer::account_addr`, arguments: [ obj(tx, issuer) ], }) }

export interface AssertIsAccountArgs { issuer: TransactionObjectInput; accountAddr: string | TransactionArgument }

export function assertIsAccount( tx: Transaction, args: AssertIsAccountArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::issuer::assert_is_account`, arguments: [ obj(tx, args.issuer), pure(tx, args.accountAddr, `address`) ], }) }

export interface AssertIsIntentArgs { issuer: TransactionObjectInput; iw: GenericArg }

export function assertIsIntent( tx: Transaction, typeArg: string, args: AssertIsIntentArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::issuer::assert_is_intent`, typeArguments: [typeArg], arguments: [ obj(tx, args.issuer), generic(tx, `${typeArg}`, args.iw) ], }) }

export function intentType( tx: Transaction, issuer: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::issuer::intent_type`, arguments: [ obj(tx, issuer) ], }) }
