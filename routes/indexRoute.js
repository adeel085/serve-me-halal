let express = require('express');
let config = require('../config');
let dbConnection = require('../database/dbConnection');
let dbHelper = require('../database/dbHelper');

let router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        baseURL: config.web.baseURL,
        appName: config.web.appName
    });
});

router.get("/restaurantsLocation", async (req, res) => {
    let conn = await dbConnection.connect();
    let result = await dbHelper.getRestaurantsLocation(conn, req.query.q);
    dbConnection.disconnect(conn);
    res.send(result);
});

router.get("/foodTypes", async (req, res) => {
    let conn = await dbConnection.connect();
    let result = await dbHelper.getFoodTypes(conn, req.query.q);
    dbConnection.disconnect(conn);
    res.send(result);
});

module.exports = router;