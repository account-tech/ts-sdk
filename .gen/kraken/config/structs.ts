import * as reified from "../../_framework/reified";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, Vector, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {bcs, fromB64, fromHEX, toHEX} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui.js/client";

/* ============================== Witness =============================== */

export function isWitness(type: string): boolean { type = compressSuiType(type); return type === "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::config::Witness"; }

export interface WitnessFields { dummyField: ToField<"bool"> }

export type WitnessReified = Reified< Witness, WitnessFields >;

export class Witness implements StructClass { static readonly $typeName = "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::config::Witness"; static readonly $numTypeParams = 0;

 readonly $typeName = Witness.$typeName;

 readonly $fullTypeName: "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::config::Witness";

 readonly $typeArgs: [];

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: WitnessFields, ) { this.$fullTypeName = composeSuiType( Witness.$typeName, ...typeArgs ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::config::Witness"; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): WitnessReified { return { typeName: Witness.$typeName, fullTypeName: composeSuiType( Witness.$typeName, ...[] ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::config::Witness", typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Witness.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Witness.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Witness.fromBcs( data, ), bcs: Witness.bcs, fromJSONField: (field: any) => Witness.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Witness.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Witness.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Witness.fetch( client, id, ), new: ( fields: WitnessFields, ) => { return new Witness( [], fields ) }, kind: "StructClassReified", } }

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

/* ============================== Migrate =============================== */

export function isMigrate(type: string): boolean { type = compressSuiType(type); return type === "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::config::Migrate"; }

export interface MigrateFields { version: ToField<"u64"> }

export type MigrateReified = Reified< Migrate, MigrateFields >;

export class Migrate implements StructClass { static readonly $typeName = "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::config::Migrate"; static readonly $numTypeParams = 0;

 readonly $typeName = Migrate.$typeName;

 readonly $fullTypeName: "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::config::Migrate";

 readonly $typeArgs: [];

 readonly version: ToField<"u64">

 private constructor(typeArgs: [], fields: MigrateFields, ) { this.$fullTypeName = composeSuiType( Migrate.$typeName, ...typeArgs ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::config::Migrate"; this.$typeArgs = typeArgs;

 this.version = fields.version; }

 static reified( ): MigrateReified { return { typeName: Migrate.$typeName, fullTypeName: composeSuiType( Migrate.$typeName, ...[] ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::config::Migrate", typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Migrate.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Migrate.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Migrate.fromBcs( data, ), bcs: Migrate.bcs, fromJSONField: (field: any) => Migrate.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Migrate.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Migrate.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Migrate.fetch( client, id, ), new: ( fields: MigrateFields, ) => { return new Migrate( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Migrate.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Migrate>> { return phantom(Migrate.reified( )); } static get p() { return Migrate.phantom() }

 static get bcs() { return bcs.struct("Migrate", {

 version: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): Migrate { return Migrate.reified( ).new( { version: decodeFromFields("u64", fields.version) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Migrate { if (!isMigrate(item.type)) { throw new Error("not a Migrate type");

 }

 return Migrate.reified( ).new( { version: decodeFromFieldsWithTypes("u64", item.fields.version) } ) }

 static fromBcs( data: Uint8Array ): Migrate { return Migrate.fromFields( Migrate.bcs.parse(data) ) }

 toJSONField() { return {

 version: this.version.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Migrate { return Migrate.reified( ).new( { version: decodeFromJSONField("u64", field.version) } ) }

 static fromJSON( json: Record<string, any> ): Migrate { if (json.$typeName !== Migrate.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Migrate.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Migrate { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMigrate(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Migrate object`); } return Migrate.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Migrate> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Migrate object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMigrate(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Migrate object`); }
 return Migrate.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Modify =============================== */

export function isModify(type: string): boolean { type = compressSuiType(type); return type === "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::config::Modify"; }

export interface ModifyFields { name: ToField<Option<String>>; threshold: ToField<Option<"u64">>; toRemove: ToField<Vector<"address">>; toAdd: ToField<Vector<"address">>; weights: ToField<Vector<"u64">> }

export type ModifyReified = Reified< Modify, ModifyFields >;

export class Modify implements StructClass { static readonly $typeName = "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::config::Modify"; static readonly $numTypeParams = 0;

 readonly $typeName = Modify.$typeName;

 readonly $fullTypeName: "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::config::Modify";

 readonly $typeArgs: [];

 readonly name: ToField<Option<String>>; readonly threshold: ToField<Option<"u64">>; readonly toRemove: ToField<Vector<"address">>; readonly toAdd: ToField<Vector<"address">>; readonly weights: ToField<Vector<"u64">>

 private constructor(typeArgs: [], fields: ModifyFields, ) { this.$fullTypeName = composeSuiType( Modify.$typeName, ...typeArgs ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::config::Modify"; this.$typeArgs = typeArgs;

 this.name = fields.name;; this.threshold = fields.threshold;; this.toRemove = fields.toRemove;; this.toAdd = fields.toAdd;; this.weights = fields.weights; }

 static reified( ): ModifyReified { return { typeName: Modify.$typeName, fullTypeName: composeSuiType( Modify.$typeName, ...[] ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::config::Modify", typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Modify.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Modify.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Modify.fromBcs( data, ), bcs: Modify.bcs, fromJSONField: (field: any) => Modify.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Modify.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Modify.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Modify.fetch( client, id, ), new: ( fields: ModifyFields, ) => { return new Modify( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Modify.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Modify>> { return phantom(Modify.reified( )); } static get p() { return Modify.phantom() }

 static get bcs() { return bcs.struct("Modify", {

 name: Option.bcs(String.bcs), threshold: Option.bcs(bcs.u64()), to_remove: bcs.vector(bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })), to_add: bcs.vector(bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })), weights: bcs.vector(bcs.u64())

}) };

 static fromFields( fields: Record<string, any> ): Modify { return Modify.reified( ).new( { name: decodeFromFields(Option.reified(String.reified()), fields.name), threshold: decodeFromFields(Option.reified("u64"), fields.threshold), toRemove: decodeFromFields(reified.vector("address"), fields.to_remove), toAdd: decodeFromFields(reified.vector("address"), fields.to_add), weights: decodeFromFields(reified.vector("u64"), fields.weights) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Modify { if (!isModify(item.type)) { throw new Error("not a Modify type");

 }

 return Modify.reified( ).new( { name: decodeFromFieldsWithTypes(Option.reified(String.reified()), item.fields.name), threshold: decodeFromFieldsWithTypes(Option.reified("u64"), item.fields.threshold), toRemove: decodeFromFieldsWithTypes(reified.vector("address"), item.fields.to_remove), toAdd: decodeFromFieldsWithTypes(reified.vector("address"), item.fields.to_add), weights: decodeFromFieldsWithTypes(reified.vector("u64"), item.fields.weights) } ) }

 static fromBcs( data: Uint8Array ): Modify { return Modify.fromFields( Modify.bcs.parse(data) ) }

 toJSONField() { return {

 name: fieldToJSON<Option<String>>(`0x1::option::Option<0x1::string::String>`, this.name),threshold: fieldToJSON<Option<"u64">>(`0x1::option::Option<u64>`, this.threshold),toRemove: fieldToJSON<Vector<"address">>(`vector<address>`, this.toRemove),toAdd: fieldToJSON<Vector<"address">>(`vector<address>`, this.toAdd),weights: fieldToJSON<Vector<"u64">>(`vector<u64>`, this.weights),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Modify { return Modify.reified( ).new( { name: decodeFromJSONField(Option.reified(String.reified()), field.name), threshold: decodeFromJSONField(Option.reified("u64"), field.threshold), toRemove: decodeFromJSONField(reified.vector("address"), field.toRemove), toAdd: decodeFromJSONField(reified.vector("address"), field.toAdd), weights: decodeFromJSONField(reified.vector("u64"), field.weights) } ) }

 static fromJSON( json: Record<string, any> ): Modify { if (json.$typeName !== Modify.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Modify.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Modify { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isModify(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Modify object`); } return Modify.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Modify> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Modify object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isModify(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Modify object`); }
 return Modify.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
