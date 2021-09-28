let config = {}

config.web = {}
config.db = {}
config.google = {}

// web address config localhost
// config.web.port = process.env.PORT || 3000;
// config.web.baseURL = 'http://localhost:' + config.web.port;
// config.web.appName = 'ServeMeHalal'

config.google.APIKey = "AIzaSyCPnbUmYNmXy3aX9T71GT6BjRxFWC8z_1w"

// web address config live
config.web.port = process.env.PORT || 3000;
config.web.baseURL = 'https://servemehalal.herokuapp.com';
config.web.appName = 'ServeMeHalal';

// Remote Database config
config.db.host = 'us-cdbr-east-04.cleardb.com';
config.db.user = 'b9896834e3ddba';
config.db.password = '6bc204fa';
config.db.dbName = 'heroku_c80ad99034f460e';
config.db.port = 3306;


// Local database config
// config.db.host = 'localhost';
// config.db.user = 'root';
// config.db.password = '';
// config.db.dbName = 'serve_me_halal_db';
// config.db.port = 3306;

module.exports = config;