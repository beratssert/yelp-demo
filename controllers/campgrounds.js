const Campground = require("../models/campground");

module.exports.read = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

module.exports.create = async (req, res) => {
  const { title, location } = req.body.campground;
  const campground = new Campground({ title, location });
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.update = async (req, res) => {
  const { campgroundId } = req.params;
  const campground = await Campground.findByIdAndUpdate(campgroundId, {
    ...req.body.campground,
  });
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.delete = async (req, res) => {
  const { campgroundId } = req.params;
  await Campground.deleteOne({ _id: campgroundId });
  res.redirect("/campgrounds");
};

module.exports.renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};

module.exports.renderShowPage = async (req, res) => {
  const { campgroundId } = req.params;
  const campground = await Campground.findById(campgroundId);
  res.render("campgrounds/show", { campground });
};

module.exports.renderEditForm = async (req, res) => {
  const { campgroundId } = req.params;
  const campground = await Campground.findById(campgroundId);
  res.render("campgrounds/edit", { campground });
};
