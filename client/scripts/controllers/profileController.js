myApp.controller('ProfileController', ['$scope', '$http', function($scope, $http){
    console.log("Profile Controller");

    $scope.getProfileInfo = function(){
        $http.get('/profile').then(function(response){
            $scope.profileInfo = response.data;
            console.log(response.data);
            checkUser();
        });
    };

    var checkUser = function() {
        if ($scope.profileInfo.length === 0) {
            $http.post('/createuser').then(function (response) {
                $scope.profileInfo = response.data;
                console.log(response.data);
                console.log("Empty Array test fire");
                $scope.getProfileInfo();

            });
        }
    };

    $scope.getProfileInfo();


}]);