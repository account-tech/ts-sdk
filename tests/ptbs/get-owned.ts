import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Owned } from "../../src/lib/objects"
import { MULTISIG, NETWORK } from "./utils";

(async () => {
    const client = new SuiClient({ url: getFullnodeUrl(NETWORK) });
    const owned = await Owned.init(client, MULTISIG);
    console.log(owned.getData());
})();
