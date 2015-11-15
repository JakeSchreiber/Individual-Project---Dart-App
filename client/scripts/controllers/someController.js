myApp.controller('DartController', ['$scope', function($scope){
    console.log("Dart Controller");

    $scope.score = 501;
    $scope.roundScore = 0;
    $scope.dartsRemaining = 3;
    $scope.dartArray = [];
    $scope.roundArray = [];
    $scope.dart1 = 0;
    $scope.dart2 = 0;
    $scope.dart3 = 0;
    $scope.ton = 0;
    $scope.ton40 = 0;
    $scope.ton80 = 0;
    $scope.dartsThrown = 0;


    $scope.changeValue = function(x) {
        $scope.value = x;
        $scope.dartArray.push(x);
        console.log($scope.dartArray);
        $scope.dartsRemaining--;
        $scope.score -= $scope.value;
        $scope.dart1 = $scope.dartArray[0];
        $scope.dart2 = $scope.dartArray[1];
        $scope.dart3 = $scope.dartArray[2];
        roundScore();
        checkZero();
        $scope.dartsThrown++;




        if ($scope.dartsRemaining == 0) {
            if ((confirm("Round Score: " + $scope.roundScore + ". Remove Darts")) === true) {
                $scope.roundArray.push($scope.roundScore);
                console.log($scope.roundArray);
                checkTon();
                resetRound();
            }   else {
                $scope.score += $scope.roundScore;
                resetRound()
            }


        }
    };

     function roundScore() {
         if ($scope.dartArray.length == 3) {
             $scope.roundScore = $scope.dartArray[0] + $scope.dartArray[1] + $scope.dartArray[2];
         }

         if ($scope.dartArray.length == 2) {
             $scope.roundScore = $scope.dartArray[0] + $scope.dartArray[1];
         }

         if ($scope.dartArray.length == 1) {
             $scope.roundScore = $scope.dartArray[0];
         }
     }



    //function roundScore() {
    //    //for (var i in $scope.dartArray) {
    //    //    var tempScore = 0;
    //    //
    //    //    tempScore = $scope.dartArray[i];
    //    //    console.log(tempScore);
    //    //
    //    //    return tempScore;
    //    //}
    //}


    function checkTon() {
        if ($scope.roundScore >= 100 && $scope.roundScore <= 140) {
            $scope.ton++;
        }
        if ($scope.roundScore >= 140 && $scope.roundScore < 180) {
            $scope.ton40++;
        }

        if ($scope.roundScore == 180) {
            $scope.ton80++;
        }

    }


    function resetRound (){
        $scope.roundScore = 0;
        $scope.dartsRemaining = 3;
        $scope.dartArray = [];
        $scope.dart1 = 0;
        $scope.dart2 = 0;
        $scope.dart3 = 0;
    }

    function checkZero (){
        //var e = angular.element(document.querySelector("[double]"));
        if($scope.score == 0){
            alert("Game complete");
            resetRound();

        }
        if($scope.score < 0){
            alert("BUST!");
            $scope.score += $scope.roundScore;
            resetRound();
        }
    }


}]);

