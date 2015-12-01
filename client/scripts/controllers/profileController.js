myApp.controller('ProfileController', ['$scope', '$http', function($scope, $http){
    console.log("Profile Controller");

//    WORKS LOCALLY BUT NOT ONCE POSTED ON HEROKU

//    $scope.getProfileInfo = function(){
//        $http.get('/getprofile').then(function(response){
//            $scope.profileInfo = response.data;
//            console.log(response.data);
//                checkUser();
//        });
//    };
//
//    var checkUser = function() {
//        if ($scope.profileInfo.length === 0) {
//            $http.post('/createuser').then(function (response) {
//                $scope.profileInfo = response.data;
//                console.log(response.data);
//                console.log("Empty Array test fire");
//                $scope.getProfileInfo();
//
//            });
//        }
//    };
//
//    $scope.getProfileInfo();
//
//
//}]);

//WORKS IN HEROKU

    $scope.getProfileInfo = function(){
        $http.get('/getprofile').then(function(response){
            //$scope.profileInfo = response.data;
            return checkUser(response);



        });
    };
    var checkUser = function(response){
        if (response.data.length === 0) {
            $http.post('/createuser').then(function (response) {
                $scope.profileInfo = response.data;
                console.log(response.data);
                console.log("Empty Array test fire");
                //$scope.getProfileInfo();
            });
        } else {
                $scope.profileInfo = response.data;

            }
        };


    $scope.getProfileInfo();


}]);