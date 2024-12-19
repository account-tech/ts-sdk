export enum AccountType {
    MULTISIG = "multisig",
    DAO = "dao",
}

// export type Kiosk = {
//     cap: string,
//     kiosk: string,
//     profits: bigint,
//     itemCount: number,
// }

export type TransferPolicy = {
    id: string,
    hasFloorPrice: boolean,
    hasRoyalty: boolean,
    isLocked: boolean,
}