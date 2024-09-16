import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {TreasuryCap} from "../../_dependencies/source/0x2/coin/structs";
import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== Issuer =============================== */

export function isIssuer(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::currency::Issuer`; }

export interface IssuerFields { dummyField: ToField<"bool"> }

export type IssuerReified = Reified< Issuer, IssuerFields >;

export class Issuer implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::Issuer`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Issuer.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::Issuer`; readonly $typeArgs: []; readonly $isPhantom = Issuer.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: IssuerFields, ) { this.$fullTypeName = composeSuiType( Issuer.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::Issuer`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): IssuerReified { return { typeName: Issuer.$typeName, fullTypeName: composeSuiType( Issuer.$typeName, ...[] ) as `${typeof PKG_V1}::currency::Issuer`, typeArgs: [ ] as [], isPhantom: Issuer.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Issuer.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Issuer.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Issuer.fromBcs( data, ), bcs: Issuer.bcs, fromJSONField: (field: any) => Issuer.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Issuer.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Issuer.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Issuer.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Issuer.fetch( client, id, ), new: ( fields: IssuerFields, ) => { return new Issuer( [], fields ) }, kind: "StructClassReified", } }

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

/* ============================== Burn =============================== */

export function isBurn(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::currency::Burn` + '<'); }

export interface BurnFields<C extends PhantomTypeArgument> { amount: ToField<"u64"> }

export type BurnReified<C extends PhantomTypeArgument> = Reified< Burn<C>, BurnFields<C> >;

export class Burn<C extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::Burn`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Burn.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::Burn<${PhantomToTypeStr<C>}>`; readonly $typeArgs: [PhantomToTypeStr<C>]; readonly $isPhantom = Burn.$isPhantom;

 readonly amount: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<C>], fields: BurnFields<C>, ) { this.$fullTypeName = composeSuiType( Burn.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::Burn<${PhantomToTypeStr<C>}>`; this.$typeArgs = typeArgs;

 this.amount = fields.amount; }

 static reified<C extends PhantomReified<PhantomTypeArgument>>( C: C ): BurnReified<ToPhantomTypeArgument<C>> { return { typeName: Burn.$typeName, fullTypeName: composeSuiType( Burn.$typeName, ...[extractType(C)] ) as `${typeof PKG_V1}::currency::Burn<${PhantomToTypeStr<ToPhantomTypeArgument<C>>}>`, typeArgs: [ extractType(C) ] as [PhantomToTypeStr<ToPhantomTypeArgument<C>>], isPhantom: Burn.$isPhantom, reifiedTypeArgs: [C], fromFields: (fields: Record<string, any>) => Burn.fromFields( C, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Burn.fromFieldsWithTypes( C, item, ), fromBcs: (data: Uint8Array) => Burn.fromBcs( C, data, ), bcs: Burn.bcs, fromJSONField: (field: any) => Burn.fromJSONField( C, field, ), fromJSON: (json: Record<string, any>) => Burn.fromJSON( C, json, ), fromSuiParsedData: (content: SuiParsedData) => Burn.fromSuiParsedData( C, content, ), fromSuiObjectData: (content: SuiObjectData) => Burn.fromSuiObjectData( C, content, ), fetch: async (client: SuiClient, id: string) => Burn.fetch( client, C, id, ), new: ( fields: BurnFields<ToPhantomTypeArgument<C>>, ) => { return new Burn( [extractType(C)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Burn.reified }

 static phantom<C extends PhantomReified<PhantomTypeArgument>>( C: C ): PhantomReified<ToTypeStr<Burn<ToPhantomTypeArgument<C>>>> { return phantom(Burn.reified( C )); } static get p() { return Burn.phantom }

 static get bcs() { return bcs.struct("Burn", {

 amount: bcs.u64()

}) };

 static fromFields<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, fields: Record<string, any> ): Burn<ToPhantomTypeArgument<C>> { return Burn.reified( typeArg, ).new( { amount: decodeFromFields("u64", fields.amount) } ) }

 static fromFieldsWithTypes<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, item: FieldsWithTypes ): Burn<ToPhantomTypeArgument<C>> { if (!isBurn(item.type)) { throw new Error("not a Burn type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Burn.reified( typeArg, ).new( { amount: decodeFromFieldsWithTypes("u64", item.fields.amount) } ) }

 static fromBcs<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, data: Uint8Array ): Burn<ToPhantomTypeArgument<C>> { return Burn.fromFields( typeArg, Burn.bcs.parse(data) ) }

 toJSONField() { return {

 amount: this.amount.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, field: any ): Burn<ToPhantomTypeArgument<C>> { return Burn.reified( typeArg, ).new( { amount: decodeFromJSONField("u64", field.amount) } ) }

 static fromJSON<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, json: Record<string, any> ): Burn<ToPhantomTypeArgument<C>> { if (json.$typeName !== Burn.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Burn.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Burn.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, content: SuiParsedData ): Burn<ToPhantomTypeArgument<C>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBurn(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Burn object`); } return Burn.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, data: SuiObjectData ): Burn<ToPhantomTypeArgument<C>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isBurn(data.bcs.type)) { throw new Error(`object at is not a Burn object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Burn.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Burn.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<C extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: C, id: string ): Promise<Burn<ToPhantomTypeArgument<C>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Burn object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBurn(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Burn object`); }

 return Burn.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== Burned =============================== */

export function isBurned(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::currency::Burned`; }

export interface BurnedFields { coinType: ToField<String>; amount: ToField<"u64"> }

export type BurnedReified = Reified< Burned, BurnedFields >;

export class Burned implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::Burned`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Burned.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::Burned`; readonly $typeArgs: []; readonly $isPhantom = Burned.$isPhantom;

 readonly coinType: ToField<String>; readonly amount: ToField<"u64">

 private constructor(typeArgs: [], fields: BurnedFields, ) { this.$fullTypeName = composeSuiType( Burned.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::Burned`; this.$typeArgs = typeArgs;

 this.coinType = fields.coinType;; this.amount = fields.amount; }

 static reified( ): BurnedReified { return { typeName: Burned.$typeName, fullTypeName: composeSuiType( Burned.$typeName, ...[] ) as `${typeof PKG_V1}::currency::Burned`, typeArgs: [ ] as [], isPhantom: Burned.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Burned.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Burned.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Burned.fromBcs( data, ), bcs: Burned.bcs, fromJSONField: (field: any) => Burned.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Burned.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Burned.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Burned.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Burned.fetch( client, id, ), new: ( fields: BurnedFields, ) => { return new Burned( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Burned.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Burned>> { return phantom(Burned.reified( )); } static get p() { return Burned.phantom() }

 static get bcs() { return bcs.struct("Burned", {

 coin_type: String.bcs, amount: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): Burned { return Burned.reified( ).new( { coinType: decodeFromFields(String.reified(), fields.coin_type), amount: decodeFromFields("u64", fields.amount) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Burned { if (!isBurned(item.type)) { throw new Error("not a Burned type");

 }

 return Burned.reified( ).new( { coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type), amount: decodeFromFieldsWithTypes("u64", item.fields.amount) } ) }

 static fromBcs( data: Uint8Array ): Burned { return Burned.fromFields( Burned.bcs.parse(data) ) }

 toJSONField() { return {

 coinType: this.coinType,amount: this.amount.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Burned { return Burned.reified( ).new( { coinType: decodeFromJSONField(String.reified(), field.coinType), amount: decodeFromJSONField("u64", field.amount) } ) }

 static fromJSON( json: Record<string, any> ): Burned { if (json.$typeName !== Burned.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Burned.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Burned { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBurned(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Burned object`); } return Burned.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Burned { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isBurned(data.bcs.type)) { throw new Error(`object at is not a Burned object`); }

 return Burned.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Burned.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Burned> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Burned object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBurned(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Burned object`); }

 return Burned.fromSuiObjectData( res.data ); }

 }

/* ============================== CurrencyKey =============================== */

export function isCurrencyKey(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::currency::CurrencyKey` + '<'); }

export interface CurrencyKeyFields<C extends PhantomTypeArgument> { dummyField: ToField<"bool"> }

export type CurrencyKeyReified<C extends PhantomTypeArgument> = Reified< CurrencyKey<C>, CurrencyKeyFields<C> >;

export class CurrencyKey<C extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::CurrencyKey`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = CurrencyKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::CurrencyKey<${PhantomToTypeStr<C>}>`; readonly $typeArgs: [PhantomToTypeStr<C>]; readonly $isPhantom = CurrencyKey.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [PhantomToTypeStr<C>], fields: CurrencyKeyFields<C>, ) { this.$fullTypeName = composeSuiType( CurrencyKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::CurrencyKey<${PhantomToTypeStr<C>}>`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified<C extends PhantomReified<PhantomTypeArgument>>( C: C ): CurrencyKeyReified<ToPhantomTypeArgument<C>> { return { typeName: CurrencyKey.$typeName, fullTypeName: composeSuiType( CurrencyKey.$typeName, ...[extractType(C)] ) as `${typeof PKG_V1}::currency::CurrencyKey<${PhantomToTypeStr<ToPhantomTypeArgument<C>>}>`, typeArgs: [ extractType(C) ] as [PhantomToTypeStr<ToPhantomTypeArgument<C>>], isPhantom: CurrencyKey.$isPhantom, reifiedTypeArgs: [C], fromFields: (fields: Record<string, any>) => CurrencyKey.fromFields( C, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => CurrencyKey.fromFieldsWithTypes( C, item, ), fromBcs: (data: Uint8Array) => CurrencyKey.fromBcs( C, data, ), bcs: CurrencyKey.bcs, fromJSONField: (field: any) => CurrencyKey.fromJSONField( C, field, ), fromJSON: (json: Record<string, any>) => CurrencyKey.fromJSON( C, json, ), fromSuiParsedData: (content: SuiParsedData) => CurrencyKey.fromSuiParsedData( C, content, ), fromSuiObjectData: (content: SuiObjectData) => CurrencyKey.fromSuiObjectData( C, content, ), fetch: async (client: SuiClient, id: string) => CurrencyKey.fetch( client, C, id, ), new: ( fields: CurrencyKeyFields<ToPhantomTypeArgument<C>>, ) => { return new CurrencyKey( [extractType(C)], fields ) }, kind: "StructClassReified", } }

 static get r() { return CurrencyKey.reified }

 static phantom<C extends PhantomReified<PhantomTypeArgument>>( C: C ): PhantomReified<ToTypeStr<CurrencyKey<ToPhantomTypeArgument<C>>>> { return phantom(CurrencyKey.reified( C )); } static get p() { return CurrencyKey.phantom }

 static get bcs() { return bcs.struct("CurrencyKey", {

 dummy_field: bcs.bool()

}) };

 static fromFields<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, fields: Record<string, any> ): CurrencyKey<ToPhantomTypeArgument<C>> { return CurrencyKey.reified( typeArg, ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, item: FieldsWithTypes ): CurrencyKey<ToPhantomTypeArgument<C>> { if (!isCurrencyKey(item.type)) { throw new Error("not a CurrencyKey type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return CurrencyKey.reified( typeArg, ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, data: Uint8Array ): CurrencyKey<ToPhantomTypeArgument<C>> { return CurrencyKey.fromFields( typeArg, CurrencyKey.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, field: any ): CurrencyKey<ToPhantomTypeArgument<C>> { return CurrencyKey.reified( typeArg, ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, json: Record<string, any> ): CurrencyKey<ToPhantomTypeArgument<C>> { if (json.$typeName !== CurrencyKey.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(CurrencyKey.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return CurrencyKey.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, content: SuiParsedData ): CurrencyKey<ToPhantomTypeArgument<C>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isCurrencyKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a CurrencyKey object`); } return CurrencyKey.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, data: SuiObjectData ): CurrencyKey<ToPhantomTypeArgument<C>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isCurrencyKey(data.bcs.type)) { throw new Error(`object at is not a CurrencyKey object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return CurrencyKey.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return CurrencyKey.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<C extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: C, id: string ): Promise<CurrencyKey<ToPhantomTypeArgument<C>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching CurrencyKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isCurrencyKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a CurrencyKey object`); }

 return CurrencyKey.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== CurrencyLock =============================== */

export function isCurrencyLock(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::currency::CurrencyLock` + '<'); }

export interface CurrencyLockFields<C extends PhantomTypeArgument> { treasuryCap: ToField<TreasuryCap<C>> }

export type CurrencyLockReified<C extends PhantomTypeArgument> = Reified< CurrencyLock<C>, CurrencyLockFields<C> >;

export class CurrencyLock<C extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::CurrencyLock`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = CurrencyLock.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::CurrencyLock<${PhantomToTypeStr<C>}>`; readonly $typeArgs: [PhantomToTypeStr<C>]; readonly $isPhantom = CurrencyLock.$isPhantom;

 readonly treasuryCap: ToField<TreasuryCap<C>>

 private constructor(typeArgs: [PhantomToTypeStr<C>], fields: CurrencyLockFields<C>, ) { this.$fullTypeName = composeSuiType( CurrencyLock.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::CurrencyLock<${PhantomToTypeStr<C>}>`; this.$typeArgs = typeArgs;

 this.treasuryCap = fields.treasuryCap; }

 static reified<C extends PhantomReified<PhantomTypeArgument>>( C: C ): CurrencyLockReified<ToPhantomTypeArgument<C>> { return { typeName: CurrencyLock.$typeName, fullTypeName: composeSuiType( CurrencyLock.$typeName, ...[extractType(C)] ) as `${typeof PKG_V1}::currency::CurrencyLock<${PhantomToTypeStr<ToPhantomTypeArgument<C>>}>`, typeArgs: [ extractType(C) ] as [PhantomToTypeStr<ToPhantomTypeArgument<C>>], isPhantom: CurrencyLock.$isPhantom, reifiedTypeArgs: [C], fromFields: (fields: Record<string, any>) => CurrencyLock.fromFields( C, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => CurrencyLock.fromFieldsWithTypes( C, item, ), fromBcs: (data: Uint8Array) => CurrencyLock.fromBcs( C, data, ), bcs: CurrencyLock.bcs, fromJSONField: (field: any) => CurrencyLock.fromJSONField( C, field, ), fromJSON: (json: Record<string, any>) => CurrencyLock.fromJSON( C, json, ), fromSuiParsedData: (content: SuiParsedData) => CurrencyLock.fromSuiParsedData( C, content, ), fromSuiObjectData: (content: SuiObjectData) => CurrencyLock.fromSuiObjectData( C, content, ), fetch: async (client: SuiClient, id: string) => CurrencyLock.fetch( client, C, id, ), new: ( fields: CurrencyLockFields<ToPhantomTypeArgument<C>>, ) => { return new CurrencyLock( [extractType(C)], fields ) }, kind: "StructClassReified", } }

 static get r() { return CurrencyLock.reified }

 static phantom<C extends PhantomReified<PhantomTypeArgument>>( C: C ): PhantomReified<ToTypeStr<CurrencyLock<ToPhantomTypeArgument<C>>>> { return phantom(CurrencyLock.reified( C )); } static get p() { return CurrencyLock.phantom }

 static get bcs() { return bcs.struct("CurrencyLock", {

 treasury_cap: TreasuryCap.bcs

}) };

 static fromFields<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, fields: Record<string, any> ): CurrencyLock<ToPhantomTypeArgument<C>> { return CurrencyLock.reified( typeArg, ).new( { treasuryCap: decodeFromFields(TreasuryCap.reified(typeArg), fields.treasury_cap) } ) }

 static fromFieldsWithTypes<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, item: FieldsWithTypes ): CurrencyLock<ToPhantomTypeArgument<C>> { if (!isCurrencyLock(item.type)) { throw new Error("not a CurrencyLock type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return CurrencyLock.reified( typeArg, ).new( { treasuryCap: decodeFromFieldsWithTypes(TreasuryCap.reified(typeArg), item.fields.treasury_cap) } ) }

 static fromBcs<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, data: Uint8Array ): CurrencyLock<ToPhantomTypeArgument<C>> { return CurrencyLock.fromFields( typeArg, CurrencyLock.bcs.parse(data) ) }

 toJSONField() { return {

 treasuryCap: this.treasuryCap.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, field: any ): CurrencyLock<ToPhantomTypeArgument<C>> { return CurrencyLock.reified( typeArg, ).new( { treasuryCap: decodeFromJSONField(TreasuryCap.reified(typeArg), field.treasuryCap) } ) }

 static fromJSON<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, json: Record<string, any> ): CurrencyLock<ToPhantomTypeArgument<C>> { if (json.$typeName !== CurrencyLock.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(CurrencyLock.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return CurrencyLock.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, content: SuiParsedData ): CurrencyLock<ToPhantomTypeArgument<C>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isCurrencyLock(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a CurrencyLock object`); } return CurrencyLock.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, data: SuiObjectData ): CurrencyLock<ToPhantomTypeArgument<C>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isCurrencyLock(data.bcs.type)) { throw new Error(`object at is not a CurrencyLock object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return CurrencyLock.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return CurrencyLock.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<C extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: C, id: string ): Promise<CurrencyLock<ToPhantomTypeArgument<C>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching CurrencyLock object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isCurrencyLock(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a CurrencyLock object`); }

 return CurrencyLock.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== Mint =============================== */

export function isMint(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::currency::Mint` + '<'); }

export interface MintFields<C extends PhantomTypeArgument> { amount: ToField<"u64"> }

export type MintReified<C extends PhantomTypeArgument> = Reified< Mint<C>, MintFields<C> >;

export class Mint<C extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::Mint`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Mint.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::Mint<${PhantomToTypeStr<C>}>`; readonly $typeArgs: [PhantomToTypeStr<C>]; readonly $isPhantom = Mint.$isPhantom;

 readonly amount: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<C>], fields: MintFields<C>, ) { this.$fullTypeName = composeSuiType( Mint.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::Mint<${PhantomToTypeStr<C>}>`; this.$typeArgs = typeArgs;

 this.amount = fields.amount; }

 static reified<C extends PhantomReified<PhantomTypeArgument>>( C: C ): MintReified<ToPhantomTypeArgument<C>> { return { typeName: Mint.$typeName, fullTypeName: composeSuiType( Mint.$typeName, ...[extractType(C)] ) as `${typeof PKG_V1}::currency::Mint<${PhantomToTypeStr<ToPhantomTypeArgument<C>>}>`, typeArgs: [ extractType(C) ] as [PhantomToTypeStr<ToPhantomTypeArgument<C>>], isPhantom: Mint.$isPhantom, reifiedTypeArgs: [C], fromFields: (fields: Record<string, any>) => Mint.fromFields( C, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Mint.fromFieldsWithTypes( C, item, ), fromBcs: (data: Uint8Array) => Mint.fromBcs( C, data, ), bcs: Mint.bcs, fromJSONField: (field: any) => Mint.fromJSONField( C, field, ), fromJSON: (json: Record<string, any>) => Mint.fromJSON( C, json, ), fromSuiParsedData: (content: SuiParsedData) => Mint.fromSuiParsedData( C, content, ), fromSuiObjectData: (content: SuiObjectData) => Mint.fromSuiObjectData( C, content, ), fetch: async (client: SuiClient, id: string) => Mint.fetch( client, C, id, ), new: ( fields: MintFields<ToPhantomTypeArgument<C>>, ) => { return new Mint( [extractType(C)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Mint.reified }

 static phantom<C extends PhantomReified<PhantomTypeArgument>>( C: C ): PhantomReified<ToTypeStr<Mint<ToPhantomTypeArgument<C>>>> { return phantom(Mint.reified( C )); } static get p() { return Mint.phantom }

 static get bcs() { return bcs.struct("Mint", {

 amount: bcs.u64()

}) };

 static fromFields<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, fields: Record<string, any> ): Mint<ToPhantomTypeArgument<C>> { return Mint.reified( typeArg, ).new( { amount: decodeFromFields("u64", fields.amount) } ) }

 static fromFieldsWithTypes<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, item: FieldsWithTypes ): Mint<ToPhantomTypeArgument<C>> { if (!isMint(item.type)) { throw new Error("not a Mint type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Mint.reified( typeArg, ).new( { amount: decodeFromFieldsWithTypes("u64", item.fields.amount) } ) }

 static fromBcs<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, data: Uint8Array ): Mint<ToPhantomTypeArgument<C>> { return Mint.fromFields( typeArg, Mint.bcs.parse(data) ) }

 toJSONField() { return {

 amount: this.amount.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, field: any ): Mint<ToPhantomTypeArgument<C>> { return Mint.reified( typeArg, ).new( { amount: decodeFromJSONField("u64", field.amount) } ) }

 static fromJSON<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, json: Record<string, any> ): Mint<ToPhantomTypeArgument<C>> { if (json.$typeName !== Mint.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Mint.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Mint.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, content: SuiParsedData ): Mint<ToPhantomTypeArgument<C>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMint(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Mint object`); } return Mint.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, data: SuiObjectData ): Mint<ToPhantomTypeArgument<C>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMint(data.bcs.type)) { throw new Error(`object at is not a Mint object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Mint.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Mint.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<C extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: C, id: string ): Promise<Mint<ToPhantomTypeArgument<C>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Mint object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMint(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Mint object`); }

 return Mint.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== Minted =============================== */

export function isMinted(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::currency::Minted`; }

export interface MintedFields { coinType: ToField<String>; amount: ToField<"u64"> }

export type MintedReified = Reified< Minted, MintedFields >;

export class Minted implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::Minted`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Minted.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::Minted`; readonly $typeArgs: []; readonly $isPhantom = Minted.$isPhantom;

 readonly coinType: ToField<String>; readonly amount: ToField<"u64">

 private constructor(typeArgs: [], fields: MintedFields, ) { this.$fullTypeName = composeSuiType( Minted.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::Minted`; this.$typeArgs = typeArgs;

 this.coinType = fields.coinType;; this.amount = fields.amount; }

 static reified( ): MintedReified { return { typeName: Minted.$typeName, fullTypeName: composeSuiType( Minted.$typeName, ...[] ) as `${typeof PKG_V1}::currency::Minted`, typeArgs: [ ] as [], isPhantom: Minted.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Minted.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Minted.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Minted.fromBcs( data, ), bcs: Minted.bcs, fromJSONField: (field: any) => Minted.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Minted.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Minted.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Minted.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Minted.fetch( client, id, ), new: ( fields: MintedFields, ) => { return new Minted( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Minted.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Minted>> { return phantom(Minted.reified( )); } static get p() { return Minted.phantom() }

 static get bcs() { return bcs.struct("Minted", {

 coin_type: String.bcs, amount: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): Minted { return Minted.reified( ).new( { coinType: decodeFromFields(String.reified(), fields.coin_type), amount: decodeFromFields("u64", fields.amount) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Minted { if (!isMinted(item.type)) { throw new Error("not a Minted type");

 }

 return Minted.reified( ).new( { coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type), amount: decodeFromFieldsWithTypes("u64", item.fields.amount) } ) }

 static fromBcs( data: Uint8Array ): Minted { return Minted.fromFields( Minted.bcs.parse(data) ) }

 toJSONField() { return {

 coinType: this.coinType,amount: this.amount.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Minted { return Minted.reified( ).new( { coinType: decodeFromJSONField(String.reified(), field.coinType), amount: decodeFromJSONField("u64", field.amount) } ) }

 static fromJSON( json: Record<string, any> ): Minted { if (json.$typeName !== Minted.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Minted.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Minted { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMinted(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Minted object`); } return Minted.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Minted { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMinted(data.bcs.type)) { throw new Error(`object at is not a Minted object`); }

 return Minted.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Minted.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Minted> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Minted object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMinted(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Minted object`); }

 return Minted.fromSuiObjectData( res.data ); }

 }

/* ============================== Update =============================== */

export function isUpdate(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::currency::Update`; }

export interface UpdateFields { coinType: ToField<String>; name: ToField<Option<String>>; symbol: ToField<Option<String>>; description: ToField<Option<String>>; iconUrl: ToField<Option<String>> }

export type UpdateReified = Reified< Update, UpdateFields >;

export class Update implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::Update`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Update.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::Update`; readonly $typeArgs: []; readonly $isPhantom = Update.$isPhantom;

 readonly coinType: ToField<String>; readonly name: ToField<Option<String>>; readonly symbol: ToField<Option<String>>; readonly description: ToField<Option<String>>; readonly iconUrl: ToField<Option<String>>

 private constructor(typeArgs: [], fields: UpdateFields, ) { this.$fullTypeName = composeSuiType( Update.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::Update`; this.$typeArgs = typeArgs;

 this.coinType = fields.coinType;; this.name = fields.name;; this.symbol = fields.symbol;; this.description = fields.description;; this.iconUrl = fields.iconUrl; }

 static reified( ): UpdateReified { return { typeName: Update.$typeName, fullTypeName: composeSuiType( Update.$typeName, ...[] ) as `${typeof PKG_V1}::currency::Update`, typeArgs: [ ] as [], isPhantom: Update.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Update.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Update.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Update.fromBcs( data, ), bcs: Update.bcs, fromJSONField: (field: any) => Update.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Update.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Update.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Update.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Update.fetch( client, id, ), new: ( fields: UpdateFields, ) => { return new Update( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Update.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Update>> { return phantom(Update.reified( )); } static get p() { return Update.phantom() }

 static get bcs() { return bcs.struct("Update", {

 coin_type: String.bcs, name: Option.bcs(String.bcs), symbol: Option.bcs(String.bcs), description: Option.bcs(String.bcs), icon_url: Option.bcs(String.bcs)

}) };

 static fromFields( fields: Record<string, any> ): Update { return Update.reified( ).new( { coinType: decodeFromFields(String.reified(), fields.coin_type), name: decodeFromFields(Option.reified(String.reified()), fields.name), symbol: decodeFromFields(Option.reified(String.reified()), fields.symbol), description: decodeFromFields(Option.reified(String.reified()), fields.description), iconUrl: decodeFromFields(Option.reified(String.reified()), fields.icon_url) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Update { if (!isUpdate(item.type)) { throw new Error("not a Update type");

 }

 return Update.reified( ).new( { coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type), name: decodeFromFieldsWithTypes(Option.reified(String.reified()), item.fields.name), symbol: decodeFromFieldsWithTypes(Option.reified(String.reified()), item.fields.symbol), description: decodeFromFieldsWithTypes(Option.reified(String.reified()), item.fields.description), iconUrl: decodeFromFieldsWithTypes(Option.reified(String.reified()), item.fields.icon_url) } ) }

 static fromBcs( data: Uint8Array ): Update { return Update.fromFields( Update.bcs.parse(data) ) }

 toJSONField() { return {

 coinType: this.coinType,name: fieldToJSON<Option<String>>(`${Option.$typeName}<${String.$typeName}>`, this.name),symbol: fieldToJSON<Option<String>>(`${Option.$typeName}<${String.$typeName}>`, this.symbol),description: fieldToJSON<Option<String>>(`${Option.$typeName}<${String.$typeName}>`, this.description),iconUrl: fieldToJSON<Option<String>>(`${Option.$typeName}<${String.$typeName}>`, this.iconUrl),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Update { return Update.reified( ).new( { coinType: decodeFromJSONField(String.reified(), field.coinType), name: decodeFromJSONField(Option.reified(String.reified()), field.name), symbol: decodeFromJSONField(Option.reified(String.reified()), field.symbol), description: decodeFromJSONField(Option.reified(String.reified()), field.description), iconUrl: decodeFromJSONField(Option.reified(String.reified()), field.iconUrl) } ) }

 static fromJSON( json: Record<string, any> ): Update { if (json.$typeName !== Update.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Update.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Update { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpdate(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Update object`); } return Update.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Update { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpdate(data.bcs.type)) { throw new Error(`object at is not a Update object`); }

 return Update.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Update.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Update> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Update object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpdate(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Update object`); }

 return Update.fromSuiObjectData( res.data ); }

 }
