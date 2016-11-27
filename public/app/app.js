

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
