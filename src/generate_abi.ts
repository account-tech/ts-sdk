import * as fs from "fs";
import * as path from "path";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { codegen } from '@typemove/sui/codegen';

(async () => {
    const url = getFullnodeUrl("testnet");
    const client = new SuiClient({ url });
    const packageId = "0x0000000000000000000000000000000000000000000000000000000000000002";
    const abisDir = "./abis";

    const abi = await client.getNormalizedMoveModulesByPackage({ package: packageId })
    if (!fs.existsSync(abisDir)) fs.mkdirSync(abisDir, { recursive: true });
    fs.writeFileSync(path.join(abisDir, packageId + '.json'), JSON.stringify(abi, null, 2))

    await codegen(abisDir, "./src/types", url)
})();

