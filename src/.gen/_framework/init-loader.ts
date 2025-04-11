import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_e23d758c99624ae0380d3e2ace0feee73940cf6975404eb4fc038fc3d7b9073f from "../account-actions/init";
import * as package_source_159ab67fdf4e0d779af7d9eb18ea4d936e21630c328fde482a069263508cb2be from "../account-extensions/init";
import * as package_source_535ee1cd1117725e8ccf665841588d852ff32b954d8e1c8e216920cc08d25cd9 from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_159ab67fdf4e0d779af7d9eb18ea4d936e21630c328fde482a069263508cb2be.registerClasses(loader);
package_source_535ee1cd1117725e8ccf665841588d852ff32b954d8e1c8e216920cc08d25cd9.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
package_source_e23d758c99624ae0380d3e2ace0feee73940cf6975404eb4fc038fc3d7b9073f.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
