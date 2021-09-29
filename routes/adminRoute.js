let express = require('express');
let config = require('../config');
let dbConnection = require('../database/dbConnection');
let dbHelper = require('../database/dbHelper');

let router = express.Router();

router.get("/claimRequests", async (req, res) => {    

    if(req.session.user) {
        let conn = await dbConnection.connect();
        let user = await dbHelper.getUserByID(conn, req.session.user.id);
        let requests = await dbHelper.getClaimRequests(conn);        
        dbConnection.disconnect(conn);
        if(user.type === "admin") {
            res.render("claimRequests", {
                baseURL: config.web.baseURL,
                appName: config.web.appName,
                user: req.session.user ? req.session.user : undefined,
                requests: requests,
            });
        }
        else {
            res.send("Erroe 404");
        }
    }
    else {
        res.redirect("/login");
    }
});

router.get("/restaurantRequests", async (req, res) => {
    if(req.session.user) {
        if(req.session.user.type === "admin") {
            let conn = await dbConnection.connect();
            let requests = await dbHelper.getRestaurantRequests(conn);        
            dbConnection.disconnect(conn);
            res.render("restaurantRequests", {
                baseURL: config.web.baseURL,
                appName: config.web.appName,
                user: req.session.user ? req.session.user : undefined,
                requests: requests,
            });
        }
        else {
            res.send("Erroe 404");   
        }
    }
    else {
        res.redirect("/login");   
    }
})

router.post("/update", async (req, res) => {
    let { restaurantID, status, userID } = req.body;

    let conn = await dbConnection.connect();
    await dbHelper.updateClaimRequest(conn, restaurantID, status, userID);
    dbConnection.disconnect(conn);

    res.json(200);
});


router.post("/update/delete", async (req, res) => {
    let { restaurantID } = req.body;

    let conn = await dbConnection.connect();
    await dbHelper.deleteRestaurant(conn, restaurantID);
    dbConnection.disconnect(conn);

    res.json(200);
});


router.post("/update/add", async (req, res) => {
    let { restaurantID } = req.body;

    let conn = await dbConnection.connect();
    await dbHelper.approveRestaurant(conn, restaurantID);
    dbConnection.disconnect(conn);

    res.json(200);
});

module.exports = router;