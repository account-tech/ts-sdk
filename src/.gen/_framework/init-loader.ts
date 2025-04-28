import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_8d549e5480a5f3e3484d052264016c195338e2a7f1d29d0b8ee20258de76ce16 from "../account-actions/init";
import * as package_source_2f10ccb3323bae290b908c48e383a4136e309ea47ec42d33f5671e4fd61f3953 from "../account-extensions/init";
import * as package_source_43d63bbb07420bcef4b933e6b0dd59d1fb42fa2fa5d1a39e91e26a5e6e50049 from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_43d63bbb07420bcef4b933e6b0dd59d1fb42fa2fa5d1a39e91e26a5e6e50049.registerClasses(loader);
package_source_2f10ccb3323bae290b908c48e383a4136e309ea47ec42d33f5671e4fd61f3953.registerClasses(loader);
package_source_8d549e5480a5f3e3484d052264016c195338e2a7f1d29d0b8ee20258de76ce16.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
