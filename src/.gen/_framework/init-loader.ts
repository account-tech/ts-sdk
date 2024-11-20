import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_44d7e0d34256670a0c41927282b8a738137a9a52d109db113cad5ab44e889676 from "../account-actions/init";
import * as package_source_62f210209975f48d52705d4f5b9383d1715ac4a72f2790f19c706c7aceb5ec5f from "../account-config/init";
import * as package_source_7d84a9d786503d6de795896df00a5729588de1723c433fd727edd5842d413624 from "../account-extensions/init";
import * as package_source_216b1790ffa86e5147b8ace8b2bdc0ba04fe5970d42eddcf33f8f3512134adc from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_216b1790ffa86e5147b8ace8b2bdc0ba04fe5970d42eddcf33f8f3512134adc.registerClasses(loader);
package_source_44d7e0d34256670a0c41927282b8a738137a9a52d109db113cad5ab44e889676.registerClasses(loader);
package_source_62f210209975f48d52705d4f5b9383d1715ac4a72f2790f19c706c7aceb5ec5f.registerClasses(loader);
package_source_7d84a9d786503d6de795896df00a5729588de1723c433fd727edd5842d413624.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
