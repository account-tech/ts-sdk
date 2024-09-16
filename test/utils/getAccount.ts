import { Account } from "../../src/lib/account.js"
import { PACKAGE_ID } from "../../.gen/kraken-multisig/index.js";

(async () => {
    const account = await Account.init(
        "testnet",
        PACKAGE_ID,
        "0x67fa77f2640ca7e0141648bf008e13945263efad6dc429303ad49c740e2084a9",
    )

    const acc = await account.getAccount("0x67fa77f2640ca7e0141648bf008e13945263efad6dc429303ad49c740e2084a9");    
    console.log(acc);
})();