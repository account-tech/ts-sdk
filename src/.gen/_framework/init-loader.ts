import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_ec2e909285b24fad4dec4fbcf9b6b0320a87d0dbb109113935890e3c56800115 from "../account-actions/init";
import * as package_source_b323fd685ed857f7fea452532fa61e04de6dd1c3b5efbb672cfc70385da30e2b from "../account-extensions/init";
import * as package_source_b6cf8766b9e7d10e8e060b3d724a08eae8285a1d37285b0622e22bb13e9c80ab from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_b323fd685ed857f7fea452532fa61e04de6dd1c3b5efbb672cfc70385da30e2b.registerClasses(loader);
package_source_b6cf8766b9e7d10e8e060b3d724a08eae8285a1d37285b0622e22bb13e9c80ab.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
package_source_ec2e909285b24fad4dec4fbcf9b6b0320a87d0dbb109113935890e3c56800115.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
