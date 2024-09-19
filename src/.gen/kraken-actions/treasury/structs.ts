import {String} from "../../_dependencies/source/0x1/string/structs";
import {Bag} from "../../_dependencies/source/0x2/bag/structs";
import {VecMap} from "../../_dependencies/source/0x2/vec-map/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== ManageTreasury =============================== */

export function isManageTreasury(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::treasury::ManageTreasury`; }

export interface ManageTreasuryFields { dummyField: ToField<"bool"> }

export type ManageTreasuryReified = Reified< ManageTreasury, ManageTreasuryFields >;

export class ManageTreasury implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::ManageTreasury`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ManageTreasury.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::ManageTreasury`; readonly $typeArgs: []; readonly $isPhantom = ManageTreasury.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: ManageTreasuryFields, ) { this.$fullTypeName = composeSuiType( ManageTreasury.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::ManageTreasury`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): ManageTreasuryReified { return { typeName: ManageTreasury.$typeName, fullTypeName: composeSuiType( ManageTreasury.$typeName, ...[] ) as `${typeof PKG_V1}::treasury::ManageTreasury`, typeArgs: [ ] as [], isPhantom: ManageTreasury.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ManageTreasury.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ManageTreasury.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ManageTreasury.fromBcs( data, ), bcs: ManageTreasury.bcs, fromJSONField: (field: any) => ManageTreasury.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ManageTreasury.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ManageTreasury.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ManageTreasury.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ManageTreasury.fetch( client, id, ), new: ( fields: ManageTreasuryFields, ) => { return new ManageTreasury( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ManageTreasury.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ManageTreasury>> { return phantom(ManageTreasury.reified( )); } static get p() { return ManageTreasury.phantom() }

 static get bcs() { return bcs.struct("ManageTreasury", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): ManageTreasury { return ManageTreasury.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ManageTreasury { if (!isManageTreasury(item.type)) { throw new Error("not a ManageTreasury type");

 }

 return ManageTreasury.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): ManageTreasury { return ManageTreasury.fromFields( ManageTreasury.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ManageTreasury { return ManageTreasury.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): ManageTreasury { if (json.$typeName !== ManageTreasury.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ManageTreasury.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ManageTreasury { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isManageTreasury(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ManageTreasury object`); } return ManageTreasury.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ManageTreasury { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isManageTreasury(data.bcs.type)) { throw new Error(`object at is not a ManageTreasury object`); }

 return ManageTreasury.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ManageTreasury.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ManageTreasury> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ManageTreasury object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isManageTreasury(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ManageTreasury object`); }

 return ManageTreasury.fromSuiObjectData( res.data ); }

 }

/* ============================== OpenAction =============================== */

export function isOpenAction(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::treasury::OpenAction`; }

export interface OpenActionFields { name: ToField<String> }

export type OpenActionReified = Reified< OpenAction, OpenActionFields >;

export class OpenAction implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::OpenAction`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = OpenAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::OpenAction`; readonly $typeArgs: []; readonly $isPhantom = OpenAction.$isPhantom;

 readonly name: ToField<String>

 private constructor(typeArgs: [], fields: OpenActionFields, ) { this.$fullTypeName = composeSuiType( OpenAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::OpenAction`; this.$typeArgs = typeArgs;

 this.name = fields.name; }

 static reified( ): OpenActionReified { return { typeName: OpenAction.$typeName, fullTypeName: composeSuiType( OpenAction.$typeName, ...[] ) as `${typeof PKG_V1}::treasury::OpenAction`, typeArgs: [ ] as [], isPhantom: OpenAction.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => OpenAction.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => OpenAction.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => OpenAction.fromBcs( data, ), bcs: OpenAction.bcs, fromJSONField: (field: any) => OpenAction.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => OpenAction.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => OpenAction.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => OpenAction.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => OpenAction.fetch( client, id, ), new: ( fields: OpenActionFields, ) => { return new OpenAction( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return OpenAction.reified() }

 static phantom( ): PhantomReified<ToTypeStr<OpenAction>> { return phantom(OpenAction.reified( )); } static get p() { return OpenAction.phantom() }

 static get bcs() { return bcs.struct("OpenAction", {

 name: String.bcs

}) };

 static fromFields( fields: Record<string, any> ): OpenAction { return OpenAction.reified( ).new( { name: decodeFromFields(String.reified(), fields.name) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): OpenAction { if (!isOpenAction(item.type)) { throw new Error("not a OpenAction type");

 }

 return OpenAction.reified( ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name) } ) }

 static fromBcs( data: Uint8Array ): OpenAction { return OpenAction.fromFields( OpenAction.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): OpenAction { return OpenAction.reified( ).new( { name: decodeFromJSONField(String.reified(), field.name) } ) }

 static fromJSON( json: Record<string, any> ): OpenAction { if (json.$typeName !== OpenAction.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return OpenAction.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): OpenAction { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isOpenAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a OpenAction object`); } return OpenAction.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): OpenAction { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isOpenAction(data.bcs.type)) { throw new Error(`object at is not a OpenAction object`); }

 return OpenAction.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return OpenAction.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<OpenAction> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching OpenAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isOpenAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a OpenAction object`); }

 return OpenAction.fromSuiObjectData( res.data ); }

 }

/* ============================== OpenProposal =============================== */

export function isOpenProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::treasury::OpenProposal`; }

export interface OpenProposalFields { dummyField: ToField<"bool"> }

export type OpenProposalReified = Reified< OpenProposal, OpenProposalFields >;

export class OpenProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::OpenProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = OpenProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::OpenProposal`; readonly $typeArgs: []; readonly $isPhantom = OpenProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: OpenProposalFields, ) { this.$fullTypeName = composeSuiType( OpenProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::OpenProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): OpenProposalReified { return { typeName: OpenProposal.$typeName, fullTypeName: composeSuiType( OpenProposal.$typeName, ...[] ) as `${typeof PKG_V1}::treasury::OpenProposal`, typeArgs: [ ] as [], isPhantom: OpenProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => OpenProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => OpenProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => OpenProposal.fromBcs( data, ), bcs: OpenProposal.bcs, fromJSONField: (field: any) => OpenProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => OpenProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => OpenProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => OpenProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => OpenProposal.fetch( client, id, ), new: ( fields: OpenProposalFields, ) => { return new OpenProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return OpenProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<OpenProposal>> { return phantom(OpenProposal.reified( )); } static get p() { return OpenProposal.phantom() }

 static get bcs() { return bcs.struct("OpenProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): OpenProposal { return OpenProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): OpenProposal { if (!isOpenProposal(item.type)) { throw new Error("not a OpenProposal type");

 }

 return OpenProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): OpenProposal { return OpenProposal.fromFields( OpenProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): OpenProposal { return OpenProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): OpenProposal { if (json.$typeName !== OpenProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return OpenProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): OpenProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isOpenProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a OpenProposal object`); } return OpenProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): OpenProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isOpenProposal(data.bcs.type)) { throw new Error(`object at is not a OpenProposal object`); }

 return OpenProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return OpenProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<OpenProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching OpenProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isOpenProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a OpenProposal object`); }

 return OpenProposal.fromSuiObjectData( res.data ); }

 }

/* ============================== SpendAction =============================== */

export function isSpendAction(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::treasury::SpendAction`; }

export interface SpendActionFields { name: ToField<String>; coinsAmountsMap: ToField<VecMap<String, "u64">> }

export type SpendActionReified = Reified< SpendAction, SpendActionFields >;

export class SpendAction implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::SpendAction`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = SpendAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::SpendAction`; readonly $typeArgs: []; readonly $isPhantom = SpendAction.$isPhantom;

 readonly name: ToField<String>; readonly coinsAmountsMap: ToField<VecMap<String, "u64">>

 private constructor(typeArgs: [], fields: SpendActionFields, ) { this.$fullTypeName = composeSuiType( SpendAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::SpendAction`; this.$typeArgs = typeArgs;

 this.name = fields.name;; this.coinsAmountsMap = fields.coinsAmountsMap; }

 static reified( ): SpendActionReified { return { typeName: SpendAction.$typeName, fullTypeName: composeSuiType( SpendAction.$typeName, ...[] ) as `${typeof PKG_V1}::treasury::SpendAction`, typeArgs: [ ] as [], isPhantom: SpendAction.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => SpendAction.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => SpendAction.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => SpendAction.fromBcs( data, ), bcs: SpendAction.bcs, fromJSONField: (field: any) => SpendAction.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => SpendAction.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => SpendAction.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => SpendAction.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => SpendAction.fetch( client, id, ), new: ( fields: SpendActionFields, ) => { return new SpendAction( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return SpendAction.reified() }

 static phantom( ): PhantomReified<ToTypeStr<SpendAction>> { return phantom(SpendAction.reified( )); } static get p() { return SpendAction.phantom() }

 static get bcs() { return bcs.struct("SpendAction", {

 name: String.bcs, coins_amounts_map: VecMap.bcs(String.bcs, bcs.u64())

}) };

 static fromFields( fields: Record<string, any> ): SpendAction { return SpendAction.reified( ).new( { name: decodeFromFields(String.reified(), fields.name), coinsAmountsMap: decodeFromFields(VecMap.reified(String.reified(), "u64"), fields.coins_amounts_map) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): SpendAction { if (!isSpendAction(item.type)) { throw new Error("not a SpendAction type");

 }

 return SpendAction.reified( ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), coinsAmountsMap: decodeFromFieldsWithTypes(VecMap.reified(String.reified(), "u64"), item.fields.coins_amounts_map) } ) }

 static fromBcs( data: Uint8Array ): SpendAction { return SpendAction.fromFields( SpendAction.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,coinsAmountsMap: this.coinsAmountsMap.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): SpendAction { return SpendAction.reified( ).new( { name: decodeFromJSONField(String.reified(), field.name), coinsAmountsMap: decodeFromJSONField(VecMap.reified(String.reified(), "u64"), field.coinsAmountsMap) } ) }

 static fromJSON( json: Record<string, any> ): SpendAction { if (json.$typeName !== SpendAction.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return SpendAction.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): SpendAction { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isSpendAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a SpendAction object`); } return SpendAction.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): SpendAction { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isSpendAction(data.bcs.type)) { throw new Error(`object at is not a SpendAction object`); }

 return SpendAction.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return SpendAction.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<SpendAction> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching SpendAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isSpendAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a SpendAction object`); }

 return SpendAction.fromSuiObjectData( res.data ); }

 }

/* ============================== SpendProposal =============================== */

export function isSpendProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::treasury::SpendProposal`; }

export interface SpendProposalFields { dummyField: ToField<"bool"> }

export type SpendProposalReified = Reified< SpendProposal, SpendProposalFields >;

export class SpendProposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::SpendProposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = SpendProposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::SpendProposal`; readonly $typeArgs: []; readonly $isPhantom = SpendProposal.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: SpendProposalFields, ) { this.$fullTypeName = composeSuiType( SpendProposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::SpendProposal`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): SpendProposalReified { return { typeName: SpendProposal.$typeName, fullTypeName: composeSuiType( SpendProposal.$typeName, ...[] ) as `${typeof PKG_V1}::treasury::SpendProposal`, typeArgs: [ ] as [], isPhantom: SpendProposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => SpendProposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => SpendProposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => SpendProposal.fromBcs( data, ), bcs: SpendProposal.bcs, fromJSONField: (field: any) => SpendProposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => SpendProposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => SpendProposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => SpendProposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => SpendProposal.fetch( client, id, ), new: ( fields: SpendProposalFields, ) => { return new SpendProposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return SpendProposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<SpendProposal>> { return phantom(SpendProposal.reified( )); } static get p() { return SpendProposal.phantom() }

 static get bcs() { return bcs.struct("SpendProposal", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): SpendProposal { return SpendProposal.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): SpendProposal { if (!isSpendProposal(item.type)) { throw new Error("not a SpendProposal type");

 }

 return SpendProposal.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): SpendProposal { return SpendProposal.fromFields( SpendProposal.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): SpendProposal { return SpendProposal.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): SpendProposal { if (json.$typeName !== SpendProposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return SpendProposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): SpendProposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isSpendProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a SpendProposal object`); } return SpendProposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): SpendProposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isSpendProposal(data.bcs.type)) { throw new Error(`object at is not a SpendProposal object`); }

 return SpendProposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return SpendProposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<SpendProposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching SpendProposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isSpendProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a SpendProposal object`); }

 return SpendProposal.fromSuiObjectData( res.data ); }

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
