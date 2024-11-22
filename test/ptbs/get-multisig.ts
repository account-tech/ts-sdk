import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { MultisigClient } from "../../src/multisig-client";

(async () => {
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    const ms = await MultisigClient.init(
        "testnet",
        keypair.toSuiAddress(),
        "0x8c4e23dd9d0b90dcd122807ab4c1c59af6221f88a7ab1f0a9f7e68a67d02956a"
    )
    console.log(ms.multisig.proposals);
})();