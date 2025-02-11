import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Extensions } from "../../src/lib/extensions"
import { NETWORK } from "./utils";

(async () => {
    const client = new SuiClient({ url: getFullnodeUrl(NETWORK) });
    const extensions = await Extensions.init(client)
    console.log(extensions.getData());
})();