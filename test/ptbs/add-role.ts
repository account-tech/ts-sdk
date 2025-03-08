import { Transaction } from "@mysten/sui/transactions";
import { MultisigClient } from "../../src/multisig-client";
import { NETWORK, testKeypair, MULTISIG, executeTx } from "./utils";

let rolesToAdd = [
    
];

(async () => {
    const ms = await MultisigClient.init(
        NETWORK,
        testKeypair.toSuiAddress(),
        MULTISIG
    );

    // get current multisig data
    const multisigData = ms.multisig.getData();

    const tx = new Transaction();

    // add/remove/modify what you want starting from current data (Metadata is completely replaced)
    let roles = Object.entries(multisigData.roles).map(([name, role]) => ({ name, threshold: role.threshold }));
    // Add ConfigMetadataCommand role to the Multisig
    rolesToAdd.forEach(role => roles.push({ name: role, threshold: 1 }));

    let members = multisigData.members;
    // Add ConfigMetadataCommand role to current user
    const member = members.find(m => m.address === testKeypair.toSuiAddress());
    if (member) {
        rolesToAdd.forEach(role => member.roles.push(role));
    }

    // propose the config multisig
    ms.requestConfigMultisig(
        tx,
        multisigData.global.threshold, // keep the current global threshold
        roles,
        members,
        "add role",
    );
    await executeTx(tx);
    // refresh the multisig to get the new roles
    await ms.refresh();

    // execute the proposal 
    // const tx2 = new Transaction();
    // ms.execute(tx2, testKeypair.toSuiAddress(), "add role");
    // await executeTx(tx2);
})();