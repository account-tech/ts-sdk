import { Account, Intent, Outcome, Asset } from "src/lib";

export interface SDKConfig {
    // Account configuration
    accountType: typeof Account; // AccountClass
    ownedObjects: boolean; // e.g. true, false
    assetRegistry: Array<typeof Asset>; // Asset classes
    intentRegistry: Record<string, typeof Intent>; // TypeName -> IntentClass
    outcomeRegistry: Record<string, typeof Outcome>; // TypeName -> OutcomeClass
}
