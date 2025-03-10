import * as account from "./account/structs";
import * as config from "./config/structs";
import * as deps from "./deps/structs";
import * as executable from "./executable/structs";
import * as intents from "./intents/structs";
import * as issuer from "./issuer/structs";
import * as metadata from "./metadata/structs";
import * as owned from "./owned/structs";
import * as user from "./user/structs";
import * as versionWitness from "./version-witness/structs";
import * as version from "./version/structs";
import {StructClassLoader} from "../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(versionWitness.VersionWitness);
loader.register(metadata.Metadata);
loader.register(issuer.Issuer);
loader.register(intents.Expired);
loader.register(intents.Intent);
loader.register(intents.Intents);
loader.register(executable.Executable);
loader.register(deps.Dep);
loader.register(deps.Deps);
loader.register(account.ACCOUNT);
loader.register(account.Account);
loader.register(account.Auth);
loader.register(version.V1);
loader.register(config.ConfigDepsAction);
loader.register(config.ConfigDepsIntent);
loader.register(config.ToggleUnverifiedAllowedAction);
loader.register(config.ToggleUnverifiedAllowedIntent);
loader.register(owned.WithdrawAction);
loader.register(user.Invite);
loader.register(user.Registry);
loader.register(user.User);
 }
