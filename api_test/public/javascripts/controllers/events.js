/* event controller */

angular.module('scoober').controller('eventController', function($scope, $http, $routeParams, $location){
    //initialize array vars
    $scope.formData ={};
    $scope.eventsData ={};
    $scope.eventData = {};
    
    // get all events just to display for testing
    $http.get('/api/events')
        .success(function(data){
            $scope.eventsData = data;
        })
        .error(function(error){
            console.log(error);
        });

    $scope.createEvent = function(){
        $http.post('/api/events', $scope.event)
             .success(function(data) {
                $scope.formData = {};
                $scope.eventsData = data;
            })
            .error(function(error) {
                console.log('Error: ' + error);
        });
    };
    
    $scope.deleteEvent = function(eid, eventPtr){
        $http.delete('/api/events/' + eid)
            .success(function(data) {
                $scope.eventsData = data;
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
        eventPtr.stopPropagation();
    };

    $scope.getEvent = function(eid){
        $http.get('/api/events/' + eid)
            .success(function(data){
                $scope.eventData = data[0];
                console.log($scope.eventData);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };

    $scope.viewEvent = function(eid){
        $location.path('/event/' + eid);
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
        getCategoryValues("sport");
        getCategoryValues("security");
        getCategoryValues("event_type");
        getCategoryValues("event_gendered");
        getCategoryValues("event_status");
        
        if(typeof $routeParams.eid !== 'undefined'){
            $scope.getEvent($routeParams.eid); 
        }
    }

    init();        
});
