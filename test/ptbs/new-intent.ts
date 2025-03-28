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

    ms.requestMintAndTransfer(
        tx,
        {key: "Mint and transfer"},
        "0xfbf823f1aedf4de4f54508c8dceaf2c7cdfb6f7471a3f614bec079bba31f7e3c::coin::COIN",
        [
            { amount: BigInt(1000000000), recipient: "0x2b0228af0c0e13b24db3135a8c97295a53ff155ec651e35857eef70a696c8b4f"},
            { amount: BigInt(20000000000), recipient: "0x2b0228af0c0e13b24db3135a8c97295a53ff155ec651e35857eef70a696c8b4f"},
        ]
    );
    
    executeTx(tx);
})();