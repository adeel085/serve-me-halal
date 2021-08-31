let express = require('express');
let config = require('../config');
let dbHelper = require('../database/dbHelper');

let router = express.Router();

router.get("/:id", async (req, res) => {
    
    let id = req.params.id;
    let restaurant = await dbHelper.getRestaurantById(id);

    res.render("restaurant", {
        baseURL: config.web.baseURL,
        appName: config.web.appName,
        restaurant: restaurant
    });
});

module.exports = router;