import {PUBLISHED_AT} from "..";
import {obj} from "../../_framework/util";
import {Transaction, TransactionObjectInput} from "@mysten/sui/transactions";

export function new_( tx: Transaction, issuer: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::new`, arguments: [ obj(tx, issuer) ], }) }

export function destroy( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::destroy`, arguments: [ obj(tx, executable) ], }) }

export function issuer( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::issuer`, arguments: [ obj(tx, executable) ], }) }

export function actionIdx( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::action_idx`, arguments: [ obj(tx, executable) ], }) }

export function nextAction( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::executable::next_action`, arguments: [ obj(tx, executable) ], }) }
