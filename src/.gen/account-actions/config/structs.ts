import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {Deps} from "../../account-protocol/deps/structs";
import {Metadata} from "../../account-protocol/metadata/structs";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== ConfigDepsAction =============================== */

export function isConfigDepsAction(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::config::ConfigDepsAction`; }

export interface ConfigDepsActionFields { deps: ToField<Deps> }

export type ConfigDepsActionReified = Reified< ConfigDepsAction, ConfigDepsActionFields >;

export class ConfigDepsAction implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::config::ConfigDepsAction`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ConfigDepsAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::config::ConfigDepsAction`; readonly $typeArgs: []; readonly $isPhantom = ConfigDepsAction.$isPhantom;

 readonly deps: ToField<Deps>

 private constructor(typeArgs: [], fields: ConfigDepsActionFields, ) { this.$fullTypeName = composeSuiType( ConfigDepsAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::config::ConfigDepsAction`; this.$typeArgs = typeArgs;

 this.deps = fields.deps; }

 static reified( ): ConfigDepsActionReified { return { typeName: ConfigDepsAction.$typeName, fullTypeName: composeSuiType( ConfigDepsAction.$typeName, ...[] ) as `${typeof PKG_V1}::config::ConfigDepsAction`, typeArgs: [ ] as [], isPhantom: ConfigDepsAction.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ConfigDepsAction.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigDepsAction.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ConfigDepsAction.fromBcs( data, ), bcs: ConfigDepsAction.bcs, fromJSONField: (field: any) => ConfigDepsAction.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ConfigDepsAction.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ConfigDepsAction.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ConfigDepsAction.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ConfigDepsAction.fetch( client, id, ), new: ( fields: ConfigDepsActionFields, ) => { return new ConfigDepsAction( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ConfigDepsAction.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ConfigDepsAction>> { return phantom(ConfigDepsAction.reified( )); } static get p() { return ConfigDepsAction.phantom() }

 static get bcs() { return bcs.struct("ConfigDepsAction", {

 deps: Deps.bcs

}) };

 static fromFields( fields: Record<string, any> ): ConfigDepsAction { return ConfigDepsAction.reified( ).new( { deps: decodeFromFields(Deps.reified(), fields.deps) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ConfigDepsAction { if (!isConfigDepsAction(item.type)) { throw new Error("not a ConfigDepsAction type");

 }

 return ConfigDepsAction.reified( ).new( { deps: decodeFromFieldsWithTypes(Deps.reified(), item.fields.deps) } ) }

 static fromBcs( data: Uint8Array ): ConfigDepsAction { return ConfigDepsAction.fromFields( ConfigDepsAction.bcs.parse(data) ) }

 toJSONField() { return {

 deps: this.deps.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ConfigDepsAction { return ConfigDepsAction.reified( ).new( { deps: decodeFromJSONField(Deps.reified(), field.deps) } ) }

 static fromJSON( json: Record<string, any> ): ConfigDepsAction { if (json.$typeName !== ConfigDepsAction.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ConfigDepsAction.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ConfigDepsAction { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfigDepsAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ConfigDepsAction object`); } return ConfigDepsAction.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ConfigDepsAction { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isConfigDepsAction(data.bcs.type)) { throw new Error(`object at is not a ConfigDepsAction object`); }

 return ConfigDepsAction.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ConfigDepsAction.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ConfigDepsAction> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ConfigDepsAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfigDepsAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ConfigDepsAction object`); }

 return ConfigDepsAction.fromSuiObjectData( res.data ); }

 }

/* ============================== ConfigDepsProposal =============================== */

export function isConfigDepsProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::config::ConfigDepsProposal`; }

export interface ConfigDepsProposalFields { dummyField: ToField<"bool"> }

export type ConfigDepsProposalReified = Reified< ConfigDepsProposal, ConfigDepsProposalFields >;

export class ConfigDepsProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::config::ConfigDepsProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ConfigDepsProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::config::ConfigDepsProposal`; readonly $typeArgs: []; readonly $isPhantom = ConfigDepsProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: ConfigDepsProposalFields, ) { this.$fullTypeName = composeSuiType( ConfigDepsProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::config::ConfigDepsProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): ConfigDepsProposalReified { return { typeName: ConfigDepsProposal.$typeName, fullTypeName: composeSuiType( ConfigDepsProposal.$typeName, ...[] ) as `${typeof PKG_V1}::config::ConfigDepsProposal`, typeArgs: [ ] as [], isPhantom: ConfigDepsProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ConfigDepsProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigDepsProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ConfigDepsProposal.fromBcs( data, ), bcs: ConfigDepsProposal.bcs, fromJSONField: (field: any) => ConfigDepsProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ConfigDepsProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ConfigDepsProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ConfigDepsProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ConfigDepsProposal.fetch( client, id, ), new: ( fields: ConfigDepsProposalFields, ) => { return new ConfigDepsProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ConfigDepsProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ConfigDepsProposal>> { return phantom(ConfigDepsProposal.reified( )); } static get p() { return ConfigDepsProposal.phantom() }

 static get bcs() { return bcs.struct("ConfigDepsProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): ConfigDepsProposal { return ConfigDepsProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ConfigDepsProposal { if (!isConfigDepsProposal(item.type)) { throw new Error("not a ConfigDepsProposal type");

 }

 return ConfigDepsProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): ConfigDepsProposal { return ConfigDepsProposal.fromFields( ConfigDepsProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ConfigDepsProposal { return ConfigDepsProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): ConfigDepsProposal { if (json.$typeName !== ConfigDepsProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ConfigDepsProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ConfigDepsProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfigDepsProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ConfigDepsProposal object`); } return ConfigDepsProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ConfigDepsProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isConfigDepsProposal(data.bcs.type)) { throw new Error(`object at is not a ConfigDepsProposal object`); }

 return ConfigDepsProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ConfigDepsProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ConfigDepsProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ConfigDepsProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfigDepsProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ConfigDepsProposal object`); }

 return ConfigDepsProposal.fromSuiObjectData( res.data ); }

 }

/* ============================== ConfigMetadataAction =============================== */

export function isConfigMetadataAction(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::config::ConfigMetadataAction`; }

export interface ConfigMetadataActionFields { metadata: ToField<Metadata> }

export type ConfigMetadataActionReified = Reified< ConfigMetadataAction, ConfigMetadataActionFields >;

export class ConfigMetadataAction implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::config::ConfigMetadataAction`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ConfigMetadataAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::config::ConfigMetadataAction`; readonly $typeArgs: []; readonly $isPhantom = ConfigMetadataAction.$isPhantom;

 readonly metadata: ToField<Metadata>

 private constructor(typeArgs: [], fields: ConfigMetadataActionFields, ) { this.$fullTypeName = composeSuiType( ConfigMetadataAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::config::ConfigMetadataAction`; this.$typeArgs = typeArgs;

 this.metadata = fields.metadata; }

 static reified( ): ConfigMetadataActionReified { return { typeName: ConfigMetadataAction.$typeName, fullTypeName: composeSuiType( ConfigMetadataAction.$typeName, ...[] ) as `${typeof PKG_V1}::config::ConfigMetadataAction`, typeArgs: [ ] as [], isPhantom: ConfigMetadataAction.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ConfigMetadataAction.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigMetadataAction.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ConfigMetadataAction.fromBcs( data, ), bcs: ConfigMetadataAction.bcs, fromJSONField: (field: any) => ConfigMetadataAction.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ConfigMetadataAction.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ConfigMetadataAction.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ConfigMetadataAction.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ConfigMetadataAction.fetch( client, id, ), new: ( fields: ConfigMetadataActionFields, ) => { return new ConfigMetadataAction( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ConfigMetadataAction.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ConfigMetadataAction>> { return phantom(ConfigMetadataAction.reified( )); } static get p() { return ConfigMetadataAction.phantom() }

 static get bcs() { return bcs.struct("ConfigMetadataAction", {

 metadata: Metadata.bcs

}) };

 static fromFields( fields: Record<string, any> ): ConfigMetadataAction { return ConfigMetadataAction.reified( ).new( { metadata: decodeFromFields(Metadata.reified(), fields.metadata) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ConfigMetadataAction { if (!isConfigMetadataAction(item.type)) { throw new Error("not a ConfigMetadataAction type");

 }

 return ConfigMetadataAction.reified( ).new( { metadata: decodeFromFieldsWithTypes(Metadata.reified(), item.fields.metadata) } ) }

 static fromBcs( data: Uint8Array ): ConfigMetadataAction { return ConfigMetadataAction.fromFields( ConfigMetadataAction.bcs.parse(data) ) }

 toJSONField() { return {

 metadata: this.metadata.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ConfigMetadataAction { return ConfigMetadataAction.reified( ).new( { metadata: decodeFromJSONField(Metadata.reified(), field.metadata) } ) }

 static fromJSON( json: Record<string, any> ): ConfigMetadataAction { if (json.$typeName !== ConfigMetadataAction.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ConfigMetadataAction.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ConfigMetadataAction { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfigMetadataAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ConfigMetadataAction object`); } return ConfigMetadataAction.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ConfigMetadataAction { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isConfigMetadataAction(data.bcs.type)) { throw new Error(`object at is not a ConfigMetadataAction object`); }

 return ConfigMetadataAction.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ConfigMetadataAction.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ConfigMetadataAction> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ConfigMetadataAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfigMetadataAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ConfigMetadataAction object`); }

 return ConfigMetadataAction.fromSuiObjectData( res.data ); }

 }

/* ============================== ConfigMetadataProposal =============================== */

export function isConfigMetadataProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::config::ConfigMetadataProposal`; }

export interface ConfigMetadataProposalFields { dummyField: ToField<"bool"> }

export type ConfigMetadataProposalReified = Reified< ConfigMetadataProposal, ConfigMetadataProposalFields >;

export class ConfigMetadataProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::config::ConfigMetadataProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ConfigMetadataProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::config::ConfigMetadataProposal`; readonly $typeArgs: []; readonly $isPhantom = ConfigMetadataProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: ConfigMetadataProposalFields, ) { this.$fullTypeName = composeSuiType( ConfigMetadataProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::config::ConfigMetadataProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): ConfigMetadataProposalReified { return { typeName: ConfigMetadataProposal.$typeName, fullTypeName: composeSuiType( ConfigMetadataProposal.$typeName, ...[] ) as `${typeof PKG_V1}::config::ConfigMetadataProposal`, typeArgs: [ ] as [], isPhantom: ConfigMetadataProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ConfigMetadataProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigMetadataProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ConfigMetadataProposal.fromBcs( data, ), bcs: ConfigMetadataProposal.bcs, fromJSONField: (field: any) => ConfigMetadataProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ConfigMetadataProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ConfigMetadataProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ConfigMetadataProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ConfigMetadataProposal.fetch( client, id, ), new: ( fields: ConfigMetadataProposalFields, ) => { return new ConfigMetadataProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ConfigMetadataProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ConfigMetadataProposal>> { return phantom(ConfigMetadataProposal.reified( )); } static get p() { return ConfigMetadataProposal.phantom() }

 static get bcs() { return bcs.struct("ConfigMetadataProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): ConfigMetadataProposal { return ConfigMetadataProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ConfigMetadataProposal { if (!isConfigMetadataProposal(item.type)) { throw new Error("not a ConfigMetadataProposal type");

 }

 return ConfigMetadataProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): ConfigMetadataProposal { return ConfigMetadataProposal.fromFields( ConfigMetadataProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ConfigMetadataProposal { return ConfigMetadataProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): ConfigMetadataProposal { if (json.$typeName !== ConfigMetadataProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ConfigMetadataProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ConfigMetadataProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfigMetadataProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ConfigMetadataProposal object`); } return ConfigMetadataProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ConfigMetadataProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isConfigMetadataProposal(data.bcs.type)) { throw new Error(`object at is not a ConfigMetadataProposal object`); }

 return ConfigMetadataProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ConfigMetadataProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ConfigMetadataProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ConfigMetadataProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfigMetadataProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ConfigMetadataProposal object`); }

 return ConfigMetadataProposal.fromSuiObjectData( res.data ); }

 }

/* ============================== CoreDep =============================== */

export function isCoreDep(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::config::CoreDep`; }

export interface CoreDepFields { dummyField: ToField<"bool"> }

export type CoreDepReified = Reified< CoreDep, CoreDepFields >;

export class CoreDep implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::config::CoreDep`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = CoreDep.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::config::CoreDep`; readonly $typeArgs: []; readonly $isPhantom = CoreDep.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: CoreDepFields, ) { this.$fullTypeName = composeSuiType( CoreDep.$typeName, ...typeArgs ) as `${typeof PKG_V1}::config::CoreDep`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): CoreDepReified { return { typeName: CoreDep.$typeName, fullTypeName: composeSuiType( CoreDep.$typeName, ...[] ) as `${typeof PKG_V1}::config::CoreDep`, typeArgs: [ ] as [], isPhantom: CoreDep.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => CoreDep.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => CoreDep.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => CoreDep.fromBcs( data, ), bcs: CoreDep.bcs, fromJSONField: (field: any) => CoreDep.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => CoreDep.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => CoreDep.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => CoreDep.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => CoreDep.fetch( client, id, ), new: ( fields: CoreDepFields, ) => { return new CoreDep( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return CoreDep.reified() }

 static phantom( ): PhantomReified<ToTypeStr<CoreDep>> { return phantom(CoreDep.reified( )); } static get p() { return CoreDep.phantom() }

 static get bcs() { return bcs.struct("CoreDep", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): CoreDep { return CoreDep.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): CoreDep { if (!isCoreDep(item.type)) { throw new Error("not a CoreDep type");

 }

 return CoreDep.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): CoreDep { return CoreDep.fromFields( CoreDep.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): CoreDep { return CoreDep.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): CoreDep { if (json.$typeName !== CoreDep.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return CoreDep.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): CoreDep { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isCoreDep(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a CoreDep object`); } return CoreDep.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): CoreDep { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isCoreDep(data.bcs.type)) { throw new Error(`object at is not a CoreDep object`); }

 return CoreDep.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return CoreDep.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<CoreDep> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching CoreDep object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isCoreDep(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a CoreDep object`); }

 return CoreDep.fromSuiObjectData( res.data ); }

 }
