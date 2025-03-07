import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_730a9f336be5b66cc221eb8d5030ee2c65838aad95c7c5a1082733bea9dc2f3d from "../account-actions/init";
import * as package_source_94308db2bb8510fe049a2753e1f05ab46c94c8f1e5bd5f163d5173318a3a3d30 from "../account-extensions/init";
import * as package_source_ceacdcf1d8aeb17acb0ad695d2229b818cef98b4fbed673db84ee64ec4b24e86 from "../account-multisig/init";
import * as package_source_378bf5c9174a33e4669c95d8e22231c7739b333d97b2a876e6734f755e72ee56 from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_378bf5c9174a33e4669c95d8e22231c7739b333d97b2a876e6734f755e72ee56.registerClasses(loader);
package_source_730a9f336be5b66cc221eb8d5030ee2c65838aad95c7c5a1082733bea9dc2f3d.registerClasses(loader);
package_source_94308db2bb8510fe049a2753e1f05ab46c94c8f1e5bd5f163d5173318a3a3d30.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
package_source_ceacdcf1d8aeb17acb0ad695d2229b818cef98b4fbed673db84ee64ec4b24e86.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
