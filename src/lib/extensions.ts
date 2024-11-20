import { SuiClient } from "@mysten/sui/client";
import { ExtensionFields, Extensions as ExtensionsRaw, History } from "../.gen/account-extensions/extensions/structs";
import { EXTENSIONS } from "../types/constants";

export interface Extension {
    name: string;
    history: { package: string, version: number }[];
}

export class Extensions {
    extensions: Extension[] = [];

    private constructor(
        public client: SuiClient,
    ) {
        this.client = client;
    }

    static async init(client: SuiClient): Promise<Extensions> {
        const extensions = new Extensions(client);
        extensions.setExtensions(await extensions.fetchExtensions());

        return extensions;
    }
    
    // get and format extensions data
    async fetchExtensions(): Promise<Extension[]> {
        const { data } = await this.client.getObject({
            id: EXTENSIONS,
            options: { showContent: true }
        });
    
        if (!data?.content) throw new Error("Extensions shared object not found.");
        
        const extensionsRaw = ExtensionsRaw.fromSuiParsedData(data.content);

        const extensions: Extension[] = extensionsRaw.inner.map((extension: ExtensionFields) => {
            const history = extension.history.map((entry: History) => {
                return {
                    package: entry.addr,
                    version: Number(entry.version),
                }
            });
            
            return { name: extension.name, history };
        });
        
        return extensions;
    }

    setExtensions(extensions: Extension[]) {
        this.extensions = extensions;
    }

    getExtensions(): Extension[] {
        return this.extensions;
    }
}

