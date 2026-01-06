"use strict";

const mongoose = require("mongoose");

const connectString = "mongodb://localhost:27017/shopDEV";

const TestSchema = new mongoose.Schema({
    name: String
});

const Test = mongoose.model("Test", TestSchema);

describe("MongoDB Connection Test", () => {
    let connection;

    beforeAll(async () => {
        connection = await mongoose.connect(connectString);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("should connect to MongoDB", () => {
        expect(mongoose.connection.readyState).toBe(1);
    });

    it("should perform a simple CRUD operation", async () => {
        const user = new Test({ name: "Test Name" });
        await user.save();
        expect(user.isNew).toBe(false);
    });

    it("should perform a simple CRUD operation", async () => {
        const user = new Test({ name: "Test Name" });
        await user.save();
        expect(user.name).toBe("Test Name");
    });
});