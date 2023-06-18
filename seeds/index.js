// ############################ Database Connection ###########################################
const mongoose = require("mongoose");
const dbPath = "mongodb://127.0.0.1:27017/yelp-demo";

mongoose
  .connect(dbPath)
  .then(() => {
    console.log("Database connectioned succesfully");
  })
  .catch((err) => {
    console.log("Error occured when trying to connect the database.", err);
  });
// ##########################################################################################

// ############################ Database Seed Logic #########################################

// It accepts an array as a argument and returns its one random element.
const sampleElementOf = (array) => {
  const randomIdx = Math.floor(Math.random() * array.length);
  return array[randomIdx];
};

const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

// it seeds database with some sample stuff for development purpose.
const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const sampleCity = sampleElementOf(cities);
    const location = `${sampleCity.name}, ${sampleCity.region}`;
    const title = `${sampleElementOf(descriptors)} ${sampleElementOf(places)}`;
    const image = "Image url";
    const description =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea consequuntur amet qui enim laboriosam deserunt, esse eligendi blanditiis incidunt ipsam distinctio quam tempora quasi, debitis eum? Aperiam ducimus placeat voluptate!";
    const price = 20;
    const author = "647e2df05185bded2d44bbc3";
    const geometry = {
      type: "Point",
      coordinates: [sampleCity.longitude, sampleCity.latitude],
    };

    const campground = new Campground({
      location,
      title,
      description,
      image,
      price,
      author,
      geometry,
    });
    await campground.save();
  }
};

seedDb().then(() => {
  console.log(
    "Database seed operations completed succesfully. Dabatabase connection is closed."
  );
  mongoose.connection.close();
});
// ##########################################################################################
