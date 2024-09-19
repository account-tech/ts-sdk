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

/* ============================== ManageUpgrades =============================== */

export function isManageUpgrades(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::ManageUpgrades`; }

export interface ManageUpgradesFields { dummyField: ToField<"bool"> }

export type ManageUpgradesReified = Reified< ManageUpgrades, ManageUpgradesFields >;

export class ManageUpgrades implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::ManageUpgrades`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ManageUpgrades.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::ManageUpgrades`; readonly $typeArgs: []; readonly $isPhantom = ManageUpgrades.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: ManageUpgradesFields, ) { this.$fullTypeName = composeSuiType( ManageUpgrades.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::ManageUpgrades`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): ManageUpgradesReified { return { typeName: ManageUpgrades.$typeName, fullTypeName: composeSuiType( ManageUpgrades.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::ManageUpgrades`, typeArgs: [ ] as [], isPhantom: ManageUpgrades.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ManageUpgrades.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ManageUpgrades.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ManageUpgrades.fromBcs( data, ), bcs: ManageUpgrades.bcs, fromJSONField: (field: any) => ManageUpgrades.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ManageUpgrades.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ManageUpgrades.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ManageUpgrades.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ManageUpgrades.fetch( client, id, ), new: ( fields: ManageUpgradesFields, ) => { return new ManageUpgrades( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ManageUpgrades.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ManageUpgrades>> { return phantom(ManageUpgrades.reified( )); } static get p() { return ManageUpgrades.phantom() }

 static get bcs() { return bcs.struct("ManageUpgrades", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): ManageUpgrades { return ManageUpgrades.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ManageUpgrades { if (!isManageUpgrades(item.type)) { throw new Error("not a ManageUpgrades type");

 }

 return ManageUpgrades.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): ManageUpgrades { return ManageUpgrades.fromFields( ManageUpgrades.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ManageUpgrades { return ManageUpgrades.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): ManageUpgrades { if (json.$typeName !== ManageUpgrades.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ManageUpgrades.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ManageUpgrades { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isManageUpgrades(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ManageUpgrades object`); } return ManageUpgrades.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ManageUpgrades { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isManageUpgrades(data.bcs.type)) { throw new Error(`object at is not a ManageUpgrades object`); }

 return ManageUpgrades.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ManageUpgrades.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ManageUpgrades> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ManageUpgrades object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isManageUpgrades(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ManageUpgrades object`); }

 return ManageUpgrades.fromSuiObjectData( res.data ); }

 }

/* ============================== RestrictAction =============================== */

export function isRestrictAction(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::RestrictAction`; }

export interface RestrictActionFields { policy: ToField<"u8"> }

export type RestrictActionReified = Reified< RestrictAction, RestrictActionFields >;

export class RestrictAction implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::RestrictAction`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = RestrictAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::RestrictAction`; readonly $typeArgs: []; readonly $isPhantom = RestrictAction.$isPhantom;

 readonly policy: ToField<"u8">

 private constructor(typeArgs: [], fields: RestrictActionFields, ) { this.$fullTypeName = composeSuiType( RestrictAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::RestrictAction`; this.$typeArgs = typeArgs;

 this.policy = fields.policy; }

 static reified( ): RestrictActionReified { return { typeName: RestrictAction.$typeName, fullTypeName: composeSuiType( RestrictAction.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::RestrictAction`, typeArgs: [ ] as [], isPhantom: RestrictAction.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => RestrictAction.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => RestrictAction.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => RestrictAction.fromBcs( data, ), bcs: RestrictAction.bcs, fromJSONField: (field: any) => RestrictAction.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => RestrictAction.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => RestrictAction.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => RestrictAction.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => RestrictAction.fetch( client, id, ), new: ( fields: RestrictActionFields, ) => { return new RestrictAction( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return RestrictAction.reified() }

 static phantom( ): PhantomReified<ToTypeStr<RestrictAction>> { return phantom(RestrictAction.reified( )); } static get p() { return RestrictAction.phantom() }

 static get bcs() { return bcs.struct("RestrictAction", {

 policy: bcs.u8()

}) };

 static fromFields( fields: Record<string, any> ): RestrictAction { return RestrictAction.reified( ).new( { policy: decodeFromFields("u8", fields.policy) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): RestrictAction { if (!isRestrictAction(item.type)) { throw new Error("not a RestrictAction type");

 }

 return RestrictAction.reified( ).new( { policy: decodeFromFieldsWithTypes("u8", item.fields.policy) } ) }

 static fromBcs( data: Uint8Array ): RestrictAction { return RestrictAction.fromFields( RestrictAction.bcs.parse(data) ) }

 toJSONField() { return {

 policy: this.policy,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): RestrictAction { return RestrictAction.reified( ).new( { policy: decodeFromJSONField("u8", field.policy) } ) }

 static fromJSON( json: Record<string, any> ): RestrictAction { if (json.$typeName !== RestrictAction.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return RestrictAction.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): RestrictAction { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isRestrictAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a RestrictAction object`); } return RestrictAction.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): RestrictAction { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isRestrictAction(data.bcs.type)) { throw new Error(`object at is not a RestrictAction object`); }

 return RestrictAction.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return RestrictAction.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<RestrictAction> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching RestrictAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isRestrictAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a RestrictAction object`); }

 return RestrictAction.fromSuiObjectData( res.data ); }

 }

/* ============================== RestrictProposal =============================== */

export function isRestrictProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::RestrictProposal`; }

export interface RestrictProposalFields { dummyField: ToField<"bool"> }

export type RestrictProposalReified = Reified< RestrictProposal, RestrictProposalFields >;

export class RestrictProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::RestrictProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = RestrictProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::RestrictProposal`; readonly $typeArgs: []; readonly $isPhantom = RestrictProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: RestrictProposalFields, ) { this.$fullTypeName = composeSuiType( RestrictProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::RestrictProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): RestrictProposalReified { return { typeName: RestrictProposal.$typeName, fullTypeName: composeSuiType( RestrictProposal.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::RestrictProposal`, typeArgs: [ ] as [], isPhantom: RestrictProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => RestrictProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => RestrictProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => RestrictProposal.fromBcs( data, ), bcs: RestrictProposal.bcs, fromJSONField: (field: any) => RestrictProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => RestrictProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => RestrictProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => RestrictProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => RestrictProposal.fetch( client, id, ), new: ( fields: RestrictProposalFields, ) => { return new RestrictProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return RestrictProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<RestrictProposal>> { return phantom(RestrictProposal.reified( )); } static get p() { return RestrictProposal.phantom() }

 static get bcs() { return bcs.struct("RestrictProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): RestrictProposal { return RestrictProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): RestrictProposal { if (!isRestrictProposal(item.type)) { throw new Error("not a RestrictProposal type");

 }

 return RestrictProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): RestrictProposal { return RestrictProposal.fromFields( RestrictProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): RestrictProposal { return RestrictProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): RestrictProposal { if (json.$typeName !== RestrictProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return RestrictProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): RestrictProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isRestrictProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a RestrictProposal object`); } return RestrictProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): RestrictProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isRestrictProposal(data.bcs.type)) { throw new Error(`object at is not a RestrictProposal object`); }

 return RestrictProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return RestrictProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<RestrictProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching RestrictProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isRestrictProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a RestrictProposal object`); }

 return RestrictProposal.fromSuiObjectData( res.data ); }

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

/* ============================== UpgradeAction =============================== */

export function isUpgradeAction(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::UpgradeAction`; }

export interface UpgradeActionFields { digest: ToField<Vector<"u8">> }

export type UpgradeActionReified = Reified< UpgradeAction, UpgradeActionFields >;

export class UpgradeAction implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::UpgradeAction`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = UpgradeAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::UpgradeAction`; readonly $typeArgs: []; readonly $isPhantom = UpgradeAction.$isPhantom;

 readonly digest: ToField<Vector<"u8">>

 private constructor(typeArgs: [], fields: UpgradeActionFields, ) { this.$fullTypeName = composeSuiType( UpgradeAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::UpgradeAction`; this.$typeArgs = typeArgs;

 this.digest = fields.digest; }

 static reified( ): UpgradeActionReified { return { typeName: UpgradeAction.$typeName, fullTypeName: composeSuiType( UpgradeAction.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::UpgradeAction`, typeArgs: [ ] as [], isPhantom: UpgradeAction.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => UpgradeAction.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UpgradeAction.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => UpgradeAction.fromBcs( data, ), bcs: UpgradeAction.bcs, fromJSONField: (field: any) => UpgradeAction.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => UpgradeAction.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => UpgradeAction.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => UpgradeAction.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => UpgradeAction.fetch( client, id, ), new: ( fields: UpgradeActionFields, ) => { return new UpgradeAction( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return UpgradeAction.reified() }

 static phantom( ): PhantomReified<ToTypeStr<UpgradeAction>> { return phantom(UpgradeAction.reified( )); } static get p() { return UpgradeAction.phantom() }

 static get bcs() { return bcs.struct("UpgradeAction", {

 digest: bcs.vector(bcs.u8())

}) };

 static fromFields( fields: Record<string, any> ): UpgradeAction { return UpgradeAction.reified( ).new( { digest: decodeFromFields(reified.vector("u8"), fields.digest) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): UpgradeAction { if (!isUpgradeAction(item.type)) { throw new Error("not a UpgradeAction type");

 }

 return UpgradeAction.reified( ).new( { digest: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.digest) } ) }

 static fromBcs( data: Uint8Array ): UpgradeAction { return UpgradeAction.fromFields( UpgradeAction.bcs.parse(data) ) }

 toJSONField() { return {

 digest: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.digest),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): UpgradeAction { return UpgradeAction.reified( ).new( { digest: decodeFromJSONField(reified.vector("u8"), field.digest) } ) }

 static fromJSON( json: Record<string, any> ): UpgradeAction { if (json.$typeName !== UpgradeAction.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return UpgradeAction.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): UpgradeAction { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpgradeAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UpgradeAction object`); } return UpgradeAction.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): UpgradeAction { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpgradeAction(data.bcs.type)) { throw new Error(`object at is not a UpgradeAction object`); }

 return UpgradeAction.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return UpgradeAction.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<UpgradeAction> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UpgradeAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpgradeAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UpgradeAction object`); }

 return UpgradeAction.fromSuiObjectData( res.data ); }

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

/* ============================== UpgradeProposal =============================== */

export function isUpgradeProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::UpgradeProposal`; }

export interface UpgradeProposalFields { dummyField: ToField<"bool"> }

export type UpgradeProposalReified = Reified< UpgradeProposal, UpgradeProposalFields >;

export class UpgradeProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::UpgradeProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = UpgradeProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::UpgradeProposal`; readonly $typeArgs: []; readonly $isPhantom = UpgradeProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: UpgradeProposalFields, ) { this.$fullTypeName = composeSuiType( UpgradeProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::UpgradeProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): UpgradeProposalReified { return { typeName: UpgradeProposal.$typeName, fullTypeName: composeSuiType( UpgradeProposal.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::UpgradeProposal`, typeArgs: [ ] as [], isPhantom: UpgradeProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => UpgradeProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UpgradeProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => UpgradeProposal.fromBcs( data, ), bcs: UpgradeProposal.bcs, fromJSONField: (field: any) => UpgradeProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => UpgradeProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => UpgradeProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => UpgradeProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => UpgradeProposal.fetch( client, id, ), new: ( fields: UpgradeProposalFields, ) => { return new UpgradeProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return UpgradeProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<UpgradeProposal>> { return phantom(UpgradeProposal.reified( )); } static get p() { return UpgradeProposal.phantom() }

 static get bcs() { return bcs.struct("UpgradeProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): UpgradeProposal { return UpgradeProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): UpgradeProposal { if (!isUpgradeProposal(item.type)) { throw new Error("not a UpgradeProposal type");

 }

 return UpgradeProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): UpgradeProposal { return UpgradeProposal.fromFields( UpgradeProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): UpgradeProposal { return UpgradeProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): UpgradeProposal { if (json.$typeName !== UpgradeProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return UpgradeProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): UpgradeProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpgradeProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UpgradeProposal object`); } return UpgradeProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): UpgradeProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpgradeProposal(data.bcs.type)) { throw new Error(`object at is not a UpgradeProposal object`); }

 return UpgradeProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return UpgradeProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<UpgradeProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UpgradeProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpgradeProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UpgradeProposal object`); }

 return UpgradeProposal.fromSuiObjectData( res.data ); }

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
