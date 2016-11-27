
# Tutorial for how to set up MEAN stack application

# Step 0: Init
intitialize git and npm dependencies
- express
- body-parser
- morgan
- mongoose
- mongodb
- cors
# Step 1: Express
Set up server.js file
    - express: ports, listen
    - middleware and public static files
        ```
        app.use(express.static(__dirname + '/../../public'));    
        ```
# Step 2: Connect to DB
Start up mongod 
Connect to mongoDB through mongoose
    ```
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
    ```
# Step 3: Server Routing
Set up routes on server
    - on server.js
        ```
        require('./server/config/middleware.js')(app, express);
        require('./server/config/routes.js')(app, express);
        ```
    - on files elsewhere
        ```
        const userController = require('../users/userController.js');
        module.exports = (app, express)=>{
            app.get('/api/users', userController.getUsers);
            app.post('/api/users', userController.addUser);
        }
        ```
# Step 4: Server Controllers
    - Add promises to mongoose since promises have been deprecated
        ```
        mongoose.Promise = require('bluebird');
        ```
    - Set up controllers for routes
        ```
        module.exports = {
            handleGETrequest: (req, res, next)=>{
                // get data from DB and send it back
            },
            handlePOSTrequest: (req, res, next)=>{
                // post data from DB
            }
        }
        ```
# Step 5: Server Models
    - Set up Models for corresponding routes
    ```
    const mySchema = new mongoose.Schema({
        name: String,
        age: number
    })
    module.exports = mongoose.model('myModel', mySchema);
    ```

# Step 6: Set up public (client) side
    - index.html
        - include angular and angular routing scripts
        ```
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.js"></script>
        ```


# Step 7: Client routing
    Set up angular module and configure the dependencies for controllers, routing, etc
    ```
    angular.module('myApp',['myApp.users','ngRoute'])
        .config(($routeProvider, $httpProvider)=>{
            $routeProvider
                .when('/', {
                    templateUrl: 'app/user/users.html',
                    controller: 'UserController'
                })
                .otherwise({
                    redirectTo: './home.html'
                })
        })
    ```

# Step 8: Client controllers 
    Set up angular controllers and services to handle user intent
    ```
    angular.module('myApp.users',[])
    // Do NOT use fat arrow syntax when defining function for controllers
    .controller('UserController',function($scope, $http, UserService){
        $scope.name = "Khoa";
        $scope.names = [
            "Ziggy", "Momo", "Toby"
        ]
        // Initialize user ng-model(from html) can have an object to refer to
        $scope.user = {};
        $scope.addUser = ()=>{
            // some function
        }
        // Use the service you created to get all items in dB
        // Notice that you have to do a .then because you are receiving a promise
        UserService
            .getAllUsers()
            .then((res)=>{
            $scope.users = res;
            console.log('Your users', $scope.users);
        })
    })
    .factory('UserService', function($http){
        const getAllUsers = ()=>{
            return $http({
                method: "GET",
                url: '/api/users'
            })
            .then((response)=>{
                //console.log('your response', response.data);
                return response.data;
            })
        }
        const postUser = (newUser) =>{
            return $http({
                method: "POST",
                url: '/api/users',
                data: newUser
            })
        }
        // return the services created
        return {
            getAllUsers: getAllUsers,
            postUser: postUser
        }
    })
    ```