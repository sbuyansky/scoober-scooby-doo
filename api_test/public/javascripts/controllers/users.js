/*App & Controller for initial_signup html*/

angular.module('scoober').controller('accountCreateController', function($scope, $http, $userParams, $location){

    $scope.userData = {};

    // get all users just to display for testing.
    $http.get('/api/users')
        .success(function(data){
            $scope.userData = data;
            console.log(data);
        })
        .error(function(error){
            console.log(error);
        });

    $scope.createUser = function() {
        var passCopy = $scope.user.pass_copy;
        // do some validation to make sure password & passCopy are the same

        // user variable is dynamically built by
        //  angular through HTML page [index.html]
        $http.post('/api/users', $scope.user)
            .success(function(data) {
                $scope.userData = data;
                console.log('added ' + data + ' to users table');
                // serve up new_profile page to give user the chance to fill in demographics
                //$location.path('/newprofile');///' + eid);
                $scope.addDemographics();
            })
            .error(function(error) {
                console.log('Error: ' + error);
            })
    };

    $scope.addDemographics = function() {
        $location.path('/newprofile');
    }
    
    $scope.deleteUser = function(uid, userPtr){
        $http.delete('/api/users/' + uid)
            .success(function(data) {
                $scope.userData = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
        userPtr.stopPropagation();
    };
});
