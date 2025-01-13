import { Transaction } from "@mysten/sui/transactions";
import { MultisigClient } from "../../src/multisig-client";
import { executeTx, NETWORK, MULTISIG, testKeypair } from "./utils";

(async () => {
    const ms = await MultisigClient.init(
        NETWORK,
        testKeypair.toSuiAddress(),
        MULTISIG,
    );

    const tx = new Transaction();
    ms.delete(tx, "add role");

    executeTx(tx);
})();