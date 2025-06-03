import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_cd8992a58a73c16baaef85bbec200ea6722196e0d1c6fc75501b3c6af5f590aa from "../account-actions/init";
import * as package_source_3506d95c270e2ae16bd3cbf11b701808390807450697a1bd302b29e7b59e8fdc from "../account-extensions/init";
import * as package_source_a8ab4e47d58f47ce46a8a0748c8511a733264ea55f4896ed81673414a26b4ab0 from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_3506d95c270e2ae16bd3cbf11b701808390807450697a1bd302b29e7b59e8fdc.registerClasses(loader);
package_source_a8ab4e47d58f47ce46a8a0748c8511a733264ea55f4896ed81673414a26b4ab0.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
package_source_cd8992a58a73c16baaef85bbec200ea6722196e0d1c6fc75501b3c6af5f590aa.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
