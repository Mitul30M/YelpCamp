if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

//packages and utillities 
const express = require('express');
const mongoose = require('mongoose');

const dbUrl = process.env.MONGO_ATLAS_DB_URL;
// const dbUrl = "mongodb://127.0.0.1:27017/yelp-camp";

const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
// const catchAsyncError = require('./utlities/catchAsyncError');
const ExpressError = require('./utlities/ExpressError');
// const joi = require('joi');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const MongoStore = require('connect-mongo');

//mongoose models and schema validations
// const Camp = require('./models/campgrounds');
// const Review = require('./models/reviews');
const User = require('./models/users');
// const campSchema = require('./utlities/joiCampValidation');
// const reviewSchema = require('./utlities/joiReviewValidation');


//connecting the database : DB name : yelp-camp
mongoose.connect(dbUrl)
    .then(() => {
        console.log("connection to database successfull");
    })
    .catch(error => {
        console.log("connection to database unsuccessfull !!! ", error);
    })


//starting up the express server
const app = express();
//bringing in various routes and enabling them through middlewares
const yelpcampRoutes = require('./routes/yelpcampRoutes');
const reviewRoutes = require('./routes/reviewsRoutes');
const userRoutes = require('./routes/userRoutes');
const { name } = require('ejs');


//app configs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//app middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'asecretkeyforyelpcamp'
    }
});

//in case of any store error:
store.on('error', (err) => {
    console.log("Session Error!! ", err);
})



//session middleware and flash
const sessionConfig = {
    store,
    name:'yelpcampSessionInfo',
    secret: "asecretkeyforyelpcamp",
    resave: false,
    saveUninitialized: true,
    cookie: {
        // secure:true, //works only with https not http
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // cookie expires automatically after a week.. must!!!
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
};
app.use(session(sessionConfig));
app.use(flash());

//configuring passport-local for Auth
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Passport middleware setup (before defining routes)
app.use(passport.initialize());
app.use(passport.session());

// To remove data using these defaults:
app.use(mongoSanitize());

// Or, to replace these prohibited characters with _, use:
app.use(
    mongoSanitize({
        replaceWith: '_',
    }),
);

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://api.mapbox.com", "https://cdn.jsdelivr.net",   ],
                styleSrc: ["'self'", "'unsafe-inline'", "https://api.mapbox.com", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"],
                fontSrc: ["'self'", "https://fonts.gstatic.com"],
                imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
                connectSrc: ["'self'", "https://api.mapbox.com", "https://events.mapbox.com"],
                workerSrc: ["'self'", 'blob:']
            },
        },
    })
);

//local variabls : all views have access to these
app.use((req, res, next) => {
    // console.log(req.session);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.danger = req.flash('danger');
    next();
})

//middlewares for routes
app.use('/yelpcamp', yelpcampRoutes);
app.use('/yelpcamp/:id/reviews',reviewRoutes);
app.use('/yelpcamp/user', userRoutes);


app.all('*', (req, res, next) => {    //if nothiing else matches throw this error 
    next(new ExpressError(404, "Page not Found!!"));
})

//error handler
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went Wrong" } = err;
    res.status(status).render('yelpcampViews/error', { err ,status });
})


//port specifier
app.listen(3030, () => {
    console.log("YelpCamp live on 3030 - mitul");
})