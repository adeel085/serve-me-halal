let express = require('express');
let config = require('../config');

let router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        baseURL: config.web.baseURL,
        appName: config.web.appName
    });
});

module.exports = router;