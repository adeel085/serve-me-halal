let express = require('express');
let config = require('../config');
let dbConnection = require('../database/dbConnection');
let dbHelper = require('../database/dbHelper');

let router = express.Router();

router.get("/", (req, res) => {
	if(req.session.user) {
	    res.redirect("/");
	}
	else {
	    res.render("login", {
	        baseURL: config.web.baseURL,
	        appName: config.web.appName,
	        user: req.session.user ? req.session.user : undefined,
	    });
	}
});

router.post("/", async (req, res) => {
	let { email, password } = req.body;

    let conn = await dbConnection.connect();
    let user = await dbHelper.getUserByEmailPassword(conn, email, password);
    if(!user) {
    	res.json(503);
    }
    else {
    	req.session.user = user;
    	res.json(200);
    }
})

module.exports = router;