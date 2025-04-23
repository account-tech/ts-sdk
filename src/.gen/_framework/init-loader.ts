import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_fe8c7d84458c79750ba8a6bf0b22cab3a2ab6c2028efe93d4405e4bcd475db20 from "../account-actions/init";
import * as package_source_60bdbac4243b28773ca6d354fe5da75372552838d3fe766577bb48560600f27f from "../account-extensions/init";
import * as package_source_58438e1f3ecdaee65fc2076647bf04ac173bc4bb1335ee64027a17cf9f0bf5a7 from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_58438e1f3ecdaee65fc2076647bf04ac173bc4bb1335ee64027a17cf9f0bf5a7.registerClasses(loader);
package_source_60bdbac4243b28773ca6d354fe5da75372552838d3fe766577bb48560600f27f.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
package_source_fe8c7d84458c79750ba8a6bf0b22cab3a2ab6c2028efe93d4405e4bcd475db20.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
