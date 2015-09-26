/*Main App File for scoober.io */

//events angular application
var app = angular.module('scoober', ["ngResource","ngRoute"]).
  config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true); //get rid of hashtags, will have to test with older browsers
      $routeProvider
        .when("/events", {
          templateUrl: "/views/templates/event_create.html",
          controller: "eventController",
          activetab: 'events'})
        .when("/event/:eid", {
          templateUrl: "/views/templates/event_view.html",
          controller: "eventController",
          activetab: 'events'})
        .when("/users",{
          templateUrl: "views/templates/users.html",
          controller: "accountCreateController",
          activetab: 'users'})
        .when("/newprofile/:uid",{
          templateUrl: "views/templates/new_profile.html",
          controller: "accountCreateController",
          activetab: 'newprofile'})
        .when("/users/:uid", {
          templateUrl: 'views/templates/user_view.html',
          controller: 'accountCreateController',
          activetab: 'profile'})
        .otherwise({ redirectTo: "/" });
    }
  ]
);

