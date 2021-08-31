let express = require('express');
let config = require('../config');
let dbConnection = require('../database/dbConnection');
let dbHelper = require('../database/dbHelper');

let router = express.Router();

router.get("/:id", async (req, res) => {
    
    let id = req.params.id;

    let conn = await dbConnection.connect();
    let restaurant = await dbHelper.getRestaurantById(conn, id);
    dbConnection.disconnect(conn);

    res.render("restaurant", {
        baseURL: config.web.baseURL,
        appName: config.web.appName,
        restaurant: restaurant
    });
});

module.exports = router;