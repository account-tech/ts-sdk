import {String} from "../../_dependencies/source/0x1/string/structs";
import {KioskOwnerCap} from "../../_dependencies/source/0x2/kiosk/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== Delist =============================== */

export function isDelist(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::Delist`; }

export interface DelistFields { dummyField: ToField<"bool"> }

export type DelistReified = Reified< Delist, DelistFields >;

export class Delist implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::kiosk::Delist`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Delist.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::kiosk::Delist`; readonly $typeArgs: []; readonly $isPhantom = Delist.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: DelistFields, ) { this.$fullTypeName = composeSuiType( Delist.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::Delist`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): DelistReified { return { typeName: Delist.$typeName, fullTypeName: composeSuiType( Delist.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::Delist`, typeArgs: [ ] as [], isPhantom: Delist.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Delist.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Delist.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Delist.fromBcs( data, ), bcs: Delist.bcs, fromJSONField: (field: any) => Delist.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Delist.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Delist.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Delist.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Delist.fetch( client, id, ), new: ( fields: DelistFields, ) => { return new Delist( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Delist.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Delist>> { return phantom(Delist.reified( )); } static get p() { return Delist.phantom() }

 static get bcs() { return bcs.struct("Delist", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): Delist { return Delist.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Delist { if (!isDelist(item.type)) { throw new Error("not a Delist type");

 }

 return Delist.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): Delist { return Delist.fromFields( Delist.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Delist { return Delist.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): Delist { if (json.$typeName !== Delist.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Delist.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Delist { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isDelist(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Delist object`); } return Delist.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Delist { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isDelist(data.bcs.type)) { throw new Error(`object at is not a Delist object`); }

 return Delist.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Delist.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Delist> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Delist object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isDelist(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Delist object`); }

 return Delist.fromSuiObjectData( res.data ); }

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

/* ============================== ListAction =============================== */

export function isListAction(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::ListAction`; }

export interface ListActionFields { nftId: ToField<ID>; price: ToField<"u64"> }

export type ListActionReified = Reified< ListAction, ListActionFields >;

export class ListAction implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::kiosk::ListAction`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ListAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::kiosk::ListAction`; readonly $typeArgs: []; readonly $isPhantom = ListAction.$isPhantom;

 readonly nftId: ToField<ID>; readonly price: ToField<"u64">

 private constructor(typeArgs: [], fields: ListActionFields, ) { this.$fullTypeName = composeSuiType( ListAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::ListAction`; this.$typeArgs = typeArgs;

 this.nftId = fields.nftId;; this.price = fields.price; }

 static reified( ): ListActionReified { return { typeName: ListAction.$typeName, fullTypeName: composeSuiType( ListAction.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::ListAction`, typeArgs: [ ] as [], isPhantom: ListAction.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ListAction.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ListAction.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ListAction.fromBcs( data, ), bcs: ListAction.bcs, fromJSONField: (field: any) => ListAction.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ListAction.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ListAction.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ListAction.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ListAction.fetch( client, id, ), new: ( fields: ListActionFields, ) => { return new ListAction( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ListAction.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ListAction>> { return phantom(ListAction.reified( )); } static get p() { return ListAction.phantom() }

 static get bcs() { return bcs.struct("ListAction", {

 nft_id: ID.bcs, price: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): ListAction { return ListAction.reified( ).new( { nftId: decodeFromFields(ID.reified(), fields.nft_id), price: decodeFromFields("u64", fields.price) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ListAction { if (!isListAction(item.type)) { throw new Error("not a ListAction type");

 }

 return ListAction.reified( ).new( { nftId: decodeFromFieldsWithTypes(ID.reified(), item.fields.nft_id), price: decodeFromFieldsWithTypes("u64", item.fields.price) } ) }

 static fromBcs( data: Uint8Array ): ListAction { return ListAction.fromFields( ListAction.bcs.parse(data) ) }

 toJSONField() { return {

 nftId: this.nftId,price: this.price.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ListAction { return ListAction.reified( ).new( { nftId: decodeFromJSONField(ID.reified(), field.nftId), price: decodeFromJSONField("u64", field.price) } ) }

 static fromJSON( json: Record<string, any> ): ListAction { if (json.$typeName !== ListAction.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ListAction.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ListAction { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isListAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ListAction object`); } return ListAction.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ListAction { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isListAction(data.bcs.type)) { throw new Error(`object at is not a ListAction object`); }

 return ListAction.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ListAction.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ListAction> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ListAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isListAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ListAction object`); }

 return ListAction.fromSuiObjectData( res.data ); }

 }

/* ============================== ListProposal =============================== */

export function isListProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::ListProposal`; }

export interface ListProposalFields { dummyField: ToField<"bool"> }

export type ListProposalReified = Reified< ListProposal, ListProposalFields >;

export class ListProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::kiosk::ListProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ListProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::kiosk::ListProposal`; readonly $typeArgs: []; readonly $isPhantom = ListProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: ListProposalFields, ) { this.$fullTypeName = composeSuiType( ListProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::ListProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): ListProposalReified { return { typeName: ListProposal.$typeName, fullTypeName: composeSuiType( ListProposal.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::ListProposal`, typeArgs: [ ] as [], isPhantom: ListProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ListProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ListProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ListProposal.fromBcs( data, ), bcs: ListProposal.bcs, fromJSONField: (field: any) => ListProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ListProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ListProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ListProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ListProposal.fetch( client, id, ), new: ( fields: ListProposalFields, ) => { return new ListProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ListProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ListProposal>> { return phantom(ListProposal.reified( )); } static get p() { return ListProposal.phantom() }

 static get bcs() { return bcs.struct("ListProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): ListProposal { return ListProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ListProposal { if (!isListProposal(item.type)) { throw new Error("not a ListProposal type");

 }

 return ListProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): ListProposal { return ListProposal.fromFields( ListProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ListProposal { return ListProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): ListProposal { if (json.$typeName !== ListProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ListProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ListProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isListProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ListProposal object`); } return ListProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ListProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isListProposal(data.bcs.type)) { throw new Error(`object at is not a ListProposal object`); }

 return ListProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ListProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ListProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ListProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isListProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ListProposal object`); }

 return ListProposal.fromSuiObjectData( res.data ); }

 }

/* ============================== Place =============================== */

export function isPlace(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::Place`; }

export interface PlaceFields { dummyField: ToField<"bool"> }

export type PlaceReified = Reified< Place, PlaceFields >;

export class Place implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::kiosk::Place`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Place.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::kiosk::Place`; readonly $typeArgs: []; readonly $isPhantom = Place.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: PlaceFields, ) { this.$fullTypeName = composeSuiType( Place.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::Place`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): PlaceReified { return { typeName: Place.$typeName, fullTypeName: composeSuiType( Place.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::Place`, typeArgs: [ ] as [], isPhantom: Place.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Place.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Place.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Place.fromBcs( data, ), bcs: Place.bcs, fromJSONField: (field: any) => Place.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Place.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Place.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Place.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Place.fetch( client, id, ), new: ( fields: PlaceFields, ) => { return new Place( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Place.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Place>> { return phantom(Place.reified( )); } static get p() { return Place.phantom() }

 static get bcs() { return bcs.struct("Place", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): Place { return Place.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Place { if (!isPlace(item.type)) { throw new Error("not a Place type");

 }

 return Place.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): Place { return Place.fromFields( Place.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Place { return Place.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): Place { if (json.$typeName !== Place.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Place.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Place { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isPlace(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Place object`); } return Place.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Place { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isPlace(data.bcs.type)) { throw new Error(`object at is not a Place object`); }

 return Place.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Place.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Place> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Place object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPlace(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Place object`); }

 return Place.fromSuiObjectData( res.data ); }

 }

/* ============================== TakeAction =============================== */

export function isTakeAction(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::TakeAction`; }

export interface TakeActionFields { nftId: ToField<ID>; recipient: ToField<"address"> }

export type TakeActionReified = Reified< TakeAction, TakeActionFields >;

export class TakeAction implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::kiosk::TakeAction`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = TakeAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::kiosk::TakeAction`; readonly $typeArgs: []; readonly $isPhantom = TakeAction.$isPhantom;

 readonly nftId: ToField<ID>; readonly recipient: ToField<"address">

 private constructor(typeArgs: [], fields: TakeActionFields, ) { this.$fullTypeName = composeSuiType( TakeAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::TakeAction`; this.$typeArgs = typeArgs;

 this.nftId = fields.nftId;; this.recipient = fields.recipient; }

 static reified( ): TakeActionReified { return { typeName: TakeAction.$typeName, fullTypeName: composeSuiType( TakeAction.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::TakeAction`, typeArgs: [ ] as [], isPhantom: TakeAction.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => TakeAction.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TakeAction.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => TakeAction.fromBcs( data, ), bcs: TakeAction.bcs, fromJSONField: (field: any) => TakeAction.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => TakeAction.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => TakeAction.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => TakeAction.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => TakeAction.fetch( client, id, ), new: ( fields: TakeActionFields, ) => { return new TakeAction( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return TakeAction.reified() }

 static phantom( ): PhantomReified<ToTypeStr<TakeAction>> { return phantom(TakeAction.reified( )); } static get p() { return TakeAction.phantom() }

 static get bcs() { return bcs.struct("TakeAction", {

 nft_id: ID.bcs, recipient: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields( fields: Record<string, any> ): TakeAction { return TakeAction.reified( ).new( { nftId: decodeFromFields(ID.reified(), fields.nft_id), recipient: decodeFromFields("address", fields.recipient) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): TakeAction { if (!isTakeAction(item.type)) { throw new Error("not a TakeAction type");

 }

 return TakeAction.reified( ).new( { nftId: decodeFromFieldsWithTypes(ID.reified(), item.fields.nft_id), recipient: decodeFromFieldsWithTypes("address", item.fields.recipient) } ) }

 static fromBcs( data: Uint8Array ): TakeAction { return TakeAction.fromFields( TakeAction.bcs.parse(data) ) }

 toJSONField() { return {

 nftId: this.nftId,recipient: this.recipient,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): TakeAction { return TakeAction.reified( ).new( { nftId: decodeFromJSONField(ID.reified(), field.nftId), recipient: decodeFromJSONField("address", field.recipient) } ) }

 static fromJSON( json: Record<string, any> ): TakeAction { if (json.$typeName !== TakeAction.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return TakeAction.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): TakeAction { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTakeAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TakeAction object`); } return TakeAction.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): TakeAction { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTakeAction(data.bcs.type)) { throw new Error(`object at is not a TakeAction object`); }

 return TakeAction.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return TakeAction.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<TakeAction> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TakeAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTakeAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TakeAction object`); }

 return TakeAction.fromSuiObjectData( res.data ); }

 }

/* ============================== TakeProposal =============================== */

export function isTakeProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::TakeProposal`; }

export interface TakeProposalFields { dummyField: ToField<"bool"> }

export type TakeProposalReified = Reified< TakeProposal, TakeProposalFields >;

export class TakeProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::kiosk::TakeProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = TakeProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::kiosk::TakeProposal`; readonly $typeArgs: []; readonly $isPhantom = TakeProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: TakeProposalFields, ) { this.$fullTypeName = composeSuiType( TakeProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::TakeProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): TakeProposalReified { return { typeName: TakeProposal.$typeName, fullTypeName: composeSuiType( TakeProposal.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::TakeProposal`, typeArgs: [ ] as [], isPhantom: TakeProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => TakeProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TakeProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => TakeProposal.fromBcs( data, ), bcs: TakeProposal.bcs, fromJSONField: (field: any) => TakeProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => TakeProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => TakeProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => TakeProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => TakeProposal.fetch( client, id, ), new: ( fields: TakeProposalFields, ) => { return new TakeProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return TakeProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<TakeProposal>> { return phantom(TakeProposal.reified( )); } static get p() { return TakeProposal.phantom() }

 static get bcs() { return bcs.struct("TakeProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): TakeProposal { return TakeProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): TakeProposal { if (!isTakeProposal(item.type)) { throw new Error("not a TakeProposal type");

 }

 return TakeProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): TakeProposal { return TakeProposal.fromFields( TakeProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): TakeProposal { return TakeProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): TakeProposal { if (json.$typeName !== TakeProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return TakeProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): TakeProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTakeProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TakeProposal object`); } return TakeProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): TakeProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTakeProposal(data.bcs.type)) { throw new Error(`object at is not a TakeProposal object`); }

 return TakeProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return TakeProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<TakeProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TakeProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTakeProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TakeProposal object`); }

 return TakeProposal.fromSuiObjectData( res.data ); }

 }
