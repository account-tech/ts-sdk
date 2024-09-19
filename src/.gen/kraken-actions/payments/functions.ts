import {PUBLISHED_AT} from "..";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {Coin} from "../../_dependencies/source/0x2/coin/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {Receiving} from "../../_dependencies/source/0x2/transfer/structs";
import {GenericArg, generic, obj, option, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export function amount( tx: Transaction, typeArg: string, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::amount`, typeArguments: [typeArg], arguments: [ obj(tx, self) ], }) }

export function recipient( tx: Transaction, typeArg: string, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::recipient`, typeArguments: [typeArg], arguments: [ obj(tx, self) ], }) }

export function balance( tx: Transaction, typeArg: string, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::balance`, typeArguments: [typeArg], arguments: [ obj(tx, self) ], }) }

export interface ClaimArgs { stream: TransactionObjectInput; cap: TransactionObjectInput }

export function claim( tx: Transaction, typeArg: string, args: ClaimArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::claim`, typeArguments: [typeArg], arguments: [ obj(tx, args.stream), obj(tx, args.cap) ], }) }

export interface PayArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; coin: TransactionObjectInput; witness: GenericArg }

export function pay( tx: Transaction, typeArgs: [string, string], args: PayArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::pay`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.multisig), obj(tx, args.coin), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }

export interface AccessCoinArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; receiving: (TransactionObjectInput | TransactionArgument | null); witness: GenericArg }

export function accessCoin( tx: Transaction, typeArgs: [string, string], args: AccessCoinArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::access_coin`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), obj(tx, args.multisig), option(tx, `${Receiving.$typeName}<${Coin.$typeName}<${typeArgs[0]}>>`, args.receiving), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }

export interface CancelPaymentStreamArgs { stream: TransactionObjectInput; multisig: TransactionObjectInput }

export function cancelPaymentStream( tx: Transaction, typeArg: string, args: CancelPaymentStreamArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::cancel_payment_stream`, typeArguments: [typeArg], arguments: [ obj(tx, args.stream), obj(tx, args.multisig) ], }) }

export function destroyEmptyStream( tx: Transaction, typeArg: string, stream: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::destroy_empty_stream`, typeArguments: [typeArg], arguments: [ obj(tx, stream) ], }) }

export interface DestroyPayArgs { executable: TransactionObjectInput; witness: GenericArg }

export function destroyPay( tx: Transaction, typeArgs: [string, string], args: DestroyPayArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::destroy_pay`, typeArguments: typeArgs, arguments: [ obj(tx, args.executable), generic(tx, `${typeArgs[1]}`, args.witness) ], }) }

export function disburse( tx: Transaction, typeArg: string, stream: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::disburse`, typeArguments: [typeArg], arguments: [ obj(tx, stream) ], }) }

export interface ExecutePayArgs { executable: TransactionObjectInput; multisig: TransactionObjectInput; receiving: (TransactionObjectInput | TransactionArgument | null) }

export function executePay( tx: Transaction, typeArg: string, args: ExecutePayArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::execute_pay`, typeArguments: [typeArg], arguments: [ obj(tx, args.executable), obj(tx, args.multisig), option(tx, `${Receiving.$typeName}<${Coin.$typeName}<${typeArg}>>`, args.receiving) ], }) }

export function interval( tx: Transaction, typeArg: string, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::interval`, typeArguments: [typeArg], arguments: [ obj(tx, self) ], }) }

export function isMint( tx: Transaction, typeArg: string, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::is_mint`, typeArguments: [typeArg], arguments: [ obj(tx, executable) ], }) }

export function isSpend( tx: Transaction, typeArg: string, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::is_spend`, typeArguments: [typeArg], arguments: [ obj(tx, executable) ], }) }

export function isWithdraw( tx: Transaction, typeArg: string, executable: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::is_withdraw`, typeArguments: [typeArg], arguments: [ obj(tx, executable) ], }) }

export function lastEpoch( tx: Transaction, typeArg: string, self: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::last_epoch`, typeArguments: [typeArg], arguments: [ obj(tx, self) ], }) }

export interface NewPayMintedArgs { proposal: TransactionObjectInput; coinAmount: bigint | TransactionArgument; amount: bigint | TransactionArgument; interval: bigint | TransactionArgument; recipient: string | TransactionArgument }

export function newPayMinted( tx: Transaction, typeArg: string, args: NewPayMintedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::new_pay_minted`, typeArguments: [typeArg], arguments: [ obj(tx, args.proposal), pure(tx, args.coinAmount, `u64`), pure(tx, args.amount, `u64`), pure(tx, args.interval, `u64`), pure(tx, args.recipient, `address`) ], }) }

export interface NewPayOwnedArgs { proposal: TransactionObjectInput; coinId: string | TransactionArgument; amount: bigint | TransactionArgument; interval: bigint | TransactionArgument; recipient: string | TransactionArgument }

export function newPayOwned( tx: Transaction, args: NewPayOwnedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::new_pay_owned`, arguments: [ obj(tx, args.proposal), pure(tx, args.coinId, `${ID.$typeName}`), pure(tx, args.amount, `u64`), pure(tx, args.interval, `u64`), pure(tx, args.recipient, `address`) ], }) }

export interface NewPayTreasuryArgs { proposal: TransactionObjectInput; treasuryName: string | TransactionArgument; coinType: string | TransactionArgument; coinAmount: bigint | TransactionArgument; amount: bigint | TransactionArgument; interval: bigint | TransactionArgument; recipient: string | TransactionArgument }

export function newPayTreasury( tx: Transaction, args: NewPayTreasuryArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::new_pay_treasury`, arguments: [ obj(tx, args.proposal), pure(tx, args.treasuryName, `${String.$typeName}`), pure(tx, args.coinType, `${String.$typeName}`), pure(tx, args.coinAmount, `u64`), pure(tx, args.amount, `u64`), pure(tx, args.interval, `u64`), pure(tx, args.recipient, `address`) ], }) }

export interface ProposePayMintedArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; coinAmount: bigint | TransactionArgument; amount: bigint | TransactionArgument; interval: bigint | TransactionArgument; recipient: string | TransactionArgument }

export function proposePayMinted( tx: Transaction, typeArg: string, args: ProposePayMintedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::propose_pay_minted`, typeArguments: [typeArg], arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.coinAmount, `u64`), pure(tx, args.amount, `u64`), pure(tx, args.interval, `u64`), pure(tx, args.recipient, `address`) ], }) }

export interface ProposePayOwnedArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; coin: string | TransactionArgument; amount: bigint | TransactionArgument; interval: bigint | TransactionArgument; recipient: string | TransactionArgument }

export function proposePayOwned( tx: Transaction, args: ProposePayOwnedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::propose_pay_owned`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.coin, `${ID.$typeName}`), pure(tx, args.amount, `u64`), pure(tx, args.interval, `u64`), pure(tx, args.recipient, `address`) ], }) }

export interface ProposePayTreasuryArgs { multisig: TransactionObjectInput; key: string | TransactionArgument; description: string | TransactionArgument; executionTime: bigint | TransactionArgument; expirationEpoch: bigint | TransactionArgument; treasuryName: string | TransactionArgument; coinType: string | TransactionArgument; coinAmount: bigint | TransactionArgument; amount: bigint | TransactionArgument; interval: bigint | TransactionArgument; recipient: string | TransactionArgument }

export function proposePayTreasury( tx: Transaction, args: ProposePayTreasuryArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::payments::propose_pay_treasury`, arguments: [ obj(tx, args.multisig), pure(tx, args.key, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.executionTime, `u64`), pure(tx, args.expirationEpoch, `u64`), pure(tx, args.treasuryName, `${String.$typeName}`), pure(tx, args.coinType, `${String.$typeName}`), pure(tx, args.coinAmount, `u64`), pure(tx, args.amount, `u64`), pure(tx, args.interval, `u64`), pure(tx, args.recipient, `address`) ], }) }
