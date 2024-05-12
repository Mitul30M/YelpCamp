const mongoose = require('mongoose');
const { use } = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        required: true,
        type:String
    }
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);