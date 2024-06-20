import * as reified from "../../_framework/reified";
import {Bag} from "../../_dependencies/source/0x2/bag/structs";
import {ID, UID} from "../../_dependencies/source/0x2/object/structs";
import {VecMap} from "../../_dependencies/source/0x2/vec-map/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, Vector, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {bcs, fromB64, fromHEX, toHEX} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui.js/client";

/* ============================== Witness =============================== */

export function isWitness(type: string): boolean { type = compressSuiType(type); return type === "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Witness"; }

export interface WitnessFields { dummyField: ToField<"bool"> }

export type WitnessReified = Reified< Witness, WitnessFields >;

export class Witness implements StructClass { static readonly $typeName = "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Witness"; static readonly $numTypeParams = 0;

 readonly $typeName = Witness.$typeName;

 readonly $fullTypeName: "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Witness";

 readonly $typeArgs: [];

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: WitnessFields, ) { this.$fullTypeName = composeSuiType( Witness.$typeName, ...typeArgs ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Witness"; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): WitnessReified { return { typeName: Witness.$typeName, fullTypeName: composeSuiType( Witness.$typeName, ...[] ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Witness", typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Witness.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Witness.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Witness.fromBcs( data, ), bcs: Witness.bcs, fromJSONField: (field: any) => Witness.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Witness.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Witness.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Witness.fetch( client, id, ), new: ( fields: WitnessFields, ) => { return new Witness( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Witness.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Witness>> { return phantom(Witness.reified( )); } static get p() { return Witness.phantom() }

 static get bcs() { return bcs.struct("Witness", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): Witness { return Witness.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Witness { if (!isWitness(item.type)) { throw new Error("not a Witness type");

 }

 return Witness.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): Witness { return Witness.fromFields( Witness.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Witness { return Witness.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): Witness { if (json.$typeName !== Witness.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Witness.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Witness { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWitness(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Witness object`); } return Witness.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Witness> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Witness object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWitness(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Witness object`); }
 return Witness.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Deliver =============================== */

export function isDeliver(type: string): boolean { type = compressSuiType(type); return type === "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Deliver"; }

export interface DeliverFields { toDeposit: ToField<Vector<ID>>; recipient: ToField<"address"> }

export type DeliverReified = Reified< Deliver, DeliverFields >;

export class Deliver implements StructClass { static readonly $typeName = "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Deliver"; static readonly $numTypeParams = 0;

 readonly $typeName = Deliver.$typeName;

 readonly $fullTypeName: "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Deliver";

 readonly $typeArgs: [];

 readonly toDeposit: ToField<Vector<ID>>; readonly recipient: ToField<"address">

 private constructor(typeArgs: [], fields: DeliverFields, ) { this.$fullTypeName = composeSuiType( Deliver.$typeName, ...typeArgs ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Deliver"; this.$typeArgs = typeArgs;

 this.toDeposit = fields.toDeposit;; this.recipient = fields.recipient; }

 static reified( ): DeliverReified { return { typeName: Deliver.$typeName, fullTypeName: composeSuiType( Deliver.$typeName, ...[] ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Deliver", typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Deliver.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Deliver.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Deliver.fromBcs( data, ), bcs: Deliver.bcs, fromJSONField: (field: any) => Deliver.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Deliver.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Deliver.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Deliver.fetch( client, id, ), new: ( fields: DeliverFields, ) => { return new Deliver( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Deliver.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Deliver>> { return phantom(Deliver.reified( )); } static get p() { return Deliver.phantom() }

 static get bcs() { return bcs.struct("Deliver", {

 to_deposit: bcs.vector(ID.bcs), recipient: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields( fields: Record<string, any> ): Deliver { return Deliver.reified( ).new( { toDeposit: decodeFromFields(reified.vector(ID.reified()), fields.to_deposit), recipient: decodeFromFields("address", fields.recipient) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Deliver { if (!isDeliver(item.type)) { throw new Error("not a Deliver type");

 }

 return Deliver.reified( ).new( { toDeposit: decodeFromFieldsWithTypes(reified.vector(ID.reified()), item.fields.to_deposit), recipient: decodeFromFieldsWithTypes("address", item.fields.recipient) } ) }

 static fromBcs( data: Uint8Array ): Deliver { return Deliver.fromFields( Deliver.bcs.parse(data) ) }

 toJSONField() { return {

 toDeposit: fieldToJSON<Vector<ID>>(`vector<0x2::object::ID>`, this.toDeposit),recipient: this.recipient,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Deliver { return Deliver.reified( ).new( { toDeposit: decodeFromJSONField(reified.vector(ID.reified()), field.toDeposit), recipient: decodeFromJSONField("address", field.recipient) } ) }

 static fromJSON( json: Record<string, any> ): Deliver { if (json.$typeName !== Deliver.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Deliver.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Deliver { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isDeliver(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Deliver object`); } return Deliver.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Deliver> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Deliver object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isDeliver(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Deliver object`); }
 return Deliver.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Delivery =============================== */

export function isDelivery(type: string): boolean { type = compressSuiType(type); return type === "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Delivery"; }

export interface DeliveryFields { id: ToField<UID>; multisigId: ToField<ID>; objects: ToField<Bag> }

export type DeliveryReified = Reified< Delivery, DeliveryFields >;

export class Delivery implements StructClass { static readonly $typeName = "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Delivery"; static readonly $numTypeParams = 0;

 readonly $typeName = Delivery.$typeName;

 readonly $fullTypeName: "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Delivery";

 readonly $typeArgs: [];

 readonly id: ToField<UID>; readonly multisigId: ToField<ID>; readonly objects: ToField<Bag>

 private constructor(typeArgs: [], fields: DeliveryFields, ) { this.$fullTypeName = composeSuiType( Delivery.$typeName, ...typeArgs ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Delivery"; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.multisigId = fields.multisigId;; this.objects = fields.objects; }

 static reified( ): DeliveryReified { return { typeName: Delivery.$typeName, fullTypeName: composeSuiType( Delivery.$typeName, ...[] ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Delivery", typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Delivery.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Delivery.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Delivery.fromBcs( data, ), bcs: Delivery.bcs, fromJSONField: (field: any) => Delivery.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Delivery.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Delivery.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Delivery.fetch( client, id, ), new: ( fields: DeliveryFields, ) => { return new Delivery( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Delivery.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Delivery>> { return phantom(Delivery.reified( )); } static get p() { return Delivery.phantom() }

 static get bcs() { return bcs.struct("Delivery", {

 id: UID.bcs, multisig_id: ID.bcs, objects: Bag.bcs

}) };

 static fromFields( fields: Record<string, any> ): Delivery { return Delivery.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), multisigId: decodeFromFields(ID.reified(), fields.multisig_id), objects: decodeFromFields(Bag.reified(), fields.objects) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Delivery { if (!isDelivery(item.type)) { throw new Error("not a Delivery type");

 }

 return Delivery.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), multisigId: decodeFromFieldsWithTypes(ID.reified(), item.fields.multisig_id), objects: decodeFromFieldsWithTypes(Bag.reified(), item.fields.objects) } ) }

 static fromBcs( data: Uint8Array ): Delivery { return Delivery.fromFields( Delivery.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,multisigId: this.multisigId,objects: this.objects.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Delivery { return Delivery.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), multisigId: decodeFromJSONField(ID.reified(), field.multisigId), objects: decodeFromJSONField(Bag.reified(), field.objects) } ) }

 static fromJSON( json: Record<string, any> ): Delivery { if (json.$typeName !== Delivery.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Delivery.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Delivery { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isDelivery(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Delivery object`); } return Delivery.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Delivery> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Delivery object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isDelivery(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Delivery object`); }
 return Delivery.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== DeliveryCap =============================== */

export function isDeliveryCap(type: string): boolean { type = compressSuiType(type); return type === "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::DeliveryCap"; }

export interface DeliveryCapFields { id: ToField<UID>; deliveryId: ToField<ID> }

export type DeliveryCapReified = Reified< DeliveryCap, DeliveryCapFields >;

export class DeliveryCap implements StructClass { static readonly $typeName = "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::DeliveryCap"; static readonly $numTypeParams = 0;

 readonly $typeName = DeliveryCap.$typeName;

 readonly $fullTypeName: "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::DeliveryCap";

 readonly $typeArgs: [];

 readonly id: ToField<UID>; readonly deliveryId: ToField<ID>

 private constructor(typeArgs: [], fields: DeliveryCapFields, ) { this.$fullTypeName = composeSuiType( DeliveryCap.$typeName, ...typeArgs ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::DeliveryCap"; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.deliveryId = fields.deliveryId; }

 static reified( ): DeliveryCapReified { return { typeName: DeliveryCap.$typeName, fullTypeName: composeSuiType( DeliveryCap.$typeName, ...[] ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::DeliveryCap", typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => DeliveryCap.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => DeliveryCap.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => DeliveryCap.fromBcs( data, ), bcs: DeliveryCap.bcs, fromJSONField: (field: any) => DeliveryCap.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => DeliveryCap.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => DeliveryCap.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => DeliveryCap.fetch( client, id, ), new: ( fields: DeliveryCapFields, ) => { return new DeliveryCap( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return DeliveryCap.reified() }

 static phantom( ): PhantomReified<ToTypeStr<DeliveryCap>> { return phantom(DeliveryCap.reified( )); } static get p() { return DeliveryCap.phantom() }

 static get bcs() { return bcs.struct("DeliveryCap", {

 id: UID.bcs, delivery_id: ID.bcs

}) };

 static fromFields( fields: Record<string, any> ): DeliveryCap { return DeliveryCap.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), deliveryId: decodeFromFields(ID.reified(), fields.delivery_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): DeliveryCap { if (!isDeliveryCap(item.type)) { throw new Error("not a DeliveryCap type");

 }

 return DeliveryCap.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), deliveryId: decodeFromFieldsWithTypes(ID.reified(), item.fields.delivery_id) } ) }

 static fromBcs( data: Uint8Array ): DeliveryCap { return DeliveryCap.fromFields( DeliveryCap.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,deliveryId: this.deliveryId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): DeliveryCap { return DeliveryCap.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), deliveryId: decodeFromJSONField(ID.reified(), field.deliveryId) } ) }

 static fromJSON( json: Record<string, any> ): DeliveryCap { if (json.$typeName !== DeliveryCap.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return DeliveryCap.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): DeliveryCap { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isDeliveryCap(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a DeliveryCap object`); } return DeliveryCap.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<DeliveryCap> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching DeliveryCap object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isDeliveryCap(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a DeliveryCap object`); }
 return DeliveryCap.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Send =============================== */

export function isSend(type: string): boolean { type = compressSuiType(type); return type === "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Send"; }

export interface SendFields { transfers: ToField<VecMap<ID, "address">> }

export type SendReified = Reified< Send, SendFields >;

export class Send implements StructClass { static readonly $typeName = "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Send"; static readonly $numTypeParams = 0;

 readonly $typeName = Send.$typeName;

 readonly $fullTypeName: "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Send";

 readonly $typeArgs: [];

 readonly transfers: ToField<VecMap<ID, "address">>

 private constructor(typeArgs: [], fields: SendFields, ) { this.$fullTypeName = composeSuiType( Send.$typeName, ...typeArgs ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Send"; this.$typeArgs = typeArgs;

 this.transfers = fields.transfers; }

 static reified( ): SendReified { return { typeName: Send.$typeName, fullTypeName: composeSuiType( Send.$typeName, ...[] ) as "0xfc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6::transfers::Send", typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Send.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Send.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Send.fromBcs( data, ), bcs: Send.bcs, fromJSONField: (field: any) => Send.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Send.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Send.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Send.fetch( client, id, ), new: ( fields: SendFields, ) => { return new Send( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Send.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Send>> { return phantom(Send.reified( )); } static get p() { return Send.phantom() }

 static get bcs() { return bcs.struct("Send", {

 transfers: VecMap.bcs(ID.bcs, bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }))

}) };

 static fromFields( fields: Record<string, any> ): Send { return Send.reified( ).new( { transfers: decodeFromFields(VecMap.reified(ID.reified(), "address"), fields.transfers) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Send { if (!isSend(item.type)) { throw new Error("not a Send type");

 }

 return Send.reified( ).new( { transfers: decodeFromFieldsWithTypes(VecMap.reified(ID.reified(), "address"), item.fields.transfers) } ) }

 static fromBcs( data: Uint8Array ): Send { return Send.fromFields( Send.bcs.parse(data) ) }

 toJSONField() { return {

 transfers: this.transfers.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Send { return Send.reified( ).new( { transfers: decodeFromJSONField(VecMap.reified(ID.reified(), "address"), field.transfers) } ) }

 static fromJSON( json: Record<string, any> ): Send { if (json.$typeName !== Send.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Send.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Send { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isSend(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Send object`); } return Send.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Send> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Send object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isSend(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Send object`); }
 return Send.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
