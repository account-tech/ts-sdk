import {Balance} from "../../_dependencies/source/0x2/balance/structs";
import {ID, UID} from "../../_dependencies/source/0x2/object/structs";
import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== Issuer =============================== */

export function isIssuer(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::payments::Issuer`; }

export interface IssuerFields { dummyField: ToField<"bool"> }

export type IssuerReified = Reified< Issuer, IssuerFields >;

export class Issuer implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::payments::Issuer`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Issuer.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::payments::Issuer`; readonly $typeArgs: []; readonly $isPhantom = Issuer.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: IssuerFields, ) { this.$fullTypeName = composeSuiType( Issuer.$typeName, ...typeArgs ) as `${typeof PKG_V1}::payments::Issuer`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): IssuerReified { return { typeName: Issuer.$typeName, fullTypeName: composeSuiType( Issuer.$typeName, ...[] ) as `${typeof PKG_V1}::payments::Issuer`, typeArgs: [ ] as [], isPhantom: Issuer.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Issuer.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Issuer.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Issuer.fromBcs( data, ), bcs: Issuer.bcs, fromJSONField: (field: any) => Issuer.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Issuer.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Issuer.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Issuer.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Issuer.fetch( client, id, ), new: ( fields: IssuerFields, ) => { return new Issuer( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Issuer.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Issuer>> { return phantom(Issuer.reified( )); } static get p() { return Issuer.phantom() }

 static get bcs() { return bcs.struct("Issuer", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): Issuer { return Issuer.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Issuer { if (!isIssuer(item.type)) { throw new Error("not a Issuer type");

 }

 return Issuer.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): Issuer { return Issuer.fromFields( Issuer.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Issuer { return Issuer.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): Issuer { if (json.$typeName !== Issuer.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Issuer.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Issuer { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isIssuer(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Issuer object`); } return Issuer.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Issuer { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isIssuer(data.bcs.type)) { throw new Error(`object at is not a Issuer object`); }

 return Issuer.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Issuer.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Issuer> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Issuer object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isIssuer(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Issuer object`); }

 return Issuer.fromSuiObjectData( res.data ); }

 }

/* ============================== ClaimCap =============================== */

export function isClaimCap(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::payments::ClaimCap`; }

export interface ClaimCapFields { id: ToField<UID>; streamId: ToField<ID> }

export type ClaimCapReified = Reified< ClaimCap, ClaimCapFields >;

export class ClaimCap implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::payments::ClaimCap`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ClaimCap.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::payments::ClaimCap`; readonly $typeArgs: []; readonly $isPhantom = ClaimCap.$isPhantom;

 readonly id: ToField<UID>; readonly streamId: ToField<ID>

 private constructor(typeArgs: [], fields: ClaimCapFields, ) { this.$fullTypeName = composeSuiType( ClaimCap.$typeName, ...typeArgs ) as `${typeof PKG_V1}::payments::ClaimCap`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.streamId = fields.streamId; }

 static reified( ): ClaimCapReified { return { typeName: ClaimCap.$typeName, fullTypeName: composeSuiType( ClaimCap.$typeName, ...[] ) as `${typeof PKG_V1}::payments::ClaimCap`, typeArgs: [ ] as [], isPhantom: ClaimCap.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ClaimCap.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ClaimCap.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ClaimCap.fromBcs( data, ), bcs: ClaimCap.bcs, fromJSONField: (field: any) => ClaimCap.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ClaimCap.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ClaimCap.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ClaimCap.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ClaimCap.fetch( client, id, ), new: ( fields: ClaimCapFields, ) => { return new ClaimCap( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ClaimCap.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ClaimCap>> { return phantom(ClaimCap.reified( )); } static get p() { return ClaimCap.phantom() }

 static get bcs() { return bcs.struct("ClaimCap", {

 id: UID.bcs, stream_id: ID.bcs

}) };

 static fromFields( fields: Record<string, any> ): ClaimCap { return ClaimCap.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), streamId: decodeFromFields(ID.reified(), fields.stream_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ClaimCap { if (!isClaimCap(item.type)) { throw new Error("not a ClaimCap type");

 }

 return ClaimCap.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), streamId: decodeFromFieldsWithTypes(ID.reified(), item.fields.stream_id) } ) }

 static fromBcs( data: Uint8Array ): ClaimCap { return ClaimCap.fromFields( ClaimCap.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,streamId: this.streamId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ClaimCap { return ClaimCap.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), streamId: decodeFromJSONField(ID.reified(), field.streamId) } ) }

 static fromJSON( json: Record<string, any> ): ClaimCap { if (json.$typeName !== ClaimCap.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ClaimCap.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ClaimCap { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isClaimCap(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ClaimCap object`); } return ClaimCap.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ClaimCap { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isClaimCap(data.bcs.type)) { throw new Error(`object at is not a ClaimCap object`); }

 return ClaimCap.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ClaimCap.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ClaimCap> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ClaimCap object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isClaimCap(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ClaimCap object`); }

 return ClaimCap.fromSuiObjectData( res.data ); }

 }

/* ============================== Pay =============================== */

export function isPay(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::payments::Pay`; }

export interface PayFields { amount: ToField<"u64">; interval: ToField<"u64">; recipient: ToField<"address"> }

export type PayReified = Reified< Pay, PayFields >;

export class Pay implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::payments::Pay`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Pay.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::payments::Pay`; readonly $typeArgs: []; readonly $isPhantom = Pay.$isPhantom;

 readonly amount: ToField<"u64">; readonly interval: ToField<"u64">; readonly recipient: ToField<"address">

 private constructor(typeArgs: [], fields: PayFields, ) { this.$fullTypeName = composeSuiType( Pay.$typeName, ...typeArgs ) as `${typeof PKG_V1}::payments::Pay`; this.$typeArgs = typeArgs;

 this.amount = fields.amount;; this.interval = fields.interval;; this.recipient = fields.recipient; }

 static reified( ): PayReified { return { typeName: Pay.$typeName, fullTypeName: composeSuiType( Pay.$typeName, ...[] ) as `${typeof PKG_V1}::payments::Pay`, typeArgs: [ ] as [], isPhantom: Pay.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Pay.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Pay.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Pay.fromBcs( data, ), bcs: Pay.bcs, fromJSONField: (field: any) => Pay.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Pay.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Pay.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Pay.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Pay.fetch( client, id, ), new: ( fields: PayFields, ) => { return new Pay( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Pay.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Pay>> { return phantom(Pay.reified( )); } static get p() { return Pay.phantom() }

 static get bcs() { return bcs.struct("Pay", {

 amount: bcs.u64(), interval: bcs.u64(), recipient: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields( fields: Record<string, any> ): Pay { return Pay.reified( ).new( { amount: decodeFromFields("u64", fields.amount), interval: decodeFromFields("u64", fields.interval), recipient: decodeFromFields("address", fields.recipient) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Pay { if (!isPay(item.type)) { throw new Error("not a Pay type");

 }

 return Pay.reified( ).new( { amount: decodeFromFieldsWithTypes("u64", item.fields.amount), interval: decodeFromFieldsWithTypes("u64", item.fields.interval), recipient: decodeFromFieldsWithTypes("address", item.fields.recipient) } ) }

 static fromBcs( data: Uint8Array ): Pay { return Pay.fromFields( Pay.bcs.parse(data) ) }

 toJSONField() { return {

 amount: this.amount.toString(),interval: this.interval.toString(),recipient: this.recipient,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Pay { return Pay.reified( ).new( { amount: decodeFromJSONField("u64", field.amount), interval: decodeFromJSONField("u64", field.interval), recipient: decodeFromJSONField("address", field.recipient) } ) }

 static fromJSON( json: Record<string, any> ): Pay { if (json.$typeName !== Pay.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Pay.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Pay { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isPay(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Pay object`); } return Pay.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Pay { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isPay(data.bcs.type)) { throw new Error(`object at is not a Pay object`); }

 return Pay.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Pay.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Pay> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Pay object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPay(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Pay object`); }

 return Pay.fromSuiObjectData( res.data ); }

 }

/* ============================== Stream =============================== */

export function isStream(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::payments::Stream` + '<'); }

export interface StreamFields<C extends PhantomTypeArgument> { id: ToField<UID>; balance: ToField<Balance<C>>; amount: ToField<"u64">; interval: ToField<"u64">; lastEpoch: ToField<"u64">; recipient: ToField<"address"> }

export type StreamReified<C extends PhantomTypeArgument> = Reified< Stream<C>, StreamFields<C> >;

export class Stream<C extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::payments::Stream`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Stream.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::payments::Stream<${PhantomToTypeStr<C>}>`; readonly $typeArgs: [PhantomToTypeStr<C>]; readonly $isPhantom = Stream.$isPhantom;

 readonly id: ToField<UID>; readonly balance: ToField<Balance<C>>; readonly amount: ToField<"u64">; readonly interval: ToField<"u64">; readonly lastEpoch: ToField<"u64">; readonly recipient: ToField<"address">

 private constructor(typeArgs: [PhantomToTypeStr<C>], fields: StreamFields<C>, ) { this.$fullTypeName = composeSuiType( Stream.$typeName, ...typeArgs ) as `${typeof PKG_V1}::payments::Stream<${PhantomToTypeStr<C>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.balance = fields.balance;; this.amount = fields.amount;; this.interval = fields.interval;; this.lastEpoch = fields.lastEpoch;; this.recipient = fields.recipient; }

 static reified<C extends PhantomReified<PhantomTypeArgument>>( C: C ): StreamReified<ToPhantomTypeArgument<C>> { return { typeName: Stream.$typeName, fullTypeName: composeSuiType( Stream.$typeName, ...[extractType(C)] ) as `${typeof PKG_V1}::payments::Stream<${PhantomToTypeStr<ToPhantomTypeArgument<C>>}>`, typeArgs: [ extractType(C) ] as [PhantomToTypeStr<ToPhantomTypeArgument<C>>], isPhantom: Stream.$isPhantom, reifiedTypeArgs: [C], fromFields: (fields: Record<string, any>) => Stream.fromFields( C, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Stream.fromFieldsWithTypes( C, item, ), fromBcs: (data: Uint8Array) => Stream.fromBcs( C, data, ), bcs: Stream.bcs, fromJSONField: (field: any) => Stream.fromJSONField( C, field, ), fromJSON: (json: Record<string, any>) => Stream.fromJSON( C, json, ), fromSuiParsedData: (content: SuiParsedData) => Stream.fromSuiParsedData( C, content, ), fromSuiObjectData: (content: SuiObjectData) => Stream.fromSuiObjectData( C, content, ), fetch: async (client: SuiClient, id: string) => Stream.fetch( client, C, id, ), new: ( fields: StreamFields<ToPhantomTypeArgument<C>>, ) => { return new Stream( [extractType(C)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Stream.reified }

 static phantom<C extends PhantomReified<PhantomTypeArgument>>( C: C ): PhantomReified<ToTypeStr<Stream<ToPhantomTypeArgument<C>>>> { return phantom(Stream.reified( C )); } static get p() { return Stream.phantom }

 static get bcs() { return bcs.struct("Stream", {

 id: UID.bcs, balance: Balance.bcs, amount: bcs.u64(), interval: bcs.u64(), last_epoch: bcs.u64(), recipient: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, fields: Record<string, any> ): Stream<ToPhantomTypeArgument<C>> { return Stream.reified( typeArg, ).new( { id: decodeFromFields(UID.reified(), fields.id), balance: decodeFromFields(Balance.reified(typeArg), fields.balance), amount: decodeFromFields("u64", fields.amount), interval: decodeFromFields("u64", fields.interval), lastEpoch: decodeFromFields("u64", fields.last_epoch), recipient: decodeFromFields("address", fields.recipient) } ) }

 static fromFieldsWithTypes<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, item: FieldsWithTypes ): Stream<ToPhantomTypeArgument<C>> { if (!isStream(item.type)) { throw new Error("not a Stream type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Stream.reified( typeArg, ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), balance: decodeFromFieldsWithTypes(Balance.reified(typeArg), item.fields.balance), amount: decodeFromFieldsWithTypes("u64", item.fields.amount), interval: decodeFromFieldsWithTypes("u64", item.fields.interval), lastEpoch: decodeFromFieldsWithTypes("u64", item.fields.last_epoch), recipient: decodeFromFieldsWithTypes("address", item.fields.recipient) } ) }

 static fromBcs<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, data: Uint8Array ): Stream<ToPhantomTypeArgument<C>> { return Stream.fromFields( typeArg, Stream.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,balance: this.balance.toJSONField(),amount: this.amount.toString(),interval: this.interval.toString(),lastEpoch: this.lastEpoch.toString(),recipient: this.recipient,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, field: any ): Stream<ToPhantomTypeArgument<C>> { return Stream.reified( typeArg, ).new( { id: decodeFromJSONField(UID.reified(), field.id), balance: decodeFromJSONField(Balance.reified(typeArg), field.balance), amount: decodeFromJSONField("u64", field.amount), interval: decodeFromJSONField("u64", field.interval), lastEpoch: decodeFromJSONField("u64", field.lastEpoch), recipient: decodeFromJSONField("address", field.recipient) } ) }

 static fromJSON<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, json: Record<string, any> ): Stream<ToPhantomTypeArgument<C>> { if (json.$typeName !== Stream.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Stream.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Stream.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, content: SuiParsedData ): Stream<ToPhantomTypeArgument<C>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isStream(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Stream object`); } return Stream.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, data: SuiObjectData ): Stream<ToPhantomTypeArgument<C>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isStream(data.bcs.type)) { throw new Error(`object at is not a Stream object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Stream.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Stream.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<C extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: C, id: string ): Promise<Stream<ToPhantomTypeArgument<C>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Stream object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isStream(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Stream object`); }

 return Stream.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== StreamCreated =============================== */

export function isStreamCreated(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::payments::StreamCreated`; }

export interface StreamCreatedFields { streamId: ToField<ID>; amount: ToField<"u64">; interval: ToField<"u64">; recipient: ToField<"address"> }

export type StreamCreatedReified = Reified< StreamCreated, StreamCreatedFields >;

export class StreamCreated implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::payments::StreamCreated`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = StreamCreated.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::payments::StreamCreated`; readonly $typeArgs: []; readonly $isPhantom = StreamCreated.$isPhantom;

 readonly streamId: ToField<ID>; readonly amount: ToField<"u64">; readonly interval: ToField<"u64">; readonly recipient: ToField<"address">

 private constructor(typeArgs: [], fields: StreamCreatedFields, ) { this.$fullTypeName = composeSuiType( StreamCreated.$typeName, ...typeArgs ) as `${typeof PKG_V1}::payments::StreamCreated`; this.$typeArgs = typeArgs;

 this.streamId = fields.streamId;; this.amount = fields.amount;; this.interval = fields.interval;; this.recipient = fields.recipient; }

 static reified( ): StreamCreatedReified { return { typeName: StreamCreated.$typeName, fullTypeName: composeSuiType( StreamCreated.$typeName, ...[] ) as `${typeof PKG_V1}::payments::StreamCreated`, typeArgs: [ ] as [], isPhantom: StreamCreated.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => StreamCreated.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => StreamCreated.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => StreamCreated.fromBcs( data, ), bcs: StreamCreated.bcs, fromJSONField: (field: any) => StreamCreated.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => StreamCreated.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => StreamCreated.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => StreamCreated.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => StreamCreated.fetch( client, id, ), new: ( fields: StreamCreatedFields, ) => { return new StreamCreated( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return StreamCreated.reified() }

 static phantom( ): PhantomReified<ToTypeStr<StreamCreated>> { return phantom(StreamCreated.reified( )); } static get p() { return StreamCreated.phantom() }

 static get bcs() { return bcs.struct("StreamCreated", {

 stream_id: ID.bcs, amount: bcs.u64(), interval: bcs.u64(), recipient: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields( fields: Record<string, any> ): StreamCreated { return StreamCreated.reified( ).new( { streamId: decodeFromFields(ID.reified(), fields.stream_id), amount: decodeFromFields("u64", fields.amount), interval: decodeFromFields("u64", fields.interval), recipient: decodeFromFields("address", fields.recipient) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): StreamCreated { if (!isStreamCreated(item.type)) { throw new Error("not a StreamCreated type");

 }

 return StreamCreated.reified( ).new( { streamId: decodeFromFieldsWithTypes(ID.reified(), item.fields.stream_id), amount: decodeFromFieldsWithTypes("u64", item.fields.amount), interval: decodeFromFieldsWithTypes("u64", item.fields.interval), recipient: decodeFromFieldsWithTypes("address", item.fields.recipient) } ) }

 static fromBcs( data: Uint8Array ): StreamCreated { return StreamCreated.fromFields( StreamCreated.bcs.parse(data) ) }

 toJSONField() { return {

 streamId: this.streamId,amount: this.amount.toString(),interval: this.interval.toString(),recipient: this.recipient,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): StreamCreated { return StreamCreated.reified( ).new( { streamId: decodeFromJSONField(ID.reified(), field.streamId), amount: decodeFromJSONField("u64", field.amount), interval: decodeFromJSONField("u64", field.interval), recipient: decodeFromJSONField("address", field.recipient) } ) }

 static fromJSON( json: Record<string, any> ): StreamCreated { if (json.$typeName !== StreamCreated.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return StreamCreated.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): StreamCreated { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isStreamCreated(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a StreamCreated object`); } return StreamCreated.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): StreamCreated { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isStreamCreated(data.bcs.type)) { throw new Error(`object at is not a StreamCreated object`); }

 return StreamCreated.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return StreamCreated.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<StreamCreated> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching StreamCreated object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isStreamCreated(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a StreamCreated object`); }

 return StreamCreated.fromSuiObjectData( res.data ); }

 }
