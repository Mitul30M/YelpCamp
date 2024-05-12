
//middleware for to check if the user is loggedin
const isLoggedIn = (req, res, next)=>{
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;  //to redirect user to the page he was on before logging in
        req.flash('danger', 'You should be logged in to do that action!');
        return res.redirect('/yelpcamp/user/login');
    }
    next();
}

module.exports = isLoggedIn;