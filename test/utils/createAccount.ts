import { Transaction } from "@mysten/sui/transactions";
import { Account } from "../../src/lib/account.js"
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { PACKAGE_ID } from "../../.gen/kraken-multisig/index.js";

(async () => {
    
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("ADaEvt8+CcmH2akiXRP4dmDJ00q4wrTmYt7OVaf/dpso", "base64")).slice(1));
    const account = await Account.init(
        "testnet",
        PACKAGE_ID,
        keypair.toSuiAddress(),
    )

    const tx = new Transaction();
    account.createAccount(tx, "Thouny", "");
    tx.setGasBudget(1000000000);
    const result = await account.client.signAndExecuteTransaction({
        signer: keypair,
        transaction: tx,
        options: { showEffects: true, showObjectChanges: true },
        requestType: "WaitForLocalExecution"
    });

    console.log(result.effects?.status.status);
    console.log(result.effects?.created![0].reference.objectId);
})();