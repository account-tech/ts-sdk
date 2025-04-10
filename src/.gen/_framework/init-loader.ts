import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_4023711e28cda446a13175512df391445b927db0aa058144cf9abe899cbfa5e2 from "../account-actions/init";
import * as package_source_352d1a7f5e8564c8015317691511bc155817c7481deb1c66ee2615cfef41244e from "../account-extensions/init";
import * as package_source_5f7b38cbec63d97799d5b82f5231e030da5f5f0065282a63ab43cdde448d38a5 from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_352d1a7f5e8564c8015317691511bc155817c7481deb1c66ee2615cfef41244e.registerClasses(loader);
package_source_4023711e28cda446a13175512df391445b927db0aa058144cf9abe899cbfa5e2.registerClasses(loader);
package_source_5f7b38cbec63d97799d5b82f5231e030da5f5f0065282a63ab43cdde448d38a5.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
