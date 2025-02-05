import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== BorrowAction =============================== */

export function isBorrowAction(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::access_control::BorrowAction` + '<'); }

export interface BorrowActionFields<Cap extends PhantomTypeArgument> { dummyField: ToField<"bool"> }

export type BorrowActionReified<Cap extends PhantomTypeArgument> = Reified< BorrowAction<Cap>, BorrowActionFields<Cap> >;

export class BorrowAction<Cap extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::access_control::BorrowAction`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = BorrowAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::access_control::BorrowAction<${PhantomToTypeStr<Cap>}>`; readonly $typeArgs: [PhantomToTypeStr<Cap>]; readonly $isPhantom = BorrowAction.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [PhantomToTypeStr<Cap>], fields: BorrowActionFields<Cap>, ) { this.$fullTypeName = composeSuiType( BorrowAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::access_control::BorrowAction<${PhantomToTypeStr<Cap>}>`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified<Cap extends PhantomReified<PhantomTypeArgument>>( Cap: Cap ): BorrowActionReified<ToPhantomTypeArgument<Cap>> { return { typeName: BorrowAction.$typeName, fullTypeName: composeSuiType( BorrowAction.$typeName, ...[extractType(Cap)] ) as `${typeof PKG_V1}::access_control::BorrowAction<${PhantomToTypeStr<ToPhantomTypeArgument<Cap>>}>`, typeArgs: [ extractType(Cap) ] as [PhantomToTypeStr<ToPhantomTypeArgument<Cap>>], isPhantom: BorrowAction.$isPhantom, reifiedTypeArgs: [Cap], fromFields: (fields: Record<string, any>) => BorrowAction.fromFields( Cap, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => BorrowAction.fromFieldsWithTypes( Cap, item, ), fromBcs: (data: Uint8Array) => BorrowAction.fromBcs( Cap, data, ), bcs: BorrowAction.bcs, fromJSONField: (field: any) => BorrowAction.fromJSONField( Cap, field, ), fromJSON: (json: Record<string, any>) => BorrowAction.fromJSON( Cap, json, ), fromSuiParsedData: (content: SuiParsedData) => BorrowAction.fromSuiParsedData( Cap, content, ), fromSuiObjectData: (content: SuiObjectData) => BorrowAction.fromSuiObjectData( Cap, content, ), fetch: async (client: SuiClient, id: string) => BorrowAction.fetch( client, Cap, id, ), new: ( fields: BorrowActionFields<ToPhantomTypeArgument<Cap>>, ) => { return new BorrowAction( [extractType(Cap)], fields ) }, kind: "StructClassReified", } }

 static get r() { return BorrowAction.reified }

 static phantom<Cap extends PhantomReified<PhantomTypeArgument>>( Cap: Cap ): PhantomReified<ToTypeStr<BorrowAction<ToPhantomTypeArgument<Cap>>>> { return phantom(BorrowAction.reified( Cap )); } static get p() { return BorrowAction.phantom }

 static get bcs() { return bcs.struct("BorrowAction", {

 dummy_field: bcs.bool()

}) };

 static fromFields<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, fields: Record<string, any> ): BorrowAction<ToPhantomTypeArgument<Cap>> { return BorrowAction.reified( typeArg, ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, item: FieldsWithTypes ): BorrowAction<ToPhantomTypeArgument<Cap>> { if (!isBorrowAction(item.type)) { throw new Error("not a BorrowAction type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return BorrowAction.reified( typeArg, ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, data: Uint8Array ): BorrowAction<ToPhantomTypeArgument<Cap>> { return BorrowAction.fromFields( typeArg, BorrowAction.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, field: any ): BorrowAction<ToPhantomTypeArgument<Cap>> { return BorrowAction.reified( typeArg, ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, json: Record<string, any> ): BorrowAction<ToPhantomTypeArgument<Cap>> { if (json.$typeName !== BorrowAction.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(BorrowAction.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return BorrowAction.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, content: SuiParsedData ): BorrowAction<ToPhantomTypeArgument<Cap>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBorrowAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a BorrowAction object`); } return BorrowAction.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, data: SuiObjectData ): BorrowAction<ToPhantomTypeArgument<Cap>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isBorrowAction(data.bcs.type)) { throw new Error(`object at is not a BorrowAction object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return BorrowAction.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return BorrowAction.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<Cap extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: Cap, id: string ): Promise<BorrowAction<ToPhantomTypeArgument<Cap>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching BorrowAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBorrowAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a BorrowAction object`); }

 return BorrowAction.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== Borrowed =============================== */

export function isBorrowed(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::access_control::Borrowed` + '<'); }

export interface BorrowedFields<Cap extends PhantomTypeArgument> { accountAddr: ToField<"address"> }

export type BorrowedReified<Cap extends PhantomTypeArgument> = Reified< Borrowed<Cap>, BorrowedFields<Cap> >;

export class Borrowed<Cap extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::access_control::Borrowed`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Borrowed.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::access_control::Borrowed<${PhantomToTypeStr<Cap>}>`; readonly $typeArgs: [PhantomToTypeStr<Cap>]; readonly $isPhantom = Borrowed.$isPhantom;

 readonly accountAddr: ToField<"address">

 private constructor(typeArgs: [PhantomToTypeStr<Cap>], fields: BorrowedFields<Cap>, ) { this.$fullTypeName = composeSuiType( Borrowed.$typeName, ...typeArgs ) as `${typeof PKG_V1}::access_control::Borrowed<${PhantomToTypeStr<Cap>}>`; this.$typeArgs = typeArgs;

 this.accountAddr = fields.accountAddr; }

 static reified<Cap extends PhantomReified<PhantomTypeArgument>>( Cap: Cap ): BorrowedReified<ToPhantomTypeArgument<Cap>> { return { typeName: Borrowed.$typeName, fullTypeName: composeSuiType( Borrowed.$typeName, ...[extractType(Cap)] ) as `${typeof PKG_V1}::access_control::Borrowed<${PhantomToTypeStr<ToPhantomTypeArgument<Cap>>}>`, typeArgs: [ extractType(Cap) ] as [PhantomToTypeStr<ToPhantomTypeArgument<Cap>>], isPhantom: Borrowed.$isPhantom, reifiedTypeArgs: [Cap], fromFields: (fields: Record<string, any>) => Borrowed.fromFields( Cap, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Borrowed.fromFieldsWithTypes( Cap, item, ), fromBcs: (data: Uint8Array) => Borrowed.fromBcs( Cap, data, ), bcs: Borrowed.bcs, fromJSONField: (field: any) => Borrowed.fromJSONField( Cap, field, ), fromJSON: (json: Record<string, any>) => Borrowed.fromJSON( Cap, json, ), fromSuiParsedData: (content: SuiParsedData) => Borrowed.fromSuiParsedData( Cap, content, ), fromSuiObjectData: (content: SuiObjectData) => Borrowed.fromSuiObjectData( Cap, content, ), fetch: async (client: SuiClient, id: string) => Borrowed.fetch( client, Cap, id, ), new: ( fields: BorrowedFields<ToPhantomTypeArgument<Cap>>, ) => { return new Borrowed( [extractType(Cap)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Borrowed.reified }

 static phantom<Cap extends PhantomReified<PhantomTypeArgument>>( Cap: Cap ): PhantomReified<ToTypeStr<Borrowed<ToPhantomTypeArgument<Cap>>>> { return phantom(Borrowed.reified( Cap )); } static get p() { return Borrowed.phantom }

 static get bcs() { return bcs.struct("Borrowed", {

 account_addr: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, fields: Record<string, any> ): Borrowed<ToPhantomTypeArgument<Cap>> { return Borrowed.reified( typeArg, ).new( { accountAddr: decodeFromFields("address", fields.account_addr) } ) }

 static fromFieldsWithTypes<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, item: FieldsWithTypes ): Borrowed<ToPhantomTypeArgument<Cap>> { if (!isBorrowed(item.type)) { throw new Error("not a Borrowed type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Borrowed.reified( typeArg, ).new( { accountAddr: decodeFromFieldsWithTypes("address", item.fields.account_addr) } ) }

 static fromBcs<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, data: Uint8Array ): Borrowed<ToPhantomTypeArgument<Cap>> { return Borrowed.fromFields( typeArg, Borrowed.bcs.parse(data) ) }

 toJSONField() { return {

 accountAddr: this.accountAddr,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, field: any ): Borrowed<ToPhantomTypeArgument<Cap>> { return Borrowed.reified( typeArg, ).new( { accountAddr: decodeFromJSONField("address", field.accountAddr) } ) }

 static fromJSON<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, json: Record<string, any> ): Borrowed<ToPhantomTypeArgument<Cap>> { if (json.$typeName !== Borrowed.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Borrowed.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Borrowed.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, content: SuiParsedData ): Borrowed<ToPhantomTypeArgument<Cap>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBorrowed(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Borrowed object`); } return Borrowed.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, data: SuiObjectData ): Borrowed<ToPhantomTypeArgument<Cap>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isBorrowed(data.bcs.type)) { throw new Error(`object at is not a Borrowed object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Borrowed.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Borrowed.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<Cap extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: Cap, id: string ): Promise<Borrowed<ToPhantomTypeArgument<Cap>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Borrowed object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBorrowed(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Borrowed object`); }

 return Borrowed.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== CapKey =============================== */

export function isCapKey(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::access_control::CapKey` + '<'); }

export interface CapKeyFields<Cap extends PhantomTypeArgument> { dummyField: ToField<"bool"> }

export type CapKeyReified<Cap extends PhantomTypeArgument> = Reified< CapKey<Cap>, CapKeyFields<Cap> >;

export class CapKey<Cap extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::access_control::CapKey`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = CapKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::access_control::CapKey<${PhantomToTypeStr<Cap>}>`; readonly $typeArgs: [PhantomToTypeStr<Cap>]; readonly $isPhantom = CapKey.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [PhantomToTypeStr<Cap>], fields: CapKeyFields<Cap>, ) { this.$fullTypeName = composeSuiType( CapKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::access_control::CapKey<${PhantomToTypeStr<Cap>}>`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified<Cap extends PhantomReified<PhantomTypeArgument>>( Cap: Cap ): CapKeyReified<ToPhantomTypeArgument<Cap>> { return { typeName: CapKey.$typeName, fullTypeName: composeSuiType( CapKey.$typeName, ...[extractType(Cap)] ) as `${typeof PKG_V1}::access_control::CapKey<${PhantomToTypeStr<ToPhantomTypeArgument<Cap>>}>`, typeArgs: [ extractType(Cap) ] as [PhantomToTypeStr<ToPhantomTypeArgument<Cap>>], isPhantom: CapKey.$isPhantom, reifiedTypeArgs: [Cap], fromFields: (fields: Record<string, any>) => CapKey.fromFields( Cap, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => CapKey.fromFieldsWithTypes( Cap, item, ), fromBcs: (data: Uint8Array) => CapKey.fromBcs( Cap, data, ), bcs: CapKey.bcs, fromJSONField: (field: any) => CapKey.fromJSONField( Cap, field, ), fromJSON: (json: Record<string, any>) => CapKey.fromJSON( Cap, json, ), fromSuiParsedData: (content: SuiParsedData) => CapKey.fromSuiParsedData( Cap, content, ), fromSuiObjectData: (content: SuiObjectData) => CapKey.fromSuiObjectData( Cap, content, ), fetch: async (client: SuiClient, id: string) => CapKey.fetch( client, Cap, id, ), new: ( fields: CapKeyFields<ToPhantomTypeArgument<Cap>>, ) => { return new CapKey( [extractType(Cap)], fields ) }, kind: "StructClassReified", } }

 static get r() { return CapKey.reified }

 static phantom<Cap extends PhantomReified<PhantomTypeArgument>>( Cap: Cap ): PhantomReified<ToTypeStr<CapKey<ToPhantomTypeArgument<Cap>>>> { return phantom(CapKey.reified( Cap )); } static get p() { return CapKey.phantom }

 static get bcs() { return bcs.struct("CapKey", {

 dummy_field: bcs.bool()

}) };

 static fromFields<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, fields: Record<string, any> ): CapKey<ToPhantomTypeArgument<Cap>> { return CapKey.reified( typeArg, ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, item: FieldsWithTypes ): CapKey<ToPhantomTypeArgument<Cap>> { if (!isCapKey(item.type)) { throw new Error("not a CapKey type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return CapKey.reified( typeArg, ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, data: Uint8Array ): CapKey<ToPhantomTypeArgument<Cap>> { return CapKey.fromFields( typeArg, CapKey.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, field: any ): CapKey<ToPhantomTypeArgument<Cap>> { return CapKey.reified( typeArg, ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, json: Record<string, any> ): CapKey<ToPhantomTypeArgument<Cap>> { if (json.$typeName !== CapKey.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(CapKey.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return CapKey.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, content: SuiParsedData ): CapKey<ToPhantomTypeArgument<Cap>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isCapKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a CapKey object`); } return CapKey.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, data: SuiObjectData ): CapKey<ToPhantomTypeArgument<Cap>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isCapKey(data.bcs.type)) { throw new Error(`object at is not a CapKey object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return CapKey.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return CapKey.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<Cap extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: Cap, id: string ): Promise<CapKey<ToPhantomTypeArgument<Cap>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching CapKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isCapKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a CapKey object`); }

 return CapKey.fromSuiObjectData( typeArg, res.data ); }

 }
