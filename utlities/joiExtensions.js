const baseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {}
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value });
                return clean;
            }
        }
    }
});

const joi = baseJoi.extend(extension);

const campSchema = joi.object({
    camp: joi.object({
        name: joi.string().required().escapeHTML(),
        price: joi.number().min(1).required(),
        description: joi.string().required().escapeHTML(),
        // img: joi.string(),
        location: joi.string().required().escapeHTML()
    }).required(),
    deleteImgs: joi.array()
});

const reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().min(1).max(5).required(),
        comment: joi.string().required().escapeHTML(),
    })

}).required();

module.exports.reviewSchema = reviewSchema;
module.exports.campSchema = campSchema;
