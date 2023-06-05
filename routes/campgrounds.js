const express = require("express");
const router = express.Router();

const campground = require("../controllers/campgrounds");
const { validateCampground } = require("../middlewares");
const { isLoggedIn } = require("../middlewares");

router
  .route("/")
  .get(campground.read)
  .post(validateCampground, isLoggedIn, campground.create);
router.get("/new", isLoggedIn, campground.renderNewForm);
router
  .route("/:campgroundId")
  .get(campground.renderShowPage)
  .put(validateCampground, isLoggedIn, campground.update)
  .delete(isLoggedIn, campground.delete);
router.get("/:campgroundId/edit", campground.renderEditForm);

module.exports = router;
