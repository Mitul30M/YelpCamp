const Camp = require('../models/campgrounds');
const { cloudinary } = require('../cloudinary/config');

const mapboxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mapboxGeocoding({ accessToken: mapboxToken });

module.exports.renderNewCampForm = (req, res) => {
    res.render('yelpcampViews/new');
}

module.exports.getCamps = async (req, res) => {
    let foundResults = 0;
    const { page = 1 } = req.query;
    const { searchQuery } = (req.body.searchQuery) ? req.body : req.query;
    const allCamps = await Camp.find({});
    if (searchQuery) {
        let camps = await Camp.find({
            $or: [
                { name: { $regex: new RegExp(searchQuery, 'i') } }, // Search by campground name
                { location: { $regex: new RegExp(searchQuery, 'i') } } // Search by campground location
            ]
        });
        if (camps.length) {
            foundResults = camps.length;
        }
        if (page) {
            camps = camps.slice((page * 18) - 18, page * 18);    //displaying 18camps per page
            console.log(camps.length, page);
        }
        return res.render('yelpcampViews/home', { camps, foundResults, allCamps, page, searchQuery });
    }
    let camps = allCamps;
    foundResults = camps.length;
    if (page) {
        camps = camps.slice((page * 18) - 18, page * 18);    //displaying 18camps per page
        console.log(camps.length, page);
    }
    res.render('yelpcampViews/home', { camps, foundResults, allCamps, page, searchQuery });

}

module.exports.newCamp = async (req, res, next) => {
    const newCamp = req.body.camp;
    newCamp.author = req.user._id;
    newCamp.img = req.files.map(file => ({ url: file.path, fileName: file.filename }));

    const geoData = await geocoder.forwardGeocode({
        query: newCamp.location,
        limit: 1
    }).send()
    newCamp.geometry = geoData.body.features[0].geometry;

    const camp = await new Camp(newCamp);
    console.log(newCamp, geoData);
    console.log(geoData.body.features[0].geometry);
    //from this we require the geoData.boy.features[0].geometry : it holds the [latitude,longitude] coords
    await camp.save();
    req.flash('success', 'New Camp Added Successfully!');
    res.redirect('/yelpcamp');

}

module.exports.getCamp = async (req, res) => {
    const { id } = req.params;
    const camp = await Camp.findById(id).populate({
        path: 'reviews', populate: {
            path: 'author'
        }
    }).populate('author');
    if (!camp) {
        req.flash('danger', "There's no such camp! Please enter correct details");
        return res.redirect('/yelpcamp');
    }
    res.render('yelpcampViews/show', { camp });
}

module.exports.getCampEditForm = async (req, res) => {
    const { id } = req.params;
    const camp = await Camp.findById(id);
    res.render('yelpcampViews/edit', { camp });
}

module.exports.updateCamp = async (req, res) => {
    const camp = req.body.camp;
    const { id } = req.params;

    const updateCamp = await Camp.findByIdAndUpdate(id, { ...camp }, { runValidators: true, new: true });
    req.files.forEach(file => (updateCamp.img.push({ url: file.path, fileName: file.filename })));
    const geoData = await geocoder.forwardGeocode({
        query: updateCamp.location,
        limit: 1
    }).send()
    updateCamp.geometry = geoData.body.features[0].geometry;
    if (req.body.deleteImgs) {
        req.body.deleteImgs.forEach(img => {
            cloudinary.uploader.destroy(img);
        })
        await updateCamp.updateOne({
            $pull: {
                img: {
                    fileName: {
                        $in: req.body.deleteImgs,
                    }
                }
            }
        })
    }
    await updateCamp.save();
    console.log(updateCamp);
    req.flash('success', 'Camp Info. Updated Successfully!');
    res.redirect(`/yelpcamp/${id}`);
}

module.exports.deleteCamp = async (req, res) => {
    const { id } = req.params;
    await Camp.findByIdAndDelete(id);
    res.redirect('/yelpcamp');
}