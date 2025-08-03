if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js"); 
const { validateListing,isLoggedIn, isOwner } = require("../middleware.js");
const { index,renderNewForm,createListing,showListing,renderEditForm,updateListing,destroyListing } = require("../controllers/listing.js");
const multer = require("multer");
const { cloudinary, storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
    // Index Route
    .get(wrapAsync(index))
    // Create Route
    .post( isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(createListing));

// New Route
router.get("/new",isLoggedIn,renderNewForm);

router.route("/:id")
    // Show Route
    .get(wrapAsync(showListing))
    // Update Route
    .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(updateListing))
    // Delete Route
    .delete(isLoggedIn,isOwner,wrapAsync(destroyListing));

// Update: Edit
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(renderEditForm));

module.exports = router;