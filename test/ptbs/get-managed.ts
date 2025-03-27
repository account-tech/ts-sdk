import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Managed } from "../../src/lib/objects/managed"
import { MULTISIG, NETWORK } from "./utils";
import { Caps, Currencies, Kiosks, Packages, Vaults } from "../../src/lib";

(async () => {
    const client = new SuiClient({ url: getFullnodeUrl(NETWORK) });
    const managed = await Managed.init(client, MULTISIG, [Caps, Currencies, Kiosks, Packages, Vaults]);
    console.log(managed.assets);
})();
