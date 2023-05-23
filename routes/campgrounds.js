const express = require("express");
const router = express.Router();

const campground = require("../controllers/campgrounds");
const { validateCampground } = require("../middlewares");

router
  .route("/")
  .get(campground.read)
  .post(validateCampground, campground.create);
router.get("/new", campground.renderNewForm);
router
  .route("/:campgroundId")
  .get(campground.renderShowPage)
  .put(validateCampground, campground.update)
  .delete(campground.delete);
router.get("/:campgroundId/edit", campground.renderEditForm);

module.exports = router;
