import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_f9ebf7a79462158e222d23e68325817fbbc37104b10c4651e7a9b6966619e3a6 from "../account-actions/init";
import * as package_source_8f56ea68e62a1dae01474fa14ac5f1b7d18e329bb7a1c9ae436ed4001b10cc83 from "../account-config/init";
import * as package_source_c796940575f9cc85c2b7773907767be737bcc08e8df8d25f7b4a1e23cd83f86d from "../account-extensions/init";
import * as package_source_f5e80b75b4da9656c3e5bf4de7cd5904f6892050c707d84f2f17fcb55f429ecc from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_8f56ea68e62a1dae01474fa14ac5f1b7d18e329bb7a1c9ae436ed4001b10cc83.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
package_source_c796940575f9cc85c2b7773907767be737bcc08e8df8d25f7b4a1e23cd83f86d.registerClasses(loader);
package_source_f5e80b75b4da9656c3e5bf4de7cd5904f6892050c707d84f2f17fcb55f429ecc.registerClasses(loader);
package_source_f9ebf7a79462158e222d23e68325817fbbc37104b10c4651e7a9b6966619e3a6.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
