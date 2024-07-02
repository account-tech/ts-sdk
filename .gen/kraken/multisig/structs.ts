import {Option} from "../../_dependencies/source/0x1/option/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {TypeName} from "../../_dependencies/source/0x1/type-name/structs";
import {Bag} from "../../_dependencies/source/0x2/bag/structs";
import {ID, UID} from "../../_dependencies/source/0x2/object/structs";
import {VecMap} from "../../_dependencies/source/0x2/vec-map/structs";
import {VecSet} from "../../_dependencies/source/0x2/vec-set/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs, fromB64, fromHEX, toHEX} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== Executable =============================== */

export function isExecutable(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::multisig::Executable`; }

export interface ExecutableFields { multisigAddr: ToField<"address">; moduleWitness: ToField<TypeName>; nextToDestroy: ToField<"u64">; actions: ToField<Bag> }

export type ExecutableReified = Reified< Executable, ExecutableFields >;

export class Executable implements StructClass { static readonly $typeName = `${PKG_V1}::multisig::Executable`; static readonly $numTypeParams = 0;

 readonly $typeName = Executable.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::multisig::Executable`;

 readonly $typeArgs: [];

 readonly multisigAddr: ToField<"address">; readonly moduleWitness: ToField<TypeName>; readonly nextToDestroy: ToField<"u64">; readonly actions: ToField<Bag>

 private constructor(typeArgs: [], fields: ExecutableFields, ) { this.$fullTypeName = composeSuiType( Executable.$typeName, ...typeArgs ) as `${typeof PKG_V1}::multisig::Executable`; this.$typeArgs = typeArgs;

 this.multisigAddr = fields.multisigAddr;; this.moduleWitness = fields.moduleWitness;; this.nextToDestroy = fields.nextToDestroy;; this.actions = fields.actions; }

 static reified( ): ExecutableReified { return { typeName: Executable.$typeName, fullTypeName: composeSuiType( Executable.$typeName, ...[] ) as `${typeof PKG_V1}::multisig::Executable`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Executable.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Executable.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Executable.fromBcs( data, ), bcs: Executable.bcs, fromJSONField: (field: any) => Executable.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Executable.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Executable.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Executable.fetch( client, id, ), new: ( fields: ExecutableFields, ) => { return new Executable( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Executable.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Executable>> { return phantom(Executable.reified( )); } static get p() { return Executable.phantom() }

 static get bcs() { return bcs.struct("Executable", {

 multisig_addr: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), module_witness: TypeName.bcs, next_to_destroy: bcs.u64(), actions: Bag.bcs

}) };

 static fromFields( fields: Record<string, any> ): Executable { return Executable.reified( ).new( { multisigAddr: decodeFromFields("address", fields.multisig_addr), moduleWitness: decodeFromFields(TypeName.reified(), fields.module_witness), nextToDestroy: decodeFromFields("u64", fields.next_to_destroy), actions: decodeFromFields(Bag.reified(), fields.actions) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Executable { if (!isExecutable(item.type)) { throw new Error("not a Executable type");

 }

 return Executable.reified( ).new( { multisigAddr: decodeFromFieldsWithTypes("address", item.fields.multisig_addr), moduleWitness: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.module_witness), nextToDestroy: decodeFromFieldsWithTypes("u64", item.fields.next_to_destroy), actions: decodeFromFieldsWithTypes(Bag.reified(), item.fields.actions) } ) }

 static fromBcs( data: Uint8Array ): Executable { return Executable.fromFields( Executable.bcs.parse(data) ) }

 toJSONField() { return {

 multisigAddr: this.multisigAddr,moduleWitness: this.moduleWitness.toJSONField(),nextToDestroy: this.nextToDestroy.toString(),actions: this.actions.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Executable { return Executable.reified( ).new( { multisigAddr: decodeFromJSONField("address", field.multisigAddr), moduleWitness: decodeFromJSONField(TypeName.reified(), field.moduleWitness), nextToDestroy: decodeFromJSONField("u64", field.nextToDestroy), actions: decodeFromJSONField(Bag.reified(), field.actions) } ) }

 static fromJSON( json: Record<string, any> ): Executable { if (json.$typeName !== Executable.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Executable.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Executable { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isExecutable(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Executable object`); } return Executable.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Executable> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Executable object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isExecutable(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Executable object`); }
 return Executable.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Member =============================== */

export function isMember(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::multisig::Member`; }

export interface MemberFields { weight: ToField<"u64">; accountId: ToField<Option<ID>> }

export type MemberReified = Reified< Member, MemberFields >;

export class Member implements StructClass { static readonly $typeName = `${PKG_V1}::multisig::Member`; static readonly $numTypeParams = 0;

 readonly $typeName = Member.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::multisig::Member`;

 readonly $typeArgs: [];

 readonly weight: ToField<"u64">; readonly accountId: ToField<Option<ID>>

 private constructor(typeArgs: [], fields: MemberFields, ) { this.$fullTypeName = composeSuiType( Member.$typeName, ...typeArgs ) as `${typeof PKG_V1}::multisig::Member`; this.$typeArgs = typeArgs;

 this.weight = fields.weight;; this.accountId = fields.accountId; }

 static reified( ): MemberReified { return { typeName: Member.$typeName, fullTypeName: composeSuiType( Member.$typeName, ...[] ) as `${typeof PKG_V1}::multisig::Member`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Member.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Member.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Member.fromBcs( data, ), bcs: Member.bcs, fromJSONField: (field: any) => Member.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Member.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Member.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Member.fetch( client, id, ), new: ( fields: MemberFields, ) => { return new Member( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Member.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Member>> { return phantom(Member.reified( )); } static get p() { return Member.phantom() }

 static get bcs() { return bcs.struct("Member", {

 weight: bcs.u64(), account_id: Option.bcs(ID.bcs)

}) };

 static fromFields( fields: Record<string, any> ): Member { return Member.reified( ).new( { weight: decodeFromFields("u64", fields.weight), accountId: decodeFromFields(Option.reified(ID.reified()), fields.account_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Member { if (!isMember(item.type)) { throw new Error("not a Member type");

 }

 return Member.reified( ).new( { weight: decodeFromFieldsWithTypes("u64", item.fields.weight), accountId: decodeFromFieldsWithTypes(Option.reified(ID.reified()), item.fields.account_id) } ) }

 static fromBcs( data: Uint8Array ): Member { return Member.fromFields( Member.bcs.parse(data) ) }

 toJSONField() { return {

 weight: this.weight.toString(),accountId: fieldToJSON<Option<ID>>(`${Option.$typeName}<${ID.$typeName}>`, this.accountId),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Member { return Member.reified( ).new( { weight: decodeFromJSONField("u64", field.weight), accountId: decodeFromJSONField(Option.reified(ID.reified()), field.accountId) } ) }

 static fromJSON( json: Record<string, any> ): Member { if (json.$typeName !== Member.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Member.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Member { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMember(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Member object`); } return Member.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Member> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Member object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMember(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Member object`); }
 return Member.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Multisig =============================== */

export function isMultisig(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::multisig::Multisig`; }

export interface MultisigFields { id: ToField<UID>; version: ToField<"u64">; name: ToField<String>; threshold: ToField<"u64">; totalWeight: ToField<"u64">; members: ToField<VecMap<"address", Member>>; proposals: ToField<VecMap<String, Proposal>> }

export type MultisigReified = Reified< Multisig, MultisigFields >;

export class Multisig implements StructClass { static readonly $typeName = `${PKG_V1}::multisig::Multisig`; static readonly $numTypeParams = 0;

 readonly $typeName = Multisig.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::multisig::Multisig`;

 readonly $typeArgs: [];

 readonly id: ToField<UID>; readonly version: ToField<"u64">; readonly name: ToField<String>; readonly threshold: ToField<"u64">; readonly totalWeight: ToField<"u64">; readonly members: ToField<VecMap<"address", Member>>; readonly proposals: ToField<VecMap<String, Proposal>>

 private constructor(typeArgs: [], fields: MultisigFields, ) { this.$fullTypeName = composeSuiType( Multisig.$typeName, ...typeArgs ) as `${typeof PKG_V1}::multisig::Multisig`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.version = fields.version;; this.name = fields.name;; this.threshold = fields.threshold;; this.totalWeight = fields.totalWeight;; this.members = fields.members;; this.proposals = fields.proposals; }

 static reified( ): MultisigReified { return { typeName: Multisig.$typeName, fullTypeName: composeSuiType( Multisig.$typeName, ...[] ) as `${typeof PKG_V1}::multisig::Multisig`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Multisig.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Multisig.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Multisig.fromBcs( data, ), bcs: Multisig.bcs, fromJSONField: (field: any) => Multisig.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Multisig.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Multisig.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Multisig.fetch( client, id, ), new: ( fields: MultisigFields, ) => { return new Multisig( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Multisig.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Multisig>> { return phantom(Multisig.reified( )); } static get p() { return Multisig.phantom() }

 static get bcs() { return bcs.struct("Multisig", {

 id: UID.bcs, version: bcs.u64(), name: String.bcs, threshold: bcs.u64(), total_weight: bcs.u64(), members: VecMap.bcs(bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), Member.bcs), proposals: VecMap.bcs(String.bcs, Proposal.bcs)

}) };

 static fromFields( fields: Record<string, any> ): Multisig { return Multisig.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), version: decodeFromFields("u64", fields.version), name: decodeFromFields(String.reified(), fields.name), threshold: decodeFromFields("u64", fields.threshold), totalWeight: decodeFromFields("u64", fields.total_weight), members: decodeFromFields(VecMap.reified("address", Member.reified()), fields.members), proposals: decodeFromFields(VecMap.reified(String.reified(), Proposal.reified()), fields.proposals) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Multisig { if (!isMultisig(item.type)) { throw new Error("not a Multisig type");

 }

 return Multisig.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), version: decodeFromFieldsWithTypes("u64", item.fields.version), name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), threshold: decodeFromFieldsWithTypes("u64", item.fields.threshold), totalWeight: decodeFromFieldsWithTypes("u64", item.fields.total_weight), members: decodeFromFieldsWithTypes(VecMap.reified("address", Member.reified()), item.fields.members), proposals: decodeFromFieldsWithTypes(VecMap.reified(String.reified(), Proposal.reified()), item.fields.proposals) } ) }

 static fromBcs( data: Uint8Array ): Multisig { return Multisig.fromFields( Multisig.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,version: this.version.toString(),name: this.name,threshold: this.threshold.toString(),totalWeight: this.totalWeight.toString(),members: this.members.toJSONField(),proposals: this.proposals.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Multisig { return Multisig.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), version: decodeFromJSONField("u64", field.version), name: decodeFromJSONField(String.reified(), field.name), threshold: decodeFromJSONField("u64", field.threshold), totalWeight: decodeFromJSONField("u64", field.totalWeight), members: decodeFromJSONField(VecMap.reified("address", Member.reified()), field.members), proposals: decodeFromJSONField(VecMap.reified(String.reified(), Proposal.reified()), field.proposals) } ) }

 static fromJSON( json: Record<string, any> ): Multisig { if (json.$typeName !== Multisig.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Multisig.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Multisig { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMultisig(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Multisig object`); } return Multisig.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Multisig> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Multisig object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMultisig(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Multisig object`); }
 return Multisig.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Proposal =============================== */

export function isProposal(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::multisig::Proposal`; }

export interface ProposalFields { id: ToField<UID>; moduleWitness: ToField<TypeName>; description: ToField<String>; expirationEpoch: ToField<"u64">; executionTime: ToField<"u64">; actions: ToField<Bag>; approvalWeight: ToField<"u64">; approved: ToField<VecSet<"address">> }

export type ProposalReified = Reified< Proposal, ProposalFields >;

export class Proposal implements StructClass { static readonly $typeName = `${PKG_V1}::multisig::Proposal`; static readonly $numTypeParams = 0;

 readonly $typeName = Proposal.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::multisig::Proposal`;

 readonly $typeArgs: [];

 readonly id: ToField<UID>; readonly moduleWitness: ToField<TypeName>; readonly description: ToField<String>; readonly expirationEpoch: ToField<"u64">; readonly executionTime: ToField<"u64">; readonly actions: ToField<Bag>; readonly approvalWeight: ToField<"u64">; readonly approved: ToField<VecSet<"address">>

 private constructor(typeArgs: [], fields: ProposalFields, ) { this.$fullTypeName = composeSuiType( Proposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::multisig::Proposal`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.moduleWitness = fields.moduleWitness;; this.description = fields.description;; this.expirationEpoch = fields.expirationEpoch;; this.executionTime = fields.executionTime;; this.actions = fields.actions;; this.approvalWeight = fields.approvalWeight;; this.approved = fields.approved; }

 static reified( ): ProposalReified { return { typeName: Proposal.$typeName, fullTypeName: composeSuiType( Proposal.$typeName, ...[] ) as `${typeof PKG_V1}::multisig::Proposal`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Proposal.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Proposal.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Proposal.fromBcs( data, ), bcs: Proposal.bcs, fromJSONField: (field: any) => Proposal.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Proposal.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Proposal.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Proposal.fetch( client, id, ), new: ( fields: ProposalFields, ) => { return new Proposal( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Proposal.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Proposal>> { return phantom(Proposal.reified( )); } static get p() { return Proposal.phantom() }

 static get bcs() { return bcs.struct("Proposal", {

 id: UID.bcs, module_witness: TypeName.bcs, description: String.bcs, expiration_epoch: bcs.u64(), execution_time: bcs.u64(), actions: Bag.bcs, approval_weight: bcs.u64(), approved: VecSet.bcs(bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }))

}) };

 static fromFields( fields: Record<string, any> ): Proposal { return Proposal.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), moduleWitness: decodeFromFields(TypeName.reified(), fields.module_witness), description: decodeFromFields(String.reified(), fields.description), expirationEpoch: decodeFromFields("u64", fields.expiration_epoch), executionTime: decodeFromFields("u64", fields.execution_time), actions: decodeFromFields(Bag.reified(), fields.actions), approvalWeight: decodeFromFields("u64", fields.approval_weight), approved: decodeFromFields(VecSet.reified("address"), fields.approved) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Proposal { if (!isProposal(item.type)) { throw new Error("not a Proposal type");

 }

 return Proposal.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), moduleWitness: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.module_witness), description: decodeFromFieldsWithTypes(String.reified(), item.fields.description), expirationEpoch: decodeFromFieldsWithTypes("u64", item.fields.expiration_epoch), executionTime: decodeFromFieldsWithTypes("u64", item.fields.execution_time), actions: decodeFromFieldsWithTypes(Bag.reified(), item.fields.actions), approvalWeight: decodeFromFieldsWithTypes("u64", item.fields.approval_weight), approved: decodeFromFieldsWithTypes(VecSet.reified("address"), item.fields.approved) } ) }

 static fromBcs( data: Uint8Array ): Proposal { return Proposal.fromFields( Proposal.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,moduleWitness: this.moduleWitness.toJSONField(),description: this.description,expirationEpoch: this.expirationEpoch.toString(),executionTime: this.executionTime.toString(),actions: this.actions.toJSONField(),approvalWeight: this.approvalWeight.toString(),approved: this.approved.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Proposal { return Proposal.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), moduleWitness: decodeFromJSONField(TypeName.reified(), field.moduleWitness), description: decodeFromJSONField(String.reified(), field.description), expirationEpoch: decodeFromJSONField("u64", field.expirationEpoch), executionTime: decodeFromJSONField("u64", field.executionTime), actions: decodeFromJSONField(Bag.reified(), field.actions), approvalWeight: decodeFromJSONField("u64", field.approvalWeight), approved: decodeFromJSONField(VecSet.reified("address"), field.approved) } ) }

 static fromJSON( json: Record<string, any> ): Proposal { if (json.$typeName !== Proposal.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Proposal.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Proposal { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Proposal object`); } return Proposal.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Proposal> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Proposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Proposal object`); }
 return Proposal.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
