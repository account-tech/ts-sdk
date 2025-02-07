// import { assert } from 'chai';
// import { getFaucetHost, requestSuiFromFaucetV0 } from "@mysten/sui/faucet";
// import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
// import { Transaction } from "@mysten/sui/transactions";
// import { FRAMEWORK, KrakenClient, STDLIB } from "../src/index.js"
// import { SuiTransactionBlockResponse } from "@mysten/sui/client";
// import { PACKAGE_ID } from "../.gen/kraken/index.js";

// /// to run on localnet:
// /// `git clone https://github.com/MystenLabs/sui`  
// /// `cd sui`
// /// launch localnet: `RUST_LOG="off,sui_node=info" cargo run --bin sui-test-validator`
// /// get gas: `sui client faucet --url http://127.0.0.1:9123/gas`
// /// publish kiosk: `sui client publish ./test/packages/kiosk --gas-budget 1000000000 --skip-dependency-verification`
// /// modify package id in /test/packages/kiosk/Move.toml
// /// publish kraken: `sui client publish ../kraken/package --gas-budget 1000000000`
// /// modify package id in ../kraken/package/Move.toml
// /// run `bun run test`
// ///
// /// or use https://github.com/ChainMovers/suibase

// (async () => {
    
//     const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
//     console.log("Keypair address: ", keypair.toSuiAddress());

//     const { execSync } = require('child_process');
//     console.log(PACKAGE_ID);
//     const kraken = await KrakenClient.init("testnet", PACKAGE_ID, keypair.toSuiAddress());
//     // nftIds.length determines the number of nfts to issue
//     let nftIds: string[] = ["", "", ""];
        
//     // === get SUI ===

//     console.log("Get some SUI");
//     await requestSuiFromFaucetV0({
//         host: getFaucetHost("testnet"),
//         recipient: keypair.toSuiAddress(),
//     });

//     // === Publish, issue and handle Nfts ===
//     // {
//     //     const { modules, dependencies } = JSON.parse(execSync(
//     //         `"/home/tmarchal/.cargo/bin/sui" move build --dump-bytecode-as-base64 --path "./test/packages/nft"`, 
//     //         { encoding: 'utf-8' }
//     //     ));
//     //     // publish nft package
//     //     const tx = new Transaction();
//     //     const [upgradeCap] = tx.publish({ modules, dependencies });
//     //     tx.transferObjects([upgradeCap], keypair.getPublicKey().toSuiAddress());
//     //     const result = await executeTx(tx);
//     //     const packageObj = result.objectChanges?.find((obj) => obj.type === "published");
//     //     // create and transfer as many nft as nftIds.length and save the ids
//     //     const tx1 = new Transaction();
//     //     for (const _ of nftIds) {
//     //         const [nft] = tx1.moveCall({ target: `${packageObj?.packageId}::nft::new` });
//     //         tx1.transferObjects([nft], keypair.getPublicKey().toSuiAddress());
//     //     }
//     //     const result1 = await executeTx(tx1);
//     //     const ids = result1.objectChanges?.filter((obj) => obj.type === "created").map((obj) => obj.objectId);
//     //     nftIds = ids!;
//     //     console.log("Nfts issued and handled: ", nftIds);
//     // }

//     // === Handle Account ===
//     {    
//         await kraken.account?.fetchAccount();
//         if (!kraken.account?.id) {
//             const tx = new Transaction();
//             console.log(kraken)
//             kraken.account?.createAccount(tx, "Thouny", "");
//             await executeTx(tx);
//         }
//         console.log("User account handled:");
//     }
    
//     // === Create Multisig ===
//     {
//         const tx = new Transaction();
//         await kraken.account?.fetchAccount();
//         console.log(kraken.account);
        
//         kraken.createMultisig(tx, "Main", 1, ["0x67fa77f2640ca7e0141648bf008e13945263efad6dc429303ad49c740e2084a9"]);
//         await executeTx(tx);
//         console.log("Multisig created");
        
//         console.log("Update Account:")
//         await kraken.account?.fetchAccount();    
//         console.log(kraken.account);
        
//         console.log("Multisig cached:");
//         const multisigId = kraken.account?.multisigIds?.[kraken.account?.multisigIds.length - 1].id;
//         await kraken.fetch(multisigId);
//         console.log(kraken.multisig);

//         assert.equal(kraken.multisig?.version, 1);
//         assert.equal(kraken.multisig?.name, "Main");
//         assert.equal(kraken.multisig?.threshold, 1);
//         assert.deepEqual(kraken.multisig?.proposals, []);
//         assert.equal(kraken.multisig?.totalWeight, 2);
//     }

//     // === Modify Config ===
//     {
//         const tx = new Transaction();
//         kraken.proposeModify(tx, "modify", 0, 0, "", "Updated");
//         await executeTx(tx);
//         console.log("Config modified:");

//         await kraken.fetch();
//         console.log(kraken.multisig);
//         assert.equal(kraken.multisig?.name, "Updated");
//     };

//     // === Kiosk ===

//     // TODO:
//     // const kiosks = await kraken.getKiosks();
//     // const tx5 = new Transaction();
//     // if (kiosks.length == 0) {
//     //     const [kiosk, cap] = kraken.createKiosk(tx5);
//     // }
//     // await executeTx(tx5);

//     // === Helpers ===

//     async function executeTx(tx: Transaction): Promise<SuiTransactionBlockResponse> {
//         tx.setGasBudget(1000000000);
//         const result = await kraken.client.signAndExecuteTransaction({
//             signer: keypair,
//             transaction: tx,
//             options: { showEffects: true, showObjectChanges: true },
//             requestType: "WaitForLocalExecution"
//         });

//         if (result.effects?.status.status != "success") {
//             console.log(result.effects?.status.error);
//         }

//         assert.equal(result.effects?.status.status, "success");
//         return result;
//     }
// })();

