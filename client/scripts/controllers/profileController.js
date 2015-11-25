//myApp.controller('ProfileController', ['$scope', '$http', function($scope, $http){
//    console.log("Profile Controller");
//
//    $scope.getProfileInfo = function(){
//        $http.get('/profileInfo').then(function(response){
//            $scope.profileInfo = response.data;
//            console.log($scope.profileInfo);
//        });
//    };
//
//    $scope.getProfileInfo();
//
//}]);

myApp.controller('ProfileController', ['$scope', '$http', function($scope, $http){
    console.log("Profile Controller");




    $scope.getProfileInfo = function(){
        $http.get('/profile').then(function(response){
            $scope.profileInfo = response.data;
            console.log(response.data);
            //console.log(document.cookie);

        });
    };

    $scope.getProfileInfo();



    

}]);