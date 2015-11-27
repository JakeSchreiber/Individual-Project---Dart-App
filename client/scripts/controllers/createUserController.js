myApp.controller('CreateUserController', ['$scope', '$http', function($scope, $http){
    console.log("Create User Controller");

    $scope.createUser = function(){
        $http.get('/createUser').then(function(response){
            $scope.createUser = response.data;
            console.log(response.data);
            //console.log(document.cookie);
        });
    };

    $scope.createUser();
}]);