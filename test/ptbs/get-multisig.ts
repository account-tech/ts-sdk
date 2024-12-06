import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { MultisigClient } from "../../src/multisig-client";

(async () => {
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    const ms = await MultisigClient.init(
        "testnet",
        keypair.toSuiAddress(),
        "0xdd50ac61bb4ec05ce67538c873339fbcf87869cd2cc10a84ff0aa0b34fee6a16"
    )
    console.log(ms.proposal("Add ConfigMetadata role")?.args);
})();