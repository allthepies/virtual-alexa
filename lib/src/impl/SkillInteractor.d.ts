import { SkillRequest } from "../core/SkillRequest";
import { SkillResponse } from "../core/SkillResponse";
import { RequestFilter } from "../core/VirtualAlexa";
import { VirtualAlexa } from "../core/VirtualAlexa";
export declare abstract class SkillInteractor {
    protected requestFilter: RequestFilter;
    protected _alexa: VirtualAlexa;
    filter(requestFilter: RequestFilter): void;
    callSkill(serviceRequest: SkillRequest): Promise<SkillResponse>;
    protected abstract invoke(requestJSON: any): Promise<any>;
    private interactionModel;
}
