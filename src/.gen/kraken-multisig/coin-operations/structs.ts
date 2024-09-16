import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== Issuer =============================== */

export function isIssuer(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::coin_operations::Issuer`; }

export interface IssuerFields { dummyField: ToField<"bool"> }

export type IssuerReified = Reified< Issuer, IssuerFields >;

export class Issuer implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::coin_operations::Issuer`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Issuer.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::coin_operations::Issuer`; readonly $typeArgs: []; readonly $isPhantom = Issuer.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: IssuerFields, ) { this.$fullTypeName = composeSuiType( Issuer.$typeName, ...typeArgs ) as `${typeof PKG_V1}::coin_operations::Issuer`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): IssuerReified { return { typeName: Issuer.$typeName, fullTypeName: composeSuiType( Issuer.$typeName, ...[] ) as `${typeof PKG_V1}::coin_operations::Issuer`, typeArgs: [ ] as [], isPhantom: Issuer.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Issuer.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Issuer.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Issuer.fromBcs( data, ), bcs: Issuer.bcs, fromJSONField: (field: any) => Issuer.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Issuer.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Issuer.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Issuer.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Issuer.fetch( client, id, ), new: ( fields: IssuerFields, ) => { return new Issuer( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Issuer.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Issuer>> { return phantom(Issuer.reified( )); } static get p() { return Issuer.phantom() }

 static get bcs() { return bcs.struct("Issuer", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): Issuer { return Issuer.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Issuer { if (!isIssuer(item.type)) { throw new Error("not a Issuer type");

 }

 return Issuer.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): Issuer { return Issuer.fromFields( Issuer.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Issuer { return Issuer.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): Issuer { if (json.$typeName !== Issuer.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Issuer.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Issuer { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isIssuer(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Issuer object`); } return Issuer.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Issuer { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isIssuer(data.bcs.type)) { throw new Error(`object at is not a Issuer object`); }

 return Issuer.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Issuer.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Issuer> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Issuer object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isIssuer(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Issuer object`); }

 return Issuer.fromSuiObjectData( res.data ); }

 }
