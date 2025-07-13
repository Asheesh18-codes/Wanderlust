const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listingsRoute = require("./Routes/listing.js");
const reviewRoute = require("./Routes/reviews.js")

app.use(express.urlencoded({extended:true})); // for data parsing
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)
app.set("views",path.join(__dirname,"views"));

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

app.use("/listings",listingsRoute);
app.use("/listings/:id/reviews",reviewRoute);
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