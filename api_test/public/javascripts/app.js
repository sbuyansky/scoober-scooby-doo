/*App & Controller for event creation html*/

var app = angular.module('events', []);

app.controller('eventController', function($scope, $http){

    $scope.formData ={};
    $scope.eventData ={};

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

    getCategoryValues = function(category){
        return $http.get('/api/category/' + category)
            .then(function(response) {
                var vals = []; 
                var data = response.data;

                for (var i = 0; i < data.length; i++){
                    vals.push(data[i].unnest);
                }
                console.log(vals);
                return vals;
            });
    };

    //initialize category values
    getCategoryValues("sport").then(function(data){$scope.sportVals = data});
    getCategoryValues("security").then(function(data){$scope.securityVals = data});
    getCategoryValues("event_type").then(function(data){$scope.event_typeVals = data});
    getCategoryValues("event_gendered").then(function(data){$scope.event_genderedVals = data});
    getCategoryValues("event_status").then(function(data){$scope.event_statusVals = data});
});
