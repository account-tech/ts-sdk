import * as reified from "../../_framework/reified";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {Vector} from "../../_framework/vector";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== LockCommand =============================== */

export function isLockCommand(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::LockCommand`; }

export interface LockCommandFields { dummyField: ToField<"bool"> }

export type LockCommandReified = Reified< LockCommand, LockCommandFields >;

export class LockCommand implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::LockCommand`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = LockCommand.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::LockCommand`; readonly $typeArgs: []; readonly $isPhantom = LockCommand.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: LockCommandFields, ) { this.$fullTypeName = composeSuiType( LockCommand.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::LockCommand`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): LockCommandReified { return { typeName: LockCommand.$typeName, fullTypeName: composeSuiType( LockCommand.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::LockCommand`, typeArgs: [ ] as [], isPhantom: LockCommand.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => LockCommand.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => LockCommand.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => LockCommand.fromBcs( data, ), bcs: LockCommand.bcs, fromJSONField: (field: any) => LockCommand.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => LockCommand.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => LockCommand.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => LockCommand.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => LockCommand.fetch( client, id, ), new: ( fields: LockCommandFields, ) => { return new LockCommand( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return LockCommand.reified() }

 static phantom( ): PhantomReified<ToTypeStr<LockCommand>> { return phantom(LockCommand.reified( )); } static get p() { return LockCommand.phantom() }

 static get bcs() { return bcs.struct("LockCommand", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): LockCommand { return LockCommand.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): LockCommand { if (!isLockCommand(item.type)) { throw new Error("not a LockCommand type");

 }

 return LockCommand.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): LockCommand { return LockCommand.fromFields( LockCommand.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): LockCommand { return LockCommand.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): LockCommand { if (json.$typeName !== LockCommand.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return LockCommand.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): LockCommand { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isLockCommand(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a LockCommand object`); } return LockCommand.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): LockCommand { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isLockCommand(data.bcs.type)) { throw new Error(`object at is not a LockCommand object`); }

 return LockCommand.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return LockCommand.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<LockCommand> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching LockCommand object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isLockCommand(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a LockCommand object`); }

 return LockCommand.fromSuiObjectData( res.data ); }

 }

/* ============================== RestrictAction =============================== */

export function isRestrictAction(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::RestrictAction`; }

export interface RestrictActionFields { package: ToField<"address">; policy: ToField<"u8"> }

export type RestrictActionReified = Reified< RestrictAction, RestrictActionFields >;

export class RestrictAction implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::RestrictAction`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = RestrictAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::RestrictAction`; readonly $typeArgs: []; readonly $isPhantom = RestrictAction.$isPhantom;

 readonly package: ToField<"address">; readonly policy: ToField<"u8">

 private constructor(typeArgs: [], fields: RestrictActionFields, ) { this.$fullTypeName = composeSuiType( RestrictAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::RestrictAction`; this.$typeArgs = typeArgs;

 this.package = fields.package;; this.policy = fields.policy; }

 static reified( ): RestrictActionReified { return { typeName: RestrictAction.$typeName, fullTypeName: composeSuiType( RestrictAction.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::RestrictAction`, typeArgs: [ ] as [], isPhantom: RestrictAction.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => RestrictAction.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => RestrictAction.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => RestrictAction.fromBcs( data, ), bcs: RestrictAction.bcs, fromJSONField: (field: any) => RestrictAction.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => RestrictAction.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => RestrictAction.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => RestrictAction.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => RestrictAction.fetch( client, id, ), new: ( fields: RestrictActionFields, ) => { return new RestrictAction( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return RestrictAction.reified() }

 static phantom( ): PhantomReified<ToTypeStr<RestrictAction>> { return phantom(RestrictAction.reified( )); } static get p() { return RestrictAction.phantom() }

 static get bcs() { return bcs.struct("RestrictAction", {

 package: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), policy: bcs.u8()

}) };

 static fromFields( fields: Record<string, any> ): RestrictAction { return RestrictAction.reified( ).new( { package: decodeFromFields("address", fields.package), policy: decodeFromFields("u8", fields.policy) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): RestrictAction { if (!isRestrictAction(item.type)) { throw new Error("not a RestrictAction type");

 }

 return RestrictAction.reified( ).new( { package: decodeFromFieldsWithTypes("address", item.fields.package), policy: decodeFromFieldsWithTypes("u8", item.fields.policy) } ) }

 static fromBcs( data: Uint8Array ): RestrictAction { return RestrictAction.fromFields( RestrictAction.bcs.parse(data) ) }

 toJSONField() { return {

 package: this.package,policy: this.policy,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): RestrictAction { return RestrictAction.reified( ).new( { package: decodeFromJSONField("address", field.package), policy: decodeFromJSONField("u8", field.policy) } ) }

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

/* ============================== UpgradeAction =============================== */

export function isUpgradeAction(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::UpgradeAction`; }

export interface UpgradeActionFields { package: ToField<"address">; digest: ToField<Vector<"u8">> }

export type UpgradeActionReified = Reified< UpgradeAction, UpgradeActionFields >;

export class UpgradeAction implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::UpgradeAction`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = UpgradeAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::UpgradeAction`; readonly $typeArgs: []; readonly $isPhantom = UpgradeAction.$isPhantom;

 readonly package: ToField<"address">; readonly digest: ToField<Vector<"u8">>

 private constructor(typeArgs: [], fields: UpgradeActionFields, ) { this.$fullTypeName = composeSuiType( UpgradeAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::UpgradeAction`; this.$typeArgs = typeArgs;

 this.package = fields.package;; this.digest = fields.digest; }

 static reified( ): UpgradeActionReified { return { typeName: UpgradeAction.$typeName, fullTypeName: composeSuiType( UpgradeAction.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::UpgradeAction`, typeArgs: [ ] as [], isPhantom: UpgradeAction.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => UpgradeAction.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UpgradeAction.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => UpgradeAction.fromBcs( data, ), bcs: UpgradeAction.bcs, fromJSONField: (field: any) => UpgradeAction.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => UpgradeAction.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => UpgradeAction.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => UpgradeAction.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => UpgradeAction.fetch( client, id, ), new: ( fields: UpgradeActionFields, ) => { return new UpgradeAction( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return UpgradeAction.reified() }

 static phantom( ): PhantomReified<ToTypeStr<UpgradeAction>> { return phantom(UpgradeAction.reified( )); } static get p() { return UpgradeAction.phantom() }

 static get bcs() { return bcs.struct("UpgradeAction", {

 package: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), digest: bcs.vector(bcs.u8())

}) };

 static fromFields( fields: Record<string, any> ): UpgradeAction { return UpgradeAction.reified( ).new( { package: decodeFromFields("address", fields.package), digest: decodeFromFields(reified.vector("u8"), fields.digest) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): UpgradeAction { if (!isUpgradeAction(item.type)) { throw new Error("not a UpgradeAction type");

 }

 return UpgradeAction.reified( ).new( { package: decodeFromFieldsWithTypes("address", item.fields.package), digest: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.digest) } ) }

 static fromBcs( data: Uint8Array ): UpgradeAction { return UpgradeAction.fromFields( UpgradeAction.bcs.parse(data) ) }

 toJSONField() { return {

 package: this.package,digest: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.digest),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): UpgradeAction { return UpgradeAction.reified( ).new( { package: decodeFromJSONField("address", field.package), digest: decodeFromJSONField(reified.vector("u8"), field.digest) } ) }

 static fromJSON( json: Record<string, any> ): UpgradeAction { if (json.$typeName !== UpgradeAction.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return UpgradeAction.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): UpgradeAction { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpgradeAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UpgradeAction object`); } return UpgradeAction.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): UpgradeAction { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpgradeAction(data.bcs.type)) { throw new Error(`object at is not a UpgradeAction object`); }

 return UpgradeAction.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return UpgradeAction.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<UpgradeAction> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UpgradeAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpgradeAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UpgradeAction object`); }

 return UpgradeAction.fromSuiObjectData( res.data ); }

 }

/* ============================== UpgradeCapKey =============================== */

export function isUpgradeCapKey(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::UpgradeCapKey`; }

export interface UpgradeCapKeyFields { package: ToField<"address"> }

export type UpgradeCapKeyReified = Reified< UpgradeCapKey, UpgradeCapKeyFields >;

export class UpgradeCapKey implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::UpgradeCapKey`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = UpgradeCapKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::UpgradeCapKey`; readonly $typeArgs: []; readonly $isPhantom = UpgradeCapKey.$isPhantom;

 readonly package: ToField<"address">

 private constructor(typeArgs: [], fields: UpgradeCapKeyFields, ) { this.$fullTypeName = composeSuiType( UpgradeCapKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::UpgradeCapKey`; this.$typeArgs = typeArgs;

 this.package = fields.package; }

 static reified( ): UpgradeCapKeyReified { return { typeName: UpgradeCapKey.$typeName, fullTypeName: composeSuiType( UpgradeCapKey.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::UpgradeCapKey`, typeArgs: [ ] as [], isPhantom: UpgradeCapKey.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => UpgradeCapKey.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UpgradeCapKey.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => UpgradeCapKey.fromBcs( data, ), bcs: UpgradeCapKey.bcs, fromJSONField: (field: any) => UpgradeCapKey.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => UpgradeCapKey.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => UpgradeCapKey.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => UpgradeCapKey.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => UpgradeCapKey.fetch( client, id, ), new: ( fields: UpgradeCapKeyFields, ) => { return new UpgradeCapKey( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return UpgradeCapKey.reified() }

 static phantom( ): PhantomReified<ToTypeStr<UpgradeCapKey>> { return phantom(UpgradeCapKey.reified( )); } static get p() { return UpgradeCapKey.phantom() }

 static get bcs() { return bcs.struct("UpgradeCapKey", {

 package: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields( fields: Record<string, any> ): UpgradeCapKey { return UpgradeCapKey.reified( ).new( { package: decodeFromFields("address", fields.package) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): UpgradeCapKey { if (!isUpgradeCapKey(item.type)) { throw new Error("not a UpgradeCapKey type");

 }

 return UpgradeCapKey.reified( ).new( { package: decodeFromFieldsWithTypes("address", item.fields.package) } ) }

 static fromBcs( data: Uint8Array ): UpgradeCapKey { return UpgradeCapKey.fromFields( UpgradeCapKey.bcs.parse(data) ) }

 toJSONField() { return {

 package: this.package,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): UpgradeCapKey { return UpgradeCapKey.reified( ).new( { package: decodeFromJSONField("address", field.package) } ) }

 static fromJSON( json: Record<string, any> ): UpgradeCapKey { if (json.$typeName !== UpgradeCapKey.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return UpgradeCapKey.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): UpgradeCapKey { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpgradeCapKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UpgradeCapKey object`); } return UpgradeCapKey.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): UpgradeCapKey { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpgradeCapKey(data.bcs.type)) { throw new Error(`object at is not a UpgradeCapKey object`); }

 return UpgradeCapKey.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return UpgradeCapKey.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<UpgradeCapKey> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UpgradeCapKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpgradeCapKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UpgradeCapKey object`); }

 return UpgradeCapKey.fromSuiObjectData( res.data ); }

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

/* ============================== UpgradeRules =============================== */

export function isUpgradeRules(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::UpgradeRules`; }

export interface UpgradeRulesFields { capId: ToField<ID>; name: ToField<String>; delayMs: ToField<"u64"> }

export type UpgradeRulesReified = Reified< UpgradeRules, UpgradeRulesFields >;

export class UpgradeRules implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::UpgradeRules`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = UpgradeRules.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::UpgradeRules`; readonly $typeArgs: []; readonly $isPhantom = UpgradeRules.$isPhantom;

 readonly capId: ToField<ID>; readonly name: ToField<String>; readonly delayMs: ToField<"u64">

 private constructor(typeArgs: [], fields: UpgradeRulesFields, ) { this.$fullTypeName = composeSuiType( UpgradeRules.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::UpgradeRules`; this.$typeArgs = typeArgs;

 this.capId = fields.capId;; this.name = fields.name;; this.delayMs = fields.delayMs; }

 static reified( ): UpgradeRulesReified { return { typeName: UpgradeRules.$typeName, fullTypeName: composeSuiType( UpgradeRules.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::UpgradeRules`, typeArgs: [ ] as [], isPhantom: UpgradeRules.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => UpgradeRules.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UpgradeRules.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => UpgradeRules.fromBcs( data, ), bcs: UpgradeRules.bcs, fromJSONField: (field: any) => UpgradeRules.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => UpgradeRules.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => UpgradeRules.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => UpgradeRules.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => UpgradeRules.fetch( client, id, ), new: ( fields: UpgradeRulesFields, ) => { return new UpgradeRules( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return UpgradeRules.reified() }

 static phantom( ): PhantomReified<ToTypeStr<UpgradeRules>> { return phantom(UpgradeRules.reified( )); } static get p() { return UpgradeRules.phantom() }

 static get bcs() { return bcs.struct("UpgradeRules", {

 cap_id: ID.bcs, name: String.bcs, delay_ms: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): UpgradeRules { return UpgradeRules.reified( ).new( { capId: decodeFromFields(ID.reified(), fields.cap_id), name: decodeFromFields(String.reified(), fields.name), delayMs: decodeFromFields("u64", fields.delay_ms) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): UpgradeRules { if (!isUpgradeRules(item.type)) { throw new Error("not a UpgradeRules type");

 }

 return UpgradeRules.reified( ).new( { capId: decodeFromFieldsWithTypes(ID.reified(), item.fields.cap_id), name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), delayMs: decodeFromFieldsWithTypes("u64", item.fields.delay_ms) } ) }

 static fromBcs( data: Uint8Array ): UpgradeRules { return UpgradeRules.fromFields( UpgradeRules.bcs.parse(data) ) }

 toJSONField() { return {

 capId: this.capId,name: this.name,delayMs: this.delayMs.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): UpgradeRules { return UpgradeRules.reified( ).new( { capId: decodeFromJSONField(ID.reified(), field.capId), name: decodeFromJSONField(String.reified(), field.name), delayMs: decodeFromJSONField("u64", field.delayMs) } ) }

 static fromJSON( json: Record<string, any> ): UpgradeRules { if (json.$typeName !== UpgradeRules.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return UpgradeRules.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): UpgradeRules { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpgradeRules(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UpgradeRules object`); } return UpgradeRules.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): UpgradeRules { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpgradeRules(data.bcs.type)) { throw new Error(`object at is not a UpgradeRules object`); }

 return UpgradeRules.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return UpgradeRules.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<UpgradeRules> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UpgradeRules object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpgradeRules(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UpgradeRules object`); }

 return UpgradeRules.fromSuiObjectData( res.data ); }

 }

/* ============================== UpgradeRulesKey =============================== */

export function isUpgradeRulesKey(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::UpgradeRulesKey`; }

export interface UpgradeRulesKeyFields { package: ToField<"address"> }

export type UpgradeRulesKeyReified = Reified< UpgradeRulesKey, UpgradeRulesKeyFields >;

export class UpgradeRulesKey implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_policies::UpgradeRulesKey`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = UpgradeRulesKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::UpgradeRulesKey`; readonly $typeArgs: []; readonly $isPhantom = UpgradeRulesKey.$isPhantom;

 readonly package: ToField<"address">

 private constructor(typeArgs: [], fields: UpgradeRulesKeyFields, ) { this.$fullTypeName = composeSuiType( UpgradeRulesKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::UpgradeRulesKey`; this.$typeArgs = typeArgs;

 this.package = fields.package; }

 static reified( ): UpgradeRulesKeyReified { return { typeName: UpgradeRulesKey.$typeName, fullTypeName: composeSuiType( UpgradeRulesKey.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::UpgradeRulesKey`, typeArgs: [ ] as [], isPhantom: UpgradeRulesKey.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => UpgradeRulesKey.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UpgradeRulesKey.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => UpgradeRulesKey.fromBcs( data, ), bcs: UpgradeRulesKey.bcs, fromJSONField: (field: any) => UpgradeRulesKey.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => UpgradeRulesKey.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => UpgradeRulesKey.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => UpgradeRulesKey.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => UpgradeRulesKey.fetch( client, id, ), new: ( fields: UpgradeRulesKeyFields, ) => { return new UpgradeRulesKey( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return UpgradeRulesKey.reified() }

 static phantom( ): PhantomReified<ToTypeStr<UpgradeRulesKey>> { return phantom(UpgradeRulesKey.reified( )); } static get p() { return UpgradeRulesKey.phantom() }

 static get bcs() { return bcs.struct("UpgradeRulesKey", {

 package: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields( fields: Record<string, any> ): UpgradeRulesKey { return UpgradeRulesKey.reified( ).new( { package: decodeFromFields("address", fields.package) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): UpgradeRulesKey { if (!isUpgradeRulesKey(item.type)) { throw new Error("not a UpgradeRulesKey type");

 }

 return UpgradeRulesKey.reified( ).new( { package: decodeFromFieldsWithTypes("address", item.fields.package) } ) }

 static fromBcs( data: Uint8Array ): UpgradeRulesKey { return UpgradeRulesKey.fromFields( UpgradeRulesKey.bcs.parse(data) ) }

 toJSONField() { return {

 package: this.package,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): UpgradeRulesKey { return UpgradeRulesKey.reified( ).new( { package: decodeFromJSONField("address", field.package) } ) }

 static fromJSON( json: Record<string, any> ): UpgradeRulesKey { if (json.$typeName !== UpgradeRulesKey.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return UpgradeRulesKey.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): UpgradeRulesKey { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpgradeRulesKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UpgradeRulesKey object`); } return UpgradeRulesKey.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): UpgradeRulesKey { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpgradeRulesKey(data.bcs.type)) { throw new Error(`object at is not a UpgradeRulesKey object`); }

 return UpgradeRulesKey.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return UpgradeRulesKey.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<UpgradeRulesKey> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UpgradeRulesKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpgradeRulesKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UpgradeRulesKey object`); }

 return UpgradeRulesKey.fromSuiObjectData( res.data ); }

 }
