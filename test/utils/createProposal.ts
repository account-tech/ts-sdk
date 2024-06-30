import { Transaction } from "@mysten/sui/transactions";
import { KrakenClient } from "../../src/client.js"
import { Multisig } from "../../src/lib/multisig.js";
import { ProposalBuilder } from "../../src/lib/proposals/proposalBuilder.js";
import { ProposalService } from "../../src/lib/proposals/proposalService.js";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";

(async () => {
    const network = "localnet";
    const packageId = "0x57c5bb70e02d527d80f75c06522a2088b3faf3c17f802b6f768808b4215c1f1f";
    const userAddr = "0x3c00d56434d581fdfd6e280626f7c8ee75cc9dac134d84290491e65f9b8b7161";
    const multisigId = "0x41d79e8873d60f953a8cf68956cc6c14ae29b33916e84b38111d8457e1f75dd9";

    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    const client = new SuiClient({ url: getFullnodeUrl(network) });
    
    const multisig = await Multisig.init(
        network,
        packageId,
        userAddr,
        multisigId,
    );

    const tx = new Transaction();
    const service = new ProposalService(packageId, multisigId);
    const builder = new ProposalBuilder(tx, multisig, service);

    builder
        .setAction("modify")
        .propose("modif", 0 , 0, "", 1)
        .run(client, keypair)
        .then((result) => {
            console.log(result);
        });

})();