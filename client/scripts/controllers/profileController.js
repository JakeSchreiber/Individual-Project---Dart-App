myApp.controller('ProfileController', ['$scope', '$http', function($scope, $http){

    $scope.getProfileInfo = function(){
        $http.get('/getprofile').then(function(response){
            return checkUser(response);
        });
    };

    var checkUser = function(response){
        if (response.data.length === 0) {
            $http.post('/createuser').then(function (response) {
                $scope.profileInfo = response.data;
            });
        } else {
                $scope.profileInfo = response.data;
            }
        };

    $scope.getProfileInfo();
}]);