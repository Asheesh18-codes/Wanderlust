const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN || 'your_mapbox_token_here';
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("index.ejs", { allListings });
}

module.exports.renderNewForm =  (req, res) => {
    res.render("Newform.ejs");
}

module.exports.createListing = async (req, res) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send()
    let url = req.file.path
    let filename = req.file.filename
    const place = new Listing(req.body.listing);
    place.owner = req.user._id; // Set the owner to the currently logged-in user
    place.image = {filename,url}; // Set the image URL and filename
    place.geometry = {
        type: 'Point',
        coordinates: response.body.features[0].geometry.coordinates
    };
    await place.save();
    req.flash('success',"Hello you've successfully Added a new listing" );
    res.redirect("/listings");
}

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
                                .populate({
                                            path: "review",
                                            populate: { path: "author" }
                                        }) // Populate reviews and their authors
                                .populate("owner");     // Populate owner to get user details
    if(!listing){
        req.flash("error","listing you've requested does not exists" );
        return res.redirect("/listings");
    }
    res.render("show.ejs", { 
        listing,
        mapToken, // Pass the map token to the view
        coordinates: listing.geometry.coordinates // Pass the coordinates for the map
        }); 
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","listing you've requested does not exists" );
        return res.redirect("/listings");
    }
    res.render("edit.ejs", { listing });
}

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, {
        runValidators: true,
        new: true
    });
    let url = req.file.path
    let filename = req.file.filename
    if(typeof req.file !== 'undefined') {
        updatedListing.image = {filename,url}; // Update the image URL and filename
    }
    await updatedListing.save();
    if (!updatedListing) {
        throw new ExpressError(404, "Listing Not Found");
    }
    req.flash('success',"Hello you've successfully Updated your listing" );
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success',"Deleted your listing" );
    res.redirect("/listings");
}