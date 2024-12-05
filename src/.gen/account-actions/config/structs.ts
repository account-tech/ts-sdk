import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {Deps} from "../../account-protocol/deps/structs";
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

/* ============================== ConfigMetadataCommand =============================== */

export function isConfigMetadataCommand(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::config::ConfigMetadataCommand`; }

export interface ConfigMetadataCommandFields { dummyField: ToField<"bool"> }

export type ConfigMetadataCommandReified = Reified< ConfigMetadataCommand, ConfigMetadataCommandFields >;

export class ConfigMetadataCommand implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::config::ConfigMetadataCommand`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ConfigMetadataCommand.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::config::ConfigMetadataCommand`; readonly $typeArgs: []; readonly $isPhantom = ConfigMetadataCommand.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: ConfigMetadataCommandFields, ) { this.$fullTypeName = composeSuiType( ConfigMetadataCommand.$typeName, ...typeArgs ) as `${typeof PKG_V1}::config::ConfigMetadataCommand`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): ConfigMetadataCommandReified { return { typeName: ConfigMetadataCommand.$typeName, fullTypeName: composeSuiType( ConfigMetadataCommand.$typeName, ...[] ) as `${typeof PKG_V1}::config::ConfigMetadataCommand`, typeArgs: [ ] as [], isPhantom: ConfigMetadataCommand.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ConfigMetadataCommand.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigMetadataCommand.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ConfigMetadataCommand.fromBcs( data, ), bcs: ConfigMetadataCommand.bcs, fromJSONField: (field: any) => ConfigMetadataCommand.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ConfigMetadataCommand.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ConfigMetadataCommand.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ConfigMetadataCommand.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ConfigMetadataCommand.fetch( client, id, ), new: ( fields: ConfigMetadataCommandFields, ) => { return new ConfigMetadataCommand( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ConfigMetadataCommand.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ConfigMetadataCommand>> { return phantom(ConfigMetadataCommand.reified( )); } static get p() { return ConfigMetadataCommand.phantom() }

 static get bcs() { return bcs.struct("ConfigMetadataCommand", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): ConfigMetadataCommand { return ConfigMetadataCommand.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ConfigMetadataCommand { if (!isConfigMetadataCommand(item.type)) { throw new Error("not a ConfigMetadataCommand type");

 }

 return ConfigMetadataCommand.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): ConfigMetadataCommand { return ConfigMetadataCommand.fromFields( ConfigMetadataCommand.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ConfigMetadataCommand { return ConfigMetadataCommand.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): ConfigMetadataCommand { if (json.$typeName !== ConfigMetadataCommand.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ConfigMetadataCommand.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ConfigMetadataCommand { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfigMetadataCommand(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ConfigMetadataCommand object`); } return ConfigMetadataCommand.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ConfigMetadataCommand { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isConfigMetadataCommand(data.bcs.type)) { throw new Error(`object at is not a ConfigMetadataCommand object`); }

 return ConfigMetadataCommand.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ConfigMetadataCommand.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ConfigMetadataCommand> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ConfigMetadataCommand object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfigMetadataCommand(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ConfigMetadataCommand object`); }

 return ConfigMetadataCommand.fromSuiObjectData( res.data ); }

 }
