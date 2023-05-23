// Tests CRUD Operations for Campgrounds
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Campground = require("../models/campground");
// const axios = require("axios");
// const URL = "http://127.0.0.1:3000";

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.TEST_MONGODB_URI);

  const campground = new Campground({
    title: "first created title",
    location: "first created location",
    price: 10,
    description: "first description",
    image: "image url",
  });
  await campground.save();
});

/* Closing database connection after each test. */
afterEach(async () => {
  await Campground.findOneAndDelete({ title: "first created title" });
  await mongoose.connection.close();
});

describe("GET /campgrounds", () => {
  it("should return one sample product", async () => {
    const campground = await Campground.findOne({
      title: "first created title",
    });
    const res = await request(app).get(`/campgrounds/${campground._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.text.length).toBeGreaterThan(0);
  });

  it("should return an error as there is no campground", async () => {
    const res = await request(app).get(`/campgrounds/somegarbageid`);
    expect(res.statusCode).toBe(500);
  });

  it("should return all products", async () => {
    const res = await request(app).get("/campgrounds");
    expect(res.statusCode).toBe(200);
    expect(res.text.length).toBeGreaterThan(0);
  });
});

describe("POST /campgrounds", () => {
  it("should create a product", async () => {
    const res = await request(app)
      .post("/campgrounds")
      .type("form")
      .send({
        campground: {
          title: "new created title",
          location: "new created location",
          price: 10,
          description: "new description",
          image: "image url",
        },
      });
    await Campground.findOneAndDelete({ title: "new created title" });
    expect(res.statusCode).toBe(302);
  });

  it("should return an error as title is missing", async () => {
    const res = await request(app)
      .post("/campgrounds")
      .type("form")
      .send({
        campground: {
          title: "",
          location: "new created location",
          price: 10,
          description: "new description",
          image: "image url",
        },
      });
    expect(res.statusCode).toBe(400);
  });

  it("should return an error as description is missing", async () => {
    const res = await request(app)
      .post("/campgrounds")
      .type("form")
      .send({
        campground: {
          title: "new created title",
          location: "new created location",
          price: 10,
          description: "",
          image: "image url",
        },
      });
    expect(res.statusCode).toBe(400);
  });

  it("should return an error as price is not a number", async () => {
    const res = await request(app)
      .post("/campgrounds")
      .type("form")
      .send({
        campground: {
          title: "new created title",
          location: "new created location",
          price: "10TL",
          description: "new description",
          image: "image url",
        },
      });
    expect(res.statusCode).toBe(400);
  });

  it("should return an error as price is lower than 0", async () => {
    const res = await request(app)
      .post("/campgrounds")
      .type("form")
      .send({
        campground: {
          title: "new created title",
          location: "new created location",
          price: -1,
          description: "new description",
          image: "image url",
        },
      });
    expect(res.statusCode).toBe(400);
  });
});

describe("PUT /campgrounds/:campgroundId", () => {
  it("should update a campground", async () => {
    const campground = await Campground.findOne({
      title: "first created title",
    });
    const res = await request(app)
      .put(`/campgrounds/${campground._id}`)
      .type("form")
      .send({
        campground: {
          title: "updated title",
          location: "updated location",
          price: 10,
          description: "updated description",
          image: "updated image url",
        },
      });

    await Campground.findOneAndDelete({ title: "updated title" });
    expect(res.statusCode).toBe(302);
  });

  it("should return an error as missing information", async () => {
    const campground = await Campground.findOne({
      title: "first created title",
    });
    const res = await request(app)
      .put(`/campgrounds/${campground._id}`)
      .type("form")
      .send({
        campground: {
          title: "",
          location: "updated location",
          price: 10,
          description: "updated description",
          image: "updated image url",
        },
      });

    expect(res.statusCode).toBe(400);
  });

  it("should return an error as price is lower than 0", async () => {
    const campground = await Campground.findOne({
      title: "first created title",
    });
    const res = await request(app)
      .put(`/campgrounds/${campground._id}`)
      .type("form")
      .send({
        campground: {
          title: "updated title",
          location: "updated location",
          price: -1,
          description: "updated description",
          image: "updated image url",
        },
      });

    expect(res.statusCode).toBe(400);
  });
});

describe("DELETE /campgrounds/:campgroundId", () => {
  it("should delete a campground", async () => {
    const campground = await Campground.findOne({
      title: "first created title",
    });

    const res = await request(app).delete(`/campgrounds/${campground._id}`);
    expect(res.statusCode).toBe(302);
  });
});
