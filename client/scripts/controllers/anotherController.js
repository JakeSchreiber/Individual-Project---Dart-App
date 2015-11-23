myApp.controller('AnotherController', ['$scope', '$http', function($scope, $http){
    console.log("Another Controller");

    $scope.getStats = function(){
        $http.get('/stats').then(function(response){
            $scope.stats = response.data;
            console.log($scope.stats);
        });
    };

    $scope.getStats();




}]);