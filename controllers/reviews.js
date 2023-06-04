const Campground = require("../models/campground");
const Review = require("../models/review");
const catchAsync = require("../utils/catchAsyncErrors");

module.exports.create = catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.campgroundId);
  const review = new Review(req.body.review);
  campground.reviews.push(review);
  await campground.save();
  await review.save();
  req.flash('success', 'Created new review!');
  res.redirect(`/campgrounds/${campground._id}`);
});

module.exports.delete = catchAsync(async (req, res) => {
  const { campgroundId, reviewId } = req.params;
  const campground = await Campground.findById(campgroundId);
  await Campground.findByIdAndUpdate(campgroundId, {
    $pull: { reviews: reviewId },
  });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Successfully deleted review')
  res.redirect(`/campgrounds/${campground._id}`);
});
