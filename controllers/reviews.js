const Camp = require('../models/campgrounds');
const Review = require('../models/reviews');

module.exports.newReview = async (req, res, next) => {
    const { id } = req.params;
    const review = req.body.review;
    const newReview = await new Review(review);
    // console.log(newReview);
    newReview.author = req.user._id;
    await newReview.save();
    const camp = await Camp.findById(id);
    camp.reviews.push(newReview);
    await camp.save();
    req.flash("success", "Review added successfully!");
    res.redirect(`/yelpcamp/${id}`);

}

module.exports.deleteReview = async (req, res, next) => {
    const { id, reviewId } = req.params;
    await Camp.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/yelpcamp/${id}`);
}