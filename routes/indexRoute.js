let express = require('express');
let config = require('../config');
let dbConnection = require('../database/dbConnection');
let dbHelper = require('../database/dbHelper');

let router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        baseURL: config.web.baseURL,
        appName: config.web.appName,
        user: req.session.user ? req.session.user : undefined,
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

router.post("/addRestaurant", async (req, res) => {
    if(req.session.user) {
        let { name, description, cuisine, website, facebook, phone,
              address, halalStatus, workingHours, latitude, longitude,
              imageLink, zipCode } = req.body;

        if(req.session.user.type === "admin") {
            let conn = await dbConnection.connect();
            let result = await dbHelper.addNewRestaurant(conn, name, description, cuisine, website, facebook, phone, address, halalStatus, workingHours, latitude, longitude, imageLink, zipCode, 0, "true");
            dbConnection.disconnect(conn);
            res.json(200);
        }
        else {
            let conn = await dbConnection.connect();
            let result = await dbHelper.addNewRestaurantRequest(conn, name, description, cuisine, website, facebook, phone, address, halalStatus, workingHours, latitude, longitude, imageLink, zipCode, req.session.user.id, "false");
            dbConnection.disconnect(conn);

            res.json(200);
        }        
    }
    else {
        res.redirect("/login");
    }
})

module.exports = router;