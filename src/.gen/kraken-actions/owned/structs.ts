import * as reified from "../../_framework/reified";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {Vector} from "../../_framework/vector";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== ReturnAction =============================== */

export function isReturnAction(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::owned::ReturnAction`; }

export interface ReturnActionFields { toReturn: ToField<Vector<ID>> }

export type ReturnActionReified = Reified< ReturnAction, ReturnActionFields >;

export class ReturnAction implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::owned::ReturnAction`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ReturnAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::owned::ReturnAction`; readonly $typeArgs: []; readonly $isPhantom = ReturnAction.$isPhantom;

 readonly toReturn: ToField<Vector<ID>>

 private constructor(typeArgs: [], fields: ReturnActionFields, ) { this.$fullTypeName = composeSuiType( ReturnAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::owned::ReturnAction`; this.$typeArgs = typeArgs;

 this.toReturn = fields.toReturn; }

 static reified( ): ReturnActionReified { return { typeName: ReturnAction.$typeName, fullTypeName: composeSuiType( ReturnAction.$typeName, ...[] ) as `${typeof PKG_V1}::owned::ReturnAction`, typeArgs: [ ] as [], isPhantom: ReturnAction.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ReturnAction.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ReturnAction.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ReturnAction.fromBcs( data, ), bcs: ReturnAction.bcs, fromJSONField: (field: any) => ReturnAction.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ReturnAction.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ReturnAction.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ReturnAction.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ReturnAction.fetch( client, id, ), new: ( fields: ReturnActionFields, ) => { return new ReturnAction( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ReturnAction.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ReturnAction>> { return phantom(ReturnAction.reified( )); } static get p() { return ReturnAction.phantom() }

 static get bcs() { return bcs.struct("ReturnAction", {

 to_return: bcs.vector(ID.bcs)

}) };

 static fromFields( fields: Record<string, any> ): ReturnAction { return ReturnAction.reified( ).new( { toReturn: decodeFromFields(reified.vector(ID.reified()), fields.to_return) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ReturnAction { if (!isReturnAction(item.type)) { throw new Error("not a ReturnAction type");

 }

 return ReturnAction.reified( ).new( { toReturn: decodeFromFieldsWithTypes(reified.vector(ID.reified()), item.fields.to_return) } ) }

 static fromBcs( data: Uint8Array ): ReturnAction { return ReturnAction.fromFields( ReturnAction.bcs.parse(data) ) }

 toJSONField() { return {

 toReturn: fieldToJSON<Vector<ID>>(`vector<${ID.$typeName}>`, this.toReturn),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ReturnAction { return ReturnAction.reified( ).new( { toReturn: decodeFromJSONField(reified.vector(ID.reified()), field.toReturn) } ) }

 static fromJSON( json: Record<string, any> ): ReturnAction { if (json.$typeName !== ReturnAction.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ReturnAction.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ReturnAction { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isReturnAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ReturnAction object`); } return ReturnAction.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ReturnAction { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isReturnAction(data.bcs.type)) { throw new Error(`object at is not a ReturnAction object`); }

 return ReturnAction.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ReturnAction.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ReturnAction> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ReturnAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isReturnAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ReturnAction object`); }

 return ReturnAction.fromSuiObjectData( res.data ); }

 }

/* ============================== WithdrawAction =============================== */

export function isWithdrawAction(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::owned::WithdrawAction`; }

export interface WithdrawActionFields { objects: ToField<Vector<ID>> }

export type WithdrawActionReified = Reified< WithdrawAction, WithdrawActionFields >;

export class WithdrawAction implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::owned::WithdrawAction`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = WithdrawAction.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::owned::WithdrawAction`; readonly $typeArgs: []; readonly $isPhantom = WithdrawAction.$isPhantom;

 readonly objects: ToField<Vector<ID>>

 private constructor(typeArgs: [], fields: WithdrawActionFields, ) { this.$fullTypeName = composeSuiType( WithdrawAction.$typeName, ...typeArgs ) as `${typeof PKG_V1}::owned::WithdrawAction`; this.$typeArgs = typeArgs;

 this.objects = fields.objects; }

 static reified( ): WithdrawActionReified { return { typeName: WithdrawAction.$typeName, fullTypeName: composeSuiType( WithdrawAction.$typeName, ...[] ) as `${typeof PKG_V1}::owned::WithdrawAction`, typeArgs: [ ] as [], isPhantom: WithdrawAction.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => WithdrawAction.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => WithdrawAction.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => WithdrawAction.fromBcs( data, ), bcs: WithdrawAction.bcs, fromJSONField: (field: any) => WithdrawAction.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => WithdrawAction.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => WithdrawAction.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => WithdrawAction.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => WithdrawAction.fetch( client, id, ), new: ( fields: WithdrawActionFields, ) => { return new WithdrawAction( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return WithdrawAction.reified() }

 static phantom( ): PhantomReified<ToTypeStr<WithdrawAction>> { return phantom(WithdrawAction.reified( )); } static get p() { return WithdrawAction.phantom() }

 static get bcs() { return bcs.struct("WithdrawAction", {

 objects: bcs.vector(ID.bcs)

}) };

 static fromFields( fields: Record<string, any> ): WithdrawAction { return WithdrawAction.reified( ).new( { objects: decodeFromFields(reified.vector(ID.reified()), fields.objects) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): WithdrawAction { if (!isWithdrawAction(item.type)) { throw new Error("not a WithdrawAction type");

 }

 return WithdrawAction.reified( ).new( { objects: decodeFromFieldsWithTypes(reified.vector(ID.reified()), item.fields.objects) } ) }

 static fromBcs( data: Uint8Array ): WithdrawAction { return WithdrawAction.fromFields( WithdrawAction.bcs.parse(data) ) }

 toJSONField() { return {

 objects: fieldToJSON<Vector<ID>>(`vector<${ID.$typeName}>`, this.objects),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): WithdrawAction { return WithdrawAction.reified( ).new( { objects: decodeFromJSONField(reified.vector(ID.reified()), field.objects) } ) }

 static fromJSON( json: Record<string, any> ): WithdrawAction { if (json.$typeName !== WithdrawAction.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return WithdrawAction.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): WithdrawAction { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWithdrawAction(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a WithdrawAction object`); } return WithdrawAction.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): WithdrawAction { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isWithdrawAction(data.bcs.type)) { throw new Error(`object at is not a WithdrawAction object`); }

 return WithdrawAction.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return WithdrawAction.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<WithdrawAction> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching WithdrawAction object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWithdrawAction(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a WithdrawAction object`); }

 return WithdrawAction.fromSuiObjectData( res.data ); }

 }
