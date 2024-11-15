import {PUBLISHED_AT} from "..";
import {String as String1} from "../../_dependencies/source/0x1/ascii/structs";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function supply( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::supply`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }

export function hasLock( tx: Transaction, typeArgs: [string, string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::has_lock`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export interface LockCapArgs { auth: TransactionObjectInput; account: TransactionObjectInput; treasuryCap: TransactionObjectInput; maxSupply: (bigint | TransactionArgument | TransactionArgument | null) }

export function lockCap( tx: Transaction, typeArgs: [string, string, string], args: LockCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::lock_cap`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), obj(tx, args.treasuryCap), pure(tx, args.maxSupply, `${Option.$typeName}<u64>`) ], }) }

export function typeToName( tx: Transaction, typeArg: string, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::type_to_name`, typeArguments: [typeArg], arguments: [ ], }) }

export function borrowLock( tx: Transaction, typeArgs: [string, string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::borrow_lock`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export function completeTransfer( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::complete_transfer`, arguments: [ obj(tx, executable) ], }) }

export interface ExecuteTransferArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function executeTransfer( tx: Transaction, typeArgs: [string, string, string], args: ExecuteTransferArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::execute_transfer`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export interface ExecuteVestingArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function executeVesting( tx: Transaction, typeArgs: [string, string, string], args: ExecuteVestingArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::execute_vesting`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export interface ProposeTransferArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; amounts: Array<bigint | TransactionArgument> | TransactionArgument; recipients: Array<string | TransactionArgument> | TransactionArgument }

export function proposeTransfer( tx: Transaction, typeArgs: [string, string, string], args: ProposeTransferArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::propose_transfer`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.amounts, `vector<u64>`), pure(tx, args.recipients, `vector<address>`) ], }) }

export interface ProposeVestingArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; totalAmount: bigint | TransactionArgument; startTimestamp: bigint | TransactionArgument; endTimestamp: bigint | TransactionArgument; recipient: string | TransactionArgument }

export function proposeVesting( tx: Transaction, typeArgs: [string, string, string], args: ProposeVestingArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::propose_vesting`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.totalAmount, `u64`), pure(tx, args.startTimestamp, `u64`), pure(tx, args.endTimestamp, `u64`), pure(tx, args.recipient, `address`) ], }) }

export function canBurn( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::can_burn`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }

export function canMint( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::can_mint`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }

export function canUpdateDescription( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::can_update_description`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }

export function canUpdateIcon( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::can_update_icon`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }

export function canUpdateName( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::can_update_name`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }

export function canUpdateSymbol( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::can_update_symbol`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }

export function deleteBurnAction( tx: Transaction, typeArgs: [string, string], expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::delete_burn_action`, typeArguments: typeArgs, arguments: [ obj(tx, expired) ], }) }

export function deleteDisableAction( tx: Transaction, typeArgs: [string, string], expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::delete_disable_action`, typeArguments: typeArgs, arguments: [ obj(tx, expired) ], }) }

export function deleteMintAction( tx: Transaction, typeArgs: [string, string], expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::delete_mint_action`, typeArguments: typeArgs, arguments: [ obj(tx, expired) ], }) }

export function deleteUpdateAction( tx: Transaction, typeArgs: [string, string], expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::delete_update_action`, typeArguments: typeArgs, arguments: [ obj(tx, expired) ], }) }

export interface DoBurnArgs { executable: TransactionObjectInput; account: TransactionObjectInput; coin: TransactionObjectInput; version: TransactionObjectInput; witness: GenericArg }

export function doBurn( tx: Transaction, typeArgs: [string, string, string, string], args: DoBurnArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::do_burn`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.coin), obj(tx, args.version), generic(tx, `${typeArgs[3]}`, args.witness) ], }) }

export interface DoDisableArgs { executable: TransactionObjectInput; account: TransactionObjectInput; version: TransactionObjectInput; witness: GenericArg }

export function doDisable( tx: Transaction, typeArgs: [string, string, string, string], args: DoDisableArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::do_disable`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.version), generic(tx, `${typeArgs[3]}`, args.witness) ], }) }

export interface DoMintArgs { executable: TransactionObjectInput; account: TransactionObjectInput; version: TransactionObjectInput; witness: GenericArg }

export function doMint( tx: Transaction, typeArgs: [string, string, string, string], args: DoMintArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::do_mint`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.version), generic(tx, `${typeArgs[3]}`, args.witness) ], }) }

export interface DoUpdateArgs { executable: TransactionObjectInput; account: TransactionObjectInput; metadata: TransactionObjectInput; version: TransactionObjectInput; witness: GenericArg }

export function doUpdate( tx: Transaction, typeArgs: [string, string, string, string], args: DoUpdateArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::do_update`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.metadata), obj(tx, args.version), generic(tx, `${typeArgs[3]}`, args.witness) ], }) }

export interface ExecuteBurnArgs { executable: TransactionObjectInput; account: TransactionObjectInput; receiving: TransactionObjectInput }

export function executeBurn( tx: Transaction, typeArgs: [string, string, string], args: ExecuteBurnArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::execute_burn`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.receiving) ], }) }

export interface ExecuteDisableArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function executeDisable( tx: Transaction, typeArgs: [string, string, string], args: ExecuteDisableArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::execute_disable`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export interface ExecuteMintArgs { executable: TransactionObjectInput; account: TransactionObjectInput }

export function executeMint( tx: Transaction, typeArgs: [string, string, string], args: ExecuteMintArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::execute_mint`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account) ], }) }

export interface ExecuteUpdateArgs { executable: TransactionObjectInput; account: TransactionObjectInput; metadata: TransactionObjectInput }

export function executeUpdate( tx: Transaction, typeArgs: [string, string, string], args: ExecuteUpdateArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::execute_update`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.metadata) ], }) }

export interface NewBurnArgs { proposal: TransactionObjectInput; amount: bigint | TransactionArgument; witness: GenericArg }

export function newBurn( tx: Transaction, typeArgs: [string, string, string], args: NewBurnArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::new_burn`, typeArguments: typeArgs, arguments: [ obj(tx, args.proposal), pure(tx, args.amount, `u64`), generic(tx, `${typeArgs[2]}`, args.witness) ], }) }

export interface NewDisableArgs { proposal: TransactionObjectInput; mint: boolean | TransactionArgument; burn: boolean | TransactionArgument; updateSymbol: boolean | TransactionArgument; updateName: boolean | TransactionArgument; updateDescription: boolean | TransactionArgument; updateIcon: boolean | TransactionArgument; witness: GenericArg }

export function newDisable( tx: Transaction, typeArgs: [string, string, string], args: NewDisableArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::new_disable`, typeArguments: typeArgs, arguments: [ obj(tx, args.proposal), pure(tx, args.mint, `bool`), pure(tx, args.burn, `bool`), pure(tx, args.updateSymbol, `bool`), pure(tx, args.updateName, `bool`), pure(tx, args.updateDescription, `bool`), pure(tx, args.updateIcon, `bool`), generic(tx, `${typeArgs[2]}`, args.witness) ], }) }

export interface NewMintArgs { proposal: TransactionObjectInput; amount: bigint | TransactionArgument; witness: GenericArg }

export function newMint( tx: Transaction, typeArgs: [string, string, string], args: NewMintArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::new_mint`, typeArguments: typeArgs, arguments: [ obj(tx, args.proposal), pure(tx, args.amount, `u64`), generic(tx, `${typeArgs[2]}`, args.witness) ], }) }

export interface NewUpdateArgs { proposal: TransactionObjectInput; symbol: (string | TransactionArgument | TransactionArgument | null); name: (string | TransactionArgument | TransactionArgument | null); description: (string | TransactionArgument | TransactionArgument | null); iconUrl: (string | TransactionArgument | TransactionArgument | null); witness: GenericArg }

export function newUpdate( tx: Transaction, typeArgs: [string, string, string], args: NewUpdateArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::new_update`, typeArguments: typeArgs, arguments: [ obj(tx, args.proposal), pure(tx, args.symbol, `${Option.$typeName}<${String1.$typeName}>`), pure(tx, args.name, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.description, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.iconUrl, `${Option.$typeName}<${String1.$typeName}>`), generic(tx, `${typeArgs[2]}`, args.witness) ], }) }

export interface ProposeBurnArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; coinId: string | TransactionArgument; amount: bigint | TransactionArgument }

export function proposeBurn( tx: Transaction, typeArgs: [string, string, string], args: ProposeBurnArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::propose_burn`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.coinId, `${ID.$typeName}`), pure(tx, args.amount, `u64`) ], }) }

export interface ProposeDisableArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; disableMint: boolean | TransactionArgument; disableBurn: boolean | TransactionArgument; disableUpdateSymbol: boolean | TransactionArgument; disableUpdateName: boolean | TransactionArgument; disableUpdateDescription: boolean | TransactionArgument; disableUpdateIcon: boolean | TransactionArgument }

export function proposeDisable( tx: Transaction, typeArgs: [string, string, string], args: ProposeDisableArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::propose_disable`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.disableMint, `bool`), pure(tx, args.disableBurn, `bool`), pure(tx, args.disableUpdateSymbol, `bool`), pure(tx, args.disableUpdateName, `bool`), pure(tx, args.disableUpdateDescription, `bool`), pure(tx, args.disableUpdateIcon, `bool`) ], }) }

export interface ProposeMintArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; amount: bigint | TransactionArgument }

export function proposeMint( tx: Transaction, typeArgs: [string, string, string], args: ProposeMintArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::propose_mint`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.amount, `u64`) ], }) }

export interface ProposeUpdateArgs { auth: TransactionObjectInput; account: TransactionObjectInput; outcome: GenericArg; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; mdSymbol: (string | TransactionArgument | TransactionArgument | null); mdName: (string | TransactionArgument | TransactionArgument | null); mdDescription: (string | TransactionArgument | TransactionArgument | null); mdIcon: (string | TransactionArgument | TransactionArgument | null) }

export function proposeUpdate( tx: Transaction, typeArgs: [string, string, string], args: ProposeUpdateArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::propose_update`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), generic(tx, `${typeArgs[1]}`, args.outcome), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.mdSymbol, `${Option.$typeName}<${String1.$typeName}>`), pure(tx, args.mdName, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.mdDescription, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.mdIcon, `${Option.$typeName}<${String1.$typeName}>`) ], }) }

export interface PublicBurnArgs { account: TransactionObjectInput; coin: TransactionObjectInput }

export function publicBurn( tx: Transaction, typeArgs: [string, string, string], args: PublicBurnArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::public_burn`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.coin) ], }) }

export function totalBurnt( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::total_burnt`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }

export function totalMinted( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::total_minted`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }
