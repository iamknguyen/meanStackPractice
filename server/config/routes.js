
const userController = require('../users/userController.js');

module.exports = (app, express)=>{
    app.get('/users', userController.getUsers);
    app.post('/users', userController.addUser);
}