let config = {}

config.web = {}
config.db = {}

// web address config localhost
// config.web.port = process.env.PORT || 3000;
// config.web.baseURL = 'http://localhost:' + config.web.port;
// config.web.appName = 'ServeMeHalal'

// web address config live
config.web.port = process.env.PORT || 3000;
config.web.baseURL = 'https://servemehalal.herokuapp.com';
config.web.appName = 'ServeMeHalal'

// Local Database config
config.db.host = 'localhost'
config.db.user = 'root'
config.db.password = ''
config.db.dbName = 'halal_guide_db'
config.db.port = 3306

module.exports = config