import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_c44f14b2c2355191f186b5bf6296088b555b102c7589d681a9175a187a594c0b from "../account-actions/init";
import * as package_source_9515bb7d79ecbe71f051b9fb3058ecf05590d615de38f07c934b32d7cb597593 from "../account-config/init";
import * as package_source_c08762cd4fba158150867638f1308b8d84c54420fce392b8f45984c3aad5145e from "../account-extensions/init";
import * as package_source_16cea975ee5807af93e297491dbb68d22227861e8c793bfbf39bf5c70a4f38e2 from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_16cea975ee5807af93e297491dbb68d22227861e8c793bfbf39bf5c70a4f38e2.registerClasses(loader);
package_source_9515bb7d79ecbe71f051b9fb3058ecf05590d615de38f07c934b32d7cb597593.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
package_source_c08762cd4fba158150867638f1308b8d84c54420fce392b8f45984c3aad5145e.registerClasses(loader);
package_source_c44f14b2c2355191f186b5bf6296088b555b102c7589d681a9175a187a594c0b.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
