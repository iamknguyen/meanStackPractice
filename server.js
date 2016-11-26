
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// set up mongoose connection
mongoose.connect('mongodb://localhost:27017/meantest');

// set up the port 
const port = process.env.PORT || 8080;


// configure our server with all the middleware and routing
require('./server/config/middleware.js')(app, express);
require('./server/config/routes.js')(app, express);

// start listening to the port
app.listen(port);

// say something to show its starting
console.log("We runnin on.... " + port);

// expose app
module.exports = app;