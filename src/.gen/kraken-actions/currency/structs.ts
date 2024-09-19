import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {TreasuryCap} from "../../_dependencies/source/0x2/coin/structs";
import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== BurnAction =============================== */

export function isBurnAction(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::currency::BurnAction` + '<'); }

export interface BurnActionFields<C extends PhantomTypeArgument> { amount: ToField<"u64"> }

export type BurnActionReified<C extends PhantomTypeArgument> = Reified< BurnAction<C>, BurnActionFields<C> >;

export class BurnAction<C extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::BurnAction`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = BurnAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::BurnAction<${PhantomToTypeStr<C>}>`; readonly $typeArgs: [PhantomToTypeStr<C>]; readonly $isPhantom = BurnAction.$isPhantom;

 readonly amount: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<C>], fields: BurnActionFields<C>, ) { this.$fullTypeName = composeSuiType( BurnAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::BurnAction<${PhantomToTypeStr<C>}>`; this.$typeArgs = typeArgs;

 this.amount = fields.amount; }

 static reified<C extends PhantomReified<PhantomTypeArgument>>( C: C ): BurnActionReified<ToPhantomTypeArgument<C>> { return { typeName: BurnAction.$typeName, fullTypeName: composeSuiType( BurnAction.$typeName, ...[extractType(C)] ) as `${typeof PKG_V1}::currency::BurnAction<${PhantomToTypeStr<ToPhantomTypeArgument<C>>}>`, typeArgs: [ extractType(C) ] as [PhantomToTypeStr<ToPhantomTypeArgument<C>>], isPhantom: BurnAction.$isPhantom, reifiedTypeArgs: [C], fromFields: (fields: Record<string, any>) => BurnAction.fromFields( C, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => BurnAction.fromFieldsWithTypes( C, item, ), fromBcs: (data: Uint8Array) => BurnAction.fromBcs( C, data, ), bcs: BurnAction.bcs, fromJSONField: (field: any) => BurnAction.fromJSONField( C, field, ), fromJSON: (json: Record<string, any>) => BurnAction.fromJSON( C, json, ), fromSuiParsedData: (content: SuiParsedData) => BurnAction.fromSuiParsedData( C, content, ), fromSuiObjectData: (content: SuiObjectData) => BurnAction.fromSuiObjectData( C, content, ), fetch: async (client: SuiClient, id: string) => BurnAction.fetch( client, C, id, ), new: ( fields: BurnActionFields<ToPhantomTypeArgument<C>>, ) => { return new BurnAction( [extractType(C)], fields ) }, kind: "StructClassReified", } }

 static get r() { return BurnAction.reified }

 static phantom<C extends PhantomReified<PhantomTypeArgument>>( C: C ): PhantomReified<ToTypeStr<BurnAction<ToPhantomTypeArgument<C>>>> { return phantom(BurnAction.reified( C )); } static get p() { return BurnAction.phantom }

 static get bcs() { return bcs.struct("BurnAction", {

 amount: bcs.u64()

}) };

 static fromFields<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, fields: Record<string, any> ): BurnAction<ToPhantomTypeArgument<C>> { return BurnAction.reified( typeArg, ).new( { amount: decodeFromFields("u64", fields.amount) } ) }

 static fromFieldsWithTypes<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, item: FieldsWithTypes ): BurnAction<ToPhantomTypeArgument<C>> { if (!isBurnAction(item.type)) { throw new Error("not a BurnAction type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return BurnAction.reified( typeArg, ).new( { amount: decodeFromFieldsWithTypes("u64", item.fields.amount) } ) }

 static fromBcs<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, data: Uint8Array ): BurnAction<ToPhantomTypeArgument<C>> { return BurnAction.fromFields( typeArg, BurnAction.bcs.parse(data) ) }

 toJSONField() { return {

 amount: this.amount.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, field: any ): BurnAction<ToPhantomTypeArgument<C>> { return BurnAction.reified( typeArg, ).new( { amount: decodeFromJSONField("u64", field.amount) } ) }

 static fromJSON<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, json: Record<string, any> ): BurnAction<ToPhantomTypeArgument<C>> { if (json.$typeName !== BurnAction.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(BurnAction.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return BurnAction.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, content: SuiParsedData ): BurnAction<ToPhantomTypeArgument<C>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBurnAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a BurnAction object`); } return BurnAction.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, data: SuiObjectData ): BurnAction<ToPhantomTypeArgument<C>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isBurnAction(data.bcs.type)) { throw new Error(`object at is not a BurnAction object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return BurnAction.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return BurnAction.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<C extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: C, id: string ): Promise<BurnAction<ToPhantomTypeArgument<C>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching BurnAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBurnAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a BurnAction object`); }

 return BurnAction.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== BurnProposal =============================== */

export function isBurnProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::currency::BurnProposal`; }

export interface BurnProposalFields { dummyField: ToField<"bool"> }

export type BurnProposalReified = Reified< BurnProposal, BurnProposalFields >;

export class BurnProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::BurnProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = BurnProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::BurnProposal`; readonly $typeArgs: []; readonly $isPhantom = BurnProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: BurnProposalFields, ) { this.$fullTypeName = composeSuiType( BurnProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::BurnProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): BurnProposalReified { return { typeName: BurnProposal.$typeName, fullTypeName: composeSuiType( BurnProposal.$typeName, ...[] ) as `${typeof PKG_V1}::currency::BurnProposal`, typeArgs: [ ] as [], isPhantom: BurnProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => BurnProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => BurnProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => BurnProposal.fromBcs( data, ), bcs: BurnProposal.bcs, fromJSONField: (field: any) => BurnProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => BurnProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => BurnProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => BurnProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => BurnProposal.fetch( client, id, ), new: ( fields: BurnProposalFields, ) => { return new BurnProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return BurnProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<BurnProposal>> { return phantom(BurnProposal.reified( )); } static get p() { return BurnProposal.phantom() }

 static get bcs() { return bcs.struct("BurnProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): BurnProposal { return BurnProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): BurnProposal { if (!isBurnProposal(item.type)) { throw new Error("not a BurnProposal type");

 }

 return BurnProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): BurnProposal { return BurnProposal.fromFields( BurnProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): BurnProposal { return BurnProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): BurnProposal { if (json.$typeName !== BurnProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return BurnProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): BurnProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBurnProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a BurnProposal object`); } return BurnProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): BurnProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isBurnProposal(data.bcs.type)) { throw new Error(`object at is not a BurnProposal object`); }

 return BurnProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return BurnProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<BurnProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching BurnProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBurnProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a BurnProposal object`); }

 return BurnProposal.fromSuiObjectData( res.data ); }

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

/* ============================== ManageCurrency =============================== */

export function isManageCurrency(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::currency::ManageCurrency`; }

export interface ManageCurrencyFields { dummyField: ToField<"bool"> }

export type ManageCurrencyReified = Reified< ManageCurrency, ManageCurrencyFields >;

export class ManageCurrency implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::ManageCurrency`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ManageCurrency.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::ManageCurrency`; readonly $typeArgs: []; readonly $isPhantom = ManageCurrency.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: ManageCurrencyFields, ) { this.$fullTypeName = composeSuiType( ManageCurrency.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::ManageCurrency`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): ManageCurrencyReified { return { typeName: ManageCurrency.$typeName, fullTypeName: composeSuiType( ManageCurrency.$typeName, ...[] ) as `${typeof PKG_V1}::currency::ManageCurrency`, typeArgs: [ ] as [], isPhantom: ManageCurrency.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ManageCurrency.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ManageCurrency.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ManageCurrency.fromBcs( data, ), bcs: ManageCurrency.bcs, fromJSONField: (field: any) => ManageCurrency.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ManageCurrency.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ManageCurrency.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ManageCurrency.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ManageCurrency.fetch( client, id, ), new: ( fields: ManageCurrencyFields, ) => { return new ManageCurrency( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ManageCurrency.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ManageCurrency>> { return phantom(ManageCurrency.reified( )); } static get p() { return ManageCurrency.phantom() }

 static get bcs() { return bcs.struct("ManageCurrency", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): ManageCurrency { return ManageCurrency.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ManageCurrency { if (!isManageCurrency(item.type)) { throw new Error("not a ManageCurrency type");

 }

 return ManageCurrency.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): ManageCurrency { return ManageCurrency.fromFields( ManageCurrency.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ManageCurrency { return ManageCurrency.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): ManageCurrency { if (json.$typeName !== ManageCurrency.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ManageCurrency.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ManageCurrency { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isManageCurrency(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ManageCurrency object`); } return ManageCurrency.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ManageCurrency { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isManageCurrency(data.bcs.type)) { throw new Error(`object at is not a ManageCurrency object`); }

 return ManageCurrency.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ManageCurrency.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ManageCurrency> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ManageCurrency object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isManageCurrency(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ManageCurrency object`); }

 return ManageCurrency.fromSuiObjectData( res.data ); }

 }

/* ============================== MintAction =============================== */

export function isMintAction(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::currency::MintAction` + '<'); }

export interface MintActionFields<C extends PhantomTypeArgument> { amount: ToField<"u64"> }

export type MintActionReified<C extends PhantomTypeArgument> = Reified< MintAction<C>, MintActionFields<C> >;

export class MintAction<C extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::MintAction`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = MintAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::MintAction<${PhantomToTypeStr<C>}>`; readonly $typeArgs: [PhantomToTypeStr<C>]; readonly $isPhantom = MintAction.$isPhantom;

 readonly amount: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<C>], fields: MintActionFields<C>, ) { this.$fullTypeName = composeSuiType( MintAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::MintAction<${PhantomToTypeStr<C>}>`; this.$typeArgs = typeArgs;

 this.amount = fields.amount; }

 static reified<C extends PhantomReified<PhantomTypeArgument>>( C: C ): MintActionReified<ToPhantomTypeArgument<C>> { return { typeName: MintAction.$typeName, fullTypeName: composeSuiType( MintAction.$typeName, ...[extractType(C)] ) as `${typeof PKG_V1}::currency::MintAction<${PhantomToTypeStr<ToPhantomTypeArgument<C>>}>`, typeArgs: [ extractType(C) ] as [PhantomToTypeStr<ToPhantomTypeArgument<C>>], isPhantom: MintAction.$isPhantom, reifiedTypeArgs: [C], fromFields: (fields: Record<string, any>) => MintAction.fromFields( C, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MintAction.fromFieldsWithTypes( C, item, ), fromBcs: (data: Uint8Array) => MintAction.fromBcs( C, data, ), bcs: MintAction.bcs, fromJSONField: (field: any) => MintAction.fromJSONField( C, field, ), fromJSON: (json: Record<string, any>) => MintAction.fromJSON( C, json, ), fromSuiParsedData: (content: SuiParsedData) => MintAction.fromSuiParsedData( C, content, ), fromSuiObjectData: (content: SuiObjectData) => MintAction.fromSuiObjectData( C, content, ), fetch: async (client: SuiClient, id: string) => MintAction.fetch( client, C, id, ), new: ( fields: MintActionFields<ToPhantomTypeArgument<C>>, ) => { return new MintAction( [extractType(C)], fields ) }, kind: "StructClassReified", } }

 static get r() { return MintAction.reified }

 static phantom<C extends PhantomReified<PhantomTypeArgument>>( C: C ): PhantomReified<ToTypeStr<MintAction<ToPhantomTypeArgument<C>>>> { return phantom(MintAction.reified( C )); } static get p() { return MintAction.phantom }

 static get bcs() { return bcs.struct("MintAction", {

 amount: bcs.u64()

}) };

 static fromFields<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, fields: Record<string, any> ): MintAction<ToPhantomTypeArgument<C>> { return MintAction.reified( typeArg, ).new( { amount: decodeFromFields("u64", fields.amount) } ) }

 static fromFieldsWithTypes<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, item: FieldsWithTypes ): MintAction<ToPhantomTypeArgument<C>> { if (!isMintAction(item.type)) { throw new Error("not a MintAction type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return MintAction.reified( typeArg, ).new( { amount: decodeFromFieldsWithTypes("u64", item.fields.amount) } ) }

 static fromBcs<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, data: Uint8Array ): MintAction<ToPhantomTypeArgument<C>> { return MintAction.fromFields( typeArg, MintAction.bcs.parse(data) ) }

 toJSONField() { return {

 amount: this.amount.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, field: any ): MintAction<ToPhantomTypeArgument<C>> { return MintAction.reified( typeArg, ).new( { amount: decodeFromJSONField("u64", field.amount) } ) }

 static fromJSON<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, json: Record<string, any> ): MintAction<ToPhantomTypeArgument<C>> { if (json.$typeName !== MintAction.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(MintAction.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return MintAction.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, content: SuiParsedData ): MintAction<ToPhantomTypeArgument<C>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMintAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MintAction object`); } return MintAction.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, data: SuiObjectData ): MintAction<ToPhantomTypeArgument<C>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMintAction(data.bcs.type)) { throw new Error(`object at is not a MintAction object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return MintAction.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return MintAction.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<C extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: C, id: string ): Promise<MintAction<ToPhantomTypeArgument<C>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MintAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMintAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MintAction object`); }

 return MintAction.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== MintProposal =============================== */

export function isMintProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::currency::MintProposal`; }

export interface MintProposalFields { dummyField: ToField<"bool"> }

export type MintProposalReified = Reified< MintProposal, MintProposalFields >;

export class MintProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::MintProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = MintProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::MintProposal`; readonly $typeArgs: []; readonly $isPhantom = MintProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: MintProposalFields, ) { this.$fullTypeName = composeSuiType( MintProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::MintProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): MintProposalReified { return { typeName: MintProposal.$typeName, fullTypeName: composeSuiType( MintProposal.$typeName, ...[] ) as `${typeof PKG_V1}::currency::MintProposal`, typeArgs: [ ] as [], isPhantom: MintProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => MintProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MintProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => MintProposal.fromBcs( data, ), bcs: MintProposal.bcs, fromJSONField: (field: any) => MintProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => MintProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => MintProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => MintProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => MintProposal.fetch( client, id, ), new: ( fields: MintProposalFields, ) => { return new MintProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return MintProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<MintProposal>> { return phantom(MintProposal.reified( )); } static get p() { return MintProposal.phantom() }

 static get bcs() { return bcs.struct("MintProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): MintProposal { return MintProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): MintProposal { if (!isMintProposal(item.type)) { throw new Error("not a MintProposal type");

 }

 return MintProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): MintProposal { return MintProposal.fromFields( MintProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): MintProposal { return MintProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): MintProposal { if (json.$typeName !== MintProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return MintProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): MintProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMintProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MintProposal object`); } return MintProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): MintProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMintProposal(data.bcs.type)) { throw new Error(`object at is not a MintProposal object`); }

 return MintProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return MintProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<MintProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MintProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMintProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MintProposal object`); }

 return MintProposal.fromSuiObjectData( res.data ); }

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

/* ============================== UpdateAction =============================== */

export function isUpdateAction(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::currency::UpdateAction` + '<'); }

export interface UpdateActionFields<C extends PhantomTypeArgument> { name: ToField<Option<String>>; symbol: ToField<Option<String>>; description: ToField<Option<String>>; iconUrl: ToField<Option<String>> }

export type UpdateActionReified<C extends PhantomTypeArgument> = Reified< UpdateAction<C>, UpdateActionFields<C> >;

export class UpdateAction<C extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::UpdateAction`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = UpdateAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::UpdateAction<${PhantomToTypeStr<C>}>`; readonly $typeArgs: [PhantomToTypeStr<C>]; readonly $isPhantom = UpdateAction.$isPhantom;

 readonly name: ToField<Option<String>>; readonly symbol: ToField<Option<String>>; readonly description: ToField<Option<String>>; readonly iconUrl: ToField<Option<String>>

 private constructor(typeArgs: [PhantomToTypeStr<C>], fields: UpdateActionFields<C>, ) { this.$fullTypeName = composeSuiType( UpdateAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::UpdateAction<${PhantomToTypeStr<C>}>`; this.$typeArgs = typeArgs;

 this.name = fields.name;; this.symbol = fields.symbol;; this.description = fields.description;; this.iconUrl = fields.iconUrl; }

 static reified<C extends PhantomReified<PhantomTypeArgument>>( C: C ): UpdateActionReified<ToPhantomTypeArgument<C>> { return { typeName: UpdateAction.$typeName, fullTypeName: composeSuiType( UpdateAction.$typeName, ...[extractType(C)] ) as `${typeof PKG_V1}::currency::UpdateAction<${PhantomToTypeStr<ToPhantomTypeArgument<C>>}>`, typeArgs: [ extractType(C) ] as [PhantomToTypeStr<ToPhantomTypeArgument<C>>], isPhantom: UpdateAction.$isPhantom, reifiedTypeArgs: [C], fromFields: (fields: Record<string, any>) => UpdateAction.fromFields( C, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UpdateAction.fromFieldsWithTypes( C, item, ), fromBcs: (data: Uint8Array) => UpdateAction.fromBcs( C, data, ), bcs: UpdateAction.bcs, fromJSONField: (field: any) => UpdateAction.fromJSONField( C, field, ), fromJSON: (json: Record<string, any>) => UpdateAction.fromJSON( C, json, ), fromSuiParsedData: (content: SuiParsedData) => UpdateAction.fromSuiParsedData( C, content, ), fromSuiObjectData: (content: SuiObjectData) => UpdateAction.fromSuiObjectData( C, content, ), fetch: async (client: SuiClient, id: string) => UpdateAction.fetch( client, C, id, ), new: ( fields: UpdateActionFields<ToPhantomTypeArgument<C>>, ) => { return new UpdateAction( [extractType(C)], fields ) }, kind: "StructClassReified", } }

 static get r() { return UpdateAction.reified }

 static phantom<C extends PhantomReified<PhantomTypeArgument>>( C: C ): PhantomReified<ToTypeStr<UpdateAction<ToPhantomTypeArgument<C>>>> { return phantom(UpdateAction.reified( C )); } static get p() { return UpdateAction.phantom }

 static get bcs() { return bcs.struct("UpdateAction", {

 name: Option.bcs(String.bcs), symbol: Option.bcs(String.bcs), description: Option.bcs(String.bcs), icon_url: Option.bcs(String.bcs)

}) };

 static fromFields<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, fields: Record<string, any> ): UpdateAction<ToPhantomTypeArgument<C>> { return UpdateAction.reified( typeArg, ).new( { name: decodeFromFields(Option.reified(String.reified()), fields.name), symbol: decodeFromFields(Option.reified(String.reified()), fields.symbol), description: decodeFromFields(Option.reified(String.reified()), fields.description), iconUrl: decodeFromFields(Option.reified(String.reified()), fields.icon_url) } ) }

 static fromFieldsWithTypes<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, item: FieldsWithTypes ): UpdateAction<ToPhantomTypeArgument<C>> { if (!isUpdateAction(item.type)) { throw new Error("not a UpdateAction type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return UpdateAction.reified( typeArg, ).new( { name: decodeFromFieldsWithTypes(Option.reified(String.reified()), item.fields.name), symbol: decodeFromFieldsWithTypes(Option.reified(String.reified()), item.fields.symbol), description: decodeFromFieldsWithTypes(Option.reified(String.reified()), item.fields.description), iconUrl: decodeFromFieldsWithTypes(Option.reified(String.reified()), item.fields.icon_url) } ) }

 static fromBcs<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, data: Uint8Array ): UpdateAction<ToPhantomTypeArgument<C>> { return UpdateAction.fromFields( typeArg, UpdateAction.bcs.parse(data) ) }

 toJSONField() { return {

 name: fieldToJSON<Option<String>>(`${Option.$typeName}<${String.$typeName}>`, this.name),symbol: fieldToJSON<Option<String>>(`${Option.$typeName}<${String.$typeName}>`, this.symbol),description: fieldToJSON<Option<String>>(`${Option.$typeName}<${String.$typeName}>`, this.description),iconUrl: fieldToJSON<Option<String>>(`${Option.$typeName}<${String.$typeName}>`, this.iconUrl),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, field: any ): UpdateAction<ToPhantomTypeArgument<C>> { return UpdateAction.reified( typeArg, ).new( { name: decodeFromJSONField(Option.reified(String.reified()), field.name), symbol: decodeFromJSONField(Option.reified(String.reified()), field.symbol), description: decodeFromJSONField(Option.reified(String.reified()), field.description), iconUrl: decodeFromJSONField(Option.reified(String.reified()), field.iconUrl) } ) }

 static fromJSON<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, json: Record<string, any> ): UpdateAction<ToPhantomTypeArgument<C>> { if (json.$typeName !== UpdateAction.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(UpdateAction.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return UpdateAction.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, content: SuiParsedData ): UpdateAction<ToPhantomTypeArgument<C>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpdateAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UpdateAction object`); } return UpdateAction.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, data: SuiObjectData ): UpdateAction<ToPhantomTypeArgument<C>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpdateAction(data.bcs.type)) { throw new Error(`object at is not a UpdateAction object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return UpdateAction.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return UpdateAction.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<C extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: C, id: string ): Promise<UpdateAction<ToPhantomTypeArgument<C>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UpdateAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpdateAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UpdateAction object`); }

 return UpdateAction.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== UpdateProposal =============================== */

export function isUpdateProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::currency::UpdateProposal`; }

export interface UpdateProposalFields { dummyField: ToField<"bool"> }

export type UpdateProposalReified = Reified< UpdateProposal, UpdateProposalFields >;

export class UpdateProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::currency::UpdateProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = UpdateProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::currency::UpdateProposal`; readonly $typeArgs: []; readonly $isPhantom = UpdateProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: UpdateProposalFields, ) { this.$fullTypeName = composeSuiType( UpdateProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::UpdateProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): UpdateProposalReified { return { typeName: UpdateProposal.$typeName, fullTypeName: composeSuiType( UpdateProposal.$typeName, ...[] ) as `${typeof PKG_V1}::currency::UpdateProposal`, typeArgs: [ ] as [], isPhantom: UpdateProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => UpdateProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UpdateProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => UpdateProposal.fromBcs( data, ), bcs: UpdateProposal.bcs, fromJSONField: (field: any) => UpdateProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => UpdateProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => UpdateProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => UpdateProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => UpdateProposal.fetch( client, id, ), new: ( fields: UpdateProposalFields, ) => { return new UpdateProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return UpdateProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<UpdateProposal>> { return phantom(UpdateProposal.reified( )); } static get p() { return UpdateProposal.phantom() }

 static get bcs() { return bcs.struct("UpdateProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): UpdateProposal { return UpdateProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): UpdateProposal { if (!isUpdateProposal(item.type)) { throw new Error("not a UpdateProposal type");

 }

 return UpdateProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): UpdateProposal { return UpdateProposal.fromFields( UpdateProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): UpdateProposal { return UpdateProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): UpdateProposal { if (json.$typeName !== UpdateProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return UpdateProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): UpdateProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpdateProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UpdateProposal object`); } return UpdateProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): UpdateProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpdateProposal(data.bcs.type)) { throw new Error(`object at is not a UpdateProposal object`); }

 return UpdateProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return UpdateProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<UpdateProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UpdateProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpdateProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UpdateProposal object`); }

 return UpdateProposal.fromSuiObjectData( res.data ); }

 }
