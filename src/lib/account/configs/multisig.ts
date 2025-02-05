import { Transaction, TransactionArgument, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import { Account as AccountRaw } from "../../../.gen/account-protocol/account/structs";
import { Multisig as MultisigRaw, Approvals as ApprovalsRaw } from "../../../.gen/account-config/multisig/structs";
import { newAccount } from "../../../.gen/account-config/multisig/functions";
import * as configMultisig from "../../../.gen/account-config/multisig/functions";
import * as config from "../../../.gen/account-protocol/config/functions";
import { approveIntent, disapproveIntent, executeIntent, authenticate, emptyOutcome, join, leave } from "../../../.gen/account-config/multisig/functions"
import { DepFields } from "../../../.gen/account-protocol/deps/structs";
import { MemberFields, RoleFields } from "../../../.gen/account-config/multisig/structs";
import { IntentFields as IntentFieldsRaw } from "../../../.gen/account-protocol/intents/structs";
import { CLOCK, EXTENSIONS, MULTISIG_GENERICS, SUI_FRAMEWORK } from "../../../types/constants";
import { User } from "../../user";
import { Intent, IntentStatus } from "../../intents/intent";
import { AccountType } from "../../../types/account-types";
import { ConfigDepsArgs, ConfigMultisigArgs, IntentArgs, IntentFields, IntentTypes } from "../../../types/intent-types";
import { TransactionPureInput } from "src/types/helper-types";
// import { BurnProposal, MintProposal, UpdateProposal } from "../../intents/account-actions/currency";
import { Account, Dep } from "../account";
import { Outcome } from "src/lib/outcomes/variants/outcome";
import { Approvals } from "src/lib/outcomes/variants/approvals";
import { ConfigMultisigIntent } from "src/lib/intents/account-actions/multisig";
import { ConfigDepsIntent } from "../../intents/account-actions/config";
import { AccountData } from "../account";
import { Managed } from "src/lib/objects/managed";
import { BorrowCapIntent } from "src/lib/intents/account-actions/access-control";
import { DisableRulesIntent, MintAndTransferIntent, MintAndVestIntent, UpdateMetadataIntent, WithdrawAndBurnIntent } from "src/lib/intents/account-actions/currency";
import { TakeNftsIntent, ListNftsIntent } from "src/lib/intents/account-actions/kiosk";
import { WithdrawAndTransferIntent, WithdrawAndTransferToVaultIntent, WithdrawAndVestIntent } from "src/lib/intents/account-actions/owned";
import { SpendAndTransferIntent, SpendAndVestIntent } from "src/lib/intents/account-actions/vault";
import { UpgradePackageIntent, RestrictPolicyIntent } from "src/lib/intents/account-actions/package-upgrade";

export type MultisigData = AccountData & {
    global: Role;
    roles: Record<string, Role>;
    members: MemberUser[];
    intents: Intent[];
}

export type Role = {
    threshold: number,
    totalWeight: number,
}

export type Threshold = {
    name: string,
    threshold: number,
}

export type Member = {
    address: string,
    weight: number,
    roles: string[],
};

export type MemberUser = Member & {
    accountId: string,
    username: string,
    avatar: string,
};

export class Multisig extends Account implements MultisigData {
    global: Role = { threshold: 0, totalWeight: 0 };
    roles: Record<string, Role> = {};
    members: MemberUser[] = [];

    static async init(
        client: SuiClient,
        multisigId?: string,
    ): Promise<Multisig> {
        const multisig = new Multisig(client);
        if (multisigId) {
            multisig.id = multisigId;
            await multisig.refresh();
        }
        return multisig;
    }

    async fetch(id: string = this.id): Promise<MultisigData> {
        if (!id && !this.id) {
            throw new Error("No address provided to refresh multisig");
        }

        const accountReified = AccountRaw.r(MultisigRaw.r, ApprovalsRaw.r);
        const multisigAccount = await accountReified.fetch(this.client, id);

        // get metadata
        const metadata = multisigAccount.metadata.inner.contents.map((m: any) => ({ key: m.key, value: m.value }));

        // get deps
        const deps: Dep[] = multisigAccount.deps.inner.map((dep: DepFields) => {
            return { name: dep.name, addr: dep.addr, version: Number(dep.version) };
        });

        // get all members" data (from account and member)
        const membersAddress: string[] = multisigAccount.config.members.map((member: MemberFields) => member.addr);
        const members = await Promise.all(membersAddress.map(async memberAddr => {
            const weight = multisigAccount.config.members.find((m: MemberFields) => m.addr == memberAddr)?.weight;
            const roles = multisigAccount.config.members.find((m: MemberFields) => m.addr == memberAddr)?.roles.contents;
            const user = await User.init(this.client, AccountType.MULTISIG);
            const userData = await user.fetch(memberAddr);
            return {
                address: memberAddr,
                accountId: userData?.id!,
                username: userData?.username!,
                avatar: userData?.avatar!,
                weight: Number(weight)!,
                roles: roles!
            }
        }));

        // calculate total weights
        const globalWeight = members.reduce((acc, member) => acc + member.weight, 0);
        // Calculate total weights for each role
        const roleWeights: Record<string, number> = {};
        members.forEach(member => {
            member.roles.forEach(role => {
                const currentWeight = roleWeights[role] || 0;
                roleWeights[role] = currentWeight + member.weight;
            });
        });
        // get thresholds
        const global = { threshold: Number(multisigAccount.config.global), totalWeight: globalWeight };
        const roles: Record<string, Role> = {};
        multisigAccount.config.roles.forEach((role: RoleFields) => {
            roles[role.name] = { threshold: Number(role.threshold), totalWeight: roleWeights[role.name] || 0 };
        });
        // get Proposals with actions
        const intents = await Promise.all(multisigAccount!.intents.inner.map(async (fieldsRaw: IntentFieldsRaw<ApprovalsRaw>) => {
            const outcome = new Approvals(id, fieldsRaw.key, Number(fieldsRaw.outcome.totalWeight), Number(fieldsRaw.outcome.roleWeight), fieldsRaw.outcome.approved.contents);
            const fields: IntentFields = {
                issuer: {
                    accountAddr: fieldsRaw.issuer.accountAddr,
                    intentType: fieldsRaw.issuer.intentType.name,
                },
                key: fieldsRaw.key,
                description: fieldsRaw.description,
                executionTimes: fieldsRaw.executionTimes,
                expirationTime: fieldsRaw.expirationTime,
                role: fieldsRaw.role,
                actionsId: fieldsRaw.actions.id,
            }

            return await this.fetchIntentWithActions(this.client, outcome, fields);
        }));

        // get managed assets
        const managedAssets = await Managed.init(this.client, id);

        return {
            id: multisigAccount.id,
            metadata,
            deps,
            global,
            roles,
            members,
            intents,
            managedAssets,
        }
    }

    async refresh(id: string = this.id) {
        this.setData(await this.fetch(id));
    }

    setData(multisig: MultisigData) {
        this.id = multisig.id;
        this.metadata = multisig.metadata;
        this.deps = multisig.deps;
        this.global = multisig.global;
        this.roles = multisig.roles;
        this.members = multisig.members;
        this.intents = multisig.intents;
        this.managedAssets = multisig.managedAssets;
    }

    getData(): MultisigData {
        return {
            id: this.id,
            metadata: this.metadata,
            deps: this.deps,
            global: this.global,
            roles: this.roles,
            members: this.members,
            intents: this.intents,
            managedAssets: this.managedAssets,
        }
    }

    member(addr: string): MemberUser {
        const member = this.members?.find(m => m.address == addr);
        if (!member) {
            throw new Error(`Member with address ${addr} not found.`);
        }
        return member;
    }

    intent(key: string): Intent {
        const intent = this.intents?.find(p => p.fields.key == key);
        if (!intent) {
            throw new Error(`Intent with key ${key} not found.`);
        }
        return intent;
    }

    intentStatus(key: string): IntentStatus {
        const intent = this.intent(key);
        const now = Date.now();

        // Check expiration first
        if (intent.fields.expirationTime < now) {
            return IntentStatus.Expired;
        }

        // Check if intent has reached threshold
        const approvals = intent.outcome as Approvals;
        const hasReachedThreshold =
            approvals.totalWeight >= this.global.threshold ||
            approvals.roleWeight >= this.roles[intent.fields.role].threshold;

        // If threshold is reached, check execution time
        if (hasReachedThreshold) {
            return intent.fields.executionTimes[0] <= now
                ? IntentStatus.Executable
                : IntentStatus.Approved;
        }

        return IntentStatus.Pending;
    }


    newMultisig(
        tx: Transaction,
    ): TransactionResult {
        return newAccount(
            tx,
            EXTENSIONS
        );
    }

    shareMultisig(tx: Transaction, account: TransactionArgument): TransactionResult {
        return tx.moveCall({
            package: SUI_FRAMEWORK,
            module: "transfer",
            function: "public_share",
            typeArguments: MULTISIG_GENERICS,
            arguments: [account],
        });
    }

    joinMultisig(tx: Transaction, user: TransactionPureInput, account: TransactionObjectInput): TransactionResult {
        return join(tx, { user, account });
    }

    leaveMultisig(tx: Transaction, user: TransactionObjectInput, account: TransactionObjectInput): TransactionResult {
        return leave(tx, { user, account });
    }

    authenticate(tx: Transaction, account: TransactionObjectInput = this.id): TransactionResult {
        if (!account && !this.id) throw new Error("No multisig account provided");
        return authenticate(tx, account);
    }

    emptyOutcome(tx: Transaction): TransactionResult {
        return emptyOutcome(tx);
    }

    approveIntent(
        tx: Transaction,
        key: string,
        account: TransactionObjectInput = this.id,
    ): TransactionResult {
        if (!account && !this.id) throw new Error("No multisig account provided");
        return approveIntent(tx, { account, key });
    }

    disapproveIntent(
        tx: Transaction,
        key: string,
        account: TransactionObjectInput = this.id,
    ): TransactionResult {
        if (!account && !this.id) throw new Error("No multisig account provided");
        return disapproveIntent(tx, { account, key });
    }

    executeIntent(
        tx: Transaction,
        key: string,
        account: TransactionObjectInput = this.id,
    ): TransactionResult {
        if (!account && !this.id) throw new Error("No multisig account provided");
        return executeIntent(tx, { account, key, clock: CLOCK });
    }

    // === Atomic Proposals ===

    configMultisig(
        tx: Transaction,
        intentArgs: IntentArgs,
        actionsArgs: ConfigMultisigArgs,
        account: TransactionObjectInput = this.id, // need for adding members upon creation
    ): TransactionResult {
        this.assertMultisig();
        this.assertKey(intentArgs);

        let addresses: string[] = [];
        let weights: bigint[] = [];
        let roles: string[][] = [];
        if (actionsArgs.members) {
            actionsArgs.members.forEach((member) => {
                addresses.push(member.address);
                weights.push(BigInt(member.weight));
                roles.push(member.roles);
            });
        }

        let global = 0n;
        let roleNames: string[] = [];
        let roleThresholds: bigint[] = [];
        if (actionsArgs.thresholds) {
            global = BigInt(actionsArgs.thresholds.global);
            actionsArgs.thresholds.roles.forEach((role) => {
                roleNames.push(role.name);
                roleThresholds.push(BigInt(role.threshold));
            });
        }

        const auth = this.authenticate(tx, account);
        const outcome = this.emptyOutcome(tx);

        configMultisig.requestConfigMultisig(
            tx,
            {
                auth,
                account,
                outcome,
                key: intentArgs.key,
                description: intentArgs.description ?? "",
                executionTime: intentArgs.executionTimes?.[0] ?? 0n,
                expirationTime: intentArgs.expirationTime ?? BigInt(Math.floor(Date.now()) + 7 * 24 * 60 * 60 * 1000),
                addresses,
                weights,
                roles,
                global,
                roleNames,
                roleThresholds,
            }
        );

        this.approveIntent(tx, intentArgs.key, account);
        const executable = this.executeIntent(tx, intentArgs.key, account);

        return configMultisig.executeConfigMultisig(tx, { executable, account });
    }

    configDeps(
        tx: Transaction,
        auth: TransactionObjectInput,
        outcome: TransactionObjectInput,
        intentArgs: IntentArgs,
        actionsArgs: ConfigDepsArgs,
        account: TransactionObjectInput = this.id, // need for adding deps upon creation
    ): TransactionResult {
        this.assertMultisig();
        this.assertKey(intentArgs);

        const names: string[] = [];
        const addresses: string[] = [];
        const versions: bigint[] = [];
        actionsArgs.deps.forEach((dep) => {
            names.push(dep.name);
            addresses.push(dep.addr);
            versions.push(BigInt(dep.version));
        });

        config.requestConfigDeps(
            tx,
            MULTISIG_GENERICS,
            {
                auth,
                account,
                outcome,
                key: intentArgs.key,
                description: intentArgs.description ?? "",
                executionTime: intentArgs.executionTimes?.[0] ?? 0n,
                expirationTime: intentArgs.expirationTime ?? BigInt(Math.floor(Date.now()) + 7 * 24 * 60 * 60 * 1000),
                extensions: EXTENSIONS,
                names,
                addresses,
                versions,
            }
        );

        this.approveIntent(tx, intentArgs.key);
        const executable = this.executeIntent(tx, intentArgs.key);

        return config.executeConfigDeps(tx, MULTISIG_GENERICS, { executable, account });
    }

    // mint(
    //     tx: Transaction,
    //     intentArgs: IntentArgs,
    //     actionsArgs: MintArgs,
    //     multisig: TransactionObjectInput = this.id,
    // ): TransactionResult {
    //     this.assertMultisig();
    //     this.assertKey(intentArgs);

    //     currency.proposeMint(
    //         tx,
    //         actionsArgs.coinType,
    //         {
    //             multisig: this.id,
    //             key: intentArgs.key,
    //             description: intentArgs.description ?? "",
    //             executionTime: BigInt(intentArgs.executionTime ?? 0),
    //             expirationEpoch: BigInt(intentArgs.expirationEpoch ?? this.epoch + 7),
    //             amount: BigInt(actionsArgs.amount),
    //         }
    //     );

    //     this.approveIntent(tx, intentArgs.key);
    //     const executable = this.executeIntent(tx, intentArgs.key);

    //     return currency.executeMint(tx, actionsArgs.coinType, { executable, multisig });
    // }

    // burn(
    //     tx: Transaction,
    //     intentArgs: IntentArgs,
    //     actionsArgs: BurnArgs,
    // ): TransactionResult {
    //     this.assertMultisig();
    //     this.assertKey(intentArgs);

    //     currency.proposeBurn(
    //         tx,
    //         actionsArgs.coinType,
    //         {
    //             multisig: this.id,
    //             key: intentArgs.key,
    //             description: intentArgs.description ?? "",
    //             executionTime: BigInt(intentArgs.executionTime ?? 0),
    //             expirationEpoch: BigInt(intentArgs.expirationEpoch ?? this.epoch + 7),
    //             coinId: actionsArgs.coinId,
    //             amount: BigInt(actionsArgs.amount),
    //         }
    //     );

    //     this.approveIntent(tx, intentArgs.key);
    //     const executable = this.executeIntent(tx, intentArgs.key);

    //     return currency.executeBurn(tx, actionsArgs.coinType, { executable, multisig: this.id, receiving: actionsArgs.coinId });
    // }

    // update(
    //     tx: Transaction,
    //     intentArgs: IntentArgs,
    //     actionsArgs: UpdateArgs,
    //     metadata: string, // CoinMetadata<CoinType> ID
    // ): TransactionResult {
    //     this.assertMultisig();
    //     this.assertKey(intentArgs);

    //     currency.proposeUpdate(
    //         tx,
    //         actionsArgs.coinType,
    //         {
    //             multisig: this.id,
    //             key: intentArgs.key,
    //             description: intentArgs.description ?? "",
    //             executionTime: BigInt(intentArgs.executionTime ?? 0),
    //             expirationEpoch: BigInt(intentArgs.expirationEpoch ?? this.epoch + 7),
    //             mdName: actionsArgs.name,
    //             mdSymbol: actionsArgs.symbol,
    //             mdDescription: actionsArgs.description,
    //             mdIcon: actionsArgs.icon,
    //         }
    //     );

    //     this.approveIntent(tx, intentArgs.key);
    //     const executable = this.executeIntent(tx, intentArgs.key);

    //     return currency.executeUpdate(tx, actionsArgs.coinType, { executable, multisig: this.id, metadata });
    // }

    // take(
    // 	tx: Transaction,
    // 	args: TakeArgs,
    // ): TransactionResult {
    // 	this.assertMultisig();
    // 	this.assertKey(args);

    // 	kiosk.proposeTake(
    // 		tx,
    // 		{
    // 			multisig: this.id,
    // 			key: args.key,
    // 			description: args.description ?? "",
    // 			executionTime: BigInt(args.executionTime ?? 0),
    // 			expirationEpoch: BigInt(args.expirationEpoch ?? this.epoch + 7),
    // 			name: args.name,
    // 			nftIds: args.nftIds,
    // 			recipient: args.recipient,
    // 		}
    // 	);

    // 	this.approveIntent(tx, args.key);
    // 	const executable = this.executeIntent(tx, args.key);

    // 	return kiosk.executeTake(tx, { executable, multisig: this.id });
    // }

    // === Helpers ===

    assertMultisig() {
        if (this.id === "") {
            throw new Error("Multisig id is not set. Please fetch the multisig before calling this method.");
        }
    }

    assertKey(args: IntentArgs) {
        if (!args.key) throw new Error("Key is required.");
    }

    // Factory function to create the appropriate intent type
    async fetchIntentWithActions(
        client: SuiClient,
        outcome: Outcome,
        fields: IntentFields
    ): Promise<Intent> {
        switch (fields.issuer.intentType) {
            case IntentTypes.ConfigDeps:
                return await ConfigDepsIntent.init(client, this.id, outcome, fields);
            case IntentTypes.ConfigMultisig:
                return await ConfigMultisigIntent.init(client, this.id, outcome, fields);
            case IntentTypes.BorrowCap:
                return await BorrowCapIntent.init(client, this.id, outcome, fields);
            case IntentTypes.DisableRules:
                return await DisableRulesIntent.init(client, this.id, outcome, fields);
            case IntentTypes.UpdateMetadata:
                return await UpdateMetadataIntent.init(client, this.id, outcome, fields);
            case IntentTypes.MintAndTransfer:
                return await MintAndTransferIntent.init(client, this.id, outcome, fields);
            case IntentTypes.MintAndVest:
                return await MintAndVestIntent.init(client, this.id, outcome, fields);
            case IntentTypes.WithdrawAndBurn:
                return await WithdrawAndBurnIntent.init(client, this.id, outcome, fields);
            case IntentTypes.TakeNfts:
                return await TakeNftsIntent.init(client, this.id, outcome, fields);
            case IntentTypes.ListNfts:
                return await ListNftsIntent.init(client, this.id, outcome, fields);
            case IntentTypes.WithdrawAndTransferToVault:
                return await WithdrawAndTransferToVaultIntent.init(client, this.id, outcome, fields);
            case IntentTypes.WithdrawAndTransfer:
                return await WithdrawAndTransferIntent.init(client, this.id, outcome, fields);
            case IntentTypes.WithdrawAndVest:
                return await WithdrawAndVestIntent.init(client, this.id, outcome, fields);
            case IntentTypes.UpgradePackage:
                return await UpgradePackageIntent.init(client, this.id, outcome, fields);
            case IntentTypes.RestrictPolicy:
                return await RestrictPolicyIntent.init(client, this.id, outcome, fields);
            case IntentTypes.SpendAndTransfer:
                return await SpendAndTransferIntent.init(client, this.id, outcome, fields);
            case IntentTypes.SpendAndVest:
                return await SpendAndVestIntent.init(client, this.id, outcome, fields);
            default:
                throw new Error(`Intent type ${fields.issuer.intentType} not supported.`);
        }
    }
}

