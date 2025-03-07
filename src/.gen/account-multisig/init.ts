import * as config from "./config/structs";
import * as fees from "./fees/structs";
import * as multisig from "./multisig/structs";
import * as version from "./version/structs";
import {StructClassLoader} from "../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(version.V1);
loader.register(fees.AdminCap);
loader.register(fees.Fees);
loader.register(multisig.Approvals);
loader.register(multisig.Member);
loader.register(multisig.Multisig);
loader.register(multisig.Role);
loader.register(multisig.Witness);
loader.register(config.ConfigMultisigAction);
loader.register(config.ConfigMultisigIntent);
 }
