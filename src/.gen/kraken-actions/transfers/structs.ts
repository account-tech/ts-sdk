import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== TransferAction =============================== */

export function isTransferAction(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::transfers::TransferAction`; }

export interface TransferActionFields { recipient: ToField<"address"> }

export type TransferActionReified = Reified< TransferAction, TransferActionFields >;

export class TransferAction implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::transfers::TransferAction`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = TransferAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::transfers::TransferAction`; readonly $typeArgs: []; readonly $isPhantom = TransferAction.$isPhantom;

 readonly recipient: ToField<"address">

 private constructor(typeArgs: [], fields: TransferActionFields, ) { this.$fullTypeName = composeSuiType( TransferAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transfers::TransferAction`; this.$typeArgs = typeArgs;

 this.recipient = fields.recipient; }

 static reified( ): TransferActionReified { return { typeName: TransferAction.$typeName, fullTypeName: composeSuiType( TransferAction.$typeName, ...[] ) as `${typeof PKG_V1}::transfers::TransferAction`, typeArgs: [ ] as [], isPhantom: TransferAction.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => TransferAction.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TransferAction.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => TransferAction.fromBcs( data, ), bcs: TransferAction.bcs, fromJSONField: (field: any) => TransferAction.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => TransferAction.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => TransferAction.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => TransferAction.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => TransferAction.fetch( client, id, ), new: ( fields: TransferActionFields, ) => { return new TransferAction( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return TransferAction.reified() }

 static phantom( ): PhantomReified<ToTypeStr<TransferAction>> { return phantom(TransferAction.reified( )); } static get p() { return TransferAction.phantom() }

 static get bcs() { return bcs.struct("TransferAction", {

 recipient: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields( fields: Record<string, any> ): TransferAction { return TransferAction.reified( ).new( { recipient: decodeFromFields("address", fields.recipient) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): TransferAction { if (!isTransferAction(item.type)) { throw new Error("not a TransferAction type");

 }

 return TransferAction.reified( ).new( { recipient: decodeFromFieldsWithTypes("address", item.fields.recipient) } ) }

 static fromBcs( data: Uint8Array ): TransferAction { return TransferAction.fromFields( TransferAction.bcs.parse(data) ) }

 toJSONField() { return {

 recipient: this.recipient,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): TransferAction { return TransferAction.reified( ).new( { recipient: decodeFromJSONField("address", field.recipient) } ) }

 static fromJSON( json: Record<string, any> ): TransferAction { if (json.$typeName !== TransferAction.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return TransferAction.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): TransferAction { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTransferAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TransferAction object`); } return TransferAction.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): TransferAction { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTransferAction(data.bcs.type)) { throw new Error(`object at is not a TransferAction object`); }

 return TransferAction.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return TransferAction.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<TransferAction> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TransferAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTransferAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TransferAction object`); }

 return TransferAction.fromSuiObjectData( res.data ); }

 }

/* ============================== TransferCoinProposal =============================== */

export function isTransferCoinProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::transfers::TransferCoinProposal`; }

export interface TransferCoinProposalFields { dummyField: ToField<"bool"> }

export type TransferCoinProposalReified = Reified< TransferCoinProposal, TransferCoinProposalFields >;

export class TransferCoinProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::transfers::TransferCoinProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = TransferCoinProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::transfers::TransferCoinProposal`; readonly $typeArgs: []; readonly $isPhantom = TransferCoinProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: TransferCoinProposalFields, ) { this.$fullTypeName = composeSuiType( TransferCoinProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transfers::TransferCoinProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): TransferCoinProposalReified { return { typeName: TransferCoinProposal.$typeName, fullTypeName: composeSuiType( TransferCoinProposal.$typeName, ...[] ) as `${typeof PKG_V1}::transfers::TransferCoinProposal`, typeArgs: [ ] as [], isPhantom: TransferCoinProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => TransferCoinProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TransferCoinProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => TransferCoinProposal.fromBcs( data, ), bcs: TransferCoinProposal.bcs, fromJSONField: (field: any) => TransferCoinProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => TransferCoinProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => TransferCoinProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => TransferCoinProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => TransferCoinProposal.fetch( client, id, ), new: ( fields: TransferCoinProposalFields, ) => { return new TransferCoinProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return TransferCoinProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<TransferCoinProposal>> { return phantom(TransferCoinProposal.reified( )); } static get p() { return TransferCoinProposal.phantom() }

 static get bcs() { return bcs.struct("TransferCoinProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): TransferCoinProposal { return TransferCoinProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): TransferCoinProposal { if (!isTransferCoinProposal(item.type)) { throw new Error("not a TransferCoinProposal type");

 }

 return TransferCoinProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): TransferCoinProposal { return TransferCoinProposal.fromFields( TransferCoinProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): TransferCoinProposal { return TransferCoinProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): TransferCoinProposal { if (json.$typeName !== TransferCoinProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return TransferCoinProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): TransferCoinProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTransferCoinProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TransferCoinProposal object`); } return TransferCoinProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): TransferCoinProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTransferCoinProposal(data.bcs.type)) { throw new Error(`object at is not a TransferCoinProposal object`); }

 return TransferCoinProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return TransferCoinProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<TransferCoinProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TransferCoinProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTransferCoinProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TransferCoinProposal object`); }

 return TransferCoinProposal.fromSuiObjectData( res.data ); }

 }

/* ============================== TransferObjectsProposal =============================== */

export function isTransferObjectsProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::transfers::TransferObjectsProposal`; }

export interface TransferObjectsProposalFields { dummyField: ToField<"bool"> }

export type TransferObjectsProposalReified = Reified< TransferObjectsProposal, TransferObjectsProposalFields >;

export class TransferObjectsProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::transfers::TransferObjectsProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = TransferObjectsProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::transfers::TransferObjectsProposal`; readonly $typeArgs: []; readonly $isPhantom = TransferObjectsProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: TransferObjectsProposalFields, ) { this.$fullTypeName = composeSuiType( TransferObjectsProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transfers::TransferObjectsProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): TransferObjectsProposalReified { return { typeName: TransferObjectsProposal.$typeName, fullTypeName: composeSuiType( TransferObjectsProposal.$typeName, ...[] ) as `${typeof PKG_V1}::transfers::TransferObjectsProposal`, typeArgs: [ ] as [], isPhantom: TransferObjectsProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => TransferObjectsProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TransferObjectsProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => TransferObjectsProposal.fromBcs( data, ), bcs: TransferObjectsProposal.bcs, fromJSONField: (field: any) => TransferObjectsProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => TransferObjectsProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => TransferObjectsProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => TransferObjectsProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => TransferObjectsProposal.fetch( client, id, ), new: ( fields: TransferObjectsProposalFields, ) => { return new TransferObjectsProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return TransferObjectsProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<TransferObjectsProposal>> { return phantom(TransferObjectsProposal.reified( )); } static get p() { return TransferObjectsProposal.phantom() }

 static get bcs() { return bcs.struct("TransferObjectsProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): TransferObjectsProposal { return TransferObjectsProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): TransferObjectsProposal { if (!isTransferObjectsProposal(item.type)) { throw new Error("not a TransferObjectsProposal type");

 }

 return TransferObjectsProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): TransferObjectsProposal { return TransferObjectsProposal.fromFields( TransferObjectsProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): TransferObjectsProposal { return TransferObjectsProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): TransferObjectsProposal { if (json.$typeName !== TransferObjectsProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return TransferObjectsProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): TransferObjectsProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTransferObjectsProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TransferObjectsProposal object`); } return TransferObjectsProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): TransferObjectsProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTransferObjectsProposal(data.bcs.type)) { throw new Error(`object at is not a TransferObjectsProposal object`); }

 return TransferObjectsProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return TransferObjectsProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<TransferObjectsProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TransferObjectsProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTransferObjectsProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TransferObjectsProposal object`); }

 return TransferObjectsProposal.fromSuiObjectData( res.data ); }

 }
