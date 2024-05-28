import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { KrakenClient } from "../src/client.js"

(async () => {
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    const kraken = new KrakenClient(
        "testnet",
        "",
        "0xa5f326dd55a1b7fa179787e279c56af1c082663685c152d89fcf519f5fbfc744",
        keypair.toSuiAddress(),
        ""
    )

    const account = await kraken.getAccount(keypair.toSuiAddress());    
    console.log(account);
})();