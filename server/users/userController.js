
const mongoose = require('mongoose');
const User = require("./userModel.js");

// mongooses promises have been deprecated so use bluebird

mongoose.Promise = require('bluebird');

//const findUser = Promise.promisify(User.find);
module.exports = {
    getUsers: (req,res,next)=>{
       User
        .find({})
        .exec()
        .then((results)=>{
            // do stuff with query results and return promise
            console.log("results for you",results);
            return results;
        })
        .then(stuff=>{
            // respond to client
            res.json(stuff);
        })
    },
    addUser: (req,res,next)=>{
        console.log("trying to receive stuff", req.body);
        User
         .find({name: req.body.name})
         .exec()
         .then((results)=>{
             console.log(results);
            if(results.length){
                console.log("User already exists");
                res.json(results)
            }else{
                let newUser = {
                    name: req.body.name,
                    role: req.body.role
                }
                return User.create(newUser);
            }
         })
         .then(result=>{
            console.log('Success');
            res.json(result);
         })
    }
}