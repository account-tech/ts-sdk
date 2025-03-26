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

    // ms.reorderMultisigs(tx, ["0x8e7c0b44b9552e2a25c53254c797f69e8cceed71745bca8e39daaad7796fa8f2", "0xd4ab6ea7a1ee3f277b1056d35595a4f2f1ef0fe1a98ed53f176cc545978e9ddb", "0x14c5ea70611c54558ce1b807064a27881cd85241e3b454cb75aef6fa611a96a7"]);
    
    ms.depositCap(tx, "0x2::package::Publisher", "0x290574ad812957bd511a5e2ac642ccbf999ebc25a7d38314723de7b1f5617814");
    // ms.modifyName(tx, "New Name");
    // ms.depositTreasuryCap(tx, "0x1f445b827f5fcc3a2e43d03960afe057bfeb471a49162039b37d9f677c1fbb02::coin::COIN", "0xf58025c2eb61bba18f85ba0047b9f46bf568d0e17c8fb4bc6d7d21a55acbc04a");
    // ms.openKiosk(tx, "Degen");
    // ms.placeInKiosk(tx, "0x4c760cb20b90f6827d4e46b2913bdcd5a0a6193ba709899b7a2451aa75b7cbd6::nft::Nft", "0xd65dd1b4527a7b2c727b9f17a1be1602bf7d06ca9ae1b10b3f37f338f5a999ef", "0xf11636582aeec8fe118fddfbe22b286e1ddfac2007da87a3b805d19ff78ba643", "Degen", "0xd60a1301fbce1a3dac8bc177fe714374b21fb6d552d58e733f2636049909efb8");
    // TODO: test kiosk commands
    // ms.openVault(tx, "Empty");
    // const coin = tx.splitCoins(tx.gas, [100000000]);
    // ms.depositFromWallet(tx, "0x2::sui::SUI", "Investment", coin);
    // ms.depositUpgradeCap(tx, "TestPackage", "0x1c8e2d50bfc4b462609ae4789d25130ac6e4dddd3dbb17279172b2145d055521");

    executeTx(tx);
})();