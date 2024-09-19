import * as reified from "../../_framework/reified";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID, UID} from "../../_dependencies/source/0x2/object/structs";
import {Table} from "../../_dependencies/source/0x2/table/structs";
import {VecSet} from "../../_dependencies/source/0x2/vec-set/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom, ToTypeStr as ToPhantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== Account =============================== */

export function isAccount(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::account::Account`; }

export interface AccountFields { id: ToField<UID>; username: ToField<String>; profilePicture: ToField<String>; multisigIds: ToField<VecSet<ID>> }

export type AccountReified = Reified< Account, AccountFields >;

export class Account implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::account::Account`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Account.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::account::Account`; readonly $typeArgs: []; readonly $isPhantom = Account.$isPhantom;

 readonly id: ToField<UID>; readonly username: ToField<String>; readonly profilePicture: ToField<String>; readonly multisigIds: ToField<VecSet<ID>>

 private constructor(typeArgs: [], fields: AccountFields, ) { this.$fullTypeName = composeSuiType( Account.$typeName, ...typeArgs ) as `${typeof PKG_V1}::account::Account`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.username = fields.username;; this.profilePicture = fields.profilePicture;; this.multisigIds = fields.multisigIds; }

 static reified( ): AccountReified { return { typeName: Account.$typeName, fullTypeName: composeSuiType( Account.$typeName, ...[] ) as `${typeof PKG_V1}::account::Account`, typeArgs: [ ] as [], isPhantom: Account.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Account.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Account.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Account.fromBcs( data, ), bcs: Account.bcs, fromJSONField: (field: any) => Account.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Account.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Account.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Account.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Account.fetch( client, id, ), new: ( fields: AccountFields, ) => { return new Account( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Account.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Account>> { return phantom(Account.reified( )); } static get p() { return Account.phantom() }

 static get bcs() { return bcs.struct("Account", {

 id: UID.bcs, username: String.bcs, profile_picture: String.bcs, multisig_ids: VecSet.bcs(ID.bcs)

}) };

 static fromFields( fields: Record<string, any> ): Account { return Account.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), username: decodeFromFields(String.reified(), fields.username), profilePicture: decodeFromFields(String.reified(), fields.profile_picture), multisigIds: decodeFromFields(VecSet.reified(ID.reified()), fields.multisig_ids) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Account { if (!isAccount(item.type)) { throw new Error("not a Account type");

 }

 return Account.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), username: decodeFromFieldsWithTypes(String.reified(), item.fields.username), profilePicture: decodeFromFieldsWithTypes(String.reified(), item.fields.profile_picture), multisigIds: decodeFromFieldsWithTypes(VecSet.reified(ID.reified()), item.fields.multisig_ids) } ) }

 static fromBcs( data: Uint8Array ): Account { return Account.fromFields( Account.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,username: this.username,profilePicture: this.profilePicture,multisigIds: this.multisigIds.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Account { return Account.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), username: decodeFromJSONField(String.reified(), field.username), profilePicture: decodeFromJSONField(String.reified(), field.profilePicture), multisigIds: decodeFromJSONField(VecSet.reified(ID.reified()), field.multisigIds) } ) }

 static fromJSON( json: Record<string, any> ): Account { if (json.$typeName !== Account.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Account.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Account { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAccount(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Account object`); } return Account.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Account { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isAccount(data.bcs.type)) { throw new Error(`object at is not a Account object`); }

 return Account.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Account.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Account> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Account object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAccount(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Account object`); }

 return Account.fromSuiObjectData( res.data ); }

 }

/* ============================== Invite =============================== */

export function isInvite(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::account::Invite`; }

export interface InviteFields { id: ToField<UID>; multisigId: ToField<ID> }

export type InviteReified = Reified< Invite, InviteFields >;

export class Invite implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::account::Invite`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Invite.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::account::Invite`; readonly $typeArgs: []; readonly $isPhantom = Invite.$isPhantom;

 readonly id: ToField<UID>; readonly multisigId: ToField<ID>

 private constructor(typeArgs: [], fields: InviteFields, ) { this.$fullTypeName = composeSuiType( Invite.$typeName, ...typeArgs ) as `${typeof PKG_V1}::account::Invite`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.multisigId = fields.multisigId; }

 static reified( ): InviteReified { return { typeName: Invite.$typeName, fullTypeName: composeSuiType( Invite.$typeName, ...[] ) as `${typeof PKG_V1}::account::Invite`, typeArgs: [ ] as [], isPhantom: Invite.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Invite.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Invite.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Invite.fromBcs( data, ), bcs: Invite.bcs, fromJSONField: (field: any) => Invite.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Invite.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Invite.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Invite.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Invite.fetch( client, id, ), new: ( fields: InviteFields, ) => { return new Invite( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Invite.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Invite>> { return phantom(Invite.reified( )); } static get p() { return Invite.phantom() }

 static get bcs() { return bcs.struct("Invite", {

 id: UID.bcs, multisig_id: ID.bcs

}) };

 static fromFields( fields: Record<string, any> ): Invite { return Invite.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), multisigId: decodeFromFields(ID.reified(), fields.multisig_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Invite { if (!isInvite(item.type)) { throw new Error("not a Invite type");

 }

 return Invite.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), multisigId: decodeFromFieldsWithTypes(ID.reified(), item.fields.multisig_id) } ) }

 static fromBcs( data: Uint8Array ): Invite { return Invite.fromFields( Invite.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,multisigId: this.multisigId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Invite { return Invite.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), multisigId: decodeFromJSONField(ID.reified(), field.multisigId) } ) }

 static fromJSON( json: Record<string, any> ): Invite { if (json.$typeName !== Invite.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Invite.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Invite { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isInvite(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Invite object`); } return Invite.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Invite { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isInvite(data.bcs.type)) { throw new Error(`object at is not a Invite object`); }

 return Invite.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Invite.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Invite> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Invite object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isInvite(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Invite object`); }

 return Invite.fromSuiObjectData( res.data ); }

 }

/* ============================== Registry =============================== */

export function isRegistry(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::account::Registry`; }

export interface RegistryFields { id: ToField<UID>; accounts: ToField<Table<"address", ToPhantom<ID>>> }

export type RegistryReified = Reified< Registry, RegistryFields >;

export class Registry implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::account::Registry`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Registry.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::account::Registry`; readonly $typeArgs: []; readonly $isPhantom = Registry.$isPhantom;

 readonly id: ToField<UID>; readonly accounts: ToField<Table<"address", ToPhantom<ID>>>

 private constructor(typeArgs: [], fields: RegistryFields, ) { this.$fullTypeName = composeSuiType( Registry.$typeName, ...typeArgs ) as `${typeof PKG_V1}::account::Registry`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.accounts = fields.accounts; }

 static reified( ): RegistryReified { return { typeName: Registry.$typeName, fullTypeName: composeSuiType( Registry.$typeName, ...[] ) as `${typeof PKG_V1}::account::Registry`, typeArgs: [ ] as [], isPhantom: Registry.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Registry.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Registry.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Registry.fromBcs( data, ), bcs: Registry.bcs, fromJSONField: (field: any) => Registry.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Registry.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Registry.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Registry.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Registry.fetch( client, id, ), new: ( fields: RegistryFields, ) => { return new Registry( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Registry.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Registry>> { return phantom(Registry.reified( )); } static get p() { return Registry.phantom() }

 static get bcs() { return bcs.struct("Registry", {

 id: UID.bcs, accounts: Table.bcs

}) };

 static fromFields( fields: Record<string, any> ): Registry { return Registry.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), accounts: decodeFromFields(Table.reified(reified.phantom("address"), reified.phantom(ID.reified())), fields.accounts) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Registry { if (!isRegistry(item.type)) { throw new Error("not a Registry type");

 }

 return Registry.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), accounts: decodeFromFieldsWithTypes(Table.reified(reified.phantom("address"), reified.phantom(ID.reified())), item.fields.accounts) } ) }

 static fromBcs( data: Uint8Array ): Registry { return Registry.fromFields( Registry.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,accounts: this.accounts.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Registry { return Registry.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), accounts: decodeFromJSONField(Table.reified(reified.phantom("address"), reified.phantom(ID.reified())), field.accounts) } ) }

 static fromJSON( json: Record<string, any> ): Registry { if (json.$typeName !== Registry.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Registry.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Registry { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isRegistry(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Registry object`); } return Registry.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Registry { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isRegistry(data.bcs.type)) { throw new Error(`object at is not a Registry object`); }

 return Registry.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Registry.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Registry> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Registry object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isRegistry(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Registry object`); }

 return Registry.fromSuiObjectData( res.data ); }

 }
