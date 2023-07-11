import { SlotValue } from "../impl/SlotValue";
export declare class SlotPrompt {
    static fromJSON(json: any): SlotPrompt;
    id: string;
    variations: SlotVariation[];
    variation(slots: {
        [id: string]: SlotValue;
    }): string;
}
export declare class SlotVariation {
    type: string;
    value: string;
}
