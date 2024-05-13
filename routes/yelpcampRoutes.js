const express = require('express');
const catchAsyncError = require('../utlities/catchAsyncError');
const validateCamp = require('../utlities/validateCamp')
const isLoggedIn = require('../utlities/isLoggedIn');
const isCampAuthor = require('../utlities/isCampAuthor');

//for uploading imgs to Cloudinary
const { storage, cloudinary } = require('../cloudinary/config');
const multer = require('multer')
const upload = multer({ storage });

const controller = require('../controllers/yelpcamp');
const router = express.Router();


router.route('/')
    .get(catchAsyncError(controller.getCamps))
    // .post(, (req, res) => {
    //     console.log(req.body, req.files);
    //     res.redirect('/yelpcamp');
    // })
    .post(isLoggedIn, upload.array('image', 7), validateCamp, catchAsyncError(controller.newCamp));

router.get('/new', isLoggedIn, controller.renderNewCampForm);

router.route('/:id')
    .get(catchAsyncError(controller.getCamp))
    .patch(isLoggedIn, isCampAuthor, upload.array('image', 7), validateCamp, catchAsyncError(controller.updateCamp))
    .delete(isLoggedIn, isCampAuthor, catchAsyncError(controller.deleteCamp))

router.get('/:id/edit', isLoggedIn, isCampAuthor, catchAsyncError(controller.getCampEditForm));





module.exports = router;