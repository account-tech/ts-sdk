import { Transaction, TransactionArgument, TransactionObjectInput, TransactionResult } from "@mysten/sui/transactions";
import { Account as AccountRaw } from "../../../.gen/account-protocol/account/structs";
import { destroyEmptyIntent, confirmExecution } from "../../../.gen/account-protocol/account/functions";
import { Multisig as MultisigRaw } from "../../../.gen/account-multisig/multisig/structs";
import { newAccount } from "../../../.gen/account-multisig/multisig/functions";
import * as configMultisig from "../../../.gen/account-multisig/config/functions";
import * as config from "../../../.gen/account-protocol/config/functions";
import { approveIntent, disapproveIntent, executeIntent, authenticate, emptyOutcome, sendInvite, join, leave } from "../../../.gen/account-multisig/multisig/functions";
import { destroyEmptyExpired } from "../../../.gen/account-protocol/intents/functions";
import { DepFields } from "../../../.gen/account-protocol/deps/structs";
import { MemberFields, RoleFields } from "../../../.gen/account-multisig/multisig/structs";
import { Fees as FeesRaw } from "../../../.gen/account-multisig/fees/structs";

import { User } from "../../user/user";
import { ACCOUNT_PROTOCOL, CLOCK, EXTENSIONS, MULTISIG_FEES, MULTISIG_GENERICS, SUI_FRAMEWORK, TransactionPureInput } from "../../../types";
import { Intent, ConfigDepsArgs, ConfigMultisigArgs } from "../../intents";
import { Dep, Role, MemberProfile, MultisigData } from "../types";
import { Account } from "../account";

export class Multisig extends Account implements MultisigData {
    global: Role = { threshold: 0, totalWeight: 0 };
    roles: Record<string, Role> = {};
    members: MemberProfile[] = [];
    fees: bigint = 0n;

    async init(id?: string): Promise<void> {
        if (id) {
            this.id = id;
            await this.refresh();
        } else {
            this.fees = await this.fetchFees();
        }
    }

    async fetch(id: string = this.id): Promise<MultisigData> {
        if (!id && !this.id) {
            throw new Error("No address provided to refresh multisig");
        }

        const accountReified = AccountRaw.r(MultisigRaw.r);
        const multisigAccount = await accountReified.fetch(this.client, id);

        // get metadata
        const metadata = multisigAccount.metadata.inner.contents.map((m: any) => ({ key: m.key, value: m.value }));

        // get deps
        const deps: Dep[] = multisigAccount.deps.inner.map((dep: DepFields) => {
            return { name: dep.name, addr: dep.addr, version: Number(dep.version) };
        });

        // get all members" data (from account and member)
        const membersAddress: string[] = multisigAccount.config.members.map((member: MemberFields) => member.addr);
        const members = await Promise.all(membersAddress.map(async address => {
            const weight = multisigAccount.config.members.find((m: MemberFields) => m.addr == address)?.weight;
            const roles = multisigAccount.config.members.find((m: MemberFields) => m.addr == address)?.roles.contents;
            const user = await User.init(this.client);
            const { username, avatar } = await user.fetchProfile(address);
            return {
                address,
                username,
                avatar, 
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

        return {
            id: multisigAccount.id,
            metadata,
            deps,
            intentsBagId: multisigAccount.intents.inner.id,
            global,
            roles,
            members,
        }
    }

    async fetchFees(): Promise<bigint> {
        const fees = await FeesRaw.fetch(this.client, MULTISIG_FEES);
        return fees.amount;
    }

    async refresh(id: string = this.id) {
        this.setData(await this.fetch(id));
        this.fees = await this.fetchFees();
    }

    setData(multisig: MultisigData) {
        this.id = multisig.id;
        this.metadata = multisig.metadata;
        this.deps = multisig.deps;
        this.intentsBagId = multisig.intentsBagId;
        this.global = multisig.global;
        this.roles = multisig.roles;
        this.members = multisig.members;
    }

    getData(): MultisigData {
        return {
            id: this.id,
            metadata: this.metadata,
            deps: this.deps,
            intentsBagId: this.intentsBagId,
            global: this.global,
            roles: this.roles,
            members: this.members,
        }
    }

    member(addr: string): MemberProfile {
        const member = this.members?.find(m => m.address == addr);
        if (!member) {
            throw new Error(`Member with address ${addr} not found.`);
        }
        return member;
    }


    newMultisig(
        tx: Transaction,
        coin: TransactionObjectInput,
    ): TransactionResult {
        return newAccount(
            tx,
            {
                extensions: EXTENSIONS,
                fees: MULTISIG_FEES,
                coin,
            }
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
            typeArguments: [`${ACCOUNT_PROTOCOL.V1}::account::Account<${MULTISIG_GENERICS[0]}>`],
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
        const params = Intent.createParams(tx, { key: "config-multisig" });
        const outcome = this.emptyApprovalsOutcome(tx);

        configMultisig.requestConfigMultisig(
            tx,
            {
                auth,
                account,
                params,
                outcome,
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
        confirmExecution(tx, MULTISIG_GENERICS, { account, executable });

        const expired = destroyEmptyIntent(tx, MULTISIG_GENERICS, { account, key: "config-multisig" });
        configMultisig.deleteConfigMultisig(tx, expired);
        return destroyEmptyExpired(tx, expired);
    }

    atomicToggleUnverifiedDepsAllowed(
        tx: Transaction,
        account: TransactionObjectInput,
    ): TransactionResult {
        const auth = this.authenticate(tx, account);
        const params = Intent.createParams(tx, { key: "toggle-unverified-deps" });
        const outcome = this.emptyApprovalsOutcome(tx);

        config.requestToggleUnverifiedAllowed(
            tx,
            MULTISIG_GENERICS,
            {
                auth,
                account,
                params,
                outcome,
            }
        );

        this.approveIntent(tx, "toggle-unverified-deps", account);
        const executable = this.executeIntent(tx, "toggle-unverified-deps", account);
        config.executeToggleUnverifiedAllowed(tx, MULTISIG_GENERICS, { executable, account });
        confirmExecution(tx, MULTISIG_GENERICS, { account, executable });

        const expired = destroyEmptyIntent(tx, MULTISIG_GENERICS, { account, key: "toggle-unverified-deps" });
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
        const params = Intent.createParams(tx, { key: "config-deps" });
        const outcome = this.emptyApprovalsOutcome(tx);

        config.requestConfigDeps(
            tx,
            MULTISIG_GENERICS,
            {
                auth,
                account,
                params,
                outcome,
                extensions: EXTENSIONS,
                names,
                addresses,
                versions,
            }
        );

        this.approveIntent(tx, "config-deps", account);
        const executable = this.executeIntent(tx, "config-deps", account);
        config.executeConfigDeps(tx, MULTISIG_GENERICS, { executable, account });
        confirmExecution(tx, MULTISIG_GENERICS, { account, executable });

        const expired = destroyEmptyIntent(tx, MULTISIG_GENERICS, { account, key: "config-deps" });
        config.deleteConfigDeps(tx, expired);
        return destroyEmptyExpired(tx, expired);
    }
}

