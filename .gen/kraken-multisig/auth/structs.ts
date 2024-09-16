import {String} from "../../_dependencies/source/0x1/string/structs";
import {TypeName} from "../../_dependencies/source/0x1/type-name/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== Auth =============================== */

export function isAuth(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::auth::Auth`; }

export interface AuthFields { issuer: ToField<TypeName>; name: ToField<String>; multisigAddr: ToField<"address"> }

export type AuthReified = Reified< Auth, AuthFields >;

export class Auth implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::auth::Auth`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Auth.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::auth::Auth`; readonly $typeArgs: []; readonly $isPhantom = Auth.$isPhantom;

 readonly issuer: ToField<TypeName>; readonly name: ToField<String>; readonly multisigAddr: ToField<"address">

 private constructor(typeArgs: [], fields: AuthFields, ) { this.$fullTypeName = composeSuiType( Auth.$typeName, ...typeArgs ) as `${typeof PKG_V1}::auth::Auth`; this.$typeArgs = typeArgs;

 this.issuer = fields.issuer;; this.name = fields.name;; this.multisigAddr = fields.multisigAddr; }

 static reified( ): AuthReified { return { typeName: Auth.$typeName, fullTypeName: composeSuiType( Auth.$typeName, ...[] ) as `${typeof PKG_V1}::auth::Auth`, typeArgs: [ ] as [], isPhantom: Auth.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Auth.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Auth.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Auth.fromBcs( data, ), bcs: Auth.bcs, fromJSONField: (field: any) => Auth.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Auth.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Auth.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Auth.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Auth.fetch( client, id, ), new: ( fields: AuthFields, ) => { return new Auth( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Auth.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Auth>> { return phantom(Auth.reified( )); } static get p() { return Auth.phantom() }

 static get bcs() { return bcs.struct("Auth", {

 issuer: TypeName.bcs, name: String.bcs, multisig_addr: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields( fields: Record<string, any> ): Auth { return Auth.reified( ).new( { issuer: decodeFromFields(TypeName.reified(), fields.issuer), name: decodeFromFields(String.reified(), fields.name), multisigAddr: decodeFromFields("address", fields.multisig_addr) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Auth { if (!isAuth(item.type)) { throw new Error("not a Auth type");

 }

 return Auth.reified( ).new( { issuer: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.issuer), name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), multisigAddr: decodeFromFieldsWithTypes("address", item.fields.multisig_addr) } ) }

 static fromBcs( data: Uint8Array ): Auth { return Auth.fromFields( Auth.bcs.parse(data) ) }

 toJSONField() { return {

 issuer: this.issuer.toJSONField(),name: this.name,multisigAddr: this.multisigAddr,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Auth { return Auth.reified( ).new( { issuer: decodeFromJSONField(TypeName.reified(), field.issuer), name: decodeFromJSONField(String.reified(), field.name), multisigAddr: decodeFromJSONField("address", field.multisigAddr) } ) }

 static fromJSON( json: Record<string, any> ): Auth { if (json.$typeName !== Auth.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Auth.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Auth { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAuth(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Auth object`); } return Auth.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Auth { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isAuth(data.bcs.type)) { throw new Error(`object at is not a Auth object`); }

 return Auth.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Auth.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Auth> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Auth object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAuth(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Auth object`); }

 return Auth.fromSuiObjectData( res.data ); }

 }
