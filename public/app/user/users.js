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
        console.log($scope.user);
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
    
    const getAllUsers = function(){
        return $http({
            method: "GET",
            url: '/api/users'
        })
        .then((response)=>{
            //console.log('your response', response.data);
            return response.data;
        })
    }
    // return the services created
    return {
        getAllUsers: getAllUsers
    }
})