/*App & Controller for initial_signup html*/

var app = angular.module('accountCreate', []);

console.log("here in users.js");

app.controller('accountCreateController', function($scope, $http){

    $scope.formData ={};
    $scope.userData = {};

    $http.get('/api/users')
        .success(function(data){
            $scope.userData = data;
            debugger;
            console.log(data);
        })
        .error(function(error){
            debugger;
            console.log(error);
        });

    $scope.createUser = function() {
        var passCopy = $scope.user.PassCopy;
        // do some validation to make sure Password & PassCopy are the same

        debugger;

        // user variable is dynamically built by
        //  angular through HTML page [index.html]
        $http.post('/api/users', $scope.user)
            .success(function(data) {
                $scope.userData = data;
                debugger;
                console.log('added ' + data + ' to users table');
            })
            .error(function(error) {
                debugger
                console.log('Error: ' + error);
            })

        debugger;
    };
    
    $scope.deleteUser = function(uid){
        debugger;
        $http.delete('/api/users/' + uid)
            .success(function(data) {
                debugger;
                $scope.userData = data;
                console.log(data);
            })
            .error(function(error) {
                debugger
                console.log('Error: ' + error);
            });
    };
});