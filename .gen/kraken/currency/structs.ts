import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {TreasuryCap} from "../../_dependencies/source/0x2/coin/structs";
import {UID} from "../../_dependencies/source/0x2/object/structs";
import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs, fromB64, fromHEX, toHEX} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== Witness =============================== */

export function isWitness(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::currency::Witness`; }

export interface WitnessFields { dummyField: ToField<"bool"> }

export type WitnessReified = Reified< Witness, WitnessFields >;

export class Witness implements StructClass { static readonly $typeName = `${PKG_V1}::currency::Witness`; static readonly $numTypeParams = 0;

 readonly $typeName = Witness.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::currency::Witness`;

 readonly $typeArgs: [];

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: WitnessFields, ) { this.$fullTypeName = composeSuiType( Witness.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::Witness`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): WitnessReified { return { typeName: Witness.$typeName, fullTypeName: composeSuiType( Witness.$typeName, ...[] ) as `${typeof PKG_V1}::currency::Witness`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Witness.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Witness.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Witness.fromBcs( data, ), bcs: Witness.bcs, fromJSONField: (field: any) => Witness.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Witness.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Witness.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Witness.fetch( client, id, ), new: ( fields: WitnessFields, ) => { return new Witness( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Witness.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Witness>> { return phantom(Witness.reified( )); } static get p() { return Witness.phantom() }

 static get bcs() { return bcs.struct("Witness", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): Witness { return Witness.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Witness { if (!isWitness(item.type)) { throw new Error("not a Witness type");

 }

 return Witness.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): Witness { return Witness.fromFields( Witness.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Witness { return Witness.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): Witness { if (json.$typeName !== Witness.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Witness.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Witness { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWitness(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Witness object`); } return Witness.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Witness> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Witness object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWitness(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Witness object`); }
 return Witness.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Burn =============================== */

export function isBurn(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::currency::Burn` + '<'); }

export interface BurnFields<C extends PhantomTypeArgument> { amount: ToField<"u64"> }

export type BurnReified<C extends PhantomTypeArgument> = Reified< Burn<C>, BurnFields<C> >;

export class Burn<C extends PhantomTypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::currency::Burn`; static readonly $numTypeParams = 1;

 readonly $typeName = Burn.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::currency::Burn<${PhantomToTypeStr<C>}>`;

 readonly $typeArgs: [PhantomToTypeStr<C>];

 readonly amount: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<C>], fields: BurnFields<C>, ) { this.$fullTypeName = composeSuiType( Burn.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::Burn<${PhantomToTypeStr<C>}>`; this.$typeArgs = typeArgs;

 this.amount = fields.amount; }

 static reified<C extends PhantomReified<PhantomTypeArgument>>( C: C ): BurnReified<ToPhantomTypeArgument<C>> { return { typeName: Burn.$typeName, fullTypeName: composeSuiType( Burn.$typeName, ...[extractType(C)] ) as `${typeof PKG_V1}::currency::Burn<${PhantomToTypeStr<ToPhantomTypeArgument<C>>}>`, typeArgs: [ extractType(C) ] as [PhantomToTypeStr<ToPhantomTypeArgument<C>>], reifiedTypeArgs: [C], fromFields: (fields: Record<string, any>) => Burn.fromFields( C, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Burn.fromFieldsWithTypes( C, item, ), fromBcs: (data: Uint8Array) => Burn.fromBcs( C, data, ), bcs: Burn.bcs, fromJSONField: (field: any) => Burn.fromJSONField( C, field, ), fromJSON: (json: Record<string, any>) => Burn.fromJSON( C, json, ), fromSuiParsedData: (content: SuiParsedData) => Burn.fromSuiParsedData( C, content, ), fetch: async (client: SuiClient, id: string) => Burn.fetch( client, C, id, ), new: ( fields: BurnFields<ToPhantomTypeArgument<C>>, ) => { return new Burn( [extractType(C)], fields ) }, kind: "StructClassReified", } }

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

 static async fetch<C extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: C, id: string ): Promise<Burn<ToPhantomTypeArgument<C>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Burn object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBurn(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Burn object`); }
 return Burn.fromBcs( typeArg, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Mint =============================== */

export function isMint(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::currency::Mint` + '<'); }

export interface MintFields<C extends PhantomTypeArgument> { amount: ToField<"u64"> }

export type MintReified<C extends PhantomTypeArgument> = Reified< Mint<C>, MintFields<C> >;

export class Mint<C extends PhantomTypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::currency::Mint`; static readonly $numTypeParams = 1;

 readonly $typeName = Mint.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::currency::Mint<${PhantomToTypeStr<C>}>`;

 readonly $typeArgs: [PhantomToTypeStr<C>];

 readonly amount: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<C>], fields: MintFields<C>, ) { this.$fullTypeName = composeSuiType( Mint.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::Mint<${PhantomToTypeStr<C>}>`; this.$typeArgs = typeArgs;

 this.amount = fields.amount; }

 static reified<C extends PhantomReified<PhantomTypeArgument>>( C: C ): MintReified<ToPhantomTypeArgument<C>> { return { typeName: Mint.$typeName, fullTypeName: composeSuiType( Mint.$typeName, ...[extractType(C)] ) as `${typeof PKG_V1}::currency::Mint<${PhantomToTypeStr<ToPhantomTypeArgument<C>>}>`, typeArgs: [ extractType(C) ] as [PhantomToTypeStr<ToPhantomTypeArgument<C>>], reifiedTypeArgs: [C], fromFields: (fields: Record<string, any>) => Mint.fromFields( C, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Mint.fromFieldsWithTypes( C, item, ), fromBcs: (data: Uint8Array) => Mint.fromBcs( C, data, ), bcs: Mint.bcs, fromJSONField: (field: any) => Mint.fromJSONField( C, field, ), fromJSON: (json: Record<string, any>) => Mint.fromJSON( C, json, ), fromSuiParsedData: (content: SuiParsedData) => Mint.fromSuiParsedData( C, content, ), fetch: async (client: SuiClient, id: string) => Mint.fetch( client, C, id, ), new: ( fields: MintFields<ToPhantomTypeArgument<C>>, ) => { return new Mint( [extractType(C)], fields ) }, kind: "StructClassReified", } }

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

 static async fetch<C extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: C, id: string ): Promise<Mint<ToPhantomTypeArgument<C>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Mint object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMint(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Mint object`); }
 return Mint.fromBcs( typeArg, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== TreasuryLock =============================== */

export function isTreasuryLock(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::currency::TreasuryLock` + '<'); }

export interface TreasuryLockFields<C extends PhantomTypeArgument> { id: ToField<UID>; multisigAddr: ToField<"address">; treasuryCap: ToField<TreasuryCap<C>> }

export type TreasuryLockReified<C extends PhantomTypeArgument> = Reified< TreasuryLock<C>, TreasuryLockFields<C> >;

export class TreasuryLock<C extends PhantomTypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::currency::TreasuryLock`; static readonly $numTypeParams = 1;

 readonly $typeName = TreasuryLock.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::currency::TreasuryLock<${PhantomToTypeStr<C>}>`;

 readonly $typeArgs: [PhantomToTypeStr<C>];

 readonly id: ToField<UID>; readonly multisigAddr: ToField<"address">; readonly treasuryCap: ToField<TreasuryCap<C>>

 private constructor(typeArgs: [PhantomToTypeStr<C>], fields: TreasuryLockFields<C>, ) { this.$fullTypeName = composeSuiType( TreasuryLock.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::TreasuryLock<${PhantomToTypeStr<C>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.multisigAddr = fields.multisigAddr;; this.treasuryCap = fields.treasuryCap; }

 static reified<C extends PhantomReified<PhantomTypeArgument>>( C: C ): TreasuryLockReified<ToPhantomTypeArgument<C>> { return { typeName: TreasuryLock.$typeName, fullTypeName: composeSuiType( TreasuryLock.$typeName, ...[extractType(C)] ) as `${typeof PKG_V1}::currency::TreasuryLock<${PhantomToTypeStr<ToPhantomTypeArgument<C>>}>`, typeArgs: [ extractType(C) ] as [PhantomToTypeStr<ToPhantomTypeArgument<C>>], reifiedTypeArgs: [C], fromFields: (fields: Record<string, any>) => TreasuryLock.fromFields( C, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TreasuryLock.fromFieldsWithTypes( C, item, ), fromBcs: (data: Uint8Array) => TreasuryLock.fromBcs( C, data, ), bcs: TreasuryLock.bcs, fromJSONField: (field: any) => TreasuryLock.fromJSONField( C, field, ), fromJSON: (json: Record<string, any>) => TreasuryLock.fromJSON( C, json, ), fromSuiParsedData: (content: SuiParsedData) => TreasuryLock.fromSuiParsedData( C, content, ), fetch: async (client: SuiClient, id: string) => TreasuryLock.fetch( client, C, id, ), new: ( fields: TreasuryLockFields<ToPhantomTypeArgument<C>>, ) => { return new TreasuryLock( [extractType(C)], fields ) }, kind: "StructClassReified", } }

 static get r() { return TreasuryLock.reified }

 static phantom<C extends PhantomReified<PhantomTypeArgument>>( C: C ): PhantomReified<ToTypeStr<TreasuryLock<ToPhantomTypeArgument<C>>>> { return phantom(TreasuryLock.reified( C )); } static get p() { return TreasuryLock.phantom }

 static get bcs() { return bcs.struct("TreasuryLock", {

 id: UID.bcs, multisig_addr: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), treasury_cap: TreasuryCap.bcs

}) };

 static fromFields<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, fields: Record<string, any> ): TreasuryLock<ToPhantomTypeArgument<C>> { return TreasuryLock.reified( typeArg, ).new( { id: decodeFromFields(UID.reified(), fields.id), multisigAddr: decodeFromFields("address", fields.multisig_addr), treasuryCap: decodeFromFields(TreasuryCap.reified(typeArg), fields.treasury_cap) } ) }

 static fromFieldsWithTypes<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, item: FieldsWithTypes ): TreasuryLock<ToPhantomTypeArgument<C>> { if (!isTreasuryLock(item.type)) { throw new Error("not a TreasuryLock type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return TreasuryLock.reified( typeArg, ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), multisigAddr: decodeFromFieldsWithTypes("address", item.fields.multisig_addr), treasuryCap: decodeFromFieldsWithTypes(TreasuryCap.reified(typeArg), item.fields.treasury_cap) } ) }

 static fromBcs<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, data: Uint8Array ): TreasuryLock<ToPhantomTypeArgument<C>> { return TreasuryLock.fromFields( typeArg, TreasuryLock.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,multisigAddr: this.multisigAddr,treasuryCap: this.treasuryCap.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, field: any ): TreasuryLock<ToPhantomTypeArgument<C>> { return TreasuryLock.reified( typeArg, ).new( { id: decodeFromJSONField(UID.reified(), field.id), multisigAddr: decodeFromJSONField("address", field.multisigAddr), treasuryCap: decodeFromJSONField(TreasuryCap.reified(typeArg), field.treasuryCap) } ) }

 static fromJSON<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, json: Record<string, any> ): TreasuryLock<ToPhantomTypeArgument<C>> { if (json.$typeName !== TreasuryLock.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(TreasuryLock.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return TreasuryLock.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<C extends PhantomReified<PhantomTypeArgument>>( typeArg: C, content: SuiParsedData ): TreasuryLock<ToPhantomTypeArgument<C>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTreasuryLock(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TreasuryLock object`); } return TreasuryLock.fromFieldsWithTypes( typeArg, content ); }

 static async fetch<C extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: C, id: string ): Promise<TreasuryLock<ToPhantomTypeArgument<C>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TreasuryLock object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTreasuryLock(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TreasuryLock object`); }
 return TreasuryLock.fromBcs( typeArg, fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Update =============================== */

export function isUpdate(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::currency::Update`; }

export interface UpdateFields { name: ToField<Option<String>>; symbol: ToField<Option<String>>; description: ToField<Option<String>>; iconUrl: ToField<Option<String>> }

export type UpdateReified = Reified< Update, UpdateFields >;

export class Update implements StructClass { static readonly $typeName = `${PKG_V1}::currency::Update`; static readonly $numTypeParams = 0;

 readonly $typeName = Update.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::currency::Update`;

 readonly $typeArgs: [];

 readonly name: ToField<Option<String>>; readonly symbol: ToField<Option<String>>; readonly description: ToField<Option<String>>; readonly iconUrl: ToField<Option<String>>

 private constructor(typeArgs: [], fields: UpdateFields, ) { this.$fullTypeName = composeSuiType( Update.$typeName, ...typeArgs ) as `${typeof PKG_V1}::currency::Update`; this.$typeArgs = typeArgs;

 this.name = fields.name;; this.symbol = fields.symbol;; this.description = fields.description;; this.iconUrl = fields.iconUrl; }

 static reified( ): UpdateReified { return { typeName: Update.$typeName, fullTypeName: composeSuiType( Update.$typeName, ...[] ) as `${typeof PKG_V1}::currency::Update`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Update.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Update.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Update.fromBcs( data, ), bcs: Update.bcs, fromJSONField: (field: any) => Update.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Update.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Update.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Update.fetch( client, id, ), new: ( fields: UpdateFields, ) => { return new Update( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Update.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Update>> { return phantom(Update.reified( )); } static get p() { return Update.phantom() }

 static get bcs() { return bcs.struct("Update", {

 name: Option.bcs(String.bcs), symbol: Option.bcs(String.bcs), description: Option.bcs(String.bcs), icon_url: Option.bcs(String.bcs)

}) };

 static fromFields( fields: Record<string, any> ): Update { return Update.reified( ).new( { name: decodeFromFields(Option.reified(String.reified()), fields.name), symbol: decodeFromFields(Option.reified(String.reified()), fields.symbol), description: decodeFromFields(Option.reified(String.reified()), fields.description), iconUrl: decodeFromFields(Option.reified(String.reified()), fields.icon_url) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Update { if (!isUpdate(item.type)) { throw new Error("not a Update type");

 }

 return Update.reified( ).new( { name: decodeFromFieldsWithTypes(Option.reified(String.reified()), item.fields.name), symbol: decodeFromFieldsWithTypes(Option.reified(String.reified()), item.fields.symbol), description: decodeFromFieldsWithTypes(Option.reified(String.reified()), item.fields.description), iconUrl: decodeFromFieldsWithTypes(Option.reified(String.reified()), item.fields.icon_url) } ) }

 static fromBcs( data: Uint8Array ): Update { return Update.fromFields( Update.bcs.parse(data) ) }

 toJSONField() { return {

 name: fieldToJSON<Option<String>>(`${Option.$typeName}<${String.$typeName}>`, this.name),symbol: fieldToJSON<Option<String>>(`${Option.$typeName}<${String.$typeName}>`, this.symbol),description: fieldToJSON<Option<String>>(`${Option.$typeName}<${String.$typeName}>`, this.description),iconUrl: fieldToJSON<Option<String>>(`${Option.$typeName}<${String.$typeName}>`, this.iconUrl),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Update { return Update.reified( ).new( { name: decodeFromJSONField(Option.reified(String.reified()), field.name), symbol: decodeFromJSONField(Option.reified(String.reified()), field.symbol), description: decodeFromJSONField(Option.reified(String.reified()), field.description), iconUrl: decodeFromJSONField(Option.reified(String.reified()), field.iconUrl) } ) }

 static fromJSON( json: Record<string, any> ): Update { if (json.$typeName !== Update.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Update.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Update { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpdate(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Update object`); } return Update.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Update> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Update object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpdate(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Update object`); }
 return Update.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
