import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
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

/* ============================== LockCommand =============================== */

export function isLockCommand(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::access_control::LockCommand`; }

export interface LockCommandFields { dummyField: ToField<"bool"> }

export type LockCommandReified = Reified< LockCommand, LockCommandFields >;

export class LockCommand implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::access_control::LockCommand`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = LockCommand.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::access_control::LockCommand`; readonly $typeArgs: []; readonly $isPhantom = LockCommand.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: LockCommandFields, ) { this.$fullTypeName = composeSuiType( LockCommand.$typeName, ...typeArgs ) as `${typeof PKG_V1}::access_control::LockCommand`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): LockCommandReified { return { typeName: LockCommand.$typeName, fullTypeName: composeSuiType( LockCommand.$typeName, ...[] ) as `${typeof PKG_V1}::access_control::LockCommand`, typeArgs: [ ] as [], isPhantom: LockCommand.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => LockCommand.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => LockCommand.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => LockCommand.fromBcs( data, ), bcs: LockCommand.bcs, fromJSONField: (field: any) => LockCommand.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => LockCommand.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => LockCommand.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => LockCommand.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => LockCommand.fetch( client, id, ), new: ( fields: LockCommandFields, ) => { return new LockCommand( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return LockCommand.reified() }

 static phantom( ): PhantomReified<ToTypeStr<LockCommand>> { return phantom(LockCommand.reified( )); } static get p() { return LockCommand.phantom() }

 static get bcs() { return bcs.struct("LockCommand", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): LockCommand { return LockCommand.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): LockCommand { if (!isLockCommand(item.type)) { throw new Error("not a LockCommand type");

 }

 return LockCommand.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): LockCommand { return LockCommand.fromFields( LockCommand.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): LockCommand { return LockCommand.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): LockCommand { if (json.$typeName !== LockCommand.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return LockCommand.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): LockCommand { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isLockCommand(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a LockCommand object`); } return LockCommand.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): LockCommand { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isLockCommand(data.bcs.type)) { throw new Error(`object at is not a LockCommand object`); }

 return LockCommand.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return LockCommand.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<LockCommand> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching LockCommand object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isLockCommand(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a LockCommand object`); }

 return LockCommand.fromSuiObjectData( res.data ); }

 }
