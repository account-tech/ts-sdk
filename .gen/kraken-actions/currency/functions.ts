import {PUBLISHED_AT} from "..";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function supply( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::supply`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }

export interface UpdateArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; metadata: TransactionObjectInput; issuer: GenericArg }

export function update( tx: Transaction, typeArgs: [string, string], args: UpdateArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::update`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.metadata), generic(tx, `${typeArgs[1]}`, args.issuer) ], }) }

export interface BurnArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; coin: TransactionObjectInput; issuer: GenericArg }

export function burn( tx: Transaction, typeArgs: [string, string], args: BurnArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::burn`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.coin), generic(tx, `${typeArgs[1]}`, args.issuer) ], }) }

export interface MintArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; issuer: GenericArg }

export function mint( tx: Transaction, typeArgs: [string, string], args: MintArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::mint`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.multisig), generic(tx, `${typeArgs[1]}`, args.issuer) ], }) }

export function borrowLock( tx: Transaction, typeArg: string, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::borrow_lock`, typeArguments: [typeArg], arguments: [ obj(tx, multisig) ], }) }

export function borrowLockMut( tx: Transaction, typeArg: string, multisig: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::borrow_lock_mut`, typeArguments: [typeArg], arguments: [ obj(tx, multisig) ], }) }

export function completeUpdate( tx: Transaction, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::complete_update`, arguments: [ obj(tx, executable) ], }) }

export interface DestroyBurnArgs { executable: TransactionObjectInput; issuer: GenericArg }

export function destroyBurn( tx: Transaction, typeArgs: [string, string], args: DestroyBurnArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::destroy_burn`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), generic(tx, `${typeArgs[1]}`, args.issuer) ], }) }

export interface DestroyMintArgs { executable: TransactionObjectInput; issuer: GenericArg }

export function destroyMint( tx: Transaction, typeArgs: [string, string], args: DestroyMintArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::destroy_mint`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), generic(tx, `${typeArgs[1]}`, args.issuer) ], }) }

export interface DestroyUpdateArgs { executable: TransactionObjectInput; issuer: GenericArg }

export function destroyUpdate( tx: Transaction, typeArg: string, args: DestroyUpdateArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::destroy_update`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.issuer) ], }) }

export interface ExecuteBurnArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; receiving: TransactionObjectInput }

export function executeBurn( tx: Transaction, typeArg: string, args: ExecuteBurnArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::execute_burn`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.receiving) ], }) }

export interface ExecuteMintArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput }

export function executeMint( tx: Transaction, typeArg: string, args: ExecuteMintArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::execute_mint`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig) ], }) }

export interface ExecuteUpdateArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; metadata: TransactionObjectInput }

export function executeUpdate( tx: Transaction, typeArg: string, args: ExecuteUpdateArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::execute_update`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.metadata) ], }) }

export interface LockCapArgs { multisig: TransactionObjectInput; treasuryCap: TransactionObjectInput }

export function lockCap( tx: Transaction, typeArg: string, args: LockCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::lock_cap`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), obj(tx, args.treasuryCap) ], }) }

export function mintIsExecuted( tx: Transaction, typeArg: string, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::mint_is_executed`, typeArguments: [typeArg], arguments: [ obj(tx, executable) ], }) }

export interface NewBurnArgs { proposal: TransactionObjectInput; amount: bigint | TransactionArgument }

export function newBurn( tx: Transaction, typeArg: string, args: NewBurnArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::new_burn`, typeArguments: [typeArg], arguments: [ obj(tx, args.proposal), pure(tx, args.amount, `u64`) ], }) }

export interface NewMintArgs { proposal: TransactionObjectInput; amount: bigint | TransactionArgument }

export function newMint( tx: Transaction, typeArg: string, args: NewMintArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::new_mint`, typeArguments: [typeArg], arguments: [ obj(tx, args.proposal), pure(tx, args.amount, `u64`) ], }) }

export interface NewUpdateArgs { proposal: TransactionObjectInput; name: (string | TransactionArgument | TransactionArgument | null); symbol: (string | TransactionArgument | TransactionArgument | null); description: (string | TransactionArgument | TransactionArgument | null); iconUrl: (string | TransactionArgument | TransactionArgument | null) }

export function newUpdate( tx: Transaction, typeArg: string, args: NewUpdateArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::new_update`, typeArguments: [typeArg], arguments: [ obj(tx, args.proposal), pure(tx, args.name, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.symbol, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.description, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.iconUrl, `${Option.$typeName}<${String.$typeName}>`) ], }) }

export interface ProposeBurnArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; coinId: string | TransactionArgument; amount: bigint | TransactionArgument }

export function proposeBurn( tx: Transaction, typeArg: string, args: ProposeBurnArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::propose_burn`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.coinId, `${ID.$typeName}`), pure(tx, args.amount, `u64`) ], }) }

export interface ProposeMintArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; amount: bigint | TransactionArgument }

export function proposeMint( tx: Transaction, typeArg: string, args: ProposeMintArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::propose_mint`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.amount, `u64`) ], }) }

export interface ProposeUpdateArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; mdName: (string | TransactionArgument | TransactionArgument | null); mdSymbol: (string | TransactionArgument | TransactionArgument | null); mdDescription: (string | TransactionArgument | TransactionArgument | null); mdIcon: (string | TransactionArgument | TransactionArgument | null) }

export function proposeUpdate( tx: Transaction, typeArg: string, args: ProposeUpdateArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::propose_update`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.mdName, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.mdSymbol, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.mdDescription, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.mdIcon, `${Option.$typeName}<${String.$typeName}>`) ], }) }

export function typeToName( tx: Transaction, typeArg: string, ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::type_to_name`, typeArguments: [typeArg], arguments: [ ], }) }
