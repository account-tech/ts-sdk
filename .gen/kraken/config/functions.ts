import {PUBLISHED_AT} from "..";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface DestroyMigrateArgs { executable: TransactionObjectInput; witness: GenericArg }

export function destroyMigrate( tx: Transaction, typeArg: string, args: DestroyMigrateArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::destroy_migrate`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface DestroyModifyArgs { executable: TransactionObjectInput; witness: GenericArg }

export function destroyModify( tx: Transaction, typeArg: string, args: DestroyModifyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::destroy_modify`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), generic(tx, `${typeArg}`, args.witness) ], }) }

export interface ExecuteMigrateArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput }

export function executeMigrate( tx: Transaction, args: ExecuteMigrateArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::execute_migrate`, arguments: [ obj(tx, args.executable), obj(tx, args.multisig) ], }) }

export interface ExecuteModifyArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput }

export function executeModify( tx: Transaction, args: ExecuteModifyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::execute_modify`, arguments: [ obj(tx, args.executable), obj(tx, args.multisig) ], }) }

export interface MigrateArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; witness: GenericArg; idx: bigint | TransactionArgument }

export function migrate( tx: Transaction, typeArg: string, args: MigrateArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::migrate`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), generic(tx, `${typeArg}`, args.witness), pure(tx, args.idx, `u64`) ], }) }

export interface ModifyArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; witness: GenericArg; idx: bigint | TransactionArgument }

export function modify( tx: Transaction, typeArg: string, args: ModifyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::modify`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), generic(tx, `${typeArg}`, args.witness), pure(tx, args.idx, `u64`) ], }) }

export interface NewMigrateArgs { proposal: TransactionObjectInput; version: bigint | TransactionArgument }

export function newMigrate( tx: Transaction, args: NewMigrateArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::new_migrate`, arguments: [ obj(tx, args.proposal), pure(tx, args.version, `u64`) ], }) }

export interface NewModifyArgs { proposal: TransactionObjectInput; name: (string | TransactionArgument | TransactionArgument | null); threshold: (bigint | TransactionArgument | TransactionArgument | null); toRemove: Array<string | TransactionArgument> | TransactionArgument; toAdd: Array<string | TransactionArgument> | TransactionArgument; weights: Array<bigint | TransactionArgument> | TransactionArgument }

export function newModify( tx: Transaction, args: NewModifyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::new_modify`, arguments: [ obj(tx, args.proposal), pure(tx, args.name, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.threshold, `${Option.$typeName}<u64>`), pure(tx, args.toRemove, `vector<address>`), pure(tx, args.toAdd, `vector<address>`), pure(tx, args.weights, `vector<u64>`) ], }) }

export interface ProposeMigrateArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument; version: bigint | TransactionArgument }

export function proposeMigrate( tx: Transaction, args: ProposeMigrateArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::propose_migrate`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.version, `u64`) ], }) }

export interface ProposeModifyArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument; name: (string | TransactionArgument | TransactionArgument | null); threshold: (bigint | TransactionArgument | TransactionArgument | null); toRemove: Array<string | TransactionArgument> | TransactionArgument; toAdd: Array<string | TransactionArgument> | TransactionArgument; weights: Array<bigint | TransactionArgument> | TransactionArgument }

export function proposeModify( tx: Transaction, args: ProposeModifyArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::propose_modify`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.name, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.threshold, `${Option.$typeName}<u64>`), pure(tx, args.toRemove, `vector<address>`), pure(tx, args.toAdd, `vector<address>`), pure(tx, args.weights, `vector<u64>`) ], }) }

export interface VerifyNewConfigArgs { multisig: TransactionObjectInput; threshold: (bigint | TransactionArgument | TransactionArgument | null); toRemove: Array<string | TransactionArgument> | TransactionArgument; toAdd: Array<string | TransactionArgument> | TransactionArgument; weights: Array<bigint | TransactionArgument> | TransactionArgument }

export function verifyNewConfig( tx: Transaction, args: VerifyNewConfigArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::config::verify_new_config`, arguments: [ obj(tx, args.multisig), pure(tx, args.threshold, `${Option.$typeName}<u64>`), pure(tx, args.toRemove, `vector<address>`), pure(tx, args.toAdd, `vector<address>`), pure(tx, args.weights, `vector<u64>`) ], }) }
