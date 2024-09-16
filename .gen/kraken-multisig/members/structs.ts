import * as reified from "../../_framework/reified";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {VecSet} from "../../_dependencies/source/0x2/vec-set/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {Vector} from "../../_framework/vector";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== Member =============================== */

export function isMember(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::members::Member`; }

export interface MemberFields { addr: ToField<"address">; weight: ToField<"u64">; accountId: ToField<Option<ID>>; roles: ToField<VecSet<String>> }

export type MemberReified = Reified< Member, MemberFields >;

export class Member implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::members::Member`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Member.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::members::Member`; readonly $typeArgs: []; readonly $isPhantom = Member.$isPhantom;

 readonly addr: ToField<"address">; readonly weight: ToField<"u64">; readonly accountId: ToField<Option<ID>>; readonly roles: ToField<VecSet<String>>

 private constructor(typeArgs: [], fields: MemberFields, ) { this.$fullTypeName = composeSuiType( Member.$typeName, ...typeArgs ) as `${typeof PKG_V1}::members::Member`; this.$typeArgs = typeArgs;

 this.addr = fields.addr;; this.weight = fields.weight;; this.accountId = fields.accountId;; this.roles = fields.roles; }

 static reified( ): MemberReified { return { typeName: Member.$typeName, fullTypeName: composeSuiType( Member.$typeName, ...[] ) as `${typeof PKG_V1}::members::Member`, typeArgs: [ ] as [], isPhantom: Member.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Member.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Member.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Member.fromBcs( data, ), bcs: Member.bcs, fromJSONField: (field: any) => Member.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Member.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Member.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Member.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Member.fetch( client, id, ), new: ( fields: MemberFields, ) => { return new Member( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Member.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Member>> { return phantom(Member.reified( )); } static get p() { return Member.phantom() }

 static get bcs() { return bcs.struct("Member", {

 addr: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), weight: bcs.u64(), account_id: Option.bcs(ID.bcs), roles: VecSet.bcs(String.bcs)

}) };

 static fromFields( fields: Record<string, any> ): Member { return Member.reified( ).new( { addr: decodeFromFields("address", fields.addr), weight: decodeFromFields("u64", fields.weight), accountId: decodeFromFields(Option.reified(ID.reified()), fields.account_id), roles: decodeFromFields(VecSet.reified(String.reified()), fields.roles) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Member { if (!isMember(item.type)) { throw new Error("not a Member type");

 }

 return Member.reified( ).new( { addr: decodeFromFieldsWithTypes("address", item.fields.addr), weight: decodeFromFieldsWithTypes("u64", item.fields.weight), accountId: decodeFromFieldsWithTypes(Option.reified(ID.reified()), item.fields.account_id), roles: decodeFromFieldsWithTypes(VecSet.reified(String.reified()), item.fields.roles) } ) }

 static fromBcs( data: Uint8Array ): Member { return Member.fromFields( Member.bcs.parse(data) ) }

 toJSONField() { return {

 addr: this.addr,weight: this.weight.toString(),accountId: fieldToJSON<Option<ID>>(`${Option.$typeName}<${ID.$typeName}>`, this.accountId),roles: this.roles.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Member { return Member.reified( ).new( { addr: decodeFromJSONField("address", field.addr), weight: decodeFromJSONField("u64", field.weight), accountId: decodeFromJSONField(Option.reified(ID.reified()), field.accountId), roles: decodeFromJSONField(VecSet.reified(String.reified()), field.roles) } ) }

 static fromJSON( json: Record<string, any> ): Member { if (json.$typeName !== Member.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Member.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Member { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMember(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Member object`); } return Member.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Member { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMember(data.bcs.type)) { throw new Error(`object at is not a Member object`); }

 return Member.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Member.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Member> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Member object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMember(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Member object`); }

 return Member.fromSuiObjectData( res.data ); }

 }

/* ============================== Members =============================== */

export function isMembers(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::members::Members`; }

export interface MembersFields { inner: ToField<Vector<Member>> }

export type MembersReified = Reified< Members, MembersFields >;

export class Members implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::members::Members`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Members.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::members::Members`; readonly $typeArgs: []; readonly $isPhantom = Members.$isPhantom;

 readonly inner: ToField<Vector<Member>>

 private constructor(typeArgs: [], fields: MembersFields, ) { this.$fullTypeName = composeSuiType( Members.$typeName, ...typeArgs ) as `${typeof PKG_V1}::members::Members`; this.$typeArgs = typeArgs;

 this.inner = fields.inner; }

 static reified( ): MembersReified { return { typeName: Members.$typeName, fullTypeName: composeSuiType( Members.$typeName, ...[] ) as `${typeof PKG_V1}::members::Members`, typeArgs: [ ] as [], isPhantom: Members.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Members.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Members.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Members.fromBcs( data, ), bcs: Members.bcs, fromJSONField: (field: any) => Members.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Members.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Members.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Members.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Members.fetch( client, id, ), new: ( fields: MembersFields, ) => { return new Members( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Members.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Members>> { return phantom(Members.reified( )); } static get p() { return Members.phantom() }

 static get bcs() { return bcs.struct("Members", {

 inner: bcs.vector(Member.bcs)

}) };

 static fromFields( fields: Record<string, any> ): Members { return Members.reified( ).new( { inner: decodeFromFields(reified.vector(Member.reified()), fields.inner) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Members { if (!isMembers(item.type)) { throw new Error("not a Members type");

 }

 return Members.reified( ).new( { inner: decodeFromFieldsWithTypes(reified.vector(Member.reified()), item.fields.inner) } ) }

 static fromBcs( data: Uint8Array ): Members { return Members.fromFields( Members.bcs.parse(data) ) }

 toJSONField() { return {

 inner: fieldToJSON<Vector<Member>>(`vector<${Member.$typeName}>`, this.inner),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Members { return Members.reified( ).new( { inner: decodeFromJSONField(reified.vector(Member.reified()), field.inner) } ) }

 static fromJSON( json: Record<string, any> ): Members { if (json.$typeName !== Members.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Members.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Members { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMembers(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Members object`); } return Members.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Members { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMembers(data.bcs.type)) { throw new Error(`object at is not a Members object`); }

 return Members.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Members.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Members> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Members object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMembers(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Members object`); }

 return Members.fromSuiObjectData( res.data ); }

 }
