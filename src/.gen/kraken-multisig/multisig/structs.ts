import {String} from "../../_dependencies/source/0x1/string/structs";
import {UID} from "../../_dependencies/source/0x2/object/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {Deps} from "../deps/structs";
import {PKG_V1} from "../index";
import {Members} from "../members/structs";
import {Proposals} from "../proposals/structs";
import {Thresholds} from "../thresholds/structs";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== Multisig =============================== */

export function isMultisig(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::multisig::Multisig`; }

export interface MultisigFields { id: ToField<UID>; name: ToField<String>; deps: ToField<Deps>; members: ToField<Members>; thresholds: ToField<Thresholds>; proposals: ToField<Proposals> }

export type MultisigReified = Reified< Multisig, MultisigFields >;

export class Multisig implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::multisig::Multisig`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Multisig.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::multisig::Multisig`; readonly $typeArgs: []; readonly $isPhantom = Multisig.$isPhantom;

 readonly id: ToField<UID>; readonly name: ToField<String>; readonly deps: ToField<Deps>; readonly members: ToField<Members>; readonly thresholds: ToField<Thresholds>; readonly proposals: ToField<Proposals>

 private constructor(typeArgs: [], fields: MultisigFields, ) { this.$fullTypeName = composeSuiType( Multisig.$typeName, ...typeArgs ) as `${typeof PKG_V1}::multisig::Multisig`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.name = fields.name;; this.deps = fields.deps;; this.members = fields.members;; this.thresholds = fields.thresholds;; this.proposals = fields.proposals; }

 static reified( ): MultisigReified { return { typeName: Multisig.$typeName, fullTypeName: composeSuiType( Multisig.$typeName, ...[] ) as `${typeof PKG_V1}::multisig::Multisig`, typeArgs: [ ] as [], isPhantom: Multisig.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Multisig.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Multisig.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Multisig.fromBcs( data, ), bcs: Multisig.bcs, fromJSONField: (field: any) => Multisig.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Multisig.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Multisig.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Multisig.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Multisig.fetch( client, id, ), new: ( fields: MultisigFields, ) => { return new Multisig( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Multisig.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Multisig>> { return phantom(Multisig.reified( )); } static get p() { return Multisig.phantom() }

 static get bcs() { return bcs.struct("Multisig", {

 id: UID.bcs, name: String.bcs, deps: Deps.bcs, members: Members.bcs, thresholds: Thresholds.bcs, proposals: Proposals.bcs

}) };

 static fromFields( fields: Record<string, any> ): Multisig { return Multisig.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), name: decodeFromFields(String.reified(), fields.name), deps: decodeFromFields(Deps.reified(), fields.deps), members: decodeFromFields(Members.reified(), fields.members), thresholds: decodeFromFields(Thresholds.reified(), fields.thresholds), proposals: decodeFromFields(Proposals.reified(), fields.proposals) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Multisig { if (!isMultisig(item.type)) { throw new Error("not a Multisig type");

 }

 return Multisig.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), deps: decodeFromFieldsWithTypes(Deps.reified(), item.fields.deps), members: decodeFromFieldsWithTypes(Members.reified(), item.fields.members), thresholds: decodeFromFieldsWithTypes(Thresholds.reified(), item.fields.thresholds), proposals: decodeFromFieldsWithTypes(Proposals.reified(), item.fields.proposals) } ) }

 static fromBcs( data: Uint8Array ): Multisig { return Multisig.fromFields( Multisig.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,name: this.name,deps: this.deps.toJSONField(),members: this.members.toJSONField(),thresholds: this.thresholds.toJSONField(),proposals: this.proposals.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Multisig { return Multisig.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), name: decodeFromJSONField(String.reified(), field.name), deps: decodeFromJSONField(Deps.reified(), field.deps), members: decodeFromJSONField(Members.reified(), field.members), thresholds: decodeFromJSONField(Thresholds.reified(), field.thresholds), proposals: decodeFromJSONField(Proposals.reified(), field.proposals) } ) }

 static fromJSON( json: Record<string, any> ): Multisig { if (json.$typeName !== Multisig.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Multisig.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Multisig { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMultisig(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Multisig object`); } return Multisig.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Multisig { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMultisig(data.bcs.type)) { throw new Error(`object at is not a Multisig object`); }

 return Multisig.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Multisig.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Multisig> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Multisig object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMultisig(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Multisig object`); }

 return Multisig.fromSuiObjectData( res.data ); }

 }
