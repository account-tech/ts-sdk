import { Transaction } from "@mysten/sui/transactions";
import { MultisigClient } from "../../src/multisig-client";
import { executeTx, NETWORK, testKeypair } from "./utils";

(async () => {
    const ms = await MultisigClient.init(
        NETWORK,
        testKeypair.toSuiAddress(),
    );

    const tx = new Transaction();

    console.log(ms.user)

    ms.createMultisig(
        tx, 
        "Main", 
        { username: "Thouny", profilePicture: "https://example.com/avatar.png" }, 
        ["0x528b64ec15669c537d501d9260d321c56e948bd260459b6260a89cfd93178e15"],
        // 2
    );
    
    executeTx(tx);
})();