import * as reified from "../../_framework/reified";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {Bag} from "../../_dependencies/source/0x2/bag/structs";
import {VecSet} from "../../_dependencies/source/0x2/vec-set/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {Vector} from "../../_framework/vector";
import {Auth} from "../auth/structs";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== Approved =============================== */

export function isApproved(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::proposals::Approved`; }

export interface ApprovedFields { authIssuer: ToField<String>; authName: ToField<String>; name: ToField<String>; description: ToField<String> }

export type ApprovedReified = Reified< Approved, ApprovedFields >;

export class Approved implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::proposals::Approved`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Approved.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::proposals::Approved`; readonly $typeArgs: []; readonly $isPhantom = Approved.$isPhantom;

 readonly authIssuer: ToField<String>; readonly authName: ToField<String>; readonly name: ToField<String>; readonly description: ToField<String>

 private constructor(typeArgs: [], fields: ApprovedFields, ) { this.$fullTypeName = composeSuiType( Approved.$typeName, ...typeArgs ) as `${typeof PKG_V1}::proposals::Approved`; this.$typeArgs = typeArgs;

 this.authIssuer = fields.authIssuer;; this.authName = fields.authName;; this.name = fields.name;; this.description = fields.description; }

 static reified( ): ApprovedReified { return { typeName: Approved.$typeName, fullTypeName: composeSuiType( Approved.$typeName, ...[] ) as `${typeof PKG_V1}::proposals::Approved`, typeArgs: [ ] as [], isPhantom: Approved.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Approved.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Approved.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Approved.fromBcs( data, ), bcs: Approved.bcs, fromJSONField: (field: any) => Approved.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Approved.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Approved.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Approved.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Approved.fetch( client, id, ), new: ( fields: ApprovedFields, ) => { return new Approved( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Approved.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Approved>> { return phantom(Approved.reified( )); } static get p() { return Approved.phantom() }

 static get bcs() { return bcs.struct("Approved", {

 auth_issuer: String.bcs, auth_name: String.bcs, name: String.bcs, description: String.bcs

}) };

 static fromFields( fields: Record<string, any> ): Approved { return Approved.reified( ).new( { authIssuer: decodeFromFields(String.reified(), fields.auth_issuer), authName: decodeFromFields(String.reified(), fields.auth_name), name: decodeFromFields(String.reified(), fields.name), description: decodeFromFields(String.reified(), fields.description) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Approved { if (!isApproved(item.type)) { throw new Error("not a Approved type");

 }

 return Approved.reified( ).new( { authIssuer: decodeFromFieldsWithTypes(String.reified(), item.fields.auth_issuer), authName: decodeFromFieldsWithTypes(String.reified(), item.fields.auth_name), name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), description: decodeFromFieldsWithTypes(String.reified(), item.fields.description) } ) }

 static fromBcs( data: Uint8Array ): Approved { return Approved.fromFields( Approved.bcs.parse(data) ) }

 toJSONField() { return {

 authIssuer: this.authIssuer,authName: this.authName,name: this.name,description: this.description,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Approved { return Approved.reified( ).new( { authIssuer: decodeFromJSONField(String.reified(), field.authIssuer), authName: decodeFromJSONField(String.reified(), field.authName), name: decodeFromJSONField(String.reified(), field.name), description: decodeFromJSONField(String.reified(), field.description) } ) }

 static fromJSON( json: Record<string, any> ): Approved { if (json.$typeName !== Approved.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Approved.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Approved { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isApproved(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Approved object`); } return Approved.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Approved { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isApproved(data.bcs.type)) { throw new Error(`object at is not a Approved object`); }

 return Approved.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Approved.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Approved> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Approved object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isApproved(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Approved object`); }

 return Approved.fromSuiObjectData( res.data ); }

 }

/* ============================== Created =============================== */

export function isCreated(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::proposals::Created`; }

export interface CreatedFields { authIssuer: ToField<String>; authName: ToField<String>; name: ToField<String>; description: ToField<String> }

export type CreatedReified = Reified< Created, CreatedFields >;

export class Created implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::proposals::Created`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Created.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::proposals::Created`; readonly $typeArgs: []; readonly $isPhantom = Created.$isPhantom;

 readonly authIssuer: ToField<String>; readonly authName: ToField<String>; readonly name: ToField<String>; readonly description: ToField<String>

 private constructor(typeArgs: [], fields: CreatedFields, ) { this.$fullTypeName = composeSuiType( Created.$typeName, ...typeArgs ) as `${typeof PKG_V1}::proposals::Created`; this.$typeArgs = typeArgs;

 this.authIssuer = fields.authIssuer;; this.authName = fields.authName;; this.name = fields.name;; this.description = fields.description; }

 static reified( ): CreatedReified { return { typeName: Created.$typeName, fullTypeName: composeSuiType( Created.$typeName, ...[] ) as `${typeof PKG_V1}::proposals::Created`, typeArgs: [ ] as [], isPhantom: Created.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Created.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Created.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Created.fromBcs( data, ), bcs: Created.bcs, fromJSONField: (field: any) => Created.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Created.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Created.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Created.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Created.fetch( client, id, ), new: ( fields: CreatedFields, ) => { return new Created( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Created.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Created>> { return phantom(Created.reified( )); } static get p() { return Created.phantom() }

 static get bcs() { return bcs.struct("Created", {

 auth_issuer: String.bcs, auth_name: String.bcs, name: String.bcs, description: String.bcs

}) };

 static fromFields( fields: Record<string, any> ): Created { return Created.reified( ).new( { authIssuer: decodeFromFields(String.reified(), fields.auth_issuer), authName: decodeFromFields(String.reified(), fields.auth_name), name: decodeFromFields(String.reified(), fields.name), description: decodeFromFields(String.reified(), fields.description) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Created { if (!isCreated(item.type)) { throw new Error("not a Created type");

 }

 return Created.reified( ).new( { authIssuer: decodeFromFieldsWithTypes(String.reified(), item.fields.auth_issuer), authName: decodeFromFieldsWithTypes(String.reified(), item.fields.auth_name), name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), description: decodeFromFieldsWithTypes(String.reified(), item.fields.description) } ) }

 static fromBcs( data: Uint8Array ): Created { return Created.fromFields( Created.bcs.parse(data) ) }

 toJSONField() { return {

 authIssuer: this.authIssuer,authName: this.authName,name: this.name,description: this.description,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Created { return Created.reified( ).new( { authIssuer: decodeFromJSONField(String.reified(), field.authIssuer), authName: decodeFromJSONField(String.reified(), field.authName), name: decodeFromJSONField(String.reified(), field.name), description: decodeFromJSONField(String.reified(), field.description) } ) }

 static fromJSON( json: Record<string, any> ): Created { if (json.$typeName !== Created.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Created.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Created { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isCreated(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Created object`); } return Created.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Created { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isCreated(data.bcs.type)) { throw new Error(`object at is not a Created object`); }

 return Created.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Created.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Created> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Created object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isCreated(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Created object`); }

 return Created.fromSuiObjectData( res.data ); }

 }

/* ============================== Executed =============================== */

export function isExecuted(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::proposals::Executed`; }

export interface ExecutedFields { authIssuer: ToField<String>; authName: ToField<String>; name: ToField<String>; description: ToField<String> }

export type ExecutedReified = Reified< Executed, ExecutedFields >;

export class Executed implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::proposals::Executed`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Executed.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::proposals::Executed`; readonly $typeArgs: []; readonly $isPhantom = Executed.$isPhantom;

 readonly authIssuer: ToField<String>; readonly authName: ToField<String>; readonly name: ToField<String>; readonly description: ToField<String>

 private constructor(typeArgs: [], fields: ExecutedFields, ) { this.$fullTypeName = composeSuiType( Executed.$typeName, ...typeArgs ) as `${typeof PKG_V1}::proposals::Executed`; this.$typeArgs = typeArgs;

 this.authIssuer = fields.authIssuer;; this.authName = fields.authName;; this.name = fields.name;; this.description = fields.description; }

 static reified( ): ExecutedReified { return { typeName: Executed.$typeName, fullTypeName: composeSuiType( Executed.$typeName, ...[] ) as `${typeof PKG_V1}::proposals::Executed`, typeArgs: [ ] as [], isPhantom: Executed.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Executed.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Executed.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Executed.fromBcs( data, ), bcs: Executed.bcs, fromJSONField: (field: any) => Executed.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Executed.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Executed.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Executed.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Executed.fetch( client, id, ), new: ( fields: ExecutedFields, ) => { return new Executed( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Executed.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Executed>> { return phantom(Executed.reified( )); } static get p() { return Executed.phantom() }

 static get bcs() { return bcs.struct("Executed", {

 auth_issuer: String.bcs, auth_name: String.bcs, name: String.bcs, description: String.bcs

}) };

 static fromFields( fields: Record<string, any> ): Executed { return Executed.reified( ).new( { authIssuer: decodeFromFields(String.reified(), fields.auth_issuer), authName: decodeFromFields(String.reified(), fields.auth_name), name: decodeFromFields(String.reified(), fields.name), description: decodeFromFields(String.reified(), fields.description) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Executed { if (!isExecuted(item.type)) { throw new Error("not a Executed type");

 }

 return Executed.reified( ).new( { authIssuer: decodeFromFieldsWithTypes(String.reified(), item.fields.auth_issuer), authName: decodeFromFieldsWithTypes(String.reified(), item.fields.auth_name), name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), description: decodeFromFieldsWithTypes(String.reified(), item.fields.description) } ) }

 static fromBcs( data: Uint8Array ): Executed { return Executed.fromFields( Executed.bcs.parse(data) ) }

 toJSONField() { return {

 authIssuer: this.authIssuer,authName: this.authName,name: this.name,description: this.description,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Executed { return Executed.reified( ).new( { authIssuer: decodeFromJSONField(String.reified(), field.authIssuer), authName: decodeFromJSONField(String.reified(), field.authName), name: decodeFromJSONField(String.reified(), field.name), description: decodeFromJSONField(String.reified(), field.description) } ) }

 static fromJSON( json: Record<string, any> ): Executed { if (json.$typeName !== Executed.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Executed.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Executed { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isExecuted(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Executed object`); } return Executed.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Executed { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isExecuted(data.bcs.type)) { throw new Error(`object at is not a Executed object`); }

 return Executed.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Executed.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Executed> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Executed object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isExecuted(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Executed object`); }

 return Executed.fromSuiObjectData( res.data ); }

 }

/* ============================== Proposal =============================== */

export function isProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::proposals::Proposal`; }

export interface ProposalFields { auth: ToField<Auth>; name: ToField<String>; description: ToField<String>; expirationEpoch: ToField<"u64">; executionTime: ToField<"u64">; actions: ToField<Bag>; totalWeight: ToField<"u64">; roleWeight: ToField<"u64">; approved: ToField<VecSet<"address">> }

export type ProposalReified = Reified< Proposal, ProposalFields >;

export class Proposal implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::proposals::Proposal`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Proposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::proposals::Proposal`; readonly $typeArgs: []; readonly $isPhantom = Proposal.$isPhantom;

 readonly auth: ToField<Auth>; readonly name: ToField<String>; readonly description: ToField<String>; readonly expirationEpoch: ToField<"u64">; readonly executionTime: ToField<"u64">; readonly actions: ToField<Bag>; readonly totalWeight: ToField<"u64">; readonly roleWeight: ToField<"u64">; readonly approved: ToField<VecSet<"address">>

 private constructor(typeArgs: [], fields: ProposalFields, ) { this.$fullTypeName = composeSuiType( Proposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::proposals::Proposal`; this.$typeArgs = typeArgs;

 this.auth = fields.auth;; this.name = fields.name;; this.description = fields.description;; this.expirationEpoch = fields.expirationEpoch;; this.executionTime = fields.executionTime;; this.actions = fields.actions;; this.totalWeight = fields.totalWeight;; this.roleWeight = fields.roleWeight;; this.approved = fields.approved; }

 static reified( ): ProposalReified { return { typeName: Proposal.$typeName, fullTypeName: composeSuiType( Proposal.$typeName, ...[] ) as `${typeof PKG_V1}::proposals::Proposal`, typeArgs: [ ] as [], isPhantom: Proposal.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Proposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Proposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Proposal.fromBcs( data, ), bcs: Proposal.bcs, fromJSONField: (field: any) => Proposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Proposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Proposal.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Proposal.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Proposal.fetch( client, id, ), new: ( fields: ProposalFields, ) => { return new Proposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Proposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Proposal>> { return phantom(Proposal.reified( )); } static get p() { return Proposal.phantom() }

 static get bcs() { return bcs.struct("Proposal", {

 auth: Auth.bcs, name: String.bcs, description: String.bcs, expiration_epoch: bcs.u64(), execution_time: bcs.u64(), actions: Bag.bcs, total_weight: bcs.u64(), role_weight: bcs.u64(), approved: VecSet.bcs(bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }))

}) };

 static fromFields( fields: Record<string, any> ): Proposal { return Proposal.reified( ).new( { auth: decodeFromFields(Auth.reified(), fields.auth), name: decodeFromFields(String.reified(), fields.name), description: decodeFromFields(String.reified(), fields.description), expirationEpoch: decodeFromFields("u64", fields.expiration_epoch), executionTime: decodeFromFields("u64", fields.execution_time), actions: decodeFromFields(Bag.reified(), fields.actions), totalWeight: decodeFromFields("u64", fields.total_weight), roleWeight: decodeFromFields("u64", fields.role_weight), approved: decodeFromFields(VecSet.reified("address"), fields.approved) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Proposal { if (!isProposal(item.type)) { throw new Error("not a Proposal type");

 }

 return Proposal.reified( ).new( { auth: decodeFromFieldsWithTypes(Auth.reified(), item.fields.auth), name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), description: decodeFromFieldsWithTypes(String.reified(), item.fields.description), expirationEpoch: decodeFromFieldsWithTypes("u64", item.fields.expiration_epoch), executionTime: decodeFromFieldsWithTypes("u64", item.fields.execution_time), actions: decodeFromFieldsWithTypes(Bag.reified(), item.fields.actions), totalWeight: decodeFromFieldsWithTypes("u64", item.fields.total_weight), roleWeight: decodeFromFieldsWithTypes("u64", item.fields.role_weight), approved: decodeFromFieldsWithTypes(VecSet.reified("address"), item.fields.approved) } ) }

 static fromBcs( data: Uint8Array ): Proposal { return Proposal.fromFields( Proposal.bcs.parse(data) ) }

 toJSONField() { return {

 auth: this.auth.toJSONField(),name: this.name,description: this.description,expirationEpoch: this.expirationEpoch.toString(),executionTime: this.executionTime.toString(),actions: this.actions.toJSONField(),totalWeight: this.totalWeight.toString(),roleWeight: this.roleWeight.toString(),approved: this.approved.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Proposal { return Proposal.reified( ).new( { auth: decodeFromJSONField(Auth.reified(), field.auth), name: decodeFromJSONField(String.reified(), field.name), description: decodeFromJSONField(String.reified(), field.description), expirationEpoch: decodeFromJSONField("u64", field.expirationEpoch), executionTime: decodeFromJSONField("u64", field.executionTime), actions: decodeFromJSONField(Bag.reified(), field.actions), totalWeight: decodeFromJSONField("u64", field.totalWeight), roleWeight: decodeFromJSONField("u64", field.roleWeight), approved: decodeFromJSONField(VecSet.reified("address"), field.approved) } ) }

 static fromJSON( json: Record<string, any> ): Proposal { if (json.$typeName !== Proposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Proposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Proposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Proposal object`); } return Proposal.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Proposal { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isProposal(data.bcs.type)) { throw new Error(`object at is not a Proposal object`); }

 return Proposal.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Proposal.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Proposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Proposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Proposal object`); }

 return Proposal.fromSuiObjectData( res.data ); }

 }

/* ============================== Proposals =============================== */

export function isProposals(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::proposals::Proposals`; }

export interface ProposalsFields { inner: ToField<Vector<Proposal>> }

export type ProposalsReified = Reified< Proposals, ProposalsFields >;

export class Proposals implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::proposals::Proposals`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Proposals.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::proposals::Proposals`; readonly $typeArgs: []; readonly $isPhantom = Proposals.$isPhantom;

 readonly inner: ToField<Vector<Proposal>>

 private constructor(typeArgs: [], fields: ProposalsFields, ) { this.$fullTypeName = composeSuiType( Proposals.$typeName, ...typeArgs ) as `${typeof PKG_V1}::proposals::Proposals`; this.$typeArgs = typeArgs;

 this.inner = fields.inner; }

 static reified( ): ProposalsReified { return { typeName: Proposals.$typeName, fullTypeName: composeSuiType( Proposals.$typeName, ...[] ) as `${typeof PKG_V1}::proposals::Proposals`, typeArgs: [ ] as [], isPhantom: Proposals.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Proposals.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Proposals.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Proposals.fromBcs( data, ), bcs: Proposals.bcs, fromJSONField: (field: any) => Proposals.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Proposals.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Proposals.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Proposals.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Proposals.fetch( client, id, ), new: ( fields: ProposalsFields, ) => { return new Proposals( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Proposals.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Proposals>> { return phantom(Proposals.reified( )); } static get p() { return Proposals.phantom() }

 static get bcs() { return bcs.struct("Proposals", {

 inner: bcs.vector(Proposal.bcs)

}) };

 static fromFields( fields: Record<string, any> ): Proposals { return Proposals.reified( ).new( { inner: decodeFromFields(reified.vector(Proposal.reified()), fields.inner) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Proposals { if (!isProposals(item.type)) { throw new Error("not a Proposals type");

 }

 return Proposals.reified( ).new( { inner: decodeFromFieldsWithTypes(reified.vector(Proposal.reified()), item.fields.inner) } ) }

 static fromBcs( data: Uint8Array ): Proposals { return Proposals.fromFields( Proposals.bcs.parse(data) ) }

 toJSONField() { return {

 inner: fieldToJSON<Vector<Proposal>>(`vector<${Proposal.$typeName}>`, this.inner),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Proposals { return Proposals.reified( ).new( { inner: decodeFromJSONField(reified.vector(Proposal.reified()), field.inner) } ) }

 static fromJSON( json: Record<string, any> ): Proposals { if (json.$typeName !== Proposals.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Proposals.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Proposals { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isProposals(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Proposals object`); } return Proposals.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Proposals { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isProposals(data.bcs.type)) { throw new Error(`object at is not a Proposals object`); }

 return Proposals.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Proposals.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Proposals> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Proposals object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isProposals(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Proposals object`); }

 return Proposals.fromSuiObjectData( res.data ); }

 }
