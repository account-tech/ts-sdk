import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {Multisig} from "../multisig/structs";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== ConfigMultisigAction =============================== */

export function isConfigMultisigAction(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::config::ConfigMultisigAction`; }

export interface ConfigMultisigActionFields { config: ToField<Multisig> }

export type ConfigMultisigActionReified = Reified< ConfigMultisigAction, ConfigMultisigActionFields >;

export class ConfigMultisigAction implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::config::ConfigMultisigAction`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ConfigMultisigAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::config::ConfigMultisigAction`; readonly $typeArgs: []; readonly $isPhantom = ConfigMultisigAction.$isPhantom;

 readonly config: ToField<Multisig>

 private constructor(typeArgs: [], fields: ConfigMultisigActionFields, ) { this.$fullTypeName = composeSuiType( ConfigMultisigAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::config::ConfigMultisigAction`; this.$typeArgs = typeArgs;

 this.config = fields.config; }

 static reified( ): ConfigMultisigActionReified { return { typeName: ConfigMultisigAction.$typeName, fullTypeName: composeSuiType( ConfigMultisigAction.$typeName, ...[] ) as `${typeof PKG_V1}::config::ConfigMultisigAction`, typeArgs: [ ] as [], isPhantom: ConfigMultisigAction.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ConfigMultisigAction.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigMultisigAction.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ConfigMultisigAction.fromBcs( data, ), bcs: ConfigMultisigAction.bcs, fromJSONField: (field: any) => ConfigMultisigAction.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ConfigMultisigAction.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ConfigMultisigAction.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ConfigMultisigAction.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ConfigMultisigAction.fetch( client, id, ), new: ( fields: ConfigMultisigActionFields, ) => { return new ConfigMultisigAction( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ConfigMultisigAction.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ConfigMultisigAction>> { return phantom(ConfigMultisigAction.reified( )); } static get p() { return ConfigMultisigAction.phantom() }

 static get bcs() { return bcs.struct("ConfigMultisigAction", {

 config: Multisig.bcs

}) };

 static fromFields( fields: Record<string, any> ): ConfigMultisigAction { return ConfigMultisigAction.reified( ).new( { config: decodeFromFields(Multisig.reified(), fields.config) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ConfigMultisigAction { if (!isConfigMultisigAction(item.type)) { throw new Error("not a ConfigMultisigAction type");

 }

 return ConfigMultisigAction.reified( ).new( { config: decodeFromFieldsWithTypes(Multisig.reified(), item.fields.config) } ) }

 static fromBcs( data: Uint8Array ): ConfigMultisigAction { return ConfigMultisigAction.fromFields( ConfigMultisigAction.bcs.parse(data) ) }

 toJSONField() { return {

 config: this.config.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ConfigMultisigAction { return ConfigMultisigAction.reified( ).new( { config: decodeFromJSONField(Multisig.reified(), field.config) } ) }

 static fromJSON( json: Record<string, any> ): ConfigMultisigAction { if (json.$typeName !== ConfigMultisigAction.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ConfigMultisigAction.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ConfigMultisigAction { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfigMultisigAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ConfigMultisigAction object`); } return ConfigMultisigAction.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ConfigMultisigAction { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isConfigMultisigAction(data.bcs.type)) { throw new Error(`object at is not a ConfigMultisigAction object`); }

 return ConfigMultisigAction.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ConfigMultisigAction.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ConfigMultisigAction> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ConfigMultisigAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfigMultisigAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ConfigMultisigAction object`); }

 return ConfigMultisigAction.fromSuiObjectData( res.data ); }

 }

/* ============================== ConfigMultisigIntent =============================== */

export function isConfigMultisigIntent(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::config::ConfigMultisigIntent`; }

export interface ConfigMultisigIntentFields { dummyField: ToField<"bool"> }

export type ConfigMultisigIntentReified = Reified< ConfigMultisigIntent, ConfigMultisigIntentFields >;

export class ConfigMultisigIntent implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::config::ConfigMultisigIntent`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ConfigMultisigIntent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::config::ConfigMultisigIntent`; readonly $typeArgs: []; readonly $isPhantom = ConfigMultisigIntent.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: ConfigMultisigIntentFields, ) { this.$fullTypeName = composeSuiType( ConfigMultisigIntent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::config::ConfigMultisigIntent`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): ConfigMultisigIntentReified { return { typeName: ConfigMultisigIntent.$typeName, fullTypeName: composeSuiType( ConfigMultisigIntent.$typeName, ...[] ) as `${typeof PKG_V1}::config::ConfigMultisigIntent`, typeArgs: [ ] as [], isPhantom: ConfigMultisigIntent.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ConfigMultisigIntent.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigMultisigIntent.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ConfigMultisigIntent.fromBcs( data, ), bcs: ConfigMultisigIntent.bcs, fromJSONField: (field: any) => ConfigMultisigIntent.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ConfigMultisigIntent.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ConfigMultisigIntent.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ConfigMultisigIntent.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ConfigMultisigIntent.fetch( client, id, ), new: ( fields: ConfigMultisigIntentFields, ) => { return new ConfigMultisigIntent( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ConfigMultisigIntent.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ConfigMultisigIntent>> { return phantom(ConfigMultisigIntent.reified( )); } static get p() { return ConfigMultisigIntent.phantom() }

 static get bcs() { return bcs.struct("ConfigMultisigIntent", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): ConfigMultisigIntent { return ConfigMultisigIntent.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ConfigMultisigIntent { if (!isConfigMultisigIntent(item.type)) { throw new Error("not a ConfigMultisigIntent type");

 }

 return ConfigMultisigIntent.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): ConfigMultisigIntent { return ConfigMultisigIntent.fromFields( ConfigMultisigIntent.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ConfigMultisigIntent { return ConfigMultisigIntent.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): ConfigMultisigIntent { if (json.$typeName !== ConfigMultisigIntent.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ConfigMultisigIntent.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ConfigMultisigIntent { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfigMultisigIntent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ConfigMultisigIntent object`); } return ConfigMultisigIntent.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ConfigMultisigIntent { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isConfigMultisigIntent(data.bcs.type)) { throw new Error(`object at is not a ConfigMultisigIntent object`); }

 return ConfigMultisigIntent.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ConfigMultisigIntent.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ConfigMultisigIntent> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ConfigMultisigIntent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfigMultisigIntent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ConfigMultisigIntent object`); }

 return ConfigMultisigIntent.fromSuiObjectData( res.data ); }

 }
