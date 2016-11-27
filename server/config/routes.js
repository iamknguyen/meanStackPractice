
const userController = require('../users/userController.js');

module.exports = (app, express)=>{
    app.get('/api/users', userController.getUsers);
    app.post('/api/users', userController.addUser);
}