import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { User } from "../../src/lib/user"
import { AccountType } from "../../src/types/account-types";
import { NETWORK, testKeypair } from "./utils";

(async () => {
    const client = new SuiClient({ url: getFullnodeUrl(NETWORK) });
    const user = await User.init(
        client,
        AccountType.MULTISIG,
        testKeypair.toSuiAddress(),
    )

    const userData = user.getData();
    console.log(userData);
})();