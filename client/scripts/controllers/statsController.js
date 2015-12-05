myApp.controller('StatsController', ['$scope', '$http', function($scope, $http){

    $scope.getStats = function(){
        $http.get('/stats').then(function(response){
            $scope.stats = response.data;
        });
    };

    $scope.getStats();

}]);