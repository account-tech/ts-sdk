import { Transaction, TransactionArgument, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import { Account as AccountRaw } from "../../../.gen/account-protocol/account/structs";
import { Multisig as MultisigRaw, Approvals as ApprovalsRaw } from "../../../.gen/account-config/multisig/structs";
import { newAccount } from "../../../.gen/account-config/multisig/functions";
import * as configMultisig from "../../../.gen/account-config/multisig/functions";
import * as config from "../../../.gen/account-protocol/config/functions";
import { approveIntent, disapproveIntent, executeIntent, authenticate, emptyOutcome, sendInvite, join, leave, destroyEmptyIntent } from "../../../.gen/account-config/multisig/functions";
import { destroyEmptyExpired } from "../../../.gen/account-protocol/intents/functions";
import { DepFields } from "../../../.gen/account-protocol/deps/structs";
import { MemberFields, RoleFields } from "../../../.gen/account-config/multisig/structs";
import { IntentFields as IntentFieldsRaw } from "../../../.gen/account-protocol/intents/structs";

import { User } from "../../user/user";
import { ACCOUNT_PROTOCOL, CLOCK, EXTENSIONS, MULTISIG_GENERICS, SUI_FRAMEWORK, TransactionPureInput } from "../../../types";
import { Intent, IntentStatus, ConfigDepsArgs, ConfigMultisigArgs, IntentFields } from "../../intents";
import { Dep, Role, MemberUser, MultisigData } from "../types";
import { Account } from "../account";
import { Approvals } from "../../outcomes";
import { Managed, Owned } from "../../objects";

export class Multisig extends Account implements MultisigData {
    public global: Role = { threshold: 0, totalWeight: 0 };
    public roles: Record<string, Role> = {};
    public members: MemberUser[] = [];

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
            const user = await User.init(this.client);
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
        const ownedObjects = await Owned.init(this.client, id);

        return {
            id: multisigAccount.id,
            metadata,
            deps,
            global,
            roles,
            members,
            intents,
            managedAssets,
            ownedObjects,
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
        this.ownedObjects = multisig.ownedObjects;
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
            ownedObjects: this.ownedObjects,
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

    shareMultisig(
        tx: Transaction,
        account: TransactionArgument,
    ): TransactionResult {
        return tx.moveCall({
            package: SUI_FRAMEWORK,
            module: "transfer",
            function: "public_share_object",
            typeArguments: [`${ACCOUNT_PROTOCOL.V1}::account::Account<${MULTISIG_GENERICS}>`],
            arguments: [account],
        });
    }

    joinMultisig(
        tx: Transaction,
        user: TransactionPureInput,
        account: TransactionObjectInput = this.id,
    ): TransactionResult {
        if (!account) {
            throw new Error("No account available: this.id is not set and no account was provided");
        }
        return join(tx, { user, account });
    }

    leaveMultisig(
        tx: Transaction,
        user: TransactionObjectInput,
        account: TransactionObjectInput = this.id,
    ): TransactionResult {
        if (!account) {
            throw new Error("No account available: this.id is not set and no account was provided");
        }
        return leave(tx, { user, account });
    }

    sendInvite(
        tx: Transaction,
        recipient: string,
        account: TransactionObjectInput = this.id,
    ): TransactionResult {
        if (!account) {
            throw new Error("No account available: this.id is not set and no account was provided");
        }
        return sendInvite(tx, { account, recipient });
    }

    authenticate(
        tx: Transaction,
        account: TransactionObjectInput = this.id,
    ): TransactionResult {
        if (!account) {
            throw new Error("No account available: this.id is not set and no account was provided");
        }
        return authenticate(tx, account);
    }

    emptyApprovalsOutcome(
        tx: Transaction
    ): TransactionResult {
        return emptyOutcome(tx);
    }

    approveIntent(
        tx: Transaction,
        key: string,
        account: TransactionObjectInput = this.id,
    ): TransactionResult {
        if (!account) {
            throw new Error("No account available: this.id is not set and no account was provided");
        }
        return approveIntent(tx, { account, key });
    }

    disapproveIntent(
        tx: Transaction,
        key: string,
        account: TransactionObjectInput = this.id,
    ): TransactionResult {
        if (!account) {
            throw new Error("No account available: this.id is not set and no account was provided");
        }
        return disapproveIntent(tx, { account, key });
    }

    executeIntent(
        tx: Transaction,
        key: string,
        account: TransactionObjectInput = this.id,
    ): TransactionResult {
        if (!account) {
            throw new Error("No account available: this.id is not set and no account was provided");
        }
        return executeIntent(tx, { account, key, clock: CLOCK });
    }

    // === Atomic Intents ===

    atomicConfigMultisig(
        tx: Transaction,
        actionsArgs: ConfigMultisigArgs,
        account: TransactionObjectInput = this.id,
    ): TransactionResult {
        if (!account) {
            throw new Error("No account available: this.id is not set and no account was provided");
        }

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
        const outcome = this.emptyApprovalsOutcome(tx);

        configMultisig.requestConfigMultisig(
            tx,
            {
                auth,
                account,
                outcome,
                key: "config-multisig",
                description: "",
                executionTime: 0n,
                expirationTime: 0n,
                addresses,
                weights,
                roles,
                global,
                roleNames,
                roleThresholds,
            }
        );

        this.approveIntent(tx, "config-multisig", account);
        const executable = this.executeIntent(tx, "config-multisig", account);
        configMultisig.executeConfigMultisig(tx, { executable, account });

        const expired = destroyEmptyIntent(tx, { account, key: "config-multisig" });
        configMultisig.deleteConfigMultisig(tx, expired);
        return destroyEmptyExpired(tx, expired);
    }

    atomicToggleUnverifiedDepsAllowed(
        tx: Transaction,
        account: TransactionObjectInput,
    ): TransactionResult {
        const auth = this.authenticate(tx, account);
        const outcome = this.emptyApprovalsOutcome(tx);

        config.requestToggleUnverifiedAllowed(
            tx,
            MULTISIG_GENERICS,
            {
                auth,
                account,
                outcome,
                key: "toggle-unverified-deps",
                description: "",
                executionTime: 0n,
                expirationTime: 0n,
            }
        );

        this.approveIntent(tx, "toggle-unverified-deps", account);
        const executable = this.executeIntent(tx, "toggle-unverified-deps", account);
        config.executeToggleUnverifiedAllowed(tx, MULTISIG_GENERICS, { executable, account });

        const expired = destroyEmptyIntent(tx, { account, key: "toggle-unverified-deps" });
        config.deleteToggleUnverifiedAllowed(tx, expired);
        return destroyEmptyExpired(tx, expired);
    }

    atomicConfigDeps(
        tx: Transaction,
        actionsArgs: ConfigDepsArgs,
        account: TransactionObjectInput = this.id,
    ): TransactionResult {
        if (!account) {
            throw new Error("No account available: this.id is not set and no account was provided");
        }

        const names: string[] = [];
        const addresses: string[] = [];
        const versions: bigint[] = [];
        actionsArgs.deps.forEach((dep) => {
            names.push(dep.name);
            addresses.push(dep.addr);
            versions.push(BigInt(dep.version));
        });

        const auth = this.authenticate(tx, account);
        const outcome = this.emptyApprovalsOutcome(tx);

        config.requestConfigDeps(
            tx,
            MULTISIG_GENERICS,
            {
                auth,
                account,
                outcome,
                key: "config-deps",
                description: "",
                executionTime: 0n,
                expirationTime: 0n,
                extensions: EXTENSIONS,
                names,
                addresses,
                versions,
            }
        );

        this.approveIntent(tx, "config-deps", account);
        const executable = this.executeIntent(tx, "config-deps", account);
        config.executeConfigDeps(tx, MULTISIG_GENERICS, { executable, account });

        const expired = destroyEmptyIntent(tx, { account, key: "config-deps" });
        config.deleteConfigDeps(tx, expired);
        return destroyEmptyExpired(tx, expired);
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
}

