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
var interactionModel = {
    intents: [
        {
            name: "Ignore",
            samples: ["ignore"],
        },
        {
            name: "Play",
            samples: ["play", "play next", "play now"],
        },
        {
            name: "PlayUndefined",
            samples: ["play undefined"],
        },
        {
            name: "AMAZON.NextIntent",
        },
        {
            name: "AMAZON.PauseIntent",
        },
        {
            name: "AMAZON.PreviousIntent",
        },
        {
            name: "AMAZON.ResumeIntent",
        },
    ],
    types: [],
};
describe("AudioPlayer launches and plays a track", function () {
    var _this = this;
    it("Plays a track", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa, requests_1, reply, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/SimpleAudioPlayer.handler")
                        .interactionModel(interactionModel)
                        .create();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    requests_1 = [];
                    virtualAlexa.filter(function (json) {
                        requests_1.push(json.request);
                    });
                    return [4, virtualAlexa.launch()];
                case 2:
                    _a.sent();
                    return [4, virtualAlexa.utter("play")];
                case 3:
                    reply = _a.sent();
                    chai_1.assert.include(reply.response.directives[0].audioItem.stream.url, "episode-013");
                    chai_1.assert.isTrue(virtualAlexa.audioPlayer().isPlaying());
                    return [3, 5];
                case 4:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3, 5];
                case 5: return [2];
            }
        });
    }); });
    it("Should not play an undefined track", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa, requests_2, result, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/SimpleAudioPlayer.handler")
                        .interactionModel(interactionModel)
                        .create();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    requests_2 = [];
                    virtualAlexa.filter(function (json) {
                        requests_2.push(json.request);
                    });
                    return [4, virtualAlexa.launch()];
                case 2:
                    result = _a.sent();
                    chai_1.assert.include(result.response.outputSpeech.ssml, "Welcome to the Simple Audio Player");
                    return [4, virtualAlexa.utter("play undefined")];
                case 3:
                    result = (_a.sent());
                    return [3, 5];
                case 4:
                    e_2 = _a.sent();
                    chai_1.assert.equal(e_2.message, "The URL specified in the Play directive must be defined and a valid HTTPS url");
                    chai_1.assert.equal(e_2.type, "INVALID_RESPONSE");
                    return [3, 5];
                case 5: return [2];
            }
        });
    }); });
    it("Plays a track, next then previous", function () { return __awaiter(_this, void 0, void 0, function () {
        var virtualAlexa, requests_3, result, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
                        .handler("test/resources/SimpleAudioPlayer.handler")
                        .interactionModel(interactionModel)
                        .create();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    requests_3 = [];
                    virtualAlexa.filter(function (json) {
                        requests_3.push(json.request);
                    });
                    return [4, virtualAlexa.launch()];
                case 2:
                    result = _a.sent();
                    chai_1.assert.include(result.response.outputSpeech.ssml, "Welcome to the Simple Audio Player");
                    return [4, virtualAlexa.utter("play")];
                case 3:
                    result = (_a.sent());
                    chai_1.assert.equal(requests_3.length, 3);
                    chai_1.assert.include(result.response.directives[0].audioItem.stream.url, "episode-013");
                    return [4, virtualAlexa.utter("next")];
                case 4:
                    result = (_a.sent());
                    chai_1.assert.include(result.response.directives[0].audioItem.stream.url, "episode-012");
                    chai_1.assert.equal(requests_3[5].type, "AudioPlayer.PlaybackStarted");
                    return [4, virtualAlexa.utter("previous")];
                case 5:
                    result = (_a.sent());
                    chai_1.assert.include(result.response.directives[0].audioItem.stream.url, "episode-013");
                    return [4, virtualAlexa.utter("ignore")];
                case 6:
                    result = (_a.sent());
                    chai_1.assert.equal(requests_3[0].type, "LaunchRequest");
                    chai_1.assert.equal(requests_3[1].type, "IntentRequest");
                    chai_1.assert.equal(requests_3[2].type, "AudioPlayer.PlaybackStarted");
                    chai_1.assert.equal(requests_3[3].type, "AudioPlayer.PlaybackStopped");
                    chai_1.assert.equal(requests_3[4].type, "IntentRequest");
                    chai_1.assert.equal(requests_3[5].type, "AudioPlayer.PlaybackStarted");
                    chai_1.assert.equal(requests_3[6].type, "AudioPlayer.PlaybackStopped");
                    chai_1.assert.equal(requests_3[7].type, "IntentRequest");
                    chai_1.assert.equal(requests_3[8].type, "AudioPlayer.PlaybackStarted");
                    chai_1.assert.equal(requests_3[9].type, "AudioPlayer.PlaybackStopped");
                    chai_1.assert.equal(requests_3[10].type, "IntentRequest");
                    chai_1.assert.equal(requests_3[11].type, "AudioPlayer.PlaybackStarted");
                    chai_1.assert.equal(requests_3.length, 12);
                    return [3, 8];
                case 7:
                    e_3 = _a.sent();
                    chai_1.assert.fail(e_3);
                    return [3, 8];
                case 8: return [2];
            }
        });
    }); });
});
//# sourceMappingURL=AudioPlayerTest.js.map