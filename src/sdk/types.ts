import { Account, Intent, Outcome } from "src/lib";

export interface SDKConfig {
    // Account configuration
    accountType: typeof Account; // AccountClass
    managedAssetTypes: string[]; // e.g. "kiosk", "vault", "package"
    ownedObjects: boolean; // e.g. true, false
    intentRegistry: Record<string, typeof Intent>; // TypeName -> IntentClass
    outcomeRegistry: Record<string, typeof Outcome>; // TypeName -> OutcomeClass
}
