export class Outcome {
    public static configType: string; 
    public static outcomeType: string; 

    constructor(
        public account: string,
        public key: string,
    ) {}
}