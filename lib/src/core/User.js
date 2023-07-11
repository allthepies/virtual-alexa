"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var uuid = require("uuid");
var User = (function () {
    function User(id) {
        this._enablePermissions = false;
        this._id = id;
        if (!this._id) {
            this._id = "amzn1.ask.account." + uuid.v4();
        }
    }
    User.prototype.id = function () {
        return this._id;
    };
    User.prototype.setID = function (id) {
        this._id = id;
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map