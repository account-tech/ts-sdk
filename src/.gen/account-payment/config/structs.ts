import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {Payment} from "../payment/structs";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== ConfigPaymentAction =============================== */

export function isConfigPaymentAction(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::config::ConfigPaymentAction`; }

export interface ConfigPaymentActionFields { config: ToField<Payment> }

export type ConfigPaymentActionReified = Reified< ConfigPaymentAction, ConfigPaymentActionFields >;

export class ConfigPaymentAction implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::config::ConfigPaymentAction`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ConfigPaymentAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::config::ConfigPaymentAction`; readonly $typeArgs: []; readonly $isPhantom = ConfigPaymentAction.$isPhantom;

 readonly config: ToField<Payment>

 private constructor(typeArgs: [], fields: ConfigPaymentActionFields, ) { this.$fullTypeName = composeSuiType( ConfigPaymentAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::config::ConfigPaymentAction`; this.$typeArgs = typeArgs;

 this.config = fields.config; }

 static reified( ): ConfigPaymentActionReified { return { typeName: ConfigPaymentAction.$typeName, fullTypeName: composeSuiType( ConfigPaymentAction.$typeName, ...[] ) as `${typeof PKG_V1}::config::ConfigPaymentAction`, typeArgs: [ ] as [], isPhantom: ConfigPaymentAction.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ConfigPaymentAction.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigPaymentAction.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ConfigPaymentAction.fromBcs( data, ), bcs: ConfigPaymentAction.bcs, fromJSONField: (field: any) => ConfigPaymentAction.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ConfigPaymentAction.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ConfigPaymentAction.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ConfigPaymentAction.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ConfigPaymentAction.fetch( client, id, ), new: ( fields: ConfigPaymentActionFields, ) => { return new ConfigPaymentAction( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ConfigPaymentAction.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ConfigPaymentAction>> { return phantom(ConfigPaymentAction.reified( )); } static get p() { return ConfigPaymentAction.phantom() }

 static get bcs() { return bcs.struct("ConfigPaymentAction", {

 config: Payment.bcs

}) };

 static fromFields( fields: Record<string, any> ): ConfigPaymentAction { return ConfigPaymentAction.reified( ).new( { config: decodeFromFields(Payment.reified(), fields.config) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ConfigPaymentAction { if (!isConfigPaymentAction(item.type)) { throw new Error("not a ConfigPaymentAction type");

 }

 return ConfigPaymentAction.reified( ).new( { config: decodeFromFieldsWithTypes(Payment.reified(), item.fields.config) } ) }

 static fromBcs( data: Uint8Array ): ConfigPaymentAction { return ConfigPaymentAction.fromFields( ConfigPaymentAction.bcs.parse(data) ) }

 toJSONField() { return {

 config: this.config.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ConfigPaymentAction { return ConfigPaymentAction.reified( ).new( { config: decodeFromJSONField(Payment.reified(), field.config) } ) }

 static fromJSON( json: Record<string, any> ): ConfigPaymentAction { if (json.$typeName !== ConfigPaymentAction.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ConfigPaymentAction.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ConfigPaymentAction { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfigPaymentAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ConfigPaymentAction object`); } return ConfigPaymentAction.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ConfigPaymentAction { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isConfigPaymentAction(data.bcs.type)) { throw new Error(`object at is not a ConfigPaymentAction object`); }

 return ConfigPaymentAction.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ConfigPaymentAction.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ConfigPaymentAction> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ConfigPaymentAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfigPaymentAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ConfigPaymentAction object`); }

 return ConfigPaymentAction.fromSuiObjectData( res.data ); }

 }

/* ============================== ConfigPaymentIntent =============================== */

export function isConfigPaymentIntent(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::config::ConfigPaymentIntent`; }

export interface ConfigPaymentIntentFields { dummyField: ToField<"bool"> }

export type ConfigPaymentIntentReified = Reified< ConfigPaymentIntent, ConfigPaymentIntentFields >;

export class ConfigPaymentIntent implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::config::ConfigPaymentIntent`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ConfigPaymentIntent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::config::ConfigPaymentIntent`; readonly $typeArgs: []; readonly $isPhantom = ConfigPaymentIntent.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: ConfigPaymentIntentFields, ) { this.$fullTypeName = composeSuiType( ConfigPaymentIntent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::config::ConfigPaymentIntent`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): ConfigPaymentIntentReified { return { typeName: ConfigPaymentIntent.$typeName, fullTypeName: composeSuiType( ConfigPaymentIntent.$typeName, ...[] ) as `${typeof PKG_V1}::config::ConfigPaymentIntent`, typeArgs: [ ] as [], isPhantom: ConfigPaymentIntent.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ConfigPaymentIntent.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigPaymentIntent.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ConfigPaymentIntent.fromBcs( data, ), bcs: ConfigPaymentIntent.bcs, fromJSONField: (field: any) => ConfigPaymentIntent.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ConfigPaymentIntent.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ConfigPaymentIntent.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ConfigPaymentIntent.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ConfigPaymentIntent.fetch( client, id, ), new: ( fields: ConfigPaymentIntentFields, ) => { return new ConfigPaymentIntent( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ConfigPaymentIntent.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ConfigPaymentIntent>> { return phantom(ConfigPaymentIntent.reified( )); } static get p() { return ConfigPaymentIntent.phantom() }

 static get bcs() { return bcs.struct("ConfigPaymentIntent", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): ConfigPaymentIntent { return ConfigPaymentIntent.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ConfigPaymentIntent { if (!isConfigPaymentIntent(item.type)) { throw new Error("not a ConfigPaymentIntent type");

 }

 return ConfigPaymentIntent.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): ConfigPaymentIntent { return ConfigPaymentIntent.fromFields( ConfigPaymentIntent.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ConfigPaymentIntent { return ConfigPaymentIntent.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): ConfigPaymentIntent { if (json.$typeName !== ConfigPaymentIntent.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ConfigPaymentIntent.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ConfigPaymentIntent { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfigPaymentIntent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ConfigPaymentIntent object`); } return ConfigPaymentIntent.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ConfigPaymentIntent { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isConfigPaymentIntent(data.bcs.type)) { throw new Error(`object at is not a ConfigPaymentIntent object`); }

 return ConfigPaymentIntent.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ConfigPaymentIntent.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ConfigPaymentIntent> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ConfigPaymentIntent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfigPaymentIntent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ConfigPaymentIntent object`); }

 return ConfigPaymentIntent.fromSuiObjectData( res.data ); }

 }
