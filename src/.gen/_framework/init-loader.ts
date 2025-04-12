import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_f103de464b4e3b92f18c9a67e762111f03d99b7928097ab1621a9f9b476f5dcb from "../account-actions/init";
import * as package_source_e12b413d040fad46e6510a1ade973f23e2933a03631029120193b870fec7aae0 from "../account-extensions/init";
import * as package_source_3e3387bfcd0feeca97d7b7d8bfa3056e901e7e77702e46fd3427fa071c2834bf from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_3e3387bfcd0feeca97d7b7d8bfa3056e901e7e77702e46fd3427fa071c2834bf.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
package_source_e12b413d040fad46e6510a1ade973f23e2933a03631029120193b870fec7aae0.registerClasses(loader);
package_source_f103de464b4e3b92f18c9a67e762111f03d99b7928097ab1621a9f9b476f5dcb.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
