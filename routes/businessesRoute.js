let express = require('express');
let config = require('../config');
let dbConnection = require('../database/dbConnection');
let dbHelper = require('../database/dbHelper');

let router = express.Router();

router.get("/", async (req, res) => {
    if(req.session.user) {

        let conn = await dbConnection.connect();
        let businesses = await dbHelper.getMyBusinesses(conn, req.session.user.id);
        dbConnection.disconnect(conn);

        res.render("businesses", {
            baseURL: config.web.baseURL,
            appName: config.web.appName,
            businesses: businesses,
            user: req.session.user ? req.session.user : undefined,
        });
    }
    else {
        res.redirect("/");
    }
});

router.get("/:id", async (req, res) => {
    if(req.session.user) {

        let conn = await dbConnection.connect();
        let restaurant = await dbHelper.getRestaurantById(conn, req.params.id);
        dbConnection.disconnect(conn);

        if(req.session.user.type === "admin" || restaurant.user_id === req.session.user.id) {
            res.render("updateBusiness", {
                baseURL: config.web.baseURL,
                appName: config.web.appName,
                restaurant: restaurant,
                user: req.session.user ? req.session.user : undefined,
            });
        }
        else {
            res.send("Error");
        }        
    }
    else {
        res.send("Error");
    }
});

router.post("/:id", async (req,res) => {

    let restaurantID = req.params.id;
    let { name, description, cuisine, website, facebook, phone,
          address, halalStatus, workingHours, latitude, longitude,
          imageLink, zipcode,
    } = req.body;

    let conn = await dbConnection.connect();
    await dbHelper.updateRestaurant(conn, name, description, cuisine, website, facebook, phone, address, halalStatus, workingHours, latitude, longitude, imageLink, zipcode, restaurantID);
    dbConnection.disconnect(conn);

    res.json(restaurantID);

})

module.exports = router;