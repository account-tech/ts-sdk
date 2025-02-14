import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { User } from "../../src/lib/user"
import { NETWORK, testKeypair } from "./utils";

(async () => {
    const client = new SuiClient({ url: getFullnodeUrl(NETWORK) });
    const user = await User.init(
        client,
        "0x528b64ec15669c537d501d9260d321c56e948bd260459b6260a89cfd93178e15",
    )

    const userData = user.getData().invites;
    console.log(userData);
})();