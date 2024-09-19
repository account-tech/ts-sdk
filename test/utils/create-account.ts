import { Transaction } from "@mysten/sui/transactions";
import { Account } from "../../src/lib/account.js"
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { PACKAGE_ID } from "../../src/.gen/kraken-multisig/index.js";
import { SuiClient } from "@mysten/sui/client";

(async () => {
    
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    const client = new SuiClient({ url: "testnet" });
    const account = await Account.init(client, keypair.toSuiAddress());

    const tx = new Transaction();
    tx.setGasBudget(1000000000);

    let accountObj = account.createAccount(tx, "Thouny", "");
    account.transferAccount(tx, accountObj, keypair.toSuiAddress());
    
    const result = await account.client.signAndExecuteTransaction({
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