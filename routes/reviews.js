const express = require("express");
const router = express.Router({ mergeParams: true });
const review = require("../controllers/reviews");
const { validateReview } = require("../middlewares");

router.post("/", validateReview, review.create);
router.delete("/:reviewId", review.delete);

module.exports = router;
