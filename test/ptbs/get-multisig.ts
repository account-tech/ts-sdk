import { MultisigClient } from "../../src/multisig-client";
import { MULTISIG, NETWORK, testKeypair } from "./utils";

(async () => {
    const ms = await MultisigClient.init(
        NETWORK,
        testKeypair.toSuiAddress(),
        MULTISIG
    )
    console.log(ms.intents);
})();