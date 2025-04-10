import { Cap, ManagedKeyTypes } from "../types";
import { Asset } from "../managed";

export class Caps extends Asset {
    override type = "caps";
    static keys = [ManagedKeyTypes.Cap];
    override assets: Record<string, Cap> = {}; // name -> currency struct

    async init() {
        this.dfs = this.dfs.filter(df => Caps.keys.some(key => df.name.type.includes(key)));
        
        this.dfs.forEach(df => {
            const capType = df.name.type.match(/<([^>]*)>/)![1];
            this.assets[capType] = {
                type: capType,
            };
        });
    }
}

