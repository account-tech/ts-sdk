import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { KrakenClient } from "../../src/client.js";

(async () => {
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));    
    const kraken = await KrakenClient.init(
        "testnet",
        keypair.toSuiAddress(),
    );

    const tx = new Transaction();
    tx.setGasBudget(1000000000);

    kraken.createMultisig(tx, "Thouny's Multisig", { username: "Thouny", profilePicture: "https://x.com/BL0CKRUNNER/picture" })
    
    const result = await kraken.client.signAndExecuteTransaction({
        signer: keypair,
        transaction: tx,
        options: { showEffects: true, showObjectChanges: true },
        requestType: "WaitForLocalExecution"
    });

    if (result.effects?.status.status != "success") {
        console.log(result.effects?.status.error);
    }

    console.log(result.effects?.status.status);
    console.log(result.effects?.created);
})();