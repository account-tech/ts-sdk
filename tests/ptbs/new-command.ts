import { Transaction } from "@mysten/sui/transactions";
import { MultisigClient } from "../../src/multisig-client";
import { executeTx, MULTISIG, NETWORK, testKeypair } from "./utils";

(async () => {
    const ms = await MultisigClient.init(
        NETWORK,
        testKeypair.toSuiAddress(),
        MULTISIG,
    );

    const tx = new Transaction();

    // ms.depositCap(tx, "0x2::package::UpgradeCap", "0x02dabd6e653d8865fea05281492ce7c4d336275954d8e142df91dee7afcfe376");
    // ms.modifyName(tx, "New Name");
    // ms.depositTreasuryCap(tx, "0x15dda8f08a5908882a6006b485bcf9d121e3e5365d7df1c4c21aa82ed695e32c::coin::COIN", "0x6a1f64b62920cd2c23e0279645fb462826034a8a442fccbfa7ef7609fe984173");
    // ms.openKiosk(tx, "Degen");
    ms.placeInKiosk(tx, "0x4c760cb20b90f6827d4e46b2913bdcd5a0a6193ba709899b7a2451aa75b7cbd6::nft::Nft", "0xd65dd1b4527a7b2c727b9f17a1be1602bf7d06ca9ae1b10b3f37f338f5a999ef", "0xf11636582aeec8fe118fddfbe22b286e1ddfac2007da87a3b805d19ff78ba643", "Degen", "0xd60a1301fbce1a3dac8bc177fe714374b21fb6d552d58e733f2636049909efb8");
    // TODO: test kiosk commands
    // ms.openTreasury(tx, "Investment");
    // ms.depositFromAccount(tx, "Investment", "0xbadece1e4b2529082f4b739f63eec441b399021cb6c3ed0559d9a9b362ab102f"); // TODO: test
    // ms.depositFromWallet(tx, "0x2::sui::SUI", "Investment", "0xbadece1e4b2529082f4b739f63eec441b399021cb6c3ed0559d9a9b362ab102f");
    // ms.depositUpgradeCap(tx, "0x2::package::UpgradeCap", "0x073fbd101f1a53e5e35ee2b86ecb30b71dc26516985fa530747f6896fb855320");

    executeTx(tx);
})();