if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const axios = require('axios');
const mongoose = require('mongoose');
const Camp = require('../models/campgrounds');
const mapboxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mapboxGeocoding({ accessToken: mapboxToken });


const params = {
    collections: "DSpWkevZa94,10489597,8667598",
    client_id: "4oDIt3cat9zd4DTRnivE4MazovlCYIw2uxogJv6xEhY",
    orientation: "landscape"
}


const cities = require('./cities');

const dbUrl = process.env.MONGO_ATLAS_DB_URL;
// const dbUrl = "mongodb://127.0.0.1:27017/yelp-camp";

mongoose.connect(dbUrl)
    .then(() => {
        console.log("connection to database successfull");
        const seedData = async () => {

            // await Camp.deleteMany({});

            for (let i = 0; i < 50; ++i) {
                
                let randomNo = Math.floor(Math.random() * 1000) + 1;
                let location = `${cities[randomNo].city} ${cities[randomNo].state}`;
                let name = `${cities[randomNo].city} Camps`

                const getImg = async () => {
                    const response = await axios.get("https://api.unsplash.com/photos/random", { params });
                    const imgData = await response.data;
                    return imgData.urls.raw;
                }

                const getCoords = async function () {
                    const geoData = await geocoder.forwardGeocode({
                        query: location,
                        limit: 1
                    }).send()
                    // console.log(geoData.body.features[0].geometry)
                    return geoData.body.features[0].geometry;
                }

                const camp = new Camp({
                    author: '6640804415c373ee80c58784',
                    name,
                    geometry: await getCoords(),
                    location,
                    price: `${Math.floor(Math.random() * 100) + 50}`,
                    img: [
                        {
                            url: await getImg(),
                            fileName: `CampImg${randomNo}`
                        }
                    ],
                    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde molestiae ducimus magnam illum accusamus, consequuntur incidunt nihil consequatur voluptatem architecto consectetur corporis quam in quisquam dignissimos voluptas quasi deleniti sapiente."
                });
                await camp.save();
                console.log(camp);
            }
        }
        seedData();
    })
    .catch(error => {
        console.log("connection to database unsuccessfull !!! ", error);
    })









