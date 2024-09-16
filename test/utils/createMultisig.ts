import { Transaction } from "@mysten/sui/transactions";
import { Multisig } from "../../src/lib/multisig.js"
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { PACKAGE_ID } from "../../.gen/kraken-multisig/index.js";

(async () => {
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("ADaEvt8+CcmH2akiXRP4dmDJ00q4wrTmYt7OVaf/dpso", "base64")).slice(1));
    const multisig = await Multisig.init(
        "testnet",
        PACKAGE_ID,
        keypair.toSuiAddress(),
    )

    const tx = new Transaction();
    const ms = multisig.newMultisig(tx, "0xe1a59c0bb21730b8fcb31e5d0f62122dbcc9db9a0f666c5342b5634b7cbf0da3", "Main");
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