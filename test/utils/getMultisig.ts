import { Multisig } from "../../src/lib/multisig.js"
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { PACKAGE_ID } from "../../.gen/kraken/index.js";

(async () => {
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    const multisig = await Multisig.init(
        "localnet",
        PACKAGE_ID,
        keypair.toSuiAddress(),
    )

    const ms = await multisig.getMultisig("0xab88d653676fdb6ba987ec40cc424d8c75e3fb30f9398baf821bf8bdb96df879");
    console.log(ms);
})();