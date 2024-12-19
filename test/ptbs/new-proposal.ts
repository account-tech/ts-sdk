import { Transaction } from "@mysten/sui/transactions";
import { MultisigClient } from "../../src/multisig-client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { ProposalTypes, AccessArgs } from "../../src/types/proposal-types";
import { NETWORK, MULTISIG, testKeypair, executeTx } from "./utils";

(async () => {
    const ms = await MultisigClient.init(
        NETWORK,
        testKeypair.toSuiAddress(),
        MULTISIG
    );
    const tx = new Transaction();

    ms.propose(
        tx, 
        ProposalTypes.Access,
        { key: "Lock Coin" }, // proposalArgs 
        { 
            capType: "0x2::package::UpgradeCap",
            capId: "0x1077c3b838f82dc89585715a1460e6bd99cb7b67c11e470988ada077a5b0340a",
        } as AccessArgs // actionsArgs
    );
    
    executeTx(tx);
})();