const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const passport = require("passport");
const { redirectUrl } = require("../middleware.js");
const { renderSignUpForm, signup, renderLoginForm, login, logout } = require("../controllers/user.js");

// Signup routes
router.route("/signup")
    .get(renderSignUpForm)
    .post(wrapAsync(signup));

// Login routes
router.route("/login")
    .get(renderLoginForm)
    .post(
        redirectUrl,
        passport.authenticate("local", {
            failureRedirect: '/login',
            failureFlash: true
        }),
        login
    );

// Logout route
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'Goodbye!');
        res.redirect("/listings");
    });
});

module.exports = router;
