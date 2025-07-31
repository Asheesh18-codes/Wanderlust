const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listingsRoute = require("./Routes/listing.js");
const reviewRoute = require("./Routes/reviews.js");
const Session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("./models/user.js");
const userRoute = require("./Routes/user.js");
const {isLoggedIn} = require("./middleware.js");

const sessionOptions = {
    name: 'session', // avoids default cookie name 'connect.sid'
    secret: process.env.SESSION_SECRET || "MysecretCode",
    resave: false, // prevents resaving session if unmodified
    saveUninitialized: false, // prevents saving uninitialized sessions
    cookie: {
        httpOnly: true,
        secure: true, // set to true if using HTTPS
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
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
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate())); // use local strategy for authentication

passport.serializeUser(user.serializeUser()); // serialize user to store in session
passport.deserializeUser(user.deserializeUser()); // deserialize user from session

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

// Middleware to set flash messages and current user
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use("/listings",listingsRoute); //route for listings
app.use("/listings/:id/reviews",isLoggedIn,reviewRoute); //route for reviews
app.use("/",userRoute); //route for user authentication

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
app.listen(port, () => {
    console.log(`Wanderlust server running on http://localhost:${port}`);
});

# Wanderlust

Wanderlust is a full-stack web application for listing, reviewing, and managing travel accommodations. Built with Node.js, Express, MongoDB, and EJS, it allows users to sign up, log in, create listings, and leave reviews.

## Features

- User authentication (signup, login, logout)
- Create, edit, and delete listings
- Leave reviews on listings
- Flash messages for user feedback
- Responsive UI with Bootstrap and custom CSS

## Folder Structure

```
.
├── app.js
├── middleware.js
├── schema.js
├── models/
├── Routes/
├── utils/
├── init/
├── public/
├── views/
└── package.json
```

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB running locally

### Installation

1. Clone the repository:
    ```sh
    git clone <your-repo-url>
    cd Full-Stack-Wanderlust-Project
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. (Optional) Seed the database:
    ```sh
    node init/index.js
    ```

4. Start the server:
    ```sh
    node app.js
    ```

5. Visit [http://localhost:8080](http://localhost:8080) in your browser.

## Environment Variables

- `SESSION_SECRET` (optional): Set a custom session secret for production.

## Technologies Used

- Node.js, Express
- MongoDB, Mongoose
- Passport.js (authentication)
- EJS & EJS-Mate (templating)
- Bootstrap 5, Font Awesome

## License

MIT

---

*This project is for educational purposes.*