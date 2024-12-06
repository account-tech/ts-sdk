import { Transaction } from "@mysten/sui/transactions";
import { MultisigClient } from "../../src/multisig-client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { CommandTypes } from "../../src/types/command-types";

(async () => {
    // ! important: set the correct multisig id
    const multisigId = "0xef22166647326255140f47a01145fc8cf9f968a7de3e8d894ae62b6847d5b5b3";

    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    const ms = await MultisigClient.init(
        "testnet",
        keypair.toSuiAddress(),
        multisigId,
    );

    // get current multisig data
    const multisigData = ms.multisig.getData();

    const tx = new Transaction();
    tx.setGasBudget(100000000);

    // add/remove/modify what you want starting from current data (Metadata is completely replaced)
    let roles = Array.from(multisigData.roles.entries()).map(([name, role]) => ({ name, threshold: role.threshold }));
    // Add ConfigMetadataCommand role to the Multisig
    roles.push({ name: CommandTypes.ConfigMetadata, threshold: 1 });

    let members = multisigData.members;
    // Add ConfigMetadataCommand role to current user
    const member = members.find(m => m.address === keypair.toSuiAddress());
    if (member) {
        member.roles.push(CommandTypes.ConfigMetadata);
    }

    ms.proposeConfigMultisig(
        tx,
        multisigData.global.threshold, // keep the current global threshold
        roles,
        members,
        "Add ConfigMetadata role",
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