/*App & Controller for event creation html*/

//events angular application
var app = angular.module('events', []);

//event controller
app.controller('eventController', function($scope, $http){
    
    //initialize array vars
    $scope.formData ={};
    $scope.eventData ={};
    
    //
    $http.get('/api/events')
        .success(function(data){
            $scope.eventData = data;
            console.log(data);
        })
        .error(function(error){
            console.log(error);
        });

        $scope.createEvent = function(){
            $http.post('/api/events', $scope.event)
                 .success(function(data) {
                    $scope.formData = {};
                    $scope.eventData = data;
                    console.log(data);
                })
                .error(function(error) {
                    console.log('Error: ' + error);
            });
        };
        
        $scope.deleteEvent = function(eid){
            $http.delete('/api/events/' + eid)
                .success(function(data) {
                    $scope.eventData = data;
                    console.log(data);
                })
                .error(function(error) {
                    console.log('Error: ' + error);
                });
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

        //initialize category values
        getCategoryValues("sport");
        getCategoryValues("security");
        getCategoryValues("event_type");
        getCategoryValues("event_gendered");
        getCategoryValues("event_status");
    });
