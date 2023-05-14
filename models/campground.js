const mongoose = require("mongoose");
const { Schema } = mongoose;

const campgroundSchema = new Schema({
  title: String,
  location: String,
  price: String,
  description: String,
});

module.exports = mongoose.model("Campground", campgroundSchema);
