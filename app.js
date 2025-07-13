const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const Listing = require("../Full Stack Wanderlust Project/models/listing.js")
const Review = require("../Full Stack Wanderlust Project/models/review.js")
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");

app.use(express.urlencoded({extended:true})); // for data parsing
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)
app.set("views",path.join(__dirname,"views"));

const validateListing = (req,res,next)=>{
    let  {error}= listingSchema.validate(req.body)
    if(error){
        let errMsg = error.details.map((el)=>{
            el.message
        }).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        return next();
    }
};
const validateReview = (req,res,next)=>{
    let  {error}= reviewSchema.validate(req.body)
    if(error){
        let errMsg = error.details.map((el)=>{
            el.message
        }).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        return next();
    }
};

main()
    .then((res)=>{console.log("connected to DB")})
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

//indexRoute
app.get("/",(req,res)=>{
    res.redirect("/listings")
})
app.get("/listings",wrapAsync(async (req,res)=>{
    const allListings = await Listing.find({})
    res.render("index.ejs",{allListings})
}));

//New & Create Route
app.get("/listings/new",(req,res)=>{
    res.render("Newform.ejs")
})

app.post("/listings",validateListing,wrapAsync(async (req,res,next)=>{
    const place = new Listing(req.body.listing)
    await place.save()
    res.redirect("/listings")
}))



//Show Route, we used it after new and create because new takes it's value as id
app.get("/listings/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing =await Listing.findById(id).populate("review")
    res.render("show.ejs",{listing})
}))

//update: Edit
app.get("/listings/:id/edit", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing =await Listing.findById(id)
    res.render("edit.ejs",{listing})
}))
app.put("/listings/:id", validateListing,wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, listingData, {
        runValidators: true,
        new: true
    });
    res.redirect(`/listings/${id}`);
}));

//Add review
app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    const { id } = req.params;

    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${id}`)
}))

//Delete Review
app.delete("/listings/:id/review/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {review : reviewId}});
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/listings/${id}`)
}))

//Delete
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id)
    res.redirect("/listings");
}));
// Catch-all for undefined routes (MUST go after all other routes)
// Catch-all 404 handler (last middleware)
// app.all("*",(req, res, next) => {
//     next(new ExpressError(404, "Page Not Found"));
// });


//validation and server side error handling
app.use((err, req, res, next) => {
    // Default error values
    const { statusCode = 500, message = "Something went wrong!" } = err;

    // Specific error type handling
    if (err.name === "ValidationError" || err.name === "CastError") {
        return res.status(400).render("error.ejs", {
            errorOccured: { 
                statusCode: 400, 
                message: err.message || "Validation Error"
            }
        });
    }

    // Generic error rendering
    res.status(statusCode).render("error.ejs", {
        errorOccured: { 
            statusCode, 
            message 
        }
    });
});
//listening
app.listen(port,()=>{
    console.log("Listening")
});