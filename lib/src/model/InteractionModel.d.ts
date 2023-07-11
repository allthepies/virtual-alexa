import { IModel, SampleUtterances, SlotTypes } from "virtual-core";
import { DialogIntent } from "../dialog/DialogIntent";
import { IntentSchema } from "./IntentSchema";
import { SlotPrompt } from "./SlotPrompt";
export declare class InteractionModel implements IModel {
    intentSchema: IntentSchema;
    sampleUtterances: SampleUtterances;
    slotTypes?: SlotTypes;
    prompts?: SlotPrompt[];
    dialogIntents?: DialogIntent[];
    static fromFile(interactionModelFile: any): InteractionModel;
    static fromJSON(interactionModel: any): InteractionModel;
    static fromLocale(locale: string): InteractionModel;
    constructor(intentSchema: IntentSchema, sampleUtterances: SampleUtterances, slotTypes?: SlotTypes, prompts?: SlotPrompt[], dialogIntents?: DialogIntent[]);
    isSupportedIntent(isAudioPlayerSupported: boolean, intent: string): boolean;
    hasIntent(intent: string): boolean;
    dialogIntent(intentName: string): DialogIntent | undefined;
    prompt(id: string): SlotPrompt | undefined;
    audioPlayerSupported(intentSchema: IntentSchema): boolean;
}
