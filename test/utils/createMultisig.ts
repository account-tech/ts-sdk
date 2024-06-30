import { Transaction } from "@mysten/sui/transactions";
import { Multisig } from "../../src/lib/multisig.js"
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { PACKAGE_ID } from "../../.gen/kraken/index.js";

(async () => {
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    const multisig = await Multisig.init(
        "localnet",
        PACKAGE_ID,
        keypair.toSuiAddress(),
    )

    const tx = new Transaction();
    const ms = multisig.newMultisig(tx, "0x16de126ee5233e74ace738447f5c871d46e4f48a14605d547ee3c9b68da93d8d", "Main");
    multisig.shareMultisig(tx, ms);
    tx.setGasBudget(1000000000);
    const result = await multisig.client.signAndExecuteTransaction({
        signer: keypair,
        transaction: tx,
        options: { showEffects: true, showObjectChanges: true },
        requestType: "WaitForLocalExecution"
    });

    if (result.effects?.status.status != "success") {
        console.log(result.effects?.status.error);
    }

    console.log(result.effects?.status.status);
    console.log(result.effects?.created![0].reference.objectId);
})();