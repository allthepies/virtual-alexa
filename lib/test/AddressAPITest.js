"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var https = require("https");
var VirtualAlexa_1 = require("../src/core/VirtualAlexa");
describe("Test address API mocks", function () {
    it("Calls address API for full address", function (done) {
        var myFunction = function (event, context) {
            var promises = [];
            promises.push(callAddressAPI(event.context.System.apiAccessToken, event.context.System.device.deviceId, true)
                .then(function (response) {
                chai_1.assert.isUndefined(response.payload.addressLine1);
                chai_1.assert.equal(response.payload.countryCode, "country code");
                chai_1.assert.equal(response.statusCode, 200);
            }));
            promises.push(callAddressAPI(event.context.System.apiAccessToken, event.context.System.device.deviceId, false)
                .then(function (response) {
                chai_1.assert.equal(response.payload.addressLine1, "address line 1");
                chai_1.assert.equal(response.payload.countryCode, "country code");
                chai_1.assert.equal(response.statusCode, 200);
            }));
            Promise.all(promises).then(function () {
                done();
            });
        };
        var virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
            .handler(myFunction)
            .sampleUtterancesFile("./test/resources/SampleUtterances.txt")
            .intentSchemaFile("./test/resources/IntentSchema.json")
            .create();
        virtualAlexa.addressAPI().returnsFullAddress({
            addressLine1: "address line 1",
            addressLine2: "address line 2",
            addressLine3: "address line 3",
            city: "city",
            countryCode: "country code",
            districtOrCounty: "district",
            postalCode: "postal",
            stateOrRegion: "state",
        });
        virtualAlexa.launch();
    });
    it("Calls address API for country code", function (done) {
        var myFunction = function (event, context) {
            var promises = [];
            promises.push(callAddressAPI(event.context.System.apiAccessToken, event.context.System.device.deviceId, true)
                .then(function (response) {
                chai_1.assert.isUndefined(response.payload.addressLine1);
                chai_1.assert.equal(response.payload.countryCode, "country code");
                chai_1.assert.equal(response.statusCode, 200);
            }));
            promises.push(callAddressAPI(event.context.System.apiAccessToken, event.context.System.device.deviceId, false)
                .then(function (response) {
                chai_1.assert.equal(response.statusCode, 403);
            }));
            Promise.all(promises).then(function () {
                done();
            });
        };
        var virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
            .handler(myFunction)
            .sampleUtterancesFile("./test/resources/SampleUtterances.txt")
            .intentSchemaFile("./test/resources/IntentSchema.json")
            .create();
        virtualAlexa.addressAPI().returnsCountryAndPostalCode({
            countryCode: "country code",
            postalCode: "postal",
        });
        virtualAlexa.launch();
    });
    it("Calls with two different virtual alexas", function (done) {
        var count = 0;
        var myFunction = function (event, context) {
            callAddressAPI(event.context.System.apiAccessToken, event.context.System.device.deviceId, true)
                .then(function (response) {
                count++;
                chai_1.assert.isUndefined(response.payload.addressLine1);
                chai_1.assert.equal(response.payload.countryCode, "country code " + count);
                chai_1.assert.equal(response.statusCode, 200);
                if (count === 2) {
                    done();
                }
            });
        };
        var virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
            .handler(myFunction)
            .sampleUtterancesFile("./test/resources/SampleUtterances.txt")
            .intentSchemaFile("./test/resources/IntentSchema.json")
            .create();
        virtualAlexa.addressAPI().returnsCountryAndPostalCode({
            countryCode: "country code 1",
            postalCode: "postal",
        });
        virtualAlexa.launch();
        virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
            .handler(myFunction)
            .sampleUtterancesFile("./test/resources/SampleUtterances.txt")
            .intentSchemaFile("./test/resources/IntentSchema.json")
            .create();
        virtualAlexa.addressAPI().returnsCountryAndPostalCode({
            countryCode: "country code 2",
            postalCode: "postal",
        });
        virtualAlexa.launch();
    });
    it("Calls address API without permissions", function (done) {
        var myFunction = function (event, context) {
            callAddressAPI(event.context.System.apiAccessToken, event.context.System.device.deviceId)
                .then(function (response) {
                chai_1.assert.isUndefined(response.payload);
                chai_1.assert.equal(response.statusCode, 403);
                done();
            });
        };
        var virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
            .handler(myFunction)
            .sampleUtterancesFile("./test/resources/SampleUtterances.txt")
            .intentSchemaFile("./test/resources/IntentSchema.json")
            .create();
        virtualAlexa.addressAPI().insufficientPermissions();
        virtualAlexa.launch();
    });
});
function callAddressAPI(apiAccessToken, deviceID, countryCode) {
    if (countryCode === void 0) { countryCode = false; }
    var path = "/settings/address";
    if (countryCode) {
        path += "/countryAndPostalCode";
    }
    var authorization = "Bearer " + apiAccessToken;
    var payload;
    return new Promise(function (resolve) {
        var request = https.request({
            headers: {
                authorization: authorization,
            },
            host: "api.amazonalexa.com",
            method: "GET",
            path: "/v1/devices/" + deviceID + path,
        }, function (response) {
            var statusCode = response.statusCode;
            response.setEncoding("utf8");
            response.on("data", function (chunk) {
                if (!payload) {
                    payload = "";
                }
                payload += chunk;
            });
            response.on("end", function () {
                if (payload) {
                    payload = JSON.parse(payload);
                }
                resolve({
                    payload: payload,
                    statusCode: statusCode,
                });
            });
        });
        request.end();
    });
}
//# sourceMappingURL=AddressAPITest.js.map