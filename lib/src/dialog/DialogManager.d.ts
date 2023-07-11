import { SkillContext } from "../core/SkillContext";
export declare enum ConfirmationStatus {
    CONFIRMED = "CONFIRMED",
    DENIED = "DENIED",
    NONE = "NONE"
}
export declare enum DialogState {
    COMPLETED = "COMPLETED",
    IN_PROGRESS = "IN_PROGRESS",
    STARTED = "STARTED"
}
export declare class DialogManager {
    context: SkillContext;
    private _delegated;
    private _dialogIntent;
    private _confirmingSlot;
    private _confirmationStatus;
    private _dialogState;
    private _slots;
    constructor(context: SkillContext);
    confirmationStatus(confirmationStatus: ConfirmationStatus): ConfirmationStatus;
    reset(): void;
    state(state?: DialogState): DialogState;
    private dialogExited;
}
