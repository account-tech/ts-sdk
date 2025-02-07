import { Transaction } from "@mysten/sui/transactions";
import { User } from "../../src/lib/user"
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { AccountType } from "../../src/types/account-types";
import { executeTx, NETWORK, testKeypair } from "./utils";

(async () => {
    const client = new SuiClient({ url: getFullnodeUrl(NETWORK) });
    const user = await User.init(client, AccountType.MULTISIG, testKeypair.toSuiAddress());

    const tx = new Transaction();

    let accountObj = user.createUser(tx);
    user.transferUser(tx, accountObj, testKeypair.toSuiAddress());
    
    executeTx(tx);
})();