import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_47f40cba7b543409155238c9ddd0914f2d9f1bd69ebd2116a32dd667da0f4aab from "../account-actions/init";
import * as package_source_6e4d4fd65ffc3e7b09969bcfc34d4ec0b5bd640279f0027849884af404e9bc09 from "../account-extensions/init";
import * as package_source_77a39df37fab5b6d47c9976f114ef1ac21313edee5a446135c08fdbaf615b623 from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_47f40cba7b543409155238c9ddd0914f2d9f1bd69ebd2116a32dd667da0f4aab.registerClasses(loader);
package_source_6e4d4fd65ffc3e7b09969bcfc34d4ec0b5bd640279f0027849884af404e9bc09.registerClasses(loader);
package_source_77a39df37fab5b6d47c9976f114ef1ac21313edee5a446135c08fdbaf615b623.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
