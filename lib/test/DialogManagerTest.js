"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var VirtualAlexa_1 = require("../src/core/VirtualAlexa");
var DialogManager_1 = require("../src/dialog/DialogManager");
process.on("unhandledRejection", function (e) {
    console.error(e);
});
describe("DialogManager tests", function () {
    it("Interacts with delegated dialog", function (done) {
        var virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
            .handler("test/resources/dialogModel/dialog-index.handler")
            .interactionModelFile("test/resources/dialogModel/dialog-model.json")
            .create();
        var request = virtualAlexa.request().intent("PetMatchIntent").slot("size", "big");
        chai_1.assert.equal(request.json().request.dialogState, "STARTED");
        chai_1.assert.equal(request.json().request.intent.slots.size.value, "big");
        chai_1.assert.equal(request.json().request.intent.slots.size.resolutions.resolutionsPerAuthority.length, 1);
        virtualAlexa.call(request).then(function (response) {
            var request = virtualAlexa.request().intent("PetMatchIntent").slot("temperament", "watch");
            chai_1.assert.equal(request.json().request.intent.slots.size.value, "big");
            chai_1.assert.equal(request.json().request.intent.slots.temperament.value, "watch");
            chai_1.assert.equal(request.json().request.intent.slots.temperament.resolutions.resolutionsPerAuthority.length, 1);
            return virtualAlexa.call(request);
        }).then(function () {
            done();
        });
    });
    it("Interacts with delegated dialog, version 2", function (done) {
        var virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
            .handler("test/resources/dialogModel/dialog-index.handler")
            .interactionModelFile("test/resources/dialogModel/dialog-model.json")
            .create();
        virtualAlexa.intend("PetMatchIntent", { size: "big" }).then(function (response) {
            chai_1.assert.equal(response.directive("Dialog.Delegate").type, "Dialog.Delegate");
            return virtualAlexa.intend("PetMatchIntent", { temperament: "watch" });
        }).then(function (response) {
            console.log("Response: " + JSON.stringify(response, null, 2));
            chai_1.assert.equal(response.directive("Dialog.Delegate").type, "Dialog.Delegate");
            return virtualAlexa.intend("PetMatchIntent", { energy: "high" });
        }).then(function (response) {
            chai_1.assert.equal(response.directive("Dialog.Delegate").type, "Dialog.Delegate");
            done();
        });
    });
    it("Interacts with dialog with explicit slot handling", function (done) {
        var virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
            .handler("test/resources/dialogModel/dialog-manual-index.handler")
            .interactionModelFile("test/resources/dialogModel/dialog-model.json")
            .create();
        virtualAlexa.intend("PetMatchIntent", { size: "big" }).then(function (skillResponse) {
            chai_1.assert.equal(skillResponse.directive("Dialog.ElicitSlot").type, "Dialog.ElicitSlot");
            chai_1.assert.include(skillResponse.prompt(), "Are you looking for a family dog?");
            return virtualAlexa.intend("PetMatchIntent", { temperament: "watch" });
        }).then(function (skillResponse) {
            chai_1.assert.equal(skillResponse.prompt(), "Do you prefer high energy dogs?");
            return virtualAlexa.intend("PetMatchIntent", { energy: "high" });
        }).then(function (skillResponse) {
            chai_1.assert.equal(skillResponse.prompt(), "Done with dialog");
            done();
        });
    });
    it("Interacts with dialog with explicit slot handling and confirmations", function (done) {
        var virtualAlexa = VirtualAlexa_1.VirtualAlexa.Builder()
            .handler("test/resources/dialogModel/dialog-manual-index.handler")
            .interactionModelFile("test/resources/dialogModel/dialog-model.json")
            .create();
        virtualAlexa.intend("PetMatchIntent", { size: "small" }).then(function (skillResponse) {
            chai_1.assert.equal(skillResponse.directive("Dialog.ConfirmSlot").type, "Dialog.ConfirmSlot");
            chai_1.assert.include(skillResponse.prompt(), "small?");
            virtualAlexa.filter(function (request) {
                chai_1.assert.equal(request.request.intent.slots.size.confirmationStatus, "CONFIRMED");
                chai_1.assert.equal(request.request.intent.slots.size.value, "small");
            });
            return virtualAlexa.call(virtualAlexa.request().intent("PetMatchIntent").slot("size", "small", DialogManager_1.ConfirmationStatus.CONFIRMED));
        }).then(function (skillResponse) {
            virtualAlexa.resetFilter();
            chai_1.assert.equal(skillResponse.directive("Dialog.ElicitSlot").type, "Dialog.ElicitSlot");
            chai_1.assert.equal(skillResponse.prompt(), "Are you looking for a family dog?");
            return virtualAlexa.intend("PetMatchIntent", { temperament: "family" });
        }).then(function (skillResponse) {
            chai_1.assert.equal(skillResponse.prompt(), "Do you prefer high energy dogs?");
            return virtualAlexa.intend("PetMatchIntent", { temperament: "family" });
        }).then(function (skillResponse) {
            done();
        });
    });
});
//# sourceMappingURL=DialogManagerTest.js.map