const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listingsRoute = require("./Routes/listing.js");
const reviewRoute = require("./Routes/reviews.js");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const Session = require("express-session");
const flash = require("connect-flash");

const sessionOptions = {
    secret: "MysecretCode",
    resave: false,                // do not save session if unmodified
    saveUninitialized: true,      // new sessions are always saved
    cookie : {
        expires : Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true,
    }
};

app.use(express.urlencoded({extended:true})); // for data parsing
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)
app.set("views",path.join(__dirname,"views"));
app.use(Session(sessionOptions));
app.use(flash());

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

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    return next();
})

app.use("/listings",listingsRoute);
app.use("/listings/:id/reviews",reviewRoute);
// Catch-all for undefined routes (MUST go after all other routes)
// Catch-all 404 handler (last middleware)
app.use((req, res, next) => {
    res.status(404).render("error.ejs", {
        errorOccured: { 
            statusCode: 404, 
            message: "Page Not Found"
        }
    });
});


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