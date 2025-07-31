// validation middleware
const listingSchema = require("./schema.js").listingSchema;
const ExpressError = require("./utils/ExpressError.js");

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        return next();
    }
};
//validation Middleware for reviews
const reviewSchema = require("./schema.js").reviewSchema;

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        return next();
    }
};


// Middleware to check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in");
        return res.redirect("/login");
    }
    next();
}

// Middleware to redirect to the original URL after login
module.exports.redirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

// Middleware to check if the user is the owner of the listing
const Listing = require("./models/listing");

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found.");
        return res.redirect("/listings");
    }
    const currentUser = res.locals.currentUser || req.user;
    if (!listing.owner.equals(currentUser._id)) {
        req.flash("error", "You are not authorized to edit this listing");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

// Middleware to check if the user is the owner of the review
const Review = require("./models/review");

module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You don't have permission to do that.");
        return res.redirect(`/listings/${req.params.id}`);
    }
    next();
};
