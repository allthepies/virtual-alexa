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
exports.SkillInteractor = void 0;
var SkillResponse_1 = require("../core/SkillResponse");
var SkillInteractor = (function () {
    function SkillInteractor() {
        this.requestFilter = null;
        this._alexa = null;
    }
    SkillInteractor.prototype.filter = function (requestFilter) {
        this.requestFilter = requestFilter;
    };
    SkillInteractor.prototype.callSkill = function (serviceRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var requestJSON, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(serviceRequest.json().request.intent
                            && this._alexa.context().device().audioPlayerSupported()
                            && this._alexa.context().audioPlayer().isPlaying())) return [3, 2];
                        return [4, this._alexa.context().audioPlayer().suspend()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        requestJSON = serviceRequest.json();
                        if (this.requestFilter) {
                            this.requestFilter(requestJSON);
                        }
                        return [4, this.invoke(requestJSON)];
                    case 3:
                        result = _a.sent();
                        if (requestJSON.request.type === "SessionEndedRequest") {
                            this._alexa.context().endSession();
                        }
                        if (this._alexa.context().activeSession()) {
                            this._alexa.context().session().used();
                            if (result && result.response && result.response.shouldEndSession) {
                                this._alexa.context().endSession();
                            }
                            else {
                                this._alexa.context().session().updateAttributes(result.sessionAttributes);
                            }
                        }
                        if (!(result.response !== undefined && result.response.directives !== undefined)) return [3, 5];
                        return [4, this._alexa.context().audioPlayer().directivesReceived(result.response.directives)];
                    case 4:
                        _a.sent();
                        this._alexa.context().dialogManager().handleDirective(result);
                        _a.label = 5;
                    case 5:
                        if (!(serviceRequest.json().request.intent
                            && this._alexa.context().device().audioPlayerSupported()
                            && this._alexa.context().audioPlayer().suspended())) return [3, 7];
                        return [4, this._alexa.context().audioPlayer().resume()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2, new SkillResponse_1.SkillResponse(result)];
                }
            });
        });
    };
    SkillInteractor.prototype.interactionModel = function () {
        return this._alexa.context().interactionModel();
    };
    return SkillInteractor;
}());
exports.SkillInteractor = SkillInteractor;
//# sourceMappingURL=SkillInteractor.js.map