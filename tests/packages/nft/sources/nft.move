module nft::nft {

    use sui::{package, kiosk, transfer_policy::{Self, TransferPolicy, TransferPolicyCap}};
    use kiosk::{kiosk_lock_rule, royalty_rule, personal_kiosk_rule};

    public struct NFT has drop {}

    public struct Nft has key, store {
        id :UID
    }

    fun init(otw: NFT, ctx: &mut TxContext) {
        let publisher = package::claim(otw, ctx);

        let (policy, cap) = transfer_policy::new<Nft>(&publisher, ctx);

        transfer::public_share_object(policy);
        transfer::public_transfer(cap, ctx.sender());
        transfer::public_transfer(publisher, ctx.sender());
    }

    public fun add_rules(policy: &mut TransferPolicy<Nft>, cap: &TransferPolicyCap<Nft>) {
        kiosk_lock_rule::add(policy, cap);
        royalty_rule::add(policy, cap, 1, 0);
        personal_kiosk_rule::add(policy, cap);
    }

    public fun remove_rules(policy: &mut TransferPolicy<Nft>, cap: &TransferPolicyCap<Nft>) {
        transfer_policy::remove_rule<Nft, kiosk_lock_rule::Rule, kiosk_lock_rule::Config>(policy, cap);
        transfer_policy::remove_rule<Nft, royalty_rule::Rule, royalty_rule::Config>(policy, cap);
        transfer_policy::remove_rule<Nft, personal_kiosk_rule::Rule, bool>(policy, cap);
    }

    public fun create_nft_with_kiosk(ctx: &mut TxContext) {
        let (mut kiosk, cap) = kiosk::new(ctx);
        kiosk.place(&cap, new(ctx));

        transfer::public_share_object(kiosk);
        transfer::public_transfer(cap, ctx.sender());
    }

    public fun create_nft_with_kiosk_and_rules(policy: &TransferPolicy<Nft>, ctx: &mut TxContext) {
        let (mut kiosk, cap) = kiosk::new(ctx);
        kiosk.lock(&cap, policy, new(ctx));

        transfer::public_share_object(kiosk);
        transfer::public_transfer(cap, ctx.sender());
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
