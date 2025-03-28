import { Transaction } from "@mysten/sui/transactions";
import { MultisigClient } from "../../src/multisig-client";
import { NETWORK, MULTISIG, testKeypair, executeTx } from "./utils";

(async () => {
    const ms = await MultisigClient.init(
        NETWORK,
        testKeypair.toSuiAddress(),
        MULTISIG
    );
    const tx = new Transaction();

    ms.requestConfigMultisig(
        tx,
        {key: "Config members"},
        1,
        [],
        [
            {address: testKeypair.toSuiAddress(), weight: 1, roles: []},
        ]
    );
    
    executeTx(tx);
})();