import { SuiClient } from "@mysten/sui/client";

export class Owned {
    client: SuiClient;
    multisig: string;
    
    private constructor(
        client: SuiClient,
        multisig: string,
    ) {
        this.client = client;
        this.multisig = multisig;
    }
}