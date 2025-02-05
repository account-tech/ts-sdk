import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/ascii/structs";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String as String1} from "../../_dependencies/source/0x1/string/structs";
import {GenericArg, generic, obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface LockCapArgs { auth: TransactionObjectInput; account: TransactionObjectInput; treasuryCap: TransactionObjectInput; maxSupply: (bigint | TransactionArgument | TransactionArgument | null) }

export function lockCap( tx: Transaction, typeArgs: [string, string, string], args: LockCapArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::lock_cap`, typeArguments: typeArgs, arguments: [ obj(tx, args.auth), obj(tx, args.account), obj(tx, args.treasuryCap), pure(tx, args.maxSupply, `${Option.$typeName}<u64>`) ], }) }

export function borrowRules( tx: Transaction, typeArgs: [string, string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::borrow_rules`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export function canBurn( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::can_burn`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }

export function canMint( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::can_mint`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }

export function canUpdateDescription( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::can_update_description`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }

export function canUpdateIcon( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::can_update_icon`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }

export function canUpdateName( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::can_update_name`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }

export function canUpdateSymbol( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::can_update_symbol`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }

export function coinTypeSupply( tx: Transaction, typeArgs: [string, string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::coin_type_supply`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export function deleteBurn( tx: Transaction, typeArg: string, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::delete_burn`, typeArguments: [typeArg], arguments: [ obj(tx, expired) ], }) }

export function deleteDisable( tx: Transaction, typeArg: string, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::delete_disable`, typeArguments: [typeArg], arguments: [ obj(tx, expired) ], }) }

export function deleteMint( tx: Transaction, typeArg: string, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::delete_mint`, typeArguments: [typeArg], arguments: [ obj(tx, expired) ], }) }

export function deleteUpdate( tx: Transaction, typeArg: string, expired: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::delete_update`, typeArguments: [typeArg], arguments: [ obj(tx, expired) ], }) }

export interface DoBurnArgs { executable: TransactionObjectInput; account: TransactionObjectInput; coin: TransactionObjectInput; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function doBurn( tx: Transaction, typeArgs: [string, string, string, string], args: DoBurnArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::do_burn`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.coin), obj(tx, args.versionWitness), generic(tx, `${typeArgs[3]}`, args.intentWitness) ], }) }

export interface DoDisableArgs { executable: TransactionObjectInput; account: TransactionObjectInput; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function doDisable( tx: Transaction, typeArgs: [string, string, string, string], args: DoDisableArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::do_disable`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.versionWitness), generic(tx, `${typeArgs[3]}`, args.intentWitness) ], }) }

export interface DoMintArgs { executable: TransactionObjectInput; account: TransactionObjectInput; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function doMint( tx: Transaction, typeArgs: [string, string, string, string], args: DoMintArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::do_mint`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.versionWitness), generic(tx, `${typeArgs[3]}`, args.intentWitness) ], }) }

export interface DoUpdateArgs { executable: TransactionObjectInput; account: TransactionObjectInput; metadata: TransactionObjectInput; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function doUpdate( tx: Transaction, typeArgs: [string, string, string, string], args: DoUpdateArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::do_update`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.account), obj(tx, args.metadata), obj(tx, args.versionWitness), generic(tx, `${typeArgs[3]}`, args.intentWitness) ], }) }

export function hasCap( tx: Transaction, typeArgs: [string, string, string], account: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::has_cap`, typeArguments: typeArgs, arguments: [ obj(tx, account) ], }) }

export function maxSupply( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::max_supply`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }

export interface NewBurnArgs { intent: TransactionObjectInput; account: TransactionObjectInput; amount: bigint | TransactionArgument; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function newBurn( tx: Transaction, typeArgs: [string, string, string, string], args: NewBurnArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::new_burn`, typeArguments: typeArgs, arguments: [ obj(tx, args.intent), obj(tx, args.account), pure(tx, args.amount, `u64`), obj(tx, args.versionWitness), generic(tx, `${typeArgs[3]}`, args.intentWitness) ], }) }

export interface NewDisableArgs { intent: TransactionObjectInput; account: TransactionObjectInput; mint: boolean | TransactionArgument; burn: boolean | TransactionArgument; updateSymbol: boolean | TransactionArgument; updateName: boolean | TransactionArgument; updateDescription: boolean | TransactionArgument; updateIcon: boolean | TransactionArgument; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function newDisable( tx: Transaction, typeArgs: [string, string, string, string], args: NewDisableArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::new_disable`, typeArguments: typeArgs, arguments: [ obj(tx, args.intent), obj(tx, args.account), pure(tx, args.mint, `bool`), pure(tx, args.burn, `bool`), pure(tx, args.updateSymbol, `bool`), pure(tx, args.updateName, `bool`), pure(tx, args.updateDescription, `bool`), pure(tx, args.updateIcon, `bool`), obj(tx, args.versionWitness), generic(tx, `${typeArgs[3]}`, args.intentWitness) ], }) }

export interface NewMintArgs { intent: TransactionObjectInput; account: TransactionObjectInput; amount: bigint | TransactionArgument; versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function newMint( tx: Transaction, typeArgs: [string, string, string, string], args: NewMintArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::new_mint`, typeArguments: typeArgs, arguments: [ obj(tx, args.intent), obj(tx, args.account), pure(tx, args.amount, `u64`), obj(tx, args.versionWitness), generic(tx, `${typeArgs[3]}`, args.intentWitness) ], }) }

export interface NewUpdateArgs { intent: TransactionObjectInput; account: TransactionObjectInput; symbol: (string | TransactionArgument | TransactionArgument | null); name: (string | TransactionArgument | TransactionArgument | null); description: (string | TransactionArgument | TransactionArgument | null); iconUrl: (string | TransactionArgument | TransactionArgument | null); versionWitness: TransactionObjectInput; intentWitness: GenericArg }

export function newUpdate( tx: Transaction, typeArgs: [string, string, string, string], args: NewUpdateArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::new_update`, typeArguments: typeArgs, arguments: [ obj(tx, args.intent), obj(tx, args.account), pure(tx, args.symbol, `${Option.$typeName}<${String.$typeName}>`), pure(tx, args.name, `${Option.$typeName}<${String1.$typeName}>`), pure(tx, args.description, `${Option.$typeName}<${String1.$typeName}>`), pure(tx, args.iconUrl, `${Option.$typeName}<${String.$typeName}>`), obj(tx, args.versionWitness), generic(tx, `${typeArgs[3]}`, args.intentWitness) ], }) }

export interface PublicBurnArgs { account: TransactionObjectInput; coin: TransactionObjectInput }

export function publicBurn( tx: Transaction, typeArgs: [string, string, string], args: PublicBurnArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::public_burn`, typeArguments: typeArgs, arguments: [ obj(tx, args.account), obj(tx, args.coin) ], }) }

export function totalBurned( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::total_burned`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }

export function totalMinted( tx: Transaction, typeArg: string, lock: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::currency::total_minted`, typeArguments: [typeArg], arguments: [ obj(tx, lock) ], }) }
