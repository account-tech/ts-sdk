import { SuiClient } from "@mysten/sui/client";
import { SUI_SYSTEM_STATE_INNER } from "src/types/constants";
import { Outcome } from "./proposal/outcome";

export async function getCurrentEpoch(client: SuiClient) {
	const system: any = await client.getObject({
        id: SUI_SYSTEM_STATE_INNER,
		options: { showContent: true },
	});
    return system?.data.content.fields.value.fields.epoch;
}

export function getAccountGenerics(outcome: Outcome): [string, string] {
    return [
        (outcome.constructor as typeof Outcome).configType,
        (outcome.constructor as typeof Outcome).outcomeType,
    ];
}