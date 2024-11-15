import {String} from "../../_dependencies/source/0x1/ascii/structs";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String as String1} from "../../_dependencies/source/0x1/string/structs";
import {TreasuryCap} from "../../_dependencies/source/0x2/coin/structs";
import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== PayProposal =============================== */

export function isPayProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::currency::PayProposal`; }

export interface PayProposalFields { dummyField: ToField<"bool"> }

export type PayProposalReified = Reified< PayProposal, PayProposalFields >;

export class PayProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::PayProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = PayProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::PayProposal`; readonly $typeArgs: []; readonly $isPhantom = PayProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: PayProposalFields, ) { this.$fullTypeName = composeSuiType( PayProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::PayProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): PayProposalReified { return { typeName: PayProposal.$typeName, fullTypeName: composeSuiType( PayProposal.$typeName, ...[] ) as `${typeof PKG_V1}::currency::PayProposal`, typeArgs: [ ] as [], isPhantom: PayProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => PayProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => PayProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => PayProposal.fromBcs( data, ), bcs: PayProposal.bcs, fromJSONField: (field: any) => PayProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => PayProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => PayProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => PayProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => PayProposal.fetch( client, id, ), new: ( fields: PayProposalFields, ) => { return new PayProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return PayProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<PayProposal>> { return phantom(PayProposal.reified( )); } static get p() { return PayProposal.phantom() }

 static get bcs() { return bcs.struct("PayProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): PayProposal { return PayProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): PayProposal { if (!isPayProposal(item.type)) { throw new Error("not a PayProposal type");

 }

 return PayProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): PayProposal { return PayProposal.fromFields( PayProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): PayProposal { return PayProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): PayProposal { if (json.$typeName !== PayProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return PayProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): PayProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isPayProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a PayProposal object`); } return PayProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): PayProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isPayProposal(data.bcs.type)) { throw new Error(`object at is not a PayProposal object`); }

 return PayProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return PayProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<PayProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching PayProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPayProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a PayProposal object`); }

 return PayProposal.fromSuiObjectData( res.data ); }

 }

/* ============================== TransferProposal =============================== */

export function isTransferProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::currency::TransferProposal`; }

export interface TransferProposalFields { dummyField: ToField<"bool"> }

export type TransferProposalReified = Reified< TransferProposal, TransferProposalFields >;

export class TransferProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::TransferProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = TransferProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::TransferProposal`; readonly $typeArgs: []; readonly $isPhantom = TransferProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: TransferProposalFields, ) { this.$fullTypeName = composeSuiType( TransferProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::TransferProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): TransferProposalReified { return { typeName: TransferProposal.$typeName, fullTypeName: composeSuiType( TransferProposal.$typeName, ...[] ) as `${typeof PKG_V1}::currency::TransferProposal`, typeArgs: [ ] as [], isPhantom: TransferProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => TransferProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TransferProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => TransferProposal.fromBcs( data, ), bcs: TransferProposal.bcs, fromJSONField: (field: any) => TransferProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => TransferProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => TransferProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => TransferProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => TransferProposal.fetch( client, id, ), new: ( fields: TransferProposalFields, ) => { return new TransferProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return TransferProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<TransferProposal>> { return phantom(TransferProposal.reified( )); } static get p() { return TransferProposal.phantom() }

 static get bcs() { return bcs.struct("TransferProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): TransferProposal { return TransferProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): TransferProposal { if (!isTransferProposal(item.type)) { throw new Error("not a TransferProposal type");

 }

 return TransferProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): TransferProposal { return TransferProposal.fromFields( TransferProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): TransferProposal { return TransferProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): TransferProposal { if (json.$typeName !== TransferProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return TransferProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): TransferProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTransferProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TransferProposal object`); } return TransferProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): TransferProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTransferProposal(data.bcs.type)) { throw new Error(`object at is not a TransferProposal object`); }

 return TransferProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return TransferProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<TransferProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TransferProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTransferProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TransferProposal object`); }

 return TransferProposal.fromSuiObjectData( res.data ); }

 }

/* ============================== BurnAction =============================== */

export function isBurnAction(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::currency::BurnAction` + '<'); }

export interface BurnActionFields<CoinType extends PhantomTypeArgument> { amount: ToField<"u64"> }

export type BurnActionReified<CoinType extends PhantomTypeArgument> = Reified< BurnAction<CoinType>, BurnActionFields<CoinType> >;

export class BurnAction<CoinType extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::BurnAction`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = BurnAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::BurnAction<${PhantomToTypeStr<CoinType>}>`; readonly $typeArgs: [PhantomToTypeStr<CoinType>]; readonly $isPhantom = BurnAction.$isPhantom;

 readonly amount: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<CoinType>], fields: BurnActionFields<CoinType>, ) { this.$fullTypeName = composeSuiType( BurnAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::BurnAction<${PhantomToTypeStr<CoinType>}>`; this.$typeArgs = typeArgs;

 this.amount = fields.amount; }

 static reified<CoinType extends PhantomReified<PhantomTypeArgument>>( CoinType: CoinType ): BurnActionReified<ToPhantomTypeArgument<CoinType>> { return { typeName: BurnAction.$typeName, fullTypeName: composeSuiType( BurnAction.$typeName, ...[extractType(CoinType)] ) as `${typeof PKG_V1}::currency::BurnAction<${PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>}>`, typeArgs: [ extractType(CoinType) ] as [PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>], isPhantom: BurnAction.$isPhantom, reifiedTypeArgs: [CoinType], fromFields: (fields: Record<string, any>) => BurnAction.fromFields( CoinType, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => BurnAction.fromFieldsWithTypes( CoinType, item, ), fromBcs: (data: Uint8Array) => BurnAction.fromBcs( CoinType, data, ), bcs: BurnAction.bcs, fromJSONField: (field: any) => BurnAction.fromJSONField( CoinType, field, ), fromJSON: (json: Record<string, any>) => BurnAction.fromJSON( CoinType, json, ), fromSuiParsedData: (content: SuiParsedData) => BurnAction.fromSuiParsedData( CoinType, content, ), fromSuiObjectData: (content: SuiObjectData) => BurnAction.fromSuiObjectData( CoinType, content, ), fetch: async (client: SuiClient, id: string) => BurnAction.fetch( client, CoinType, id, ), new: ( fields: BurnActionFields<ToPhantomTypeArgument<CoinType>>, ) => { return new BurnAction( [extractType(CoinType)], fields ) }, kind: "StructClassReified", } }

 static get r() { return BurnAction.reified }

 static phantom<CoinType extends PhantomReified<PhantomTypeArgument>>( CoinType: CoinType ): PhantomReified<ToTypeStr<BurnAction<ToPhantomTypeArgument<CoinType>>>> { return phantom(BurnAction.reified( CoinType )); } static get p() { return BurnAction.phantom }

 static get bcs() { return bcs.struct("BurnAction", {

 amount: bcs.u64()

}) };

 static fromFields<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, fields: Record<string, any> ): BurnAction<ToPhantomTypeArgument<CoinType>> { return BurnAction.reified( typeArg, ).new( { amount: decodeFromFields("u64", fields.amount) } ) }

 static fromFieldsWithTypes<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, item: FieldsWithTypes ): BurnAction<ToPhantomTypeArgument<CoinType>> { if (!isBurnAction(item.type)) { throw new Error("not a BurnAction type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return BurnAction.reified( typeArg, ).new( { amount: decodeFromFieldsWithTypes("u64", item.fields.amount) } ) }

 static fromBcs<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, data: Uint8Array ): BurnAction<ToPhantomTypeArgument<CoinType>> { return BurnAction.fromFields( typeArg, BurnAction.bcs.parse(data) ) }

 toJSONField() { return {

 amount: this.amount.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, field: any ): BurnAction<ToPhantomTypeArgument<CoinType>> { return BurnAction.reified( typeArg, ).new( { amount: decodeFromJSONField("u64", field.amount) } ) }

 static fromJSON<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, json: Record<string, any> ): BurnAction<ToPhantomTypeArgument<CoinType>> { if (json.$typeName !== BurnAction.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(BurnAction.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return BurnAction.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, content: SuiParsedData ): BurnAction<ToPhantomTypeArgument<CoinType>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBurnAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a BurnAction object`); } return BurnAction.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, data: SuiObjectData ): BurnAction<ToPhantomTypeArgument<CoinType>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isBurnAction(data.bcs.type)) { throw new Error(`object at is not a BurnAction object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return BurnAction.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return BurnAction.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<CoinType extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: CoinType, id: string ): Promise<BurnAction<ToPhantomTypeArgument<CoinType>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching BurnAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBurnAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a BurnAction object`); }

 return BurnAction.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== BurnProposal =============================== */

export function isBurnProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::currency::BurnProposal`; }

export interface BurnProposalFields { dummyField: ToField<"bool"> }

export type BurnProposalReified = Reified< BurnProposal, BurnProposalFields >;

export class BurnProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::BurnProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = BurnProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::BurnProposal`; readonly $typeArgs: []; readonly $isPhantom = BurnProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: BurnProposalFields, ) { this.$fullTypeName = composeSuiType( BurnProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::BurnProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): BurnProposalReified { return { typeName: BurnProposal.$typeName, fullTypeName: composeSuiType( BurnProposal.$typeName, ...[] ) as `${typeof PKG_V1}::currency::BurnProposal`, typeArgs: [ ] as [], isPhantom: BurnProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => BurnProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => BurnProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => BurnProposal.fromBcs( data, ), bcs: BurnProposal.bcs, fromJSONField: (field: any) => BurnProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => BurnProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => BurnProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => BurnProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => BurnProposal.fetch( client, id, ), new: ( fields: BurnProposalFields, ) => { return new BurnProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return BurnProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<BurnProposal>> { return phantom(BurnProposal.reified( )); } static get p() { return BurnProposal.phantom() }

 static get bcs() { return bcs.struct("BurnProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): BurnProposal { return BurnProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): BurnProposal { if (!isBurnProposal(item.type)) { throw new Error("not a BurnProposal type");

 }

 return BurnProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): BurnProposal { return BurnProposal.fromFields( BurnProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): BurnProposal { return BurnProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): BurnProposal { if (json.$typeName !== BurnProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return BurnProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): BurnProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBurnProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a BurnProposal object`); } return BurnProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): BurnProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isBurnProposal(data.bcs.type)) { throw new Error(`object at is not a BurnProposal object`); }

 return BurnProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return BurnProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<BurnProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching BurnProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBurnProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a BurnProposal object`); }

 return BurnProposal.fromSuiObjectData( res.data ); }

 }

/* ============================== CurrencyKey =============================== */

export function isCurrencyKey(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::currency::CurrencyKey` + '<'); }

export interface CurrencyKeyFields<CoinType extends PhantomTypeArgument> { dummyField: ToField<"bool"> }

export type CurrencyKeyReified<CoinType extends PhantomTypeArgument> = Reified< CurrencyKey<CoinType>, CurrencyKeyFields<CoinType> >;

export class CurrencyKey<CoinType extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::CurrencyKey`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = CurrencyKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::CurrencyKey<${PhantomToTypeStr<CoinType>}>`; readonly $typeArgs: [PhantomToTypeStr<CoinType>]; readonly $isPhantom = CurrencyKey.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [PhantomToTypeStr<CoinType>], fields: CurrencyKeyFields<CoinType>, ) { this.$fullTypeName = composeSuiType( CurrencyKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::CurrencyKey<${PhantomToTypeStr<CoinType>}>`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified<CoinType extends PhantomReified<PhantomTypeArgument>>( CoinType: CoinType ): CurrencyKeyReified<ToPhantomTypeArgument<CoinType>> { return { typeName: CurrencyKey.$typeName, fullTypeName: composeSuiType( CurrencyKey.$typeName, ...[extractType(CoinType)] ) as `${typeof PKG_V1}::currency::CurrencyKey<${PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>}>`, typeArgs: [ extractType(CoinType) ] as [PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>], isPhantom: CurrencyKey.$isPhantom, reifiedTypeArgs: [CoinType], fromFields: (fields: Record<string, any>) => CurrencyKey.fromFields( CoinType, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => CurrencyKey.fromFieldsWithTypes( CoinType, item, ), fromBcs: (data: Uint8Array) => CurrencyKey.fromBcs( CoinType, data, ), bcs: CurrencyKey.bcs, fromJSONField: (field: any) => CurrencyKey.fromJSONField( CoinType, field, ), fromJSON: (json: Record<string, any>) => CurrencyKey.fromJSON( CoinType, json, ), fromSuiParsedData: (content: SuiParsedData) => CurrencyKey.fromSuiParsedData( CoinType, content, ), fromSuiObjectData: (content: SuiObjectData) => CurrencyKey.fromSuiObjectData( CoinType, content, ), fetch: async (client: SuiClient, id: string) => CurrencyKey.fetch( client, CoinType, id, ), new: ( fields: CurrencyKeyFields<ToPhantomTypeArgument<CoinType>>, ) => { return new CurrencyKey( [extractType(CoinType)], fields ) }, kind: "StructClassReified", } }

 static get r() { return CurrencyKey.reified }

 static phantom<CoinType extends PhantomReified<PhantomTypeArgument>>( CoinType: CoinType ): PhantomReified<ToTypeStr<CurrencyKey<ToPhantomTypeArgument<CoinType>>>> { return phantom(CurrencyKey.reified( CoinType )); } static get p() { return CurrencyKey.phantom }

 static get bcs() { return bcs.struct("CurrencyKey", {

 dummy_field: bcs.bool()

}) };

 static fromFields<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, fields: Record<string, any> ): CurrencyKey<ToPhantomTypeArgument<CoinType>> { return CurrencyKey.reified( typeArg, ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, item: FieldsWithTypes ): CurrencyKey<ToPhantomTypeArgument<CoinType>> { if (!isCurrencyKey(item.type)) { throw new Error("not a CurrencyKey type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return CurrencyKey.reified( typeArg, ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, data: Uint8Array ): CurrencyKey<ToPhantomTypeArgument<CoinType>> { return CurrencyKey.fromFields( typeArg, CurrencyKey.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, field: any ): CurrencyKey<ToPhantomTypeArgument<CoinType>> { return CurrencyKey.reified( typeArg, ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, json: Record<string, any> ): CurrencyKey<ToPhantomTypeArgument<CoinType>> { if (json.$typeName !== CurrencyKey.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(CurrencyKey.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return CurrencyKey.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, content: SuiParsedData ): CurrencyKey<ToPhantomTypeArgument<CoinType>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isCurrencyKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a CurrencyKey object`); } return CurrencyKey.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, data: SuiObjectData ): CurrencyKey<ToPhantomTypeArgument<CoinType>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isCurrencyKey(data.bcs.type)) { throw new Error(`object at is not a CurrencyKey object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return CurrencyKey.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return CurrencyKey.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<CoinType extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: CoinType, id: string ): Promise<CurrencyKey<ToPhantomTypeArgument<CoinType>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching CurrencyKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isCurrencyKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a CurrencyKey object`); }

 return CurrencyKey.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== CurrencyLock =============================== */

export function isCurrencyLock(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::currency::CurrencyLock` + '<'); }

export interface CurrencyLockFields<CoinType extends PhantomTypeArgument> { treasuryCap: ToField<TreasuryCap<CoinType>>; maxSupply: ToField<Option<"u64">>; totalMinted: ToField<"u64">; totalBurnt: ToField<"u64">; canMint: ToField<"bool">; canBurn: ToField<"bool">; canUpdateSymbol: ToField<"bool">; canUpdateName: ToField<"bool">; canUpdateDescription: ToField<"bool">; canUpdateIcon: ToField<"bool"> }

export type CurrencyLockReified<CoinType extends PhantomTypeArgument> = Reified< CurrencyLock<CoinType>, CurrencyLockFields<CoinType> >;

export class CurrencyLock<CoinType extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::CurrencyLock`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = CurrencyLock.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::CurrencyLock<${PhantomToTypeStr<CoinType>}>`; readonly $typeArgs: [PhantomToTypeStr<CoinType>]; readonly $isPhantom = CurrencyLock.$isPhantom;

 readonly treasuryCap: ToField<TreasuryCap<CoinType>>; readonly maxSupply: ToField<Option<"u64">>; readonly totalMinted: ToField<"u64">; readonly totalBurnt: ToField<"u64">; readonly canMint: ToField<"bool">; readonly canBurn: ToField<"bool">; readonly canUpdateSymbol: ToField<"bool">; readonly canUpdateName: ToField<"bool">; readonly canUpdateDescription: ToField<"bool">; readonly canUpdateIcon: ToField<"bool">

 private constructor(typeArgs: [PhantomToTypeStr<CoinType>], fields: CurrencyLockFields<CoinType>, ) { this.$fullTypeName = composeSuiType( CurrencyLock.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::CurrencyLock<${PhantomToTypeStr<CoinType>}>`; this.$typeArgs = typeArgs;

 this.treasuryCap = fields.treasuryCap;; this.maxSupply = fields.maxSupply;; this.totalMinted = fields.totalMinted;; this.totalBurnt = fields.totalBurnt;; this.canMint = fields.canMint;; this.canBurn = fields.canBurn;; this.canUpdateSymbol = fields.canUpdateSymbol;; this.canUpdateName = fields.canUpdateName;; this.canUpdateDescription = fields.canUpdateDescription;; this.canUpdateIcon = fields.canUpdateIcon; }

 static reified<CoinType extends PhantomReified<PhantomTypeArgument>>( CoinType: CoinType ): CurrencyLockReified<ToPhantomTypeArgument<CoinType>> { return { typeName: CurrencyLock.$typeName, fullTypeName: composeSuiType( CurrencyLock.$typeName, ...[extractType(CoinType)] ) as `${typeof PKG_V1}::currency::CurrencyLock<${PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>}>`, typeArgs: [ extractType(CoinType) ] as [PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>], isPhantom: CurrencyLock.$isPhantom, reifiedTypeArgs: [CoinType], fromFields: (fields: Record<string, any>) => CurrencyLock.fromFields( CoinType, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => CurrencyLock.fromFieldsWithTypes( CoinType, item, ), fromBcs: (data: Uint8Array) => CurrencyLock.fromBcs( CoinType, data, ), bcs: CurrencyLock.bcs, fromJSONField: (field: any) => CurrencyLock.fromJSONField( CoinType, field, ), fromJSON: (json: Record<string, any>) => CurrencyLock.fromJSON( CoinType, json, ), fromSuiParsedData: (content: SuiParsedData) => CurrencyLock.fromSuiParsedData( CoinType, content, ), fromSuiObjectData: (content: SuiObjectData) => CurrencyLock.fromSuiObjectData( CoinType, content, ), fetch: async (client: SuiClient, id: string) => CurrencyLock.fetch( client, CoinType, id, ), new: ( fields: CurrencyLockFields<ToPhantomTypeArgument<CoinType>>, ) => { return new CurrencyLock( [extractType(CoinType)], fields ) }, kind: "StructClassReified", } }

 static get r() { return CurrencyLock.reified }

 static phantom<CoinType extends PhantomReified<PhantomTypeArgument>>( CoinType: CoinType ): PhantomReified<ToTypeStr<CurrencyLock<ToPhantomTypeArgument<CoinType>>>> { return phantom(CurrencyLock.reified( CoinType )); } static get p() { return CurrencyLock.phantom }

 static get bcs() { return bcs.struct("CurrencyLock", {

 treasury_cap: TreasuryCap.bcs, max_supply: Option.bcs(bcs.u64()), total_minted: bcs.u64(), total_burnt: bcs.u64(), can_mint: bcs.bool(), can_burn: bcs.bool(), can_update_symbol: bcs.bool(), can_update_name: bcs.bool(), can_update_description: bcs.bool(), can_update_icon: bcs.bool()

}) };

 static fromFields<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, fields: Record<string, any> ): CurrencyLock<ToPhantomTypeArgument<CoinType>> { return CurrencyLock.reified( typeArg, ).new( { treasuryCap: decodeFromFields(TreasuryCap.reified(typeArg), fields.treasury_cap), maxSupply: decodeFromFields(Option.reified("u64"), fields.max_supply), totalMinted: decodeFromFields("u64", fields.total_minted), totalBurnt: decodeFromFields("u64", fields.total_burnt), canMint: decodeFromFields("bool", fields.can_mint), canBurn: decodeFromFields("bool", fields.can_burn), canUpdateSymbol: decodeFromFields("bool", fields.can_update_symbol), canUpdateName: decodeFromFields("bool", fields.can_update_name), canUpdateDescription: decodeFromFields("bool", fields.can_update_description), canUpdateIcon: decodeFromFields("bool", fields.can_update_icon) } ) }

 static fromFieldsWithTypes<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, item: FieldsWithTypes ): CurrencyLock<ToPhantomTypeArgument<CoinType>> { if (!isCurrencyLock(item.type)) { throw new Error("not a CurrencyLock type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return CurrencyLock.reified( typeArg, ).new( { treasuryCap: decodeFromFieldsWithTypes(TreasuryCap.reified(typeArg), item.fields.treasury_cap), maxSupply: decodeFromFieldsWithTypes(Option.reified("u64"), item.fields.max_supply), totalMinted: decodeFromFieldsWithTypes("u64", item.fields.total_minted), totalBurnt: decodeFromFieldsWithTypes("u64", item.fields.total_burnt), canMint: decodeFromFieldsWithTypes("bool", item.fields.can_mint), canBurn: decodeFromFieldsWithTypes("bool", item.fields.can_burn), canUpdateSymbol: decodeFromFieldsWithTypes("bool", item.fields.can_update_symbol), canUpdateName: decodeFromFieldsWithTypes("bool", item.fields.can_update_name), canUpdateDescription: decodeFromFieldsWithTypes("bool", item.fields.can_update_description), canUpdateIcon: decodeFromFieldsWithTypes("bool", item.fields.can_update_icon) } ) }

 static fromBcs<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, data: Uint8Array ): CurrencyLock<ToPhantomTypeArgument<CoinType>> { return CurrencyLock.fromFields( typeArg, CurrencyLock.bcs.parse(data) ) }

 toJSONField() { return {

 treasuryCap: this.treasuryCap.toJSONField(),maxSupply: fieldToJSON<Option<"u64">>(`${Option.$typeName}<u64>`, this.maxSupply),totalMinted: this.totalMinted.toString(),totalBurnt: this.totalBurnt.toString(),canMint: this.canMint,canBurn: this.canBurn,canUpdateSymbol: this.canUpdateSymbol,canUpdateName: this.canUpdateName,canUpdateDescription: this.canUpdateDescription,canUpdateIcon: this.canUpdateIcon,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, field: any ): CurrencyLock<ToPhantomTypeArgument<CoinType>> { return CurrencyLock.reified( typeArg, ).new( { treasuryCap: decodeFromJSONField(TreasuryCap.reified(typeArg), field.treasuryCap), maxSupply: decodeFromJSONField(Option.reified("u64"), field.maxSupply), totalMinted: decodeFromJSONField("u64", field.totalMinted), totalBurnt: decodeFromJSONField("u64", field.totalBurnt), canMint: decodeFromJSONField("bool", field.canMint), canBurn: decodeFromJSONField("bool", field.canBurn), canUpdateSymbol: decodeFromJSONField("bool", field.canUpdateSymbol), canUpdateName: decodeFromJSONField("bool", field.canUpdateName), canUpdateDescription: decodeFromJSONField("bool", field.canUpdateDescription), canUpdateIcon: decodeFromJSONField("bool", field.canUpdateIcon) } ) }

 static fromJSON<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, json: Record<string, any> ): CurrencyLock<ToPhantomTypeArgument<CoinType>> { if (json.$typeName !== CurrencyLock.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(CurrencyLock.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return CurrencyLock.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, content: SuiParsedData ): CurrencyLock<ToPhantomTypeArgument<CoinType>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isCurrencyLock(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a CurrencyLock object`); } return CurrencyLock.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, data: SuiObjectData ): CurrencyLock<ToPhantomTypeArgument<CoinType>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isCurrencyLock(data.bcs.type)) { throw new Error(`object at is not a CurrencyLock object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return CurrencyLock.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return CurrencyLock.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<CoinType extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: CoinType, id: string ): Promise<CurrencyLock<ToPhantomTypeArgument<CoinType>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching CurrencyLock object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isCurrencyLock(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a CurrencyLock object`); }

 return CurrencyLock.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== DisableAction =============================== */

export function isDisableAction(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::currency::DisableAction` + '<'); }

export interface DisableActionFields<CoinType extends PhantomTypeArgument> { mint: ToField<"bool">; burn: ToField<"bool">; updateSymbol: ToField<"bool">; updateName: ToField<"bool">; updateDescription: ToField<"bool">; updateIcon: ToField<"bool"> }

export type DisableActionReified<CoinType extends PhantomTypeArgument> = Reified< DisableAction<CoinType>, DisableActionFields<CoinType> >;

export class DisableAction<CoinType extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::DisableAction`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = DisableAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::DisableAction<${PhantomToTypeStr<CoinType>}>`; readonly $typeArgs: [PhantomToTypeStr<CoinType>]; readonly $isPhantom = DisableAction.$isPhantom;

 readonly mint: ToField<"bool">; readonly burn: ToField<"bool">; readonly updateSymbol: ToField<"bool">; readonly updateName: ToField<"bool">; readonly updateDescription: ToField<"bool">; readonly updateIcon: ToField<"bool">

 private constructor(typeArgs: [PhantomToTypeStr<CoinType>], fields: DisableActionFields<CoinType>, ) { this.$fullTypeName = composeSuiType( DisableAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::DisableAction<${PhantomToTypeStr<CoinType>}>`; this.$typeArgs = typeArgs;

 this.mint = fields.mint;; this.burn = fields.burn;; this.updateSymbol = fields.updateSymbol;; this.updateName = fields.updateName;; this.updateDescription = fields.updateDescription;; this.updateIcon = fields.updateIcon; }

 static reified<CoinType extends PhantomReified<PhantomTypeArgument>>( CoinType: CoinType ): DisableActionReified<ToPhantomTypeArgument<CoinType>> { return { typeName: DisableAction.$typeName, fullTypeName: composeSuiType( DisableAction.$typeName, ...[extractType(CoinType)] ) as `${typeof PKG_V1}::currency::DisableAction<${PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>}>`, typeArgs: [ extractType(CoinType) ] as [PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>], isPhantom: DisableAction.$isPhantom, reifiedTypeArgs: [CoinType], fromFields: (fields: Record<string, any>) => DisableAction.fromFields( CoinType, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => DisableAction.fromFieldsWithTypes( CoinType, item, ), fromBcs: (data: Uint8Array) => DisableAction.fromBcs( CoinType, data, ), bcs: DisableAction.bcs, fromJSONField: (field: any) => DisableAction.fromJSONField( CoinType, field, ), fromJSON: (json: Record<string, any>) => DisableAction.fromJSON( CoinType, json, ), fromSuiParsedData: (content: SuiParsedData) => DisableAction.fromSuiParsedData( CoinType, content, ), fromSuiObjectData: (content: SuiObjectData) => DisableAction.fromSuiObjectData( CoinType, content, ), fetch: async (client: SuiClient, id: string) => DisableAction.fetch( client, CoinType, id, ), new: ( fields: DisableActionFields<ToPhantomTypeArgument<CoinType>>, ) => { return new DisableAction( [extractType(CoinType)], fields ) }, kind: "StructClassReified", } }

 static get r() { return DisableAction.reified }

 static phantom<CoinType extends PhantomReified<PhantomTypeArgument>>( CoinType: CoinType ): PhantomReified<ToTypeStr<DisableAction<ToPhantomTypeArgument<CoinType>>>> { return phantom(DisableAction.reified( CoinType )); } static get p() { return DisableAction.phantom }

 static get bcs() { return bcs.struct("DisableAction", {

 mint: bcs.bool(), burn: bcs.bool(), update_symbol: bcs.bool(), update_name: bcs.bool(), update_description: bcs.bool(), update_icon: bcs.bool()

}) };

 static fromFields<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, fields: Record<string, any> ): DisableAction<ToPhantomTypeArgument<CoinType>> { return DisableAction.reified( typeArg, ).new( { mint: decodeFromFields("bool", fields.mint), burn: decodeFromFields("bool", fields.burn), updateSymbol: decodeFromFields("bool", fields.update_symbol), updateName: decodeFromFields("bool", fields.update_name), updateDescription: decodeFromFields("bool", fields.update_description), updateIcon: decodeFromFields("bool", fields.update_icon) } ) }

 static fromFieldsWithTypes<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, item: FieldsWithTypes ): DisableAction<ToPhantomTypeArgument<CoinType>> { if (!isDisableAction(item.type)) { throw new Error("not a DisableAction type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return DisableAction.reified( typeArg, ).new( { mint: decodeFromFieldsWithTypes("bool", item.fields.mint), burn: decodeFromFieldsWithTypes("bool", item.fields.burn), updateSymbol: decodeFromFieldsWithTypes("bool", item.fields.update_symbol), updateName: decodeFromFieldsWithTypes("bool", item.fields.update_name), updateDescription: decodeFromFieldsWithTypes("bool", item.fields.update_description), updateIcon: decodeFromFieldsWithTypes("bool", item.fields.update_icon) } ) }

 static fromBcs<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, data: Uint8Array ): DisableAction<ToPhantomTypeArgument<CoinType>> { return DisableAction.fromFields( typeArg, DisableAction.bcs.parse(data) ) }

 toJSONField() { return {

 mint: this.mint,burn: this.burn,updateSymbol: this.updateSymbol,updateName: this.updateName,updateDescription: this.updateDescription,updateIcon: this.updateIcon,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, field: any ): DisableAction<ToPhantomTypeArgument<CoinType>> { return DisableAction.reified( typeArg, ).new( { mint: decodeFromJSONField("bool", field.mint), burn: decodeFromJSONField("bool", field.burn), updateSymbol: decodeFromJSONField("bool", field.updateSymbol), updateName: decodeFromJSONField("bool", field.updateName), updateDescription: decodeFromJSONField("bool", field.updateDescription), updateIcon: decodeFromJSONField("bool", field.updateIcon) } ) }

 static fromJSON<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, json: Record<string, any> ): DisableAction<ToPhantomTypeArgument<CoinType>> { if (json.$typeName !== DisableAction.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(DisableAction.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return DisableAction.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, content: SuiParsedData ): DisableAction<ToPhantomTypeArgument<CoinType>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isDisableAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a DisableAction object`); } return DisableAction.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, data: SuiObjectData ): DisableAction<ToPhantomTypeArgument<CoinType>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isDisableAction(data.bcs.type)) { throw new Error(`object at is not a DisableAction object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return DisableAction.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return DisableAction.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<CoinType extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: CoinType, id: string ): Promise<DisableAction<ToPhantomTypeArgument<CoinType>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching DisableAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isDisableAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a DisableAction object`); }

 return DisableAction.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== DisableProposal =============================== */

export function isDisableProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::currency::DisableProposal`; }

export interface DisableProposalFields { dummyField: ToField<"bool"> }

export type DisableProposalReified = Reified< DisableProposal, DisableProposalFields >;

export class DisableProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::DisableProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = DisableProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::DisableProposal`; readonly $typeArgs: []; readonly $isPhantom = DisableProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: DisableProposalFields, ) { this.$fullTypeName = composeSuiType( DisableProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::DisableProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): DisableProposalReified { return { typeName: DisableProposal.$typeName, fullTypeName: composeSuiType( DisableProposal.$typeName, ...[] ) as `${typeof PKG_V1}::currency::DisableProposal`, typeArgs: [ ] as [], isPhantom: DisableProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => DisableProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => DisableProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => DisableProposal.fromBcs( data, ), bcs: DisableProposal.bcs, fromJSONField: (field: any) => DisableProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => DisableProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => DisableProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => DisableProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => DisableProposal.fetch( client, id, ), new: ( fields: DisableProposalFields, ) => { return new DisableProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return DisableProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<DisableProposal>> { return phantom(DisableProposal.reified( )); } static get p() { return DisableProposal.phantom() }

 static get bcs() { return bcs.struct("DisableProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): DisableProposal { return DisableProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): DisableProposal { if (!isDisableProposal(item.type)) { throw new Error("not a DisableProposal type");

 }

 return DisableProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): DisableProposal { return DisableProposal.fromFields( DisableProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): DisableProposal { return DisableProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): DisableProposal { if (json.$typeName !== DisableProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return DisableProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): DisableProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isDisableProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a DisableProposal object`); } return DisableProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): DisableProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isDisableProposal(data.bcs.type)) { throw new Error(`object at is not a DisableProposal object`); }

 return DisableProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return DisableProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<DisableProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching DisableProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isDisableProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a DisableProposal object`); }

 return DisableProposal.fromSuiObjectData( res.data ); }

 }

/* ============================== MintAction =============================== */

export function isMintAction(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::currency::MintAction` + '<'); }

export interface MintActionFields<CoinType extends PhantomTypeArgument> { amount: ToField<"u64"> }

export type MintActionReified<CoinType extends PhantomTypeArgument> = Reified< MintAction<CoinType>, MintActionFields<CoinType> >;

export class MintAction<CoinType extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::MintAction`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = MintAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::MintAction<${PhantomToTypeStr<CoinType>}>`; readonly $typeArgs: [PhantomToTypeStr<CoinType>]; readonly $isPhantom = MintAction.$isPhantom;

 readonly amount: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<CoinType>], fields: MintActionFields<CoinType>, ) { this.$fullTypeName = composeSuiType( MintAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::MintAction<${PhantomToTypeStr<CoinType>}>`; this.$typeArgs = typeArgs;

 this.amount = fields.amount; }

 static reified<CoinType extends PhantomReified<PhantomTypeArgument>>( CoinType: CoinType ): MintActionReified<ToPhantomTypeArgument<CoinType>> { return { typeName: MintAction.$typeName, fullTypeName: composeSuiType( MintAction.$typeName, ...[extractType(CoinType)] ) as `${typeof PKG_V1}::currency::MintAction<${PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>}>`, typeArgs: [ extractType(CoinType) ] as [PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>], isPhantom: MintAction.$isPhantom, reifiedTypeArgs: [CoinType], fromFields: (fields: Record<string, any>) => MintAction.fromFields( CoinType, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MintAction.fromFieldsWithTypes( CoinType, item, ), fromBcs: (data: Uint8Array) => MintAction.fromBcs( CoinType, data, ), bcs: MintAction.bcs, fromJSONField: (field: any) => MintAction.fromJSONField( CoinType, field, ), fromJSON: (json: Record<string, any>) => MintAction.fromJSON( CoinType, json, ), fromSuiParsedData: (content: SuiParsedData) => MintAction.fromSuiParsedData( CoinType, content, ), fromSuiObjectData: (content: SuiObjectData) => MintAction.fromSuiObjectData( CoinType, content, ), fetch: async (client: SuiClient, id: string) => MintAction.fetch( client, CoinType, id, ), new: ( fields: MintActionFields<ToPhantomTypeArgument<CoinType>>, ) => { return new MintAction( [extractType(CoinType)], fields ) }, kind: "StructClassReified", } }

 static get r() { return MintAction.reified }

 static phantom<CoinType extends PhantomReified<PhantomTypeArgument>>( CoinType: CoinType ): PhantomReified<ToTypeStr<MintAction<ToPhantomTypeArgument<CoinType>>>> { return phantom(MintAction.reified( CoinType )); } static get p() { return MintAction.phantom }

 static get bcs() { return bcs.struct("MintAction", {

 amount: bcs.u64()

}) };

 static fromFields<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, fields: Record<string, any> ): MintAction<ToPhantomTypeArgument<CoinType>> { return MintAction.reified( typeArg, ).new( { amount: decodeFromFields("u64", fields.amount) } ) }

 static fromFieldsWithTypes<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, item: FieldsWithTypes ): MintAction<ToPhantomTypeArgument<CoinType>> { if (!isMintAction(item.type)) { throw new Error("not a MintAction type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return MintAction.reified( typeArg, ).new( { amount: decodeFromFieldsWithTypes("u64", item.fields.amount) } ) }

 static fromBcs<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, data: Uint8Array ): MintAction<ToPhantomTypeArgument<CoinType>> { return MintAction.fromFields( typeArg, MintAction.bcs.parse(data) ) }

 toJSONField() { return {

 amount: this.amount.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, field: any ): MintAction<ToPhantomTypeArgument<CoinType>> { return MintAction.reified( typeArg, ).new( { amount: decodeFromJSONField("u64", field.amount) } ) }

 static fromJSON<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, json: Record<string, any> ): MintAction<ToPhantomTypeArgument<CoinType>> { if (json.$typeName !== MintAction.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(MintAction.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return MintAction.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, content: SuiParsedData ): MintAction<ToPhantomTypeArgument<CoinType>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMintAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MintAction object`); } return MintAction.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, data: SuiObjectData ): MintAction<ToPhantomTypeArgument<CoinType>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMintAction(data.bcs.type)) { throw new Error(`object at is not a MintAction object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return MintAction.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return MintAction.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<CoinType extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: CoinType, id: string ): Promise<MintAction<ToPhantomTypeArgument<CoinType>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MintAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMintAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MintAction object`); }

 return MintAction.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== MintProposal =============================== */

export function isMintProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::currency::MintProposal`; }

export interface MintProposalFields { dummyField: ToField<"bool"> }

export type MintProposalReified = Reified< MintProposal, MintProposalFields >;

export class MintProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::MintProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = MintProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::MintProposal`; readonly $typeArgs: []; readonly $isPhantom = MintProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: MintProposalFields, ) { this.$fullTypeName = composeSuiType( MintProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::MintProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): MintProposalReified { return { typeName: MintProposal.$typeName, fullTypeName: composeSuiType( MintProposal.$typeName, ...[] ) as `${typeof PKG_V1}::currency::MintProposal`, typeArgs: [ ] as [], isPhantom: MintProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => MintProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MintProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => MintProposal.fromBcs( data, ), bcs: MintProposal.bcs, fromJSONField: (field: any) => MintProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => MintProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => MintProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => MintProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => MintProposal.fetch( client, id, ), new: ( fields: MintProposalFields, ) => { return new MintProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return MintProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<MintProposal>> { return phantom(MintProposal.reified( )); } static get p() { return MintProposal.phantom() }

 static get bcs() { return bcs.struct("MintProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): MintProposal { return MintProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): MintProposal { if (!isMintProposal(item.type)) { throw new Error("not a MintProposal type");

 }

 return MintProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): MintProposal { return MintProposal.fromFields( MintProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): MintProposal { return MintProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): MintProposal { if (json.$typeName !== MintProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return MintProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): MintProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMintProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MintProposal object`); } return MintProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): MintProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMintProposal(data.bcs.type)) { throw new Error(`object at is not a MintProposal object`); }

 return MintProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return MintProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<MintProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MintProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMintProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MintProposal object`); }

 return MintProposal.fromSuiObjectData( res.data ); }

 }

/* ============================== UpdateAction =============================== */

export function isUpdateAction(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::currency::UpdateAction` + '<'); }

export interface UpdateActionFields<CoinType extends PhantomTypeArgument> { symbol: ToField<Option<String>>; name: ToField<Option<String1>>; description: ToField<Option<String1>>; iconUrl: ToField<Option<String>> }

export type UpdateActionReified<CoinType extends PhantomTypeArgument> = Reified< UpdateAction<CoinType>, UpdateActionFields<CoinType> >;

export class UpdateAction<CoinType extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::UpdateAction`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = UpdateAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::UpdateAction<${PhantomToTypeStr<CoinType>}>`; readonly $typeArgs: [PhantomToTypeStr<CoinType>]; readonly $isPhantom = UpdateAction.$isPhantom;

 readonly symbol: ToField<Option<String>>; readonly name: ToField<Option<String1>>; readonly description: ToField<Option<String1>>; readonly iconUrl: ToField<Option<String>>

 private constructor(typeArgs: [PhantomToTypeStr<CoinType>], fields: UpdateActionFields<CoinType>, ) { this.$fullTypeName = composeSuiType( UpdateAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::UpdateAction<${PhantomToTypeStr<CoinType>}>`; this.$typeArgs = typeArgs;

 this.symbol = fields.symbol;; this.name = fields.name;; this.description = fields.description;; this.iconUrl = fields.iconUrl; }

 static reified<CoinType extends PhantomReified<PhantomTypeArgument>>( CoinType: CoinType ): UpdateActionReified<ToPhantomTypeArgument<CoinType>> { return { typeName: UpdateAction.$typeName, fullTypeName: composeSuiType( UpdateAction.$typeName, ...[extractType(CoinType)] ) as `${typeof PKG_V1}::currency::UpdateAction<${PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>}>`, typeArgs: [ extractType(CoinType) ] as [PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>], isPhantom: UpdateAction.$isPhantom, reifiedTypeArgs: [CoinType], fromFields: (fields: Record<string, any>) => UpdateAction.fromFields( CoinType, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UpdateAction.fromFieldsWithTypes( CoinType, item, ), fromBcs: (data: Uint8Array) => UpdateAction.fromBcs( CoinType, data, ), bcs: UpdateAction.bcs, fromJSONField: (field: any) => UpdateAction.fromJSONField( CoinType, field, ), fromJSON: (json: Record<string, any>) => UpdateAction.fromJSON( CoinType, json, ), fromSuiParsedData: (content: SuiParsedData) => UpdateAction.fromSuiParsedData( CoinType, content, ), fromSuiObjectData: (content: SuiObjectData) => UpdateAction.fromSuiObjectData( CoinType, content, ), fetch: async (client: SuiClient, id: string) => UpdateAction.fetch( client, CoinType, id, ), new: ( fields: UpdateActionFields<ToPhantomTypeArgument<CoinType>>, ) => { return new UpdateAction( [extractType(CoinType)], fields ) }, kind: "StructClassReified", } }

 static get r() { return UpdateAction.reified }

 static phantom<CoinType extends PhantomReified<PhantomTypeArgument>>( CoinType: CoinType ): PhantomReified<ToTypeStr<UpdateAction<ToPhantomTypeArgument<CoinType>>>> { return phantom(UpdateAction.reified( CoinType )); } static get p() { return UpdateAction.phantom }

 static get bcs() { return bcs.struct("UpdateAction", {

 symbol: Option.bcs(String.bcs), name: Option.bcs(String1.bcs), description: Option.bcs(String1.bcs), icon_url: Option.bcs(String.bcs)

}) };

 static fromFields<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, fields: Record<string, any> ): UpdateAction<ToPhantomTypeArgument<CoinType>> { return UpdateAction.reified( typeArg, ).new( { symbol: decodeFromFields(Option.reified(String.reified()), fields.symbol), name: decodeFromFields(Option.reified(String1.reified()), fields.name), description: decodeFromFields(Option.reified(String1.reified()), fields.description), iconUrl: decodeFromFields(Option.reified(String.reified()), fields.icon_url) } ) }

 static fromFieldsWithTypes<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, item: FieldsWithTypes ): UpdateAction<ToPhantomTypeArgument<CoinType>> { if (!isUpdateAction(item.type)) { throw new Error("not a UpdateAction type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return UpdateAction.reified( typeArg, ).new( { symbol: decodeFromFieldsWithTypes(Option.reified(String.reified()), item.fields.symbol), name: decodeFromFieldsWithTypes(Option.reified(String1.reified()), item.fields.name), description: decodeFromFieldsWithTypes(Option.reified(String1.reified()), item.fields.description), iconUrl: decodeFromFieldsWithTypes(Option.reified(String.reified()), item.fields.icon_url) } ) }

 static fromBcs<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, data: Uint8Array ): UpdateAction<ToPhantomTypeArgument<CoinType>> { return UpdateAction.fromFields( typeArg, UpdateAction.bcs.parse(data) ) }

 toJSONField() { return {

 symbol: fieldToJSON<Option<String>>(`${Option.$typeName}<${String.$typeName}>`, this.symbol),name: fieldToJSON<Option<String1>>(`${Option.$typeName}<${String1.$typeName}>`, this.name),description: fieldToJSON<Option<String1>>(`${Option.$typeName}<${String1.$typeName}>`, this.description),iconUrl: fieldToJSON<Option<String>>(`${Option.$typeName}<${String.$typeName}>`, this.iconUrl),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, field: any ): UpdateAction<ToPhantomTypeArgument<CoinType>> { return UpdateAction.reified( typeArg, ).new( { symbol: decodeFromJSONField(Option.reified(String.reified()), field.symbol), name: decodeFromJSONField(Option.reified(String1.reified()), field.name), description: decodeFromJSONField(Option.reified(String1.reified()), field.description), iconUrl: decodeFromJSONField(Option.reified(String.reified()), field.iconUrl) } ) }

 static fromJSON<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, json: Record<string, any> ): UpdateAction<ToPhantomTypeArgument<CoinType>> { if (json.$typeName !== UpdateAction.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(UpdateAction.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return UpdateAction.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, content: SuiParsedData ): UpdateAction<ToPhantomTypeArgument<CoinType>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpdateAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UpdateAction object`); } return UpdateAction.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, data: SuiObjectData ): UpdateAction<ToPhantomTypeArgument<CoinType>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpdateAction(data.bcs.type)) { throw new Error(`object at is not a UpdateAction object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return UpdateAction.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return UpdateAction.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<CoinType extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: CoinType, id: string ): Promise<UpdateAction<ToPhantomTypeArgument<CoinType>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UpdateAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpdateAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UpdateAction object`); }

 return UpdateAction.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== UpdateProposal =============================== */

export function isUpdateProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::currency::UpdateProposal`; }

export interface UpdateProposalFields { dummyField: ToField<"bool"> }

export type UpdateProposalReified = Reified< UpdateProposal, UpdateProposalFields >;

export class UpdateProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::UpdateProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = UpdateProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::UpdateProposal`; readonly $typeArgs: []; readonly $isPhantom = UpdateProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: UpdateProposalFields, ) { this.$fullTypeName = composeSuiType( UpdateProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::UpdateProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): UpdateProposalReified { return { typeName: UpdateProposal.$typeName, fullTypeName: composeSuiType( UpdateProposal.$typeName, ...[] ) as `${typeof PKG_V1}::currency::UpdateProposal`, typeArgs: [ ] as [], isPhantom: UpdateProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => UpdateProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UpdateProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => UpdateProposal.fromBcs( data, ), bcs: UpdateProposal.bcs, fromJSONField: (field: any) => UpdateProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => UpdateProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => UpdateProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => UpdateProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => UpdateProposal.fetch( client, id, ), new: ( fields: UpdateProposalFields, ) => { return new UpdateProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return UpdateProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<UpdateProposal>> { return phantom(UpdateProposal.reified( )); } static get p() { return UpdateProposal.phantom() }

 static get bcs() { return bcs.struct("UpdateProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): UpdateProposal { return UpdateProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): UpdateProposal { if (!isUpdateProposal(item.type)) { throw new Error("not a UpdateProposal type");

 }

 return UpdateProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): UpdateProposal { return UpdateProposal.fromFields( UpdateProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): UpdateProposal { return UpdateProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): UpdateProposal { if (json.$typeName !== UpdateProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return UpdateProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): UpdateProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpdateProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UpdateProposal object`); } return UpdateProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): UpdateProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpdateProposal(data.bcs.type)) { throw new Error(`object at is not a UpdateProposal object`); }

 return UpdateProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return UpdateProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<UpdateProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UpdateProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpdateProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UpdateProposal object`); }

 return UpdateProposal.fromSuiObjectData( res.data ); }

 }
