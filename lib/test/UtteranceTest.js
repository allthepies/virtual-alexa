"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var virtual_core_1 = require("virtual-core");
var chai_1 = require("chai");
var IntentSchema_1 = require("../src/model/IntentSchema");
var InteractionModel_1 = require("../src/model/InteractionModel");
var SampleUtterancesBuilder_1 = require("../src/model/SampleUtterancesBuilder");
describe("UtteranceTest", function () {
    this.timeout(10000);
    var intentSchema = {
        intents: [
            {
                intent: "Play",
            },
            {
                intent: "Hello",
            },
            {
                intent: "NoSampleUtterances",
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
            {
                intent: "CustomSlot",
                slots: [
                    { name: "country", type: "COUNTRY_CODE" },
                ],
            },
            {
                intent: "NumberSlot",
                slots: [
                    { name: "number", type: "AMAZON.NUMBER" },
                ],
            },
            {
                intent: "StringSlot",
                slots: [
                    { name: "stringSlot", type: "StringSlotType" },
                ],
            },
            {
                intent: "AMAZON.HelpIntent",
            },
        ],
    };
    var sampleUtterances = {
        CustomSlot: ["{country}"],
        Hello: ["hi", "hello", "hi there", "good morning"],
        MultipleSlots: ["multiple {SlotA} and {SlotB}", "reversed {SlotB} then {SlotA}", "{SlotA}"],
        NumberSlot: ["{number}", "{number} test"],
        Play: ["play", "play next", "play now"],
        SlottedIntent: ["slot {SlotName}"],
        StringSlot: ["{stringSlot}"],
    };
    var slotTypes = [{
            name: "COUNTRY_CODE",
            values: [
                {
                    id: "US",
                    name: {
                        synonyms: ["USA", "America", "US"],
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
                        synonyms: ["England", "Britain", "UK", "United Kingdom", "Great Britain"],
                        value: "UK",
                    },
                },
            ],
        }];
    var is = IntentSchema_1.IntentSchema.fromJSON(intentSchema);
    var model = new InteractionModel_1.InteractionModel(IntentSchema_1.IntentSchema.fromJSON(intentSchema), SampleUtterancesBuilder_1.SampleUtterancesBuilder.fromJSON(sampleUtterances), new virtual_core_1.SlotTypes(slotTypes));
    var japaneseModel = InteractionModel_1.InteractionModel.fromFile("./test/resources/japanese_skill/models/ja-JP.json");
    describe("#matchIntent", function () {
        it("Sends correct error message on missing interaction ", function () {
            try {
                InteractionModel_1.InteractionModel.fromFile("./test/resources/wrong-file.json");
            }
            catch (error) {
                chai_1.assert.isTrue(error.message.includes("The interaction model for your Alexa Skill could not be"));
            }
        });
        it("Matches a simple phrase", function () {
            var utterance = new virtual_core_1.Utterance(model, "play");
            chai_1.assert.isTrue(utterance.matched());
            chai_1.assert.equal(utterance.intent(), "Play");
        });
        it("Matches a simple phrase, ignores case", function () {
            var utterance = new virtual_core_1.Utterance(model, "Play");
            chai_1.assert.isTrue(utterance.matched());
            chai_1.assert.equal(utterance.intent(), "Play");
        });
        it("Matches a simple phrase, ignores special characters", function () {
            var utterance = new virtual_core_1.Utterance(model, "play?");
            chai_1.assert.isTrue(utterance.matched());
            chai_1.assert.equal(utterance.intent(), "Play");
        });
        it("Matches help", function () {
            var utterance = new virtual_core_1.Utterance(model, "help");
            chai_1.assert.isTrue(utterance.matched());
            chai_1.assert.equal(utterance.intent(), "AMAZON.HelpIntent");
        });
        it("Matches a slotted phrase", function () {
            var utterance = new virtual_core_1.Utterance(model, "slot value");
            chai_1.assert.isTrue(utterance.matched());
            chai_1.assert.equal(utterance.intent(), "SlottedIntent");
            chai_1.assert.equal(utterance.slot(0), "value");
            chai_1.assert.equal(utterance.slotByName("SlotName"), "value");
        });
        it("Matches a slotted phrase, no slot value", function () {
            var utterance = new virtual_core_1.Utterance(model, "slot");
            chai_1.assert.isTrue(utterance.matched());
            chai_1.assert.equal(utterance.intent(), "SlottedIntent");
        });
        it("Matches a phrase with multiple slots", function () {
            var utterance = new virtual_core_1.Utterance(model, "multiple a and b");
            chai_1.assert.isTrue(utterance.matched());
            chai_1.assert.equal(utterance.intent(), "MultipleSlots");
            chai_1.assert.equal(utterance.slot(0), "a");
            chai_1.assert.equal(utterance.slot(1), "b");
            chai_1.assert.equal(utterance.slotByName("SlotA"), "a");
            chai_1.assert.equal(utterance.slotByName("SlotB"), "b");
        });
        it("Matches a phrase with multiple slots reversed", function () {
            var utterance = new virtual_core_1.Utterance(model, "reversed a then b");
            chai_1.assert.isTrue(utterance.matched());
            chai_1.assert.equal(utterance.intent(), "MultipleSlots");
            chai_1.assert.equal(utterance.slot(0), "a");
            chai_1.assert.equal(utterance.slot(1), "b");
            chai_1.assert.equal(utterance.slotByName("SlotA"), "b");
            chai_1.assert.equal(utterance.slotByName("SlotB"), "a");
        });
        it("Matches a phrase with slot with enumerated values", function () {
            var utterance = new virtual_core_1.Utterance(model, "US");
            chai_1.assert.isTrue(utterance.matched());
            chai_1.assert.equal(utterance.intent(), "CustomSlot");
            chai_1.assert.equal(utterance.slot(0), "US");
            chai_1.assert.equal(utterance.slotByName("country"), "US");
        });
        it("Does not match a phrase with slot with enumerated values", function () {
            var utterance = new virtual_core_1.Utterance(model, "hi");
            chai_1.assert.isTrue(utterance.matched());
            chai_1.assert.equal(utterance.intent(), "Hello");
        });
        it("Matches a phrase with slot with number value", function () {
            var utterance = new virtual_core_1.Utterance(model, "19801");
            chai_1.assert.isTrue(utterance.matched());
            chai_1.assert.equal(utterance.intent(), "NumberSlot");
            chai_1.assert.equal(utterance.slot(0), "19801");
            chai_1.assert.equal(utterance.slotByName("number"), "19801");
        });
        it("Matches a phrase with slot with long-form number value", function () {
            var utterance = new virtual_core_1.Utterance(model, "one");
            chai_1.assert.isTrue(utterance.matched());
            chai_1.assert.equal(utterance.intent(), "NumberSlot");
            chai_1.assert.equal(utterance.slot(0), "one");
            chai_1.assert.equal(utterance.slotByName("number"), "one");
            utterance = new virtual_core_1.Utterance(model, "Thirteen");
            chai_1.assert.equal(utterance.slotByName("number"), "Thirteen");
            utterance = new virtual_core_1.Utterance(model, " ten ");
            chai_1.assert.equal(utterance.slotByName("number"), "ten");
        });
        it("Does not match a phrase with numbers and letters to slot of number type", function () {
            var utterance = new virtual_core_1.Utterance(model, "19801a test");
            chai_1.assert.equal(utterance.intent(), "MultipleSlots");
        });
        it("Matches a more specific phrase", function () {
            var utterance = new virtual_core_1.Utterance(model, "1900 test");
            chai_1.assert.isTrue(utterance.matched());
            chai_1.assert.equal(utterance.intent(), "NumberSlot");
        });
        it("Matches with symbols in the phrase", function () {
            var utterance = new virtual_core_1.Utterance(model, "good? #%.morning");
            chai_1.assert.isTrue(utterance.matched());
            chai_1.assert.equal(utterance.intent(), "Hello");
        });
        it("Matches with punctuation in the phrase", function () {
            var utterance = new virtual_core_1.Utterance(model, "good, -morning:");
            chai_1.assert.isTrue(utterance.matched());
            chai_1.assert.equal(utterance.intent(), "Hello");
        });
        describe("Matches for International Languages", function () {
            it("Matches a slotted phrase", function () {
                var utterance = new virtual_core_1.Utterance(japaneseModel, "5 人のプレーヤー");
                chai_1.assert.isTrue(utterance.matched());
                chai_1.assert.equal(utterance.intent(), "GetIntentWithSlot");
                chai_1.assert.equal(utterance.slot(0), "5");
                chai_1.assert.equal(utterance.slotByName("number"), "5");
            });
            it("Matches a slotted phrase, no slot value", function () {
                var utterance = new virtual_core_1.Utterance(japaneseModel, "おはよう");
                chai_1.assert.isTrue(utterance.matched());
                chai_1.assert.equal(utterance.intent(), "GetIntent");
            });
        });
    });
});
//# sourceMappingURL=UtteranceTest.js.map