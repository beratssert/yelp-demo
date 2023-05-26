// Tests CRUD Operations for Reviews
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Campground = require("../models/campground");
const Review = require("../models/review");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.TEST_MONGODB_URI);

  const campground = new Campground({
    title: "sample title",
    location: "sample location",
    price: 10,
    description: "sample description",
    image: "image url",
  });

  const review = new Review({
    rating: 3,
    body: "Sample review for test.",
  });

  campground.reviews.push(review);

  await campground.save();
  await review.save();
});

/* Closing database connection after each test. */
afterEach(async () => {
  await Campground.findOneAndDelete({ title: "sample title" });
  await Review.findOneAndDelete({ body: "Sample review for test." });
  await mongoose.connection.close();
});

describe("POST /campgrounds/:campgroundId/reviews", () => {
  it("should create a review", async () => {
    let campground = await Campground.findOne({ title: "sample title" });
    const res = await request(app)
      .post(`/campgrounds/${campground._id}/reviews`)
      .type("form")
      .send({
        review: {
          rating: 5,
          body: "Excellent for test.",
        },
      });

    await Review.findOneAndDelete({ body: "Excellent for test." });

    expect(res.statusCode).toBe(302);
  });

  it("should return a error as missing information", async () => {
    let campground = await Campground.findOne({ title: "sample title" });
    const res = await request(app)
      .post(`/campgrounds/${campground._id}/reviews`)
      .type("form")
      .send({
        review: {
          body: "Excellent for test.",
        },
      });

    await Review.findOneAndDelete({ body: "Excellent for test." });

    expect(res.statusCode).toBe(400);
  });

  it("should return a error as unacceptable rating", async () => {
    let campground = await Campground.findOne({ title: "sample title" });
    const res = await request(app)
      .post(`/campgrounds/${campground._id}/reviews`)
      .type("form")
      .send({
        review: {
          rating: 6,
          body: "Excellent for test.",
        },
      });

    await Review.findOneAndDelete({ body: "Excellent for test." });

    expect(res.statusCode).toBe(400);
  });
});

describe("DELETE /campgrounds/:campgroundId/reviews/:reviewId", () => {
  it("should delete a review", async () => {
    const campground = await Campground.findOne({ title: "sample title" });
    const reviewId = campground.reviews[0]._id;
    const res = await request(app).delete(
      `/campgrounds/${campground._id}/reviews/${reviewId}`
    );
    expect(res.statusCode).toBe(302);
  });
});
