
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./reviews');
const { string } = require('joi');
const { cloudinary } = require('../cloudinary/config');

const opts = { toJSON: { virtuals: true } };

const campSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String
    },
    price: {
        type: Number,
        default: 599,
        min: 1
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    img: [{
        fileName: String,
        url: String
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]

},opts);

campSchema.virtual("properties.campLink").get(function (){
    return `/yelpcamp/${this._id}`;
})
campSchema.virtual("properties.campName").get(function () {
    return `${this.name}`;
})
campSchema.virtual("properties.getCampBannerImg").get(function () {
    return `${this.img[0].url}`;
})

campSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } });
        doc.img.forEach(image => {
            console.log(image);
            cloudinary.uploader.destroy(image.fileName);
        })
    }
})



module.exports = mongoose.model('Camp', campSchema);