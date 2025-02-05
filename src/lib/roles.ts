// import { Issuer, ProposalType, ProposalTypes } from "src/types/intent-types";

// export type RoleType = keyof typeof RoleTypes;

// export const RoleTypes = {
//     // member is a special role that must be attributed to everyone in basic mode, it gives basic permissions to create containers and more
//     Member: [CommandTypes.LockCap, CommandTypes.ConfigMetadata, CommandTypes.LockTreasuryCap, CommandTypes.Kiosk, CommandTypes.Treasury, CommandTypes.LockUpgradeCap] as const,
//     Treasury: [ProposalTypes.SpendAndTransfer, ProposalTypes.SpendAndVest] as const, // + role_name (treasury name)
//     Kiosk: [ProposalTypes.Take, ProposalTypes.List] as const, // + role_name (kiosk name)
//     Wallet: [ProposalTypes.WithdrawAndTransfer, ProposalTypes.WithdrawAndVest] as const,
//     Currency: [ProposalTypes.Mint, ProposalTypes.Burn, ProposalTypes.Update, ProposalTypes.Disable, ProposalTypes.MintAndTransfer, ProposalTypes.MintAndVest] as const, // + role_name (coin type)
//     Access: [ProposalTypes.Access] as const, // + role_name (cap type)
//     Package: [ProposalTypes.Upgrade, ProposalTypes.Restrict] as const, // + role_name (package name)
//     Dependencies: [ProposalTypes.ConfigDeps] as const,
// } as const;

// // Utility functions for bidirectional conversion
// export const roleUtils = {
//     getFullRoleFromIssuer(issuer: Issuer): string {
//         if (issuer.roleName === "") {
//             return issuer.roleType;
//         } else {
//             return `${issuer.roleType}::${issuer.roleName}`;
//         }
//     },

//     // Convert contract-level proposal types to frontend role type
//     getConsolidatedRole(proposalType: ProposalType): RoleType {
//         for (const [role, proposals] of Object.entries(RoleTypes)) {
//             if ((proposals as readonly ProposalType[]).includes(proposalType)) {
//                 return role as RoleType;
//             }
//         }
//         throw new Error(`Unknown proposal type: ${proposalType}`);
//     },

//     // Convert array of contract-level proposal types to unique frontend roles
//     getConsolidatedRoles(proposalTypes: ProposalType[]): RoleType[] {
//         const roles = new Set<RoleType>();
//         proposalTypes.forEach(pt => {
//             roles.add(this.getConsolidatedRole(pt));
//         });
//         return Array.from(roles);
//     },

//     // Get all proposal types for a given frontend role
//     getProposalTypesForRole(role: RoleType): readonly ProposalType[] | readonly CommandType[] {
//         return RoleTypes[role];
//     },

//     // Convert array of frontend roles to all required contract-level proposal types
//     getProposalTypesForRoles(roles: RoleType[]): (ProposalType | CommandType)[] {
//         return roles.flatMap(role => this.getProposalTypesForRole(role));
//     },
// };