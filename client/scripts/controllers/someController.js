myApp.controller('DartController', ['$scope','$http', function($scope, $http){
    console.log("Dart Controller");



    $scope.postStats = function(){
        $http.post('/data').then(function(response){
            $scope.postStats();
            console.log(response);
        });
    };

    $scope.dartArray = [];
    //$scope.p2dartArray = [];

    $scope.roundArray = [];
    //$scope.p2roundArray = [];

    $scope.score = null;

   function playerOne(){
        gameplay();
    }


    function playerTwo(){
        gameplay();
    }

    //function switchPlayer(){
    //    playerTwo();
    //}

    playerOne();

    function gameplay() {


        //Initialize starting values for feats and scores.
        function initiateValues() {
           $scope.score = 501;
           $scope.roundScore = 0;
           $scope.dartsRemaining = 3;
           $scope.scoreForAverage = 0;
           $scope.roundAverage = 0;


           $scope.dart1 = 0;
           $scope.dart2 = 0;
           $scope.dart3 = 0;

           $scope.ton = 0;
           $scope.ton40 = 0;
           $scope.ton80 = 0;
           $scope.hatTrick = 0;
           $scope.deadEye = 0;

           $scope.dartsThrown = 0;
           $scope.dartAverage = 0;

           $scope.bust = 0;
       }


        if ($scope.score == null) {
                    initiateValues();
                }

        //Takes button press(x) assigns value, pushes to an area that will contain 3 darts. Decrease number of
        //darts for round, decrease value from score. Assign dart values taken from the array. Calls roundScore,
        //Check for Zero, and dart average. Increments total darts thrown.
       $scope.changeValue = function (x) {
           $scope.value = x;
           $scope.dartArray.push(x);
           $scope.dartsRemaining--;
           $scope.score -= $scope.value;
           $scope.scoreForAverage += $scope.value;
           console.log($scope.scoreForAverage);
           $scope.dart1 = $scope.dartArray[0];
           $scope.dart2 = $scope.dartArray[1];
           $scope.dart3 = $scope.dartArray[2];
           $scope.dartsThrown++;
           checkHatTrick();
           checkZero();
           dartAverage();
           roundScore();




           //when darts remaining = 0, meaning round is over. Popup confirms score.  Round score is pushed to
           //an array of round scores. functions check for tons and hat tricks, resets round, and would eventually
           //will switch player if needed. If cancel is clicked, round is reversed.
           if ($scope.dartsRemaining == 0) {
               if ((confirm("Round Score: " + $scope.roundScore + ". Remove Darts")) === true) {
                   $scope.roundArray.push($scope.roundScore);
                   //console.log($scope.roundArray);
                   checkTon();

                   //roundScore();
                   resetRound();
                   //switchPlayer();
                   roundAverage();


               } else {
                   $scope.score += $scope.roundScore;
                   $scope.dartsThrown = $scope.dartsThrown - 3;
                   resetRound()
               }


           }
       };

        //Function calculates round score.
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

       //Weird for loop that didn't work
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




       //Resets variables after each round
       function resetRound() {
           $scope.roundScore = 0;
           $scope.dartsRemaining = 3;
           $scope.dartArray = [];
           $scope.dart1 = 0;
           $scope.dart2 = 0;
           $scope.dart3 = 0;
       }

       //Checks score for value of zero, meaning the game has been won. Would have liked to require a double out.
       function checkZero() {
           //var e = angular.element(document.querySelector("[double]"));
           if ($scope.score == 0) {
               alert("Game complete");
               checkTon();
               //$scope.roundArray.push($scope.roundScore);
               //roundScore();
               //resetRound();
               roundAverage();

           }
           if ($scope.score < 0) {
               alert("BUST!");
               $scope.score += $scope.roundScore;
               resetRound();
           }
       }


       function dartAverage() {
           $scope.dartAverage = parseFloat($scope.scoreForAverage / $scope.dartsThrown).toFixed(2);
       }

        function roundAverage(){
            $scope.roundAverage = parseFloat($scope.scoreForAverage / ($scope.dartsThrown / 3)).toFixed(2);
        }


       function checkHatTrick() {
           if (($scope.dart1 === 25 || $scope.dart1 === 50) && ($scope.dart2 === 25 || $scope.dart2 === 50) && ($scope.dart3 === 25 || $scope.dart3 === 50)) {
               $scope.hatTrick++;
           }
           if (($scope.dart1 === 50) && ($scope.dart2 === 50) && ($scope.dart3 === 50)) {
               $scope.deadEye++;
           }
       }


        function checkTon() {
            if ($scope.roundScore >= 100 && $scope.roundScore < 140) {
                $scope.ton++;
            }
            if ($scope.roundScore >= 140 && $scope.roundScore < 180) {
                $scope.ton40++;
            }

            if ($scope.roundScore == 180) {
                $scope.ton80++;
            }

        }


   }
}]);

