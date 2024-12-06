import * as package_source_1 from "../_dependencies/source/0x1/init";
import * as package_source_2 from "../_dependencies/source/0x2/init";
import * as package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585 from "../_dependencies/source/0xbd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585/init";
import * as package_source_8a7663da8c03440130edf937fbbc75aee6d624d2171a9dea0dc8c4827336cf from "../account-actions/init";
import * as package_source_24fc7f9bb5edbf709f56db3116ba9c5c8260a911090b141f52c0b02a70758b9b from "../account-config/init";
import * as package_source_be976e1f23930ad6150dad9b50eb9ccc01466da36b54ad88bd43a77c66ea70bb from "../account-extensions/init";
import * as package_source_1696024b7ab7419127bbc671bcd216e9a740103bfcb7bf22d8684b36f824ab75 from "../account-protocol/init";
import {StructClassLoader} from "./loader";

function registerClassesSource(loader: StructClassLoader) { package_source_1.registerClasses(loader);
package_source_2.registerClasses(loader);
package_source_8a7663da8c03440130edf937fbbc75aee6d624d2171a9dea0dc8c4827336cf.registerClasses(loader);
package_source_1696024b7ab7419127bbc671bcd216e9a740103bfcb7bf22d8684b36f824ab75.registerClasses(loader);
package_source_24fc7f9bb5edbf709f56db3116ba9c5c8260a911090b141f52c0b02a70758b9b.registerClasses(loader);
package_source_bd8fc1947cf119350184107a3087e2dc27efefa0dd82e25a1f699069fe81a585.registerClasses(loader);
package_source_be976e1f23930ad6150dad9b50eb9ccc01466da36b54ad88bd43a77c66ea70bb.registerClasses(loader);
 }

export function registerClasses(loader: StructClassLoader) { registerClassesSource(loader); }
