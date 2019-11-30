const express = require("express");
const app = express()
const cors = require("cors");
const PORT = process.env.PORT || 3005;

// Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and 
// access resources from remote hosts.
app.use(cors());

var pg = require("pg");
var client = new pg.Client(process.env.CONNECTIONSTR);
client.connect();
require("dotenv").config();


var helper = require('./router/helpers')
helper.createTables()
var init = require('./router/init')
// Note that these functions might be async so you might need to create the tables first and then run the initalization
init.addDummyUsers()
init.addDummyCuisines()
init.addDummyOutings()
init.addDummyRestaurants()
init.addDummyRestrictions()


// This part is for API calls to localhost:3005 (Use postman for testing)
var routes = require('./router/routes');
app.use('/', routes);
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});


