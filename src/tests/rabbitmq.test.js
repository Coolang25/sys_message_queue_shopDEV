"use strict";

const { connectToRabbitMQForTest } = require("../dbs/init.rabbit");

describe("RabbitMQ Connection Test", () => {
    it("should connect to RabbitMQ and send a test message", async () => {
        const result = await connectToRabbitMQForTest();
        expect(result).toBeUndefined();
    });
});