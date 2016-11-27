
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// set up mongoose connection
const dbUrl = 'mongodb://localhost:27017/meantest';
mongoose.connect(dbUrl);
mongoose.connection.on('connected', ()=>{
    console.log('Mongoose connected to ' + dbUrl);
})
mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose disconnected');
})
mongoose.connection.on('error', (err)=>{
    console.log('Mongoose connection error ' + err);
})
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