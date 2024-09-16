import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { ExtensionFields, Extensions as ExtensionsRaw, History } from '../.gen/kraken-extensions/extensions/structs';
import { EXTENSIONS } from '../types/constants';

export interface Extension {
    name: string;
    history: { package: string, version: number }[];
}

export class Extensions {
    public client: SuiClient;
    public extensions?: Extension[];

    private constructor(
        public network: 'mainnet' | 'testnet' | 'devnet' | 'localnet' | string,
    ) {
        const url = (network == 'mainnet' || network == 'testnet' || network == 'devnet' || network == 'localnet') ? getFullnodeUrl(network) : network;
        this.client = new SuiClient({ url });
    }

    static async init(
        network: 'mainnet' | 'testnet' | 'devnet' | 'localnet' | string,
    ): Promise<Extensions> {
        const extensions = new Extensions(network);
        extensions.extensions = await extensions.getExtensions();

        return extensions;
    }

    async fetchExtensions() {
        this.extensions = await this.getExtensions();
    }

    // get and decode extensions data using sui-client-gen
    async getExtensionsRaw(): Promise<ExtensionsRaw> {
        const { data } = await this.client.getObject({
            id: EXTENSIONS,
            options: { showContent: true }
        });

        if (!data?.content) throw new Error('Extensions shared object not found.');

        return ExtensionsRaw.fromSuiParsedData(data.content);
    }

    // get and format extensions data
    async getExtensions(): Promise<Extension[]> {
        const extensionsRaw = await this.getExtensionsRaw();

        const extensions: Extension[] = extensionsRaw.inner.map((extension: ExtensionFields) => {
            const history = extension.history.map((entry: History) => {
                return {
                    package: entry.package,
                    version: Number(entry.version),
                }
            });
            
            return { name: extension.name, history };
        });
        
        return extensions;
    }
}

