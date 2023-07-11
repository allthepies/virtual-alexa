import { AudioPlayer } from "../audioPlayer/AudioPlayer";
import { AddressAPI } from "../external/AddressAPI";
import { DialogManager } from "../dialog/DialogManager";
import { DynamoDB } from "../external/DynamoDB";
import { SkillContext } from "./SkillContext";
import { SessionEndedReason } from "./SkillRequest";
import { SkillRequest } from "./SkillRequest";
import { SkillResponse } from "./SkillResponse";
import { UserAPI } from "../external/UserAPI";
export declare class VirtualAlexa {
    static Builder(): VirtualAlexaBuilder;
    addressAPI(): AddressAPI;
    userAPI(): UserAPI;
    audioPlayer(): AudioPlayer;
    context(): SkillContext;
    dialogManager(): DialogManager;
    dynamoDB(): DynamoDB;
    endSession(sessionEndedReason?: SessionEndedReason, errorData?: any): Promise<SkillResponse>;
    filter(requestFilter: RequestFilter): VirtualAlexa;
    intend(intentName: string, slots?: {
        [id: string]: string;
    }): Promise<SkillResponse>;
    request(): SkillRequest;
    selectElement(token: any): Promise<SkillResponse>;
    launch(): Promise<SkillResponse>;
    resetFilter(): VirtualAlexa;
    utter(utteranceString: string): Promise<SkillResponse>;
    private parseLaunchRequest;
}
export declare type RequestFilter = (request: any) => void;
export declare class VirtualAlexaBuilder {
    applicationID(id: string): VirtualAlexaBuilder;
    handler(handlerName: string | ((...args: any[]) => void)): VirtualAlexaBuilder;
    intentSchema(json: any): VirtualAlexaBuilder;
    intentSchemaFile(filePath: any): VirtualAlexaBuilder;
    interactionModel(json: any): VirtualAlexaBuilder;
    interactionModelFile(filePath: string): VirtualAlexaBuilder;
    sampleUtterances(utterances: any): VirtualAlexaBuilder;
    sampleUtterancesFile(filePath: string): VirtualAlexaBuilder;
    skillURL(url: string): VirtualAlexaBuilder;
    locale(locale: string): VirtualAlexaBuilder;
    create(): VirtualAlexa;
}
