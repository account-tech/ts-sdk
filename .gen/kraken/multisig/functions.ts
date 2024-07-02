import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface NewArgs { name: string | TransactionArgument; accountId: string | TransactionArgument }

export function new_( tx: Transaction, args: NewArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::new`, arguments: [ pure(tx, args.name, `${String.$typeName}`), pure(tx, args.accountId, `${ID.$typeName}`) ], }) }

export function name( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::name`, arguments: [ obj(tx, multisig) ], }) }

export function version( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::version`, arguments: [ obj(tx, multisig) ], }) }

export function addr( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::addr`, arguments: [ obj(tx, multisig) ], }) }

export function description( tx: Transaction, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::description`, arguments: [ obj(tx, proposal) ], }) }

export function uidMut( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::uid_mut`, arguments: [ obj(tx, multisig) ], }) }

export interface ActionMutArgs { executable: TransactionObjectInput; witness: GenericArg; idx: bigint | TransactionArgument }

export function actionMut( tx: Transaction, typeArgs: [string, string], args: ActionMutArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::action_mut`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), generic(tx, `${typeArgs[0]}`, args.witness), pure(tx, args.idx, `u64`) ], }) }

export interface AddActionArgs { proposal: TransactionObjectInput; action: GenericArg }

export function addAction( tx: Transaction, typeArg: string, args: AddActionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::add_action`, typeArguments: [typeArg], arguments: [ obj(tx, args.proposal), generic(tx, `${typeArg}`, args.action) ], }) }

export interface ProposalArgs { multisig: TransactionObjectInput; key: string | TransactionArgument }

export function proposal( tx: Transaction, args: ProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::proposal`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`) ], }) }

export interface AddMembersArgs { multisig: TransactionObjectInput; addresses: Array<string | TransactionArgument> | TransactionArgument; weights: Array<bigint | TransactionArgument> | TransactionArgument }

export function addMembers( tx: Transaction, args: AddMembersArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::add_members`, arguments: [ obj(tx, args.multisig), pure(tx, args.addresses, `vector<address>`), pure(tx, args.weights, `vector<u64>`) ], }) }

export function approvalWeight( tx: Transaction, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::approval_weight`, arguments: [ obj(tx, proposal) ], }) }

export interface ApproveProposalArgs { multisig: TransactionObjectInput; key: string | TransactionArgument }

export function approveProposal( tx: Transaction, args: ApproveProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::approve_proposal`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`) ], }) }

export function approved( tx: Transaction, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::approved`, arguments: [ obj(tx, proposal) ], }) }

export function assertIsMember( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::assert_is_member`, arguments: [ obj(tx, multisig) ], }) }

export interface AssertMultisigExecutedArgs { multisig: TransactionObjectInput; executable: TransactionObjectInput }

export function assertMultisigExecuted( tx: Transaction, args: AssertMultisigExecutedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::assert_multisig_executed`, arguments: [ obj(tx, args.multisig), obj(tx, args.executable) ], }) }

export function assertVersion( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::assert_version`, arguments: [ obj(tx, multisig) ], }) }

export interface CreateProposalArgs { multisig: TransactionObjectInput; witness: GenericArg; key: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument }

export function createProposal( tx: Transaction, typeArg: string, args: CreateProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::create_proposal`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), generic(tx, `${typeArg}`, args.witness), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.description, `${String.$typeName}`) ], }) }

export function executionTime( tx: Transaction, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::execution_time`, arguments: [ obj(tx, proposal) ], }) }

export function expirationEpoch( tx: Transaction, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::expiration_epoch`, arguments: [ obj(tx, proposal) ], }) }

export interface DeleteProposalArgs { multisig: TransactionObjectInput; key: string | TransactionArgument }

export function deleteProposal( tx: Transaction, args: DeleteProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::delete_proposal`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`) ], }) }

export interface DestroyExecutableArgs { executable: TransactionObjectInput; witness: GenericArg }

export function destroyExecutable( tx: Transaction, typeArg: string, args: DestroyExecutableArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::destroy_executable`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }

export function executableModuleWitness( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::executable_module_witness`, arguments: [ obj(tx, executable) ], }) }

export function executableMultisigAddr( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::executable_multisig_addr`, arguments: [ obj(tx, executable) ], }) }

export interface ExecuteProposalArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; clock: TransactionObjectInput }

export function executeProposal( tx: Transaction, args: ExecuteProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::execute_proposal`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), obj(tx, args.clock) ], }) }

export interface IsMemberArgs { multisig: TransactionObjectInput; addr: string | TransactionArgument }

export function isMember( tx: Transaction, args: IsMemberArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::is_member`, arguments: [ obj(tx, args.multisig), pure(tx, args.addr, `address`) ], }) }

export interface MemberAccountIdArgs { multisig: TransactionObjectInput; addr: string | TransactionArgument }

export function memberAccountId( tx: Transaction, args: MemberAccountIdArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::member_account_id`, arguments: [ obj(tx, args.multisig), pure(tx, args.addr, `address`) ], }) }

export function memberAddresses( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::member_addresses`, arguments: [ obj(tx, multisig) ], }) }

export interface MemberWeightArgs { multisig: TransactionObjectInput; addr: string | TransactionArgument }

export function memberWeight( tx: Transaction, args: MemberWeightArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::member_weight`, arguments: [ obj(tx, args.multisig), pure(tx, args.addr, `address`) ], }) }

export function proposalActionsLength( tx: Transaction, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::proposal_actions_length`, arguments: [ obj(tx, proposal) ], }) }

export function proposalModuleWitness( tx: Transaction, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::proposal_module_witness`, arguments: [ obj(tx, proposal) ], }) }

export function proposalsLength( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::proposals_length`, arguments: [ obj(tx, multisig) ], }) }

export interface RegisterAccountIdArgs { multisig: TransactionObjectInput; id: string | TransactionArgument }

export function registerAccountId( tx: Transaction, args: RegisterAccountIdArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::register_account_id`, arguments: [ obj(tx, args.multisig), pure(tx, args.id, `${ID.$typeName}`) ], }) }

export interface RemoveActionArgs { executable: TransactionObjectInput; witness: GenericArg }

export function removeAction( tx: Transaction, typeArgs: [string, string], args: RemoveActionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::remove_action`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), generic(tx, `${typeArgs[0]}`, args.witness) ], }) }

export interface RemoveApprovalArgs { multisig: TransactionObjectInput; key: string | TransactionArgument }

export function removeApproval( tx: Transaction, args: RemoveApprovalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::remove_approval`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`) ], }) }

export interface RemoveMembersArgs { multisig: TransactionObjectInput; addresses: Array<string | TransactionArgument> | TransactionArgument }

export function removeMembers( tx: Transaction, args: RemoveMembersArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::remove_members`, arguments: [ obj(tx, args.multisig), pure(tx, args.addresses, `vector<address>`) ], }) }

export interface SetNameArgs { multisig: TransactionObjectInput; name: string | TransactionArgument }

export function setName( tx: Transaction, args: SetNameArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::set_name`, arguments: [ obj(tx, args.multisig), pure(tx, args.name, `${String.$typeName}`) ], }) }

export interface SetThresholdArgs { multisig: TransactionObjectInput; threshold: bigint | TransactionArgument }

export function setThreshold( tx: Transaction, args: SetThresholdArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::set_threshold`, arguments: [ obj(tx, args.multisig), pure(tx, args.threshold, `u64`) ], }) }

export function threshold( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::threshold`, arguments: [ obj(tx, multisig) ], }) }

export interface SetVersionArgs { multisig: TransactionObjectInput; version: bigint | TransactionArgument }

export function setVersion( tx: Transaction, args: SetVersionArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::set_version`, arguments: [ obj(tx, args.multisig), pure(tx, args.version, `u64`) ], }) }

export function share( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::share`, arguments: [ obj(tx, multisig) ], }) }

export function totalWeight( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::total_weight`, arguments: [ obj(tx, multisig) ], }) }

export function unregisterAccountId( tx: Transaction, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::multisig::unregister_account_id`, arguments: [ obj(tx, multisig) ], }) }
