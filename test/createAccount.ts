import { TransactionBlock } from "@mysten/sui.js/transactions";
import { KrakenClient } from "../src/client.js"
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { KRAKEN } from "../src/types/constants.js";

(async () => {
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    const kraken = new KrakenClient(
        "testnet",
        "",
        KRAKEN,
        keypair.toSuiAddress(),
        ""
    )

    const tx = new TransactionBlock();
    kraken.createAccount(tx, "Thouny", "");
    tx.setGasBudget(1000000000);
        const result = await kraken.client.signAndExecuteTransactionBlock({
            signer: keypair,
            transactionBlock: tx,
            options: { showEffects: true, showObjectChanges: true },
            requestType: "WaitForLocalExecution"
        });

    console.log(result.effects?.status.status);
})();