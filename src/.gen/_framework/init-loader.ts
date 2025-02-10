import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_5f9e3d054fe82b8cb3715754ada32135b8e7f2c1a063210878a2451c93fe9131 from "../account-actions/init";
import * as package_source_4c3baa44a51df0b52e647321d77be622dd1d7e681089c77967925d06553d462b from "../account-config/init";
import * as package_source_97ea2592e9f0ab8a44110dc84c21649139629e31f9b4c8c570753e81fc290fae from "../account-extensions/init";
import * as package_source_e10f24a9d1f429ebfe37b4960912eaab95263dccd1db8dc71aeede8572525cf3 from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_4c3baa44a51df0b52e647321d77be622dd1d7e681089c77967925d06553d462b.registerClasses(loader);
package_source_5f9e3d054fe82b8cb3715754ada32135b8e7f2c1a063210878a2451c93fe9131.registerClasses(loader);
package_source_97ea2592e9f0ab8a44110dc84c21649139629e31f9b4c8c570753e81fc290fae.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
package_source_e10f24a9d1f429ebfe37b4960912eaab95263dccd1db8dc71aeede8572525cf3.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
