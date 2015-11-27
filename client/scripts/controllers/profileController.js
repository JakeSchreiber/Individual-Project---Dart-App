myApp.controller('ProfileController', ['$scope', '$http', function($scope, $http){
    console.log("Profile Controller");

    $scope.getProfileInfo = function(){
        $http.get('/getprofile').then(function(response){
            $scope.profileInfo = response.data;
            console.log(response.data);
            setTimeout(function() {
                if ($scope.profileInfo.length === 0) {
                    $http.post('/createuser').then(function (response) {
                        $scope.profileInfo = response.data;
                        console.log(response.data);
                        console.log("Empty Array test fire");
                        $scope.getProfileInfo();

                    });
                }
            }, 5000);
        });
    };

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

    $scope.getProfileInfo();


}]);