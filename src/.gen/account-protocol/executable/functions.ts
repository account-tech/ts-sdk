import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface NewArgs { issuer: TransactionObjectInput; key: string | TransactionArgument }

export function new_( tx: Transaction, args: NewArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::new`, arguments: [ obj(tx, args.issuer), pure(tx, args.key, `${String.$typeName}`) ], }) }

export function destroy( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::destroy`, arguments: [ obj(tx, executable) ], }) }

export function key( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::key`, arguments: [ obj(tx, executable) ], }) }

export function issuer( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::issuer`, arguments: [ obj(tx, executable) ], }) }

export function actionIdx( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::action_idx`, arguments: [ obj(tx, executable) ], }) }

export function nextAction( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::next_action`, arguments: [ obj(tx, executable) ], }) }
