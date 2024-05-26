import assert from "assert";
import { getFaucetHost, requestSuiFromFaucetV0 } from "@mysten/sui.js/faucet";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { FRAMEWORK, KrakenClient, PACKAGE, STDLIB } from "../index.js"
import { SuiTransactionBlockResponse } from "@mysten/sui.js/client";

// to run on localnet:
// `git clone https://github.com/MystenLabs/sui`  
// `cd sui`
// launch localnet: `RUST_LOG="off,sui_node=info" cargo run --bin sui-test-validator`
// or use https://github.com/ChainMovers/suibase


(async () => {
    
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    
    let nftIds: string[] = ["", "", ""];

    // helper function
    async function executeTx(tx: TransactionBlock): Promise<SuiTransactionBlockResponse> {
        tx.setGasBudget(1000000000);
        const result = await kraken.client.signAndExecuteTransactionBlock({
            signer: keypair,
            transactionBlock: tx,
            options: { showEffects: true, showObjectChanges: true },
            requestType: "WaitForLocalExecution"
        });

        assert.equal(result.effects?.status.status, "success");
        return result;
    }
        
    // === get SUI ===

    await requestSuiFromFaucetV0({
        host: getFaucetHost("localnet"),
        recipient: keypair.toSuiAddress(),
    });
    const kraken = new KrakenClient("localnet", "", "", keypair.toSuiAddress(), "");
    const { execSync } = require('child_process');

    // === Publish Package ===
    {
        const { modules, dependencies } = JSON.parse(execSync(
            `"/home/tmarchal/.cargo/bin/sui" move build --dump-bytecode-as-base64 --path "../kraken/package/"`, 
            { encoding: 'utf-8' }
        ));
        const tx = new TransactionBlock();
        const [upgradeCap] = tx.publish({ modules,dependencies });
        tx.transferObjects([upgradeCap], keypair.getPublicKey().toSuiAddress());
        const result = await executeTx(tx);

        const packageObj = result.objectChanges?.find((obj) => obj.type === "published");
        kraken.packageId = packageObj!.packageId;
        console.log("Package published: ", kraken.packageId);
    }

    // === Issue and handle Nfts ===
    {
        const { modules, dependencies } = JSON.parse(execSync(
            `"/home/tmarchal/.cargo/bin/sui" move build --dump-bytecode-as-base64 --path "./src/test/package/"`, 
            { encoding: 'utf-8' }
        ));
        // publish nft package
        const tx = new TransactionBlock();
        const [upgradeCap] = tx.publish({ modules, dependencies });
        tx.transferObjects([upgradeCap], keypair.getPublicKey().toSuiAddress());
        const result = await executeTx(tx);
        const packageObj = result.objectChanges?.find((obj) => obj.type === "published");
        console.log(packageObj?.packageId);
        // create and transfer as many nft as nftIds.length and save the ids
        const tx1 = new TransactionBlock();
        for (const _ of nftIds) {
            const [nft] = tx1.moveCall({ target: `${packageObj?.packageId}::nft::new` });
            tx1.transferObjects([nft], keypair.getPublicKey().toSuiAddress());
        }
        const result1 = await executeTx(tx1);
        const ids = result1.objectChanges?.filter((obj) => obj.type === "created").map((obj) => obj.objectId);
        nftIds = ids!;
        console.log("Nfts issued and handled: ", nftIds);
    }

    // === Handle Account ===
    {    
        const existingAccount = await kraken.getAccount();
        if (existingAccount.id == "") {
            const tx = new TransactionBlock();
            kraken.createAccount(tx, "Thouny", "");
            await executeTx(tx);
        }
        console.log("User account handled:");
    }
    
    // === Create Multisig ===
    {
        const tx = new TransactionBlock();
        const currentAccount = await kraken.getAccount();
        console.log(currentAccount);
        
        kraken.createMultisig(tx, "Main", [], currentAccount!.id);
        await executeTx(tx);
        console.log("Multisig created:");
        
        const account = await kraken.getAccount();
        console.log(account);
        const multisigId = account!.multisigs[account!.multisigs.length - 1];
        kraken.multisigId = multisigId;
        await kraken.fetchMultisigData();
        console.log(kraken.multisigData);
        assert.deepEqual(kraken.multisigData, {
            name: "Main",
            threshold: "1",
            members: [account],
            proposals: []
        })
    }

    // === Modify Config ===
    {
        const txConfig = new TransactionBlock();
        kraken.proposeModify(txConfig, "modify", 0, 0, "", { name: "Updated", toAdd: ["0x608f5242acdbe2bc779de586864dc914d0dee1adfe4654b560bd5019886daa29"] });
        await executeTx(txConfig);
        console.log("Config modified:");

        const account = await kraken.getAccount();
        await kraken.fetchMultisigData();
        console.log(kraken.multisigData);
        assert.deepEqual(kraken.multisigData, {
            name: "Updated",
            threshold: "1",
            members: [account, { 
                owner: "0x608f5242acdbe2bc779de586864dc914d0dee1adfe4654b560bd5019886daa29",
                id: "",
                username: "",
                profilePicture: "",
                multisigs: []
            }],
            proposals: []
        })
    }

    // === Kiosk ===

    // TODO:
    // const kiosks = await kraken.getKiosks();
    // const tx5 = new TransactionBlock();
    // if (kiosks.length == 0) {
    //     const [kiosk, cap] = kraken.createKiosk(tx5);
    // }
    // await executeTx(tx5);

})();

