import * as reified from "../../_framework/reified";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID, UID} from "../../_dependencies/source/0x2/object/structs";
import {UpgradeCap} from "../../_dependencies/source/0x2/package/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {Vector} from "../../_framework/vector";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== Issuer =============================== */

export function isIssuer(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::Issuer`; }

export interface IssuerFields { dummyField: ToField<"bool"> }

export type IssuerReified = Reified< Issuer, IssuerFields >;

export class Issuer implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::Issuer`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Issuer.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::Issuer`; readonly $typeArgs: []; readonly $isPhantom = Issuer.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: IssuerFields, ) { this.$fullTypeName = composeSuiType( Issuer.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::Issuer`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): IssuerReified { return { typeName: Issuer.$typeName, fullTypeName: composeSuiType( Issuer.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::Issuer`, typeArgs: [ ] as [], isPhantom: Issuer.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Issuer.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Issuer.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Issuer.fromBcs( data, ), bcs: Issuer.bcs, fromJSONField: (field: any) => Issuer.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Issuer.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Issuer.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Issuer.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Issuer.fetch( client, id, ), new: ( fields: IssuerFields, ) => { return new Issuer( [], fields ) }, kind: "StructClassReified", } }

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

/* ============================== Restrict =============================== */

export function isRestrict(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::Restrict`; }

export interface RestrictFields { policy: ToField<"u8"> }

export type RestrictReified = Reified< Restrict, RestrictFields >;

export class Restrict implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::Restrict`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Restrict.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::Restrict`; readonly $typeArgs: []; readonly $isPhantom = Restrict.$isPhantom;

 readonly policy: ToField<"u8">

 private constructor(typeArgs: [], fields: RestrictFields, ) { this.$fullTypeName = composeSuiType( Restrict.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::Restrict`; this.$typeArgs = typeArgs;

 this.policy = fields.policy; }

 static reified( ): RestrictReified { return { typeName: Restrict.$typeName, fullTypeName: composeSuiType( Restrict.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::Restrict`, typeArgs: [ ] as [], isPhantom: Restrict.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Restrict.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Restrict.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Restrict.fromBcs( data, ), bcs: Restrict.bcs, fromJSONField: (field: any) => Restrict.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Restrict.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Restrict.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Restrict.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Restrict.fetch( client, id, ), new: ( fields: RestrictFields, ) => { return new Restrict( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Restrict.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Restrict>> { return phantom(Restrict.reified( )); } static get p() { return Restrict.phantom() }

 static get bcs() { return bcs.struct("Restrict", {

 policy: bcs.u8()

}) };

 static fromFields( fields: Record<string, any> ): Restrict { return Restrict.reified( ).new( { policy: decodeFromFields("u8", fields.policy) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Restrict { if (!isRestrict(item.type)) { throw new Error("not a Restrict type");

 }

 return Restrict.reified( ).new( { policy: decodeFromFieldsWithTypes("u8", item.fields.policy) } ) }

 static fromBcs( data: Uint8Array ): Restrict { return Restrict.fromFields( Restrict.bcs.parse(data) ) }

 toJSONField() { return {

 policy: this.policy,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Restrict { return Restrict.reified( ).new( { policy: decodeFromJSONField("u8", field.policy) } ) }

 static fromJSON( json: Record<string, any> ): Restrict { if (json.$typeName !== Restrict.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Restrict.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Restrict { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isRestrict(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Restrict object`); } return Restrict.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Restrict { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isRestrict(data.bcs.type)) { throw new Error(`object at is not a Restrict object`); }

 return Restrict.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Restrict.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Restrict> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Restrict object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isRestrict(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Restrict object`); }

 return Restrict.fromSuiObjectData( res.data ); }

 }

/* ============================== Restricted =============================== */

export function isRestricted(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::Restricted`; }

export interface RestrictedFields { packageId: ToField<ID>; policy: ToField<"u8"> }

export type RestrictedReified = Reified< Restricted, RestrictedFields >;

export class Restricted implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::Restricted`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Restricted.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::Restricted`; readonly $typeArgs: []; readonly $isPhantom = Restricted.$isPhantom;

 readonly packageId: ToField<ID>; readonly policy: ToField<"u8">

 private constructor(typeArgs: [], fields: RestrictedFields, ) { this.$fullTypeName = composeSuiType( Restricted.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::Restricted`; this.$typeArgs = typeArgs;

 this.packageId = fields.packageId;; this.policy = fields.policy; }

 static reified( ): RestrictedReified { return { typeName: Restricted.$typeName, fullTypeName: composeSuiType( Restricted.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::Restricted`, typeArgs: [ ] as [], isPhantom: Restricted.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Restricted.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Restricted.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Restricted.fromBcs( data, ), bcs: Restricted.bcs, fromJSONField: (field: any) => Restricted.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Restricted.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Restricted.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Restricted.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Restricted.fetch( client, id, ), new: ( fields: RestrictedFields, ) => { return new Restricted( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Restricted.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Restricted>> { return phantom(Restricted.reified( )); } static get p() { return Restricted.phantom() }

 static get bcs() { return bcs.struct("Restricted", {

 package_id: ID.bcs, policy: bcs.u8()

}) };

 static fromFields( fields: Record<string, any> ): Restricted { return Restricted.reified( ).new( { packageId: decodeFromFields(ID.reified(), fields.package_id), policy: decodeFromFields("u8", fields.policy) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Restricted { if (!isRestricted(item.type)) { throw new Error("not a Restricted type");

 }

 return Restricted.reified( ).new( { packageId: decodeFromFieldsWithTypes(ID.reified(), item.fields.package_id), policy: decodeFromFieldsWithTypes("u8", item.fields.policy) } ) }

 static fromBcs( data: Uint8Array ): Restricted { return Restricted.fromFields( Restricted.bcs.parse(data) ) }

 toJSONField() { return {

 packageId: this.packageId,policy: this.policy,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Restricted { return Restricted.reified( ).new( { packageId: decodeFromJSONField(ID.reified(), field.packageId), policy: decodeFromJSONField("u8", field.policy) } ) }

 static fromJSON( json: Record<string, any> ): Restricted { if (json.$typeName !== Restricted.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Restricted.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Restricted { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isRestricted(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Restricted object`); } return Restricted.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Restricted { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isRestricted(data.bcs.type)) { throw new Error(`object at is not a Restricted object`); }

 return Restricted.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Restricted.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Restricted> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Restricted object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isRestricted(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Restricted object`); }

 return Restricted.fromSuiObjectData( res.data ); }

 }

/* ============================== TimeLock =============================== */

export function isTimeLock(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::TimeLock`; }

export interface TimeLockFields { delayMs: ToField<"u64"> }

export type TimeLockReified = Reified< TimeLock, TimeLockFields >;

export class TimeLock implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::TimeLock`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = TimeLock.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::TimeLock`; readonly $typeArgs: []; readonly $isPhantom = TimeLock.$isPhantom;

 readonly delayMs: ToField<"u64">

 private constructor(typeArgs: [], fields: TimeLockFields, ) { this.$fullTypeName = composeSuiType( TimeLock.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::TimeLock`; this.$typeArgs = typeArgs;

 this.delayMs = fields.delayMs; }

 static reified( ): TimeLockReified { return { typeName: TimeLock.$typeName, fullTypeName: composeSuiType( TimeLock.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::TimeLock`, typeArgs: [ ] as [], isPhantom: TimeLock.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => TimeLock.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TimeLock.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => TimeLock.fromBcs( data, ), bcs: TimeLock.bcs, fromJSONField: (field: any) => TimeLock.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => TimeLock.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => TimeLock.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => TimeLock.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => TimeLock.fetch( client, id, ), new: ( fields: TimeLockFields, ) => { return new TimeLock( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return TimeLock.reified() }

 static phantom( ): PhantomReified<ToTypeStr<TimeLock>> { return phantom(TimeLock.reified( )); } static get p() { return TimeLock.phantom() }

 static get bcs() { return bcs.struct("TimeLock", {

 delay_ms: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): TimeLock { return TimeLock.reified( ).new( { delayMs: decodeFromFields("u64", fields.delay_ms) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): TimeLock { if (!isTimeLock(item.type)) { throw new Error("not a TimeLock type");

 }

 return TimeLock.reified( ).new( { delayMs: decodeFromFieldsWithTypes("u64", item.fields.delay_ms) } ) }

 static fromBcs( data: Uint8Array ): TimeLock { return TimeLock.fromFields( TimeLock.bcs.parse(data) ) }

 toJSONField() { return {

 delayMs: this.delayMs.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): TimeLock { return TimeLock.reified( ).new( { delayMs: decodeFromJSONField("u64", field.delayMs) } ) }

 static fromJSON( json: Record<string, any> ): TimeLock { if (json.$typeName !== TimeLock.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return TimeLock.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): TimeLock { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTimeLock(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TimeLock object`); } return TimeLock.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): TimeLock { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTimeLock(data.bcs.type)) { throw new Error(`object at is not a TimeLock object`); }

 return TimeLock.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return TimeLock.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<TimeLock> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TimeLock object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTimeLock(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TimeLock object`); }

 return TimeLock.fromSuiObjectData( res.data ); }

 }

/* ============================== TimeLockKey =============================== */

export function isTimeLockKey(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::TimeLockKey`; }

export interface TimeLockKeyFields { dummyField: ToField<"bool"> }

export type TimeLockKeyReified = Reified< TimeLockKey, TimeLockKeyFields >;

export class TimeLockKey implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::TimeLockKey`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = TimeLockKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::TimeLockKey`; readonly $typeArgs: []; readonly $isPhantom = TimeLockKey.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: TimeLockKeyFields, ) { this.$fullTypeName = composeSuiType( TimeLockKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::TimeLockKey`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): TimeLockKeyReified { return { typeName: TimeLockKey.$typeName, fullTypeName: composeSuiType( TimeLockKey.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::TimeLockKey`, typeArgs: [ ] as [], isPhantom: TimeLockKey.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => TimeLockKey.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TimeLockKey.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => TimeLockKey.fromBcs( data, ), bcs: TimeLockKey.bcs, fromJSONField: (field: any) => TimeLockKey.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => TimeLockKey.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => TimeLockKey.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => TimeLockKey.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => TimeLockKey.fetch( client, id, ), new: ( fields: TimeLockKeyFields, ) => { return new TimeLockKey( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return TimeLockKey.reified() }

 static phantom( ): PhantomReified<ToTypeStr<TimeLockKey>> { return phantom(TimeLockKey.reified( )); } static get p() { return TimeLockKey.phantom() }

 static get bcs() { return bcs.struct("TimeLockKey", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): TimeLockKey { return TimeLockKey.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): TimeLockKey { if (!isTimeLockKey(item.type)) { throw new Error("not a TimeLockKey type");

 }

 return TimeLockKey.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): TimeLockKey { return TimeLockKey.fromFields( TimeLockKey.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): TimeLockKey { return TimeLockKey.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): TimeLockKey { if (json.$typeName !== TimeLockKey.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return TimeLockKey.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): TimeLockKey { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTimeLockKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TimeLockKey object`); } return TimeLockKey.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): TimeLockKey { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTimeLockKey(data.bcs.type)) { throw new Error(`object at is not a TimeLockKey object`); }

 return TimeLockKey.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return TimeLockKey.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<TimeLockKey> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TimeLockKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTimeLockKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TimeLockKey object`); }

 return TimeLockKey.fromSuiObjectData( res.data ); }

 }

/* ============================== Upgrade =============================== */

export function isUpgrade(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::Upgrade`; }

export interface UpgradeFields { digest: ToField<Vector<"u8">> }

export type UpgradeReified = Reified< Upgrade, UpgradeFields >;

export class Upgrade implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::Upgrade`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Upgrade.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::Upgrade`; readonly $typeArgs: []; readonly $isPhantom = Upgrade.$isPhantom;

 readonly digest: ToField<Vector<"u8">>

 private constructor(typeArgs: [], fields: UpgradeFields, ) { this.$fullTypeName = composeSuiType( Upgrade.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::Upgrade`; this.$typeArgs = typeArgs;

 this.digest = fields.digest; }

 static reified( ): UpgradeReified { return { typeName: Upgrade.$typeName, fullTypeName: composeSuiType( Upgrade.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::Upgrade`, typeArgs: [ ] as [], isPhantom: Upgrade.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Upgrade.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Upgrade.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Upgrade.fromBcs( data, ), bcs: Upgrade.bcs, fromJSONField: (field: any) => Upgrade.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Upgrade.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Upgrade.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Upgrade.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Upgrade.fetch( client, id, ), new: ( fields: UpgradeFields, ) => { return new Upgrade( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Upgrade.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Upgrade>> { return phantom(Upgrade.reified( )); } static get p() { return Upgrade.phantom() }

 static get bcs() { return bcs.struct("Upgrade", {

 digest: bcs.vector(bcs.u8())

}) };

 static fromFields( fields: Record<string, any> ): Upgrade { return Upgrade.reified( ).new( { digest: decodeFromFields(reified.vector("u8"), fields.digest) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Upgrade { if (!isUpgrade(item.type)) { throw new Error("not a Upgrade type");

 }

 return Upgrade.reified( ).new( { digest: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.digest) } ) }

 static fromBcs( data: Uint8Array ): Upgrade { return Upgrade.fromFields( Upgrade.bcs.parse(data) ) }

 toJSONField() { return {

 digest: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.digest),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Upgrade { return Upgrade.reified( ).new( { digest: decodeFromJSONField(reified.vector("u8"), field.digest) } ) }

 static fromJSON( json: Record<string, any> ): Upgrade { if (json.$typeName !== Upgrade.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Upgrade.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Upgrade { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpgrade(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Upgrade object`); } return Upgrade.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Upgrade { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpgrade(data.bcs.type)) { throw new Error(`object at is not a Upgrade object`); }

 return Upgrade.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Upgrade.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Upgrade> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Upgrade object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpgrade(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Upgrade object`); }

 return Upgrade.fromSuiObjectData( res.data ); }

 }

/* ============================== UpgradeKey =============================== */

export function isUpgradeKey(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::UpgradeKey`; }

export interface UpgradeKeyFields { name: ToField<String> }

export type UpgradeKeyReified = Reified< UpgradeKey, UpgradeKeyFields >;

export class UpgradeKey implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::UpgradeKey`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = UpgradeKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::UpgradeKey`; readonly $typeArgs: []; readonly $isPhantom = UpgradeKey.$isPhantom;

 readonly name: ToField<String>

 private constructor(typeArgs: [], fields: UpgradeKeyFields, ) { this.$fullTypeName = composeSuiType( UpgradeKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::UpgradeKey`; this.$typeArgs = typeArgs;

 this.name = fields.name; }

 static reified( ): UpgradeKeyReified { return { typeName: UpgradeKey.$typeName, fullTypeName: composeSuiType( UpgradeKey.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::UpgradeKey`, typeArgs: [ ] as [], isPhantom: UpgradeKey.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => UpgradeKey.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UpgradeKey.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => UpgradeKey.fromBcs( data, ), bcs: UpgradeKey.bcs, fromJSONField: (field: any) => UpgradeKey.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => UpgradeKey.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => UpgradeKey.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => UpgradeKey.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => UpgradeKey.fetch( client, id, ), new: ( fields: UpgradeKeyFields, ) => { return new UpgradeKey( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return UpgradeKey.reified() }

 static phantom( ): PhantomReified<ToTypeStr<UpgradeKey>> { return phantom(UpgradeKey.reified( )); } static get p() { return UpgradeKey.phantom() }

 static get bcs() { return bcs.struct("UpgradeKey", {

 name: String.bcs

}) };

 static fromFields( fields: Record<string, any> ): UpgradeKey { return UpgradeKey.reified( ).new( { name: decodeFromFields(String.reified(), fields.name) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): UpgradeKey { if (!isUpgradeKey(item.type)) { throw new Error("not a UpgradeKey type");

 }

 return UpgradeKey.reified( ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name) } ) }

 static fromBcs( data: Uint8Array ): UpgradeKey { return UpgradeKey.fromFields( UpgradeKey.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): UpgradeKey { return UpgradeKey.reified( ).new( { name: decodeFromJSONField(String.reified(), field.name) } ) }

 static fromJSON( json: Record<string, any> ): UpgradeKey { if (json.$typeName !== UpgradeKey.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return UpgradeKey.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): UpgradeKey { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpgradeKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UpgradeKey object`); } return UpgradeKey.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): UpgradeKey { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpgradeKey(data.bcs.type)) { throw new Error(`object at is not a UpgradeKey object`); }

 return UpgradeKey.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return UpgradeKey.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<UpgradeKey> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UpgradeKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpgradeKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UpgradeKey object`); }

 return UpgradeKey.fromSuiObjectData( res.data ); }

 }

/* ============================== UpgradeLock =============================== */

export function isUpgradeLock(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::UpgradeLock`; }

export interface UpgradeLockFields { id: ToField<UID>; upgradeCap: ToField<UpgradeCap> }

export type UpgradeLockReified = Reified< UpgradeLock, UpgradeLockFields >;

export class UpgradeLock implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::UpgradeLock`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = UpgradeLock.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::UpgradeLock`; readonly $typeArgs: []; readonly $isPhantom = UpgradeLock.$isPhantom;

 readonly id: ToField<UID>; readonly upgradeCap: ToField<UpgradeCap>

 private constructor(typeArgs: [], fields: UpgradeLockFields, ) { this.$fullTypeName = composeSuiType( UpgradeLock.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::UpgradeLock`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.upgradeCap = fields.upgradeCap; }

 static reified( ): UpgradeLockReified { return { typeName: UpgradeLock.$typeName, fullTypeName: composeSuiType( UpgradeLock.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::UpgradeLock`, typeArgs: [ ] as [], isPhantom: UpgradeLock.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => UpgradeLock.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UpgradeLock.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => UpgradeLock.fromBcs( data, ), bcs: UpgradeLock.bcs, fromJSONField: (field: any) => UpgradeLock.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => UpgradeLock.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => UpgradeLock.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => UpgradeLock.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => UpgradeLock.fetch( client, id, ), new: ( fields: UpgradeLockFields, ) => { return new UpgradeLock( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return UpgradeLock.reified() }

 static phantom( ): PhantomReified<ToTypeStr<UpgradeLock>> { return phantom(UpgradeLock.reified( )); } static get p() { return UpgradeLock.phantom() }

 static get bcs() { return bcs.struct("UpgradeLock", {

 id: UID.bcs, upgrade_cap: UpgradeCap.bcs

}) };

 static fromFields( fields: Record<string, any> ): UpgradeLock { return UpgradeLock.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), upgradeCap: decodeFromFields(UpgradeCap.reified(), fields.upgrade_cap) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): UpgradeLock { if (!isUpgradeLock(item.type)) { throw new Error("not a UpgradeLock type");

 }

 return UpgradeLock.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), upgradeCap: decodeFromFieldsWithTypes(UpgradeCap.reified(), item.fields.upgrade_cap) } ) }

 static fromBcs( data: Uint8Array ): UpgradeLock { return UpgradeLock.fromFields( UpgradeLock.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,upgradeCap: this.upgradeCap.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): UpgradeLock { return UpgradeLock.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), upgradeCap: decodeFromJSONField(UpgradeCap.reified(), field.upgradeCap) } ) }

 static fromJSON( json: Record<string, any> ): UpgradeLock { if (json.$typeName !== UpgradeLock.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return UpgradeLock.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): UpgradeLock { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpgradeLock(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UpgradeLock object`); } return UpgradeLock.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): UpgradeLock { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpgradeLock(data.bcs.type)) { throw new Error(`object at is not a UpgradeLock object`); }

 return UpgradeLock.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return UpgradeLock.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<UpgradeLock> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UpgradeLock object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpgradeLock(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UpgradeLock object`); }

 return UpgradeLock.fromSuiObjectData( res.data ); }

 }

/* ============================== Upgraded =============================== */

export function isUpgraded(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::Upgraded`; }

export interface UpgradedFields { packageId: ToField<ID>; digest: ToField<Vector<"u8">> }

export type UpgradedReified = Reified< Upgraded, UpgradedFields >;

export class Upgraded implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::Upgraded`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Upgraded.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::Upgraded`; readonly $typeArgs: []; readonly $isPhantom = Upgraded.$isPhantom;

 readonly packageId: ToField<ID>; readonly digest: ToField<Vector<"u8">>

 private constructor(typeArgs: [], fields: UpgradedFields, ) { this.$fullTypeName = composeSuiType( Upgraded.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::Upgraded`; this.$typeArgs = typeArgs;

 this.packageId = fields.packageId;; this.digest = fields.digest; }

 static reified( ): UpgradedReified { return { typeName: Upgraded.$typeName, fullTypeName: composeSuiType( Upgraded.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::Upgraded`, typeArgs: [ ] as [], isPhantom: Upgraded.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Upgraded.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Upgraded.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Upgraded.fromBcs( data, ), bcs: Upgraded.bcs, fromJSONField: (field: any) => Upgraded.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Upgraded.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Upgraded.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Upgraded.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Upgraded.fetch( client, id, ), new: ( fields: UpgradedFields, ) => { return new Upgraded( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Upgraded.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Upgraded>> { return phantom(Upgraded.reified( )); } static get p() { return Upgraded.phantom() }

 static get bcs() { return bcs.struct("Upgraded", {

 package_id: ID.bcs, digest: bcs.vector(bcs.u8())

}) };

 static fromFields( fields: Record<string, any> ): Upgraded { return Upgraded.reified( ).new( { packageId: decodeFromFields(ID.reified(), fields.package_id), digest: decodeFromFields(reified.vector("u8"), fields.digest) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Upgraded { if (!isUpgraded(item.type)) { throw new Error("not a Upgraded type");

 }

 return Upgraded.reified( ).new( { packageId: decodeFromFieldsWithTypes(ID.reified(), item.fields.package_id), digest: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.digest) } ) }

 static fromBcs( data: Uint8Array ): Upgraded { return Upgraded.fromFields( Upgraded.bcs.parse(data) ) }

 toJSONField() { return {

 packageId: this.packageId,digest: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.digest),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Upgraded { return Upgraded.reified( ).new( { packageId: decodeFromJSONField(ID.reified(), field.packageId), digest: decodeFromJSONField(reified.vector("u8"), field.digest) } ) }

 static fromJSON( json: Record<string, any> ): Upgraded { if (json.$typeName !== Upgraded.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Upgraded.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Upgraded { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpgraded(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Upgraded object`); } return Upgraded.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Upgraded { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpgraded(data.bcs.type)) { throw new Error(`object at is not a Upgraded object`); }

 return Upgraded.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Upgraded.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Upgraded> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Upgraded object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpgraded(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Upgraded object`); }

 return Upgraded.fromSuiObjectData( res.data ); }

 }
