import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_c93d8630fe588dc8c4e81feac51543d5f8c8a2837c5187e644556860b447943b from "../account-actions/init";
import * as package_source_830b9b1dbe3925a0e7f139cd9e65eecd5275175d25e8052747f94bd4084c5b53 from "../account-config/init";
import * as package_source_1d44d8f613f07d3683aabac27027b741d18bb7ab01352be31f9f1e6c12d84e97 from "../account-extensions/init";
import * as package_source_9148d2d673214d9e82a87e24c602226a3ad8fdaaf8f7295ef1b52cb84330b94 from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_9148d2d673214d9e82a87e24c602226a3ad8fdaaf8f7295ef1b52cb84330b94.registerClasses(loader);
package_source_1d44d8f613f07d3683aabac27027b741d18bb7ab01352be31f9f1e6c12d84e97.registerClasses(loader);
package_source_830b9b1dbe3925a0e7f139cd9e65eecd5275175d25e8052747f94bd4084c5b53.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
package_source_c93d8630fe588dc8c4e81feac51543d5f8c8a2837c5187e644556860b447943b.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
