const Review = require('../models/reviews');

const isReviewAuthor = async (req, res, next) => {
    const { reviewId ,id} = req.params;
    const review = await Review.findById(reviewId);
    if (!review || !review.author.equals(req.user._id)) {
        req.flash("danger", "You don't have permission to do that!!");
        return res.redirect(`/yelpcamp/${id}`);
    }
    next();
}