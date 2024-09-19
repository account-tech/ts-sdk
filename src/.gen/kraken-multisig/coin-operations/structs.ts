import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== ManageCoins =============================== */

export function isManageCoins(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::coin_operations::ManageCoins`; }

export interface ManageCoinsFields { dummyField: ToField<"bool"> }

export type ManageCoinsReified = Reified< ManageCoins, ManageCoinsFields >;

export class ManageCoins implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::coin_operations::ManageCoins`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ManageCoins.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::coin_operations::ManageCoins`; readonly $typeArgs: []; readonly $isPhantom = ManageCoins.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: ManageCoinsFields, ) { this.$fullTypeName = composeSuiType( ManageCoins.$typeName, ...typeArgs ) as `${typeof PKG_V1}::coin_operations::ManageCoins`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): ManageCoinsReified { return { typeName: ManageCoins.$typeName, fullTypeName: composeSuiType( ManageCoins.$typeName, ...[] ) as `${typeof PKG_V1}::coin_operations::ManageCoins`, typeArgs: [ ] as [], isPhantom: ManageCoins.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ManageCoins.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ManageCoins.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ManageCoins.fromBcs( data, ), bcs: ManageCoins.bcs, fromJSONField: (field: any) => ManageCoins.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ManageCoins.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ManageCoins.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ManageCoins.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ManageCoins.fetch( client, id, ), new: ( fields: ManageCoinsFields, ) => { return new ManageCoins( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ManageCoins.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ManageCoins>> { return phantom(ManageCoins.reified( )); } static get p() { return ManageCoins.phantom() }

 static get bcs() { return bcs.struct("ManageCoins", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): ManageCoins { return ManageCoins.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ManageCoins { if (!isManageCoins(item.type)) { throw new Error("not a ManageCoins type");

 }

 return ManageCoins.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): ManageCoins { return ManageCoins.fromFields( ManageCoins.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ManageCoins { return ManageCoins.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): ManageCoins { if (json.$typeName !== ManageCoins.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ManageCoins.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ManageCoins { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isManageCoins(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ManageCoins object`); } return ManageCoins.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ManageCoins { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isManageCoins(data.bcs.type)) { throw new Error(`object at is not a ManageCoins object`); }

 return ManageCoins.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ManageCoins.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ManageCoins> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ManageCoins object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isManageCoins(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ManageCoins object`); }

 return ManageCoins.fromSuiObjectData( res.data ); }

 }
