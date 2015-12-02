
myApp.controller('DartController', ['$scope','$http', '$interval', 'PlayerService', function($scope, $http, $interval, PlayerService){
    console.log("Dart Controller");

    /////SET PLAYERS FOR GAMEPLAY BY GETTING LOGGED IN USER AND CHOOSING OPPONENT FROM LIST/////

    $scope.setPlayers = function() {

        $scope.playerArray = [];
        $scope.chooseOpponent = true;

        //GET PROFILE USER from login and enter them to playerArray[0]/////

        $scope.getLoggedInPlayer = function () {
            $http.get('/getloggedinplayer').then(function (response) {
                $scope.loggedInPlayer = response.data;
                $scope.playerArray = $scope.loggedInPlayer;

                console.log("Logged in player line 19:", $scope.loggedInPlayer);
                console.log("PlayerArray line 20:", $scope.playerArray);

            });
        };

        $scope.getLoggedInPlayer();

        //$scope.playerArray.push($scope.loggedInPlayer);
        console.log("Player Array from line 26 (after getLoggedInPlayer):", $scope.playerArray);


        //GETS ALL USERS TO FILL USER DROPDOWN TO CHOOSE OPPONENT//////
        $scope.getAllUsers = function () {
            $http.get('/getallplayers').then(function (response) {
                $scope.allPlayers = response.data;
                console.log($scope.allPlayers);
            });
        };

        $scope.getAllUsers();


        //$scope.selectedPlayer = false;

        //$scope.toggleSelectedPlayer = function() {
        //    $scope.selectedPlayer = !$scope.selectedPlayer;
        //};


        /////SELECTS OPPONENT ADDS THEM TO PLAYER ARRAY////////

        $scope.isSelectedPlayer = function () {
            $scope.playerArray.push($scope.selectedPlayer);
            console.log("Player Array from line 45-50 (isSelectedPlayer):", $scope.playerArray);
            console.log($scope.selectedPlayer);
            return $scope.selectedPlayer;
            //$scope.chooseOpponent = false;
        };


        //$scope.playerArray.push($scope.player.username);
        //console.log($scope.playerArray);


        //////GET PLAYERS From playerArray.js so long as they are supplied as two players in array///////


        //$scope.playerService = PlayerService;

        //if($scope.playerService.playerData() === undefined) {
        //    console.log("getting player list from user service");
        //    $scope.playerService.playerList()
        //        .then(function() {
        //            $scope.playerArray = $scope.playerService.playerData();
        //        });
        //} else {
        //    $scope.playerArray = $scope.playerService.playerData();
        //};
        //console.log($scope.playerArray);

    };


    $scope.setPlayers();

    var i = 0;
    ///displays only 4 round scores per player////
    $scope.filterLimit = 4;

    ///stats popup default as false/////
    $scope.myvalue = false;
    $scope.showScoreboard = true;


    /////START GAMEPLAY////

    $scope.gameplay = function() {

        /////HIDE CHOOSE OPPONENT DROPDOWN////
        $scope.chooseOpponent = false;

        /////SET CURRENT PLAYER////
        setCurrentPlayer();

        function setCurrentPlayer(){
            $scope.currentPlayer = $scope.playerArray[i];
            console.log($scope.currentPlayer);
        }


        /////CREATES VALUE FOR DART THROWN/////
        //Takes button press(x) assigns value, pushes to an area that will contain 3 darts. Decrease number of
        //darts for round, decrease value from score. Assign dart values taken from the array. Calls roundScore,
        //Check for Zero, and dart average. Increments total darts thrown.

        $scope.changeValue = function (dartValue) {
            //$scope.value = x;
            $scope.currentPlayer.dartArray.push(dartValue);
            $scope.currentPlayer.score -= dartValue;
            $scope.currentPlayer.scoreForAverage += dartValue;
            //console.log($scope.scoreForAverage);
            $scope.dart1 = $scope.currentPlayer.dartArray[0];
            $scope.dart2 = $scope.currentPlayer.dartArray[1];
            $scope.dart3 = $scope.currentPlayer.dartArray[2];
            $scope.currentPlayer.dartsThrown++;
            $scope.currentPlayer.dartsRemaining--;

            checkHatTrick();
            checkZero();
            dartAverage();
            //roundScore();

            //when darts remaining = 0, meaning round is over. Popup confirms score.  Round score is pushed to
            //an array of round scores. functions check for tons and hat tricks, resets round, and would eventually
            //will switch player if needed. If cancel is clicked, round is reversed.

                if ($scope.currentPlayer.dartsRemaining == 0) {
                    roundScore();

                    console.log($scope.currentPlayer.roundScore);

                        if ((confirm("Round Score: " + $scope.currentPlayer.roundScore + ". Remove Darts")) === true) {
                            $scope.currentPlayer.roundArray.unshift($scope.currentPlayer.roundScore);
                            //console.log($scope.roundArray);
                            checkTon();
                            resetRound();
                            switchPlayer();
                            roundAverage();
                            setActivePlayer();

                        } else {
                            $scope.currentPlayer.score += $scope.currentPlayer.roundScore;
                            $scope.currentPlayer.dartsThrown = $scope.currentPlayer.dartsThrown - 3;
                            resetRound();

                        }
                };


            function setActivePlayer() {
                var myEl = angular.element(document.querySelector('.team1Score'));
                myEl.toggleClass('active inactive');

                var myEl2 = angular.element(document.querySelector('.team2Score'));
                myEl2.toggleClass('active inactive');
            }

            //Function calculates round score.
            function roundScore() {
                if ($scope.currentPlayer.dartArray.length == 3) {
                    $scope.currentPlayer.roundScore = $scope.currentPlayer.dartArray[0] + $scope.currentPlayer.dartArray[1] + $scope.currentPlayer.dartArray[2];
                    //var myEl = angular.element( document.querySelector( '#roundScore' ) );
                    //myEl.append('<br/>' + $scope.currentPlayer.roundScore);
                }

                if ($scope.currentPlayer.dartArray.length == 2) {
                    $scope.currentPlayer.roundScore = $scope.currentPlayer.dartArray[0] + $scope.currentPlayer.dartArray[1];
                }

                if ($scope.currentPlayer.dartArray.length == 1) {
                    $scope.currentPlayer.roundScore = $scope.currentPlayer.dartArray[0];
                }

                console.log($scope.currentPlayer.roundScore);
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
                $scope.currentPlayer.roundScore = 0;
                $scope.currentPlayer.dartsRemaining = 3;
                $scope.currentPlayer.dartArray = [];
                $scope.dart1 = 0;
                $scope.dart2 = 0;
                $scope.dart3 = 0;
            }

            //Checks score for value of zero, meaning the game has been won. Would have liked to require a double out.
            function checkZero() {

                //var e = angular.element(document.querySelector("[double]"));
                if ($scope.currentPlayer.score == 0) {
                    alert("Game complete");
                    checkTon();
                    //$scope.roundArray.push($scope.roundScore);
                    //roundScore();
                    //resetRound();
                    roundAverage();
                    openStats();

                }
                if ($scope.currentPlayer.score < 0) {
                    var el2 = i;
                    roundScore();

                    alert("BUST!");
                    /////Working line/////
                    //$scope.currentPlayer.score += $scope.currentPlayer.roundScore;
                    $scope.playerArray[el2].score += $scope.currentPlayer.roundScore;
                    //$scope.playerArray[el2].score = $scope.currentPlayer.score;
                    console.log($scope.playerArray[el2].score);
                    setActivePlayer();

                    resetRound();
                    switchPlayer();

                }
            }


            function dartAverage() {
                $scope.currentPlayer.ppd = parseFloat($scope.currentPlayer.scoreForAverage / $scope.currentPlayer.dartsThrown).toFixed(2);
            }

            function roundAverage() {
                $scope.currentPlayer.roundAverage = parseFloat($scope.currentPlayer.scoreForAverage / ($scope.currentPlayer.dartsThrown / 3)).toFixed(2);
            }


            function checkHatTrick() {
                if (($scope.dart1 === 25 || $scope.dart1 === 50) && ($scope.dart2 === 25 || $scope.dart2 === 50) && ($scope.dart3 === 25 || $scope.dart3 === 50)) {
                    $scope.currentPlayer.hattricks++;
                }
                if (($scope.dart1 === 50) && ($scope.dart2 === 50) && ($scope.dart3 === 50)) {
                    $scope.currentPlayer.deadeyes++;
                }
            }


            function checkTon() {
                if ($scope.currentPlayer.roundScore >= 100 && $scope.currentPlayer.roundScore < 140) {
                    $scope.currentPlayer._100++;
                }
                if ($scope.currentPlayer.roundScore >= 140 && $scope.currentPlayer.roundScore < 180) {
                    $scope.currentPlayer._140++;
                }

                if ($scope.currentPlayer.roundScore == 180) {
                    $scope.currentPlayer._180++;
                }

            }


            function switchPlayer() {
                var el = i + 1;
                if ((el) < $scope.playerArray.length) {

                    $scope.currentPlayer = $scope.playerArray[el];
                    i++;


                    $scope.gameplay();

                } else {

                    //$scope.playerArray[i].score.addClass('active');
                    //var myEl = angular.element( document.querySelector( '.team2Score' ) );
                    //myEl.toggleClass('inactive active ');

                    i = 0;
                    $scope.currentPlayer = $scope.playerArray[0];
                    $scope.gameplay();
                }
            }

            function openStats(){
                $scope.myvalue = true;
                $scope.showScoreboard = false;
            }
        };
    }
}]);

