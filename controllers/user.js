const User = require("../models/user.js");

module.exports.renderSignUpForm = (req, res) => {
    res.render("user/signup.ejs");
}

module.exports.signup = async (req, res) => {
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
            const redirectPath = res.locals.redirectUrl || "/listings"; // <-- FIXED HERE
            delete req.session.redirectUrl;
            res.redirect(redirectPath);
        });
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect("/signup");
    }
}

module.exports.renderLoginForm =  (req, res) => {
    res.render("user/login.ejs");
}

module.exports.login = (req, res) => {
        req.flash('success', 'Welcome back!');
        const redirectPath = res.locals.redirectUrl || "/listings";
        delete req.session.redirectUrl;
        res.redirect(redirectPath);
    }

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'Goodbye!');
        res.redirect("/listings");
    });
}