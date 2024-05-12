const User = require('../models/users');

module.exports.renderRegisterForm = async (req, res) => {
    res.render('yelpcampViews/userviews/register')
}

module.exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Account Registered Successfully');
            res.redirect('/yelpcamp');
        })
    } catch (err) {
        req.flash('danger', `${err.message}`);
        res.redirect('/yelpcamp/user/register');
    }

}

module.exports.renderLoginForm = async (req, res) => {
    res.render('yelpcampViews/userviews/login')
}

module.exports.login = (req, res) => {
    req.login(req.user, function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', `Welcome Back ${req.user.username}!`);
        const redirectUrl = res.locals.returnTo || '/yelpcamp';
        res.redirect(redirectUrl)
    });
}

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'You have been Logged-Out Successfully');
        res.redirect('/yelpcamp');

    })
}