import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function deleteConfigPayment( tx: Transaction, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::delete_config_payment`, arguments: [ obj(tx, expired) ], }) }

export interface ExecuteConfigPaymentArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function executeConfigPayment( tx: Transaction, args: ExecuteConfigPaymentArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::execute_config_payment`, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export interface RequestConfigPaymentArgs { auth: TransactionObjectInput; account: TransactionObjectInput; params: TransactionObjectInput; outcome: TransactionObjectInput; addrs: Array<string | TransactionArgument> | TransactionArgument; roles: Array<Array<string | TransactionArgument> | TransactionArgument> | TransactionArgument }

export function requestConfigPayment( tx: Transaction, args: RequestConfigPaymentArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::request_config_payment`, arguments: [ obj(tx, args.auth), obj(tx, args.account), obj(tx, args.params), obj(tx, args.outcome), pure(tx, args.addrs, `vector<address>`), pure(tx, args.roles, `vector<vector<${String.$typeName}>>`) ], }) }
