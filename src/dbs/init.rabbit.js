"use strict";

const amqp = require("amqplib");

const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:123456@localhost');
        if (!connection) {
            throw new Error("RabbitMQ connection failed");
        }

        const chanel = await connection.createChannel();

        return { connection, chanel };
    } catch (error) {
        console.error("Failed to connect to RabbitMQ:", error);
    }
};

const connectToRabbitMQForTest = async () => {
    try {
        const { connection, chanel } = await connectToRabbitMQ();

        const testQueue = 'test_queue';
        const message = 'Test Message';
        await chanel.assertQueue(testQueue);
        await chanel.sendToQueue(testQueue, Buffer.from(message));

        await connection.close();
    } catch (error) {
        console.error("Failed to connect to RabbitMQ for test:", error);
    }
};

const consumerQueue = async (chanel, queueName) => {
    try {
        await chanel.assertQueue(queueName, { durable: true });
        console.log(`Waiting for messages...`);
        chanel.consume(queueName, async (msg) => {
            console.log(`Received message: ${msg.content.toString()}`);

            // 1. find user following SHOP
            // 2. send notification to user
            // 3. yes => success
            // 4. no => setup DLX
        }, { noAck: true });
    } catch (error) {
        console.error("Failed to consume queue:", error);
    }
}

module.exports = {
    connectToRabbitMQ,
    connectToRabbitMQForTest,
    consumerQueue
};