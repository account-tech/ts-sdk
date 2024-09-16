import {String} from "../../_dependencies/source/0x1/string/structs";
import {Bag} from "../../_dependencies/source/0x2/bag/structs";
import {VecMap} from "../../_dependencies/source/0x2/vec-map/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== Issuer =============================== */

export function isIssuer(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::treasury::Issuer`; }

export interface IssuerFields { dummyField: ToField<"bool"> }

export type IssuerReified = Reified< Issuer, IssuerFields >;

export class Issuer implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::Issuer`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Issuer.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::Issuer`; readonly $typeArgs: []; readonly $isPhantom = Issuer.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: IssuerFields, ) { this.$fullTypeName = composeSuiType( Issuer.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::Issuer`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): IssuerReified { return { typeName: Issuer.$typeName, fullTypeName: composeSuiType( Issuer.$typeName, ...[] ) as `${typeof PKG_V1}::treasury::Issuer`, typeArgs: [ ] as [], isPhantom: Issuer.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Issuer.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Issuer.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Issuer.fromBcs( data, ), bcs: Issuer.bcs, fromJSONField: (field: any) => Issuer.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Issuer.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Issuer.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Issuer.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Issuer.fetch( client, id, ), new: ( fields: IssuerFields, ) => { return new Issuer( [], fields ) }, kind: "StructClassReified", } }

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

/* ============================== Open =============================== */

export function isOpen(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::treasury::Open`; }

export interface OpenFields { name: ToField<String> }

export type OpenReified = Reified< Open, OpenFields >;

export class Open implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::Open`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Open.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::Open`; readonly $typeArgs: []; readonly $isPhantom = Open.$isPhantom;

 readonly name: ToField<String>

 private constructor(typeArgs: [], fields: OpenFields, ) { this.$fullTypeName = composeSuiType( Open.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::Open`; this.$typeArgs = typeArgs;

 this.name = fields.name; }

 static reified( ): OpenReified { return { typeName: Open.$typeName, fullTypeName: composeSuiType( Open.$typeName, ...[] ) as `${typeof PKG_V1}::treasury::Open`, typeArgs: [ ] as [], isPhantom: Open.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Open.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Open.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Open.fromBcs( data, ), bcs: Open.bcs, fromJSONField: (field: any) => Open.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Open.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Open.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Open.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Open.fetch( client, id, ), new: ( fields: OpenFields, ) => { return new Open( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Open.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Open>> { return phantom(Open.reified( )); } static get p() { return Open.phantom() }

 static get bcs() { return bcs.struct("Open", {

 name: String.bcs

}) };

 static fromFields( fields: Record<string, any> ): Open { return Open.reified( ).new( { name: decodeFromFields(String.reified(), fields.name) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Open { if (!isOpen(item.type)) { throw new Error("not a Open type");

 }

 return Open.reified( ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name) } ) }

 static fromBcs( data: Uint8Array ): Open { return Open.fromFields( Open.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Open { return Open.reified( ).new( { name: decodeFromJSONField(String.reified(), field.name) } ) }

 static fromJSON( json: Record<string, any> ): Open { if (json.$typeName !== Open.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Open.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Open { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isOpen(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Open object`); } return Open.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Open { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isOpen(data.bcs.type)) { throw new Error(`object at is not a Open object`); }

 return Open.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Open.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Open> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Open object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isOpen(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Open object`); }

 return Open.fromSuiObjectData( res.data ); }

 }

/* ============================== Spend =============================== */

export function isSpend(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::treasury::Spend`; }

export interface SpendFields { name: ToField<String>; coinsAmountsMap: ToField<VecMap<String, "u64">> }

export type SpendReified = Reified< Spend, SpendFields >;

export class Spend implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::Spend`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Spend.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::Spend`; readonly $typeArgs: []; readonly $isPhantom = Spend.$isPhantom;

 readonly name: ToField<String>; readonly coinsAmountsMap: ToField<VecMap<String, "u64">>

 private constructor(typeArgs: [], fields: SpendFields, ) { this.$fullTypeName = composeSuiType( Spend.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::Spend`; this.$typeArgs = typeArgs;

 this.name = fields.name;; this.coinsAmountsMap = fields.coinsAmountsMap; }

 static reified( ): SpendReified { return { typeName: Spend.$typeName, fullTypeName: composeSuiType( Spend.$typeName, ...[] ) as `${typeof PKG_V1}::treasury::Spend`, typeArgs: [ ] as [], isPhantom: Spend.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Spend.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Spend.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Spend.fromBcs( data, ), bcs: Spend.bcs, fromJSONField: (field: any) => Spend.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Spend.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Spend.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Spend.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Spend.fetch( client, id, ), new: ( fields: SpendFields, ) => { return new Spend( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Spend.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Spend>> { return phantom(Spend.reified( )); } static get p() { return Spend.phantom() }

 static get bcs() { return bcs.struct("Spend", {

 name: String.bcs, coins_amounts_map: VecMap.bcs(String.bcs, bcs.u64())

}) };

 static fromFields( fields: Record<string, any> ): Spend { return Spend.reified( ).new( { name: decodeFromFields(String.reified(), fields.name), coinsAmountsMap: decodeFromFields(VecMap.reified(String.reified(), "u64"), fields.coins_amounts_map) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Spend { if (!isSpend(item.type)) { throw new Error("not a Spend type");

 }

 return Spend.reified( ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), coinsAmountsMap: decodeFromFieldsWithTypes(VecMap.reified(String.reified(), "u64"), item.fields.coins_amounts_map) } ) }

 static fromBcs( data: Uint8Array ): Spend { return Spend.fromFields( Spend.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,coinsAmountsMap: this.coinsAmountsMap.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Spend { return Spend.reified( ).new( { name: decodeFromJSONField(String.reified(), field.name), coinsAmountsMap: decodeFromJSONField(VecMap.reified(String.reified(), "u64"), field.coinsAmountsMap) } ) }

 static fromJSON( json: Record<string, any> ): Spend { if (json.$typeName !== Spend.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Spend.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Spend { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isSpend(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Spend object`); } return Spend.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Spend { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isSpend(data.bcs.type)) { throw new Error(`object at is not a Spend object`); }

 return Spend.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Spend.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Spend> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Spend object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isSpend(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Spend object`); }

 return Spend.fromSuiObjectData( res.data ); }

 }

/* ============================== Treasury =============================== */

export function isTreasury(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::treasury::Treasury`; }

export interface TreasuryFields { bag: ToField<Bag> }

export type TreasuryReified = Reified< Treasury, TreasuryFields >;

export class Treasury implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::Treasury`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Treasury.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::Treasury`; readonly $typeArgs: []; readonly $isPhantom = Treasury.$isPhantom;

 readonly bag: ToField<Bag>

 private constructor(typeArgs: [], fields: TreasuryFields, ) { this.$fullTypeName = composeSuiType( Treasury.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::Treasury`; this.$typeArgs = typeArgs;

 this.bag = fields.bag; }

 static reified( ): TreasuryReified { return { typeName: Treasury.$typeName, fullTypeName: composeSuiType( Treasury.$typeName, ...[] ) as `${typeof PKG_V1}::treasury::Treasury`, typeArgs: [ ] as [], isPhantom: Treasury.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Treasury.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Treasury.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Treasury.fromBcs( data, ), bcs: Treasury.bcs, fromJSONField: (field: any) => Treasury.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Treasury.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Treasury.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Treasury.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Treasury.fetch( client, id, ), new: ( fields: TreasuryFields, ) => { return new Treasury( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Treasury.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Treasury>> { return phantom(Treasury.reified( )); } static get p() { return Treasury.phantom() }

 static get bcs() { return bcs.struct("Treasury", {

 bag: Bag.bcs

}) };

 static fromFields( fields: Record<string, any> ): Treasury { return Treasury.reified( ).new( { bag: decodeFromFields(Bag.reified(), fields.bag) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Treasury { if (!isTreasury(item.type)) { throw new Error("not a Treasury type");

 }

 return Treasury.reified( ).new( { bag: decodeFromFieldsWithTypes(Bag.reified(), item.fields.bag) } ) }

 static fromBcs( data: Uint8Array ): Treasury { return Treasury.fromFields( Treasury.bcs.parse(data) ) }

 toJSONField() { return {

 bag: this.bag.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Treasury { return Treasury.reified( ).new( { bag: decodeFromJSONField(Bag.reified(), field.bag) } ) }

 static fromJSON( json: Record<string, any> ): Treasury { if (json.$typeName !== Treasury.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Treasury.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Treasury { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTreasury(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Treasury object`); } return Treasury.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Treasury { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTreasury(data.bcs.type)) { throw new Error(`object at is not a Treasury object`); }

 return Treasury.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Treasury.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Treasury> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Treasury object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTreasury(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Treasury object`); }

 return Treasury.fromSuiObjectData( res.data ); }

 }

/* ============================== TreasuryKey =============================== */

export function isTreasuryKey(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::treasury::TreasuryKey`; }

export interface TreasuryKeyFields { name: ToField<String> }

export type TreasuryKeyReified = Reified< TreasuryKey, TreasuryKeyFields >;

export class TreasuryKey implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::TreasuryKey`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = TreasuryKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::TreasuryKey`; readonly $typeArgs: []; readonly $isPhantom = TreasuryKey.$isPhantom;

 readonly name: ToField<String>

 private constructor(typeArgs: [], fields: TreasuryKeyFields, ) { this.$fullTypeName = composeSuiType( TreasuryKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::TreasuryKey`; this.$typeArgs = typeArgs;

 this.name = fields.name; }

 static reified( ): TreasuryKeyReified { return { typeName: TreasuryKey.$typeName, fullTypeName: composeSuiType( TreasuryKey.$typeName, ...[] ) as `${typeof PKG_V1}::treasury::TreasuryKey`, typeArgs: [ ] as [], isPhantom: TreasuryKey.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => TreasuryKey.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TreasuryKey.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => TreasuryKey.fromBcs( data, ), bcs: TreasuryKey.bcs, fromJSONField: (field: any) => TreasuryKey.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => TreasuryKey.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => TreasuryKey.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => TreasuryKey.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => TreasuryKey.fetch( client, id, ), new: ( fields: TreasuryKeyFields, ) => { return new TreasuryKey( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return TreasuryKey.reified() }

 static phantom( ): PhantomReified<ToTypeStr<TreasuryKey>> { return phantom(TreasuryKey.reified( )); } static get p() { return TreasuryKey.phantom() }

 static get bcs() { return bcs.struct("TreasuryKey", {

 name: String.bcs

}) };

 static fromFields( fields: Record<string, any> ): TreasuryKey { return TreasuryKey.reified( ).new( { name: decodeFromFields(String.reified(), fields.name) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): TreasuryKey { if (!isTreasuryKey(item.type)) { throw new Error("not a TreasuryKey type");

 }

 return TreasuryKey.reified( ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name) } ) }

 static fromBcs( data: Uint8Array ): TreasuryKey { return TreasuryKey.fromFields( TreasuryKey.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): TreasuryKey { return TreasuryKey.reified( ).new( { name: decodeFromJSONField(String.reified(), field.name) } ) }

 static fromJSON( json: Record<string, any> ): TreasuryKey { if (json.$typeName !== TreasuryKey.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return TreasuryKey.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): TreasuryKey { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTreasuryKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TreasuryKey object`); } return TreasuryKey.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): TreasuryKey { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTreasuryKey(data.bcs.type)) { throw new Error(`object at is not a TreasuryKey object`); }

 return TreasuryKey.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return TreasuryKey.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<TreasuryKey> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TreasuryKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTreasuryKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TreasuryKey object`); }

 return TreasuryKey.fromSuiObjectData( res.data ); }

 }
