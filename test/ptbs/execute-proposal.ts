import { Transaction } from "@mysten/sui/transactions";
import { MultisigClient } from "../../src/multisig-client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";

(async () => {
    // ! important: set the correct multisig id
    const multisigId = "0xef22166647326255140f47a01145fc8cf9f968a7de3e8d894ae62b6847d5b5b3";

    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    const ms = await MultisigClient.init(
        "testnet",
        keypair.toSuiAddress(),
        multisigId,
    );

    const tx = new Transaction();
    tx.setGasBudget(100000000);
    ms.execute(tx, keypair.toSuiAddress(), "Add ConfigMetadata role");

    const result = await ms.client.signAndExecuteTransaction({
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