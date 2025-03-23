import {UID} from "../../_dependencies/source/0x2/object/structs";
import {VecMap} from "../../_dependencies/source/0x2/vec-map/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::fees::AdminCap`; }

export interface AdminCapFields { id: ToField<UID> }

export type AdminCapReified = Reified< AdminCap, AdminCapFields >;

export class AdminCap implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::fees::AdminCap`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = AdminCap.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::fees::AdminCap`; readonly $typeArgs: []; readonly $isPhantom = AdminCap.$isPhantom;

 readonly id: ToField<UID>

 private constructor(typeArgs: [], fields: AdminCapFields, ) { this.$fullTypeName = composeSuiType( AdminCap.$typeName, ...typeArgs ) as `${typeof PKG_V1}::fees::AdminCap`; this.$typeArgs = typeArgs;

 this.id = fields.id; }

 static reified( ): AdminCapReified { return { typeName: AdminCap.$typeName, fullTypeName: composeSuiType( AdminCap.$typeName, ...[] ) as `${typeof PKG_V1}::fees::AdminCap`, typeArgs: [ ] as [], isPhantom: AdminCap.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => AdminCap.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AdminCap.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => AdminCap.fromBcs( data, ), bcs: AdminCap.bcs, fromJSONField: (field: any) => AdminCap.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => AdminCap.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => AdminCap.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => AdminCap.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => AdminCap.fetch( client, id, ), new: ( fields: AdminCapFields, ) => { return new AdminCap( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return AdminCap.reified() }

 static phantom( ): PhantomReified<ToTypeStr<AdminCap>> { return phantom(AdminCap.reified( )); } static get p() { return AdminCap.phantom() }

 static get bcs() { return bcs.struct("AdminCap", {

 id: UID.bcs

}) };

 static fromFields( fields: Record<string, any> ): AdminCap { return AdminCap.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): AdminCap { if (!isAdminCap(item.type)) { throw new Error("not a AdminCap type");

 }

 return AdminCap.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id) } ) }

 static fromBcs( data: Uint8Array ): AdminCap { return AdminCap.fromFields( AdminCap.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): AdminCap { return AdminCap.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id) } ) }

 static fromJSON( json: Record<string, any> ): AdminCap { if (json.$typeName !== AdminCap.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return AdminCap.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): AdminCap { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAdminCap(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a AdminCap object`); } return AdminCap.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): AdminCap { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isAdminCap(data.bcs.type)) { throw new Error(`object at is not a AdminCap object`); }

 return AdminCap.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return AdminCap.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<AdminCap> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching AdminCap object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAdminCap(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a AdminCap object`); }

 return AdminCap.fromSuiObjectData( res.data ); }

 }

/* ============================== Fees =============================== */

export function isFees(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::fees::Fees`; }

export interface FeesFields { id: ToField<UID>; inner: ToField<VecMap<"address", "u64">> }

export type FeesReified = Reified< Fees, FeesFields >;

export class Fees implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::fees::Fees`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Fees.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::fees::Fees`; readonly $typeArgs: []; readonly $isPhantom = Fees.$isPhantom;

 readonly id: ToField<UID>; readonly inner: ToField<VecMap<"address", "u64">>

 private constructor(typeArgs: [], fields: FeesFields, ) { this.$fullTypeName = composeSuiType( Fees.$typeName, ...typeArgs ) as `${typeof PKG_V1}::fees::Fees`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.inner = fields.inner; }

 static reified( ): FeesReified { return { typeName: Fees.$typeName, fullTypeName: composeSuiType( Fees.$typeName, ...[] ) as `${typeof PKG_V1}::fees::Fees`, typeArgs: [ ] as [], isPhantom: Fees.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Fees.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Fees.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Fees.fromBcs( data, ), bcs: Fees.bcs, fromJSONField: (field: any) => Fees.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Fees.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Fees.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Fees.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Fees.fetch( client, id, ), new: ( fields: FeesFields, ) => { return new Fees( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Fees.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Fees>> { return phantom(Fees.reified( )); } static get p() { return Fees.phantom() }

 static get bcs() { return bcs.struct("Fees", {

 id: UID.bcs, inner: VecMap.bcs(bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), bcs.u64())

}) };

 static fromFields( fields: Record<string, any> ): Fees { return Fees.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), inner: decodeFromFields(VecMap.reified("address", "u64"), fields.inner) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Fees { if (!isFees(item.type)) { throw new Error("not a Fees type");

 }

 return Fees.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), inner: decodeFromFieldsWithTypes(VecMap.reified("address", "u64"), item.fields.inner) } ) }

 static fromBcs( data: Uint8Array ): Fees { return Fees.fromFields( Fees.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,inner: this.inner.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Fees { return Fees.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), inner: decodeFromJSONField(VecMap.reified("address", "u64"), field.inner) } ) }

 static fromJSON( json: Record<string, any> ): Fees { if (json.$typeName !== Fees.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Fees.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Fees { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isFees(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Fees object`); } return Fees.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Fees { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isFees(data.bcs.type)) { throw new Error(`object at is not a Fees object`); }

 return Fees.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Fees.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Fees> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Fees object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isFees(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Fees object`); }

 return Fees.fromSuiObjectData( res.data ); }

 }
