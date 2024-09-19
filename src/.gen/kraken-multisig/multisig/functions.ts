import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface NewArgs { extensions: TransactionObjectInput; name: string | TransactionArgument; accountId: string | TransactionArgument }

export function new_( tx: Transaction, args: NewArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::new`, arguments: [ obj(tx, args.extensions), pure(tx, args.name, `${String.$typeName}`), pure(tx, args.accountId, `${ID.$typeName}`) ], }) }

export function name( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::name`, arguments: [ obj(tx, multisig) ], }) }

export interface ReceiveArgs { multisig: TransactionObjectInput; witness: GenericArg; receiving: TransactionObjectInput }

export function receive( tx: Transaction, typeArgs: [string, string], args: ReceiveArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::receive`, typeArguments: typeArgs, arguments: [ obj(tx, args.multisig), generic(tx, `${typeArgs[1]}`, args.witness), obj(tx, args.receiving) ], }) }

export function share( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::share`, arguments: [ obj(tx, multisig) ], }) }

export function addr( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::addr`, arguments: [ obj(tx, multisig) ], }) }

export function members( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::members`, arguments: [ obj(tx, multisig) ], }) }

export interface MemberArgs { multisig: TransactionObjectInput; addr: string | TransactionArgument }

export function member( tx: Transaction, args: MemberArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::member`, arguments: [ obj(tx, args.multisig), pure(tx, args.addr, `address`) ], }) }

export function deps( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::deps`, arguments: [ obj(tx, multisig) ], }) }

export function proposals( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::proposals`, arguments: [ obj(tx, multisig) ], }) }

export interface ProposalArgs { multisig: TransactionObjectInput; key: string | TransactionArgument }

export function proposal( tx: Transaction, args: ProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::proposal`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`) ], }) }

export function thresholds( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::thresholds`, arguments: [ obj(tx, multisig) ], }) }

export interface AddManagedAssetArgs { multisig: TransactionObjectInput; witness: GenericArg; key: GenericArg; asset: GenericArg }

export function addManagedAsset( tx: Transaction, typeArgs: [string, string, string], args: AddManagedAssetArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::add_managed_asset`, typeArguments: typeArgs, arguments: [ obj(tx, args.multisig), generic(tx, `${typeArgs[2]}`, args.witness), generic(tx, `${typeArgs[0]}`, args.key), generic(tx, `${typeArgs[1]}`, args.asset) ], }) }

export interface ApproveProposalArgs { multisig: TransactionObjectInput; key: string | TransactionArgument }

export function approveProposal( tx: Transaction, args: ApproveProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::approve_proposal`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`) ], }) }

export function assertIsMember( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::assert_is_member`, arguments: [ obj(tx, multisig) ], }) }

export interface BorrowManagedAssetArgs { multisig: TransactionObjectInput; witness: GenericArg; key: GenericArg }

export function borrowManagedAsset( tx: Transaction, typeArgs: [string, string, string], args: BorrowManagedAssetArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::borrow_managed_asset`, typeArguments: typeArgs, arguments: [ obj(tx, args.multisig), generic(tx, `${typeArgs[2]}`, args.witness), generic(tx, `${typeArgs[0]}`, args.key) ], }) }

export interface BorrowManagedAssetMutArgs { multisig: TransactionObjectInput; witness: GenericArg; key: GenericArg }

export function borrowManagedAssetMut( tx: Transaction, typeArgs: [string, string, string], args: BorrowManagedAssetMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::borrow_managed_asset_mut`, typeArguments: typeArgs, arguments: [ obj(tx, args.multisig), generic(tx, `${typeArgs[2]}`, args.witness), generic(tx, `${typeArgs[0]}`, args.key) ], }) }

export interface CreateProposalArgs { multisig: TransactionObjectInput; witness: GenericArg; authName: string | TransactionArgument; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument }

export function createProposal( tx: Transaction, typeArg: string, args: CreateProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::create_proposal`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), generic(tx, `${typeArg}`, args.witness), pure(tx, args.authName, `${String.$typeName}`), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`) ], }) }

export interface DepsMutArgs { multisig: TransactionObjectInput; executable: TransactionObjectInput; witness: GenericArg }

export function depsMut( tx: Transaction, typeArg: string, args: DepsMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::deps_mut`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface ExecuteProposalArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; clock: TransactionObjectInput }

export function executeProposal( tx: Transaction, args: ExecuteProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::execute_proposal`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), obj(tx, args.clock) ], }) }

export interface HasManagedAssetArgs { multisig: TransactionObjectInput; key: GenericArg }

export function hasManagedAsset( tx: Transaction, typeArg: string, args: HasManagedAssetArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::has_managed_asset`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), generic(tx, `${typeArg}`, args.key) ], }) }

export interface MemberMutArgs { multisig: TransactionObjectInput; addr: string | TransactionArgument }

export function memberMut( tx: Transaction, args: MemberMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::member_mut`, arguments: [ obj(tx, args.multisig), pure(tx, args.addr, `address`) ], }) }

export interface MembersMutArgs { multisig: TransactionObjectInput; executable: TransactionObjectInput; witness: GenericArg }

export function membersMut( tx: Transaction, typeArg: string, args: MembersMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::members_mut`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface NameMutArgs { multisig: TransactionObjectInput; executable: TransactionObjectInput; witness: GenericArg }

export function nameMut( tx: Transaction, typeArg: string, args: NameMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::name_mut`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface RemoveApprovalArgs { multisig: TransactionObjectInput; key: string | TransactionArgument }

export function removeApproval( tx: Transaction, args: RemoveApprovalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::remove_approval`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`) ], }) }

export interface RemoveManagedAssetArgs { multisig: TransactionObjectInput; witness: GenericArg; key: GenericArg }

export function removeManagedAsset( tx: Transaction, typeArgs: [string, string, string], args: RemoveManagedAssetArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::remove_managed_asset`, typeArguments: typeArgs, arguments: [ obj(tx, args.multisig), generic(tx, `${typeArgs[2]}`, args.witness), generic(tx, `${typeArgs[0]}`, args.key) ], }) }

export interface ThresholdsMutArgs { multisig: TransactionObjectInput; executable: TransactionObjectInput; witness: GenericArg }

export function thresholdsMut( tx: Transaction, typeArg: string, args: ThresholdsMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::thresholds_mut`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }
