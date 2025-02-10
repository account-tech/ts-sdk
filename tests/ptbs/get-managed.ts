import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Managed } from "../../src/lib/objects/managed"
import { MULTISIG, NETWORK } from "./utils";

(async () => {
    const client = new SuiClient({ url: getFullnodeUrl(NETWORK) });
    const managed = await Managed.init(client, MULTISIG);
    console.log(managed.getData());
})();
