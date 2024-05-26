import assert from "assert";
import { getFaucetHost, requestSuiFromFaucetV0 } from "@mysten/sui.js/faucet";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { FRAMEWORK, KrakenClient, PACKAGE, STDLIB } from "../src/index.js"

// `git clone https://github.com/MystenLabs/sui`  
// `cd sui`
// launch localnet: `RUST_LOG="off,sui_node=info" cargo run --bin sui-test-validator`
// or use https://github.com/ChainMovers/suibase


(async () => {
    
    const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from("AM06bExREdFceWiExfSacTJ+64AQtFl7SRkSiTmAqh6F", "base64")).slice(1));
    
    let packageId: string | null = null;

    async function executeTx(tx: TransactionBlock) {
        tx.setGasBudget(10000000);
        const result = await kraken.client.signAndExecuteTransactionBlock({
            signer: keypair,
            transactionBlock: tx,
            options: { showEffects: true },
            requestType: "WaitForLocalExecution"
        });
        assert.equal(result.effects?.status.status, "success");
    }
        
    // === get SUI ===

    await requestSuiFromFaucetV0({
        host: getFaucetHost("localnet"),
        recipient: keypair.toSuiAddress(),
    });

    // === Publish Package ===

    const { execSync } = require('child_process');
    const { modules, dependencies } = JSON.parse(execSync(
        `"/home/tmarchal/.cargo/bin/sui" move build --dump-bytecode-as-base64 --path "../kraken/package/"`, 
        { encoding: 'utf-8' }
    ));

    const client = new KrakenClient("localnet", "", packageId!, keypair.toSuiAddress(), "").client;
    const tx1 = new TransactionBlock();
    const [upgradeCap] = tx1.publish({ modules,dependencies });
    tx1.transferObjects([upgradeCap], keypair.getPublicKey().toSuiAddress());
    const result1 = await client.signAndExecuteTransactionBlock({
        signer: keypair,
        transactionBlock: tx1,
        options: { showObjectChanges: true },
        requestType: "WaitForLocalExecution"
    });

    const packageObj = result1.objectChanges?.find((obj) => obj.type === "published");
    packageId = packageObj!.packageId;
    console.log("Package published: ", packageId);

    // Instantiate KrakenClient with no multisig
    const kraken = new KrakenClient("localnet", "", packageId!, keypair.toSuiAddress(), "");

    // === Handle Account ===

    const tx2 = new TransactionBlock();
    const existingAccount = await kraken.getAccount();
    if(existingAccount.id == "") { kraken.createAccount(tx2, "Thouny", "") }
    await executeTx(tx2);
    console.log("User account handled:");
    
    // === Create Multisig ===
    
    const tx3 = new TransactionBlock();
    const currentAccount = await kraken.getAccount();
    console.log(currentAccount);
    
    kraken.createMultisig(tx3, "Main", [], currentAccount!.id);
    await executeTx(tx3);
    console.log("Multisig created:");
    
    const updatedAccount = await kraken.getAccount();
    console.log(updatedAccount);
    const multisigId = updatedAccount!.multisigs[updatedAccount!.multisigs.length - 1];
    kraken.multisigId = multisigId;
    await kraken.fetchMultisigData();
    console.log(kraken.multisigData);
    assert.deepEqual(kraken.multisigData, {
        name: "Main",
        threshold: "1",
        members: [updatedAccount],
        proposals: []
    })
    
    // === Modify Config ===
    
    const tx4 = new TransactionBlock();
    kraken.proposeModify(tx4, "modify", 0, 0, "", { name: "Updated", toAdd: ["0x608f5242acdbe2bc779de586864dc914d0dee1adfe4654b560bd5019886daa29"] });
    await executeTx(tx4);
    console.log("Config modified:");
    await kraken.fetchMultisigData();
    console.log(kraken.multisigData);
    assert.deepEqual(kraken.multisigData, {
        name: "Updated",
        threshold: "1",
        members: [updatedAccount, { 
            owner: "0x608f5242acdbe2bc779de586864dc914d0dee1adfe4654b560bd5019886daa29",
            id: "",
            username: "",
            profilePicture: "",
            multisigs: []
        }],
        proposals: []
    })
})();

