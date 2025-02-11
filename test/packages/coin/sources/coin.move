module coin::coin;

use sui::coin::{Self, Coin, TreasuryCap};

public struct COIN has drop {}

fun init(witness: COIN, ctx: &mut TxContext) {
    let (treasury_cap, metadata) = coin::create_currency<COIN>(witness, 9, b"COIN", b"Coin", b"This is a coin", option::none(), ctx);
    transfer::public_share_object(metadata);
    transfer::public_transfer(treasury_cap, @0x3c00d56434d581fdfd6e280626f7c8ee75cc9dac134d84290491e65f9b8b7161)
} 

public fun mint(
    treasury_cap: &mut TreasuryCap<COIN>, amount: u64, ctx: &mut TxContext
): Coin<COIN> {
    coin::mint(treasury_cap, amount, ctx)
}

public entry fun mint_and_transfer(
    treasury_cap: &mut TreasuryCap<COIN>, amount: u64, recipient: address, ctx: &mut TxContext
) {
    coin::mint_and_transfer(treasury_cap, amount, recipient, ctx);
}

public entry fun burn(treasury_cap: &mut TreasuryCap<COIN>, coin: Coin<COIN>) {
    coin::burn(treasury_cap, coin);
}
