// import { SuiClient } from "@mysten/sui/client";

// export async function getTypesForObjectIds(client: SuiClient, ids: string[]) {
//     const types = await client.multiGetObjects({ 
//         ids,
//         options: { showType: true }
//     });

//     return types.map(type => type.data?.type);
// }

export function roleWithName(role: string, name: string): string {
    return `${role}::${name}`;
}