/*Controller for header*/

angular.module('scoober').controller('headerController', function($scope, $location, $route){
	// exposes route to index.html
    $scope.$route = $route;
});
