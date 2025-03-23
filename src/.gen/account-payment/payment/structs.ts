import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {VecMap} from "../../_dependencies/source/0x2/vec-map/structs";
import {VecSet} from "../../_dependencies/source/0x2/vec-set/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== ConfigWitness =============================== */

export function isConfigWitness(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::payment::ConfigWitness`; }

export interface ConfigWitnessFields { dummyField: ToField<"bool"> }

export type ConfigWitnessReified = Reified< ConfigWitness, ConfigWitnessFields >;

export class ConfigWitness implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::payment::ConfigWitness`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ConfigWitness.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::payment::ConfigWitness`; readonly $typeArgs: []; readonly $isPhantom = ConfigWitness.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: ConfigWitnessFields, ) { this.$fullTypeName = composeSuiType( ConfigWitness.$typeName, ...typeArgs ) as `${typeof PKG_V1}::payment::ConfigWitness`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): ConfigWitnessReified { return { typeName: ConfigWitness.$typeName, fullTypeName: composeSuiType( ConfigWitness.$typeName, ...[] ) as `${typeof PKG_V1}::payment::ConfigWitness`, typeArgs: [ ] as [], isPhantom: ConfigWitness.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ConfigWitness.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigWitness.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ConfigWitness.fromBcs( data, ), bcs: ConfigWitness.bcs, fromJSONField: (field: any) => ConfigWitness.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ConfigWitness.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ConfigWitness.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ConfigWitness.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ConfigWitness.fetch( client, id, ), new: ( fields: ConfigWitnessFields, ) => { return new ConfigWitness( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ConfigWitness.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ConfigWitness>> { return phantom(ConfigWitness.reified( )); } static get p() { return ConfigWitness.phantom() }

 static get bcs() { return bcs.struct("ConfigWitness", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): ConfigWitness { return ConfigWitness.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ConfigWitness { if (!isConfigWitness(item.type)) { throw new Error("not a ConfigWitness type");

 }

 return ConfigWitness.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): ConfigWitness { return ConfigWitness.fromFields( ConfigWitness.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ConfigWitness { return ConfigWitness.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): ConfigWitness { if (json.$typeName !== ConfigWitness.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ConfigWitness.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ConfigWitness { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfigWitness(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ConfigWitness object`); } return ConfigWitness.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ConfigWitness { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isConfigWitness(data.bcs.type)) { throw new Error(`object at is not a ConfigWitness object`); }

 return ConfigWitness.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ConfigWitness.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ConfigWitness> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ConfigWitness object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfigWitness(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ConfigWitness object`); }

 return ConfigWitness.fromSuiObjectData( res.data ); }

 }

/* ============================== Payment =============================== */

export function isPayment(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::payment::Payment`; }

export interface PaymentFields { members: ToField<VecMap<"address", VecSet<String>>> }

export type PaymentReified = Reified< Payment, PaymentFields >;

export class Payment implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::payment::Payment`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Payment.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::payment::Payment`; readonly $typeArgs: []; readonly $isPhantom = Payment.$isPhantom;

 readonly members: ToField<VecMap<"address", VecSet<String>>>

 private constructor(typeArgs: [], fields: PaymentFields, ) { this.$fullTypeName = composeSuiType( Payment.$typeName, ...typeArgs ) as `${typeof PKG_V1}::payment::Payment`; this.$typeArgs = typeArgs;

 this.members = fields.members; }

 static reified( ): PaymentReified { return { typeName: Payment.$typeName, fullTypeName: composeSuiType( Payment.$typeName, ...[] ) as `${typeof PKG_V1}::payment::Payment`, typeArgs: [ ] as [], isPhantom: Payment.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Payment.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Payment.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Payment.fromBcs( data, ), bcs: Payment.bcs, fromJSONField: (field: any) => Payment.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Payment.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Payment.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Payment.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Payment.fetch( client, id, ), new: ( fields: PaymentFields, ) => { return new Payment( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Payment.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Payment>> { return phantom(Payment.reified( )); } static get p() { return Payment.phantom() }

 static get bcs() { return bcs.struct("Payment", {

 members: VecMap.bcs(bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), VecSet.bcs(String.bcs))

}) };

 static fromFields( fields: Record<string, any> ): Payment { return Payment.reified( ).new( { members: decodeFromFields(VecMap.reified("address", VecSet.reified(String.reified())), fields.members) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Payment { if (!isPayment(item.type)) { throw new Error("not a Payment type");

 }

 return Payment.reified( ).new( { members: decodeFromFieldsWithTypes(VecMap.reified("address", VecSet.reified(String.reified())), item.fields.members) } ) }

 static fromBcs( data: Uint8Array ): Payment { return Payment.fromFields( Payment.bcs.parse(data) ) }

 toJSONField() { return {

 members: this.members.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Payment { return Payment.reified( ).new( { members: decodeFromJSONField(VecMap.reified("address", VecSet.reified(String.reified())), field.members) } ) }

 static fromJSON( json: Record<string, any> ): Payment { if (json.$typeName !== Payment.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Payment.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Payment { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isPayment(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Payment object`); } return Payment.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Payment { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isPayment(data.bcs.type)) { throw new Error(`object at is not a Payment object`); }

 return Payment.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Payment.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Payment> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Payment object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPayment(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Payment object`); }

 return Payment.fromSuiObjectData( res.data ); }

 }

/* ============================== Pending =============================== */

export function isPending(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::payment::Pending`; }

export interface PendingFields { approvedBy: ToField<Option<"address">> }

export type PendingReified = Reified< Pending, PendingFields >;

export class Pending implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::payment::Pending`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Pending.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::payment::Pending`; readonly $typeArgs: []; readonly $isPhantom = Pending.$isPhantom;

 readonly approvedBy: ToField<Option<"address">>

 private constructor(typeArgs: [], fields: PendingFields, ) { this.$fullTypeName = composeSuiType( Pending.$typeName, ...typeArgs ) as `${typeof PKG_V1}::payment::Pending`; this.$typeArgs = typeArgs;

 this.approvedBy = fields.approvedBy; }

 static reified( ): PendingReified { return { typeName: Pending.$typeName, fullTypeName: composeSuiType( Pending.$typeName, ...[] ) as `${typeof PKG_V1}::payment::Pending`, typeArgs: [ ] as [], isPhantom: Pending.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Pending.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Pending.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Pending.fromBcs( data, ), bcs: Pending.bcs, fromJSONField: (field: any) => Pending.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Pending.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Pending.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Pending.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Pending.fetch( client, id, ), new: ( fields: PendingFields, ) => { return new Pending( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Pending.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Pending>> { return phantom(Pending.reified( )); } static get p() { return Pending.phantom() }

 static get bcs() { return bcs.struct("Pending", {

 approved_by: Option.bcs(bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }))

}) };

 static fromFields( fields: Record<string, any> ): Pending { return Pending.reified( ).new( { approvedBy: decodeFromFields(Option.reified("address"), fields.approved_by) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Pending { if (!isPending(item.type)) { throw new Error("not a Pending type");

 }

 return Pending.reified( ).new( { approvedBy: decodeFromFieldsWithTypes(Option.reified("address"), item.fields.approved_by) } ) }

 static fromBcs( data: Uint8Array ): Pending { return Pending.fromFields( Pending.bcs.parse(data) ) }

 toJSONField() { return {

 approvedBy: fieldToJSON<Option<"address">>(`${Option.$typeName}<address>`, this.approvedBy),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Pending { return Pending.reified( ).new( { approvedBy: decodeFromJSONField(Option.reified("address"), field.approvedBy) } ) }

 static fromJSON( json: Record<string, any> ): Pending { if (json.$typeName !== Pending.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Pending.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Pending { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isPending(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Pending object`); } return Pending.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Pending { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isPending(data.bcs.type)) { throw new Error(`object at is not a Pending object`); }

 return Pending.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Pending.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Pending> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Pending object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPending(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Pending object`); }

 return Pending.fromSuiObjectData( res.data ); }

 }
