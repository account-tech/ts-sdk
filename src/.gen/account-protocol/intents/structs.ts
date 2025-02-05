import * as reified from "../../_framework/reified";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {Bag} from "../../_dependencies/source/0x2/bag/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {VecSet} from "../../_dependencies/source/0x2/vec-set/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeArgument, ToTypeStr, TypeArgument, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom, toBcs} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {Vector} from "../../_framework/vector";
import {PKG_V1} from "../index";
import {Issuer} from "../issuer/structs";
import {BcsType, bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== Expired =============================== */

export function isExpired(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::intents::Expired`; }

export interface ExpiredFields { key: ToField<String>; issuer: ToField<Issuer>; startIndex: ToField<"u64">; actions: ToField<Bag> }

export type ExpiredReified = Reified< Expired, ExpiredFields >;

export class Expired implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::intents::Expired`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Expired.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::intents::Expired`; readonly $typeArgs: []; readonly $isPhantom = Expired.$isPhantom;

 readonly key: ToField<String>; readonly issuer: ToField<Issuer>; readonly startIndex: ToField<"u64">; readonly actions: ToField<Bag>

 private constructor(typeArgs: [], fields: ExpiredFields, ) { this.$fullTypeName = composeSuiType( Expired.$typeName, ...typeArgs ) as `${typeof PKG_V1}::intents::Expired`; this.$typeArgs = typeArgs;

 this.key = fields.key;; this.issuer = fields.issuer;; this.startIndex = fields.startIndex;; this.actions = fields.actions; }

 static reified( ): ExpiredReified { return { typeName: Expired.$typeName, fullTypeName: composeSuiType( Expired.$typeName, ...[] ) as `${typeof PKG_V1}::intents::Expired`, typeArgs: [ ] as [], isPhantom: Expired.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Expired.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Expired.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Expired.fromBcs( data, ), bcs: Expired.bcs, fromJSONField: (field: any) => Expired.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Expired.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Expired.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Expired.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Expired.fetch( client, id, ), new: ( fields: ExpiredFields, ) => { return new Expired( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Expired.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Expired>> { return phantom(Expired.reified( )); } static get p() { return Expired.phantom() }

 static get bcs() { return bcs.struct("Expired", {

 key: String.bcs, issuer: Issuer.bcs, start_index: bcs.u64(), actions: Bag.bcs

}) };

 static fromFields( fields: Record<string, any> ): Expired { return Expired.reified( ).new( { key: decodeFromFields(String.reified(), fields.key), issuer: decodeFromFields(Issuer.reified(), fields.issuer), startIndex: decodeFromFields("u64", fields.start_index), actions: decodeFromFields(Bag.reified(), fields.actions) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Expired { if (!isExpired(item.type)) { throw new Error("not a Expired type");

 }

 return Expired.reified( ).new( { key: decodeFromFieldsWithTypes(String.reified(), item.fields.key), issuer: decodeFromFieldsWithTypes(Issuer.reified(), item.fields.issuer), startIndex: decodeFromFieldsWithTypes("u64", item.fields.start_index), actions: decodeFromFieldsWithTypes(Bag.reified(), item.fields.actions) } ) }

 static fromBcs( data: Uint8Array ): Expired { return Expired.fromFields( Expired.bcs.parse(data) ) }

 toJSONField() { return {

 key: this.key,issuer: this.issuer.toJSONField(),startIndex: this.startIndex.toString(),actions: this.actions.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Expired { return Expired.reified( ).new( { key: decodeFromJSONField(String.reified(), field.key), issuer: decodeFromJSONField(Issuer.reified(), field.issuer), startIndex: decodeFromJSONField("u64", field.startIndex), actions: decodeFromJSONField(Bag.reified(), field.actions) } ) }

 static fromJSON( json: Record<string, any> ): Expired { if (json.$typeName !== Expired.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Expired.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Expired { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isExpired(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Expired object`); } return Expired.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Expired { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isExpired(data.bcs.type)) { throw new Error(`object at is not a Expired object`); }

 return Expired.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Expired.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Expired> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Expired object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isExpired(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Expired object`); }

 return Expired.fromSuiObjectData( res.data ); }

 }

/* ============================== Intent =============================== */

export function isIntent(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::intents::Intent` + '<'); }

export interface IntentFields<Outcome extends TypeArgument> { issuer: ToField<Issuer>; key: ToField<String>; description: ToField<String>; executionTimes: ToField<Vector<"u64">>; expirationTime: ToField<"u64">; role: ToField<String>; actions: ToField<Bag>; outcome: ToField<Outcome> }

export type IntentReified<Outcome extends TypeArgument> = Reified< Intent<Outcome>, IntentFields<Outcome> >;

export class Intent<Outcome extends TypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::intents::Intent`; static readonly $numTypeParams = 1; static readonly $isPhantom = [false,] as const;

 readonly $typeName = Intent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::intents::Intent<${ToTypeStr<Outcome>}>`; readonly $typeArgs: [ToTypeStr<Outcome>]; readonly $isPhantom = Intent.$isPhantom;

 readonly issuer: ToField<Issuer>; readonly key: ToField<String>; readonly description: ToField<String>; readonly executionTimes: ToField<Vector<"u64">>; readonly expirationTime: ToField<"u64">; readonly role: ToField<String>; readonly actions: ToField<Bag>; readonly outcome: ToField<Outcome>

 private constructor(typeArgs: [ToTypeStr<Outcome>], fields: IntentFields<Outcome>, ) { this.$fullTypeName = composeSuiType( Intent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::intents::Intent<${ToTypeStr<Outcome>}>`; this.$typeArgs = typeArgs;

 this.issuer = fields.issuer;; this.key = fields.key;; this.description = fields.description;; this.executionTimes = fields.executionTimes;; this.expirationTime = fields.expirationTime;; this.role = fields.role;; this.actions = fields.actions;; this.outcome = fields.outcome; }

 static reified<Outcome extends Reified<TypeArgument, any>>( Outcome: Outcome ): IntentReified<ToTypeArgument<Outcome>> { return { typeName: Intent.$typeName, fullTypeName: composeSuiType( Intent.$typeName, ...[extractType(Outcome)] ) as `${typeof PKG_V1}::intents::Intent<${ToTypeStr<ToTypeArgument<Outcome>>}>`, typeArgs: [ extractType(Outcome) ] as [ToTypeStr<ToTypeArgument<Outcome>>], isPhantom: Intent.$isPhantom, reifiedTypeArgs: [Outcome], fromFields: (fields: Record<string, any>) => Intent.fromFields( Outcome, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Intent.fromFieldsWithTypes( Outcome, item, ), fromBcs: (data: Uint8Array) => Intent.fromBcs( Outcome, data, ), bcs: Intent.bcs(toBcs(Outcome)), fromJSONField: (field: any) => Intent.fromJSONField( Outcome, field, ), fromJSON: (json: Record<string, any>) => Intent.fromJSON( Outcome, json, ), fromSuiParsedData: (content: SuiParsedData) => Intent.fromSuiParsedData( Outcome, content, ), fromSuiObjectData: (content: SuiObjectData) => Intent.fromSuiObjectData( Outcome, content, ), fetch: async (client: SuiClient, id: string) => Intent.fetch( client, Outcome, id, ), new: ( fields: IntentFields<ToTypeArgument<Outcome>>, ) => { return new Intent( [extractType(Outcome)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Intent.reified }

 static phantom<Outcome extends Reified<TypeArgument, any>>( Outcome: Outcome ): PhantomReified<ToTypeStr<Intent<ToTypeArgument<Outcome>>>> { return phantom(Intent.reified( Outcome )); } static get p() { return Intent.phantom }

 static get bcs() { return <Outcome extends BcsType<any>>(Outcome: Outcome) => bcs.struct(`Intent<${Outcome.name}>`, {

 issuer: Issuer.bcs, key: String.bcs, description: String.bcs, execution_times: bcs.vector(bcs.u64()), expiration_time: bcs.u64(), role: String.bcs, actions: Bag.bcs, outcome: Outcome

}) };

 static fromFields<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, fields: Record<string, any> ): Intent<ToTypeArgument<Outcome>> { return Intent.reified( typeArg, ).new( { issuer: decodeFromFields(Issuer.reified(), fields.issuer), key: decodeFromFields(String.reified(), fields.key), description: decodeFromFields(String.reified(), fields.description), executionTimes: decodeFromFields(reified.vector("u64"), fields.execution_times), expirationTime: decodeFromFields("u64", fields.expiration_time), role: decodeFromFields(String.reified(), fields.role), actions: decodeFromFields(Bag.reified(), fields.actions), outcome: decodeFromFields(typeArg, fields.outcome) } ) }

 static fromFieldsWithTypes<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, item: FieldsWithTypes ): Intent<ToTypeArgument<Outcome>> { if (!isIntent(item.type)) { throw new Error("not a Intent type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Intent.reified( typeArg, ).new( { issuer: decodeFromFieldsWithTypes(Issuer.reified(), item.fields.issuer), key: decodeFromFieldsWithTypes(String.reified(), item.fields.key), description: decodeFromFieldsWithTypes(String.reified(), item.fields.description), executionTimes: decodeFromFieldsWithTypes(reified.vector("u64"), item.fields.execution_times), expirationTime: decodeFromFieldsWithTypes("u64", item.fields.expiration_time), role: decodeFromFieldsWithTypes(String.reified(), item.fields.role), actions: decodeFromFieldsWithTypes(Bag.reified(), item.fields.actions), outcome: decodeFromFieldsWithTypes(typeArg, item.fields.outcome) } ) }

 static fromBcs<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, data: Uint8Array ): Intent<ToTypeArgument<Outcome>> { const typeArgs = [typeArg];

 return Intent.fromFields( typeArg, Intent.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 issuer: this.issuer.toJSONField(),key: this.key,description: this.description,executionTimes: fieldToJSON<Vector<"u64">>(`vector<u64>`, this.executionTimes),expirationTime: this.expirationTime.toString(),role: this.role,actions: this.actions.toJSONField(),outcome: fieldToJSON<Outcome>(this.$typeArgs[0], this.outcome),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, field: any ): Intent<ToTypeArgument<Outcome>> { return Intent.reified( typeArg, ).new( { issuer: decodeFromJSONField(Issuer.reified(), field.issuer), key: decodeFromJSONField(String.reified(), field.key), description: decodeFromJSONField(String.reified(), field.description), executionTimes: decodeFromJSONField(reified.vector("u64"), field.executionTimes), expirationTime: decodeFromJSONField("u64", field.expirationTime), role: decodeFromJSONField(String.reified(), field.role), actions: decodeFromJSONField(Bag.reified(), field.actions), outcome: decodeFromJSONField(typeArg, field.outcome) } ) }

 static fromJSON<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, json: Record<string, any> ): Intent<ToTypeArgument<Outcome>> { if (json.$typeName !== Intent.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Intent.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Intent.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, content: SuiParsedData ): Intent<ToTypeArgument<Outcome>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isIntent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Intent object`); } return Intent.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, data: SuiObjectData ): Intent<ToTypeArgument<Outcome>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isIntent(data.bcs.type)) { throw new Error(`object at is not a Intent object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Intent.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Intent.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<Outcome extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: Outcome, id: string ): Promise<Intent<ToTypeArgument<Outcome>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Intent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isIntent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Intent object`); }

 return Intent.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== Intents =============================== */

export function isIntents(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::intents::Intents` + '<'); }

export interface IntentsFields<Outcome extends TypeArgument> { inner: ToField<Vector<Intent<Outcome>>>; locked: ToField<VecSet<ID>> }

export type IntentsReified<Outcome extends TypeArgument> = Reified< Intents<Outcome>, IntentsFields<Outcome> >;

export class Intents<Outcome extends TypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::intents::Intents`; static readonly $numTypeParams = 1; static readonly $isPhantom = [false,] as const;

 readonly $typeName = Intents.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::intents::Intents<${ToTypeStr<Outcome>}>`; readonly $typeArgs: [ToTypeStr<Outcome>]; readonly $isPhantom = Intents.$isPhantom;

 readonly inner: ToField<Vector<Intent<Outcome>>>; readonly locked: ToField<VecSet<ID>>

 private constructor(typeArgs: [ToTypeStr<Outcome>], fields: IntentsFields<Outcome>, ) { this.$fullTypeName = composeSuiType( Intents.$typeName, ...typeArgs ) as `${typeof PKG_V1}::intents::Intents<${ToTypeStr<Outcome>}>`; this.$typeArgs = typeArgs;

 this.inner = fields.inner;; this.locked = fields.locked; }

 static reified<Outcome extends Reified<TypeArgument, any>>( Outcome: Outcome ): IntentsReified<ToTypeArgument<Outcome>> { return { typeName: Intents.$typeName, fullTypeName: composeSuiType( Intents.$typeName, ...[extractType(Outcome)] ) as `${typeof PKG_V1}::intents::Intents<${ToTypeStr<ToTypeArgument<Outcome>>}>`, typeArgs: [ extractType(Outcome) ] as [ToTypeStr<ToTypeArgument<Outcome>>], isPhantom: Intents.$isPhantom, reifiedTypeArgs: [Outcome], fromFields: (fields: Record<string, any>) => Intents.fromFields( Outcome, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Intents.fromFieldsWithTypes( Outcome, item, ), fromBcs: (data: Uint8Array) => Intents.fromBcs( Outcome, data, ), bcs: Intents.bcs(toBcs(Outcome)), fromJSONField: (field: any) => Intents.fromJSONField( Outcome, field, ), fromJSON: (json: Record<string, any>) => Intents.fromJSON( Outcome, json, ), fromSuiParsedData: (content: SuiParsedData) => Intents.fromSuiParsedData( Outcome, content, ), fromSuiObjectData: (content: SuiObjectData) => Intents.fromSuiObjectData( Outcome, content, ), fetch: async (client: SuiClient, id: string) => Intents.fetch( client, Outcome, id, ), new: ( fields: IntentsFields<ToTypeArgument<Outcome>>, ) => { return new Intents( [extractType(Outcome)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Intents.reified }

 static phantom<Outcome extends Reified<TypeArgument, any>>( Outcome: Outcome ): PhantomReified<ToTypeStr<Intents<ToTypeArgument<Outcome>>>> { return phantom(Intents.reified( Outcome )); } static get p() { return Intents.phantom }

 static get bcs() { return <Outcome extends BcsType<any>>(Outcome: Outcome) => bcs.struct(`Intents<${Outcome.name}>`, {

 inner: bcs.vector(Intent.bcs(Outcome)), locked: VecSet.bcs(ID.bcs)

}) };

 static fromFields<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, fields: Record<string, any> ): Intents<ToTypeArgument<Outcome>> { return Intents.reified( typeArg, ).new( { inner: decodeFromFields(reified.vector(Intent.reified(typeArg)), fields.inner), locked: decodeFromFields(VecSet.reified(ID.reified()), fields.locked) } ) }

 static fromFieldsWithTypes<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, item: FieldsWithTypes ): Intents<ToTypeArgument<Outcome>> { if (!isIntents(item.type)) { throw new Error("not a Intents type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Intents.reified( typeArg, ).new( { inner: decodeFromFieldsWithTypes(reified.vector(Intent.reified(typeArg)), item.fields.inner), locked: decodeFromFieldsWithTypes(VecSet.reified(ID.reified()), item.fields.locked) } ) }

 static fromBcs<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, data: Uint8Array ): Intents<ToTypeArgument<Outcome>> { const typeArgs = [typeArg];

 return Intents.fromFields( typeArg, Intents.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 inner: fieldToJSON<Vector<Intent<Outcome>>>(`vector<${Intent.$typeName}<${this.$typeArgs[0]}>>`, this.inner),locked: this.locked.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, field: any ): Intents<ToTypeArgument<Outcome>> { return Intents.reified( typeArg, ).new( { inner: decodeFromJSONField(reified.vector(Intent.reified(typeArg)), field.inner), locked: decodeFromJSONField(VecSet.reified(ID.reified()), field.locked) } ) }

 static fromJSON<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, json: Record<string, any> ): Intents<ToTypeArgument<Outcome>> { if (json.$typeName !== Intents.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Intents.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Intents.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, content: SuiParsedData ): Intents<ToTypeArgument<Outcome>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isIntents(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Intents object`); } return Intents.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<Outcome extends Reified<TypeArgument, any>>( typeArg: Outcome, data: SuiObjectData ): Intents<ToTypeArgument<Outcome>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isIntents(data.bcs.type)) { throw new Error(`object at is not a Intents object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Intents.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Intents.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<Outcome extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: Outcome, id: string ): Promise<Intents<ToTypeArgument<Outcome>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Intents object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isIntents(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Intents object`); }

 return Intents.fromSuiObjectData( typeArg, res.data ); }

 }
