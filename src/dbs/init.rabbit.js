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

module.exports = {
    connectToRabbitMQ,
    connectToRabbitMQForTest
};