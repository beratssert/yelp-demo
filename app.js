const express = require("express");
const app = express();

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

module.exports = app;
