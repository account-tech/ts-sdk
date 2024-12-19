import { SuiClient } from "@mysten/sui/client";
import { ExtensionFields, Extensions as ExtensionsRaw, History } from "../.gen/account-extensions/extensions/structs";
import { EXTENSIONS } from "../types/constants";

export type ExtensionData = {
    name: string;
    history: { package: string, version: number }[];
}

export class Extensions {
    extensions: ExtensionData[] = [];

    private constructor(
        public client: SuiClient,
    ) {
        this.client = client;
    }

    static async init(client: SuiClient): Promise<Extensions> {
        const extensions = new Extensions(client);
        await extensions.refresh();

        return extensions;
    }
    
    // get and format extensions data
    async fetch(): Promise<ExtensionData[]> {
        const extensionsRaw = await ExtensionsRaw.fetch(this.client, EXTENSIONS);

        const extensions: ExtensionData[] = extensionsRaw.inner.map((extension: ExtensionFields) => {
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

    async refresh() {
        this.setData(await this.fetch());
    }

    setData(extensions: ExtensionData[]) {
        this.extensions = extensions;
    }

    getData(): ExtensionData[] {
        return this.extensions;
    }
}

