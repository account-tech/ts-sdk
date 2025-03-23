import * as config from "./config/structs";
import * as fees from "./fees/structs";
import * as pay from "./pay/structs";
import * as payment from "./payment/structs";
import * as version from "./version/structs";
import {StructClassLoader} from "../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(config.ConfigPaymentAction);
loader.register(config.ConfigPaymentIntent);
loader.register(fees.AdminCap);
loader.register(fees.Fees);
loader.register(pay.PayAction);
loader.register(pay.PayEvent);
loader.register(pay.PayIntent);
loader.register(payment.ConfigWitness);
loader.register(payment.Payment);
loader.register(payment.Pending);
loader.register(version.V1);
 }
