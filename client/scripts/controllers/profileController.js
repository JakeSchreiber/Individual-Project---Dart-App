myApp.controller('ProfileController', ['$scope', '$http', function($scope, $http){
    console.log("Profile Controller");

    $scope.getProfileInfo = function(){
        $http.get('/profile').then(function(response){
            $scope.profileInfo = response.data;
            console.log(response.data);
        });
    };

    $scope.getProfileInfo();




    //$scope.createUser = function(){
    //    $http.get('/createUser').then(function(response){
    //        $scope.createUser = response.data;
    //        console.log(response.data);
    //        //console.log(document.cookie);
    //    });
    //};
    //
    //$scope.createUser();
    //

}]);