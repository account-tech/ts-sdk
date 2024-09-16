import * as reified from "../../_framework/reified";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {Vector} from "../../_framework/vector";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== Role =============================== */

export function isRole(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::thresholds::Role`; }

export interface RoleFields { name: ToField<String>; threshold: ToField<"u64"> }

export type RoleReified = Reified< Role, RoleFields >;

export class Role implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::thresholds::Role`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Role.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::thresholds::Role`; readonly $typeArgs: []; readonly $isPhantom = Role.$isPhantom;

 readonly name: ToField<String>; readonly threshold: ToField<"u64">

 private constructor(typeArgs: [], fields: RoleFields, ) { this.$fullTypeName = composeSuiType( Role.$typeName, ...typeArgs ) as `${typeof PKG_V1}::thresholds::Role`; this.$typeArgs = typeArgs;

 this.name = fields.name;; this.threshold = fields.threshold; }

 static reified( ): RoleReified { return { typeName: Role.$typeName, fullTypeName: composeSuiType( Role.$typeName, ...[] ) as `${typeof PKG_V1}::thresholds::Role`, typeArgs: [ ] as [], isPhantom: Role.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Role.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Role.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Role.fromBcs( data, ), bcs: Role.bcs, fromJSONField: (field: any) => Role.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Role.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Role.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Role.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Role.fetch( client, id, ), new: ( fields: RoleFields, ) => { return new Role( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Role.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Role>> { return phantom(Role.reified( )); } static get p() { return Role.phantom() }

 static get bcs() { return bcs.struct("Role", {

 name: String.bcs, threshold: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): Role { return Role.reified( ).new( { name: decodeFromFields(String.reified(), fields.name), threshold: decodeFromFields("u64", fields.threshold) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Role { if (!isRole(item.type)) { throw new Error("not a Role type");

 }

 return Role.reified( ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), threshold: decodeFromFieldsWithTypes("u64", item.fields.threshold) } ) }

 static fromBcs( data: Uint8Array ): Role { return Role.fromFields( Role.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,threshold: this.threshold.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Role { return Role.reified( ).new( { name: decodeFromJSONField(String.reified(), field.name), threshold: decodeFromJSONField("u64", field.threshold) } ) }

 static fromJSON( json: Record<string, any> ): Role { if (json.$typeName !== Role.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Role.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Role { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isRole(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Role object`); } return Role.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Role { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isRole(data.bcs.type)) { throw new Error(`object at is not a Role object`); }

 return Role.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Role.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Role> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Role object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isRole(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Role object`); }

 return Role.fromSuiObjectData( res.data ); }

 }

/* ============================== Thresholds =============================== */

export function isThresholds(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::thresholds::Thresholds`; }

export interface ThresholdsFields { global: ToField<"u64">; roles: ToField<Vector<Role>> }

export type ThresholdsReified = Reified< Thresholds, ThresholdsFields >;

export class Thresholds implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::thresholds::Thresholds`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Thresholds.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::thresholds::Thresholds`; readonly $typeArgs: []; readonly $isPhantom = Thresholds.$isPhantom;

 readonly global: ToField<"u64">; readonly roles: ToField<Vector<Role>>

 private constructor(typeArgs: [], fields: ThresholdsFields, ) { this.$fullTypeName = composeSuiType( Thresholds.$typeName, ...typeArgs ) as `${typeof PKG_V1}::thresholds::Thresholds`; this.$typeArgs = typeArgs;

 this.global = fields.global;; this.roles = fields.roles; }

 static reified( ): ThresholdsReified { return { typeName: Thresholds.$typeName, fullTypeName: composeSuiType( Thresholds.$typeName, ...[] ) as `${typeof PKG_V1}::thresholds::Thresholds`, typeArgs: [ ] as [], isPhantom: Thresholds.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Thresholds.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Thresholds.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Thresholds.fromBcs( data, ), bcs: Thresholds.bcs, fromJSONField: (field: any) => Thresholds.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Thresholds.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Thresholds.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Thresholds.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Thresholds.fetch( client, id, ), new: ( fields: ThresholdsFields, ) => { return new Thresholds( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Thresholds.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Thresholds>> { return phantom(Thresholds.reified( )); } static get p() { return Thresholds.phantom() }

 static get bcs() { return bcs.struct("Thresholds", {

 global: bcs.u64(), roles: bcs.vector(Role.bcs)

}) };

 static fromFields( fields: Record<string, any> ): Thresholds { return Thresholds.reified( ).new( { global: decodeFromFields("u64", fields.global), roles: decodeFromFields(reified.vector(Role.reified()), fields.roles) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Thresholds { if (!isThresholds(item.type)) { throw new Error("not a Thresholds type");

 }

 return Thresholds.reified( ).new( { global: decodeFromFieldsWithTypes("u64", item.fields.global), roles: decodeFromFieldsWithTypes(reified.vector(Role.reified()), item.fields.roles) } ) }

 static fromBcs( data: Uint8Array ): Thresholds { return Thresholds.fromFields( Thresholds.bcs.parse(data) ) }

 toJSONField() { return {

 global: this.global.toString(),roles: fieldToJSON<Vector<Role>>(`vector<${Role.$typeName}>`, this.roles),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Thresholds { return Thresholds.reified( ).new( { global: decodeFromJSONField("u64", field.global), roles: decodeFromJSONField(reified.vector(Role.reified()), field.roles) } ) }

 static fromJSON( json: Record<string, any> ): Thresholds { if (json.$typeName !== Thresholds.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Thresholds.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Thresholds { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isThresholds(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Thresholds object`); } return Thresholds.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Thresholds { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isThresholds(data.bcs.type)) { throw new Error(`object at is not a Thresholds object`); }

 return Thresholds.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Thresholds.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Thresholds> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Thresholds object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isThresholds(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Thresholds object`); }

 return Thresholds.fromSuiObjectData( res.data ); }

 }
