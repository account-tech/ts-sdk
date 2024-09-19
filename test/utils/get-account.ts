import { SuiClient } from "@mysten/sui/client";
import { Account } from "../../src/lib/account.js"

(async () => {
    const client = new SuiClient({ url: "testnet" });
    const account = await Account.init(
        client,
        "0x3c00d56434d581fdfd6e280626f7c8ee75cc9dac134d84290491e65f9b8b7161",
    )

    const acc = await account.getAccount();
    console.log(acc);
})();