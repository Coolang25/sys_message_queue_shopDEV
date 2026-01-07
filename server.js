'use strict';

const { consumerToQueue } = require("./src/services/consumerQueue.service");

const queueName = "test-topic";

consumerToQueue(queueName).then(() => {
    console.log("Consumer started successfully");
}).catch((error) => {
    console.error("Error in consumerToQueue:", error);
});