import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== PayAction =============================== */

export function isPayAction(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::pay::PayAction` + '<'); }

export interface PayActionFields<CoinType extends PhantomTypeArgument> { paymentId: ToField<"address">; amount: ToField<"u64">; issuedBy: ToField<"address"> }

export type PayActionReified<CoinType extends PhantomTypeArgument> = Reified< PayAction<CoinType>, PayActionFields<CoinType> >;

export class PayAction<CoinType extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::pay::PayAction`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = PayAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::pay::PayAction<${PhantomToTypeStr<CoinType>}>`; readonly $typeArgs: [PhantomToTypeStr<CoinType>]; readonly $isPhantom = PayAction.$isPhantom;

 readonly paymentId: ToField<"address">; readonly amount: ToField<"u64">; readonly issuedBy: ToField<"address">

 private constructor(typeArgs: [PhantomToTypeStr<CoinType>], fields: PayActionFields<CoinType>, ) { this.$fullTypeName = composeSuiType( PayAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::pay::PayAction<${PhantomToTypeStr<CoinType>}>`; this.$typeArgs = typeArgs;

 this.paymentId = fields.paymentId;; this.amount = fields.amount;; this.issuedBy = fields.issuedBy; }

 static reified<CoinType extends PhantomReified<PhantomTypeArgument>>( CoinType: CoinType ): PayActionReified<ToPhantomTypeArgument<CoinType>> { return { typeName: PayAction.$typeName, fullTypeName: composeSuiType( PayAction.$typeName, ...[extractType(CoinType)] ) as `${typeof PKG_V1}::pay::PayAction<${PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>}>`, typeArgs: [ extractType(CoinType) ] as [PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>], isPhantom: PayAction.$isPhantom, reifiedTypeArgs: [CoinType], fromFields: (fields: Record<string, any>) => PayAction.fromFields( CoinType, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => PayAction.fromFieldsWithTypes( CoinType, item, ), fromBcs: (data: Uint8Array) => PayAction.fromBcs( CoinType, data, ), bcs: PayAction.bcs, fromJSONField: (field: any) => PayAction.fromJSONField( CoinType, field, ), fromJSON: (json: Record<string, any>) => PayAction.fromJSON( CoinType, json, ), fromSuiParsedData: (content: SuiParsedData) => PayAction.fromSuiParsedData( CoinType, content, ), fromSuiObjectData: (content: SuiObjectData) => PayAction.fromSuiObjectData( CoinType, content, ), fetch: async (client: SuiClient, id: string) => PayAction.fetch( client, CoinType, id, ), new: ( fields: PayActionFields<ToPhantomTypeArgument<CoinType>>, ) => { return new PayAction( [extractType(CoinType)], fields ) }, kind: "StructClassReified", } }

 static get r() { return PayAction.reified }

 static phantom<CoinType extends PhantomReified<PhantomTypeArgument>>( CoinType: CoinType ): PhantomReified<ToTypeStr<PayAction<ToPhantomTypeArgument<CoinType>>>> { return phantom(PayAction.reified( CoinType )); } static get p() { return PayAction.phantom }

 static get bcs() { return bcs.struct("PayAction", {

 payment_id: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), amount: bcs.u64(), issued_by: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, fields: Record<string, any> ): PayAction<ToPhantomTypeArgument<CoinType>> { return PayAction.reified( typeArg, ).new( { paymentId: decodeFromFields("address", fields.payment_id), amount: decodeFromFields("u64", fields.amount), issuedBy: decodeFromFields("address", fields.issued_by) } ) }

 static fromFieldsWithTypes<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, item: FieldsWithTypes ): PayAction<ToPhantomTypeArgument<CoinType>> { if (!isPayAction(item.type)) { throw new Error("not a PayAction type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return PayAction.reified( typeArg, ).new( { paymentId: decodeFromFieldsWithTypes("address", item.fields.payment_id), amount: decodeFromFieldsWithTypes("u64", item.fields.amount), issuedBy: decodeFromFieldsWithTypes("address", item.fields.issued_by) } ) }

 static fromBcs<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, data: Uint8Array ): PayAction<ToPhantomTypeArgument<CoinType>> { return PayAction.fromFields( typeArg, PayAction.bcs.parse(data) ) }

 toJSONField() { return {

 paymentId: this.paymentId,amount: this.amount.toString(),issuedBy: this.issuedBy,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, field: any ): PayAction<ToPhantomTypeArgument<CoinType>> { return PayAction.reified( typeArg, ).new( { paymentId: decodeFromJSONField("address", field.paymentId), amount: decodeFromJSONField("u64", field.amount), issuedBy: decodeFromJSONField("address", field.issuedBy) } ) }

 static fromJSON<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, json: Record<string, any> ): PayAction<ToPhantomTypeArgument<CoinType>> { if (json.$typeName !== PayAction.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(PayAction.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return PayAction.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, content: SuiParsedData ): PayAction<ToPhantomTypeArgument<CoinType>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isPayAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a PayAction object`); } return PayAction.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, data: SuiObjectData ): PayAction<ToPhantomTypeArgument<CoinType>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isPayAction(data.bcs.type)) { throw new Error(`object at is not a PayAction object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return PayAction.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return PayAction.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<CoinType extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: CoinType, id: string ): Promise<PayAction<ToPhantomTypeArgument<CoinType>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching PayAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPayAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a PayAction object`); }

 return PayAction.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== PayEvent =============================== */

export function isPayEvent(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::pay::PayEvent` + '<'); }

export interface PayEventFields<CoinType extends PhantomTypeArgument> { paymentId: ToField<"address">; timestamp: ToField<"u64">; amount: ToField<"u64">; tips: ToField<"u64">; issuedBy: ToField<"address"> }

export type PayEventReified<CoinType extends PhantomTypeArgument> = Reified< PayEvent<CoinType>, PayEventFields<CoinType> >;

export class PayEvent<CoinType extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::pay::PayEvent`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = PayEvent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::pay::PayEvent<${PhantomToTypeStr<CoinType>}>`; readonly $typeArgs: [PhantomToTypeStr<CoinType>]; readonly $isPhantom = PayEvent.$isPhantom;

 readonly paymentId: ToField<"address">; readonly timestamp: ToField<"u64">; readonly amount: ToField<"u64">; readonly tips: ToField<"u64">; readonly issuedBy: ToField<"address">

 private constructor(typeArgs: [PhantomToTypeStr<CoinType>], fields: PayEventFields<CoinType>, ) { this.$fullTypeName = composeSuiType( PayEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::pay::PayEvent<${PhantomToTypeStr<CoinType>}>`; this.$typeArgs = typeArgs;

 this.paymentId = fields.paymentId;; this.timestamp = fields.timestamp;; this.amount = fields.amount;; this.tips = fields.tips;; this.issuedBy = fields.issuedBy; }

 static reified<CoinType extends PhantomReified<PhantomTypeArgument>>( CoinType: CoinType ): PayEventReified<ToPhantomTypeArgument<CoinType>> { return { typeName: PayEvent.$typeName, fullTypeName: composeSuiType( PayEvent.$typeName, ...[extractType(CoinType)] ) as `${typeof PKG_V1}::pay::PayEvent<${PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>}>`, typeArgs: [ extractType(CoinType) ] as [PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>], isPhantom: PayEvent.$isPhantom, reifiedTypeArgs: [CoinType], fromFields: (fields: Record<string, any>) => PayEvent.fromFields( CoinType, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => PayEvent.fromFieldsWithTypes( CoinType, item, ), fromBcs: (data: Uint8Array) => PayEvent.fromBcs( CoinType, data, ), bcs: PayEvent.bcs, fromJSONField: (field: any) => PayEvent.fromJSONField( CoinType, field, ), fromJSON: (json: Record<string, any>) => PayEvent.fromJSON( CoinType, json, ), fromSuiParsedData: (content: SuiParsedData) => PayEvent.fromSuiParsedData( CoinType, content, ), fromSuiObjectData: (content: SuiObjectData) => PayEvent.fromSuiObjectData( CoinType, content, ), fetch: async (client: SuiClient, id: string) => PayEvent.fetch( client, CoinType, id, ), new: ( fields: PayEventFields<ToPhantomTypeArgument<CoinType>>, ) => { return new PayEvent( [extractType(CoinType)], fields ) }, kind: "StructClassReified", } }

 static get r() { return PayEvent.reified }

 static phantom<CoinType extends PhantomReified<PhantomTypeArgument>>( CoinType: CoinType ): PhantomReified<ToTypeStr<PayEvent<ToPhantomTypeArgument<CoinType>>>> { return phantom(PayEvent.reified( CoinType )); } static get p() { return PayEvent.phantom }

 static get bcs() { return bcs.struct("PayEvent", {

 payment_id: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), timestamp: bcs.u64(), amount: bcs.u64(), tips: bcs.u64(), issued_by: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, fields: Record<string, any> ): PayEvent<ToPhantomTypeArgument<CoinType>> { return PayEvent.reified( typeArg, ).new( { paymentId: decodeFromFields("address", fields.payment_id), timestamp: decodeFromFields("u64", fields.timestamp), amount: decodeFromFields("u64", fields.amount), tips: decodeFromFields("u64", fields.tips), issuedBy: decodeFromFields("address", fields.issued_by) } ) }

 static fromFieldsWithTypes<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, item: FieldsWithTypes ): PayEvent<ToPhantomTypeArgument<CoinType>> { if (!isPayEvent(item.type)) { throw new Error("not a PayEvent type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return PayEvent.reified( typeArg, ).new( { paymentId: decodeFromFieldsWithTypes("address", item.fields.payment_id), timestamp: decodeFromFieldsWithTypes("u64", item.fields.timestamp), amount: decodeFromFieldsWithTypes("u64", item.fields.amount), tips: decodeFromFieldsWithTypes("u64", item.fields.tips), issuedBy: decodeFromFieldsWithTypes("address", item.fields.issued_by) } ) }

 static fromBcs<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, data: Uint8Array ): PayEvent<ToPhantomTypeArgument<CoinType>> { return PayEvent.fromFields( typeArg, PayEvent.bcs.parse(data) ) }

 toJSONField() { return {

 paymentId: this.paymentId,timestamp: this.timestamp.toString(),amount: this.amount.toString(),tips: this.tips.toString(),issuedBy: this.issuedBy,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, field: any ): PayEvent<ToPhantomTypeArgument<CoinType>> { return PayEvent.reified( typeArg, ).new( { paymentId: decodeFromJSONField("address", field.paymentId), timestamp: decodeFromJSONField("u64", field.timestamp), amount: decodeFromJSONField("u64", field.amount), tips: decodeFromJSONField("u64", field.tips), issuedBy: decodeFromJSONField("address", field.issuedBy) } ) }

 static fromJSON<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, json: Record<string, any> ): PayEvent<ToPhantomTypeArgument<CoinType>> { if (json.$typeName !== PayEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(PayEvent.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return PayEvent.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, content: SuiParsedData ): PayEvent<ToPhantomTypeArgument<CoinType>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isPayEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a PayEvent object`); } return PayEvent.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, data: SuiObjectData ): PayEvent<ToPhantomTypeArgument<CoinType>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isPayEvent(data.bcs.type)) { throw new Error(`object at is not a PayEvent object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return PayEvent.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return PayEvent.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<CoinType extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: CoinType, id: string ): Promise<PayEvent<ToPhantomTypeArgument<CoinType>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching PayEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPayEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a PayEvent object`); }

 return PayEvent.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== PayIntent =============================== */

export function isPayIntent(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::pay::PayIntent`; }

export interface PayIntentFields { dummyField: ToField<"bool"> }

export type PayIntentReified = Reified< PayIntent, PayIntentFields >;

export class PayIntent implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::pay::PayIntent`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = PayIntent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::pay::PayIntent`; readonly $typeArgs: []; readonly $isPhantom = PayIntent.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: PayIntentFields, ) { this.$fullTypeName = composeSuiType( PayIntent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::pay::PayIntent`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): PayIntentReified { return { typeName: PayIntent.$typeName, fullTypeName: composeSuiType( PayIntent.$typeName, ...[] ) as `${typeof PKG_V1}::pay::PayIntent`, typeArgs: [ ] as [], isPhantom: PayIntent.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => PayIntent.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => PayIntent.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => PayIntent.fromBcs( data, ), bcs: PayIntent.bcs, fromJSONField: (field: any) => PayIntent.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => PayIntent.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => PayIntent.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => PayIntent.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => PayIntent.fetch( client, id, ), new: ( fields: PayIntentFields, ) => { return new PayIntent( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return PayIntent.reified() }

 static phantom( ): PhantomReified<ToTypeStr<PayIntent>> { return phantom(PayIntent.reified( )); } static get p() { return PayIntent.phantom() }

 static get bcs() { return bcs.struct("PayIntent", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): PayIntent { return PayIntent.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): PayIntent { if (!isPayIntent(item.type)) { throw new Error("not a PayIntent type");

 }

 return PayIntent.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): PayIntent { return PayIntent.fromFields( PayIntent.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): PayIntent { return PayIntent.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): PayIntent { if (json.$typeName !== PayIntent.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return PayIntent.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): PayIntent { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isPayIntent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a PayIntent object`); } return PayIntent.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): PayIntent { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isPayIntent(data.bcs.type)) { throw new Error(`object at is not a PayIntent object`); }

 return PayIntent.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return PayIntent.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<PayIntent> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching PayIntent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPayIntent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a PayIntent object`); }

 return PayIntent.fromSuiObjectData( res.data ); }

 }
