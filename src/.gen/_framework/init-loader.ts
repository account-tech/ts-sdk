import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_bd4c78226735c67c73d1ca38d515b6f8ff98c28e82fe20df70b530bf096fc7d5 from "../account-actions/init";
import * as package_source_9e27e8950bb08c32342feb6277f11abb4d0f7efee0aefde04062f7acf4977af1 from "../account-config/init";
import * as package_source_1114fd9cc11d62d5e5390b37e8389688e9023358075e6e0c23ab9773ddae155d from "../account-extensions/init";
import * as package_source_fab9c0343c7710a5a10f4edca62c4dd25f742010086289cd89dd8e66c1b0e7c2 from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_1114fd9cc11d62d5e5390b37e8389688e9023358075e6e0c23ab9773ddae155d.registerClasses(loader);
package_source_9e27e8950bb08c32342feb6277f11abb4d0f7efee0aefde04062f7acf4977af1.registerClasses(loader);
package_source_bd4c78226735c67c73d1ca38d515b6f8ff98c28e82fe20df70b530bf096fc7d5.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
package_source_fab9c0343c7710a5a10f4edca62c4dd25f742010086289cd89dd8e66c1b0e7c2.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
