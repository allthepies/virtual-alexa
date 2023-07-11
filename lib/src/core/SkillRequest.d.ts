import { ConfirmationStatus, DialogState } from "../dialog/DialogManager";
import { SkillResponse } from "./SkillResponse";
import { VirtualAlexa } from "./VirtualAlexa";
export declare class RequestType {
    static CONNECTIONS_RESPONSE: string;
    static DISPLAY_ELEMENT_SELECTED_REQUEST: string;
    static INTENT_REQUEST: string;
    static LAUNCH_REQUEST: string;
    static SESSION_ENDED_REQUEST: string;
    static AUDIO_PLAYER_PLAYBACK_FINISHED: string;
    static AUDIO_PLAYER_PLAYBACK_NEARLY_FINISHED: string;
    static AUDIO_PLAYER_PLAYBACK_STARTED: string;
    static AUDIO_PLAYER_PLAYBACK_STOPPED: string;
}
export declare enum SessionEndedReason {
    ERROR = 0,
    EXCEEDED_MAX_REPROMPTS = 1,
    USER_INITIATED = 2
}
export declare class SkillRequest {
    private alexa;
    private static timestamp;
    private static requestID;
    private context;
    private _json;
    constructor(alexa: VirtualAlexa);
    audioPlayer(requestType: string, token: string, offsetInMilliseconds: number): SkillRequest;
    connectionsResponse(requestName: string, payload: any, token: string, statusCode?: number, statusMessage?: string): this;
    dialogState(state: DialogState): SkillRequest;
    elementSelected(token: any): SkillRequest;
    inSkillPurchaseResponse(requestName: string, purchaseResult: string, productId: string, token: string, statusCode?: number, statusMessage?: string): this;
    intent(intentName: string, confirmationStatus?: ConfirmationStatus): SkillRequest;
    intentStatus(confirmationStatus: ConfirmationStatus): SkillRequest;
    json(): any;
    launch(): SkillRequest;
    requestType(requestType: string): SkillRequest;
    sessionEnded(reason: SessionEndedReason, errorData?: any): SkillRequest;
    set(path: string | string[], value: any): SkillRequest;
    slot(slotName: string, slotValue: string, confirmationStatus?: ConfirmationStatus): SkillRequest;
    send(): Promise<SkillResponse>;
    slots(slots: {
        [id: string]: string;
    }): SkillRequest;
    slotStatus(slotName: string, confirmationStatus: ConfirmationStatus): SkillRequest;
    private baseRequest;
    private userObject;
}
