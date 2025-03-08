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

    ms.requestToggleUnverifiedDepsAllowed(
        tx,
        true,
        "Toggle Unverified Allowed",
    );
    
    executeTx(tx);
})();