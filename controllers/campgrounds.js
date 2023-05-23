const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsyncErrors");

module.exports.read = catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

module.exports.create = catchAsync(async (req, res) => {
  const campground = new Campground({ ...req.body.campground });
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
});

module.exports.update = catchAsync(async (req, res) => {
  const { campgroundId } = req.params;
  const campground = await Campground.findByIdAndUpdate(campgroundId, {
    ...req.body.campground,
  });
  res.redirect(`/campgrounds/${campground._id}`);
});

module.exports.delete = catchAsync(async (req, res) => {
  const { campgroundId } = req.params;
  await Campground.deleteOne({ _id: campgroundId });
  res.redirect("/campgrounds");
});

module.exports.renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};

module.exports.renderShowPage = catchAsync(async (req, res) => {
  const { campgroundId } = req.params;
  const campground = await Campground.findById(campgroundId);
  res.render("campgrounds/show", { campground });
});

module.exports.renderEditForm = catchAsync(async (req, res) => {
  const { campgroundId } = req.params;
  const campground = await Campground.findById(campgroundId);
  res.render("campgrounds/edit", { campground });
});
