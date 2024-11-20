import { Transaction } from "@mysten/sui/transactions";
import { MultisigClient } from "../../src/multisig-client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { ProposalTypes, ConfigDepsArgs, MintArgs } from "../../src/types/proposal-types";
import { FRAMEWORK } from "../../src/types/constants";

(async () => {
    const multisigId = "0x8c4e23dd9d0b90dcd122807ab4c1c59af6221f88a7ab1f0a9f7e68a67d02956a";

    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    const ms = await MultisigClient.init(
        "testnet",
        keypair.toSuiAddress(),
        multisigId,
    );

    const tx = new Transaction();
    tx.setGasBudget(100000000);

    ms.propose(
        tx, 
        ProposalTypes.ConfigDeps,
        { key: "Same Deps" }, // proposalArgs 
        { deps: [
            // {
            //     name: "AccountProtocol",
            //     addr: "0x0216b1790ffa86e5147b8ace8b2bdc0ba04fe5970d42eddcf33f8f3512134adc",
            //     version: 1,
            // },
        ] } as ConfigDepsArgs // actionsArgs
    );

    const result = await ms.client.signAndExecuteTransaction({
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