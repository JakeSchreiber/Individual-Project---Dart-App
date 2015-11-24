var myApp = angular.module("myApp", ['ngRoute', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/home', {
            templateUrl: "/assets/views/routes/home.html",
            controller: "StatsController"

        }).
        when('/dartapp', {
            templateUrl: "/assets/views/routes/dartboardSVG.html",
            controller: "DartController"
        }).
        when('/scoreboard', {
            templateUrl: "/assets/views/routes/projects.html",
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

myApp.service('PlayerService', ['$http', function($http) {
    var data = undefined;

    var getPlayers = function() {
        var promise = $http.get('/players/').then(
            function(response) {
                data = response.data;
                console.log("Async Player Data Response: ", data);
                //console.log($scope.playerArray[0]);
            });

        return promise;
    };

    var publicApi = {
        playerList: function(){
            return getPlayers();
        },
        playerData: function(){
            return data;
        }
    };

    return publicApi;

}]);
//
//$scope.getPlayers = function(){
//    $http.get('/players').then(function(response){
//        $scope.playerArray = response.data;
//        console.log($scope.playerArray[0]);
//    });
//
//};

