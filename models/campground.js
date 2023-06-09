const mongoose = require("mongoose");
const { Schema } = mongoose;
const catchAsync = require("../utils/catchAsyncErrors");
const Review = require("./review");

const opts = { toJSON: { virtuals: true } };

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const campgroundSchema = new Schema(
  {
    title: String,
    location: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    images: [ImageSchema],
    price: Number,
    description: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  opts
);

campgroundSchema.virtual("properties.popUpMarkup").get(function () {
  return `
  <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
  <p>${this.description.substring(0, 20)}...</p>`;
});

campgroundSchema.post(
  "findOneAndDelete",
  catchAsync(async function (doc) {
    if (doc) {
      await Review.deleteMany({
        _id: {
          $in: doc.reviews,
        },
      });
    }
  })
);

module.exports = mongoose.model("Campground", campgroundSchema);
