"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var AWS = require("aws-sdk");
var db = require("../src/external/DynamoDB");
describe("Test dynamo DB mocks", function () {
    it("Adds a record to mock dynamo", function (done) {
        var mockDynamo = new db.DynamoDB();
        mockDynamo.mock();
        var dynamodb = new AWS.DynamoDB();
        var putParams = {
            Item: {
                AnArray: {
                    SS: ["Value1", "Value2", "Value3"],
                },
                Artist: {
                    S: "No One You Know",
                },
                ID: {
                    S: "IDValue",
                },
                SongTitle: {
                    S: "Call Me Today",
                },
            },
            ReturnConsumedCapacity: "TOTAL",
            TableName: "FakeTable",
        };
        var getParams = {
            Key: {
                ID: {
                    S: "IDValue",
                },
            },
            TableName: "FakeTable",
        };
        chai_1.assert.equal(process.env.AWS_REGION, "us-east-1");
        dynamodb.putItem(putParams, function (error, data) {
            chai_1.assert.isNull(error);
            chai_1.assert.isDefined(data);
            dynamodb.getItem(getParams, function (getError, getData) {
                chai_1.assert.isNull(error);
                chai_1.assert.equal(getData.Item.Artist.S, "No One You Know");
                chai_1.assert.isUndefined(getData.TableName);
                putParams.Item.SongTitle.S = "Call Me Today Changed";
                dynamodb.putItem(putParams, function () {
                    dynamodb.getItem(getParams, function (getError2, getData2) {
                        chai_1.assert.equal(getData2.Item.SongTitle.S, "Call Me Today Changed");
                        mockDynamo.reset();
                        chai_1.assert.equal(mockDynamo.records.length, 0);
                        done();
                    });
                });
            });
        });
    });
    it("Adds a record to mock dynamo, not changing environment variables", function (done) {
        process.env.AWS_REGION = "us-west-1";
        var mockDynamo = new db.DynamoDB();
        mockDynamo.mock();
        var dynamodb = new AWS.DynamoDB();
        var putParams = {
            Item: {
                AnArray: {
                    SS: ["Value1", "Value2", "Value3"],
                },
                Artist: {
                    S: "No One You Know",
                },
                ID: {
                    S: "IDValue",
                },
                SongTitle: {
                    S: "Call Me Today",
                },
            },
            ReturnConsumedCapacity: "TOTAL",
            TableName: "FakeTable",
        };
        var getParams = {
            Key: {
                ID: {
                    S: "IDValue",
                },
            },
            TableName: "FakeTable",
        };
        chai_1.assert.equal(process.env.AWS_REGION, "us-west-1");
        dynamodb.putItem(putParams, function (error, data) {
            chai_1.assert.isNull(error);
            chai_1.assert.isDefined(data);
            dynamodb.getItem(getParams, function (getError, getData) {
                chai_1.assert.isNull(error);
                chai_1.assert.equal(getData.Item.Artist.S, "No One You Know");
                chai_1.assert.isUndefined(getData.TableName);
                getParams.Key.ID.S = "IDValueMissing";
                dynamodb.getItem(getParams, function (getError2, getDataFails) {
                    chai_1.assert.isNull(error);
                    chai_1.assert.isUndefined(getDataFails.Item);
                    done();
                });
            });
        });
    });
    it("create a table in mock dynamo, not changing environment variables", function (done) {
        process.env.AWS_REGION = "us-west-1";
        var mockDynamo = new db.DynamoDB();
        mockDynamo.mock();
        var dynamodb = new AWS.DynamoDB();
        var createParams = {
            AttributeDefinitions: [
                {
                    AttributeName: "Artist",
                    AttributeType: "S"
                },
                {
                    AttributeName: "SongTitle",
                    AttributeType: "S"
                }
            ],
            KeySchema: [
                {
                    AttributeName: "Artist",
                    KeyType: "HASH"
                },
                {
                    AttributeName: "SongTitle",
                    KeyType: "RANGE"
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            },
            TableName: "Music"
        };
        chai_1.assert.equal(process.env.AWS_REGION, "us-west-1");
        dynamodb.createTable(createParams, function (error, data) {
            chai_1.assert.isNull(error);
            chai_1.assert.isDefined(data);
            chai_1.assert.equal(data.TableDescription.TableStatus, "CREATING");
            done();
        });
    });
    it("Deletes a record from mock dynamo", function (done) {
        process.env.AWS_REGION = "us-east-1";
        var mockDynamo = new db.DynamoDB();
        mockDynamo.mock();
        var dynamodb = new AWS.DynamoDB();
        var putParams = {
            Item: {
                AnArray: {
                    SS: ["Value1", "Value2", "Value3"],
                },
                Artist: {
                    S: "No One You Know",
                },
                ID: {
                    S: "IDValue",
                },
                SongTitle: {
                    S: "Call Me Today",
                },
            },
            ReturnConsumedCapacity: "TOTAL",
            TableName: "FakeTable",
        };
        var deleteParams = {
            Key: {
                ID: {
                    S: "IDValue",
                },
            },
            TableName: "FakeTable",
        };
        chai_1.assert.equal(process.env.AWS_REGION, "us-east-1");
        dynamodb.putItem(putParams, function (error, data) {
            chai_1.assert.isNull(error);
            chai_1.assert.isDefined(data);
            dynamodb.deleteItem(deleteParams, function (getError, deleteResponse) {
                chai_1.assert.isNull(error);
                chai_1.assert.deepEqual(deleteResponse, {});
                dynamodb.getItem(deleteParams, function (getError2, getData2) {
                    chai_1.assert.deepEqual(getData2, {});
                    mockDynamo.reset();
                    chai_1.assert.equal(mockDynamo.records.length, 0);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=DynamoDBTest.js.map