import { SuiClient } from "@mysten/sui/client";
import { Extensions } from "../../src/lib/extensions"

(async () => {
    const client = new SuiClient({ url: "testnet" });
    const extensions = await Extensions.init(client)

    const ext = await extensions.getExtensions();
    console.log(ext);
})();