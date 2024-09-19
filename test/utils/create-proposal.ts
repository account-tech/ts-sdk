import { Transaction } from "@mysten/sui/transactions";
import { KrakenClient } from "../../src/client";
import { ProposalBuilder } from "../../src/lib/proposal/builder";
import { ConfigNameProposal } from "../../src/lib/proposal/proposals/config";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { ProposalTypes } from "../../src/types/constants";

(async () => {
    const multisigId = "0x2516b30e82f8c1bbe6105e140cf470e8f53a3d4a097fe393bbd0cd6bdd9438e9";

    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    const kraken = await KrakenClient.init(
        "testnet",
        keypair.toSuiAddress(),
        multisigId,
    );

    const tx = new Transaction();
    kraken.propose(tx, ProposalTypes.configName, { key: "Change name" }, { name: "New name" });

    const result = await kraken.client.signAndExecuteTransaction({
        signer: keypair,
        transaction: tx,
        options: { showEffects: true, showObjectChanges: true },
        requestType: "WaitForLocalExecution"
    });

    if (result.effects?.status.status != "success") {
        console.log(result.effects?.status.error);
    }

    console.log(result.effects?.status.status);
    console.log(result.effects?.created);
})();