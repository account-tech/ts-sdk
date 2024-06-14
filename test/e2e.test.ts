import { describe, it, expect } from 'vitest';
import * as fs from "fs";
import { getFaucetHost, requestSuiFromFaucetV0 } from "@mysten/sui.js/faucet";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { FRAMEWORK, KrakenClient, KRAKEN, STDLIB } from "../src/index.js"
import { SuiTransactionBlockResponse } from "@mysten/sui.js/client";
import { codegen } from '@typemove/sui/codegen';
import path from 'path';

/// to run on localnet:
/// `git clone https://github.com/MystenLabs/sui`  
/// `cd sui`
/// launch localnet: `RUST_LOG="off,sui_node=info" cargo run --bin sui-test-validator`
/// get gas: `sui client faucet --url http://127.0.0.1:9123/gas`
/// publish kiosk: `sui client publish ./test/packages/kiosk --gas-budget 1000000000 --skip-dependency-verification`
/// modify package id in /test/packages/kiosk/Move.toml
/// change kraken's kiosk dependency to local
/// run `bun run prepare-package-abi-for-tests` to publish package and create abi
/// run `bun run vitest`
///
/// or use https://github.com/ChainMovers/suibase
/// run `bun run prepare-package-abi` to publish package and create abi

describe("Interact with Kraken SDK on localnet" ,async () => {
    
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    console.log("Keypair address: ", keypair.toSuiAddress());

    const { execSync } = require('child_process');
    const abiPath = path.join(__dirname, './abis/kraken.json');
    const abiData = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
    const kraken = await KrakenClient.init("localnet", abiData.account.address, keypair.toSuiAddress());
    // nftIds.length determines the number of nfts to issue
    let nftIds: string[] = ["", "", ""];
        console.log(kraken.multisig)
        
    // === get SUI ===

    // console.log("Get some SUI");
    // await requestSuiFromFaucetV0({
    //     host: getFaucetHost("localnet"),
    //     recipient: keypair.toSuiAddress(),
    // });

    // === Publish, issue and handle Nfts ===
    // {
    //     const { modules, dependencies } = JSON.parse(execSync(
    //         `"/home/tmarchal/.cargo/bin/sui" move build --dump-bytecode-as-base64 --path "./test/packages/nft"`, 
    //         { encoding: 'utf-8' }
    //     ));
    //     // publish nft package
    //     const tx = new TransactionBlock();
    //     const [upgradeCap] = tx.publish({ modules, dependencies });
    //     tx.transferObjects([upgradeCap], keypair.getPublicKey().toSuiAddress());
    //     const result = await executeTx(tx);
    //     const packageObj = result.objectChanges?.find((obj) => obj.type === "published");
    //     // create and transfer as many nft as nftIds.length and save the ids
    //     const tx1 = new TransactionBlock();
    //     for (const _ of nftIds) {
    //         const [nft] = tx1.moveCall({ target: `${packageObj?.packageId}::nft::new` });
    //         tx1.transferObjects([nft], keypair.getPublicKey().toSuiAddress());
    //     }
    //     const result1 = await executeTx(tx1);
    //     const ids = result1.objectChanges?.filter((obj) => obj.type === "created").map((obj) => obj.objectId);
    //     nftIds = ids!;
    //     console.log("Nfts issued and handled: ", nftIds);
    // }

    // === Handle Account ===
    {    
        await kraken.account?.fetchAccount();
        if (!kraken.account?.id) {
            console.log("hhehe")
            const tx = new TransactionBlock();
            kraken.account?.createAccount(tx, "Thouny", "");
            await executeTx(tx);
        }
        console.log("User account handled:");
    }
    
    // // === Create Multisig ===
    {
        const tx = new TransactionBlock();
        await kraken.account?.fetchAccount();
        console.log(kraken.account);
        
        kraken.createMultisig(tx, "Main", 1, ["0x67fa77f2640ca7e0141648bf008e13945263efad6dc429303ad49c740e2084a9"]);
        await executeTx(tx);
        console.log("Multisig created");
        
        console.log("Update Account:")
        await kraken.account?.fetchAccount();    
        console.log(kraken.account);
        
        console.log("Multisig cached:");
        const multisigId = kraken.account?.multisigIds?.[kraken.account?.multisigIds.length - 1].id;
        await kraken.fetch(multisigId);
        console.log(kraken.multisig);

        expect(kraken.multisig?.version).toEqual(1);
        expect(kraken.multisig?.name).toEqual("Main");
        expect(kraken.multisig?.threshold).toEqual(1);
        expect(kraken.multisig?.proposals).toEqual([]);
        expect(kraken.multisig?.totalWeight).toEqual(1);
    }

    // // === Modify Config ===
    it('modifies Config', async () => {
        const tx = new TransactionBlock();
        kraken.proposeModify(tx, "modify", 0, 0, "", "Updated");
        await executeTx(tx);
        console.log("Config modified:");

        await kraken.fetch();
        console.log(kraken.multisig);
        expect(kraken.multisig?.name).toEqual("Updated");
    });

    // === Kiosk ===

    // TODO:
    // const kiosks = await kraken.getKiosks();
    // const tx5 = new TransactionBlock();
    // if (kiosks.length == 0) {
    //     const [kiosk, cap] = kraken.createKiosk(tx5);
    // }
    // await executeTx(tx5);

    // === Helpers ===

    async function executeTx(tx: TransactionBlock): Promise<SuiTransactionBlockResponse> {
        tx.setGasBudget(1000000000);
        const result = await kraken.client.signAndExecuteTransactionBlock({
            signer: keypair,
            transactionBlock: tx,
            options: { showEffects: true, showObjectChanges: true },
            requestType: "WaitForLocalExecution"
        });

        if (result.effects?.status.status != "success") {
            console.log(result.effects?.status.error);
        }

        expect(result.effects?.status.status).toEqual("success");
        return result;
    }
});

