let express = require('express');
let config = require('../config');
let dbHelper = require('../database/dbHelper');

let router = express.Router();

router.get("/", async (req, res) => {

    let location = req.query.location;
    let foodType = req.query.foodType;

    let restaurants = await dbHelper.getRestaurantsByLocationAndFoodType(foodType, location);

    if (restaurants.length == 0) {
        restaurants = await dbHelper.getRestaurantsByLocation(location);
    }

    res.render("results", {
        baseURL: config.web.baseURL,
        appName: config.web.appName,
        restaurants: restaurants,
        location: location,
        search: foodType
    });
});

module.exports = router;