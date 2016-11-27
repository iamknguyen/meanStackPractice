
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    role: String
})

// after the schema is defined
// a model is a compiled version of the schema
// all data interactions need to be through a model
// parameters: model name, schema name, mongodb collection
    // if the collection isn't supplied, mongoose will use a 
    // lowercase plural version of the model name
module.exports = mongoose.model('User', UserSchema, 'tech');