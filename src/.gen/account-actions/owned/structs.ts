import {ID} from "../../_dependencies/source/0x2/object/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== PayProposal =============================== */

export function isPayProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::owned::PayProposal`; }

export interface PayProposalFields { dummyField: ToField<"bool"> }

export type PayProposalReified = Reified< PayProposal, PayProposalFields >;

export class PayProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::owned::PayProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = PayProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::owned::PayProposal`; readonly $typeArgs: []; readonly $isPhantom = PayProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: PayProposalFields, ) { this.$fullTypeName = composeSuiType( PayProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::owned::PayProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): PayProposalReified { return { typeName: PayProposal.$typeName, fullTypeName: composeSuiType( PayProposal.$typeName, ...[] ) as `${typeof PKG_V1}::owned::PayProposal`, typeArgs: [ ] as [], isPhantom: PayProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => PayProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => PayProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => PayProposal.fromBcs( data, ), bcs: PayProposal.bcs, fromJSONField: (field: any) => PayProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => PayProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => PayProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => PayProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => PayProposal.fetch( client, id, ), new: ( fields: PayProposalFields, ) => { return new PayProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return PayProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<PayProposal>> { return phantom(PayProposal.reified( )); } static get p() { return PayProposal.phantom() }

 static get bcs() { return bcs.struct("PayProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): PayProposal { return PayProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): PayProposal { if (!isPayProposal(item.type)) { throw new Error("not a PayProposal type");

 }

 return PayProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): PayProposal { return PayProposal.fromFields( PayProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): PayProposal { return PayProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): PayProposal { if (json.$typeName !== PayProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return PayProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): PayProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isPayProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a PayProposal object`); } return PayProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): PayProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isPayProposal(data.bcs.type)) { throw new Error(`object at is not a PayProposal object`); }

 return PayProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return PayProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<PayProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching PayProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPayProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a PayProposal object`); }

 return PayProposal.fromSuiObjectData( res.data ); }

 }

/* ============================== TransferProposal =============================== */

export function isTransferProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::owned::TransferProposal`; }

export interface TransferProposalFields { dummyField: ToField<"bool"> }

export type TransferProposalReified = Reified< TransferProposal, TransferProposalFields >;

export class TransferProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::owned::TransferProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = TransferProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::owned::TransferProposal`; readonly $typeArgs: []; readonly $isPhantom = TransferProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: TransferProposalFields, ) { this.$fullTypeName = composeSuiType( TransferProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::owned::TransferProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): TransferProposalReified { return { typeName: TransferProposal.$typeName, fullTypeName: composeSuiType( TransferProposal.$typeName, ...[] ) as `${typeof PKG_V1}::owned::TransferProposal`, typeArgs: [ ] as [], isPhantom: TransferProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => TransferProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TransferProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => TransferProposal.fromBcs( data, ), bcs: TransferProposal.bcs, fromJSONField: (field: any) => TransferProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => TransferProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => TransferProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => TransferProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => TransferProposal.fetch( client, id, ), new: ( fields: TransferProposalFields, ) => { return new TransferProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return TransferProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<TransferProposal>> { return phantom(TransferProposal.reified( )); } static get p() { return TransferProposal.phantom() }

 static get bcs() { return bcs.struct("TransferProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): TransferProposal { return TransferProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): TransferProposal { if (!isTransferProposal(item.type)) { throw new Error("not a TransferProposal type");

 }

 return TransferProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): TransferProposal { return TransferProposal.fromFields( TransferProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): TransferProposal { return TransferProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): TransferProposal { if (json.$typeName !== TransferProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return TransferProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): TransferProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTransferProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TransferProposal object`); } return TransferProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): TransferProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTransferProposal(data.bcs.type)) { throw new Error(`object at is not a TransferProposal object`); }

 return TransferProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return TransferProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<TransferProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TransferProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTransferProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TransferProposal object`); }

 return TransferProposal.fromSuiObjectData( res.data ); }

 }

/* ============================== WithdrawAction =============================== */

export function isWithdrawAction(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::owned::WithdrawAction`; }

export interface WithdrawActionFields { objectId: ToField<ID> }

export type WithdrawActionReified = Reified< WithdrawAction, WithdrawActionFields >;

export class WithdrawAction implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::owned::WithdrawAction`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = WithdrawAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::owned::WithdrawAction`; readonly $typeArgs: []; readonly $isPhantom = WithdrawAction.$isPhantom;

 readonly objectId: ToField<ID>

 private constructor(typeArgs: [], fields: WithdrawActionFields, ) { this.$fullTypeName = composeSuiType( WithdrawAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::owned::WithdrawAction`; this.$typeArgs = typeArgs;

 this.objectId = fields.objectId; }

 static reified( ): WithdrawActionReified { return { typeName: WithdrawAction.$typeName, fullTypeName: composeSuiType( WithdrawAction.$typeName, ...[] ) as `${typeof PKG_V1}::owned::WithdrawAction`, typeArgs: [ ] as [], isPhantom: WithdrawAction.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => WithdrawAction.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => WithdrawAction.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => WithdrawAction.fromBcs( data, ), bcs: WithdrawAction.bcs, fromJSONField: (field: any) => WithdrawAction.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => WithdrawAction.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => WithdrawAction.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => WithdrawAction.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => WithdrawAction.fetch( client, id, ), new: ( fields: WithdrawActionFields, ) => { return new WithdrawAction( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return WithdrawAction.reified() }

 static phantom( ): PhantomReified<ToTypeStr<WithdrawAction>> { return phantom(WithdrawAction.reified( )); } static get p() { return WithdrawAction.phantom() }

 static get bcs() { return bcs.struct("WithdrawAction", {

 object_id: ID.bcs

}) };

 static fromFields( fields: Record<string, any> ): WithdrawAction { return WithdrawAction.reified( ).new( { objectId: decodeFromFields(ID.reified(), fields.object_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): WithdrawAction { if (!isWithdrawAction(item.type)) { throw new Error("not a WithdrawAction type");

 }

 return WithdrawAction.reified( ).new( { objectId: decodeFromFieldsWithTypes(ID.reified(), item.fields.object_id) } ) }

 static fromBcs( data: Uint8Array ): WithdrawAction { return WithdrawAction.fromFields( WithdrawAction.bcs.parse(data) ) }

 toJSONField() { return {

 objectId: this.objectId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): WithdrawAction { return WithdrawAction.reified( ).new( { objectId: decodeFromJSONField(ID.reified(), field.objectId) } ) }

 static fromJSON( json: Record<string, any> ): WithdrawAction { if (json.$typeName !== WithdrawAction.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return WithdrawAction.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): WithdrawAction { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWithdrawAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a WithdrawAction object`); } return WithdrawAction.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): WithdrawAction { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isWithdrawAction(data.bcs.type)) { throw new Error(`object at is not a WithdrawAction object`); }

 return WithdrawAction.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return WithdrawAction.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<WithdrawAction> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching WithdrawAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWithdrawAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a WithdrawAction object`); }

 return WithdrawAction.fromSuiObjectData( res.data ); }

 }
