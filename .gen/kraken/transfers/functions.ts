import {PUBLISHED_AT} from "..";
import {GenericArg, ObjectArg, generic, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export interface ClaimArgs { delivery: ObjectArg; cap: ObjectArg }

export function claim( txb: TransactionBlock, typeArg: string, args: ClaimArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::transfers::claim`, typeArguments: [typeArg], arguments: [ obj(txb, args.delivery), obj(txb, args.cap) ], }) }

export interface CancelDeliveryArgs { multisig: ObjectArg; delivery: ObjectArg }

export function cancelDelivery( txb: TransactionBlock, args: CancelDeliveryArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::transfers::cancel_delivery`, arguments: [ obj(txb, args.multisig), obj(txb, args.delivery) ], }) }

export interface CompleteDeliverArgs { delivery: ObjectArg; cap: ObjectArg; executable: ObjectArg }

export function completeDeliver( txb: TransactionBlock, args: CompleteDeliverArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::transfers::complete_deliver`, arguments: [ obj(txb, args.delivery), obj(txb, args.cap), obj(txb, args.executable) ], }) }

export function completeSend( txb: TransactionBlock, executable: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::transfers::complete_send`, arguments: [ obj(txb, executable) ], }) }

export interface ConfirmDeliveryArgs { delivery: ObjectArg; cap: ObjectArg }

export function confirmDelivery( txb: TransactionBlock, args: ConfirmDeliveryArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::transfers::confirm_delivery`, arguments: [ obj(txb, args.delivery), obj(txb, args.cap) ], }) }

export function createDelivery( txb: TransactionBlock, multisig: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::transfers::create_delivery`, arguments: [ obj(txb, multisig) ], }) }

export interface DeliverArgs { delivery: ObjectArg; cap: ObjectArg; executable: ObjectArg; multisig: ObjectArg; receiving: ObjectArg; witness: GenericArg; idx: bigint | TransactionArgument }

export function deliver( txb: TransactionBlock, typeArgs: [string, string], args: DeliverArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::transfers::deliver`, typeArguments: typeArgs, arguments: [ obj(txb, args.delivery), obj(txb, args.cap), obj(txb, args.executable), obj(txb, args.multisig), obj(txb, args.receiving), generic(txb, `${typeArgs[1]}`, args.witness), pure(txb, args.idx, `u64`) ], }) }

export interface DestroyDeliverArgs { executable: ObjectArg; witness: GenericArg }

export function destroyDeliver( txb: TransactionBlock, typeArg: string, args: DestroyDeliverArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::transfers::destroy_deliver`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), generic(txb, `${typeArg}`, args.witness) ], }) }

export interface DestroySendArgs { executable: ObjectArg; witness: GenericArg }

export function destroySend( txb: TransactionBlock, typeArg: string, args: DestroySendArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::transfers::destroy_send`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), generic(txb, `${typeArg}`, args.witness) ], }) }

export interface ExecuteDeliverArgs { delivery: ObjectArg; cap: ObjectArg; executable: ObjectArg; multisig: ObjectArg; receiving: ObjectArg }

export function executeDeliver( txb: TransactionBlock, typeArg: string, args: ExecuteDeliverArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::transfers::execute_deliver`, typeArguments: [typeArg], arguments: [ obj(txb, args.delivery), obj(txb, args.cap), obj(txb, args.executable), obj(txb, args.multisig), obj(txb, args.receiving) ], }) }

export interface ExecuteSendArgs { executable: ObjectArg; multisig: ObjectArg; receiving: ObjectArg }

export function executeSend( txb: TransactionBlock, typeArg: string, args: ExecuteSendArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::transfers::execute_send`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), obj(txb, args.multisig), obj(txb, args.receiving) ], }) }

export interface NewDeliverArgs { proposal: ObjectArg; objects: Array<string | TransactionArgument> | TransactionArgument; recipient: string | TransactionArgument }

export function newDeliver( txb: TransactionBlock, args: NewDeliverArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::transfers::new_deliver`, arguments: [ obj(txb, args.proposal), pure(txb, args.objects, `vector<0x2::object::ID>`), pure(txb, args.recipient, `address`) ], }) }

export interface NewSendArgs { proposal: ObjectArg; objects: Array<string | TransactionArgument> | TransactionArgument; recipients: Array<string | TransactionArgument> | TransactionArgument }

export function newSend( txb: TransactionBlock, args: NewSendArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::transfers::new_send`, arguments: [ obj(txb, args.proposal), pure(txb, args.objects, `vector<0x2::object::ID>`), pure(txb, args.recipients, `vector<address>`) ], }) }

export interface ProposeDeliveryArgs { multisig: ObjectArg; key: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument; objects: Array<string | TransactionArgument> | TransactionArgument; recipient: string | TransactionArgument }

export function proposeDelivery( txb: TransactionBlock, args: ProposeDeliveryArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::transfers::propose_delivery`, arguments: [ obj(txb, args.multisig), pure(txb, args.key, `0x1::string::String`), pure(txb, args.executionTime, `u64`), pure(txb, args.expirationEpoch, `u64`), pure(txb, args.description, `0x1::string::String`), pure(txb, args.objects, `vector<0x2::object::ID>`), pure(txb, args.recipient, `address`) ], }) }

export interface ProposeSendArgs { multisig: ObjectArg; key: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument; objects: Array<string | TransactionArgument> | TransactionArgument; recipients: Array<string | TransactionArgument> | TransactionArgument }

export function proposeSend( txb: TransactionBlock, args: ProposeSendArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::transfers::propose_send`, arguments: [ obj(txb, args.multisig), pure(txb, args.key, `0x1::string::String`), pure(txb, args.executionTime, `u64`), pure(txb, args.expirationEpoch, `u64`), pure(txb, args.description, `0x1::string::String`), pure(txb, args.objects, `vector<0x2::object::ID>`), pure(txb, args.recipients, `vector<address>`) ], }) }

export interface RetrieveArgs { delivery: ObjectArg; multisig: ObjectArg }

export function retrieve( txb: TransactionBlock, typeArg: string, args: RetrieveArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::transfers::retrieve`, typeArguments: [typeArg], arguments: [ obj(txb, args.delivery), obj(txb, args.multisig) ], }) }

export interface SendArgs { executable: ObjectArg; multisig: ObjectArg; receiving: ObjectArg; witness: GenericArg; idx: bigint | TransactionArgument }

export function send( txb: TransactionBlock, typeArgs: [string, string], args: SendArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::transfers::send`, typeArguments: typeArgs, arguments: [ obj(txb, args.executable), obj(txb, args.multisig), obj(txb, args.receiving), generic(txb, `${typeArgs[1]}`, args.witness), pure(txb, args.idx, `u64`) ], }) }
