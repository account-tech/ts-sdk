import { Transaction } from "@mysten/sui/transactions";
import { MultisigClient } from "../../src/multisig-client";
import { executeTx, NETWORK, testKeypair } from "./utils";

(async () => {
    const ms = await MultisigClient.init(
        NETWORK,
        testKeypair.toSuiAddress(),
    );

    const tx = new Transaction();

    ms.createMultisig(
        tx, 
        "Main", 
        { username: "Thouny", profilePicture: "https://example.com/avatar.png" }, 
        ["0x3f50ede2b1e41f3515f03be51be68befea18fc20e22166406e584bf73c62c85c"],
        // 2
    );
    
    executeTx(tx);
})();