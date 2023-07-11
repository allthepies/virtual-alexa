"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillRequest = exports.SessionEndedReason = exports.RequestType = void 0;
var uuid = require("uuid");
var _ = require("lodash");
var AudioPlayer_1 = require("../audioPlayer/AudioPlayer");
var SlotValue_1 = require("../impl/SlotValue");
var DialogManager_1 = require("../dialog/DialogManager");
var RequestType = (function () {
    function RequestType() {
    }
    RequestType.CONNECTIONS_RESPONSE = "Connections.Response";
    RequestType.DISPLAY_ELEMENT_SELECTED_REQUEST = "Display.ElementSelected";
    RequestType.INTENT_REQUEST = "IntentRequest";
    RequestType.LAUNCH_REQUEST = "LaunchRequest";
    RequestType.SESSION_ENDED_REQUEST = "SessionEndedRequest";
    RequestType.AUDIO_PLAYER_PLAYBACK_FINISHED = "AudioPlayer.PlaybackFinished";
    RequestType.AUDIO_PLAYER_PLAYBACK_NEARLY_FINISHED = "AudioPlayer.PlaybackNearlyFinished";
    RequestType.AUDIO_PLAYER_PLAYBACK_STARTED = "AudioPlayer.PlaybackStarted";
    RequestType.AUDIO_PLAYER_PLAYBACK_STOPPED = "AudioPlayer.PlaybackStopped";
    return RequestType;
}());
exports.RequestType = RequestType;
var SessionEndedReason;
(function (SessionEndedReason) {
    SessionEndedReason[SessionEndedReason["ERROR"] = 0] = "ERROR";
    SessionEndedReason[SessionEndedReason["EXCEEDED_MAX_REPROMPTS"] = 1] = "EXCEEDED_MAX_REPROMPTS";
    SessionEndedReason[SessionEndedReason["USER_INITIATED"] = 2] = "USER_INITIATED";
})(SessionEndedReason = exports.SessionEndedReason || (exports.SessionEndedReason = {}));
var SkillRequest = (function () {
    function SkillRequest(alexa) {
        this.alexa = alexa;
        this.context = alexa.context();
        this._json = this.baseRequest();
    }
    SkillRequest.timestamp = function () {
        var timestamp = new Date().toISOString();
        return timestamp.substring(0, 19) + "Z";
    };
    SkillRequest.requestID = function () {
        return "amzn1.echo-external.request." + uuid.v4();
    };
    SkillRequest.prototype.audioPlayer = function (requestType, token, offsetInMilliseconds) {
        this.requestType(requestType);
        this._json.request.token = token;
        this._json.request.offsetInMilliseconds = offsetInMilliseconds;
        return this;
    };
    SkillRequest.prototype.connectionsResponse = function (requestName, payload, token, statusCode, statusMessage) {
        if (statusCode === void 0) { statusCode = 200; }
        if (statusMessage === void 0) { statusMessage = "OK"; }
        this.requestType(RequestType.CONNECTIONS_RESPONSE);
        this._json.request.name = requestName;
        this._json.request.payload = payload;
        this._json.request.token = token;
        this._json.request.status = {
            code: statusCode,
            message: statusMessage
        };
        return this;
    };
    SkillRequest.prototype.dialogState = function (state) {
        this.context.dialogManager().state(state);
        this._json.request.dialogState = state;
        return this;
    };
    SkillRequest.prototype.elementSelected = function (token) {
        this.requestType(RequestType.DISPLAY_ELEMENT_SELECTED_REQUEST);
        this._json.request.token = token;
        return this;
    };
    SkillRequest.prototype.inSkillPurchaseResponse = function (requestName, purchaseResult, productId, token, statusCode, statusMessage) {
        if (statusCode === void 0) { statusCode = 200; }
        if (statusMessage === void 0) { statusMessage = "OK"; }
        return this.connectionsResponse(requestName, {
            productId: productId,
            purchaseResult: purchaseResult,
        }, token, statusCode, statusMessage);
    };
    SkillRequest.prototype.intent = function (intentName, confirmationStatus) {
        if (confirmationStatus === void 0) { confirmationStatus = DialogManager_1.ConfirmationStatus.NONE; }
        this.requestType(RequestType.INTENT_REQUEST);
        var isBuiltin = intentName.startsWith("AMAZON");
        if (!isBuiltin) {
            if (!this.context.interactionModel().hasIntent(intentName)) {
                throw new Error("Interaction model has no intentName named: " + intentName);
            }
        }
        this._json.request.intent = {
            confirmationStatus: confirmationStatus,
            name: intentName,
            slots: {},
        };
        var intent = this.context.interactionModel().intentSchema.intent(intentName);
        var intentSlots = intent.slots;
        if (intentSlots) {
            for (var _i = 0, intentSlots_1 = intentSlots; _i < intentSlots_1.length; _i++) {
                var intentSlot = intentSlots_1[_i];
                this._json.request.intent.slots[intentSlot.name] = {
                    name: intentSlot.name,
                    confirmationStatus: DialogManager_1.ConfirmationStatus.NONE
                };
            }
        }
        if (this.context.interactionModel().dialogIntent(intentName)) {
            this.context.dialogManager().handleRequest(this);
            this.json().request.intent.slots = this.context.dialogManager().slots();
        }
        return this;
    };
    SkillRequest.prototype.intentStatus = function (confirmationStatus) {
        this._json.request.intent.confirmationStatus = confirmationStatus;
        return this;
    };
    SkillRequest.prototype.json = function () {
        return this._json;
    };
    SkillRequest.prototype.launch = function () {
        this.requestType(RequestType.LAUNCH_REQUEST);
        return this;
    };
    SkillRequest.prototype.requiresSession = function () {
        return (this._json.request.type === RequestType.LAUNCH_REQUEST
            || this._json.request.type === RequestType.DISPLAY_ELEMENT_SELECTED_REQUEST
            || this._json.request.type === RequestType.INTENT_REQUEST
            || this._json.request.type === RequestType.SESSION_ENDED_REQUEST);
    };
    SkillRequest.prototype.requestType = function (requestType) {
        this._json.request.type = requestType;
        if (this.requiresSession()) {
            if (!this.context.activeSession()) {
                this.context.newSession();
            }
            var applicationID = this.context.applicationID();
            var session = this.context.session();
            var newSession = session.isNew();
            var sessionID = session.id();
            var attributes = session.attributes();
            this._json.session = {
                application: {
                    applicationId: applicationID,
                },
                new: newSession,
                sessionId: sessionID,
                user: this.userObject(this.context),
            };
            if (this._json.request.type !== RequestType.LAUNCH_REQUEST) {
                this._json.session.attributes = attributes;
            }
            if (this.context.accessToken() !== null) {
                this._json.session.user.accessToken = this.context.accessToken();
            }
        }
        if (this.requiresSession()) {
            if (this.context.device().audioPlayerSupported()) {
                var activity = AudioPlayer_1.AudioPlayerActivity[this.context.audioPlayer().playerActivity()];
                this._json.context.AudioPlayer = {
                    playerActivity: activity,
                };
                if (this.context.audioPlayer().playerActivity() !== AudioPlayer_1.AudioPlayerActivity.IDLE) {
                    var playing = this.context.audioPlayer().playing();
                    this._json.context.AudioPlayer.token = playing.stream.token;
                    this._json.context.AudioPlayer.offsetInMilliseconds = playing.stream.offsetInMilliseconds;
                }
            }
        }
        return this;
    };
    SkillRequest.prototype.sessionEnded = function (reason, errorData) {
        this.requestType(RequestType.SESSION_ENDED_REQUEST);
        this._json.request.reason = SessionEndedReason[reason];
        if (errorData !== undefined && errorData !== null) {
            this._json.request.error = errorData;
        }
        return this;
    };
    SkillRequest.prototype.set = function (path, value) {
        _.set(this.json(), path, value);
        return this;
    };
    SkillRequest.prototype.slot = function (slotName, slotValue, confirmationStatus) {
        if (confirmationStatus === void 0) { confirmationStatus = DialogManager_1.ConfirmationStatus.NONE; }
        var intent = this.context.interactionModel().intentSchema.intent(this.json().request.intent.name);
        var intentSlots = intent.slots;
        if (!intentSlots) {
            throw new Error("Trying to add slot to intent that does not have any slots defined");
        }
        if (!intent.slotForName(slotName)) {
            throw new Error("Trying to add undefined slot to intent: " + slotName);
        }
        var slotValueObject = new SlotValue_1.SlotValue(slotName, slotValue, confirmationStatus);
        slotValueObject.setEntityResolution(this.context, this._json.request.intent.name);
        this._json.request.intent.slots[slotName] = slotValueObject;
        if (this.context.interactionModel().dialogIntent(this._json.request.intent.name)) {
            this.context.dialogManager().updateSlot(slotName, slotValueObject);
        }
        return this;
    };
    SkillRequest.prototype.send = function () {
        return this.alexa.call(this);
    };
    SkillRequest.prototype.slots = function (slots) {
        if (slots) {
            for (var _i = 0, _a = Object.keys(slots); _i < _a.length; _i++) {
                var slot = _a[_i];
                var slotValue = slots[slot];
                this.slot(slot, slotValue);
            }
        }
        return this;
    };
    SkillRequest.prototype.slotStatus = function (slotName, confirmationStatus) {
        this.context.dialogManager().slots()[slotName].confirmationStatus = confirmationStatus;
        return this;
    };
    SkillRequest.prototype.baseRequest = function () {
        var applicationID = this.context.applicationID();
        var requestID = SkillRequest.requestID();
        var timestamp = SkillRequest.timestamp();
        var baseRequest = {
            context: {
                System: {
                    application: {
                        applicationId: applicationID,
                    },
                    device: {
                        supportedInterfaces: this.context.device().supportedInterfaces(),
                    },
                    user: this.userObject(this.context),
                },
            },
            request: {
                locale: this.context.locale(),
                requestId: requestID,
                timestamp: timestamp,
            },
            version: "1.0",
        };
        if (this.context.device().id()) {
            baseRequest.context.System.apiAccessToken = this.context.apiAccessToken();
            baseRequest.context.System.apiEndpoint = this.context.apiEndpoint();
            baseRequest.context.System.device.deviceId = this.context.device().id();
        }
        if (this.context.accessToken() !== null) {
            baseRequest.context.System.user.accessToken = this.context.accessToken();
        }
        if (this.context.device().displaySupported()) {
            baseRequest.context.Display = {};
        }
        return baseRequest;
    };
    SkillRequest.prototype.userObject = function (context) {
        var o = {
            userId: context.user().id(),
        };
        if (context.device().id()) {
            o.permissions = {
                consentToken: uuid.v4(),
            };
        }
        return o;
    };
    return SkillRequest;
}());
exports.SkillRequest = SkillRequest;
//# sourceMappingURL=SkillRequest.js.map