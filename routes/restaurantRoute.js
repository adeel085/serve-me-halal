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
        restaurant: restaurant,
        APIKey: config.google.APIKey,
        user: req.session.user ? req.session.user : undefined,
    });
});

router.post("/:id/claimBusiness", async (req, res) => {

    let restaurantID = req.params.id;
    let { name, email, phone, website } = req.body;

    let conn = await dbConnection.connect();
    await dbHelper.addClaimRequest(conn, req.session.user.id, restaurantID, name, phone, email, website, "pending");
    dbConnection.disconnect(conn);

    res.json(200);

});

module.exports = router;