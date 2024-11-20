import { Transaction } from "@mysten/sui/transactions";
import { User } from "../../src/lib/user"
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { AccountType } from "../../src/types/account-types";

(async () => {
    
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    const client = new SuiClient({ url: getFullnodeUrl("testnet") });
    const user = await User.init(client, keypair.toSuiAddress(), AccountType.MULTISIG);

    const tx = new Transaction();
    tx.setGasBudget(1000000000);

    let accountObj = user.createUser(tx);
    user.transferUser(tx, accountObj, keypair.toSuiAddress());
    
    const result = await user.client.signAndExecuteTransaction({
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