export class Outcome {
    public static configType: string; 
    public static outcomeType: string; 

    constructor(
        public account: string,
        public key: string,
    ) {}
}

// export const OutcomeTypeToClass = {
//     [Approvals.type]: Approvals,
//     [Votes.type]: Votes,
// } as const;

// export type OutcomeType = keyof typeof OutcomeTypeToClass;