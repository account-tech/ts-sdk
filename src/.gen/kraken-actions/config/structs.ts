import {PhantomReified, Reified, StructClass, ToField, ToTypeArgument, ToTypeStr, TypeArgument, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom, toBcs} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {PKG_V1} from "../index";
import {BcsType, bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== Config =============================== */

export function isConfig(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::config::Config` + '<'); }

export interface ConfigFields<T extends TypeArgument> { inner: ToField<T> }

export type ConfigReified<T extends TypeArgument> = Reified< Config<T>, ConfigFields<T> >;

export class Config<T extends TypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::config::Config`; static readonly $numTypeParams = 1; static readonly $isPhantom = [false,] as const;

 readonly $typeName = Config.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::config::Config<${ToTypeStr<T>}>`; readonly $typeArgs: [ToTypeStr<T>]; readonly $isPhantom = Config.$isPhantom;

 readonly inner: ToField<T>

 private constructor(typeArgs: [ToTypeStr<T>], fields: ConfigFields<T>, ) { this.$fullTypeName = composeSuiType( Config.$typeName, ...typeArgs ) as `${typeof PKG_V1}::config::Config<${ToTypeStr<T>}>`; this.$typeArgs = typeArgs;

 this.inner = fields.inner; }

 static reified<T extends Reified<TypeArgument, any>>( T: T ): ConfigReified<ToTypeArgument<T>> { return { typeName: Config.$typeName, fullTypeName: composeSuiType( Config.$typeName, ...[extractType(T)] ) as `${typeof PKG_V1}::config::Config<${ToTypeStr<ToTypeArgument<T>>}>`, typeArgs: [ extractType(T) ] as [ToTypeStr<ToTypeArgument<T>>], isPhantom: Config.$isPhantom, reifiedTypeArgs: [T], fromFields: (fields: Record<string, any>) => Config.fromFields( T, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Config.fromFieldsWithTypes( T, item, ), fromBcs: (data: Uint8Array) => Config.fromBcs( T, data, ), bcs: Config.bcs(toBcs(T)), fromJSONField: (field: any) => Config.fromJSONField( T, field, ), fromJSON: (json: Record<string, any>) => Config.fromJSON( T, json, ), fromSuiParsedData: (content: SuiParsedData) => Config.fromSuiParsedData( T, content, ), fromSuiObjectData: (content: SuiObjectData) => Config.fromSuiObjectData( T, content, ), fetch: async (client: SuiClient, id: string) => Config.fetch( client, T, id, ), new: ( fields: ConfigFields<ToTypeArgument<T>>, ) => { return new Config( [extractType(T)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Config.reified }

 static phantom<T extends Reified<TypeArgument, any>>( T: T ): PhantomReified<ToTypeStr<Config<ToTypeArgument<T>>>> { return phantom(Config.reified( T )); } static get p() { return Config.phantom }

 static get bcs() { return <T extends BcsType<any>>(T: T) => bcs.struct(`Config<${T.name}>`, {

 inner: T

}) };

 static fromFields<T extends Reified<TypeArgument, any>>( typeArg: T, fields: Record<string, any> ): Config<ToTypeArgument<T>> { return Config.reified( typeArg, ).new( { inner: decodeFromFields(typeArg, fields.inner) } ) }

 static fromFieldsWithTypes<T extends Reified<TypeArgument, any>>( typeArg: T, item: FieldsWithTypes ): Config<ToTypeArgument<T>> { if (!isConfig(item.type)) { throw new Error("not a Config type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Config.reified( typeArg, ).new( { inner: decodeFromFieldsWithTypes(typeArg, item.fields.inner) } ) }

 static fromBcs<T extends Reified<TypeArgument, any>>( typeArg: T, data: Uint8Array ): Config<ToTypeArgument<T>> { const typeArgs = [typeArg];

 return Config.fromFields( typeArg, Config.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 inner: fieldToJSON<T>(this.$typeArgs[0], this.inner),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T extends Reified<TypeArgument, any>>( typeArg: T, field: any ): Config<ToTypeArgument<T>> { return Config.reified( typeArg, ).new( { inner: decodeFromJSONField(typeArg, field.inner) } ) }

 static fromJSON<T extends Reified<TypeArgument, any>>( typeArg: T, json: Record<string, any> ): Config<ToTypeArgument<T>> { if (json.$typeName !== Config.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Config.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Config.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T extends Reified<TypeArgument, any>>( typeArg: T, content: SuiParsedData ): Config<ToTypeArgument<T>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfig(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Config object`); } return Config.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T extends Reified<TypeArgument, any>>( typeArg: T, data: SuiObjectData ): Config<ToTypeArgument<T>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isConfig(data.bcs.type)) { throw new Error(`object at is not a Config object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Config.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Config.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: T, id: string ): Promise<Config<ToTypeArgument<T>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Config object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfig(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Config object`); }

 return Config.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== Issuer =============================== */

export function isIssuer(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::config::Issuer`; }

export interface IssuerFields { dummyField: ToField<"bool"> }

export type IssuerReified = Reified< Issuer, IssuerFields >;

export class Issuer implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::config::Issuer`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Issuer.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::config::Issuer`; readonly $typeArgs: []; readonly $isPhantom = Issuer.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: IssuerFields, ) { this.$fullTypeName = composeSuiType( Issuer.$typeName, ...typeArgs ) as `${typeof PKG_V1}::config::Issuer`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): IssuerReified { return { typeName: Issuer.$typeName, fullTypeName: composeSuiType( Issuer.$typeName, ...[] ) as `${typeof PKG_V1}::config::Issuer`, typeArgs: [ ] as [], isPhantom: Issuer.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Issuer.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Issuer.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Issuer.fromBcs( data, ), bcs: Issuer.bcs, fromJSONField: (field: any) => Issuer.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Issuer.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Issuer.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Issuer.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Issuer.fetch( client, id, ), new: ( fields: IssuerFields, ) => { return new Issuer( [], fields ) }, kind: "StructClassReified", } }

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
