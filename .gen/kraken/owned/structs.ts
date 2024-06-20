import * as reified from "../../_framework/reified";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, Vector, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {bcs, fromB64} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui.js/client";

/* ============================== Return =============================== */

export function isReturn(type: string): boolean { type = compressSuiType(type); return type === "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::owned::Return"; }

export interface ReturnFields { toReturn: ToField<Vector<ID>> }

export type ReturnReified = Reified< Return, ReturnFields >;

export class Return implements StructClass { static readonly $typeName = "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::owned::Return"; static readonly $numTypeParams = 0;

 readonly $typeName = Return.$typeName;

 readonly $fullTypeName: "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::owned::Return";

 readonly $typeArgs: [];

 readonly toReturn: ToField<Vector<ID>>

 private constructor(typeArgs: [], fields: ReturnFields, ) { this.$fullTypeName = composeSuiType( Return.$typeName, ...typeArgs ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::owned::Return"; this.$typeArgs = typeArgs;

 this.toReturn = fields.toReturn; }

 static reified( ): ReturnReified { return { typeName: Return.$typeName, fullTypeName: composeSuiType( Return.$typeName, ...[] ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::owned::Return", typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Return.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Return.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Return.fromBcs( data, ), bcs: Return.bcs, fromJSONField: (field: any) => Return.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Return.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Return.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Return.fetch( client, id, ), new: ( fields: ReturnFields, ) => { return new Return( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Return.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Return>> { return phantom(Return.reified( )); } static get p() { return Return.phantom() }

 static get bcs() { return bcs.struct("Return", {

 to_return: bcs.vector(ID.bcs)

}) };

 static fromFields( fields: Record<string, any> ): Return { return Return.reified( ).new( { toReturn: decodeFromFields(reified.vector(ID.reified()), fields.to_return) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Return { if (!isReturn(item.type)) { throw new Error("not a Return type");

 }

 return Return.reified( ).new( { toReturn: decodeFromFieldsWithTypes(reified.vector(ID.reified()), item.fields.to_return) } ) }

 static fromBcs( data: Uint8Array ): Return { return Return.fromFields( Return.bcs.parse(data) ) }

 toJSONField() { return {

 toReturn: fieldToJSON<Vector<ID>>(`vector<0x2::object::ID>`, this.toReturn),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Return { return Return.reified( ).new( { toReturn: decodeFromJSONField(reified.vector(ID.reified()), field.toReturn) } ) }

 static fromJSON( json: Record<string, any> ): Return { if (json.$typeName !== Return.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Return.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Return { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isReturn(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Return object`); } return Return.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Return> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Return object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isReturn(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Return object`); }
 return Return.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Withdraw =============================== */

export function isWithdraw(type: string): boolean { type = compressSuiType(type); return type === "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::owned::Withdraw"; }

export interface WithdrawFields { objects: ToField<Vector<ID>> }

export type WithdrawReified = Reified< Withdraw, WithdrawFields >;

export class Withdraw implements StructClass { static readonly $typeName = "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::owned::Withdraw"; static readonly $numTypeParams = 0;

 readonly $typeName = Withdraw.$typeName;

 readonly $fullTypeName: "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::owned::Withdraw";

 readonly $typeArgs: [];

 readonly objects: ToField<Vector<ID>>

 private constructor(typeArgs: [], fields: WithdrawFields, ) { this.$fullTypeName = composeSuiType( Withdraw.$typeName, ...typeArgs ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::owned::Withdraw"; this.$typeArgs = typeArgs;

 this.objects = fields.objects; }

 static reified( ): WithdrawReified { return { typeName: Withdraw.$typeName, fullTypeName: composeSuiType( Withdraw.$typeName, ...[] ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::owned::Withdraw", typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Withdraw.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Withdraw.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Withdraw.fromBcs( data, ), bcs: Withdraw.bcs, fromJSONField: (field: any) => Withdraw.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Withdraw.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Withdraw.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Withdraw.fetch( client, id, ), new: ( fields: WithdrawFields, ) => { return new Withdraw( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Withdraw.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Withdraw>> { return phantom(Withdraw.reified( )); } static get p() { return Withdraw.phantom() }

 static get bcs() { return bcs.struct("Withdraw", {

 objects: bcs.vector(ID.bcs)

}) };

 static fromFields( fields: Record<string, any> ): Withdraw { return Withdraw.reified( ).new( { objects: decodeFromFields(reified.vector(ID.reified()), fields.objects) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Withdraw { if (!isWithdraw(item.type)) { throw new Error("not a Withdraw type");

 }

 return Withdraw.reified( ).new( { objects: decodeFromFieldsWithTypes(reified.vector(ID.reified()), item.fields.objects) } ) }

 static fromBcs( data: Uint8Array ): Withdraw { return Withdraw.fromFields( Withdraw.bcs.parse(data) ) }

 toJSONField() { return {

 objects: fieldToJSON<Vector<ID>>(`vector<0x2::object::ID>`, this.objects),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Withdraw { return Withdraw.reified( ).new( { objects: decodeFromJSONField(reified.vector(ID.reified()), field.objects) } ) }

 static fromJSON( json: Record<string, any> ): Withdraw { if (json.$typeName !== Withdraw.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Withdraw.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Withdraw { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWithdraw(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Withdraw object`); } return Withdraw.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Withdraw> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Withdraw object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWithdraw(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Withdraw object`); }
 return Withdraw.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
