const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js")
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const { createReview, deleteReview } = require("../controllers/review.js");

//Add review
router.post("/", isLoggedIn, validateReview, wrapAsync(createReview));

//Delete Review
router.delete("/:reviewId", isLoggedIn,isReviewAuthor,wrapAsync(deleteReview));

module.exports = router;
