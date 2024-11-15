import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeArgument, ToTypeStr, TypeArgument, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom, toBcs} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {PKG_V1} from "../index";
import {BcsType, bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== Borrow =============================== */

export function isBorrow(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::access_control::Borrow` + '<'); }

export interface BorrowFields<Cap extends PhantomTypeArgument> { accountAddr: ToField<"address"> }

export type BorrowReified<Cap extends PhantomTypeArgument> = Reified< Borrow<Cap>, BorrowFields<Cap> >;

export class Borrow<Cap extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::access_control::Borrow`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Borrow.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::access_control::Borrow<${PhantomToTypeStr<Cap>}>`; readonly $typeArgs: [PhantomToTypeStr<Cap>]; readonly $isPhantom = Borrow.$isPhantom;

 readonly accountAddr: ToField<"address">

 private constructor(typeArgs: [PhantomToTypeStr<Cap>], fields: BorrowFields<Cap>, ) { this.$fullTypeName = composeSuiType( Borrow.$typeName, ...typeArgs ) as `${typeof PKG_V1}::access_control::Borrow<${PhantomToTypeStr<Cap>}>`; this.$typeArgs = typeArgs;

 this.accountAddr = fields.accountAddr; }

 static reified<Cap extends PhantomReified<PhantomTypeArgument>>( Cap: Cap ): BorrowReified<ToPhantomTypeArgument<Cap>> { return { typeName: Borrow.$typeName, fullTypeName: composeSuiType( Borrow.$typeName, ...[extractType(Cap)] ) as `${typeof PKG_V1}::access_control::Borrow<${PhantomToTypeStr<ToPhantomTypeArgument<Cap>>}>`, typeArgs: [ extractType(Cap) ] as [PhantomToTypeStr<ToPhantomTypeArgument<Cap>>], isPhantom: Borrow.$isPhantom, reifiedTypeArgs: [Cap], fromFields: (fields: Record<string, any>) => Borrow.fromFields( Cap, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Borrow.fromFieldsWithTypes( Cap, item, ), fromBcs: (data: Uint8Array) => Borrow.fromBcs( Cap, data, ), bcs: Borrow.bcs, fromJSONField: (field: any) => Borrow.fromJSONField( Cap, field, ), fromJSON: (json: Record<string, any>) => Borrow.fromJSON( Cap, json, ), fromSuiParsedData: (content: SuiParsedData) => Borrow.fromSuiParsedData( Cap, content, ), fromSuiObjectData: (content: SuiObjectData) => Borrow.fromSuiObjectData( Cap, content, ), fetch: async (client: SuiClient, id: string) => Borrow.fetch( client, Cap, id, ), new: ( fields: BorrowFields<ToPhantomTypeArgument<Cap>>, ) => { return new Borrow( [extractType(Cap)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Borrow.reified }

 static phantom<Cap extends PhantomReified<PhantomTypeArgument>>( Cap: Cap ): PhantomReified<ToTypeStr<Borrow<ToPhantomTypeArgument<Cap>>>> { return phantom(Borrow.reified( Cap )); } static get p() { return Borrow.phantom }

 static get bcs() { return bcs.struct("Borrow", {

 account_addr: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, fields: Record<string, any> ): Borrow<ToPhantomTypeArgument<Cap>> { return Borrow.reified( typeArg, ).new( { accountAddr: decodeFromFields("address", fields.account_addr) } ) }

 static fromFieldsWithTypes<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, item: FieldsWithTypes ): Borrow<ToPhantomTypeArgument<Cap>> { if (!isBorrow(item.type)) { throw new Error("not a Borrow type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Borrow.reified( typeArg, ).new( { accountAddr: decodeFromFieldsWithTypes("address", item.fields.account_addr) } ) }

 static fromBcs<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, data: Uint8Array ): Borrow<ToPhantomTypeArgument<Cap>> { return Borrow.fromFields( typeArg, Borrow.bcs.parse(data) ) }

 toJSONField() { return {

 accountAddr: this.accountAddr,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, field: any ): Borrow<ToPhantomTypeArgument<Cap>> { return Borrow.reified( typeArg, ).new( { accountAddr: decodeFromJSONField("address", field.accountAddr) } ) }

 static fromJSON<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, json: Record<string, any> ): Borrow<ToPhantomTypeArgument<Cap>> { if (json.$typeName !== Borrow.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Borrow.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Borrow.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, content: SuiParsedData ): Borrow<ToPhantomTypeArgument<Cap>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBorrow(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Borrow object`); } return Borrow.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, data: SuiObjectData ): Borrow<ToPhantomTypeArgument<Cap>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isBorrow(data.bcs.type)) { throw new Error(`object at is not a Borrow object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Borrow.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Borrow.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<Cap extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: Cap, id: string ): Promise<Borrow<ToPhantomTypeArgument<Cap>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Borrow object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBorrow(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Borrow object`); }

 return Borrow.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== AccessAction =============================== */

export function isAccessAction(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::access_control::AccessAction` + '<'); }

export interface AccessActionFields<Cap extends PhantomTypeArgument> { dummyField: ToField<"bool"> }

export type AccessActionReified<Cap extends PhantomTypeArgument> = Reified< AccessAction<Cap>, AccessActionFields<Cap> >;

export class AccessAction<Cap extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::access_control::AccessAction`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = AccessAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::access_control::AccessAction<${PhantomToTypeStr<Cap>}>`; readonly $typeArgs: [PhantomToTypeStr<Cap>]; readonly $isPhantom = AccessAction.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [PhantomToTypeStr<Cap>], fields: AccessActionFields<Cap>, ) { this.$fullTypeName = composeSuiType( AccessAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::access_control::AccessAction<${PhantomToTypeStr<Cap>}>`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified<Cap extends PhantomReified<PhantomTypeArgument>>( Cap: Cap ): AccessActionReified<ToPhantomTypeArgument<Cap>> { return { typeName: AccessAction.$typeName, fullTypeName: composeSuiType( AccessAction.$typeName, ...[extractType(Cap)] ) as `${typeof PKG_V1}::access_control::AccessAction<${PhantomToTypeStr<ToPhantomTypeArgument<Cap>>}>`, typeArgs: [ extractType(Cap) ] as [PhantomToTypeStr<ToPhantomTypeArgument<Cap>>], isPhantom: AccessAction.$isPhantom, reifiedTypeArgs: [Cap], fromFields: (fields: Record<string, any>) => AccessAction.fromFields( Cap, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AccessAction.fromFieldsWithTypes( Cap, item, ), fromBcs: (data: Uint8Array) => AccessAction.fromBcs( Cap, data, ), bcs: AccessAction.bcs, fromJSONField: (field: any) => AccessAction.fromJSONField( Cap, field, ), fromJSON: (json: Record<string, any>) => AccessAction.fromJSON( Cap, json, ), fromSuiParsedData: (content: SuiParsedData) => AccessAction.fromSuiParsedData( Cap, content, ), fromSuiObjectData: (content: SuiObjectData) => AccessAction.fromSuiObjectData( Cap, content, ), fetch: async (client: SuiClient, id: string) => AccessAction.fetch( client, Cap, id, ), new: ( fields: AccessActionFields<ToPhantomTypeArgument<Cap>>, ) => { return new AccessAction( [extractType(Cap)], fields ) }, kind: "StructClassReified", } }

 static get r() { return AccessAction.reified }

 static phantom<Cap extends PhantomReified<PhantomTypeArgument>>( Cap: Cap ): PhantomReified<ToTypeStr<AccessAction<ToPhantomTypeArgument<Cap>>>> { return phantom(AccessAction.reified( Cap )); } static get p() { return AccessAction.phantom }

 static get bcs() { return bcs.struct("AccessAction", {

 dummy_field: bcs.bool()

}) };

 static fromFields<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, fields: Record<string, any> ): AccessAction<ToPhantomTypeArgument<Cap>> { return AccessAction.reified( typeArg, ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, item: FieldsWithTypes ): AccessAction<ToPhantomTypeArgument<Cap>> { if (!isAccessAction(item.type)) { throw new Error("not a AccessAction type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return AccessAction.reified( typeArg, ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, data: Uint8Array ): AccessAction<ToPhantomTypeArgument<Cap>> { return AccessAction.fromFields( typeArg, AccessAction.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, field: any ): AccessAction<ToPhantomTypeArgument<Cap>> { return AccessAction.reified( typeArg, ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, json: Record<string, any> ): AccessAction<ToPhantomTypeArgument<Cap>> { if (json.$typeName !== AccessAction.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(AccessAction.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return AccessAction.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, content: SuiParsedData ): AccessAction<ToPhantomTypeArgument<Cap>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAccessAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a AccessAction object`); } return AccessAction.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, data: SuiObjectData ): AccessAction<ToPhantomTypeArgument<Cap>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isAccessAction(data.bcs.type)) { throw new Error(`object at is not a AccessAction object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return AccessAction.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return AccessAction.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<Cap extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: Cap, id: string ): Promise<AccessAction<ToPhantomTypeArgument<Cap>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching AccessAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAccessAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a AccessAction object`); }

 return AccessAction.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== AccessKey =============================== */

export function isAccessKey(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::access_control::AccessKey` + '<'); }

export interface AccessKeyFields<Cap extends PhantomTypeArgument> { dummyField: ToField<"bool"> }

export type AccessKeyReified<Cap extends PhantomTypeArgument> = Reified< AccessKey<Cap>, AccessKeyFields<Cap> >;

export class AccessKey<Cap extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::access_control::AccessKey`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = AccessKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::access_control::AccessKey<${PhantomToTypeStr<Cap>}>`; readonly $typeArgs: [PhantomToTypeStr<Cap>]; readonly $isPhantom = AccessKey.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [PhantomToTypeStr<Cap>], fields: AccessKeyFields<Cap>, ) { this.$fullTypeName = composeSuiType( AccessKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::access_control::AccessKey<${PhantomToTypeStr<Cap>}>`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified<Cap extends PhantomReified<PhantomTypeArgument>>( Cap: Cap ): AccessKeyReified<ToPhantomTypeArgument<Cap>> { return { typeName: AccessKey.$typeName, fullTypeName: composeSuiType( AccessKey.$typeName, ...[extractType(Cap)] ) as `${typeof PKG_V1}::access_control::AccessKey<${PhantomToTypeStr<ToPhantomTypeArgument<Cap>>}>`, typeArgs: [ extractType(Cap) ] as [PhantomToTypeStr<ToPhantomTypeArgument<Cap>>], isPhantom: AccessKey.$isPhantom, reifiedTypeArgs: [Cap], fromFields: (fields: Record<string, any>) => AccessKey.fromFields( Cap, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AccessKey.fromFieldsWithTypes( Cap, item, ), fromBcs: (data: Uint8Array) => AccessKey.fromBcs( Cap, data, ), bcs: AccessKey.bcs, fromJSONField: (field: any) => AccessKey.fromJSONField( Cap, field, ), fromJSON: (json: Record<string, any>) => AccessKey.fromJSON( Cap, json, ), fromSuiParsedData: (content: SuiParsedData) => AccessKey.fromSuiParsedData( Cap, content, ), fromSuiObjectData: (content: SuiObjectData) => AccessKey.fromSuiObjectData( Cap, content, ), fetch: async (client: SuiClient, id: string) => AccessKey.fetch( client, Cap, id, ), new: ( fields: AccessKeyFields<ToPhantomTypeArgument<Cap>>, ) => { return new AccessKey( [extractType(Cap)], fields ) }, kind: "StructClassReified", } }

 static get r() { return AccessKey.reified }

 static phantom<Cap extends PhantomReified<PhantomTypeArgument>>( Cap: Cap ): PhantomReified<ToTypeStr<AccessKey<ToPhantomTypeArgument<Cap>>>> { return phantom(AccessKey.reified( Cap )); } static get p() { return AccessKey.phantom }

 static get bcs() { return bcs.struct("AccessKey", {

 dummy_field: bcs.bool()

}) };

 static fromFields<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, fields: Record<string, any> ): AccessKey<ToPhantomTypeArgument<Cap>> { return AccessKey.reified( typeArg, ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, item: FieldsWithTypes ): AccessKey<ToPhantomTypeArgument<Cap>> { if (!isAccessKey(item.type)) { throw new Error("not a AccessKey type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return AccessKey.reified( typeArg, ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, data: Uint8Array ): AccessKey<ToPhantomTypeArgument<Cap>> { return AccessKey.fromFields( typeArg, AccessKey.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, field: any ): AccessKey<ToPhantomTypeArgument<Cap>> { return AccessKey.reified( typeArg, ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, json: Record<string, any> ): AccessKey<ToPhantomTypeArgument<Cap>> { if (json.$typeName !== AccessKey.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(AccessKey.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return AccessKey.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, content: SuiParsedData ): AccessKey<ToPhantomTypeArgument<Cap>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAccessKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a AccessKey object`); } return AccessKey.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<Cap extends PhantomReified<PhantomTypeArgument>>( typeArg: Cap, data: SuiObjectData ): AccessKey<ToPhantomTypeArgument<Cap>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isAccessKey(data.bcs.type)) { throw new Error(`object at is not a AccessKey object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return AccessKey.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return AccessKey.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<Cap extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: Cap, id: string ): Promise<AccessKey<ToPhantomTypeArgument<Cap>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching AccessKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAccessKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a AccessKey object`); }

 return AccessKey.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== AccessLock =============================== */

export function isAccessLock(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::access_control::AccessLock` + '<'); }

export interface AccessLockFields<Cap extends TypeArgument> { cap: ToField<Cap> }

export type AccessLockReified<Cap extends TypeArgument> = Reified< AccessLock<Cap>, AccessLockFields<Cap> >;

export class AccessLock<Cap extends TypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::access_control::AccessLock`; static readonly $numTypeParams = 1; static readonly $isPhantom = [false,] as const;

 readonly $typeName = AccessLock.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::access_control::AccessLock<${ToTypeStr<Cap>}>`; readonly $typeArgs: [ToTypeStr<Cap>]; readonly $isPhantom = AccessLock.$isPhantom;

 readonly cap: ToField<Cap>

 private constructor(typeArgs: [ToTypeStr<Cap>], fields: AccessLockFields<Cap>, ) { this.$fullTypeName = composeSuiType( AccessLock.$typeName, ...typeArgs ) as `${typeof PKG_V1}::access_control::AccessLock<${ToTypeStr<Cap>}>`; this.$typeArgs = typeArgs;

 this.cap = fields.cap; }

 static reified<Cap extends Reified<TypeArgument, any>>( Cap: Cap ): AccessLockReified<ToTypeArgument<Cap>> { return { typeName: AccessLock.$typeName, fullTypeName: composeSuiType( AccessLock.$typeName, ...[extractType(Cap)] ) as `${typeof PKG_V1}::access_control::AccessLock<${ToTypeStr<ToTypeArgument<Cap>>}>`, typeArgs: [ extractType(Cap) ] as [ToTypeStr<ToTypeArgument<Cap>>], isPhantom: AccessLock.$isPhantom, reifiedTypeArgs: [Cap], fromFields: (fields: Record<string, any>) => AccessLock.fromFields( Cap, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AccessLock.fromFieldsWithTypes( Cap, item, ), fromBcs: (data: Uint8Array) => AccessLock.fromBcs( Cap, data, ), bcs: AccessLock.bcs(toBcs(Cap)), fromJSONField: (field: any) => AccessLock.fromJSONField( Cap, field, ), fromJSON: (json: Record<string, any>) => AccessLock.fromJSON( Cap, json, ), fromSuiParsedData: (content: SuiParsedData) => AccessLock.fromSuiParsedData( Cap, content, ), fromSuiObjectData: (content: SuiObjectData) => AccessLock.fromSuiObjectData( Cap, content, ), fetch: async (client: SuiClient, id: string) => AccessLock.fetch( client, Cap, id, ), new: ( fields: AccessLockFields<ToTypeArgument<Cap>>, ) => { return new AccessLock( [extractType(Cap)], fields ) }, kind: "StructClassReified", } }

 static get r() { return AccessLock.reified }

 static phantom<Cap extends Reified<TypeArgument, any>>( Cap: Cap ): PhantomReified<ToTypeStr<AccessLock<ToTypeArgument<Cap>>>> { return phantom(AccessLock.reified( Cap )); } static get p() { return AccessLock.phantom }

 static get bcs() { return <Cap extends BcsType<any>>(Cap: Cap) => bcs.struct(`AccessLock<${Cap.name}>`, {

 cap: Cap

}) };

 static fromFields<Cap extends Reified<TypeArgument, any>>( typeArg: Cap, fields: Record<string, any> ): AccessLock<ToTypeArgument<Cap>> { return AccessLock.reified( typeArg, ).new( { cap: decodeFromFields(typeArg, fields.cap) } ) }

 static fromFieldsWithTypes<Cap extends Reified<TypeArgument, any>>( typeArg: Cap, item: FieldsWithTypes ): AccessLock<ToTypeArgument<Cap>> { if (!isAccessLock(item.type)) { throw new Error("not a AccessLock type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return AccessLock.reified( typeArg, ).new( { cap: decodeFromFieldsWithTypes(typeArg, item.fields.cap) } ) }

 static fromBcs<Cap extends Reified<TypeArgument, any>>( typeArg: Cap, data: Uint8Array ): AccessLock<ToTypeArgument<Cap>> { const typeArgs = [typeArg];

 return AccessLock.fromFields( typeArg, AccessLock.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 cap: fieldToJSON<Cap>(this.$typeArgs[0], this.cap),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<Cap extends Reified<TypeArgument, any>>( typeArg: Cap, field: any ): AccessLock<ToTypeArgument<Cap>> { return AccessLock.reified( typeArg, ).new( { cap: decodeFromJSONField(typeArg, field.cap) } ) }

 static fromJSON<Cap extends Reified<TypeArgument, any>>( typeArg: Cap, json: Record<string, any> ): AccessLock<ToTypeArgument<Cap>> { if (json.$typeName !== AccessLock.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(AccessLock.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return AccessLock.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<Cap extends Reified<TypeArgument, any>>( typeArg: Cap, content: SuiParsedData ): AccessLock<ToTypeArgument<Cap>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAccessLock(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a AccessLock object`); } return AccessLock.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<Cap extends Reified<TypeArgument, any>>( typeArg: Cap, data: SuiObjectData ): AccessLock<ToTypeArgument<Cap>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isAccessLock(data.bcs.type)) { throw new Error(`object at is not a AccessLock object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return AccessLock.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return AccessLock.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<Cap extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: Cap, id: string ): Promise<AccessLock<ToTypeArgument<Cap>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching AccessLock object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAccessLock(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a AccessLock object`); }

 return AccessLock.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== AccessProposal =============================== */

export function isAccessProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::access_control::AccessProposal`; }

export interface AccessProposalFields { dummyField: ToField<"bool"> }

export type AccessProposalReified = Reified< AccessProposal, AccessProposalFields >;

export class AccessProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::access_control::AccessProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = AccessProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::access_control::AccessProposal`; readonly $typeArgs: []; readonly $isPhantom = AccessProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: AccessProposalFields, ) { this.$fullTypeName = composeSuiType( AccessProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::access_control::AccessProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): AccessProposalReified { return { typeName: AccessProposal.$typeName, fullTypeName: composeSuiType( AccessProposal.$typeName, ...[] ) as `${typeof PKG_V1}::access_control::AccessProposal`, typeArgs: [ ] as [], isPhantom: AccessProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => AccessProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AccessProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => AccessProposal.fromBcs( data, ), bcs: AccessProposal.bcs, fromJSONField: (field: any) => AccessProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => AccessProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => AccessProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => AccessProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => AccessProposal.fetch( client, id, ), new: ( fields: AccessProposalFields, ) => { return new AccessProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return AccessProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<AccessProposal>> { return phantom(AccessProposal.reified( )); } static get p() { return AccessProposal.phantom() }

 static get bcs() { return bcs.struct("AccessProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): AccessProposal { return AccessProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): AccessProposal { if (!isAccessProposal(item.type)) { throw new Error("not a AccessProposal type");

 }

 return AccessProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): AccessProposal { return AccessProposal.fromFields( AccessProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): AccessProposal { return AccessProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): AccessProposal { if (json.$typeName !== AccessProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return AccessProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): AccessProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAccessProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a AccessProposal object`); } return AccessProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): AccessProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isAccessProposal(data.bcs.type)) { throw new Error(`object at is not a AccessProposal object`); }

 return AccessProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return AccessProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<AccessProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching AccessProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAccessProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a AccessProposal object`); }

 return AccessProposal.fromSuiObjectData( res.data ); }

 }
