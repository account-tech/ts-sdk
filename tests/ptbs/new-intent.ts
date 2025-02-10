import { Transaction } from "@mysten/sui/transactions";
import { MultisigClient } from "../../src/multisig-client";
import { IntentTypes, BorrowCapArgs } from "../../src/lib/intents";
import { NETWORK, MULTISIG, testKeypair, executeTx } from "./utils";

(async () => {
    const ms = await MultisigClient.init(
        NETWORK,
        testKeypair.toSuiAddress(),
        MULTISIG
    );
    const tx = new Transaction();

    ms.request(
        tx, 
        IntentTypes.BorrowCap,
        { key: "Lock Coin" }, // proposalArgs 
        { 
            capType: "0x2::package::UpgradeCap",
        } as BorrowCapArgs // actionsArgs
    );
    
    executeTx(tx);
})();