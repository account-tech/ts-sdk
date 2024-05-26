module nft::nft {

    public struct Nft has key, store {
        id :UID
    }

    public fun new(ctx: &mut TxContext): Nft {
        Nft {
            id: object::new(ctx)
        }
    } 

    public fun destroy(self: Nft) {
        let Nft { id } = self;
        id.delete();
    }
}
