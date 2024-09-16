import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== Issuer =============================== */

export function isIssuer(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::transfers::Issuer`; }

export interface IssuerFields { dummyField: ToField<"bool"> }

export type IssuerReified = Reified< Issuer, IssuerFields >;

export class Issuer implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::transfers::Issuer`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Issuer.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::transfers::Issuer`; readonly $typeArgs: []; readonly $isPhantom = Issuer.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: IssuerFields, ) { this.$fullTypeName = composeSuiType( Issuer.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transfers::Issuer`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): IssuerReified { return { typeName: Issuer.$typeName, fullTypeName: composeSuiType( Issuer.$typeName, ...[] ) as `${typeof PKG_V1}::transfers::Issuer`, typeArgs: [ ] as [], isPhantom: Issuer.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Issuer.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Issuer.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Issuer.fromBcs( data, ), bcs: Issuer.bcs, fromJSONField: (field: any) => Issuer.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Issuer.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Issuer.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Issuer.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Issuer.fetch( client, id, ), new: ( fields: IssuerFields, ) => { return new Issuer( [], fields ) }, kind: "StructClassReified", } }

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

/* ============================== Transfer =============================== */

export function isTransfer(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::transfers::Transfer`; }

export interface TransferFields { recipient: ToField<"address"> }

export type TransferReified = Reified< Transfer, TransferFields >;

export class Transfer implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::transfers::Transfer`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Transfer.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::transfers::Transfer`; readonly $typeArgs: []; readonly $isPhantom = Transfer.$isPhantom;

 readonly recipient: ToField<"address">

 private constructor(typeArgs: [], fields: TransferFields, ) { this.$fullTypeName = composeSuiType( Transfer.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transfers::Transfer`; this.$typeArgs = typeArgs;

 this.recipient = fields.recipient; }

 static reified( ): TransferReified { return { typeName: Transfer.$typeName, fullTypeName: composeSuiType( Transfer.$typeName, ...[] ) as `${typeof PKG_V1}::transfers::Transfer`, typeArgs: [ ] as [], isPhantom: Transfer.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Transfer.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Transfer.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Transfer.fromBcs( data, ), bcs: Transfer.bcs, fromJSONField: (field: any) => Transfer.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Transfer.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Transfer.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Transfer.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Transfer.fetch( client, id, ), new: ( fields: TransferFields, ) => { return new Transfer( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Transfer.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Transfer>> { return phantom(Transfer.reified( )); } static get p() { return Transfer.phantom() }

 static get bcs() { return bcs.struct("Transfer", {

 recipient: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields( fields: Record<string, any> ): Transfer { return Transfer.reified( ).new( { recipient: decodeFromFields("address", fields.recipient) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Transfer { if (!isTransfer(item.type)) { throw new Error("not a Transfer type");

 }

 return Transfer.reified( ).new( { recipient: decodeFromFieldsWithTypes("address", item.fields.recipient) } ) }

 static fromBcs( data: Uint8Array ): Transfer { return Transfer.fromFields( Transfer.bcs.parse(data) ) }

 toJSONField() { return {

 recipient: this.recipient,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Transfer { return Transfer.reified( ).new( { recipient: decodeFromJSONField("address", field.recipient) } ) }

 static fromJSON( json: Record<string, any> ): Transfer { if (json.$typeName !== Transfer.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Transfer.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Transfer { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTransfer(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Transfer object`); } return Transfer.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Transfer { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTransfer(data.bcs.type)) { throw new Error(`object at is not a Transfer object`); }

 return Transfer.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Transfer.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Transfer> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Transfer object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTransfer(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Transfer object`); }

 return Transfer.fromSuiObjectData( res.data ); }

 }
