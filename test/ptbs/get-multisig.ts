import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { MultisigClient } from "../../src/multisig-client";

(async () => {
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    const ms = await MultisigClient.init(
        "testnet",
        keypair.toSuiAddress(),
        "0xef22166647326255140f47a01145fc8cf9f968a7de3e8d894ae62b6847d5b5b3"
    )
    console.log(ms);
})();