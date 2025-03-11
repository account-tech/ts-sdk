/// Example of an unlimited "Sui Hero" collection - anyone can
/// mint their Hero. Shows how to initialize the `Publisher` and how
/// to use it to get the `Display<Hero>` object - a way to describe a
/// type for the ecosystem.
module object::my_hero;

use std::string::String;

// The creator bundle: these two packages often go together.
use sui::package;
use sui::display;

/// The Hero - an outstanding collection of digital art.
public struct Hero has key, store {
    id: UID,
    name: String,
    image_url: String,
}

/// One-Time-Witness for the module.
public struct MY_HERO has drop {}

/// Claim the `Publisher` object in the module initializer 
/// to then create a `Display`. The `Display` is initialized with
/// a set of fields (but can be modified later) and published via
/// the `update_version` call.
///
/// Keys and values are set in the initializer but could also be
/// set after publishing if a `Publisher` object was created.
fun init(otw: MY_HERO, ctx: &mut TxContext) {
    let keys = vector[
        b"name".to_string(),
        b"link".to_string(),
        b"image_url".to_string(),
        b"description".to_string(),
        b"project_url".to_string(),
        b"creator".to_string(),
    ];

    let values = vector[
        // For `name` one can use the `Hero.name` property
        b"{name}".to_string(),
        // For `link` one can build a URL using an `id` property
        b"https://sui-heroes.io/hero/{id}".to_string(),
        // For `image_url` use an IPFS template + `image_url` property.
        b"ipfs://{image_url}".to_string(),
        // Description is static for all `Hero` objects.
        b"A true Hero of the Sui ecosystem!".to_string(),
        // Project URL is usually static
        b"https://sui-heroes.io".to_string(),
        // Creator field can be any
        b"Unknown Sui Fan".to_string(),
    ];

    // Claim the `Publisher` for the package!
    let publisher = package::claim(otw, ctx);

    // Get a new `Display` object for the `Hero` type.
    let mut display = display::new_with_fields<Hero>(
        &publisher, keys, values, ctx
    );

    // Commit first version of `Display` to apply changes.
    display.update_version();

    transfer::public_transfer(publisher, ctx.sender());
    transfer::public_transfer(display, ctx.sender());

    mint_and_transfer(@0x6483b462eb7bef44ac35967d5f0f3bc1659c9c522676c9bdf675cd14d7a8d436, ctx);
    mint_and_transfer(@0x6483b462eb7bef44ac35967d5f0f3bc1659c9c522676c9bdf675cd14d7a8d436, ctx);
    mint_and_transfer(@0x6483b462eb7bef44ac35967d5f0f3bc1659c9c522676c9bdf675cd14d7a8d436, ctx);
    mint_and_transfer(@0x6483b462eb7bef44ac35967d5f0f3bc1659c9c522676c9bdf675cd14d7a8d436, ctx);
    mint_and_transfer(@0x6483b462eb7bef44ac35967d5f0f3bc1659c9c522676c9bdf675cd14d7a8d436, ctx);
}

/// Anyone can mint their `Hero`!
public fun mint(name: String, image_url: String, ctx: &mut TxContext): Hero {
    Hero {
        id: object::new(ctx),
        name,
        image_url
    }
}

public entry fun mint_and_transfer(recipient: address, ctx: &mut TxContext) {
    let hero = mint(b"Hero".to_string(), b"https://sui-heroes.io/hero/1".to_string(), ctx);
    transfer::public_transfer(hero, recipient);
}