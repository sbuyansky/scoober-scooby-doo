/*App & Controller for users*/

angular.module('scoober').controller('userController', function($scope, $http, $routeParams, $location){

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

    $scope.addDemographics = function(uid) {
        $location.path('/newprofile/' + uid);
    }

    $scope.createUser = function() {
        //var passCopy = $scope.user.pass_copy;
        // TODO: do some validation to make sure password & passCopy are the same

        // user variable is dynamically built by
        //  angular through HTML page [index.html]
        $http.post('/api/users', $scope.user)
            .success(function(data) {
                // TODO: instead of overwriting all userData, get api to return 1 row.
                //   then push this row onto the $scope.userData array.
                $scope.userData = data;
                console.log('new data array: ',data);
                // serve up new_profile page to give user the chance to fill in demographics
                //$location.path('/newprofile');///' + eid);
                $scope.addDemographics(data[data.length-1].uid);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            })
    };
    
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

    $scope.getUser = function(uid){
        $http.get('/api/users/' + uid)
            .success(function(data){
                $scope.userData = data[0];
                console.log($scope.userData);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };

    $scope.viewProfile = function(uid) {
        $location.path('/users/' + uid);
    };
    
    $scope.signUp = function() {
        $location.path('/signup')
    }

    function init(){
        console.log('Inside Users "accountCreateController" Controller')
        // $routeParams comes from the route paramters... duh
        //  aka for /newprofile/9, uid is parameter of 9 [app.js looks for /newprofile/:uid]
        if(typeof $routeParams.uid !== 'undefined'){
            $scope.getUser($routeParams.uid); 
        }
    }

    init();
});
