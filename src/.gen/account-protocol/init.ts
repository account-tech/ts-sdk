import * as account from "./account/structs";
import * as auth from "./auth/structs";
import * as deps from "./deps/structs";
import * as executable from "./executable/structs";
import * as issuer from "./issuer/structs";
import * as metadata from "./metadata/structs";
import * as proposals from "./proposals/structs";
import * as version from "./version/structs";
import {StructClassLoader} from "../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(issuer.Issuer);
loader.register(proposals.Expired);
loader.register(proposals.Proposal);
loader.register(proposals.Proposals);
loader.register(deps.Dep);
loader.register(deps.Deps);
loader.register(executable.Executable);
loader.register(auth.Auth);
loader.register(metadata.Metadata);
loader.register(account.ACCOUNT);
loader.register(account.Account);
loader.register(version.V1);
 }
