import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_29dd152d8a8a427cb3eb343e2f58f68e9f07587597eb23816df3e2b04a72bdfd from "../kraken-actions/init";
import * as package_source_2d1f315f2b4f5cb64901b054c7f315a03f0aea3f49f6e6c9b74cbd1d12f4b6c7 from "../kraken-extensions/init";
import * as package_source_acfd4da2d93e228e252150fc3bd030c8c3ce86b6267706de94ad8f9f6b6eba0d from "../kraken-multisig/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_29dd152d8a8a427cb3eb343e2f58f68e9f07587597eb23816df3e2b04a72bdfd.registerClasses(loader);
package_source_2d1f315f2b4f5cb64901b054c7f315a03f0aea3f49f6e6c9b74cbd1d12f4b6c7.registerClasses(loader);
package_source_acfd4da2d93e228e252150fc3bd030c8c3ce86b6267706de94ad8f9f6b6eba0d.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
