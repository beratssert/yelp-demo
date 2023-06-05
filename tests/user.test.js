// Tests for Users
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const User = require("../models/user");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await new User({
    username: "usertest",
    email: "usertest@testuser.com",
    password: "testpassword",
  });
  await mongoose.connect(process.env.TEST_MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await User.findOneAndDelete({ username: "usertest" });
  await mongoose.connection.close();
});

describe("POST /register", () => {
  it("should create a user", async () => {
    const res = await request(app).post("/register").type("form").send({
      username: "testuser",
      email: "testuser@testuser.com",
      password: "testpassword",
    });

    await User.findOneAndDelete({ username: "testuser" });
    expect(res.statusCode).toBe(302);
  });
});

describe("POST /login", () => {
  it("should login for a user", async () => {
    const res = await request(app).post("/login").type("form").send({
      username: "usertest",
      email: "usertest@testuser.com",
      password: "testpassword",
    });

    expect(res.statusCode).toBe(302);
  });
});
