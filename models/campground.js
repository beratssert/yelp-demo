const mongoose = require("mongoose");
const { Schema } = mongoose;
const catchAsync = require("../utils/catchAsyncErrors");
const Review = require("./review");

const campgroundSchema = new Schema({
  title: String,
  location: String,
  price: Number,
  description: String,
  image: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
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
