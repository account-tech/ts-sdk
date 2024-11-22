import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== DelistCommand =============================== */

export function isDelistCommand(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::DelistCommand`; }

export interface DelistCommandFields { dummyField: ToField<"bool"> }

export type DelistCommandReified = Reified< DelistCommand, DelistCommandFields >;

export class DelistCommand implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::kiosk::DelistCommand`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = DelistCommand.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::kiosk::DelistCommand`; readonly $typeArgs: []; readonly $isPhantom = DelistCommand.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: DelistCommandFields, ) { this.$fullTypeName = composeSuiType( DelistCommand.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::DelistCommand`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): DelistCommandReified { return { typeName: DelistCommand.$typeName, fullTypeName: composeSuiType( DelistCommand.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::DelistCommand`, typeArgs: [ ] as [], isPhantom: DelistCommand.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => DelistCommand.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => DelistCommand.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => DelistCommand.fromBcs( data, ), bcs: DelistCommand.bcs, fromJSONField: (field: any) => DelistCommand.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => DelistCommand.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => DelistCommand.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => DelistCommand.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => DelistCommand.fetch( client, id, ), new: ( fields: DelistCommandFields, ) => { return new DelistCommand( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return DelistCommand.reified() }

 static phantom( ): PhantomReified<ToTypeStr<DelistCommand>> { return phantom(DelistCommand.reified( )); } static get p() { return DelistCommand.phantom() }

 static get bcs() { return bcs.struct("DelistCommand", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): DelistCommand { return DelistCommand.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): DelistCommand { if (!isDelistCommand(item.type)) { throw new Error("not a DelistCommand type");

 }

 return DelistCommand.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): DelistCommand { return DelistCommand.fromFields( DelistCommand.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): DelistCommand { return DelistCommand.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): DelistCommand { if (json.$typeName !== DelistCommand.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return DelistCommand.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): DelistCommand { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isDelistCommand(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a DelistCommand object`); } return DelistCommand.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): DelistCommand { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isDelistCommand(data.bcs.type)) { throw new Error(`object at is not a DelistCommand object`); }

 return DelistCommand.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return DelistCommand.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<DelistCommand> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching DelistCommand object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isDelistCommand(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a DelistCommand object`); }

 return DelistCommand.fromSuiObjectData( res.data ); }

 }

/* ============================== KioskCommand =============================== */

export function isKioskCommand(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::KioskCommand`; }

export interface KioskCommandFields { dummyField: ToField<"bool"> }

export type KioskCommandReified = Reified< KioskCommand, KioskCommandFields >;

export class KioskCommand implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::kiosk::KioskCommand`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = KioskCommand.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::kiosk::KioskCommand`; readonly $typeArgs: []; readonly $isPhantom = KioskCommand.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: KioskCommandFields, ) { this.$fullTypeName = composeSuiType( KioskCommand.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::KioskCommand`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): KioskCommandReified { return { typeName: KioskCommand.$typeName, fullTypeName: composeSuiType( KioskCommand.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::KioskCommand`, typeArgs: [ ] as [], isPhantom: KioskCommand.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => KioskCommand.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => KioskCommand.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => KioskCommand.fromBcs( data, ), bcs: KioskCommand.bcs, fromJSONField: (field: any) => KioskCommand.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => KioskCommand.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => KioskCommand.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => KioskCommand.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => KioskCommand.fetch( client, id, ), new: ( fields: KioskCommandFields, ) => { return new KioskCommand( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return KioskCommand.reified() }

 static phantom( ): PhantomReified<ToTypeStr<KioskCommand>> { return phantom(KioskCommand.reified( )); } static get p() { return KioskCommand.phantom() }

 static get bcs() { return bcs.struct("KioskCommand", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): KioskCommand { return KioskCommand.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): KioskCommand { if (!isKioskCommand(item.type)) { throw new Error("not a KioskCommand type");

 }

 return KioskCommand.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): KioskCommand { return KioskCommand.fromFields( KioskCommand.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): KioskCommand { return KioskCommand.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): KioskCommand { if (json.$typeName !== KioskCommand.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return KioskCommand.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): KioskCommand { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isKioskCommand(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a KioskCommand object`); } return KioskCommand.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): KioskCommand { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isKioskCommand(data.bcs.type)) { throw new Error(`object at is not a KioskCommand object`); }

 return KioskCommand.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return KioskCommand.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<KioskCommand> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching KioskCommand object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isKioskCommand(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a KioskCommand object`); }

 return KioskCommand.fromSuiObjectData( res.data ); }

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

/* ============================== PlaceCommand =============================== */

export function isPlaceCommand(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::PlaceCommand`; }

export interface PlaceCommandFields { dummyField: ToField<"bool"> }

export type PlaceCommandReified = Reified< PlaceCommand, PlaceCommandFields >;

export class PlaceCommand implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::kiosk::PlaceCommand`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = PlaceCommand.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::kiosk::PlaceCommand`; readonly $typeArgs: []; readonly $isPhantom = PlaceCommand.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: PlaceCommandFields, ) { this.$fullTypeName = composeSuiType( PlaceCommand.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::PlaceCommand`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): PlaceCommandReified { return { typeName: PlaceCommand.$typeName, fullTypeName: composeSuiType( PlaceCommand.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::PlaceCommand`, typeArgs: [ ] as [], isPhantom: PlaceCommand.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => PlaceCommand.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => PlaceCommand.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => PlaceCommand.fromBcs( data, ), bcs: PlaceCommand.bcs, fromJSONField: (field: any) => PlaceCommand.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => PlaceCommand.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => PlaceCommand.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => PlaceCommand.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => PlaceCommand.fetch( client, id, ), new: ( fields: PlaceCommandFields, ) => { return new PlaceCommand( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return PlaceCommand.reified() }

 static phantom( ): PhantomReified<ToTypeStr<PlaceCommand>> { return phantom(PlaceCommand.reified( )); } static get p() { return PlaceCommand.phantom() }

 static get bcs() { return bcs.struct("PlaceCommand", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): PlaceCommand { return PlaceCommand.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): PlaceCommand { if (!isPlaceCommand(item.type)) { throw new Error("not a PlaceCommand type");

 }

 return PlaceCommand.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): PlaceCommand { return PlaceCommand.fromFields( PlaceCommand.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): PlaceCommand { return PlaceCommand.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): PlaceCommand { if (json.$typeName !== PlaceCommand.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return PlaceCommand.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): PlaceCommand { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isPlaceCommand(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a PlaceCommand object`); } return PlaceCommand.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): PlaceCommand { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isPlaceCommand(data.bcs.type)) { throw new Error(`object at is not a PlaceCommand object`); }

 return PlaceCommand.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return PlaceCommand.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<PlaceCommand> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching PlaceCommand object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPlaceCommand(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a PlaceCommand object`); }

 return PlaceCommand.fromSuiObjectData( res.data ); }

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
