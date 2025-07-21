const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");

// validation middleware
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        return next();
    }
};

// index route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("index.ejs", { allListings });
}));

// New & Create Route
router.get("/new", (req, res) => {
    res.render("Newform.ejs");
});

router.post("/", validateListing, wrapAsync(async (req, res) => {
    const place = new Listing(req.body.listing);
    await place.save();
    req.flash('success',"Hello you've successfully Added a new listing" );
    res.redirect("/listings");
}));

// Show Route, we used it after new and create because new takes its value as id
router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("review");
    if(!listing){
        req.flash("error","listing you've requested does not exists" );
        return res.redirect("/listings");
    }
    res.render("show.ejs", { listing });
}));

// Update: Edit
router.get("/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","listing you've requested does not exists" );
        return res.redirect("/listings");
    }
    res.render("edit.ejs", { listing });
}));

router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, {
        runValidators: true,
        new: true
    });
    if (!updatedListing) {
        throw new ExpressError(404, "Listing Not Found");
    }
    req.flash('success',"Hello you've successfully Updated your listing" );
    res.redirect(`/listings/${id}`);
}));

// Delete
router.delete("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success',"Deleted your listing" );
    res.redirect("/listings");
}));

module.exports = router;
