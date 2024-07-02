import * as reified from "../../_framework/reified";
import {KioskOwnerCap} from "../../_dependencies/source/0x2/kiosk/structs";
import {ID, UID} from "../../_dependencies/source/0x2/object/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, Vector, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs, fromB64, fromHEX, toHEX} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== Witness =============================== */

export function isWitness(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::Witness`; }

export interface WitnessFields { dummyField: ToField<"bool"> }

export type WitnessReified = Reified< Witness, WitnessFields >;

export class Witness implements StructClass { static readonly $typeName = `${PKG_V1}::kiosk::Witness`; static readonly $numTypeParams = 0;

 readonly $typeName = Witness.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::kiosk::Witness`;

 readonly $typeArgs: [];

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: WitnessFields, ) { this.$fullTypeName = composeSuiType( Witness.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::Witness`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): WitnessReified { return { typeName: Witness.$typeName, fullTypeName: composeSuiType( Witness.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::Witness`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Witness.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Witness.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Witness.fromBcs( data, ), bcs: Witness.bcs, fromJSONField: (field: any) => Witness.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Witness.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Witness.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Witness.fetch( client, id, ), new: ( fields: WitnessFields, ) => { return new Witness( [], fields ) }, kind: "StructClassReified", } }

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

/* ============================== KioskOwnerLock =============================== */

export function isKioskOwnerLock(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::KioskOwnerLock`; }

export interface KioskOwnerLockFields { id: ToField<UID>; multisigAddr: ToField<"address">; kioskOwnerCap: ToField<KioskOwnerCap> }

export type KioskOwnerLockReified = Reified< KioskOwnerLock, KioskOwnerLockFields >;

export class KioskOwnerLock implements StructClass { static readonly $typeName = `${PKG_V1}::kiosk::KioskOwnerLock`; static readonly $numTypeParams = 0;

 readonly $typeName = KioskOwnerLock.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::kiosk::KioskOwnerLock`;

 readonly $typeArgs: [];

 readonly id: ToField<UID>; readonly multisigAddr: ToField<"address">; readonly kioskOwnerCap: ToField<KioskOwnerCap>

 private constructor(typeArgs: [], fields: KioskOwnerLockFields, ) { this.$fullTypeName = composeSuiType( KioskOwnerLock.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::KioskOwnerLock`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.multisigAddr = fields.multisigAddr;; this.kioskOwnerCap = fields.kioskOwnerCap; }

 static reified( ): KioskOwnerLockReified { return { typeName: KioskOwnerLock.$typeName, fullTypeName: composeSuiType( KioskOwnerLock.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::KioskOwnerLock`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => KioskOwnerLock.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => KioskOwnerLock.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => KioskOwnerLock.fromBcs( data, ), bcs: KioskOwnerLock.bcs, fromJSONField: (field: any) => KioskOwnerLock.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => KioskOwnerLock.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => KioskOwnerLock.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => KioskOwnerLock.fetch( client, id, ), new: ( fields: KioskOwnerLockFields, ) => { return new KioskOwnerLock( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return KioskOwnerLock.reified() }

 static phantom( ): PhantomReified<ToTypeStr<KioskOwnerLock>> { return phantom(KioskOwnerLock.reified( )); } static get p() { return KioskOwnerLock.phantom() }

 static get bcs() { return bcs.struct("KioskOwnerLock", {

 id: UID.bcs, multisig_addr: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), kiosk_owner_cap: KioskOwnerCap.bcs

}) };

 static fromFields( fields: Record<string, any> ): KioskOwnerLock { return KioskOwnerLock.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), multisigAddr: decodeFromFields("address", fields.multisig_addr), kioskOwnerCap: decodeFromFields(KioskOwnerCap.reified(), fields.kiosk_owner_cap) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): KioskOwnerLock { if (!isKioskOwnerLock(item.type)) { throw new Error("not a KioskOwnerLock type");

 }

 return KioskOwnerLock.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), multisigAddr: decodeFromFieldsWithTypes("address", item.fields.multisig_addr), kioskOwnerCap: decodeFromFieldsWithTypes(KioskOwnerCap.reified(), item.fields.kiosk_owner_cap) } ) }

 static fromBcs( data: Uint8Array ): KioskOwnerLock { return KioskOwnerLock.fromFields( KioskOwnerLock.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,multisigAddr: this.multisigAddr,kioskOwnerCap: this.kioskOwnerCap.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): KioskOwnerLock { return KioskOwnerLock.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), multisigAddr: decodeFromJSONField("address", field.multisigAddr), kioskOwnerCap: decodeFromJSONField(KioskOwnerCap.reified(), field.kioskOwnerCap) } ) }

 static fromJSON( json: Record<string, any> ): KioskOwnerLock { if (json.$typeName !== KioskOwnerLock.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return KioskOwnerLock.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): KioskOwnerLock { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isKioskOwnerLock(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a KioskOwnerLock object`); } return KioskOwnerLock.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<KioskOwnerLock> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching KioskOwnerLock object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isKioskOwnerLock(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a KioskOwnerLock object`); }
 return KioskOwnerLock.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== List =============================== */

export function isList(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::List`; }

export interface ListFields { nftIds: ToField<Vector<ID>>; prices: ToField<Vector<"u64">> }

export type ListReified = Reified< List, ListFields >;

export class List implements StructClass { static readonly $typeName = `${PKG_V1}::kiosk::List`; static readonly $numTypeParams = 0;

 readonly $typeName = List.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::kiosk::List`;

 readonly $typeArgs: [];

 readonly nftIds: ToField<Vector<ID>>; readonly prices: ToField<Vector<"u64">>

 private constructor(typeArgs: [], fields: ListFields, ) { this.$fullTypeName = composeSuiType( List.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::List`; this.$typeArgs = typeArgs;

 this.nftIds = fields.nftIds;; this.prices = fields.prices; }

 static reified( ): ListReified { return { typeName: List.$typeName, fullTypeName: composeSuiType( List.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::List`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => List.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => List.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => List.fromBcs( data, ), bcs: List.bcs, fromJSONField: (field: any) => List.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => List.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => List.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => List.fetch( client, id, ), new: ( fields: ListFields, ) => { return new List( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return List.reified() }

 static phantom( ): PhantomReified<ToTypeStr<List>> { return phantom(List.reified( )); } static get p() { return List.phantom() }

 static get bcs() { return bcs.struct("List", {

 nft_ids: bcs.vector(ID.bcs), prices: bcs.vector(bcs.u64())

}) };

 static fromFields( fields: Record<string, any> ): List { return List.reified( ).new( { nftIds: decodeFromFields(reified.vector(ID.reified()), fields.nft_ids), prices: decodeFromFields(reified.vector("u64"), fields.prices) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): List { if (!isList(item.type)) { throw new Error("not a List type");

 }

 return List.reified( ).new( { nftIds: decodeFromFieldsWithTypes(reified.vector(ID.reified()), item.fields.nft_ids), prices: decodeFromFieldsWithTypes(reified.vector("u64"), item.fields.prices) } ) }

 static fromBcs( data: Uint8Array ): List { return List.fromFields( List.bcs.parse(data) ) }

 toJSONField() { return {

 nftIds: fieldToJSON<Vector<ID>>(`vector<${ID.$typeName}>`, this.nftIds),prices: fieldToJSON<Vector<"u64">>(`vector<u64>`, this.prices),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): List { return List.reified( ).new( { nftIds: decodeFromJSONField(reified.vector(ID.reified()), field.nftIds), prices: decodeFromJSONField(reified.vector("u64"), field.prices) } ) }

 static fromJSON( json: Record<string, any> ): List { if (json.$typeName !== List.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return List.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): List { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isList(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a List object`); } return List.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<List> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching List object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isList(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a List object`); }
 return List.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Take =============================== */

export function isTake(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::Take`; }

export interface TakeFields { nftIds: ToField<Vector<ID>>; recipient: ToField<"address"> }

export type TakeReified = Reified< Take, TakeFields >;

export class Take implements StructClass { static readonly $typeName = `${PKG_V1}::kiosk::Take`; static readonly $numTypeParams = 0;

 readonly $typeName = Take.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::kiosk::Take`;

 readonly $typeArgs: [];

 readonly nftIds: ToField<Vector<ID>>; readonly recipient: ToField<"address">

 private constructor(typeArgs: [], fields: TakeFields, ) { this.$fullTypeName = composeSuiType( Take.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::Take`; this.$typeArgs = typeArgs;

 this.nftIds = fields.nftIds;; this.recipient = fields.recipient; }

 static reified( ): TakeReified { return { typeName: Take.$typeName, fullTypeName: composeSuiType( Take.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::Take`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Take.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Take.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Take.fromBcs( data, ), bcs: Take.bcs, fromJSONField: (field: any) => Take.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Take.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Take.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Take.fetch( client, id, ), new: ( fields: TakeFields, ) => { return new Take( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Take.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Take>> { return phantom(Take.reified( )); } static get p() { return Take.phantom() }

 static get bcs() { return bcs.struct("Take", {

 nft_ids: bcs.vector(ID.bcs), recipient: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields( fields: Record<string, any> ): Take { return Take.reified( ).new( { nftIds: decodeFromFields(reified.vector(ID.reified()), fields.nft_ids), recipient: decodeFromFields("address", fields.recipient) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Take { if (!isTake(item.type)) { throw new Error("not a Take type");

 }

 return Take.reified( ).new( { nftIds: decodeFromFieldsWithTypes(reified.vector(ID.reified()), item.fields.nft_ids), recipient: decodeFromFieldsWithTypes("address", item.fields.recipient) } ) }

 static fromBcs( data: Uint8Array ): Take { return Take.fromFields( Take.bcs.parse(data) ) }

 toJSONField() { return {

 nftIds: fieldToJSON<Vector<ID>>(`vector<${ID.$typeName}>`, this.nftIds),recipient: this.recipient,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Take { return Take.reified( ).new( { nftIds: decodeFromJSONField(reified.vector(ID.reified()), field.nftIds), recipient: decodeFromJSONField("address", field.recipient) } ) }

 static fromJSON( json: Record<string, any> ): Take { if (json.$typeName !== Take.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Take.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Take { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTake(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Take object`); } return Take.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Take> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Take object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTake(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Take object`); }
 return Take.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
