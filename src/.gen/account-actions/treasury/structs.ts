import {String} from "../../_dependencies/source/0x1/string/structs";
import {Bag} from "../../_dependencies/source/0x2/bag/structs";
import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== PayProposal =============================== */

export function isPayProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::treasury::PayProposal`; }

export interface PayProposalFields { dummyField: ToField<"bool"> }

export type PayProposalReified = Reified< PayProposal, PayProposalFields >;

export class PayProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::PayProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = PayProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::PayProposal`; readonly $typeArgs: []; readonly $isPhantom = PayProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: PayProposalFields, ) { this.$fullTypeName = composeSuiType( PayProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::PayProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): PayProposalReified { return { typeName: PayProposal.$typeName, fullTypeName: composeSuiType( PayProposal.$typeName, ...[] ) as `${typeof PKG_V1}::treasury::PayProposal`, typeArgs: [ ] as [], isPhantom: PayProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => PayProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => PayProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => PayProposal.fromBcs( data, ), bcs: PayProposal.bcs, fromJSONField: (field: any) => PayProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => PayProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => PayProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => PayProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => PayProposal.fetch( client, id, ), new: ( fields: PayProposalFields, ) => { return new PayProposal( [], fields ) }, kind: "StructClassReified", } }

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

export function isTransferProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::treasury::TransferProposal`; }

export interface TransferProposalFields { dummyField: ToField<"bool"> }

export type TransferProposalReified = Reified< TransferProposal, TransferProposalFields >;

export class TransferProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::TransferProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = TransferProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::TransferProposal`; readonly $typeArgs: []; readonly $isPhantom = TransferProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: TransferProposalFields, ) { this.$fullTypeName = composeSuiType( TransferProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::TransferProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): TransferProposalReified { return { typeName: TransferProposal.$typeName, fullTypeName: composeSuiType( TransferProposal.$typeName, ...[] ) as `${typeof PKG_V1}::treasury::TransferProposal`, typeArgs: [ ] as [], isPhantom: TransferProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => TransferProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TransferProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => TransferProposal.fromBcs( data, ), bcs: TransferProposal.bcs, fromJSONField: (field: any) => TransferProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => TransferProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => TransferProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => TransferProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => TransferProposal.fetch( client, id, ), new: ( fields: TransferProposalFields, ) => { return new TransferProposal( [], fields ) }, kind: "StructClassReified", } }

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

/* ============================== DepositCommand =============================== */

export function isDepositCommand(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::treasury::DepositCommand`; }

export interface DepositCommandFields { dummyField: ToField<"bool"> }

export type DepositCommandReified = Reified< DepositCommand, DepositCommandFields >;

export class DepositCommand implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::DepositCommand`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = DepositCommand.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::DepositCommand`; readonly $typeArgs: []; readonly $isPhantom = DepositCommand.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: DepositCommandFields, ) { this.$fullTypeName = composeSuiType( DepositCommand.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::DepositCommand`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): DepositCommandReified { return { typeName: DepositCommand.$typeName, fullTypeName: composeSuiType( DepositCommand.$typeName, ...[] ) as `${typeof PKG_V1}::treasury::DepositCommand`, typeArgs: [ ] as [], isPhantom: DepositCommand.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => DepositCommand.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => DepositCommand.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => DepositCommand.fromBcs( data, ), bcs: DepositCommand.bcs, fromJSONField: (field: any) => DepositCommand.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => DepositCommand.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => DepositCommand.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => DepositCommand.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => DepositCommand.fetch( client, id, ), new: ( fields: DepositCommandFields, ) => { return new DepositCommand( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return DepositCommand.reified() }

 static phantom( ): PhantomReified<ToTypeStr<DepositCommand>> { return phantom(DepositCommand.reified( )); } static get p() { return DepositCommand.phantom() }

 static get bcs() { return bcs.struct("DepositCommand", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): DepositCommand { return DepositCommand.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): DepositCommand { if (!isDepositCommand(item.type)) { throw new Error("not a DepositCommand type");

 }

 return DepositCommand.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): DepositCommand { return DepositCommand.fromFields( DepositCommand.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): DepositCommand { return DepositCommand.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): DepositCommand { if (json.$typeName !== DepositCommand.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return DepositCommand.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): DepositCommand { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isDepositCommand(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a DepositCommand object`); } return DepositCommand.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): DepositCommand { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isDepositCommand(data.bcs.type)) { throw new Error(`object at is not a DepositCommand object`); }

 return DepositCommand.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return DepositCommand.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<DepositCommand> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching DepositCommand object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isDepositCommand(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a DepositCommand object`); }

 return DepositCommand.fromSuiObjectData( res.data ); }

 }

/* ============================== SpendAction =============================== */

export function isSpendAction(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::SpendAction` + '<'); }

export interface SpendActionFields<CoinType extends PhantomTypeArgument> { amount: ToField<"u64"> }

export type SpendActionReified<CoinType extends PhantomTypeArgument> = Reified< SpendAction<CoinType>, SpendActionFields<CoinType> >;

export class SpendAction<CoinType extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::SpendAction`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = SpendAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::SpendAction<${PhantomToTypeStr<CoinType>}>`; readonly $typeArgs: [PhantomToTypeStr<CoinType>]; readonly $isPhantom = SpendAction.$isPhantom;

 readonly amount: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<CoinType>], fields: SpendActionFields<CoinType>, ) { this.$fullTypeName = composeSuiType( SpendAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::SpendAction<${PhantomToTypeStr<CoinType>}>`; this.$typeArgs = typeArgs;

 this.amount = fields.amount; }

 static reified<CoinType extends PhantomReified<PhantomTypeArgument>>( CoinType: CoinType ): SpendActionReified<ToPhantomTypeArgument<CoinType>> { return { typeName: SpendAction.$typeName, fullTypeName: composeSuiType( SpendAction.$typeName, ...[extractType(CoinType)] ) as `${typeof PKG_V1}::treasury::SpendAction<${PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>}>`, typeArgs: [ extractType(CoinType) ] as [PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>], isPhantom: SpendAction.$isPhantom, reifiedTypeArgs: [CoinType], fromFields: (fields: Record<string, any>) => SpendAction.fromFields( CoinType, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => SpendAction.fromFieldsWithTypes( CoinType, item, ), fromBcs: (data: Uint8Array) => SpendAction.fromBcs( CoinType, data, ), bcs: SpendAction.bcs, fromJSONField: (field: any) => SpendAction.fromJSONField( CoinType, field, ), fromJSON: (json: Record<string, any>) => SpendAction.fromJSON( CoinType, json, ), fromSuiParsedData: (content: SuiParsedData) => SpendAction.fromSuiParsedData( CoinType, content, ), fromSuiObjectData: (content: SuiObjectData) => SpendAction.fromSuiObjectData( CoinType, content, ), fetch: async (client: SuiClient, id: string) => SpendAction.fetch( client, CoinType, id, ), new: ( fields: SpendActionFields<ToPhantomTypeArgument<CoinType>>, ) => { return new SpendAction( [extractType(CoinType)], fields ) }, kind: "StructClassReified", } }

 static get r() { return SpendAction.reified }

 static phantom<CoinType extends PhantomReified<PhantomTypeArgument>>( CoinType: CoinType ): PhantomReified<ToTypeStr<SpendAction<ToPhantomTypeArgument<CoinType>>>> { return phantom(SpendAction.reified( CoinType )); } static get p() { return SpendAction.phantom }

 static get bcs() { return bcs.struct("SpendAction", {

 amount: bcs.u64()

}) };

 static fromFields<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, fields: Record<string, any> ): SpendAction<ToPhantomTypeArgument<CoinType>> { return SpendAction.reified( typeArg, ).new( { amount: decodeFromFields("u64", fields.amount) } ) }

 static fromFieldsWithTypes<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, item: FieldsWithTypes ): SpendAction<ToPhantomTypeArgument<CoinType>> { if (!isSpendAction(item.type)) { throw new Error("not a SpendAction type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return SpendAction.reified( typeArg, ).new( { amount: decodeFromFieldsWithTypes("u64", item.fields.amount) } ) }

 static fromBcs<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, data: Uint8Array ): SpendAction<ToPhantomTypeArgument<CoinType>> { return SpendAction.fromFields( typeArg, SpendAction.bcs.parse(data) ) }

 toJSONField() { return {

 amount: this.amount.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, field: any ): SpendAction<ToPhantomTypeArgument<CoinType>> { return SpendAction.reified( typeArg, ).new( { amount: decodeFromJSONField("u64", field.amount) } ) }

 static fromJSON<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, json: Record<string, any> ): SpendAction<ToPhantomTypeArgument<CoinType>> { if (json.$typeName !== SpendAction.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(SpendAction.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return SpendAction.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, content: SuiParsedData ): SpendAction<ToPhantomTypeArgument<CoinType>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isSpendAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a SpendAction object`); } return SpendAction.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<CoinType extends PhantomReified<PhantomTypeArgument>>( typeArg: CoinType, data: SuiObjectData ): SpendAction<ToPhantomTypeArgument<CoinType>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isSpendAction(data.bcs.type)) { throw new Error(`object at is not a SpendAction object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return SpendAction.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return SpendAction.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<CoinType extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: CoinType, id: string ): Promise<SpendAction<ToPhantomTypeArgument<CoinType>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching SpendAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isSpendAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a SpendAction object`); }

 return SpendAction.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== Treasury =============================== */

export function isTreasury(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::treasury::Treasury`; }

export interface TreasuryFields { bag: ToField<Bag> }

export type TreasuryReified = Reified< Treasury, TreasuryFields >;

export class Treasury implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::Treasury`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Treasury.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::Treasury`; readonly $typeArgs: []; readonly $isPhantom = Treasury.$isPhantom;

 readonly bag: ToField<Bag>

 private constructor(typeArgs: [], fields: TreasuryFields, ) { this.$fullTypeName = composeSuiType( Treasury.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::Treasury`; this.$typeArgs = typeArgs;

 this.bag = fields.bag; }

 static reified( ): TreasuryReified { return { typeName: Treasury.$typeName, fullTypeName: composeSuiType( Treasury.$typeName, ...[] ) as `${typeof PKG_V1}::treasury::Treasury`, typeArgs: [ ] as [], isPhantom: Treasury.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Treasury.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Treasury.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Treasury.fromBcs( data, ), bcs: Treasury.bcs, fromJSONField: (field: any) => Treasury.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Treasury.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Treasury.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Treasury.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Treasury.fetch( client, id, ), new: ( fields: TreasuryFields, ) => { return new Treasury( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Treasury.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Treasury>> { return phantom(Treasury.reified( )); } static get p() { return Treasury.phantom() }

 static get bcs() { return bcs.struct("Treasury", {

 bag: Bag.bcs

}) };

 static fromFields( fields: Record<string, any> ): Treasury { return Treasury.reified( ).new( { bag: decodeFromFields(Bag.reified(), fields.bag) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Treasury { if (!isTreasury(item.type)) { throw new Error("not a Treasury type");

 }

 return Treasury.reified( ).new( { bag: decodeFromFieldsWithTypes(Bag.reified(), item.fields.bag) } ) }

 static fromBcs( data: Uint8Array ): Treasury { return Treasury.fromFields( Treasury.bcs.parse(data) ) }

 toJSONField() { return {

 bag: this.bag.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Treasury { return Treasury.reified( ).new( { bag: decodeFromJSONField(Bag.reified(), field.bag) } ) }

 static fromJSON( json: Record<string, any> ): Treasury { if (json.$typeName !== Treasury.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Treasury.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Treasury { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTreasury(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Treasury object`); } return Treasury.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Treasury { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTreasury(data.bcs.type)) { throw new Error(`object at is not a Treasury object`); }

 return Treasury.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Treasury.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Treasury> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Treasury object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTreasury(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Treasury object`); }

 return Treasury.fromSuiObjectData( res.data ); }

 }

/* ============================== TreasuryCommand =============================== */

export function isTreasuryCommand(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::treasury::TreasuryCommand`; }

export interface TreasuryCommandFields { dummyField: ToField<"bool"> }

export type TreasuryCommandReified = Reified< TreasuryCommand, TreasuryCommandFields >;

export class TreasuryCommand implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::TreasuryCommand`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = TreasuryCommand.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::TreasuryCommand`; readonly $typeArgs: []; readonly $isPhantom = TreasuryCommand.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: TreasuryCommandFields, ) { this.$fullTypeName = composeSuiType( TreasuryCommand.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::TreasuryCommand`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): TreasuryCommandReified { return { typeName: TreasuryCommand.$typeName, fullTypeName: composeSuiType( TreasuryCommand.$typeName, ...[] ) as `${typeof PKG_V1}::treasury::TreasuryCommand`, typeArgs: [ ] as [], isPhantom: TreasuryCommand.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => TreasuryCommand.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TreasuryCommand.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => TreasuryCommand.fromBcs( data, ), bcs: TreasuryCommand.bcs, fromJSONField: (field: any) => TreasuryCommand.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => TreasuryCommand.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => TreasuryCommand.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => TreasuryCommand.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => TreasuryCommand.fetch( client, id, ), new: ( fields: TreasuryCommandFields, ) => { return new TreasuryCommand( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return TreasuryCommand.reified() }

 static phantom( ): PhantomReified<ToTypeStr<TreasuryCommand>> { return phantom(TreasuryCommand.reified( )); } static get p() { return TreasuryCommand.phantom() }

 static get bcs() { return bcs.struct("TreasuryCommand", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): TreasuryCommand { return TreasuryCommand.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): TreasuryCommand { if (!isTreasuryCommand(item.type)) { throw new Error("not a TreasuryCommand type");

 }

 return TreasuryCommand.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): TreasuryCommand { return TreasuryCommand.fromFields( TreasuryCommand.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): TreasuryCommand { return TreasuryCommand.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): TreasuryCommand { if (json.$typeName !== TreasuryCommand.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return TreasuryCommand.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): TreasuryCommand { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTreasuryCommand(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TreasuryCommand object`); } return TreasuryCommand.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): TreasuryCommand { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTreasuryCommand(data.bcs.type)) { throw new Error(`object at is not a TreasuryCommand object`); }

 return TreasuryCommand.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return TreasuryCommand.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<TreasuryCommand> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TreasuryCommand object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTreasuryCommand(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TreasuryCommand object`); }

 return TreasuryCommand.fromSuiObjectData( res.data ); }

 }

/* ============================== TreasuryKey =============================== */

export function isTreasuryKey(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::treasury::TreasuryKey`; }

export interface TreasuryKeyFields { name: ToField<String> }

export type TreasuryKeyReified = Reified< TreasuryKey, TreasuryKeyFields >;

export class TreasuryKey implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::TreasuryKey`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = TreasuryKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::TreasuryKey`; readonly $typeArgs: []; readonly $isPhantom = TreasuryKey.$isPhantom;

 readonly name: ToField<String>

 private constructor(typeArgs: [], fields: TreasuryKeyFields, ) { this.$fullTypeName = composeSuiType( TreasuryKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::TreasuryKey`; this.$typeArgs = typeArgs;

 this.name = fields.name; }

 static reified( ): TreasuryKeyReified { return { typeName: TreasuryKey.$typeName, fullTypeName: composeSuiType( TreasuryKey.$typeName, ...[] ) as `${typeof PKG_V1}::treasury::TreasuryKey`, typeArgs: [ ] as [], isPhantom: TreasuryKey.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => TreasuryKey.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TreasuryKey.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => TreasuryKey.fromBcs( data, ), bcs: TreasuryKey.bcs, fromJSONField: (field: any) => TreasuryKey.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => TreasuryKey.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => TreasuryKey.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => TreasuryKey.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => TreasuryKey.fetch( client, id, ), new: ( fields: TreasuryKeyFields, ) => { return new TreasuryKey( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return TreasuryKey.reified() }

 static phantom( ): PhantomReified<ToTypeStr<TreasuryKey>> { return phantom(TreasuryKey.reified( )); } static get p() { return TreasuryKey.phantom() }

 static get bcs() { return bcs.struct("TreasuryKey", {

 name: String.bcs

}) };

 static fromFields( fields: Record<string, any> ): TreasuryKey { return TreasuryKey.reified( ).new( { name: decodeFromFields(String.reified(), fields.name) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): TreasuryKey { if (!isTreasuryKey(item.type)) { throw new Error("not a TreasuryKey type");

 }

 return TreasuryKey.reified( ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name) } ) }

 static fromBcs( data: Uint8Array ): TreasuryKey { return TreasuryKey.fromFields( TreasuryKey.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): TreasuryKey { return TreasuryKey.reified( ).new( { name: decodeFromJSONField(String.reified(), field.name) } ) }

 static fromJSON( json: Record<string, any> ): TreasuryKey { if (json.$typeName !== TreasuryKey.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return TreasuryKey.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): TreasuryKey { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTreasuryKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TreasuryKey object`); } return TreasuryKey.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): TreasuryKey { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTreasuryKey(data.bcs.type)) { throw new Error(`object at is not a TreasuryKey object`); }

 return TreasuryKey.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return TreasuryKey.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<TreasuryKey> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TreasuryKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTreasuryKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TreasuryKey object`); }

 return TreasuryKey.fromSuiObjectData( res.data ); }

 }
