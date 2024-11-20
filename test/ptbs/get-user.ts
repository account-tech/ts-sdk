import { SuiClient } from "@mysten/sui/client";
import { User } from "../../src/lib/user"
import { AccountType } from "../../src/types/account-types";

(async () => {
    const client = new SuiClient({ url: "testnet" });
    const user = await User.init(
        client,
        "0x3c00d56434d581fdfd6e280626f7c8ee75cc9dac134d84290491e65f9b8b7161",
        AccountType.MULTISIG
    )

    const userData = await user.getUser();
    console.log(userData);
})();