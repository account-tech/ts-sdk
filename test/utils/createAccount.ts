import { TransactionBlock } from "@mysten/sui.js/transactions";
import { Account } from "../../src/lib/account.js"
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { PACKAGE_ID } from "../../.gen/kraken/index.js";

(async () => {
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    const account = await Account.init(
        "localnet",
        PACKAGE_ID,
        keypair.toSuiAddress(),
    )

    const tx = new TransactionBlock();
    account.createAccount(tx, "Thouny", "");
    tx.setGasBudget(1000000000);
    const result = await account.client.signAndExecuteTransactionBlock({
        signer: keypair,
        transactionBlock: tx,
        options: { showEffects: true, showObjectChanges: true },
        requestType: "WaitForLocalExecution"
    });

    console.log(result.effects?.status.status);
})();