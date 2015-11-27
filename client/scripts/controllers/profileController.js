myApp.controller('ProfileController', ['$scope', '$http', function($scope, $http){
    console.log("Profile Controller");

    $scope.createStatProfile = function() {
            $http.post('/createuser').then(function (response) {
                $scope.profileInfo = response.data;
                console.log(response.data);
                $scope.getProfileInfo();

            });
        }


    $scope.getProfileInfo = function(){
        $http.get('/getprofile').then(function(response){
            $scope.profileInfo = response.data;
            console.log(response.data);
                checkUser();
        });
    };
    //
    //var checkUser = function() {
    //    if ($scope.profileInfo.length === 0) {
    //        $http.post('/createuser').then(function (response) {
    //            $scope.profileInfo = response.data;
    //            console.log(response.data);
    //            console.log("Empty Array test fire");
    //            $scope.getProfileInfo();
    //
    //        });
    //    }
    //};
    //
    //$scope.getProfileInfo();


}]);