"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAPI = void 0;
var nock = require("nock");
var UserAPI = (function () {
    function UserAPI(context) {
        this.context = context;
        this.reset();
    }
    UserAPI.prototype.reset = function () {
        nock.cleanAll();
    };
    UserAPI.prototype.prepareNockResponse = function (userProfile, property) {
        if (userProfile[property]) {
            return { responseCode: 200, payload: JSON.stringify(userProfile[property], null, 2) };
        }
        return { responseCode: 403 };
    };
    UserAPI.prototype.returnsUserProfile = function (userProfile) {
        var _this = this;
        if (!nock.isActive()) {
            nock.activate();
        }
        var baseURL = this.context.apiEndpoint();
        var scope = nock(baseURL)
            .persist();
        ["name", "givenName", "email", "mobileNumber"].forEach(function (key) {
            var nockResponse = _this.prepareNockResponse(userProfile, key);
            scope = scope
                .get(function (path) {
                return path === ("/v2/accounts/~current/settings/Profile." + key);
            }).query(true)
                .reply(nockResponse.responseCode, nockResponse.payload);
        });
        UserAPI.scope = scope;
    };
    return UserAPI;
}());
exports.UserAPI = UserAPI;
//# sourceMappingURL=UserAPI.js.map