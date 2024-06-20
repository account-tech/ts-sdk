import {Balance} from "../../_dependencies/source/0x2/balance/structs";
import {UID} from "../../_dependencies/source/0x2/object/structs";
import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {bcs, fromB64, fromHEX, toHEX} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui.js/client";

/* ============================== Witness =============================== */

export function isWitness(type: string): boolean { type = compressSuiType(type); return type === "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::payments::Witness"; }

export interface WitnessFields { dummyField: ToField<"bool"> }

export type WitnessReified = Reified< Witness, WitnessFields >;

export class Witness implements StructClass { static readonly $typeName = "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::payments::Witness"; static readonly $numTypeParams = 0;

 readonly $typeName = Witness.$typeName;

 readonly $fullTypeName: "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::payments::Witness";

 readonly $typeArgs: [];

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: WitnessFields, ) { this.$fullTypeName = composeSuiType( Witness.$typeName, ...typeArgs ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::payments::Witness"; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): WitnessReified { return { typeName: Witness.$typeName, fullTypeName: composeSuiType( Witness.$typeName, ...[] ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::payments::Witness", typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Witness.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Witness.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Witness.fromBcs( data, ), bcs: Witness.bcs, fromJSONField: (field: any) => Witness.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Witness.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Witness.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Witness.fetch( client, id, ), new: ( fields: WitnessFields, ) => { return new Witness( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Witness.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Witness>> { return phantom(Witness.reified( )); } static get p() { return Witness.phantom() }

 static get bcs() { return bcs.struct("Witness", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): Witness { return Witness.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Witness { if (!isWitness(item.type)) { throw new Error("not a Witness type");

 }

 return Witness.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): Witness { return Witness.fromFields( Witness.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Witness { return Witness.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): Witness { if (json.$typeName !== Witness.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Witness.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Witness { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWitness(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Witness object`); } return Witness.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Witness> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Witness object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWitness(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Witness object`); }
 return Witness.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Pay =============================== */

export function isPay(type: string): boolean { type = compressSuiType(type); return type === "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::payments::Pay"; }

export interface PayFields { amount: ToField<"u64">; interval: ToField<"u64">; recipient: ToField<"address"> }

export type PayReified = Reified< Pay, PayFields >;

export class Pay implements StructClass { static readonly $typeName = "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::payments::Pay"; static readonly $numTypeParams = 0;

 readonly $typeName = Pay.$typeName;

 readonly $fullTypeName: "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::payments::Pay";

 readonly $typeArgs: [];

 readonly amount: ToField<"u64">; readonly interval: ToField<"u64">; readonly recipient: ToField<"address">

 private constructor(typeArgs: [], fields: PayFields, ) { this.$fullTypeName = composeSuiType( Pay.$typeName, ...typeArgs ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::payments::Pay"; this.$typeArgs = typeArgs;

 this.amount = fields.amount;; this.interval = fields.interval;; this.recipient = fields.recipient; }

 static reified( ): PayReified { return { typeName: Pay.$typeName, fullTypeName: composeSuiType( Pay.$typeName, ...[] ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::payments::Pay", typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Pay.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Pay.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Pay.fromBcs( data, ), bcs: Pay.bcs, fromJSONField: (field: any) => Pay.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Pay.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Pay.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Pay.fetch( client, id, ), new: ( fields: PayFields, ) => { return new Pay( [], fields ) }, kind: "StructClassReified", } }

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

 static async fetch( client: SuiClient, id: string ): Promise<Pay> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Pay object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPay(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Pay object`); }
 return Pay.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Stream =============================== */

export function isStream(type: string): boolean { type = compressSuiType(type); return type.startsWith("0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::payments::Stream<"); }

export interface StreamFields<C extends PhantomTypeArgument> { id: ToField<UID>; balance: ToField<Balance<C>>; amount: ToField<"u64">; interval: ToField<"u64">; lastEpoch: ToField<"u64">; recipient: ToField<"address"> }

export type StreamReified<C extends PhantomTypeArgument> = Reified< Stream<C>, StreamFields<C> >;

export class Stream<C extends PhantomTypeArgument> implements StructClass { static readonly $typeName = "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::payments::Stream"; static readonly $numTypeParams = 1;

 readonly $typeName = Stream.$typeName;

 readonly $fullTypeName: `0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::payments::Stream<${PhantomToTypeStr<C>}>`;

 readonly $typeArgs: [PhantomToTypeStr<C>];

 readonly id: ToField<UID>; readonly balance: ToField<Balance<C>>; readonly amount: ToField<"u64">; readonly interval: ToField<"u64">; readonly lastEpoch: ToField<"u64">; readonly recipient: ToField<"address">

 private constructor(typeArgs: [PhantomToTypeStr<C>], fields: StreamFields<C>, ) { this.$fullTypeName = composeSuiType( Stream.$typeName, ...typeArgs ) as `0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::payments::Stream<${PhantomToTypeStr<C>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.balance = fields.balance;; this.amount = fields.amount;; this.interval = fields.interval;; this.lastEpoch = fields.lastEpoch;; this.recipient = fields.recipient; }

 static reified<C extends PhantomReified<PhantomTypeArgument>>( C: C ): StreamReified<ToPhantomTypeArgument<C>> { return { typeName: Stream.$typeName, fullTypeName: composeSuiType( Stream.$typeName, ...[extractType(C)] ) as `0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::payments::Stream<${PhantomToTypeStr<ToPhantomTypeArgument<C>>}>`, typeArgs: [ extractType(C) ] as [PhantomToTypeStr<ToPhantomTypeArgument<C>>], reifiedTypeArgs: [C], fromFields: (fields: Record<string, any>) => Stream.fromFields( C, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Stream.fromFieldsWithTypes( C, item, ), fromBcs: (data: Uint8Array) => Stream.fromBcs( C, data, ), bcs: Stream.bcs, fromJSONField: (field: any) => Stream.fromJSONField( C, field, ), fromJSON: (json: Record<string, any>) => Stream.fromJSON( C, json, ), fromSuiParsedData: (content: SuiParsedData) => Stream.fromSuiParsedData( C, content, ), fetch: async (client: SuiClient, id: string) => Stream.fetch( client, C, id, ), new: ( fields: StreamFields<ToPhantomTypeArgument<C>>, ) => { return new Stream( [extractType(C)], fields ) }, kind: "StructClassReified", } }

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

 static async fetch<C extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: C, id: string ): Promise<Stream<ToPhantomTypeArgument<C>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Stream object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isStream(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Stream object`); }
 return Stream.fromBcs( typeArg, fromB64(res.data.bcs.bcsBytes) ); }

 }
