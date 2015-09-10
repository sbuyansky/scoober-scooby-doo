/*App & Controller for initial_signup html*/

angular.module('scoober').controller('accountCreateController', function($scope, $http){

    $scope.formData ={};
    $scope.userData = {};

    $http.get('/api/users')
        .success(function(data){
            $scope.userData = data;
            console.log(data);
        })
        .error(function(error){
            console.log(error);
        });

    $scope.createUser = function() {
        var passCopy = $scope.user.PassCopy;
        // do some validation to make sure Password & PassCopy are the same

        // user variable is dynamically built by
        //  angular through HTML page [index.html]
        $http.post('/api/users', $scope.user)
            .success(function(data) {
                $scope.userData = data;
                console.log('added ' + data + ' to users table');
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
});
