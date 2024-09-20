import { SuiClient } from "@mysten/sui/client";
import { Transaction, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SUI_SYSTEM_STATE_INNER, FRAMEWORK } from "src/types/constants";

export async function getCurrentEpoch(client: SuiClient) {
	const system: any = await client.getObject({
        id: SUI_SYSTEM_STATE_INNER,
		options: { showContent: true },
	});
    return system?.data.content.fields.value.fields.epoch;
}

export function getObjectId(
	tx: Transaction, 
	object: TransactionObjectInput,
	objectType: string,
): TransactionResult {
	return tx.moveCall({
		target: `${FRAMEWORK}::object::id`,
		typeArguments: [objectType],
		arguments: [tx.object(object)],
	});
}


export function areTypesEqual<T, U>() {
	type TypesAreEqual<T, U> = T extends U ? (U extends T ? true : false) : false;
	type AreEqual = TypesAreEqual<T, U>;
	return {} as AreEqual;
}