var myApp = angular.module("myApp", ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/home', {
            templateUrl: "/assets/views/routes/home.html",
            controller: "SomeController"

        }).
        when('/dartapp', {
            templateUrl: "/assets/views/routes/dartboardSVG.html",
            controller: "DartController"
        }).
        when('/scoreboard', {
            templateUrl: "/assets/views/routes/projects.html",
            controller: "AnotherController"
        }).
        otherwise({
            redirectTo: 'home'
        })
}]);