import {PUBLISHED_AT} from "..";
import {GenericArg, ObjectArg, generic, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export interface NewArgs { name: string | TransactionArgument; accountId: string | TransactionArgument }

export function new_( txb: TransactionBlock, args: NewArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::new`, arguments: [ pure(txb, args.name, `0x1::string::String`), pure(txb, args.accountId, `0x2::object::ID`) ], }) }

export function name( txb: TransactionBlock, multisig: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::name`, arguments: [ obj(txb, multisig) ], }) }

export function version( txb: TransactionBlock, multisig: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::version`, arguments: [ obj(txb, multisig) ], }) }

export function addr( txb: TransactionBlock, multisig: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::addr`, arguments: [ obj(txb, multisig) ], }) }

export function description( txb: TransactionBlock, proposal: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::description`, arguments: [ obj(txb, proposal) ], }) }

export function uidMut( txb: TransactionBlock, multisig: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::uid_mut`, arguments: [ obj(txb, multisig) ], }) }

export interface ActionMutArgs { executable: ObjectArg; witness: GenericArg; idx: bigint | TransactionArgument }

export function actionMut( txb: TransactionBlock, typeArgs: [string, string], args: ActionMutArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::action_mut`, typeArguments: typeArgs, arguments: [ obj(txb, args.executable), generic(txb, `${typeArgs[0]}`, args.witness), pure(txb, args.idx, `u64`) ], }) }

export interface AddActionArgs { proposal: ObjectArg; action: GenericArg }

export function addAction( txb: TransactionBlock, typeArg: string, args: AddActionArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::add_action`, typeArguments: [typeArg], arguments: [ obj(txb, args.proposal), generic(txb, `${typeArg}`, args.action) ], }) }

export interface ProposalArgs { multisig: ObjectArg; key: string | TransactionArgument }

export function proposal( txb: TransactionBlock, args: ProposalArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::proposal`, arguments: [ obj(txb, args.multisig), pure(txb, args.key, `0x1::string::String`) ], }) }

export interface AddMembersArgs { multisig: ObjectArg; addresses: Array<string | TransactionArgument> | TransactionArgument; weights: Array<bigint | TransactionArgument> | TransactionArgument }

export function addMembers( txb: TransactionBlock, args: AddMembersArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::add_members`, arguments: [ obj(txb, args.multisig), pure(txb, args.addresses, `vector<address>`), pure(txb, args.weights, `vector<u64>`) ], }) }

export function approvalWeight( txb: TransactionBlock, proposal: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::approval_weight`, arguments: [ obj(txb, proposal) ], }) }

export interface ApproveProposalArgs { multisig: ObjectArg; key: string | TransactionArgument }

export function approveProposal( txb: TransactionBlock, args: ApproveProposalArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::approve_proposal`, arguments: [ obj(txb, args.multisig), pure(txb, args.key, `0x1::string::String`) ], }) }

export function approved( txb: TransactionBlock, proposal: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::approved`, arguments: [ obj(txb, proposal) ], }) }

export function assertIsMember( txb: TransactionBlock, multisig: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::assert_is_member`, arguments: [ obj(txb, multisig) ], }) }

export interface AssertMultisigExecutedArgs { multisig: ObjectArg; executable: ObjectArg }

export function assertMultisigExecuted( txb: TransactionBlock, args: AssertMultisigExecutedArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::assert_multisig_executed`, arguments: [ obj(txb, args.multisig), obj(txb, args.executable) ], }) }

export function assertVersion( txb: TransactionBlock, multisig: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::assert_version`, arguments: [ obj(txb, multisig) ], }) }

export interface CreateProposalArgs { multisig: ObjectArg; witness: GenericArg; key: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument }

export function createProposal( txb: TransactionBlock, typeArg: string, args: CreateProposalArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::create_proposal`, typeArguments: [typeArg], arguments: [ obj(txb, args.multisig), generic(txb, `${typeArg}`, args.witness), pure(txb, args.key, `0x1::string::String`), pure(txb, args.executionTime, `u64`), pure(txb, args.expirationEpoch, `u64`), pure(txb, args.description, `0x1::string::String`) ], }) }

export function executionTime( txb: TransactionBlock, proposal: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::execution_time`, arguments: [ obj(txb, proposal) ], }) }

export function expirationEpoch( txb: TransactionBlock, proposal: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::expiration_epoch`, arguments: [ obj(txb, proposal) ], }) }

export interface DeleteProposalArgs { multisig: ObjectArg; key: string | TransactionArgument }

export function deleteProposal( txb: TransactionBlock, args: DeleteProposalArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::delete_proposal`, arguments: [ obj(txb, args.multisig), pure(txb, args.key, `0x1::string::String`) ], }) }

export interface DestroyExecutableArgs { executable: ObjectArg; witness: GenericArg }

export function destroyExecutable( txb: TransactionBlock, typeArg: string, args: DestroyExecutableArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::destroy_executable`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), generic(txb, `${typeArg}`, args.witness) ], }) }

export function executableModuleWitness( txb: TransactionBlock, executable: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::executable_module_witness`, arguments: [ obj(txb, executable) ], }) }

export function executableMultisigAddr( txb: TransactionBlock, executable: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::executable_multisig_addr`, arguments: [ obj(txb, executable) ], }) }

export interface ExecuteProposalArgs { multisig: ObjectArg; key: string | TransactionArgument; clock: ObjectArg }

export function executeProposal( txb: TransactionBlock, args: ExecuteProposalArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::execute_proposal`, arguments: [ obj(txb, args.multisig), pure(txb, args.key, `0x1::string::String`), obj(txb, args.clock) ], }) }

export interface IsMemberArgs { multisig: ObjectArg; addr: string | TransactionArgument }

export function isMember( txb: TransactionBlock, args: IsMemberArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::is_member`, arguments: [ obj(txb, args.multisig), pure(txb, args.addr, `address`) ], }) }

export interface MemberAccountIdArgs { multisig: ObjectArg; addr: string | TransactionArgument }

export function memberAccountId( txb: TransactionBlock, args: MemberAccountIdArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::member_account_id`, arguments: [ obj(txb, args.multisig), pure(txb, args.addr, `address`) ], }) }

export function memberAddresses( txb: TransactionBlock, multisig: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::member_addresses`, arguments: [ obj(txb, multisig) ], }) }

export interface MemberWeightArgs { multisig: ObjectArg; addr: string | TransactionArgument }

export function memberWeight( txb: TransactionBlock, args: MemberWeightArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::member_weight`, arguments: [ obj(txb, args.multisig), pure(txb, args.addr, `address`) ], }) }

export function proposalActionsLength( txb: TransactionBlock, proposal: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::proposal_actions_length`, arguments: [ obj(txb, proposal) ], }) }

export function proposalModuleWitness( txb: TransactionBlock, proposal: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::proposal_module_witness`, arguments: [ obj(txb, proposal) ], }) }

export function proposalsLength( txb: TransactionBlock, multisig: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::proposals_length`, arguments: [ obj(txb, multisig) ], }) }

export interface RegisterAccountIdArgs { multisig: ObjectArg; id: string | TransactionArgument }

export function registerAccountId( txb: TransactionBlock, args: RegisterAccountIdArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::register_account_id`, arguments: [ obj(txb, args.multisig), pure(txb, args.id, `0x2::object::ID`) ], }) }

export interface RemoveActionArgs { executable: ObjectArg; witness: GenericArg }

export function removeAction( txb: TransactionBlock, typeArgs: [string, string], args: RemoveActionArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::remove_action`, typeArguments: typeArgs, arguments: [ obj(txb, args.executable), generic(txb, `${typeArgs[0]}`, args.witness) ], }) }

export interface RemoveApprovalArgs { multisig: ObjectArg; key: string | TransactionArgument }

export function removeApproval( txb: TransactionBlock, args: RemoveApprovalArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::remove_approval`, arguments: [ obj(txb, args.multisig), pure(txb, args.key, `0x1::string::String`) ], }) }

export interface RemoveMembersArgs { multisig: ObjectArg; addresses: Array<string | TransactionArgument> | TransactionArgument }

export function removeMembers( txb: TransactionBlock, args: RemoveMembersArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::remove_members`, arguments: [ obj(txb, args.multisig), pure(txb, args.addresses, `vector<address>`) ], }) }

export interface SetNameArgs { multisig: ObjectArg; name: string | TransactionArgument }

export function setName( txb: TransactionBlock, args: SetNameArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::set_name`, arguments: [ obj(txb, args.multisig), pure(txb, args.name, `0x1::string::String`) ], }) }

export interface SetThresholdArgs { multisig: ObjectArg; threshold: bigint | TransactionArgument }

export function setThreshold( txb: TransactionBlock, args: SetThresholdArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::set_threshold`, arguments: [ obj(txb, args.multisig), pure(txb, args.threshold, `u64`) ], }) }

export function threshold( txb: TransactionBlock, multisig: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::threshold`, arguments: [ obj(txb, multisig) ], }) }

export interface SetVersionArgs { multisig: ObjectArg; version: bigint | TransactionArgument }

export function setVersion( txb: TransactionBlock, args: SetVersionArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::set_version`, arguments: [ obj(txb, args.multisig), pure(txb, args.version, `u64`) ], }) }

export function share( txb: TransactionBlock, multisig: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::share`, arguments: [ obj(txb, multisig) ], }) }

export function totalWeight( txb: TransactionBlock, multisig: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::total_weight`, arguments: [ obj(txb, multisig) ], }) }

export function unregisterAccountId( txb: TransactionBlock, multisig: ObjectArg ) { return txb.moveCall({ target: `${PUBLISHED_AT}::multisig::unregister_account_id`, arguments: [ obj(txb, multisig) ], }) }
