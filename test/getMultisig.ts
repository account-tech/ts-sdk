import { KrakenClient } from "../src/client.js"

(async () => {
    const kraken = new KrakenClient(
        "localnet",
        "",
        "0xc38d7f0b69cc68cfb589d773952a7f3e3181c473790cb7c54ef78b8d8d256ce7",
        "0x3c00d56434d581fdfd6e280626f7c8ee75cc9dac134d84290491e65f9b8b7161",
        ""
    )

    const multisig = await kraken.getMultisig("0x0e16f16f875ae61c8fed57561d23d1e542cb1565a9b3f8b0c242beb8ce3c2719");
    console.log(multisig);
})();