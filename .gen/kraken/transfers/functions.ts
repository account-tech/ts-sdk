import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface ClaimArgs { delivery: TransactionObjectInput; cap: TransactionObjectInput }

export function claim( tx: Transaction, typeArg: string, args: ClaimArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::claim`, typeArguments: [typeArg], arguments: [ obj(tx, args.delivery), obj(tx, args.cap) ], }) }

export interface CancelDeliveryArgs { multisig: TransactionObjectInput; delivery: TransactionObjectInput }

export function cancelDelivery( tx: Transaction, args: CancelDeliveryArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::cancel_delivery`, arguments: [ obj(tx, args.multisig), obj(tx, args.delivery) ], }) }

export interface CompleteDeliverArgs { delivery: TransactionObjectInput; cap: TransactionObjectInput; executable: TransactionObjectInput }

export function completeDeliver( tx: Transaction, args: CompleteDeliverArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::complete_deliver`, arguments: [ obj(tx, args.delivery), obj(tx, args.cap), obj(tx, args.executable) ], }) }

export function completeSend( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::complete_send`, arguments: [ obj(tx, executable) ], }) }

export interface ConfirmDeliveryArgs { delivery: TransactionObjectInput; cap: TransactionObjectInput }

export function confirmDelivery( tx: Transaction, args: ConfirmDeliveryArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::confirm_delivery`, arguments: [ obj(tx, args.delivery), obj(tx, args.cap) ], }) }

export function createDelivery( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::create_delivery`, arguments: [ obj(tx, multisig) ], }) }

export interface DeliverArgs { delivery: TransactionObjectInput; cap: TransactionObjectInput; executable: TransactionObjectInput; multisig: TransactionObjectInput; receiving: TransactionObjectInput; witness: GenericArg; idx: bigint | TransactionArgument }

export function deliver( tx: Transaction, typeArgs: [string, string], args: DeliverArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::deliver`, typeArguments: typeArgs, arguments: [ obj(tx, args.delivery), obj(tx, args.cap), obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.receiving), generic(tx, `${typeArgs[1]}`, args.witness), pure(tx, args.idx, `u64`) ], }) }

export interface DestroyDeliverArgs { executable: TransactionObjectInput; witness: GenericArg }

export function destroyDeliver( tx: Transaction, typeArg: string, args: DestroyDeliverArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::destroy_deliver`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface DestroySendArgs { executable: TransactionObjectInput; witness: GenericArg }

export function destroySend( tx: Transaction, typeArg: string, args: DestroySendArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::destroy_send`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface ExecuteDeliverArgs { delivery: TransactionObjectInput; cap: TransactionObjectInput; executable: TransactionObjectInput; multisig: TransactionObjectInput; receiving: TransactionObjectInput }

export function executeDeliver( tx: Transaction, typeArg: string, args: ExecuteDeliverArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::execute_deliver`, typeArguments: [typeArg], arguments: [ obj(tx, args.delivery), obj(tx, args.cap), obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.receiving) ], }) }

export interface ExecuteSendArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; receiving: TransactionObjectInput }

export function executeSend( tx: Transaction, typeArg: string, args: ExecuteSendArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::execute_send`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.receiving) ], }) }

export interface NewDeliverArgs { proposal: TransactionObjectInput; objects: Array<string | TransactionArgument> | TransactionArgument; recipient: string | TransactionArgument }

export function newDeliver( tx: Transaction, args: NewDeliverArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::new_deliver`, arguments: [ obj(tx, args.proposal), pure(tx, args.objects, `vector<${ID.$typeName}>`), pure(tx, args.recipient, `address`) ], }) }

export interface NewSendArgs { proposal: TransactionObjectInput; objects: Array<string | TransactionArgument> | TransactionArgument; recipients: Array<string | TransactionArgument> | TransactionArgument }

export function newSend( tx: Transaction, args: NewSendArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::new_send`, arguments: [ obj(tx, args.proposal), pure(tx, args.objects, `vector<${ID.$typeName}>`), pure(tx, args.recipients, `vector<address>`) ], }) }

export interface ProposeDeliveryArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument; objects: Array<string | TransactionArgument> | TransactionArgument; recipient: string | TransactionArgument }

export function proposeDelivery( tx: Transaction, args: ProposeDeliveryArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::propose_delivery`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.objects, `vector<${ID.$typeName}>`), pure(tx, args.recipient, `address`) ], }) }

export interface ProposeSendArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument; objects: Array<string | TransactionArgument> | TransactionArgument; recipients: Array<string | TransactionArgument> | TransactionArgument }

export function proposeSend( tx: Transaction, args: ProposeSendArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::propose_send`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.objects, `vector<${ID.$typeName}>`), pure(tx, args.recipients, `vector<address>`) ], }) }

export interface RetrieveArgs { delivery: TransactionObjectInput; multisig: TransactionObjectInput }

export function retrieve( tx: Transaction, typeArg: string, args: RetrieveArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::retrieve`, typeArguments: [typeArg], arguments: [ obj(tx, args.delivery), obj(tx, args.multisig) ], }) }

export interface SendArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; receiving: TransactionObjectInput; witness: GenericArg; idx: bigint | TransactionArgument }

export function send( tx: Transaction, typeArgs: [string, string], args: SendArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::transfers::send`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.receiving), generic(tx, `${typeArgs[1]}`, args.witness), pure(tx, args.idx, `u64`) ], }) }
