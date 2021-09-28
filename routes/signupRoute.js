let express = require('express');
let config = require('../config');
let dbConnection = require('../database/dbConnection');
let dbHelper = require('../database/dbHelper');

let router = express.Router();

router.get("/", (req, res) => {
    res.render("signup", {
        baseURL: config.web.baseURL,
        appName: config.web.appName,
        user: req.session.user ? req.session.user : undefined,
    });
});

router.post("/", async (req, res) => {
	var { fullName, email, password } = req.body;

    let conn = await dbConnection.connect();
    let user = await dbHelper.getUserByEmail(conn, email);
    if(!user) {
		await dbHelper.addNewUser(conn, fullName, email, password, "user");
		dbConnection.disconnect(conn);
		res.json(200);
    }
    else {
		res.json(409);
    }    
    
})

module.exports = router;