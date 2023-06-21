const express = require("express");
const router = express.Router();

const campground = require("../controllers/campgrounds");
const { isLoggedIn, isAuthor, validateCampground } = require("../middlewares");

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(campground.read)
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    campground.create
  );
router.get("/new", isLoggedIn, campground.renderNewForm);
router
  .route("/:campgroundId")
  .get(campground.renderShowPage)
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    campground.update
  )
  .delete(isLoggedIn, isAuthor, campground.delete);
router.get("/:campgroundId/edit", campground.renderEditForm);

module.exports = router;
