import * as package_1 from "../_dependencies/source/0x1/init";
import * as package_2 from "../_dependencies/source/0x2/init";
import * as package_5114c85c54a6934cd9aa6ba75b523b97641f2c1dcb883e5bfa5a2c7a75f3cf69 from "../_dependencies/source/0x5114c85c54a6934cd9aa6ba75b523b97641f2c1dcb883e5bfa5a2c7a75f3cf69/init";
import * as package_fc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6 from "../kraken/init";
import {structClassLoaderSource as structClassLoader} from "./loader";

let initialized = false; export function initLoaderIfNeeded() { if (initialized) { return }; initialized = true; package_1.registerClasses(structClassLoader);
package_2.registerClasses(structClassLoader);
package_fc7fe302a04f775d0142bb5ef8843530bf53fc61b14262a7d22a0a2620973c6.registerClasses(structClassLoader);
package_5114c85c54a6934cd9aa6ba75b523b97641f2c1dcb883e5bfa5a2c7a75f3cf69.registerClasses(structClassLoader);
 }
