const express = require('express');
const mongoose = require('mongoose');
const catchAsyncError = require('../utlities/catchAsyncError');
const ExpressError = require('../utlities/ExpressError');
const Camp = require('../models/campgrounds');
const Review = require('../models/reviews');
const {reviewSchema} = require('../utlities/joiExtensions');
const validateReview = (req, res, next) => {
    if (!req.body.review) throw new ExpressError(400, "Invalid/Incomplete Review.");

    const { error } = reviewSchema.validate(req.body);

    if (error) {
        console.log(error);
        const message = error.details.map(el => el.message).join(' , ');
        throw new ExpressError(400, message);
    }

    next();
}
const isLoggedIn = require('../utlities/isLoggedIn');

const controller = require('../controllers/reviews');
const router = express.Router({ mergeParams: true });

router.post('/', isLoggedIn, validateReview, catchAsyncError(controller.newReview));

router.delete('/:reviewId', catchAsyncError(controller.deleteReview));


module.exports = router;