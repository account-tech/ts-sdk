import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_4b7dd49a9209617b5f7b6926068e75c39f098ec658e1fec6da8d1da82541aa38 from "../account-actions/init";
import * as package_source_4e6d1ce7f12e692bcb22e30448eb517f58f2d1be63804c422820c0c9b04f288c from "../account-config/init";
import * as package_source_4c0e0a778187e0c536aace86a65d948ce81e7d3f07f8a937cfc762e30c74aa26 from "../account-extensions/init";
import * as package_source_2475852c52d75aca46d2a1d95227ca7c79fe8cfe252ffbfbd8f260eab666dda8 from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_2475852c52d75aca46d2a1d95227ca7c79fe8cfe252ffbfbd8f260eab666dda8.registerClasses(loader);
package_source_4b7dd49a9209617b5f7b6926068e75c39f098ec658e1fec6da8d1da82541aa38.registerClasses(loader);
package_source_4c0e0a778187e0c536aace86a65d948ce81e7d3f07f8a937cfc762e30c74aa26.registerClasses(loader);
package_source_4e6d1ce7f12e692bcb22e30448eb517f58f2d1be63804c422820c0c9b04f288c.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
