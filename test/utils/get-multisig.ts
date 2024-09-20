import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Multisig } from "../../src/lib/multisig.js"
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { PACKAGE_ID } from "../../src/.gen/kraken-multisig/index.js";
import { Transaction } from "@mysten/sui/transactions";
import { KrakenClient } from "../../src/client.js";

(async () => {
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    const kraken = await KrakenClient.init(
        "testnet",
        keypair.toSuiAddress(),
        "0x2516b30e82f8c1bbe6105e140cf470e8f53a3d4a097fe393bbd0cd6bdd9438e9"
    )
    console.log(kraken.proposal("Mint SUI"));
})();