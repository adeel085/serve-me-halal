let express = require('express');
let config = require('../config');
let dbHelper = require('../database/dbHelper');

let router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        baseURL: config.web.baseURL,
        appName: config.web.appName
    });
});

router.get("/restaurantsLocation", async (req, res) => {
    let result = await dbHelper.getRestaurantsLocation(req.query.q);
    res.send(result);
});

router.get("/foodTypes", async (req, res) => {
    let result = await dbHelper.getFoodTypes(req.query.q);
    res.send(result);
});

module.exports = router;