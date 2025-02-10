import { Transaction } from "@mysten/sui/transactions";
import { MultisigClient } from "../../src/multisig-client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { IntentTypes, BorrowCapArgs } from "../../src/types/intent-types";
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