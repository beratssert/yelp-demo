const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const campgroundsRoute = require("./routes/campgrounds");
const reviewsRoute = require("./routes/reviews");
const userRoutes = require("./routes/users");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");
const sessionConfig = require("./configs/sessionConfig");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/campgrounds", campgroundsRoute);
app.use("/campgrounds/:campgroundId/reviews", reviewsRoute);
app.use("/", userRoutes);

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
