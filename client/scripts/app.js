var myApp = angular.module("myApp", ['ngRoute', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/home', {
            templateUrl: "/assets/views/routes/home.html",
            controller: "StatsController"

        }).
        when('/chalk501', {
            templateUrl: "/assets/views/routes/dartboardSVG.html",
            controller: "DartController"
        }).
        when('/leaderboard', {
            templateUrl: "/assets/views/routes/leaderboard.html",
            controller: "StatsController"
        }).
        when('/profile', {
        templateUrl: "/assets/views/routes/profile.html",
        controller: "ProfileController"
        }).

        when('/logout', {
            templateUrl: "/assets/views/routes/home.html",
            controller: "StatsController"
        }).
        when('/login', {
            templateUrl: "/assets/views/routes/login.html",
            controller: "StatsController"
        }).
        otherwise({
            redirectTo: '/home'
        })
}]);