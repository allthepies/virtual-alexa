"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogManager = exports.DialogState = exports.ConfirmationStatus = void 0;
var ConfirmationStatus;
(function (ConfirmationStatus) {
    ConfirmationStatus["CONFIRMED"] = "CONFIRMED";
    ConfirmationStatus["DENIED"] = "DENIED";
    ConfirmationStatus["NONE"] = "NONE";
})(ConfirmationStatus = exports.ConfirmationStatus || (exports.ConfirmationStatus = {}));
var DialogState;
(function (DialogState) {
    DialogState["COMPLETED"] = "COMPLETED";
    DialogState["IN_PROGRESS"] = "IN_PROGRESS";
    DialogState["STARTED"] = "STARTED";
})(DialogState = exports.DialogState || (exports.DialogState = {}));
var DialogManager = (function () {
    function DialogManager(context) {
        this.context = context;
        this._delegated = false;
        this._dialogIntent = undefined;
        this._confirmingSlot = undefined;
        this._dialogState = undefined;
        this._slots = {};
    }
    DialogManager.prototype.handleDirective = function (response) {
        for (var _i = 0, _a = response.response.directives; _i < _a.length; _i++) {
            var directive = _a[_i];
            if (directive.type.startsWith("Dialog")) {
                if (directive.updatedIntent) {
                    this._dialogIntent = this.context.interactionModel().dialogIntent(directive.updatedIntent.name);
                    if (!this.context.interactionModel().dialogIntent(directive.updatedIntent.name)) {
                        throw new Error("No match for dialog name: " + directive.updatedIntent.name);
                    }
                }
                this._dialogState = this._dialogState ? DialogState.IN_PROGRESS : DialogState.STARTED;
                if (directive.type === "Dialog.Delegate") {
                    this._delegated = true;
                    this._confirmationStatus = ConfirmationStatus.NONE;
                }
                else if (directive.type === "Dialog.ElicitSlot"
                    || directive.type === "Dialog.ConfirmSlot"
                    || directive.type === "Dialog.ConfirmIntent") {
                    if (!this._confirmationStatus) {
                        this._confirmationStatus = ConfirmationStatus.NONE;
                    }
                    if (directive.updatedIntent) {
                        this.updateSlotStates(directive.updatedIntent.slots);
                    }
                    if (directive.type === "Dialog.ConfirmSlot") {
                        var slotToConfirm = directive.slotToConfirm;
                        this._confirmingSlot = this.slots()[slotToConfirm];
                    }
                    else if (directive.type === "Dialog.ConfirmIntent") {
                        this._dialogState = DialogState.COMPLETED;
                    }
                }
            }
        }
    };
    DialogManager.prototype.confirmationStatus = function (confirmationStatus) {
        if (confirmationStatus) {
            this._confirmationStatus = confirmationStatus;
        }
        return this._confirmationStatus;
    };
    DialogManager.prototype.handleRequest = function (request) {
        var intentName = request.json().request.intent.name;
        if (this.context.interactionModel().dialogIntent(intentName)) {
            this._dialogIntent = this.context.interactionModel().dialogIntent(intentName);
            if (!this._dialogState) {
                this._dialogState = DialogState.STARTED;
            }
            request.json().request.dialogState = this._dialogState;
            this.context.dialogManager().updateSlotStates(request.json().request.intent.slots);
        }
    };
    DialogManager.prototype.isDelegated = function () {
        return this._delegated;
    };
    DialogManager.prototype.isDialog = function () {
        return this._dialogState !== undefined;
    };
    DialogManager.prototype.reset = function () {
        this.dialogExited();
    };
    DialogManager.prototype.slots = function () {
        return this._slots;
    };
    DialogManager.prototype.state = function (state) {
        if (state) {
            this._dialogState = state;
        }
        return this._dialogState;
    };
    DialogManager.prototype.updateSlot = function (slotName, newSlot) {
        var existingSlot = this._slots[slotName];
        if (!existingSlot) {
            this._slots[slotName] = newSlot;
        }
        else if (existingSlot && newSlot.value) {
            existingSlot.value = newSlot.value;
            existingSlot.resolutions = newSlot.resolutions;
            existingSlot.confirmationStatus = newSlot.confirmationStatus;
        }
    };
    DialogManager.prototype.updateSlotStates = function (slots) {
        if (!slots) {
            return;
        }
        for (var _i = 0, _a = Object.keys(slots); _i < _a.length; _i++) {
            var slotName = _a[_i];
            var newSlot = slots[slotName];
            this.updateSlot(slotName, newSlot);
        }
    };
    DialogManager.prototype.dialogExited = function () {
        this._confirmationStatus = undefined;
        this._delegated = false;
        this._dialogState = undefined;
        this._dialogIntent = undefined;
        this._slots = {};
    };
    return DialogManager;
}());
exports.DialogManager = DialogManager;
//# sourceMappingURL=DialogManager.js.map