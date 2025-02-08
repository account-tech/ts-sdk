import * as multisig from "./multisig/structs";
import * as version from "./version/structs";
import {StructClassLoader} from "../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(version.V1);
loader.register(multisig.Approvals);
loader.register(multisig.ConfigMultisigAction);
loader.register(multisig.ConfigMultisigIntent);
loader.register(multisig.Member);
loader.register(multisig.Multisig);
loader.register(multisig.Role);
loader.register(multisig.Witness);
 }
