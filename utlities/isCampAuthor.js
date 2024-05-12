const Camp = require('../models/campgrounds');
const isCampAuthor = async (req, res, next) => {
    const { id } = req.params;
    const camp = await Camp.findById(id);
    if (!camp) {
        req.flash('danger', "There's no such camp! Please enter correct details");
        return res.redirect('/yelpcamp');
    }
    if (!camp.author.equals(req.user._id)) {
        req.flash('danger', "You don't have permission to do that!");
        return res.redirect(`/yelpcamp/${id}`);
    }
    next();
}

module.exports = isCampAuthor;