import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_3a13a30a15aeed4cffa6d9438ff4636e589f02dac2c0ce7d518c9cdab4f3118 from "../account-actions/init";
import * as package_source_2c137265d68d158493ba021f7c59913785fe524c6f19c22c8dea8e591a1d9c20 from "../account-extensions/init";
import * as package_source_ee067c667ba529cfe69c2768a483b4269fa02eebacf69e0e69329c596873812c from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_3a13a30a15aeed4cffa6d9438ff4636e589f02dac2c0ce7d518c9cdab4f3118.registerClasses(loader);
package_source_2c137265d68d158493ba021f7c59913785fe524c6f19c22c8dea8e591a1d9c20.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
package_source_ee067c667ba529cfe69c2768a483b4269fa02eebacf69e0e69329c596873812c.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
