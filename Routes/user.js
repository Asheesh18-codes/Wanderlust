const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const passport = require("passport");
const { redirectUrl } = require("../middleware.js");

// signup route
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
}); 

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) {
                req.flash('error', 'Login failed after registration.');
                return res.redirect("/signup");
            }
            req.flash('success', 'Welcome to Wanderlust!');
            const redirectPath = req.locals.redirectUrl || "/listings";
            delete req.session.redirectUrl;
            res.redirect(redirectPath);
        });
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect("/signup");
    }
}));

// login route
router.get("/login", (req, res) => {
    res.render("user/login.ejs");
});

router.post("/login",
    redirectUrl,
    passport.authenticate("local", {
        failureRedirect: '/login',
        failureFlash: true
    }),
    (req, res) => {
        req.flash('success', 'Welcome back!');
        const redirectPath = res.locals.redirectUrl || "/listings";
        delete req.session.redirectUrl;
        res.redirect(redirectPath);
    }
);

// logout route
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'Goodbye!');
        res.redirect("/listings");
    });
});

module.exports = router;
