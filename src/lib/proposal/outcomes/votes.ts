import { ACCOUNT_CONFIG } from "../../../types/constants";

export class Votes {
    static configType: string = `${ACCOUNT_CONFIG}::dao::Dao`;
    static outcomeType: string = `${ACCOUNT_CONFIG}::dao::Votes`;

    constructor(
        public multisig: string,
        public key: string,
        public forCount: number,
        public againstCount: number,
        public voted: string[],
    ) { }
}
