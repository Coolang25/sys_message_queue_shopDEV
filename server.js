'use strict';

const { consumerToQueue, consumerToQueueNormal, consumerToQueueFailed } = require("./src/services/consumerQueue.service");

const queueName = "test-topic";

// consumerToQueue(queueName).then(() => {
//     console.log("Consumer started successfully");
// }).catch((error) => {
//     console.error("Error in consumerToQueue:", error);
// });

consumerToQueueNormal(queueName).then(() => {
    console.log("Message consumerToQueueNormal");
}).catch((error) => {
    console.error("Error in consumerToQueue:", error);
});

consumerToQueueFailed(queueName).then(() => {
    console.log("Message consumerToQueueFailed");
}).catch((error) => {
    console.error("Error in consumerToQueue:", error);
});