import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_48101fd53d68b28e2b25a77bde7614faabb54a10f3e53c06be9230e88c4fb07e from "../kraken-actions/init";
import * as package_source_6a044e64112bd8ccfbe05b6efdf5cb187751b2637cd5b2eb46fee5da83b851be from "../kraken-extensions/init";
import * as package_source_b1e5559c3a13e645f822992a870c21a068f5e2e6fa94fa30da41677e4249097c from "../kraken-multisig/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_48101fd53d68b28e2b25a77bde7614faabb54a10f3e53c06be9230e88c4fb07e.registerClasses(loader);
package_source_6a044e64112bd8ccfbe05b6efdf5cb187751b2637cd5b2eb46fee5da83b851be.registerClasses(loader);
package_source_b1e5559c3a13e645f822992a870c21a068f5e2e6fa94fa30da41677e4249097c.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
