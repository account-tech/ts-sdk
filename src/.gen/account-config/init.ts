import * as multisig from "./multisig/structs";
import * as user from "./user/structs";
import * as version from "./version/structs";
import {StructClassLoader} from "../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(version.V1);
loader.register(user.Registry);
loader.register(user.User);
loader.register(multisig.Role);
loader.register(multisig.Approvals);
loader.register(multisig.ConfigMultisigAction);
loader.register(multisig.ConfigMultisigProposal);
loader.register(multisig.Invite);
loader.register(multisig.Member);
loader.register(multisig.Multisig);
 }
