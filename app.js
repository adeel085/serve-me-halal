// Modules required for index.js
let express = require('express');
let expressSession = require('express-session');
let bodyParser = require('body-parser');
let ejs = require('ejs');
let config = require('./config');

let app = express();
// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use(express.json());
app.use(expressSession({ secret: 'max', saveUninitialized: false, resave: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

let indexRoute = require("./routes/indexRoute");
let loginRoute = require("./routes/loginRoute");
let resultsRoute = require("./routes/resultsRoute");
let restaurantRoute = require("./routes/restaurantRoute");

app.use("/", indexRoute);
app.use("/login", loginRoute);
app.use("/results", resultsRoute);
app.use("/restaurant", restaurantRoute);

// Start listening on port
app.listen(config.web.port, () => {
    console.log('App listening on port ' + config.web.port + '!')
});