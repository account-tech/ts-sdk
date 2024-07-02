import * as reified from "../../_framework/reified";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID, UID} from "../../_dependencies/source/0x2/object/structs";
import {UpgradeCap} from "../../_dependencies/source/0x2/package/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, Vector, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs, fromB64, fromHEX, toHEX} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== Witness =============================== */

export function isWitness(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::Witness`; }

export interface WitnessFields { dummyField: ToField<"bool"> }

export type WitnessReified = Reified< Witness, WitnessFields >;

export class Witness implements StructClass { static readonly $typeName = `${PKG_V1}::upgrade_policies::Witness`; static readonly $numTypeParams = 0;

 readonly $typeName = Witness.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::Witness`;

 readonly $typeArgs: [];

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: WitnessFields, ) { this.$fullTypeName = composeSuiType( Witness.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::Witness`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): WitnessReified { return { typeName: Witness.$typeName, fullTypeName: composeSuiType( Witness.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::Witness`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Witness.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Witness.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Witness.fromBcs( data, ), bcs: Witness.bcs, fromJSONField: (field: any) => Witness.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Witness.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Witness.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Witness.fetch( client, id, ), new: ( fields: WitnessFields, ) => { return new Witness( [], fields ) }, kind: "StructClassReified", } }

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

/* ============================== Restrict =============================== */

export function isRestrict(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::Restrict`; }

export interface RestrictFields { policy: ToField<"u8">; lockId: ToField<ID> }

export type RestrictReified = Reified< Restrict, RestrictFields >;

export class Restrict implements StructClass { static readonly $typeName = `${PKG_V1}::upgrade_policies::Restrict`; static readonly $numTypeParams = 0;

 readonly $typeName = Restrict.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::Restrict`;

 readonly $typeArgs: [];

 readonly policy: ToField<"u8">; readonly lockId: ToField<ID>

 private constructor(typeArgs: [], fields: RestrictFields, ) { this.$fullTypeName = composeSuiType( Restrict.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::Restrict`; this.$typeArgs = typeArgs;

 this.policy = fields.policy;; this.lockId = fields.lockId; }

 static reified( ): RestrictReified { return { typeName: Restrict.$typeName, fullTypeName: composeSuiType( Restrict.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::Restrict`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Restrict.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Restrict.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Restrict.fromBcs( data, ), bcs: Restrict.bcs, fromJSONField: (field: any) => Restrict.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Restrict.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Restrict.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Restrict.fetch( client, id, ), new: ( fields: RestrictFields, ) => { return new Restrict( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Restrict.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Restrict>> { return phantom(Restrict.reified( )); } static get p() { return Restrict.phantom() }

 static get bcs() { return bcs.struct("Restrict", {

 policy: bcs.u8(), lock_id: ID.bcs

}) };

 static fromFields( fields: Record<string, any> ): Restrict { return Restrict.reified( ).new( { policy: decodeFromFields("u8", fields.policy), lockId: decodeFromFields(ID.reified(), fields.lock_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Restrict { if (!isRestrict(item.type)) { throw new Error("not a Restrict type");

 }

 return Restrict.reified( ).new( { policy: decodeFromFieldsWithTypes("u8", item.fields.policy), lockId: decodeFromFieldsWithTypes(ID.reified(), item.fields.lock_id) } ) }

 static fromBcs( data: Uint8Array ): Restrict { return Restrict.fromFields( Restrict.bcs.parse(data) ) }

 toJSONField() { return {

 policy: this.policy,lockId: this.lockId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Restrict { return Restrict.reified( ).new( { policy: decodeFromJSONField("u8", field.policy), lockId: decodeFromJSONField(ID.reified(), field.lockId) } ) }

 static fromJSON( json: Record<string, any> ): Restrict { if (json.$typeName !== Restrict.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Restrict.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Restrict { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isRestrict(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Restrict object`); } return Restrict.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Restrict> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Restrict object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isRestrict(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Restrict object`); }
 return Restrict.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== TimeLock =============================== */

export function isTimeLock(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::TimeLock`; }

export interface TimeLockFields { delayMs: ToField<"u64"> }

export type TimeLockReified = Reified< TimeLock, TimeLockFields >;

export class TimeLock implements StructClass { static readonly $typeName = `${PKG_V1}::upgrade_policies::TimeLock`; static readonly $numTypeParams = 0;

 readonly $typeName = TimeLock.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::TimeLock`;

 readonly $typeArgs: [];

 readonly delayMs: ToField<"u64">

 private constructor(typeArgs: [], fields: TimeLockFields, ) { this.$fullTypeName = composeSuiType( TimeLock.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::TimeLock`; this.$typeArgs = typeArgs;

 this.delayMs = fields.delayMs; }

 static reified( ): TimeLockReified { return { typeName: TimeLock.$typeName, fullTypeName: composeSuiType( TimeLock.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::TimeLock`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => TimeLock.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TimeLock.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => TimeLock.fromBcs( data, ), bcs: TimeLock.bcs, fromJSONField: (field: any) => TimeLock.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => TimeLock.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => TimeLock.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => TimeLock.fetch( client, id, ), new: ( fields: TimeLockFields, ) => { return new TimeLock( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return TimeLock.reified() }

 static phantom( ): PhantomReified<ToTypeStr<TimeLock>> { return phantom(TimeLock.reified( )); } static get p() { return TimeLock.phantom() }

 static get bcs() { return bcs.struct("TimeLock", {

 delay_ms: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): TimeLock { return TimeLock.reified( ).new( { delayMs: decodeFromFields("u64", fields.delay_ms) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): TimeLock { if (!isTimeLock(item.type)) { throw new Error("not a TimeLock type");

 }

 return TimeLock.reified( ).new( { delayMs: decodeFromFieldsWithTypes("u64", item.fields.delay_ms) } ) }

 static fromBcs( data: Uint8Array ): TimeLock { return TimeLock.fromFields( TimeLock.bcs.parse(data) ) }

 toJSONField() { return {

 delayMs: this.delayMs.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): TimeLock { return TimeLock.reified( ).new( { delayMs: decodeFromJSONField("u64", field.delayMs) } ) }

 static fromJSON( json: Record<string, any> ): TimeLock { if (json.$typeName !== TimeLock.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return TimeLock.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): TimeLock { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTimeLock(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TimeLock object`); } return TimeLock.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<TimeLock> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TimeLock object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTimeLock(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TimeLock object`); }
 return TimeLock.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Upgrade =============================== */

export function isUpgrade(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::Upgrade`; }

export interface UpgradeFields { digest: ToField<Vector<"u8">>; lockId: ToField<ID> }

export type UpgradeReified = Reified< Upgrade, UpgradeFields >;

export class Upgrade implements StructClass { static readonly $typeName = `${PKG_V1}::upgrade_policies::Upgrade`; static readonly $numTypeParams = 0;

 readonly $typeName = Upgrade.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::Upgrade`;

 readonly $typeArgs: [];

 readonly digest: ToField<Vector<"u8">>; readonly lockId: ToField<ID>

 private constructor(typeArgs: [], fields: UpgradeFields, ) { this.$fullTypeName = composeSuiType( Upgrade.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::Upgrade`; this.$typeArgs = typeArgs;

 this.digest = fields.digest;; this.lockId = fields.lockId; }

 static reified( ): UpgradeReified { return { typeName: Upgrade.$typeName, fullTypeName: composeSuiType( Upgrade.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::Upgrade`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Upgrade.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Upgrade.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Upgrade.fromBcs( data, ), bcs: Upgrade.bcs, fromJSONField: (field: any) => Upgrade.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Upgrade.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Upgrade.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Upgrade.fetch( client, id, ), new: ( fields: UpgradeFields, ) => { return new Upgrade( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Upgrade.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Upgrade>> { return phantom(Upgrade.reified( )); } static get p() { return Upgrade.phantom() }

 static get bcs() { return bcs.struct("Upgrade", {

 digest: bcs.vector(bcs.u8()), lock_id: ID.bcs

}) };

 static fromFields( fields: Record<string, any> ): Upgrade { return Upgrade.reified( ).new( { digest: decodeFromFields(reified.vector("u8"), fields.digest), lockId: decodeFromFields(ID.reified(), fields.lock_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Upgrade { if (!isUpgrade(item.type)) { throw new Error("not a Upgrade type");

 }

 return Upgrade.reified( ).new( { digest: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.digest), lockId: decodeFromFieldsWithTypes(ID.reified(), item.fields.lock_id) } ) }

 static fromBcs( data: Uint8Array ): Upgrade { return Upgrade.fromFields( Upgrade.bcs.parse(data) ) }

 toJSONField() { return {

 digest: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.digest),lockId: this.lockId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Upgrade { return Upgrade.reified( ).new( { digest: decodeFromJSONField(reified.vector("u8"), field.digest), lockId: decodeFromJSONField(ID.reified(), field.lockId) } ) }

 static fromJSON( json: Record<string, any> ): Upgrade { if (json.$typeName !== Upgrade.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Upgrade.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Upgrade { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpgrade(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Upgrade object`); } return Upgrade.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Upgrade> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Upgrade object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpgrade(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Upgrade object`); }
 return Upgrade.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== UpgradeLock =============================== */

export function isUpgradeLock(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_policies::UpgradeLock`; }

export interface UpgradeLockFields { id: ToField<UID>; label: ToField<String>; multisigAddr: ToField<"address">; upgradeCap: ToField<UpgradeCap> }

export type UpgradeLockReified = Reified< UpgradeLock, UpgradeLockFields >;

export class UpgradeLock implements StructClass { static readonly $typeName = `${PKG_V1}::upgrade_policies::UpgradeLock`; static readonly $numTypeParams = 0;

 readonly $typeName = UpgradeLock.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::upgrade_policies::UpgradeLock`;

 readonly $typeArgs: [];

 readonly id: ToField<UID>; readonly label: ToField<String>; readonly multisigAddr: ToField<"address">; readonly upgradeCap: ToField<UpgradeCap>

 private constructor(typeArgs: [], fields: UpgradeLockFields, ) { this.$fullTypeName = composeSuiType( UpgradeLock.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_policies::UpgradeLock`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.label = fields.label;; this.multisigAddr = fields.multisigAddr;; this.upgradeCap = fields.upgradeCap; }

 static reified( ): UpgradeLockReified { return { typeName: UpgradeLock.$typeName, fullTypeName: composeSuiType( UpgradeLock.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_policies::UpgradeLock`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => UpgradeLock.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UpgradeLock.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => UpgradeLock.fromBcs( data, ), bcs: UpgradeLock.bcs, fromJSONField: (field: any) => UpgradeLock.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => UpgradeLock.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => UpgradeLock.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => UpgradeLock.fetch( client, id, ), new: ( fields: UpgradeLockFields, ) => { return new UpgradeLock( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return UpgradeLock.reified() }

 static phantom( ): PhantomReified<ToTypeStr<UpgradeLock>> { return phantom(UpgradeLock.reified( )); } static get p() { return UpgradeLock.phantom() }

 static get bcs() { return bcs.struct("UpgradeLock", {

 id: UID.bcs, label: String.bcs, multisig_addr: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), upgrade_cap: UpgradeCap.bcs

}) };

 static fromFields( fields: Record<string, any> ): UpgradeLock { return UpgradeLock.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), label: decodeFromFields(String.reified(), fields.label), multisigAddr: decodeFromFields("address", fields.multisig_addr), upgradeCap: decodeFromFields(UpgradeCap.reified(), fields.upgrade_cap) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): UpgradeLock { if (!isUpgradeLock(item.type)) { throw new Error("not a UpgradeLock type");

 }

 return UpgradeLock.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), label: decodeFromFieldsWithTypes(String.reified(), item.fields.label), multisigAddr: decodeFromFieldsWithTypes("address", item.fields.multisig_addr), upgradeCap: decodeFromFieldsWithTypes(UpgradeCap.reified(), item.fields.upgrade_cap) } ) }

 static fromBcs( data: Uint8Array ): UpgradeLock { return UpgradeLock.fromFields( UpgradeLock.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,label: this.label,multisigAddr: this.multisigAddr,upgradeCap: this.upgradeCap.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): UpgradeLock { return UpgradeLock.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), label: decodeFromJSONField(String.reified(), field.label), multisigAddr: decodeFromJSONField("address", field.multisigAddr), upgradeCap: decodeFromJSONField(UpgradeCap.reified(), field.upgradeCap) } ) }

 static fromJSON( json: Record<string, any> ): UpgradeLock { if (json.$typeName !== UpgradeLock.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return UpgradeLock.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): UpgradeLock { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpgradeLock(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UpgradeLock object`); } return UpgradeLock.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<UpgradeLock> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UpgradeLock object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpgradeLock(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UpgradeLock object`); }
 return UpgradeLock.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
