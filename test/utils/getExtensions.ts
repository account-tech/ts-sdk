import { Extensions } from "../../src/lib/extensions.js"

(async () => {
    const extensions = await Extensions.init("testnet" )

    const ext = await extensions.getExtensionsRaw();
    // console.log(ext);
})();