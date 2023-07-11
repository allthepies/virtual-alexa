"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var VirtualAlexa_1 = require("../src/core/VirtualAlexa");
describe("VirtualAlexa Tests Using Files", function () {
    var _this = this;
    it("Parses the files and does a simple utterance", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa, requestToCheck, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/index.handler")
                        .sampleUtterancesFile("./test/resources/SampleUtterances.txt")
                        .intentSchemaFile("./test/resources/IntentSchema.json")
                        .create();
                    chai_1.assert(virtualAlexa.filter(function (request) {
                        requestToCheck = request;
                    }));
                    return [4, virtualAlexa.utter("play now")];
                case 1:
                    response = _a.sent();
                    chai_1.assert.isDefined(response);
                    chai_1.assert.isTrue(response.success);
                    chai_1.assert.equal(virtualAlexa.context().locale(), "en-US");
                    chai_1.assert.equal(requestToCheck.request.locale, "en-US");
                    return [2];
            }
        });
    }); });
    it("Parses lambda file with parent directory path", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa, requestToCheck, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/../test/resources/index.handler")
                        .sampleUtterancesFile("./test/resources/SampleUtterances.txt")
                        .intentSchemaFile("./test/resources/IntentSchema.json")
                        .create();
                    chai_1.assert(virtualAlexa.filter(function (request) {
                        requestToCheck = request;
                    }));
                    return [4, virtualAlexa.utter("play now")];
                case 1:
                    response = _a.sent();
                    chai_1.assert.isDefined(response);
                    chai_1.assert.isTrue(response.success);
                    chai_1.assert.equal(virtualAlexa.context().locale(), "en-US");
                    chai_1.assert.equal(requestToCheck.request.locale, "en-US");
                    return [2];
            }
        });
    }); });
    it("Parses the files and does a simple utterance in german", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa, requestToCheck, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/index.js")
                        .sampleUtterancesFile("./test/resources/SampleUtterances.txt")
                        .intentSchemaFile("./test/resources/IntentSchema.json")
                        .locale("de-DE")
                        .create();
                    chai_1.assert(virtualAlexa.filter(function (request) {
                        requestToCheck = request;
                    }));
                    return [4, virtualAlexa.utter("play now")];
                case 1:
                    response = _a.sent();
                    chai_1.assert.isDefined(response);
                    chai_1.assert.isTrue(response.success);
                    chai_1.assert.equal(virtualAlexa.context().locale(), "de-DE");
                    chai_1.assert.equal(requestToCheck.request.locale, "de-DE");
                    return [2];
            }
        });
    }); });
    it("Parses the SMAPI format interaction model and does a simple utterance", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/index.handler")
                        .interactionModelFile("./test/resources/InteractionModelSMAPI.json")
                        .create();
                    return [4, virtualAlexa.filter(function (request) {
                            chai_1.assert.equal(request.request.intent.name, "TellMeMoreIntent");
                        }).utter("contact info")];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    it("Parses the Interaction Model format V2 and does a simple utterance", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/index.handler")
                        .interactionModelFile("./test/resources/LanguageModel.json")
                        .create();
                    return [4, virtualAlexa.filter(function (request) {
                            chai_1.assert.equal(request.request.intent.name, "TellMeMoreIntent");
                        }).utter("contact info")];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    it("Parses the Interaction Model from a locale and does a simple utterance", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    process.chdir("test/resources");
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("index.handler")
                        .locale("de-DE")
                        .create();
                    return [4, virtualAlexa.utter("contact info")];
                case 1:
                    response = _a.sent();
                    chai_1.assert.equal(response.intent, "TellMeMoreIntent");
                    process.chdir("../..");
                    return [2];
            }
        });
    }); });
    it("Parses the Interaction Model from the default locale and does a simple utterance", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    process.chdir("test/resources");
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("index.handler")
                        .create();
                    return [4, virtualAlexa.utter("contact info")];
                case 1:
                    response = _a.sent();
                    chai_1.assert.equal(response.intent, "TellMeMoreIntent");
                    process.chdir("../..");
                    return [2];
            }
        });
    }); });
    it("Throws error when locale file is not present", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa;
        return __generator(this, function (_a) {
            try {
                virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                    .handler("index.handler")
                    .create();
                chai_1.assert(false, "This should not be reached");
            }
            catch (e) {
                chai_1.assert.isDefined(e);
            }
            return [2];
        });
    }); });
    it("Has a bad filename", function () {
        try {
            VirtualAlexa_1.VirtualAlexa.Builder()
                .handler("test/resources/index.handler")
                .sampleUtterancesFile("./test/resources/SampleUtterancesWrong.txt")
                .intentSchemaFile("./test/resources/IntentSchema.json")
                .create();
            chai_1.assert(false, "This should not be reached");
        }
        catch (e) {
            chai_1.assert.isDefined(e);
        }
    });
});
describe("VirtualAlexa Tests Using URL", function () {
    var _this = this;
    this.timeout(5000);
    it("Calls a remote mock service via HTTPS", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .intentSchemaFile("./test/resources/IntentSchema.json")
                        .sampleUtterancesFile("./test/resources/SampleUtterances.txt")
                        .skillURL("https://httpbin.org/post")
                        .create();
                    return [4, virtualAlexa.utter("play now")];
                case 1:
                    response = _a.sent();
                    chai_1.assert.isDefined(response.data);
                    chai_1.assert.equal(response.url, "https://httpbin.org/post");
                    return [2];
            }
        });
    }); });
    it("Calls a remote mock service via HTTP", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .intentSchemaFile("./test/resources/IntentSchema.json")
                        .sampleUtterancesFile("./test/resources/SampleUtterances.txt")
                        .skillURL("http://httpbin.org/post")
                        .create();
                    return [4, virtualAlexa.utter("play now")];
                case 1:
                    response = _a.sent();
                    chai_1.assert.isDefined(response.data);
                    chai_1.assert.equal(response.url, "http://httpbin.org/post");
                    return [2];
            }
        });
    }); });
});
describe("VirtualAlexa Tests Using Unified Interaction Model", function () {
    var _this = this;
    var interactionModel = {
        intents: [
            {
                name: "Play",
                samples: ["play", "play next", "play now"],
            },
            {
                name: "SlottedIntent",
                samples: ["slot {SlotName}"],
                slots: [
                    { name: "SlotName", type: "SLOT_TYPE" },
                ],
            },
            {
                name: "SlottedIntentEmptySynonymArray",
                samples: ["slotEmptySynonymArray {SlotEmptySynonymArray}"],
                slots: [
                    { name: "SlotEmptySynonymArray", type: "SLOT_EMPTY_SYNONYM_ARRAY_TYPE" },
                ],
            },
            {
                name: "MultipleSlots",
                samples: ["multiple {SlotA} and {SlotB}", "reversed {SlotB} then {SlotA}"],
                slots: [
                    { name: "SlotA", type: "SLOT_TYPE" },
                    { name: "SlotB", type: "SLOT_TYPE" },
                ],
            },
            {
                name: "CustomSlot",
                samples: ["custom {customSlot}"],
                slots: [
                    { name: "customSlot", type: "COUNTRY_CODE" },
                ],
            },
            {
                name: "CityIntent",
                samples: ["city {citySlot}"],
                slots: [
                    { name: "citySlot", type: "AMAZON.Cities" },
                ],
            },
            {
                name: "StateIntent",
                samples: ["state {stateSlot}"],
                slots: [
                    { name: "stateSlot", type: "AMAZON.States" },
                ],
            },
        ],
        types: [
            {
                name: "SLOT_EMPTY_SYNONYM_ARRAY_TYPE",
                values: [
                    {
                        id: "null",
                        name: {
                            synonyms: [],
                            value: "VALUE1",
                        },
                    },
                ],
            },
            {
                name: "COUNTRY_CODE",
                values: [
                    {
                        id: "US",
                        name: {
                            synonyms: ["USA", "America", "US", "English Speakers"],
                            value: "US",
                        },
                    },
                    {
                        id: "DE",
                        name: {
                            synonyms: ["Germany", "DE"],
                            value: "DE",
                        },
                    },
                    {
                        id: "UK",
                        name: {
                            synonyms: ["United Kingdom", "England", "English Speakers"],
                            value: "UK",
                        },
                    },
                ],
            },
            {
                name: "AMAZON.Cities",
                values: [
                    {
                        id: "Lima",
                        name: {
                            synonyms: ["Lima"],
                            value: "Lima, Peru",
                        },
                    },
                ],
            },
        ],
    };
    it("Parses the JSON and does a simple utterance", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/index.handler")
                        .interactionModel(interactionModel)
                        .create();
                    return [4, virtualAlexa.utter("play now")];
                case 1:
                    response = _a.sent();
                    chai_1.assert.isDefined(response);
                    chai_1.assert.isTrue(response.success);
                    return [2];
            }
        });
    }); });
    it("Parses the file and does a simple utterance", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/index.handler")
                        .interactionModelFile("./test/resources/InteractionModel.json")
                        .create();
                    return [4, virtualAlexa.intend("AMAZON.CancelIntent")];
                case 1:
                    response = _a.sent();
                    chai_1.assert.isDefined(response);
                    chai_1.assert.isTrue(response.success);
                    return [2];
            }
        });
    }); });
    it("Utters builtin intent with custom phrase", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/index.handler")
                        .interactionModel(interactionModel)
                        .create();
                    return [4, virtualAlexa.filter(function (request) {
                            chai_1.assert.equal(request.request.intent.name, "CustomSlot");
                        }).utter("custom DE")];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    it("Utters exit", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/index.handler")
                        .interactionModel(interactionModel)
                        .create();
                    return [4, virtualAlexa.filter(function (request) {
                            chai_1.assert.equal(request.request.type, "SessionEndedRequest");
                        }).utter("exit")];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    it("Utters slotted phrase with empty synonym array", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/index.handler")
                        .interactionModel(interactionModel)
                        .create();
                    return [4, virtualAlexa.filter(function (request) {
                            chai_1.assert.equal(request.request.intent.name, "SlottedIntentEmptySynonymArray");
                            chai_1.assert.equal(request.request.intent.slots.SlotEmptySynonymArray.value, "value1");
                        }).utter("slotEmptySynonymArray value1")];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    it("Utters slotted phrase with different synonym array", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/index.handler")
                        .interactionModel(interactionModel)
                        .create();
                    return [4, virtualAlexa.filter(function (request) {
                            chai_1.assert.equal(request.request.intent.name, "CustomSlot");
                            chai_1.assert.equal(request.request.intent.slots.customSlot.value, "UK");
                            var resolution = request.request.intent.slots.customSlot.resolutions.resolutionsPerAuthority[0];
                            chai_1.assert.equal(request.request.intent.slots.customSlot.resolutions.resolutionsPerAuthority.length, 1);
                            chai_1.assert.equal(resolution.status.code, "ER_SUCCESS_MATCH");
                            chai_1.assert.equal(resolution.values.length, 1);
                            chai_1.assert.equal(resolution.values[0].value.id, "UK");
                            chai_1.assert.equal(resolution.values[0].value.name, "UK");
                        }).utter("custom UK")];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    it("Utters slotted phrase with synonym value", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/index.handler")
                        .interactionModel(interactionModel)
                        .create();
                    return [4, virtualAlexa.filter(function (request) {
                            chai_1.assert.equal(request.request.intent.name, "CustomSlot");
                            chai_1.assert.equal(request.request.intent.slots.customSlot.value, "england");
                            var resolution = request.request.intent.slots.customSlot.resolutions.resolutionsPerAuthority[0];
                            chai_1.assert.equal(request.request.intent.slots.customSlot.resolutions.resolutionsPerAuthority.length, 1);
                            chai_1.assert.equal(resolution.status.code, "ER_SUCCESS_MATCH");
                            chai_1.assert.equal(resolution.values.length, 1);
                            chai_1.assert.equal(resolution.values[0].value.id, "UK");
                            chai_1.assert.equal(resolution.values[0].value.name, "UK");
                        }).utter("custom england")];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    it("Utters slotted phrase with multiple synonym matches", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/index.handler")
                        .interactionModel(interactionModel)
                        .create();
                    return [4, virtualAlexa.filter(function (request) {
                            chai_1.assert.equal(request.request.intent.name, "CustomSlot");
                            chai_1.assert.equal(request.request.intent.slots.customSlot.value, "English Speakers");
                            var resolution = request.request.intent.slots.customSlot.resolutions.resolutionsPerAuthority[0];
                            chai_1.assert.equal(request.request.intent.slots.customSlot.resolutions.resolutionsPerAuthority.length, 1);
                            chai_1.assert.equal(resolution.status.code, "ER_SUCCESS_MATCH");
                            chai_1.assert.equal(resolution.values.length, 2);
                            chai_1.assert.equal(resolution.values[0].value.id, "US");
                            chai_1.assert.equal(resolution.values[0].value.name, "US");
                            chai_1.assert.equal(resolution.values[1].value.id, "UK");
                            chai_1.assert.equal(resolution.values[1].value.name, "UK");
                        }).utter("custom English Speakers")];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    it("Utters slotted phrase which matches extended builtin value", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/index.handler")
                        .interactionModel(interactionModel)
                        .create();
                    return [4, virtualAlexa.filter(function (request) {
                            chai_1.assert.equal(request.request.intent.name, "CityIntent");
                            chai_1.assert.equal(request.request.intent.slots.citySlot.value, "Lima");
                            var resolution = request.request.intent.slots.citySlot.resolutions.resolutionsPerAuthority[0];
                            chai_1.assert.equal(request.request.intent.slots.citySlot.resolutions.resolutionsPerAuthority.length, 1);
                            chai_1.assert.equal(resolution.status.code, "ER_SUCCESS_MATCH");
                            chai_1.assert.equal(resolution.values.length, 1);
                            chai_1.assert.equal(resolution.values[0].value.id, "Lima");
                            chai_1.assert.equal(resolution.values[0].value.name, "Lima, Peru");
                        }).utter("city Lima")];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    it("Utters slotted phrase which matches builtin value", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/index.handler")
                        .interactionModel(interactionModel)
                        .create();
                    return [4, virtualAlexa.filter(function (request) {
                            chai_1.assert.equal(request.request.intent.name, "CityIntent");
                            chai_1.assert.equal(request.request.intent.slots.citySlot.value, "Chicago");
                            var resolution = request.request.intent.slots.citySlot.resolutions.resolutionsPerAuthority[0];
                            chai_1.assert.equal(request.request.intent.slots.citySlot.resolutions.resolutionsPerAuthority.length, 1);
                            chai_1.assert.equal(resolution.status.code, "ER_SUCCESS_NO_MATCH");
                            chai_1.assert.equal(resolution.values.length, 0);
                        }).utter("city Chicago")];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    it("Utters slotted phrase which matches builtin value, no extensions", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/index.handler")
                        .interactionModel(interactionModel)
                        .create();
                    return [4, virtualAlexa.filter(function (request) {
                            chai_1.assert.equal(request.request.intent.name, "StateIntent");
                            chai_1.assert.equal(request.request.intent.slots.stateSlot.value, "Connecticut");
                            chai_1.assert.isUndefined(request.request.intent.slots.stateSlot.resolutions);
                        }).utter("state Connecticut")];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
});
describe("VirtualAlexa Tests Using JSON", function () {
    var _this = this;
    var intentSchema = {
        intents: [
            {
                intent: "AFirstIntent",
            },
            {
                intent: "AMAZON.CancelIntent",
            },
            {
                intent: "AMAZON.StopIntent",
            },
            {
                intent: "Play",
            },
            {
                intent: "SlottedIntent",
                slots: [
                    { name: "SlotName", type: "SLOT_TYPE" },
                ],
            },
            {
                intent: "MultipleSlots",
                slots: [
                    { name: "SlotA", type: "SLOT_TYPE" },
                    { name: "SlotB", type: "SLOT_TYPE" },
                ],
            },
        ],
    };
    var sampleUtterances = {
        "AFirstIntent": ["default"],
        "AMAZON.CancelIntent": ["cancel it now"],
        "MultipleSlots": ["multiple {SlotA} and {SlotB}", "reversed {SlotB} then {SlotA}"],
        "Play": ["play", "play next", "play now", "PLAY case"],
        "SlottedIntent": ["slot {SlotName}"],
    };
    describe("#utter", function () {
        var virtualAlexa;
        beforeEach(function () {
            virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                .handler("test/resources/index.handler")
                .sampleUtterances(sampleUtterances)
                .intentSchema(intentSchema)
                .create();
        });
        afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, virtualAlexa.resetFilter().endSession()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
        it("Utters simple phrase", function () { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, virtualAlexa.filter(function (request) {
                            chai_1.assert.isUndefined(request.context.System.device.deviceId);
                            chai_1.assert.isUndefined(request.context.System.apiEndpoint, "https://external.amazonalexa.com");
                            chai_1.assert.isDefined(request.context.System.device.supportedInterfaces.AudioPlayer);
                            chai_1.assert.isDefined(request.context.System.user.userId);
                            chai_1.assert.isUndefined(request.context.System.user.permissions);
                            chai_1.assert.equal(request.request.intent.name, "Play");
                        }).utter("play now")];
                    case 1:
                        response = _a.sent();
                        chai_1.assert.equal(response.prompt(), "SSML");
                        chai_1.assert.equal(response.reprompt(), "TEXT");
                        chai_1.assert.equal(response.card().content, "content");
                        chai_1.assert.equal(response.cardImage().smallImageUrl, "smallImageUrl");
                        chai_1.assert.equal(response.cardContent(), "content");
                        chai_1.assert.equal(response.cardTitle(), "title");
                        chai_1.assert.equal(response.cardLargeImage(), "largeImageUrl");
                        chai_1.assert.equal(response.cardSmallImage(), "smallImageUrl");
                        chai_1.assert.equal(response.attr("counter"), "0");
                        chai_1.assert.equal(response.attrs("counter", "key1").counter, "0");
                        chai_1.assert.isUndefined(response.attrs("counter", "key1").key1);
                        return [2];
                }
            });
        }); });
        it("Utters simple phrase with different case", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, virtualAlexa.filter(function (request) {
                            chai_1.assert.equal(request.request.intent.name, "Play");
                        }).utter("play NOW")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
        it("Utters simple phrase with different case where sample is upper case", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, virtualAlexa.filter(function (request) {
                            chai_1.assert.equal(request.request.intent.name, "Play");
                        }).utter("play case")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
        it("Utters slotted phrase", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, virtualAlexa.filter(function (request) {
                            chai_1.assert.equal(request.request.intent.slots.SlotName.value, "my slot");
                        }).utter("Slot my slot")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
        it("Utters slotted phrase with no space", function () { return __awaiter(_this, void 0, void 0, function () {
            var exceptionCatched, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exceptionCatched = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, virtualAlexa.utter("Slotmy slot")];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        e_1 = _a.sent();
                        exceptionCatched = true;
                        chai_1.assert.equal(e_1.message, "Unable to match utterance: Slotmy slot to an intent. " +
                            "Try a different utterance, or explicitly set the intent");
                        return [3, 4];
                    case 4:
                        chai_1.assert.equal(exceptionCatched, true);
                        return [2];
                }
            });
        }); });
        it("Utters slotted phrase with no space, promise catch", function (done) {
            try {
                virtualAlexa.utter("Slotmy slot");
            }
            catch (e) {
                chai_1.assert.equal(e.message, "Unable to match utterance: Slotmy slot to an intent. " +
                    "Try a different utterance, or explicitly set the intent");
                done();
            }
        });
        it("Utters builtin intent", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, virtualAlexa.filter(function (request) {
                            chai_1.assert.equal(request.request.intent.name, "AMAZON.CancelIntent");
                        }).utter("cancel")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
        it("Utters builtin intent with custom phrase", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, virtualAlexa.filter(function (request) {
                            chai_1.assert.equal(request.request.intent.name, "AMAZON.CancelIntent");
                        }).utter("cancel it now")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
        it("Utters builtin intent not in schema", function () { return __awaiter(_this, void 0, void 0, function () {
            var exceptionCatched, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exceptionCatched = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, virtualAlexa.utter("page up")];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        e_2 = _a.sent();
                        exceptionCatched = true;
                        chai_1.assert.equal(e_2.message, "Unable to match utterance: page up to an intent. " +
                            "Try a different utterance, or explicitly set the intent");
                        return [3, 4];
                    case 4:
                        chai_1.assert.equal(exceptionCatched, true);
                        return [2];
                }
            });
        }); });
        it("Utters phrases and maintains session", function () { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, virtualAlexa.utter("play now")];
                    case 1:
                        response = _a.sent();
                        chai_1.assert.equal(response.sessionAttributes.counter, 0);
                        return [4, virtualAlexa.utter("play now")];
                    case 2:
                        response = (_a.sent());
                        chai_1.assert.equal(response.sessionAttributes.counter, 1);
                        return [2];
                }
            });
        }); });
        it("Utters phrases with launch words", function () { return __awaiter(_this, void 0, void 0, function () {
            var virtualAlexa, reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                            .handler("test/resources/index.handler")
                            .sampleUtterances(sampleUtterances)
                            .intentSchema(intentSchema)
                            .create();
                        return [4, virtualAlexa.filter(function (request) {
                                chai_1.assert.equal(request.request.type, "IntentRequest");
                                chai_1.assert.equal(request.request.intent.name, "Play");
                            }).utter("tell skill to play next")];
                    case 1:
                        reply = _a.sent();
                        return [2];
                }
            });
        }); });
    });
    describe("#utterWithDeviceInfo", function () {
        it("Utters simple phrase with device info", function () { return __awaiter(_this, void 0, void 0, function () {
            var virtualAlexa;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                            .handler("test/resources/index.handler")
                            .sampleUtterances(sampleUtterances)
                            .intentSchema(intentSchema)
                            .create();
                        virtualAlexa.context().device().setID("testID");
                        virtualAlexa.context().device().audioPlayerSupported(true);
                        virtualAlexa.context().device().displaySupported(true);
                        virtualAlexa.context().device().videoAppSupported(true);
                        return [4, virtualAlexa.filter(function (request) {
                                chai_1.assert.isDefined(request.context.System.device.deviceId);
                                chai_1.assert.equal(request.context.System.apiEndpoint, "https://api.amazonalexa.com");
                                chai_1.assert.isDefined(request.context.System.device.supportedInterfaces.AudioPlayer);
                                chai_1.assert.isDefined(request.context.System.device.supportedInterfaces.Display);
                                chai_1.assert.isDefined(request.context.System.device.supportedInterfaces.VideoApp);
                                chai_1.assert.isDefined(request.context.System.user.userId);
                                chai_1.assert.isDefined(request.context.System.user.permissions);
                                chai_1.assert.isDefined(request.context.System.user.permissions.consentToken);
                                chai_1.assert.equal(request.request.intent.name, "Play");
                            }).utter("play now")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
        it("Removes audio player capability", function () { return __awaiter(_this, void 0, void 0, function () {
            var virtualAlexa;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                            .handler("test/resources/index.handler")
                            .sampleUtterances(sampleUtterances)
                            .intentSchema(intentSchema)
                            .create();
                        virtualAlexa.context().device().setID("testID");
                        virtualAlexa.context().device().audioPlayerSupported(false);
                        return [4, virtualAlexa.filter(function (request) {
                                chai_1.assert.isUndefined(request.context.System.device.supportedInterfaces.AudioPlayer);
                            }).utter("play now")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
    });
    describe("#intend", function () {
        var virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
            .handler("test/resources/index.handler")
            .sampleUtterances(sampleUtterances)
            .intentSchema(intentSchema)
            .create();
        afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, virtualAlexa.endSession()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
        it("Intends simply", function () { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, virtualAlexa.intend("Play")];
                    case 1:
                        response = _a.sent();
                        chai_1.assert.isDefined(response);
                        chai_1.assert.isTrue(response.success);
                        return [2];
                }
            });
        }); });
        it("Intends with filter", function () { return __awaiter(_this, void 0, void 0, function () {
            var reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, virtualAlexa.filter(function (request) {
                            request.session.sessionId = "Filtered";
                        }).intend("Play")];
                    case 1:
                        reply = _a.sent();
                        virtualAlexa.resetFilter();
                        chai_1.assert.equal(reply.sessionAttributes.sessionId, "Filtered");
                        return [2];
                }
            });
        }); });
        it("Intends with slot", function () { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, virtualAlexa.intend("SlottedIntent", { SlotName: "Value" })];
                    case 1:
                        response = _a.sent();
                        chai_1.assert.isDefined(response);
                        chai_1.assert.isTrue(response.success);
                        chai_1.assert.equal(response.slot.name, "SlotName");
                        chai_1.assert.equal(response.slot.value, "Value");
                        return [2];
                }
            });
        }); });
        it("Intends with slot value but no slots on intent", function () { return __awaiter(_this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, virtualAlexa.intend("Play", { SlotName: "Value" })];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        e_3 = _a.sent();
                        console.error(e_3);
                        chai_1.assert.equal(e_3.message, "Trying to add slot to intent that does not have any slots defined");
                        return [3, 3];
                    case 3: return [2];
                }
            });
        }); });
        it("Intends with slot value but no slots on intent, promise catch", function (done) {
            try {
                virtualAlexa.intend("Play", { SlotName: "Value" });
            }
            catch (e) {
                chai_1.assert.equal(e.message, "Trying to add slot to intent that does not have any slots defined");
                done();
            }
            ;
        });
        it("Intends with slot value but slot does not exist", function () { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, virtualAlexa.intend("SlottedIntent", { SlotWrongName: "Value" })];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        error_1 = _a.sent();
                        chai_1.assert.equal(error_1.message, "Trying to add undefined slot to intent: SlotWrongName");
                        return [3, 3];
                    case 3: return [2];
                }
            });
        }); });
    });
    describe("#endSession", function () {
        it("Starts and Ends Session", function (done) {
            var virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                .handler("test/resources/index.handler")
                .sampleUtterances(sampleUtterances)
                .intentSchema(intentSchema)
                .create();
            virtualAlexa.launch().then(function () {
                virtualAlexa.endSession();
                done();
            });
        });
        it("Starts and Is Asked To Stop", function (done) {
            var virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                .handler("test/resources/index.handler")
                .sampleUtterances(sampleUtterances)
                .intentSchema(intentSchema)
                .create();
            virtualAlexa.launch().then(function () {
                virtualAlexa.utter("stop").then(function () {
                    chai_1.assert.isUndefined(virtualAlexa.context().session());
                    done();
                });
            });
        });
    });
    describe("#launch", function () {
        it("Launches with filter", function () { return __awaiter(_this, void 0, void 0, function () {
            var virtualAlexa, reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                            .handler("test/resources/index.handler")
                            .sampleUtterances(sampleUtterances)
                            .intentSchema(intentSchema)
                            .create();
                        return [4, virtualAlexa.filter(function (request) {
                                request.session.sessionId = "Filtered";
                            }).launch()];
                    case 1:
                        reply = _a.sent();
                        chai_1.assert.equal(reply.sessionAttributes.sessionId, "Filtered");
                        return [2];
                }
            });
        }); });
        it("Launches with list of special utters ", function () { return __awaiter(_this, void 0, void 0, function () {
            var virtualAlexa;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                            .handler("test/resources/index.handler")
                            .sampleUtterances(sampleUtterances)
                            .intentSchema(intentSchema)
                            .create();
                        return [4, virtualAlexa.filter(function (request) {
                                chai_1.assert.equal(request.request.type, "LaunchRequest");
                            }).utter("open skill")];
                    case 1:
                        _a.sent();
                        return [4, virtualAlexa.filter(function (request) {
                                chai_1.assert.equal(request.request.type, "LaunchRequest");
                            }).utter("ask skill")];
                    case 2:
                        _a.sent();
                        return [4, virtualAlexa.filter(function (request) {
                                chai_1.assert.equal(request.request.type, "LaunchRequest");
                            }).utter("launch skill")];
                    case 3:
                        _a.sent();
                        return [4, virtualAlexa.filter(function (request) {
                                chai_1.assert.equal(request.request.type, "LaunchRequest");
                            }).utter("talk to skill")];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        }); });
    });
});
describe("VirtualAlexa Tests Using Custom Function", function () {
    var _this = this;
    it("Calls the custom function correctly", function () { return __awaiter(_this, void 0, void 0, function () {
        var myFunction, virtualAlexa, reply;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    myFunction = function (event, context) {
                        context.done(null, { custom: true });
                    };
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler(myFunction)
                        .sampleUtterancesFile("./test/resources/SampleUtterances.txt")
                        .intentSchemaFile("./test/resources/IntentSchema.json")
                        .create();
                    return [4, virtualAlexa.filter(function (request) {
                            request.session.sessionId = "Filtered";
                        }).launch()];
                case 1:
                    reply = _a.sent();
                    chai_1.assert.isTrue(reply.custom);
                    return [2];
            }
        });
    }); });
});
describe("VirtualAlexa Tests Using Node8-style lambda", function () {
    var _this = this;
    it("Handles a promise being returned", function () { return __awaiter(_this, void 0, void 0, function () {
        var myFunction, virtualAlexa, reply;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    myFunction = function (event, context) {
                        return new Promise(function (resolve) {
                            resolve({ custom: true });
                        });
                    };
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler(myFunction)
                        .sampleUtterancesFile("./test/resources/SampleUtterances.txt")
                        .intentSchemaFile("./test/resources/IntentSchema.json")
                        .create();
                    return [4, virtualAlexa.filter(function (request) {
                            request.session.sessionId = "Filtered";
                        }).launch()];
                case 1:
                    reply = _a.sent();
                    chai_1.assert.isTrue(reply.custom);
                    return [2];
            }
        });
    }); });
    it("Handles a promise being returned with error", function () { return __awaiter(_this, void 0, void 0, function () {
        var myFunction, virtualAlexa, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    myFunction = function (event, context) {
                        return new Promise(function (resolve, reject) {
                            reject("Error");
                        });
                    };
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler(myFunction)
                        .sampleUtterancesFile("./test/resources/SampleUtterances.txt")
                        .intentSchemaFile("./test/resources/IntentSchema.json")
                        .create();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, virtualAlexa.filter(function (request) {
                            request.session.sessionId = "Filtered";
                        }).launch()];
                case 2:
                    _a.sent();
                    chai_1.assert.fail("This should not be reached");
                    return [3, 4];
                case 3:
                    e_4 = _a.sent();
                    chai_1.assert.equal(e_4, "Error");
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); });
});
describe("Echo Show Tests", function () {
    it("Gets echo display stuff from response", function () { return __awaiter(void 0, void 0, void 0, function () {
        var virtualAlexa, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/index.handler")
                        .sampleUtterancesFile("./test/resources/SampleUtterances.txt")
                        .intentSchemaFile("./test/resources/IntentSchema.json")
                        .create();
                    virtualAlexa.context().device().setID("testID");
                    virtualAlexa.context().device().audioPlayerSupported(false);
                    virtualAlexa.context().device().displaySupported(true);
                    return [4, virtualAlexa.utter("play now")];
                case 1:
                    response = _a.sent();
                    chai_1.assert.isDefined(response.display());
                    chai_1.assert.equal(response.primaryText(), "PrimaryText");
                    chai_1.assert.equal(response.primaryText("ListToken1"), "ListItem1PrimaryText");
                    chai_1.assert.isUndefined(response.secondaryText("ListToken1"));
                    chai_1.assert.equal(response.secondaryText("ListToken2"), "ListItem2SecondaryText");
                    chai_1.assert.equal(response.tertiaryText("ListToken2"), "ListItem2TertiaryText");
                    return [2];
            }
        });
    }); });
    it("Selects an element", function () { return __awaiter(void 0, void 0, void 0, function () {
        var virtualAlexa;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/index.handler")
                        .sampleUtterancesFile("./test/resources/SampleUtterances.txt")
                        .intentSchemaFile("./test/resources/IntentSchema.json")
                        .create();
                    virtualAlexa.context().device().setID("testID");
                    virtualAlexa.context().device().audioPlayerSupported(false);
                    virtualAlexa.context().device().displaySupported(true);
                    return [4, virtualAlexa.filter(function (request) {
                            chai_1.assert.isDefined(request.context.Display);
                            chai_1.assert.equal(request.request.type, "Display.ElementSelected");
                            chai_1.assert.equal(request.request.token, "ListToken1");
                        }).selectElement("ListToken1")];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
});
describe("Request Builder tests", function () {
    it("Sets JSON values", function () {
        var virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
            .handler("test/resources/index.handler")
            .sampleUtterancesFile("./test/resources/SampleUtterances.txt")
            .intentSchemaFile("./test/resources/IntentSchema.json")
            .create();
        var request = virtualAlexa.request().intent("Play")
            .set("request.path1", "value")
            .set("request.array[0].prop", "value");
        chai_1.assert.equal(request.json().request.path1, "value");
        chai_1.assert.equal(request.json().request.array[0].prop, "value");
    });
});
describe("Catalog tests", function () {
    it("Sets JSON values", function () { return __awaiter(void 0, void 0, void 0, function () {
        var virtualAlexa, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/index.handler")
                        .interactionModelFile("test/resources/catalogModel/models/en-US.json")
                        .create();
                    return [4, virtualAlexa.intend("IngredientIntent", { Ingredient: "cucumber" })];
                case 1:
                    response = _a.sent();
                    ;
                    chai_1.assert.isDefined(response);
                    chai_1.assert.isTrue(response.success);
                    chai_1.assert.equal(response.slot.name, "Ingredient");
                    chai_1.assert.equal(response.slot.value, "cucumber");
                    return [2];
            }
        });
    }); });
});
describe("Connection Response tests", function () {
    it("Sets JSON values", function () { return __awaiter(void 0, void 0, void 0, function () {
        var virtualAlexa, request;
        return __generator(this, function (_a) {
            virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                .handler("test/resources/index.handler")
                .interactionModelFile("test/resources/catalogModel/models/en-US.json")
                .create();
            request = virtualAlexa.request().inSkillPurchaseResponse("Buy", "DECLINED", "ProductId", "MyToken");
            chai_1.assert.equal(request.json().request.type, "Connections.Response");
            chai_1.assert.equal(request.json().request.payload.productId, "ProductId");
            chai_1.assert.equal(request.json().request.payload.purchaseResult, "DECLINED");
            chai_1.assert.equal(request.json().request.status.code, 200);
            chai_1.assert.equal(request.json().request.status.message, "OK");
            return [2];
        });
    }); });
});
//# sourceMappingURL=VirtualAlexaTest.js.map