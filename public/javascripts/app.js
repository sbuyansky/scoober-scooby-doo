/*Main App File for scoober.io */

//events angular application
var app = angular.module('scoober', ["ngResource","ngRoute"]).
  config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true); //get rid of hashtags, will have to test with older browsers
      $routeProvider
        .when("/events", {
          templateUrl: "/views/templates/event_list.html",
          controller: "eventController",
          activetab: 'events'})
				.when("/events/create", {
          templateUrl: "/views/templates/event_create.html",
          controller: "eventController",
          activetab: 'events'})
        .when("/event/:eid", {
          templateUrl: "/views/templates/event_view.html",
          controller: "eventController",
          activetab: 'events'})
        .when("/newprofile/:uid",{
          templateUrl: "views/templates/new_profile.html",
          controller: "userController",
          activetab: 'newprofile'})
        .when("/users/:uid", {
          templateUrl: 'views/templates/user_view.html',
          controller: 'userController',
          activetab: 'profile'})
        .when("/groups/create", {
          templateUrl: "/views/templates/group_create.html",
          controller: "groupController",
          activetab: "group_create"})
        .when("/group/:gid", {
          templateUrl: "/views/templates/group_view.html",
          controller: "groupController",
          activetab: 'group_create'})
        // TODO add uid for admin (for security reasons)
        //.when("/admin/users/:uid")
        .when("/admin/events", {
          templateUrl: "/views/templates/admin/events.html",
          controller: "eventController",
          activetab: 'admin'})
        .when("/admin/groups", {
          templateUrl: "/views/templates/admin/groups.html",
          controller: "groupController",
          activetab: 'admin'})
        .when("/admin/users", {
          templateUrl: "/views/templates/admin/users.html",
          controller: "userController",
          activetab: 'admin'})
        // Login/Signup
        .when("/login", {
          templateUrl:"/views/templates/user_login.html",
          controller: "userController",
          activetab: 'login'})
        .when("/signup", {
          templateUrl:"/views/templates/user_create.html",
          controller: "userController",
          activetab: 'signup'})
        // Serve up home page:
        .when("/", {
          templateUrl:"/views/templates/home.html",
          controller: "userController",
          activetab: 'home'})  
        .otherwise({ redirectTo: "/" });
    }
  ]
);

