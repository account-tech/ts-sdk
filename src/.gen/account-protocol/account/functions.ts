import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface NewArgs { extensions: TransactionObjectInput; name: string | TransactionArgument; config: GenericArg }

export function new_( tx: Transaction, typeArgs: [string, string], args: NewArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::new`, typeArguments: typeArgs, arguments: [ obj(tx, args.extensions), pure(tx, args.name, `${String.$typeName}`), generic(tx, `${typeArgs[0]}`, args.config) ], }) }

export interface ReceiveArgs { account: TransactionObjectInput; receiving: TransactionObjectInput; version: TransactionObjectInput }

export function receive( tx: Transaction, typeArgs: [string, string, string], args: ReceiveArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::receive`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.receiving), obj(tx, args.version) ], }) }

export function config( tx: Transaction, typeArgs: [string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::config`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export function share( tx: Transaction, typeArgs: [string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::share`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export function addr( tx: Transaction, typeArgs: [string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::addr`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export function metadata( tx: Transaction, typeArgs: [string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::metadata`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export interface KeepArgs { account: TransactionObjectInput; obj: GenericArg }

export function keep( tx: Transaction, typeArgs: [string, string, string], args: KeepArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::keep`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.obj) ], }) }

export function init( tx: Transaction, otw: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::init`, arguments: [ obj(tx, otw) ], }) }

export function proposals( tx: Transaction, typeArgs: [string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::proposals`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export interface ProposalArgs { account: TransactionObjectInput; key: string | TransactionArgument }

export function proposal( tx: Transaction, typeArgs: [string, string], args: ProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::proposal`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`) ], }) }

export function deps( tx: Transaction, typeArgs: [string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::deps`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export interface AddManagedAssetArgs { account: TransactionObjectInput; key: GenericArg; asset: GenericArg; version: TransactionObjectInput }

export function addManagedAsset( tx: Transaction, typeArgs: [string, string, string, string], args: AddManagedAssetArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::add_managed_asset`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.key), generic(tx, `${typeArgs[3]}`, args.asset), obj(tx, args.version) ], }) }

export interface AddProposalArgs { account: TransactionObjectInput; proposal: TransactionObjectInput; version: TransactionObjectInput; witness: GenericArg }

export function addProposal( tx: Transaction, typeArgs: [string, string, string], args: AddProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::add_proposal`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.proposal), obj(tx, args.version), generic(tx, `${typeArgs[2]}`, args.witness) ], }) }

export interface BorrowManagedAssetArgs { account: TransactionObjectInput; key: GenericArg; version: TransactionObjectInput }

export function borrowManagedAsset( tx: Transaction, typeArgs: [string, string, string, string], args: BorrowManagedAssetArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::borrow_managed_asset`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.key), obj(tx, args.version) ], }) }

export interface BorrowManagedAssetMutArgs { account: TransactionObjectInput; key: GenericArg; version: TransactionObjectInput }

export function borrowManagedAssetMut( tx: Transaction, typeArgs: [string, string, string, string], args: BorrowManagedAssetMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::borrow_managed_asset_mut`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.key), obj(tx, args.version) ], }) }

export interface ConfigMutArgs { account: TransactionObjectInput; version: TransactionObjectInput }

export function configMut( tx: Transaction, typeArgs: [string, string], args: ConfigMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::config_mut`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.version) ], }) }

export interface CreateProposalArgs { account: TransactionObjectInput; auth: TransactionObjectInput; outcome: GenericArg; version: TransactionObjectInput; witness: GenericArg; wName: string | TransactionArgument; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationTime: bigint | TransactionArgument }

export function createProposal( tx: Transaction, typeArgs: [string, string, string], args: CreateProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::create_proposal`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.auth), generic(tx, `${typeArgs[1]}`, args.outcome), obj(tx, args.version), generic(tx, `${typeArgs[2]}`, args.witness), pure(tx, args.wName, `${String.$typeName}`), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationTime, `u64`) ], }) }

export interface DeleteProposalArgs { account: TransactionObjectInput; key: string | TransactionArgument; version: TransactionObjectInput; clock: TransactionObjectInput }

export function deleteProposal( tx: Transaction, typeArgs: [string, string], args: DeleteProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::delete_proposal`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`), obj(tx, args.version), obj(tx, args.clock) ], }) }

export interface DepsMutArgs { account: TransactionObjectInput; version: TransactionObjectInput }

export function depsMut( tx: Transaction, typeArgs: [string, string], args: DepsMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::deps_mut`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.version) ], }) }

export interface ExecuteProposalArgs { account: TransactionObjectInput; key: string | TransactionArgument; clock: TransactionObjectInput; version: TransactionObjectInput }

export function executeProposal( tx: Transaction, typeArgs: [string, string], args: ExecuteProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::execute_proposal`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.key, `${String.$typeName}`), obj(tx, args.clock), obj(tx, args.version) ], }) }

export interface HasManagedAssetArgs { account: TransactionObjectInput; key: GenericArg }

export function hasManagedAsset( tx: Transaction, typeArgs: [string, string, string], args: HasManagedAssetArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::has_managed_asset`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.key) ], }) }

export interface MetadataMutArgs { account: TransactionObjectInput; version: TransactionObjectInput }

export function metadataMut( tx: Transaction, typeArgs: [string, string], args: MetadataMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::metadata_mut`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.version) ], }) }

export interface ProposalMutArgs { account: TransactionObjectInput; idx: bigint | TransactionArgument; version: TransactionObjectInput }

export function proposalMut( tx: Transaction, typeArgs: [string, string], args: ProposalMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::proposal_mut`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), pure(tx, args.idx, `u64`), obj(tx, args.version) ], }) }

export interface ProposalsMutArgs { account: TransactionObjectInput; version: TransactionObjectInput }

export function proposalsMut( tx: Transaction, typeArgs: [string, string], args: ProposalsMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::proposals_mut`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.version) ], }) }

export interface RemoveManagedAssetArgs { account: TransactionObjectInput; key: GenericArg; version: TransactionObjectInput }

export function removeManagedAsset( tx: Transaction, typeArgs: [string, string, string, string], args: RemoveManagedAssetArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::account::remove_managed_asset`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), generic(tx, `${typeArgs[2]}`, args.key), obj(tx, args.version) ], }) }
