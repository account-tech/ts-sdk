import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_5157065814a71c09b3d91ab2770115b0c6ee429b4282aa83abd1bfc809ea6e1c from "../account-actions/init";
import * as package_source_15e11747882913076d286d9ed9a34f667ce45c69cbd5ac2d6fb2a265d0ce38f6 from "../account-config/init";
import * as package_source_37ba6b53612b2641aee61dd82d4fd8c0464dacc2a4427c3792603d6c1f8db221 from "../account-extensions/init";
import * as package_source_209df05fc0453a320ab36923e62f25dde5648974edb3460620d76142dd1e2b07 from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_15e11747882913076d286d9ed9a34f667ce45c69cbd5ac2d6fb2a265d0ce38f6.registerClasses(loader);
package_source_209df05fc0453a320ab36923e62f25dde5648974edb3460620d76142dd1e2b07.registerClasses(loader);
package_source_37ba6b53612b2641aee61dd82d4fd8c0464dacc2a4427c3792603d6c1f8db221.registerClasses(loader);
package_source_5157065814a71c09b3d91ab2770115b0c6ee429b4282aa83abd1bfc809ea6e1c.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
