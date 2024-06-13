import { KrakenClient } from "../src/client.js"

(async () => {
    const kraken = await KrakenClient.init(
        "localnet",
        "0x57c5bb70e02d527d80f75c06522a2088b3faf3c17f802b6f768808b4215c1f1f",
        "0x3c00d56434d581fdfd6e280626f7c8ee75cc9dac134d84290491e65f9b8b7161",
        "0x41d79e8873d60f953a8cf68956cc6c14ae29b33916e84b38111d8457e1f75dd9"
    )

    // console.log(kraken.multisig);
})();