import * as reified from "../../_framework/reified";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {Bag} from "../../_dependencies/source/0x2/bag/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeArgument, ToTypeStr, TypeArgument, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom, toBcs} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {Vector} from "../../_framework/vector";
import {PKG_V1} from "../index";
import {Issuer} from "../issuer/structs";
import {BcsType, bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== Expired =============================== */

export function isExpired(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::proposals::Expired` + '<'); }

export interface ExpiredFields<Outcome extends TypeArgument> { actions: ToField<Bag>; outcome: ToField<Outcome> }

export type ExpiredReified<Outcome extends TypeArgument> = Reified< Expired<Outcome>, ExpiredFields<Outcome> >;

export class Expired<Outcome extends TypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::proposals::Expired`; static readonly $numTypeParams = 1; static readonly $isPhantom = [false,] as const;

 readonly $typeName = Expired.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::proposals::Expired<${ToTypeStr<Outcome>}>`; readonly $typeArgs: [ToTypeStr<Outcome>]; readonly $isPhantom = Expired.$isPhantom;

 readonly actions: ToField<Bag>; readonly outcome: ToField<Outcome>

 private constructor(typeArgs: [ToTypeStr<Outcome>], fields: ExpiredFields<Outcome>, ) { this.$fullTypeName = composeSuiType( Expired.$typeName, ...typeArgs ) as `${typeof PKG_V1}::proposals::Expired<${ToTypeStr<Outcome>}>`; this.$typeArgs = typeArgs;

 this.actions = fields.actions;; this.outcome = fields.outcome; }

 static reified<Outcome extends Reified<TypeArgument, any>>( Outcome: Outcome ): ExpiredReified<ToTypeArgument<Outcome>> { return { typeName: Expired.$typeName, fullTypeName: composeSuiType( Expired.$typeName, ...[extractType(Outcome)] ) as `${typeof PKG_V1}::proposals::Expired<${ToTypeStr<ToTypeArgument<Outcome>>}>`, typeArgs: [ extractType(Outcome) ] as [ToTypeStr<ToTypeArgument<Outcome>>], isPhantom: Expired.$isPhantom, reifiedTypeArgs: [Outcome], fromFields: (fields: Record<string, any>) => Expired.fromFields( Outcome, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Expired.fromFieldsWithTypes( Outcome, item, ), fromBcs: (data: Uint8Array) => Expired.fromBcs( Outcome, data, ), bcs: Expired.bcs(toBcs(Outcome)), fromJSONField: (field: any) => Expired.fromJSONField( Outcome, field, ), fromJSON: (json: Record<string, any>) => Expired.fromJSON( Outcome, json, ), fromSuiParsedData: (content: SuiParsedData) => Expired.fromSuiParsedData( Outcome, content, ), fromSuiObjectData: (content: SuiObjectData) => Expired.fromSuiObjectData( Outcome, content, ), fetch: async (client: SuiClient, id: string) => Expired.fetch( client, Outcome, id, ), new: ( fields: ExpiredFields<ToTypeArgument<Outcome>>, ) => { return new Expired( [extractType(Outcome)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Expired.reified }

 static phantom<Outcome extends Reified<TypeArgument, any>>( Outcome: Outcome ): PhantomReified<ToTypeStr<Expired<ToTypeArgument<Outcome>>>> { return phantom(Expired.reified( Outcome )); } static get p() { return Expired.phantom }

 static get bcs() { return <Outcome extends BcsType<any>>(Outcome: Outcome) => bcs.struct(`Expired<${Outcome.name}>`, {

 actions: Bag.bcs, outcome: Outcome

}) };

 static fromFields<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, fields: Record<string, any> ): Expired<ToTypeArgument<Outcome>> { return Expired.reified( typeArg, ).new( { actions: decodeFromFields(Bag.reified(), fields.actions), outcome: decodeFromFields(typeArg, fields.outcome) } ) }

 static fromFieldsWithTypes<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, item: FieldsWithTypes ): Expired<ToTypeArgument<Outcome>> { if (!isExpired(item.type)) { throw new Error("not a Expired type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Expired.reified( typeArg, ).new( { actions: decodeFromFieldsWithTypes(Bag.reified(), item.fields.actions), outcome: decodeFromFieldsWithTypes(typeArg, item.fields.outcome) } ) }

 static fromBcs<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, data: Uint8Array ): Expired<ToTypeArgument<Outcome>> { const typeArgs = [typeArg];

 return Expired.fromFields( typeArg, Expired.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 actions: this.actions.toJSONField(),outcome: fieldToJSON<Outcome>(this.$typeArgs[0], this.outcome),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, field: any ): Expired<ToTypeArgument<Outcome>> { return Expired.reified( typeArg, ).new( { actions: decodeFromJSONField(Bag.reified(), field.actions), outcome: decodeFromJSONField(typeArg, field.outcome) } ) }

 static fromJSON<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, json: Record<string, any> ): Expired<ToTypeArgument<Outcome>> { if (json.$typeName !== Expired.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Expired.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Expired.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, content: SuiParsedData ): Expired<ToTypeArgument<Outcome>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isExpired(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Expired object`); } return Expired.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, data: SuiObjectData ): Expired<ToTypeArgument<Outcome>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isExpired(data.bcs.type)) { throw new Error(`object at is not a Expired object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Expired.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Expired.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<Outcome extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: Outcome, id: string ): Promise<Expired<ToTypeArgument<Outcome>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Expired object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isExpired(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Expired object`); }

 return Expired.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== Proposal =============================== */

export function isProposal(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::proposals::Proposal` + '<'); }

export interface ProposalFields<Outcome extends TypeArgument> { issuer: ToField<Issuer>; key: ToField<String>; description: ToField<String>; executionTime: ToField<"u64">; expirationTime: ToField<"u64">; actions: ToField<Bag>; outcome: ToField<Outcome> }

export type ProposalReified<Outcome extends TypeArgument> = Reified< Proposal<Outcome>, ProposalFields<Outcome> >;

export class Proposal<Outcome extends TypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::proposals::Proposal`; static readonly $numTypeParams = 1; static readonly $isPhantom = [false,] as const;

 readonly $typeName = Proposal.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::proposals::Proposal<${ToTypeStr<Outcome>}>`; readonly $typeArgs: [ToTypeStr<Outcome>]; readonly $isPhantom = Proposal.$isPhantom;

 readonly issuer: ToField<Issuer>; readonly key: ToField<String>; readonly description: ToField<String>; readonly executionTime: ToField<"u64">; readonly expirationTime: ToField<"u64">; readonly actions: ToField<Bag>; readonly outcome: ToField<Outcome>

 private constructor(typeArgs: [ToTypeStr<Outcome>], fields: ProposalFields<Outcome>, ) { this.$fullTypeName = composeSuiType( Proposal.$typeName, ...typeArgs ) as `${typeof PKG_V1}::proposals::Proposal<${ToTypeStr<Outcome>}>`; this.$typeArgs = typeArgs;

 this.issuer = fields.issuer;; this.key = fields.key;; this.description = fields.description;; this.executionTime = fields.executionTime;; this.expirationTime = fields.expirationTime;; this.actions = fields.actions;; this.outcome = fields.outcome; }

 static reified<Outcome extends Reified<TypeArgument, any>>( Outcome: Outcome ): ProposalReified<ToTypeArgument<Outcome>> { return { typeName: Proposal.$typeName, fullTypeName: composeSuiType( Proposal.$typeName, ...[extractType(Outcome)] ) as `${typeof PKG_V1}::proposals::Proposal<${ToTypeStr<ToTypeArgument<Outcome>>}>`, typeArgs: [ extractType(Outcome) ] as [ToTypeStr<ToTypeArgument<Outcome>>], isPhantom: Proposal.$isPhantom, reifiedTypeArgs: [Outcome], fromFields: (fields: Record<string, any>) => Proposal.fromFields( Outcome, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Proposal.fromFieldsWithTypes( Outcome, item, ), fromBcs: (data: Uint8Array) => Proposal.fromBcs( Outcome, data, ), bcs: Proposal.bcs(toBcs(Outcome)), fromJSONField: (field: any) => Proposal.fromJSONField( Outcome, field, ), fromJSON: (json: Record<string, any>) => Proposal.fromJSON( Outcome, json, ), fromSuiParsedData: (content: SuiParsedData) => Proposal.fromSuiParsedData( Outcome, content, ), fromSuiObjectData: (content: SuiObjectData) => Proposal.fromSuiObjectData( Outcome, content, ), fetch: async (client: SuiClient, id: string) => Proposal.fetch( client, Outcome, id, ), new: ( fields: ProposalFields<ToTypeArgument<Outcome>>, ) => { return new Proposal( [extractType(Outcome)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Proposal.reified }

 static phantom<Outcome extends Reified<TypeArgument, any>>( Outcome: Outcome ): PhantomReified<ToTypeStr<Proposal<ToTypeArgument<Outcome>>>> { return phantom(Proposal.reified( Outcome )); } static get p() { return Proposal.phantom }

 static get bcs() { return <Outcome extends BcsType<any>>(Outcome: Outcome) => bcs.struct(`Proposal<${Outcome.name}>`, {

 issuer: Issuer.bcs, key: String.bcs, description: String.bcs, execution_time: bcs.u64(), expiration_time: bcs.u64(), actions: Bag.bcs, outcome: Outcome

}) };

 static fromFields<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, fields: Record<string, any> ): Proposal<ToTypeArgument<Outcome>> { return Proposal.reified( typeArg, ).new( { issuer: decodeFromFields(Issuer.reified(), fields.issuer), key: decodeFromFields(String.reified(), fields.key), description: decodeFromFields(String.reified(), fields.description), executionTime: decodeFromFields("u64", fields.execution_time), expirationTime: decodeFromFields("u64", fields.expiration_time), actions: decodeFromFields(Bag.reified(), fields.actions), outcome: decodeFromFields(typeArg, fields.outcome) } ) }

 static fromFieldsWithTypes<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, item: FieldsWithTypes ): Proposal<ToTypeArgument<Outcome>> { if (!isProposal(item.type)) { throw new Error("not a Proposal type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Proposal.reified( typeArg, ).new( { issuer: decodeFromFieldsWithTypes(Issuer.reified(), item.fields.issuer), key: decodeFromFieldsWithTypes(String.reified(), item.fields.key), description: decodeFromFieldsWithTypes(String.reified(), item.fields.description), executionTime: decodeFromFieldsWithTypes("u64", item.fields.execution_time), expirationTime: decodeFromFieldsWithTypes("u64", item.fields.expiration_time), actions: decodeFromFieldsWithTypes(Bag.reified(), item.fields.actions), outcome: decodeFromFieldsWithTypes(typeArg, item.fields.outcome) } ) }

 static fromBcs<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, data: Uint8Array ): Proposal<ToTypeArgument<Outcome>> { const typeArgs = [typeArg];

 return Proposal.fromFields( typeArg, Proposal.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 issuer: this.issuer.toJSONField(),key: this.key,description: this.description,executionTime: this.executionTime.toString(),expirationTime: this.expirationTime.toString(),actions: this.actions.toJSONField(),outcome: fieldToJSON<Outcome>(this.$typeArgs[0], this.outcome),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, field: any ): Proposal<ToTypeArgument<Outcome>> { return Proposal.reified( typeArg, ).new( { issuer: decodeFromJSONField(Issuer.reified(), field.issuer), key: decodeFromJSONField(String.reified(), field.key), description: decodeFromJSONField(String.reified(), field.description), executionTime: decodeFromJSONField("u64", field.executionTime), expirationTime: decodeFromJSONField("u64", field.expirationTime), actions: decodeFromJSONField(Bag.reified(), field.actions), outcome: decodeFromJSONField(typeArg, field.outcome) } ) }

 static fromJSON<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, json: Record<string, any> ): Proposal<ToTypeArgument<Outcome>> { if (json.$typeName !== Proposal.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Proposal.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Proposal.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, content: SuiParsedData ): Proposal<ToTypeArgument<Outcome>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isProposal(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Proposal object`); } return Proposal.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, data: SuiObjectData ): Proposal<ToTypeArgument<Outcome>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isProposal(data.bcs.type)) { throw new Error(`object at is not a Proposal object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Proposal.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Proposal.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<Outcome extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: Outcome, id: string ): Promise<Proposal<ToTypeArgument<Outcome>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Proposal object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isProposal(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Proposal object`); }

 return Proposal.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== Proposals =============================== */

export function isProposals(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::proposals::Proposals` + '<'); }

export interface ProposalsFields<Outcome extends TypeArgument> { inner: ToField<Vector<Proposal<Outcome>>> }

export type ProposalsReified<Outcome extends TypeArgument> = Reified< Proposals<Outcome>, ProposalsFields<Outcome> >;

export class Proposals<Outcome extends TypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::proposals::Proposals`; static readonly $numTypeParams = 1; static readonly $isPhantom = [false,] as const;

 readonly $typeName = Proposals.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::proposals::Proposals<${ToTypeStr<Outcome>}>`; readonly $typeArgs: [ToTypeStr<Outcome>]; readonly $isPhantom = Proposals.$isPhantom;

 readonly inner: ToField<Vector<Proposal<Outcome>>>

 private constructor(typeArgs: [ToTypeStr<Outcome>], fields: ProposalsFields<Outcome>, ) { this.$fullTypeName = composeSuiType( Proposals.$typeName, ...typeArgs ) as `${typeof PKG_V1}::proposals::Proposals<${ToTypeStr<Outcome>}>`; this.$typeArgs = typeArgs;

 this.inner = fields.inner; }

 static reified<Outcome extends Reified<TypeArgument, any>>( Outcome: Outcome ): ProposalsReified<ToTypeArgument<Outcome>> { return { typeName: Proposals.$typeName, fullTypeName: composeSuiType( Proposals.$typeName, ...[extractType(Outcome)] ) as `${typeof PKG_V1}::proposals::Proposals<${ToTypeStr<ToTypeArgument<Outcome>>}>`, typeArgs: [ extractType(Outcome) ] as [ToTypeStr<ToTypeArgument<Outcome>>], isPhantom: Proposals.$isPhantom, reifiedTypeArgs: [Outcome], fromFields: (fields: Record<string, any>) => Proposals.fromFields( Outcome, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Proposals.fromFieldsWithTypes( Outcome, item, ), fromBcs: (data: Uint8Array) => Proposals.fromBcs( Outcome, data, ), bcs: Proposals.bcs(toBcs(Outcome)), fromJSONField: (field: any) => Proposals.fromJSONField( Outcome, field, ), fromJSON: (json: Record<string, any>) => Proposals.fromJSON( Outcome, json, ), fromSuiParsedData: (content: SuiParsedData) => Proposals.fromSuiParsedData( Outcome, content, ), fromSuiObjectData: (content: SuiObjectData) => Proposals.fromSuiObjectData( Outcome, content, ), fetch: async (client: SuiClient, id: string) => Proposals.fetch( client, Outcome, id, ), new: ( fields: ProposalsFields<ToTypeArgument<Outcome>>, ) => { return new Proposals( [extractType(Outcome)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Proposals.reified }

 static phantom<Outcome extends Reified<TypeArgument, any>>( Outcome: Outcome ): PhantomReified<ToTypeStr<Proposals<ToTypeArgument<Outcome>>>> { return phantom(Proposals.reified( Outcome )); } static get p() { return Proposals.phantom }

 static get bcs() { return <Outcome extends BcsType<any>>(Outcome: Outcome) => bcs.struct(`Proposals<${Outcome.name}>`, {

 inner: bcs.vector(Proposal.bcs(Outcome))

}) };

 static fromFields<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, fields: Record<string, any> ): Proposals<ToTypeArgument<Outcome>> { return Proposals.reified( typeArg, ).new( { inner: decodeFromFields(reified.vector(Proposal.reified(typeArg)), fields.inner) } ) }

 static fromFieldsWithTypes<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, item: FieldsWithTypes ): Proposals<ToTypeArgument<Outcome>> { if (!isProposals(item.type)) { throw new Error("not a Proposals type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Proposals.reified( typeArg, ).new( { inner: decodeFromFieldsWithTypes(reified.vector(Proposal.reified(typeArg)), item.fields.inner) } ) }

 static fromBcs<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, data: Uint8Array ): Proposals<ToTypeArgument<Outcome>> { const typeArgs = [typeArg];

 return Proposals.fromFields( typeArg, Proposals.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 inner: fieldToJSON<Vector<Proposal<Outcome>>>(`vector<${Proposal.$typeName}<${this.$typeArgs[0]}>>`, this.inner),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, field: any ): Proposals<ToTypeArgument<Outcome>> { return Proposals.reified( typeArg, ).new( { inner: decodeFromJSONField(reified.vector(Proposal.reified(typeArg)), field.inner) } ) }

 static fromJSON<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, json: Record<string, any> ): Proposals<ToTypeArgument<Outcome>> { if (json.$typeName !== Proposals.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Proposals.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Proposals.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, content: SuiParsedData ): Proposals<ToTypeArgument<Outcome>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isProposals(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Proposals object`); } return Proposals.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, data: SuiObjectData ): Proposals<ToTypeArgument<Outcome>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isProposals(data.bcs.type)) { throw new Error(`object at is not a Proposals object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Proposals.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Proposals.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<Outcome extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: Outcome, id: string ): Promise<Proposals<ToTypeArgument<Outcome>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Proposals object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isProposals(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Proposals object`); }

 return Proposals.fromSuiObjectData( typeArg, res.data ); }

 }
