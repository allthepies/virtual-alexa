import { SkillContext } from "../core/SkillContext";
import { ConfirmationStatus } from "../dialog/DialogManager";
export declare class SlotValue {
    name: string;
    value: string;
    confirmationStatus: ConfirmationStatus;
    resolutions: {
        resolutionsPerAuthority: EntityResolution[];
    };
    constructor(name: string, value: string, confirmationStatus?: ConfirmationStatus);
    update(newSlot: SlotValue): void;
    setEntityResolution(context: SkillContext, intentName: string): void;
    private addEntityResolution;
}
export declare class EntityResolution {
    authority: string;
    values: Array<{
        value: EntityResolutionValue;
    }>;
    status: {
        code: EntityResolutionStatus;
    };
    constructor(authority: string, statusCode: EntityResolutionStatus, value?: EntityResolutionValue);
}
export declare class EntityResolutionValue {
    id: string;
    name: string;
    constructor(id: string, name: string);
}
export declare enum EntityResolutionStatus {
    ER_SUCCESS_MATCH = "ER_SUCCESS_MATCH",
    ER_SUCCESS_NO_MATCH = "ER_SUCCESS_NO_MATCH",
    ER_ERROR_TIMEOUT = "ER_ERROR_TIMEOUT",
    ER_ERROR_EXCEPTION = "ER_ERROR_EXCEPTION"
}
