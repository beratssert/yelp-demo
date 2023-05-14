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

// ############################ Server Connection ###########################################
const express = require("express");
const app = express();
const port = 3000;

const methodOverride = require("method-override");
const path = require("path");
const campgroundsRoute = require("./routes/campgrounds");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/campgrounds", campgroundsRoute);

app.get("/", (req, res) => {
  res.send("This is home page.");
});

app.listen(port, () => {
  console.log(`Yelp-demo app listening on port ${port}`);
});
// ##########################################################################################
