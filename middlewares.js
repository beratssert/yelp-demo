const { campgroundSchema } = require("./schemas");
const ExpressError = require("./utils/ExpressError");

// This is a Joi validation for campground.
module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
