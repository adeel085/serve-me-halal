let express = require('express');
let config = require('../config');
let dbConnection = require('../database/dbConnection');
let dbHelper = require('../database/dbHelper');

let router = express.Router();

router.get("/", async (req, res) => {

    let location = req.query.location;
    let foodType = req.query.foodType;

    let conn = await dbConnection.connect();
    let restaurants = await dbHelper.getRestaurantsByLocationAndFoodType(conn, foodType, location);

    if (restaurants.length == 0) {
        restaurants = await dbHelper.getRestaurantsByLocation(conn, location);
    }

    dbConnection.disconnect(conn);

    res.render("results", {
        baseURL: config.web.baseURL,
        appName: config.web.appName,
        restaurants: restaurants,
        location: location,
        search: foodType
    });
});

module.exports = router;