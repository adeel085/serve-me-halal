let express = require('express');
let config = require('../config');
let dbConnection = require('../database/dbConnection');
let dbHelper = require('../database/dbHelper');

let router = express.Router();

router.get("/", async (req, res) => {

    let location = req.query.location;
    let foodType = req.query.foodType;

    let conn = await dbConnection.connect();

    let restaurants = await dbHelper.getRestaurantByZipAndFoodType(conn, foodType, location);

    if (restaurants.length == 0) {
        restaurants = await dbHelper.getRestaurantsByLocationAndFoodType(conn, foodType, location);
    }

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

router.get("/long-island-and-new-york", async (req, res) => {

    let conn = await dbConnection.connect();

    let restaurants = await dbHelper.getRestaurantsByLocation(conn, "long island");
    restaurants = [...restaurants, ...await dbHelper.getRestaurantsByLocation(conn, "new york")];

    let filteredRestaurants = [];

    let ids = new Map();
    restaurants.forEach(restaurant => {
        if (ids.get(restaurant.id) === undefined) {
            ids.set(restaurant.id, "1");
            filteredRestaurants.push(restaurant);
        }
    });

    dbConnection.disconnect(conn);

    res.render("results", {
        baseURL: config.web.baseURL,
        appName: config.web.appName,
        restaurants: filteredRestaurants,
        location: "Long Island & New York",
        search: ""
    });
});

module.exports = router;