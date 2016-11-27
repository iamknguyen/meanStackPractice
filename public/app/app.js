

angular.module('app',['ngRoute'])
.config(($routeProvider, $httpProvider)=>{
    $routeProvider
        .when('/login', {
            templateUrl: 'app/auth/signin.html'
        })
        .otherwise({
            redirectTo: './home.html'
        })
})
