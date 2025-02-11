import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { User } from "../../src/lib/user"
import { NETWORK, testKeypair } from "./utils";

(async () => {
    const client = new SuiClient({ url: getFullnodeUrl(NETWORK) });
    const user = await User.init(
        client,
        testKeypair.toSuiAddress(),
    )

    const userData = user.getData();
    console.log(userData);
})();