const ExpressError = require('./ExpressError');
const {campSchema} = require('./joiExtensions');
const validateCamp = (req, res, next) => {
    if (!req.body.camp) throw new ExpressError(400, "Invalid/Incomplete Campground Data.");

    const { error } = campSchema.validate(req.body);

    if (error) {
        console.log(error);
        const message = error.details.map(el => el.message).join(' , ');
        throw new ExpressError(400, message);
    }

    next();
}

module.exports = validateCamp;