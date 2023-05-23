const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const campgroundsRoute = require("./routes/campgrounds");
const ExpressError = require("./utils/ExpressError");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/campgrounds", campgroundsRoute);

app.get("/", (req, res) => {
  res.send("This is home page.");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page is not found.", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something goes wrong." } = err;
  res.status(statusCode).send(message);
});

module.exports = app;
