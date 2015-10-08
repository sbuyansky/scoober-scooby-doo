/* Groups controller */

angular.module('scoober').controller('groupController', function($scope, $http, $routeParams, $location){
    //initialize array vars
    $scope.formData ={};
    $scope.groupsData ={};
    $scope.groupData = {};
    
    // get all groups just to display for testing
    $http.get('/api/groups')
        .success(function(data){
            $scope.groupsData = data;
        })
        .error(function(error){
            console.log(error);
        });

    $scope.createGroup = function(){
        $http.post('/api/groups', $scope.group)
             .success(function(data) {
                $scope.formData = {};
                $scope.groupsData = data;
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };
    
    $scope.deleteGroup = function(gid, groupPtr){
        $http.delete('/api/groups/' + gid)
            .success(function(data) {
                $scope.groupsData = data;
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
        groupPtr.stopPropagation();
    };

    $scope.getGroup = function(gid){
        $http.get('/api/groups/' + gid)
            .success(function(data){
                $scope.groupData = data[0];
                console.log($scope.groupData);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };

    $scope.viewGroup = function(gid){
        $location.path('/group/' + gid);
    };
    //all of the get/post/delete http functions return an http
    //promise, you will not have data immediately after executing
    //but must pass a callback function to execute after success/failure
    getCategoryValues = function(category){
        return $http.get('/api/category/' + category)
            .then(function(response) {
                var vals = []; 
                var data = response.data;
                 
                for (var i = 0; i < data.length; i++){
                    vals.push(data[i].unnest);
                }
                $scope[category + "Vals"] = vals;
            });
    };
    function init(){
        //initialize category values
        getCategoryValues("security");
        getCategoryValues("group_type");
        
        if(typeof $routeParams.gid !== 'undefined'){
            $scope.getGroup($routeParams.gid); 
        }
    }

    init();
});
