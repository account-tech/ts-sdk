import { Transaction } from "@mysten/sui/transactions";
import { MultisigClient } from "../../src/multisig-client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { ProposalTypes, AccessArgs } from "../../src/types/proposal-types";

(async () => {
    // ! important: set the correct multisig id
    const multisigId = "0x4e75223dac595053583860d48637baad0471d4d9021f6b60dbcc87c2039e72e5";

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
        ProposalTypes.Access,
        { key: "Lock Coin" }, // proposalArgs 
        { 
            capType: "0x2::package::UpgradeCap",
            capId: "0x1077c3b838f82dc89585715a1460e6bd99cb7b67c11e470988ada077a5b0340a",
        } as AccessArgs // actionsArgs
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