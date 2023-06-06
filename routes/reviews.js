const express = require("express");
const router = express.Router({ mergeParams: true });
const review = require("../controllers/reviews");
const { isLoggedIn, isAuthor, validateReview } = require("../middlewares");

router.post("/", validateReview, isLoggedIn, review.create);
router.delete("/:reviewId", isLoggedIn, isAuthor, review.delete);

module.exports = router;
