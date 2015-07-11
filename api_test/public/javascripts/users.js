console.log('inside users controller');

var app = angular.module('accountCreate', []);

app.controller('accountCreateController', function($scope, $http){

    $scope.formData ={};
    $scope.eventData ={};
    $scope.userData = {};

    $http.get('/api/users')
        .success(function(data){
            $scope.eventData = data;
            console.log(data);
        })
        .error(function(error){
            console.log(error);
        });

    $scope.createUser = function() {
        debugger;
        // user variable is dynamically built by
        //  angular through HTML page [index.html]
        $http.post('/api/users', $scope.user)
            .success(function(data) {
                debugger;
                console.log(data);
            })
            .error(function(error) {
                debugger
                console.log('Error: ' + error);
            })

        debugger;
        $http.post('/users/api/users', $scope.user)
            .success(function(data) {
                debugger;
                console.log(data);
            })
            .error(function(error) {
                debugger
                console.log('Error: ' + error);
            })
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
