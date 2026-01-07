"use strict";

const { consumerQueue, connectToRabbitMQ } = require("../dbs/init.rabbit");

const messageService = {
    consumerToQueue: async (queueName) => {
        try {
            const { chanel } = await connectToRabbitMQ();
            await consumerQueue(chanel, queueName);
        } catch (error) {
            console.error("Error in consumerToQueue:", error);
        }
    }
}

module.exports = messageService;