"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualAlexaBuilder = exports.VirtualAlexa = void 0;
var AudioPlayer_1 = require("../audioPlayer/AudioPlayer");
var AddressAPI_1 = require("../external/AddressAPI");
var DynamoDB_1 = require("../external/DynamoDB");
var LocalSkillInteractor_1 = require("../impl/LocalSkillInteractor");
var RemoteSkillInteractor_1 = require("../impl/RemoteSkillInteractor");
var IntentSchema_1 = require("../model/IntentSchema");
var InteractionModel_1 = require("../model/InteractionModel");
var SampleUtterancesBuilder_1 = require("../model/SampleUtterancesBuilder");
var SkillContext_1 = require("./SkillContext");
var SkillRequest_1 = require("./SkillRequest");
var SkillRequest_2 = require("./SkillRequest");
var UserAPI_1 = require("../external/UserAPI");
var virtual_core_1 = require("virtual-core");
var VirtualAlexa = (function () {
    function VirtualAlexa(interactor, model, locale, applicationID) {
        this._context = null;
        var audioPlayer = new AudioPlayer_1.AudioPlayer(this);
        this._context = new SkillContext_1.SkillContext(model, audioPlayer, locale, applicationID);
        this._context.newSession();
        this._interactor = interactor;
        this._addressAPI = new AddressAPI_1.AddressAPI(this.context());
        this._userAPI = new UserAPI_1.UserAPI(this.context());
        this._dynamoDB = new DynamoDB_1.DynamoDB();
    }
    VirtualAlexa.Builder = function () {
        return new VirtualAlexaBuilder();
    };
    VirtualAlexa.prototype.addressAPI = function () {
        return this._addressAPI;
    };
    VirtualAlexa.prototype.userAPI = function () {
        return this._userAPI;
    };
    VirtualAlexa.prototype.audioPlayer = function () {
        return this.context().audioPlayer();
    };
    VirtualAlexa.prototype.call = function (skillRequest) {
        return this._interactor.callSkill(skillRequest);
    };
    VirtualAlexa.prototype.context = function () {
        return this._context;
    };
    VirtualAlexa.prototype.dialogManager = function () {
        return this.context().dialogManager();
    };
    VirtualAlexa.prototype.dynamoDB = function () {
        return this._dynamoDB;
    };
    VirtualAlexa.prototype.endSession = function (sessionEndedReason, errorData) {
        if (sessionEndedReason === void 0) { sessionEndedReason = SkillRequest_1.SessionEndedReason.USER_INITIATED; }
        var serviceRequest = new SkillRequest_2.SkillRequest(this);
        serviceRequest.sessionEnded(sessionEndedReason, errorData);
        return this.call(serviceRequest);
    };
    VirtualAlexa.prototype.filter = function (requestFilter) {
        this._interactor.filter(requestFilter);
        return this;
    };
    VirtualAlexa.prototype.intend = function (intentName, slots) {
        return this.call(new SkillRequest_2.SkillRequest(this).intent(intentName).slots(slots));
    };
    VirtualAlexa.prototype.interactor = function () {
        return this._interactor;
    };
    VirtualAlexa.prototype.request = function () {
        return new SkillRequest_2.SkillRequest(this);
    };
    VirtualAlexa.prototype.selectElement = function (token) {
        return this.call(new SkillRequest_2.SkillRequest(this).elementSelected(token));
    };
    VirtualAlexa.prototype.launch = function () {
        return this.call(new SkillRequest_2.SkillRequest(this).launch());
    };
    VirtualAlexa.prototype.resetFilter = function () {
        this._interactor.filter(undefined);
        return this;
    };
    VirtualAlexa.prototype.utter = function (utteranceString) {
        if (utteranceString === "exit") {
            return this.endSession(SkillRequest_1.SessionEndedReason.USER_INITIATED);
        }
        var resolvedUtterance = utteranceString;
        var launchRequestOrUtter = this.parseLaunchRequest(utteranceString);
        if (launchRequestOrUtter === true) {
            return this.launch();
        }
        else if (launchRequestOrUtter) {
            resolvedUtterance = launchRequestOrUtter;
        }
        var utterance = new virtual_core_1.Utterance(this.context().interactionModel(), resolvedUtterance);
        if (!utterance.matched()) {
            throw new Error("Unable to match utterance: " + resolvedUtterance
                + " to an intent. Try a different utterance, or explicitly set the intent");
        }
        var request = new SkillRequest_2.SkillRequest(this)
            .intent(utterance.intent())
            .slots(utterance.toJSON());
        return this.call(request);
    };
    VirtualAlexa.prototype.parseLaunchRequest = function (utter) {
        var launchRequestRegex = /(ask|open|launch|talk to|tell).*/i;
        if (launchRequestRegex.test(utter)) {
            var launchAndUtterRegex = /^(?:ask|open|launch|talk to|tell) .* to (.*)/i;
            var result = launchAndUtterRegex.exec(utter);
            if (result && result.length) {
                return result[1];
            }
            else {
                return true;
            }
        }
        return undefined;
    };
    return VirtualAlexa;
}());
exports.VirtualAlexa = VirtualAlexa;
var VirtualAlexaBuilder = (function () {
    function VirtualAlexaBuilder() {
    }
    VirtualAlexaBuilder.prototype.applicationID = function (id) {
        this._applicationID = id;
        return this;
    };
    VirtualAlexaBuilder.prototype.handler = function (handlerName) {
        this._handler = handlerName;
        return this;
    };
    VirtualAlexaBuilder.prototype.intentSchema = function (json) {
        this._intentSchema = json;
        return this;
    };
    VirtualAlexaBuilder.prototype.intentSchemaFile = function (filePath) {
        this._intentSchemaFile = filePath;
        return this;
    };
    VirtualAlexaBuilder.prototype.interactionModel = function (json) {
        this._interactionModel = json;
        return this;
    };
    VirtualAlexaBuilder.prototype.interactionModelFile = function (filePath) {
        this._interactionModelFile = filePath;
        return this;
    };
    VirtualAlexaBuilder.prototype.sampleUtterances = function (utterances) {
        this._sampleUtterances = utterances;
        return this;
    };
    VirtualAlexaBuilder.prototype.sampleUtterancesFile = function (filePath) {
        this._sampleUtterancesFile = filePath;
        return this;
    };
    VirtualAlexaBuilder.prototype.skillURL = function (url) {
        this._skillURL = url;
        return this;
    };
    VirtualAlexaBuilder.prototype.locale = function (locale) {
        this._locale = locale;
        return this;
    };
    VirtualAlexaBuilder.prototype.create = function () {
        var model;
        var locale = this._locale ? this._locale : "en-US";
        if (this._interactionModel) {
            model = InteractionModel_1.InteractionModel.fromJSON(this._interactionModel);
        }
        else if (this._interactionModelFile) {
            model = InteractionModel_1.InteractionModel.fromFile(this._interactionModelFile);
        }
        else if (this._intentSchema && this._sampleUtterances) {
            var schema = IntentSchema_1.IntentSchema.fromJSON(this._intentSchema);
            var utterances = SampleUtterancesBuilder_1.SampleUtterancesBuilder.fromJSON(this._sampleUtterances);
            model = new InteractionModel_1.InteractionModel(schema, utterances);
        }
        else if (this._intentSchemaFile && this._sampleUtterancesFile) {
            var schema = IntentSchema_1.IntentSchema.fromFile(this._intentSchemaFile);
            var utterances = SampleUtterancesBuilder_1.SampleUtterancesBuilder.fromFile(this._sampleUtterancesFile);
            model = new InteractionModel_1.InteractionModel(schema, utterances);
        }
        else {
            model = InteractionModel_1.InteractionModel.fromLocale(locale);
            if (!model) {
                throw new Error("Either an interaction model or intent schema and sample utterances must be provided.\n" +
                    "Alternatively, if you specify a locale, Virtual Alexa will automatically check for the " +
                    "interaction model under the directory \"./models\" - e.g., \"./models/en-US.json\"");
            }
        }
        var interactor;
        if (this._handler) {
            interactor = new LocalSkillInteractor_1.LocalSkillInteractor(this._handler);
        }
        else if (this._skillURL) {
            interactor = new RemoteSkillInteractor_1.RemoteSkillInteractor(this._skillURL);
        }
        else {
            throw new Error("Either a handler or skillURL must be provided.");
        }
        var alexa = new VirtualAlexa(interactor, model, locale, this._applicationID);
        interactor._alexa = alexa;
        return alexa;
    };
    return VirtualAlexaBuilder;
}());
exports.VirtualAlexaBuilder = VirtualAlexaBuilder;
//# sourceMappingURL=VirtualAlexa.js.map