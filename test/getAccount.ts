import { KrakenClient } from "../src/client.js"

(async () => {
    const kraken = new KrakenClient(
        "testnet",
        "",
        "0x06b1b13873c2a5eea9e440af1c2478a90adf6b15c95c33381d3ebb350a1e60f4",
        "0x67fa77f2640ca7e0141648bf008e13945263efad6dc429303ad49c740e2084a9",
        ""
    )

    const account = await kraken.getAccount("0x67fa77f2640ca7e0141648bf008e13945263efad6dc429303ad49c740e2084a9");
    console.log(account);
})();