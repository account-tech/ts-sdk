import * as reified from "../../_framework/reified";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {KioskOwnerCap} from "../../_dependencies/source/0x2/kiosk/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {VecMap} from "../../_dependencies/source/0x2/vec-map/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {Vector} from "../../_framework/vector";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== Issuer =============================== */

export function isIssuer(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::Issuer`; }

export interface IssuerFields { dummyField: ToField<"bool"> }

export type IssuerReified = Reified< Issuer, IssuerFields >;

export class Issuer implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::kiosk::Issuer`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Issuer.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::kiosk::Issuer`; readonly $typeArgs: []; readonly $isPhantom = Issuer.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: IssuerFields, ) { this.$fullTypeName = composeSuiType( Issuer.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::Issuer`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): IssuerReified { return { typeName: Issuer.$typeName, fullTypeName: composeSuiType( Issuer.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::Issuer`, typeArgs: [ ] as [], isPhantom: Issuer.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Issuer.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Issuer.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Issuer.fromBcs( data, ), bcs: Issuer.bcs, fromJSONField: (field: any) => Issuer.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Issuer.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Issuer.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Issuer.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Issuer.fetch( client, id, ), new: ( fields: IssuerFields, ) => { return new Issuer( [], fields ) }, kind: "StructClassReified", } }

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

/* ============================== KioskOwnerKey =============================== */

export function isKioskOwnerKey(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::KioskOwnerKey`; }

export interface KioskOwnerKeyFields { name: ToField<String> }

export type KioskOwnerKeyReified = Reified< KioskOwnerKey, KioskOwnerKeyFields >;

export class KioskOwnerKey implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::kiosk::KioskOwnerKey`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = KioskOwnerKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::kiosk::KioskOwnerKey`; readonly $typeArgs: []; readonly $isPhantom = KioskOwnerKey.$isPhantom;

 readonly name: ToField<String>

 private constructor(typeArgs: [], fields: KioskOwnerKeyFields, ) { this.$fullTypeName = composeSuiType( KioskOwnerKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::KioskOwnerKey`; this.$typeArgs = typeArgs;

 this.name = fields.name; }

 static reified( ): KioskOwnerKeyReified { return { typeName: KioskOwnerKey.$typeName, fullTypeName: composeSuiType( KioskOwnerKey.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::KioskOwnerKey`, typeArgs: [ ] as [], isPhantom: KioskOwnerKey.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => KioskOwnerKey.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => KioskOwnerKey.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => KioskOwnerKey.fromBcs( data, ), bcs: KioskOwnerKey.bcs, fromJSONField: (field: any) => KioskOwnerKey.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => KioskOwnerKey.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => KioskOwnerKey.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => KioskOwnerKey.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => KioskOwnerKey.fetch( client, id, ), new: ( fields: KioskOwnerKeyFields, ) => { return new KioskOwnerKey( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return KioskOwnerKey.reified() }

 static phantom( ): PhantomReified<ToTypeStr<KioskOwnerKey>> { return phantom(KioskOwnerKey.reified( )); } static get p() { return KioskOwnerKey.phantom() }

 static get bcs() { return bcs.struct("KioskOwnerKey", {

 name: String.bcs

}) };

 static fromFields( fields: Record<string, any> ): KioskOwnerKey { return KioskOwnerKey.reified( ).new( { name: decodeFromFields(String.reified(), fields.name) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): KioskOwnerKey { if (!isKioskOwnerKey(item.type)) { throw new Error("not a KioskOwnerKey type");

 }

 return KioskOwnerKey.reified( ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name) } ) }

 static fromBcs( data: Uint8Array ): KioskOwnerKey { return KioskOwnerKey.fromFields( KioskOwnerKey.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): KioskOwnerKey { return KioskOwnerKey.reified( ).new( { name: decodeFromJSONField(String.reified(), field.name) } ) }

 static fromJSON( json: Record<string, any> ): KioskOwnerKey { if (json.$typeName !== KioskOwnerKey.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return KioskOwnerKey.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): KioskOwnerKey { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isKioskOwnerKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a KioskOwnerKey object`); } return KioskOwnerKey.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): KioskOwnerKey { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isKioskOwnerKey(data.bcs.type)) { throw new Error(`object at is not a KioskOwnerKey object`); }

 return KioskOwnerKey.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return KioskOwnerKey.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<KioskOwnerKey> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching KioskOwnerKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isKioskOwnerKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a KioskOwnerKey object`); }

 return KioskOwnerKey.fromSuiObjectData( res.data ); }

 }

/* ============================== KioskOwnerLock =============================== */

export function isKioskOwnerLock(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::KioskOwnerLock`; }

export interface KioskOwnerLockFields { kioskOwnerCap: ToField<KioskOwnerCap> }

export type KioskOwnerLockReified = Reified< KioskOwnerLock, KioskOwnerLockFields >;

export class KioskOwnerLock implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::kiosk::KioskOwnerLock`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = KioskOwnerLock.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::kiosk::KioskOwnerLock`; readonly $typeArgs: []; readonly $isPhantom = KioskOwnerLock.$isPhantom;

 readonly kioskOwnerCap: ToField<KioskOwnerCap>

 private constructor(typeArgs: [], fields: KioskOwnerLockFields, ) { this.$fullTypeName = composeSuiType( KioskOwnerLock.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::KioskOwnerLock`; this.$typeArgs = typeArgs;

 this.kioskOwnerCap = fields.kioskOwnerCap; }

 static reified( ): KioskOwnerLockReified { return { typeName: KioskOwnerLock.$typeName, fullTypeName: composeSuiType( KioskOwnerLock.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::KioskOwnerLock`, typeArgs: [ ] as [], isPhantom: KioskOwnerLock.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => KioskOwnerLock.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => KioskOwnerLock.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => KioskOwnerLock.fromBcs( data, ), bcs: KioskOwnerLock.bcs, fromJSONField: (field: any) => KioskOwnerLock.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => KioskOwnerLock.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => KioskOwnerLock.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => KioskOwnerLock.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => KioskOwnerLock.fetch( client, id, ), new: ( fields: KioskOwnerLockFields, ) => { return new KioskOwnerLock( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return KioskOwnerLock.reified() }

 static phantom( ): PhantomReified<ToTypeStr<KioskOwnerLock>> { return phantom(KioskOwnerLock.reified( )); } static get p() { return KioskOwnerLock.phantom() }

 static get bcs() { return bcs.struct("KioskOwnerLock", {

 kiosk_owner_cap: KioskOwnerCap.bcs

}) };

 static fromFields( fields: Record<string, any> ): KioskOwnerLock { return KioskOwnerLock.reified( ).new( { kioskOwnerCap: decodeFromFields(KioskOwnerCap.reified(), fields.kiosk_owner_cap) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): KioskOwnerLock { if (!isKioskOwnerLock(item.type)) { throw new Error("not a KioskOwnerLock type");

 }

 return KioskOwnerLock.reified( ).new( { kioskOwnerCap: decodeFromFieldsWithTypes(KioskOwnerCap.reified(), item.fields.kiosk_owner_cap) } ) }

 static fromBcs( data: Uint8Array ): KioskOwnerLock { return KioskOwnerLock.fromFields( KioskOwnerLock.bcs.parse(data) ) }

 toJSONField() { return {

 kioskOwnerCap: this.kioskOwnerCap.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): KioskOwnerLock { return KioskOwnerLock.reified( ).new( { kioskOwnerCap: decodeFromJSONField(KioskOwnerCap.reified(), field.kioskOwnerCap) } ) }

 static fromJSON( json: Record<string, any> ): KioskOwnerLock { if (json.$typeName !== KioskOwnerLock.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return KioskOwnerLock.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): KioskOwnerLock { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isKioskOwnerLock(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a KioskOwnerLock object`); } return KioskOwnerLock.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): KioskOwnerLock { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isKioskOwnerLock(data.bcs.type)) { throw new Error(`object at is not a KioskOwnerLock object`); }

 return KioskOwnerLock.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return KioskOwnerLock.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<KioskOwnerLock> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching KioskOwnerLock object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isKioskOwnerLock(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a KioskOwnerLock object`); }

 return KioskOwnerLock.fromSuiObjectData( res.data ); }

 }

/* ============================== List =============================== */

export function isList(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::List`; }

export interface ListFields { name: ToField<String>; nftsPricesMap: ToField<VecMap<ID, "u64">> }

export type ListReified = Reified< List, ListFields >;

export class List implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::kiosk::List`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = List.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::kiosk::List`; readonly $typeArgs: []; readonly $isPhantom = List.$isPhantom;

 readonly name: ToField<String>; readonly nftsPricesMap: ToField<VecMap<ID, "u64">>

 private constructor(typeArgs: [], fields: ListFields, ) { this.$fullTypeName = composeSuiType( List.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::List`; this.$typeArgs = typeArgs;

 this.name = fields.name;; this.nftsPricesMap = fields.nftsPricesMap; }

 static reified( ): ListReified { return { typeName: List.$typeName, fullTypeName: composeSuiType( List.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::List`, typeArgs: [ ] as [], isPhantom: List.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => List.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => List.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => List.fromBcs( data, ), bcs: List.bcs, fromJSONField: (field: any) => List.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => List.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => List.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => List.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => List.fetch( client, id, ), new: ( fields: ListFields, ) => { return new List( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return List.reified() }

 static phantom( ): PhantomReified<ToTypeStr<List>> { return phantom(List.reified( )); } static get p() { return List.phantom() }

 static get bcs() { return bcs.struct("List", {

 name: String.bcs, nfts_prices_map: VecMap.bcs(ID.bcs, bcs.u64())

}) };

 static fromFields( fields: Record<string, any> ): List { return List.reified( ).new( { name: decodeFromFields(String.reified(), fields.name), nftsPricesMap: decodeFromFields(VecMap.reified(ID.reified(), "u64"), fields.nfts_prices_map) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): List { if (!isList(item.type)) { throw new Error("not a List type");

 }

 return List.reified( ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), nftsPricesMap: decodeFromFieldsWithTypes(VecMap.reified(ID.reified(), "u64"), item.fields.nfts_prices_map) } ) }

 static fromBcs( data: Uint8Array ): List { return List.fromFields( List.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,nftsPricesMap: this.nftsPricesMap.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): List { return List.reified( ).new( { name: decodeFromJSONField(String.reified(), field.name), nftsPricesMap: decodeFromJSONField(VecMap.reified(ID.reified(), "u64"), field.nftsPricesMap) } ) }

 static fromJSON( json: Record<string, any> ): List { if (json.$typeName !== List.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return List.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): List { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isList(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a List object`); } return List.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): List { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isList(data.bcs.type)) { throw new Error(`object at is not a List object`); }

 return List.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return List.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<List> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching List object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isList(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a List object`); }

 return List.fromSuiObjectData( res.data ); }

 }

/* ============================== Take =============================== */

export function isTake(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::Take`; }

export interface TakeFields { nftIds: ToField<Vector<ID>>; recipient: ToField<"address"> }

export type TakeReified = Reified< Take, TakeFields >;

export class Take implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::kiosk::Take`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Take.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::kiosk::Take`; readonly $typeArgs: []; readonly $isPhantom = Take.$isPhantom;

 readonly nftIds: ToField<Vector<ID>>; readonly recipient: ToField<"address">

 private constructor(typeArgs: [], fields: TakeFields, ) { this.$fullTypeName = composeSuiType( Take.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::Take`; this.$typeArgs = typeArgs;

 this.nftIds = fields.nftIds;; this.recipient = fields.recipient; }

 static reified( ): TakeReified { return { typeName: Take.$typeName, fullTypeName: composeSuiType( Take.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::Take`, typeArgs: [ ] as [], isPhantom: Take.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Take.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Take.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Take.fromBcs( data, ), bcs: Take.bcs, fromJSONField: (field: any) => Take.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Take.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Take.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Take.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Take.fetch( client, id, ), new: ( fields: TakeFields, ) => { return new Take( [], fields ) }, kind: "StructClassReified", } }

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

 static fromSuiObjectData( data: SuiObjectData ): Take { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTake(data.bcs.type)) { throw new Error(`object at is not a Take object`); }

 return Take.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Take.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Take> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Take object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTake(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Take object`); }

 return Take.fromSuiObjectData( res.data ); }

 }
