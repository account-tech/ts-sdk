import { IntentStatus } from "../intents";

export interface Outcome {
    status: IntentStatus;
}

export class Outcome {
    constructor(_accountId: string, _key: string, _fields: any) {}
}