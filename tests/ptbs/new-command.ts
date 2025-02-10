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

    // ms.depositCap(tx, "0x2::package::UpgradeCap", "0x1077c3b838f82dc89585715a1460e6bd99cb7b67c11e470988ada077a5b0340a");
    // ms.modifyName(tx, "New Name");
    ms.depositTreasuryCap(tx, "0x1f445b827f5fcc3a2e43d03960afe057bfeb471a49162039b37d9f677c1fbb02::coin::COIN", "0xf58025c2eb61bba18f85ba0047b9f46bf568d0e17c8fb4bc6d7d21a55acbc04a");
    // ms.openKiosk(tx, "Degen");
    // ms.placeInKiosk(tx, "0x4c760cb20b90f6827d4e46b2913bdcd5a0a6193ba709899b7a2451aa75b7cbd6::nft::Nft", "0xd65dd1b4527a7b2c727b9f17a1be1602bf7d06ca9ae1b10b3f37f338f5a999ef", "0xf11636582aeec8fe118fddfbe22b286e1ddfac2007da87a3b805d19ff78ba643", "Degen", "0xd60a1301fbce1a3dac8bc177fe714374b21fb6d552d58e733f2636049909efb8");
    // TODO: test kiosk commands
    // ms.openTreasury(tx, "Investment");
    // ms.depositFromWallet(tx, "0x2::sui::SUI", "Investment", "0xbadece1e4b2529082f4b739f63eec441b399021cb6c3ed0559d9a9b362ab102f");
    // ms.depositUpgradeCap(tx, "Test", "0x10b286b04cf608b3b004729e107c1c432972d730375ad149aab31af33072792f");

    executeTx(tx);
})();