import { InteractionModel } from "../model/InteractionModel";
import { SlotPrompt } from "../model/SlotPrompt";
export declare class DialogIntent {
    static fromJSON(interactionModel: InteractionModel, json: any): DialogIntent;
    name: string;
    confirmationRequired: boolean;
    interactionModel: InteractionModel;
    prompts: any;
    slots: DialogSlot[];
    addSlot(slot: DialogSlot): void;
}
export declare class DialogSlot {
    dialogIntent: DialogIntent;
    static fromJSON(dialogIntent: DialogIntent, json: any): DialogSlot;
    name: string;
    type: string;
    elicitationRequired: boolean;
    confirmationRequired: boolean;
    prompts: {
        [id: string]: string;
    };
    constructor(dialogIntent: DialogIntent);
    elicitationPrompt(): SlotPrompt;
    confirmationPrompt(): SlotPrompt;
}
