"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalSkillInteractor = void 0;
var ModuleInvoker_1 = require("./ModuleInvoker");
var SkillInteractor_1 = require("./SkillInteractor");
var LocalSkillInteractor = (function (_super) {
    __extends(LocalSkillInteractor, _super);
    function LocalSkillInteractor(handler) {
        var _this = _super.call(this) || this;
        _this.handler = handler;
        return _this;
    }
    LocalSkillInteractor.prototype.invoke = function (requestJSON) {
        if (typeof this.handler === "string") {
            return ModuleInvoker_1.ModuleInvoker.invokeHandler(this.handler, requestJSON);
        }
        else {
            return ModuleInvoker_1.ModuleInvoker.invokeFunction(this.handler, requestJSON);
        }
    };
    return LocalSkillInteractor;
}(SkillInteractor_1.SkillInteractor));
exports.LocalSkillInteractor = LocalSkillInteractor;
//# sourceMappingURL=LocalSkillInteractor.js.map