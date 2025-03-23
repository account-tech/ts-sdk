import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function deleteConfigMultisig( tx: Transaction, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::delete_config_multisig`, arguments: [ obj(tx, expired) ], }) }

export interface ExecuteConfigMultisigArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function executeConfigMultisig( tx: Transaction, args: ExecuteConfigMultisigArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::execute_config_multisig`, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export interface RequestConfigMultisigArgs { auth: TransactionObjectInput; account: TransactionObjectInput; params: TransactionObjectInput; outcome: TransactionObjectInput; addresses: Array<string | TransactionArgument> | TransactionArgument; weights: Array<bigint | TransactionArgument> | TransactionArgument; roles: Array<Array<string | TransactionArgument> | TransactionArgument> | TransactionArgument; global: bigint | TransactionArgument; roleNames: Array<string | TransactionArgument> | TransactionArgument; roleThresholds: Array<bigint | TransactionArgument> | TransactionArgument }

export function requestConfigMultisig( tx: Transaction, args: RequestConfigMultisigArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::request_config_multisig`, arguments: [ obj(tx, args.auth), obj(tx, args.account), obj(tx, args.params), obj(tx, args.outcome), pure(tx, args.addresses, `vector<address>`), pure(tx, args.weights, `vector<u64>`), pure(tx, args.roles, `vector<vector<${String.$typeName}>>`), pure(tx, args.global, `u64`), pure(tx, args.roleNames, `vector<${String.$typeName}>`), pure(tx, args.roleThresholds, `vector<u64>`) ], }) }
