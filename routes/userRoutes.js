const express = require('express');
const catchAsyncError = require('../utlities/catchAsyncError');
const User = require('../models/users');
const passport = require('passport');
const { storeReturnTo } = require('../utlities/storeReturnTo');

const controller = require('../controllers/user');
const router = express.Router();


router.route('/register')
    .get(controller.renderRegisterForm)
    .post(catchAsyncError(controller.register));

router.route('/login')
    .get(controller.renderLoginForm)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/yelpcamp/user/login' }), controller.login);

router.get('/logout', controller.logout);

module.exports = router;










//demo :
// app.get('/fakeUser', async (req, res) => { //demo
//     const demoUSer = await new User({ email: 'mitul30m@gmail.com', username: 'Mitul30M' });
//     const newUser = await User.register(demoUSer, 'Mitul@30M');
//     res.send(newUser);
// })