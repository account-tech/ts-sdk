import {PUBLISHED_AT} from "..";
import {GenericArg, ObjectArg, generic, obj, pure} from "../../_framework/util";
import {TransactionArgument, TransactionBlock} from "@mysten/sui.js/transactions";

export interface DestroyMigrateArgs { executable: ObjectArg; witness: GenericArg }

export function destroyMigrate( txb: TransactionBlock, typeArg: string, args: DestroyMigrateArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::config::destroy_migrate`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), generic(txb, `${typeArg}`, args.witness) ], }) }

export interface DestroyModifyArgs { executable: ObjectArg; witness: GenericArg }

export function destroyModify( txb: TransactionBlock, typeArg: string, args: DestroyModifyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::config::destroy_modify`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), generic(txb, `${typeArg}`, args.witness) ], }) }

export interface ExecuteMigrateArgs { executable: ObjectArg; multisig: ObjectArg }

export function executeMigrate( txb: TransactionBlock, args: ExecuteMigrateArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::config::execute_migrate`, arguments: [ obj(txb, args.executable), obj(txb, args.multisig) ], }) }

export interface ExecuteModifyArgs { executable: ObjectArg; multisig: ObjectArg }

export function executeModify( txb: TransactionBlock, args: ExecuteModifyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::config::execute_modify`, arguments: [ obj(txb, args.executable), obj(txb, args.multisig) ], }) }

export interface MigrateArgs { executable: ObjectArg; multisig: ObjectArg; witness: GenericArg; idx: bigint | TransactionArgument }

export function migrate( txb: TransactionBlock, typeArg: string, args: MigrateArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::config::migrate`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), obj(txb, args.multisig), generic(txb, `${typeArg}`, args.witness), pure(txb, args.idx, `u64`) ], }) }

export interface ModifyArgs { executable: ObjectArg; multisig: ObjectArg; witness: GenericArg; idx: bigint | TransactionArgument }

export function modify( txb: TransactionBlock, typeArg: string, args: ModifyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::config::modify`, typeArguments: [typeArg], arguments: [ obj(txb, args.executable), obj(txb, args.multisig), generic(txb, `${typeArg}`, args.witness), pure(txb, args.idx, `u64`) ], }) }

export interface NewMigrateArgs { proposal: ObjectArg; version: bigint | TransactionArgument }

export function newMigrate( txb: TransactionBlock, args: NewMigrateArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::config::new_migrate`, arguments: [ obj(txb, args.proposal), pure(txb, args.version, `u64`) ], }) }

export interface NewModifyArgs { proposal: ObjectArg; name: (string | TransactionArgument | TransactionArgument | null); threshold: (bigint | TransactionArgument | TransactionArgument | null); toRemove: Array<string | TransactionArgument> | TransactionArgument; toAdd: Array<string | TransactionArgument> | TransactionArgument; weights: Array<bigint | TransactionArgument> | TransactionArgument }

export function newModify( txb: TransactionBlock, args: NewModifyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::config::new_modify`, arguments: [ obj(txb, args.proposal), pure(txb, args.name, `0x1::option::Option<0x1::string::String>`), pure(txb, args.threshold, `0x1::option::Option<u64>`), pure(txb, args.toRemove, `vector<address>`), pure(txb, args.toAdd, `vector<address>`), pure(txb, args.weights, `vector<u64>`) ], }) }

export interface ProposeMigrateArgs { multisig: ObjectArg; key: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument; version: bigint | TransactionArgument }

export function proposeMigrate( txb: TransactionBlock, args: ProposeMigrateArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::config::propose_migrate`, arguments: [ obj(txb, args.multisig), pure(txb, args.key, `0x1::string::String`), pure(txb, args.executionTime, `u64`), pure(txb, args.expirationEpoch, `u64`), pure(txb, args.description, `0x1::string::String`), pure(txb, args.version, `u64`) ], }) }

export interface ProposeModifyArgs { multisig: ObjectArg; key: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; description: string | TransactionArgument; name: (string | TransactionArgument | TransactionArgument | null); threshold: (bigint | TransactionArgument | TransactionArgument | null); toRemove: Array<string | TransactionArgument> | TransactionArgument; toAdd: Array<string | TransactionArgument> | TransactionArgument; weights: Array<bigint | TransactionArgument> | TransactionArgument }

export function proposeModify( txb: TransactionBlock, args: ProposeModifyArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::config::propose_modify`, arguments: [ obj(txb, args.multisig), pure(txb, args.key, `0x1::string::String`), pure(txb, args.executionTime, `u64`), pure(txb, args.expirationEpoch, `u64`), pure(txb, args.description, `0x1::string::String`), pure(txb, args.name, `0x1::option::Option<0x1::string::String>`), pure(txb, args.threshold, `0x1::option::Option<u64>`), pure(txb, args.toRemove, `vector<address>`), pure(txb, args.toAdd, `vector<address>`), pure(txb, args.weights, `vector<u64>`) ], }) }

export interface VerifyNewConfigArgs { multisig: ObjectArg; threshold: (bigint | TransactionArgument | TransactionArgument | null); toRemove: Array<string | TransactionArgument> | TransactionArgument; toAdd: Array<string | TransactionArgument> | TransactionArgument; weights: Array<bigint | TransactionArgument> | TransactionArgument }

export function verifyNewConfig( txb: TransactionBlock, args: VerifyNewConfigArgs ) { return txb.moveCall({ target: `${PUBLISHED_AT}::config::verify_new_config`, arguments: [ obj(txb, args.multisig), pure(txb, args.threshold, `0x1::option::Option<u64>`), pure(txb, args.toRemove, `vector<address>`), pure(txb, args.toAdd, `vector<address>`), pure(txb, args.weights, `vector<u64>`) ], }) }
