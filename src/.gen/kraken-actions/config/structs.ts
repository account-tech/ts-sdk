import {PhantomReified, Reified, StructClass, ToField, ToTypeArgument, ToTypeStr, TypeArgument, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom, toBcs} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {PKG_V1} from "../index";
import {BcsType, bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== ConfigAction =============================== */

export function isConfigAction(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::config::ConfigAction` + '<'); }

export interface ConfigActionFields<T extends TypeArgument> { inner: ToField<T> }

export type ConfigActionReified<T extends TypeArgument> = Reified< ConfigAction<T>, ConfigActionFields<T> >;

export class ConfigAction<T extends TypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::config::ConfigAction`; static readonly $numTypeParams = 1; static readonly $isPhantom = [false,] as const;

 readonly $typeName = ConfigAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::config::ConfigAction<${ToTypeStr<T>}>`; readonly $typeArgs: [ToTypeStr<T>]; readonly $isPhantom = ConfigAction.$isPhantom;

 readonly inner: ToField<T>

 private constructor(typeArgs: [ToTypeStr<T>], fields: ConfigActionFields<T>, ) { this.$fullTypeName = composeSuiType( ConfigAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::config::ConfigAction<${ToTypeStr<T>}>`; this.$typeArgs = typeArgs;

 this.inner = fields.inner; }

 static reified<T extends Reified<TypeArgument, any>>( T: T ): ConfigActionReified<ToTypeArgument<T>> { return { typeName: ConfigAction.$typeName, fullTypeName: composeSuiType( ConfigAction.$typeName, ...[extractType(T)] ) as `${typeof PKG_V1}::config::ConfigAction<${ToTypeStr<ToTypeArgument<T>>}>`, typeArgs: [ extractType(T) ] as [ToTypeStr<ToTypeArgument<T>>], isPhantom: ConfigAction.$isPhantom, reifiedTypeArgs: [T], fromFields: (fields: Record<string, any>) => ConfigAction.fromFields( T, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigAction.fromFieldsWithTypes( T, item, ), fromBcs: (data: Uint8Array) => ConfigAction.fromBcs( T, data, ), bcs: ConfigAction.bcs(toBcs(T)), fromJSONField: (field: any) => ConfigAction.fromJSONField( T, field, ), fromJSON: (json: Record<string, any>) => ConfigAction.fromJSON( T, json, ), fromSuiParsedData: (content: SuiParsedData) => ConfigAction.fromSuiParsedData( T, content, ), fromSuiObjectData: (content: SuiObjectData) => ConfigAction.fromSuiObjectData( T, content, ), fetch: async (client: SuiClient, id: string) => ConfigAction.fetch( client, T, id, ), new: ( fields: ConfigActionFields<ToTypeArgument<T>>, ) => { return new ConfigAction( [extractType(T)], fields ) }, kind: "StructClassReified", } }

 static get r() { return ConfigAction.reified }

 static phantom<T extends Reified<TypeArgument, any>>( T: T ): PhantomReified<ToTypeStr<ConfigAction<ToTypeArgument<T>>>> { return phantom(ConfigAction.reified( T )); } static get p() { return ConfigAction.phantom }

 static get bcs() { return <T extends BcsType<any>>(T: T) => bcs.struct(`ConfigAction<${T.name}>`, {

 inner: T

}) };

 static fromFields<T extends Reified<TypeArgument, any>>( typeArg: T, fields: Record<string, any> ): ConfigAction<ToTypeArgument<T>> { return ConfigAction.reified( typeArg, ).new( { inner: decodeFromFields(typeArg, fields.inner) } ) }

 static fromFieldsWithTypes<T extends Reified<TypeArgument, any>>( typeArg: T, item: FieldsWithTypes ): ConfigAction<ToTypeArgument<T>> { if (!isConfigAction(item.type)) { throw new Error("not a ConfigAction type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return ConfigAction.reified( typeArg, ).new( { inner: decodeFromFieldsWithTypes(typeArg, item.fields.inner) } ) }

 static fromBcs<T extends Reified<TypeArgument, any>>( typeArg: T, data: Uint8Array ): ConfigAction<ToTypeArgument<T>> { const typeArgs = [typeArg];

 return ConfigAction.fromFields( typeArg, ConfigAction.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 inner: fieldToJSON<T>(this.$typeArgs[0], this.inner),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T extends Reified<TypeArgument, any>>( typeArg: T, field: any ): ConfigAction<ToTypeArgument<T>> { return ConfigAction.reified( typeArg, ).new( { inner: decodeFromJSONField(typeArg, field.inner) } ) }

 static fromJSON<T extends Reified<TypeArgument, any>>( typeArg: T, json: Record<string, any> ): ConfigAction<ToTypeArgument<T>> { if (json.$typeName !== ConfigAction.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(ConfigAction.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return ConfigAction.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T extends Reified<TypeArgument, any>>( typeArg: T, content: SuiParsedData ): ConfigAction<ToTypeArgument<T>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfigAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ConfigAction object`); } return ConfigAction.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T extends Reified<TypeArgument, any>>( typeArg: T, data: SuiObjectData ): ConfigAction<ToTypeArgument<T>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isConfigAction(data.bcs.type)) { throw new Error(`object at is not a ConfigAction object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return ConfigAction.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ConfigAction.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: T, id: string ): Promise<ConfigAction<ToTypeArgument<T>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ConfigAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfigAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ConfigAction object`); }

 return ConfigAction.fromSuiObjectData( typeArg, res.data ); }

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

/* ============================== ConfigNameProposal =============================== */

export function isConfigNameProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::config::ConfigNameProposal`; }

export interface ConfigNameProposalFields { dummyField: ToField<"bool"> }

export type ConfigNameProposalReified = Reified< ConfigNameProposal, ConfigNameProposalFields >;

export class ConfigNameProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::config::ConfigNameProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ConfigNameProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::config::ConfigNameProposal`; readonly $typeArgs: []; readonly $isPhantom = ConfigNameProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: ConfigNameProposalFields, ) { this.$fullTypeName = composeSuiType( ConfigNameProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::config::ConfigNameProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): ConfigNameProposalReified { return { typeName: ConfigNameProposal.$typeName, fullTypeName: composeSuiType( ConfigNameProposal.$typeName, ...[] ) as `${typeof PKG_V1}::config::ConfigNameProposal`, typeArgs: [ ] as [], isPhantom: ConfigNameProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ConfigNameProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigNameProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ConfigNameProposal.fromBcs( data, ), bcs: ConfigNameProposal.bcs, fromJSONField: (field: any) => ConfigNameProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ConfigNameProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ConfigNameProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ConfigNameProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ConfigNameProposal.fetch( client, id, ), new: ( fields: ConfigNameProposalFields, ) => { return new ConfigNameProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ConfigNameProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ConfigNameProposal>> { return phantom(ConfigNameProposal.reified( )); } static get p() { return ConfigNameProposal.phantom() }

 static get bcs() { return bcs.struct("ConfigNameProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): ConfigNameProposal { return ConfigNameProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ConfigNameProposal { if (!isConfigNameProposal(item.type)) { throw new Error("not a ConfigNameProposal type");

 }

 return ConfigNameProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): ConfigNameProposal { return ConfigNameProposal.fromFields( ConfigNameProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ConfigNameProposal { return ConfigNameProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): ConfigNameProposal { if (json.$typeName !== ConfigNameProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ConfigNameProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ConfigNameProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfigNameProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ConfigNameProposal object`); } return ConfigNameProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ConfigNameProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isConfigNameProposal(data.bcs.type)) { throw new Error(`object at is not a ConfigNameProposal object`); }

 return ConfigNameProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ConfigNameProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ConfigNameProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ConfigNameProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfigNameProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ConfigNameProposal object`); }

 return ConfigNameProposal.fromSuiObjectData( res.data ); }

 }

/* ============================== ConfigRulesProposal =============================== */

export function isConfigRulesProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::config::ConfigRulesProposal`; }

export interface ConfigRulesProposalFields { dummyField: ToField<"bool"> }

export type ConfigRulesProposalReified = Reified< ConfigRulesProposal, ConfigRulesProposalFields >;

export class ConfigRulesProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::config::ConfigRulesProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ConfigRulesProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::config::ConfigRulesProposal`; readonly $typeArgs: []; readonly $isPhantom = ConfigRulesProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: ConfigRulesProposalFields, ) { this.$fullTypeName = composeSuiType( ConfigRulesProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::config::ConfigRulesProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): ConfigRulesProposalReified { return { typeName: ConfigRulesProposal.$typeName, fullTypeName: composeSuiType( ConfigRulesProposal.$typeName, ...[] ) as `${typeof PKG_V1}::config::ConfigRulesProposal`, typeArgs: [ ] as [], isPhantom: ConfigRulesProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ConfigRulesProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigRulesProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ConfigRulesProposal.fromBcs( data, ), bcs: ConfigRulesProposal.bcs, fromJSONField: (field: any) => ConfigRulesProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ConfigRulesProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ConfigRulesProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ConfigRulesProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ConfigRulesProposal.fetch( client, id, ), new: ( fields: ConfigRulesProposalFields, ) => { return new ConfigRulesProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ConfigRulesProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ConfigRulesProposal>> { return phantom(ConfigRulesProposal.reified( )); } static get p() { return ConfigRulesProposal.phantom() }

 static get bcs() { return bcs.struct("ConfigRulesProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): ConfigRulesProposal { return ConfigRulesProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ConfigRulesProposal { if (!isConfigRulesProposal(item.type)) { throw new Error("not a ConfigRulesProposal type");

 }

 return ConfigRulesProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): ConfigRulesProposal { return ConfigRulesProposal.fromFields( ConfigRulesProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ConfigRulesProposal { return ConfigRulesProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): ConfigRulesProposal { if (json.$typeName !== ConfigRulesProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ConfigRulesProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ConfigRulesProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfigRulesProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ConfigRulesProposal object`); } return ConfigRulesProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ConfigRulesProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isConfigRulesProposal(data.bcs.type)) { throw new Error(`object at is not a ConfigRulesProposal object`); }

 return ConfigRulesProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ConfigRulesProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ConfigRulesProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ConfigRulesProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfigRulesProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ConfigRulesProposal object`); }

 return ConfigRulesProposal.fromSuiObjectData( res.data ); }

 }
