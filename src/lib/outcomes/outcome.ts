import { IntentStatus } from "../intents";

export interface Outcome {
}

export class Outcome {
    static type: string;
    status: IntentStatus = { stage: "pending", deletable: false };

    constructor(_accountId: string, _key: string, _fields: any) {}
}