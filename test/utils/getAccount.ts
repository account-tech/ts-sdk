import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Account } from "../../src/lib/account.js"
import { PACKAGE_ID } from "../../.gen/kraken/index.js";

(async () => {
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    const account = await Account.init(
        "localnet",
        PACKAGE_ID,
        keypair.toSuiAddress(),
    )

    const acc = await account.getAccount(keypair.toSuiAddress());    
    console.log(acc);
})();