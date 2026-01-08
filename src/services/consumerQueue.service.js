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
    },
    consumerToQueueNormal: async (queueName) => {
        try {
            const { chanel, connection } = await connectToRabbitMQ();
            const notiQueue = 'notificationQueueProcess';

            chanel.consume(notiQueue, (msg) => {
                console.log(`Processing notification: ${msg.content.toString()}`);
                chanel.ack(msg);
            });
        } catch (error) {
            console.error("Error in consumerToQueueNormal:", error);
        }
    },
    consumerToQueueFailed: async (queueName) => {
        try {
            const { chanel, connection } = await connectToRabbitMQ();
            const notificationExchangeDLX = 'notificationExDLX';
            const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX';
            const notiQueueHandler = 'notificationQueueHotFix';

            await chanel.assertExchange(notificationExchangeDLX, 'direct', { durable: true });

            const queueResult = await chanel.assertQueue(notiQueueHandler, {
                exclusive: false,
            });

            await chanel.bindQueue(queueResult.queue, notificationExchangeDLX, notificationRoutingKeyDLX);

            await chanel.consume(queueResult.queue, (msg) => {
                console.log(`Processing failed notification hot fix: ${msg.content.toString()}`);
                chanel.ack(msg);
            });
        } catch (error) {
            console.error("Error in consumerToQueueNormal:", error);
        }
    }
}

module.exports = messageService;