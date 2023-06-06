const campgroundSchema = require("./schemas/campgroundSchema");
const reviewSchema = require("./schemas/reviewSchema");
const ExpressError = require("./utils/ExpressError");
const Campground = require("./models/campground");
const Review = require("./models/review");

// This is a Joi validation for a campground.
module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// This is a Joi validation for a review.
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// This is an authentication validation for a user.
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};

// This is an campground authorization for a user.
module.exports.isAuthor = async (req, res, next) => {
  const { campgroundId } = req.params;
  const campground = await Campground.findById(campgroundId);
  console.log(campground);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

// This is an review authorization for a user.
module.exports.isReviewAuthor = async (req, res, next) => {
  const { campgroundId, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/campgrounds/${campgroundId}`);
  }
  next();
};
