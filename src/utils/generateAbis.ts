import * as fs from "fs";
import path from 'path';
import { codegen } from '@typemove/sui/codegen';
import { KRAKEN, FRAMEWORK, STDLIB } from "../types/constants.js";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";

(async () => {
    
    const url = getFullnodeUrl("testnet")
    const client = new SuiClient({ url });

    // === Generate ABIs ===

    const abisDir = "./abis";
    const typesDir = "./src/types/sui";
    if (!fs.existsSync(abisDir)) fs.mkdirSync(abisDir, { recursive: true });
    
    const krakenAbi = await client.getNormalizedMoveModulesByPackage({ package: KRAKEN })
    fs.writeFileSync(path.join(abisDir, KRAKEN + '.json'), JSON.stringify(krakenAbi, null, 2))

    if (!fs.existsSync(path.join(abisDir, "0x1" + '.json'))) {
        const stdlibAbi = await client.getNormalizedMoveModulesByPackage({ package: STDLIB })
        fs.writeFileSync(path.join(abisDir, "0x1" + '.json'), JSON.stringify(stdlibAbi, null, 2))    
    }

    if (!fs.existsSync(path.join(abisDir, "0x2" + '.json'))) {
        const frameworkAbi = await client.getNormalizedMoveModulesByPackage({ package: FRAMEWORK })
        fs.writeFileSync(path.join(abisDir, "0x2" + '.json'), JSON.stringify(frameworkAbi, null, 2))    
    }
    await codegen(abisDir, typesDir, url);
})();