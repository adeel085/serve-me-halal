let config = {}

config.web = {}
config.db = {}
config.google = {}

config.google.APIKey = "AIzaSyCPnbUmYNmXy3aX9T71GT6BjRxFWC8z_1w"

// web address config localhost
// config.web.port = process.env.PORT || 3000;
// config.web.baseURL = 'http://localhost:' + config.web.port;
// config.web.appName = 'ServeMeHalal'

// Local database config
// config.db.host = 'localhost';
// config.db.user = 'root';
// config.db.password = '';
// config.db.dbName = 'serve_me_halal_db';
// config.db.port = 3306;

// web address config Digital Ocean
config.web.port = process.env.PORT || 3333;
config.web.baseURL = 'http://198.211.117.105';
config.web.appName = 'ServeMeHalal'

// Digital Ocean database config
config.db.host = 'dbaas-db-35606-do-user-10037316-0.b.db.ondigitalocean.com';
config.db.user = 'doadmin';
config.db.password = 'Z4bleqqeZlvew48O';
config.db.dbName = 'defaultdb';
config.db.port = 25060;


// web address config live
// config.web.port = process.env.PORT || 3000;
// config.web.baseURL = 'https://servemehalal.herokuapp.com';
// config.web.appName = 'ServeMeHalal';

// Remote Database config
// config.db.host = 'us-cdbr-east-04.cleardb.com';
// config.db.user = 'b9896834e3ddba';
// config.db.password = '6bc204fa';
// config.db.dbName = 'heroku_c80ad99034f460e';
// config.db.port = 3306;

module.exports = config;