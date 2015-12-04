
myApp.controller('DartController', ['$scope','$http', '$interval', 'PlayerService', function($scope, $http, $interval, PlayerService){
    console.log("Dart Controller");


    //START GAME//

    $scope.startNewGame = function(){
        $scope.myvalue = false;
        $scope.showScoreboard = true;
        $scope.selectedPlayer = false;
        $scope.setPlayers();
    };


    /////SET PLAYERS FOR GAMEPLAY BY GETTING LOGGED IN USER AND CHOOSING OPPONENT FROM LIST/////

    $scope.setPlayers = function() {

        $scope.playerArray = [];
        $scope.chooseOpponent = true;
        $scope.switchPlayerContainer = true;

        $scope.getLoggedInPlayer = function () {
            $http.get('/getloggedinplayer').then(function (response) {
                $scope.loggedInPlayer = response.data;
                $scope.playerArray = $scope.loggedInPlayer;
                $scope.playerArray[0].roundArray = [];
                $scope.playerArray[0].dartArray = [];
                console.log("Logged in player line 28:", $scope.loggedInPlayer);
                console.log("PlayerArray line 29:", $scope.playerArray);
            });
        };

        $scope.getLoggedInPlayer();

        console.log("Player Array from line 35(51) (after getLoggedInPlayer):", $scope.playerArray);

        //GETS ALL USERS TO FILL USER DROPDOWN TO CHOOSE OPPONENT//////
        $scope.getAllUsers = function () {
            $http.get('/getallplayers').then(function (response) {
                $scope.allPlayers = response.data;
                console.log("Get all Players, Line 41(57)", $scope.allPlayers);
            });
        };

        $scope.getAllUsers();

        /////SELECTS OPPONENT ADDS THEM TO PLAYER ARRAY////////

        $scope.isSelectedPlayer = function () {
            $scope.playerArray[1] = $scope.selectedPlayer;
            //$scope.playerArray[1].roundArray = [];
            //$scope.playerArray[1].dartArray = [];
            console.log("Player Array from line 53(69) (isSelectedPlayer):", $scope.playerArray);
            console.log($scope.selectedPlayer);
            return $scope.selectedPlayer;
            //$scope.chooseOpponent = false;
        };

        //$scope.isSelectedPlayer();
    };

    //CALL SET PLAYERS FUNCTION LISTED ABOVE//

    $scope.setPlayers();

    var i = 0;

    ///displays only 4 round scores per player////
    $scope.filterLimit = 8;

    ///stats popup default as false/////
    $scope.myvalue = false;
    $scope.showScoreboard = true;


    $scope.chooseWhoStarts = function(){
        if(i == 0){
            i = 1;
        } else {
            i = 0;
        }
        var myEl = angular.element(document.querySelector('.team1Score'));
        myEl.toggleClass('active inactive');

        var myEl2 = angular.element(document.querySelector('.team2Score'));
        myEl2.toggleClass('active inactive');

    };


    /////START GAMEPLAY////

    $scope.gameplay = function() {

        /////HIDE CHOOSE OPPONENT DROPDOWN AND WHO STARTS////
        $scope.chooseOpponent = false;
        $scope.switchPlayerContainer = false;

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
            $scope.currentPlayer.totalpointsscored += dartValue;
            $scope.dart1 = $scope.currentPlayer.dartArray[0];
            $scope.dart2 = $scope.currentPlayer.dartArray[1];
            $scope.dart3 = $scope.currentPlayer.dartArray[2];
            $scope.currentPlayer.dartsThrown++;
            $scope.currentPlayer.totaldartsthrown++;
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
                            $scope.currentPlayer.roundArray.push($scope.currentPlayer.roundScore);
                            //console.log($scope.roundArray);
                            checkTon();
                            resetRound();
                            switchPlayer();
                            roundAverage();
                            setActivePlayer();

                        } else {
                            $scope.currentPlayer.score += $scope.currentPlayer.roundScore;
                            $scope.currentPlayer.dartsThrown = $scope.currentPlayer.dartsThrown - 3;
                            $scope.currentPlayer.totalpointsscored -= $scope.currentPlayer.roundScore;
                            $scope.currentPlayer.totaldartsthrown = $scope.currentPlayer.totaldartsthrown - 3;
                            resetRound();

                        }
                };

            //Highlight active player color

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
                    $scope.currentPlayer.wins++;
                    $scope.playerArray[0].totalgames++;
                    $scope.playerArray[1].totalgames++;
                    alert("Game complete");
                    checkTon();
                    //$scope.roundArray.push($scope.roundScore);
                    //roundScore();
                    //resetRound();
                    roundAverage();
                    calcAverageDartsPerGame();
                    openStats();

                }
                if ($scope.currentPlayer.score < 0) {
                    var el2 = i;
                    roundScore();

                    alert("BUST!");
                    /////Working line/////
                    $scope.playerArray[el2].totalpointsscored -= $scope.currentPlayer.roundScore;
                    $scope.playerArray[el2].totaldartsthrown -= $scope.currentPlayer.dartArray.length;
                    $scope.playerArray[el2].score += $scope.currentPlayer.roundScore;
                    console.log($scope.playerArray[el2].score);
                    setActivePlayer();

                    resetRound();
                    switchPlayer();

                }
            }


            function dartAverage() {
                $scope.currentPlayer.ppd = parseFloat($scope.currentPlayer.totalpointsscored / $scope.currentPlayer.totaldartsthrown).toFixed(2);
            }

            function roundAverage() {
                $scope.currentPlayer.roundAverage = parseFloat($scope.currentPlayer.totalpointsscored / ($scope.currentPlayer.totaldartsthrown / 3)).toFixed(2);
            }

            function calcAverageDartsPerGame() {
                $scope.playerArray[0].averagedartspergame = parseFloat($scope.playerArray[0].totaldartsthrown / $scope.playerArray[0].totalgames).toFixed(2);
                $scope.playerArray[1].averagedartspergame = parseFloat($scope.playerArray[1].totaldartsthrown / $scope.playerArray[1].totalgames).toFixed(2);

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

            //ONCE GAME IS COMPLETE, HIDE SCORE, SHOW STATS/////
            function openStats(){
                $scope.myvalue = true;
                $scope.showScoreboard = false;
            }


            //ONCE GAME IS COMPLETE, ALLOW OPTION TO SAVE STATS, UPLOAD STATS TO SERVER/////
            //FOR PLAYER 1//
            $scope.uploadPlayer1Stats = function() {
                $http({
                    url: '/updateplayer1stats',
                    method: "POST",
                    data: JSON.stringify({username:$scope.playerArray[0].username,
                                            _100:$scope.playerArray[0]._100,
                                            _140:$scope.playerArray[0]._140,
                                            _180:$scope.playerArray[0]._180,
                                            hattricks:$scope.playerArray[0].hattricks,
                                            deadeyes:$scope.playerArray[0].deadeyes,
                                            totalgames:$scope.playerArray[0].totalgames,
                                            wins:$scope.playerArray[0].wins,
                                            average:$scope.playerArray[0].roundAverage,
                                            ppd:$scope.playerArray[0].ppd,
                                            totaldartsthrown:$scope.playerArray[0].totaldartsthrown,
                                            totalpointsscored:$scope.playerArray[0].totalpointsscored,
                                            averagedartspergame:$scope.playerArray[0].averagedartspergame
                                            }),

                    headers: {'Content-Type': 'application/json'}
                }).success(function (data, status, headers, config) {
                    $scope.users = data.users; // assign  $scope.persons here as promise is resolved here
                }).error(function (data, status, headers, config) {
                    $scope.status = status + ' ' + headers;
                });
            };


            //FOR PLAYER 2//

            $scope.uploadPlayer2Stats = function() {
                $http({
                    url: '/updateplayer2stats',
                    method: "POST",
                    data: JSON.stringify({username:$scope.playerArray[1].username,
                        _100:$scope.playerArray[1]._100,
                        _140:$scope.playerArray[1]._140,
                        _180:$scope.playerArray[1]._180,
                        hattricks:$scope.playerArray[1].hattricks,
                        deadeyes:$scope.playerArray[1].deadeyes,
                        totalgames:$scope.playerArray[1].totalgames,
                        wins:$scope.playerArray[1].wins,
                        average:$scope.playerArray[1].roundAverage,
                        ppd:$scope.playerArray[1].ppd,
                        totaldartsthrown:$scope.playerArray[1].totaldartsthrown,
                        totalpointsscored:$scope.playerArray[1].totalpointsscored,
                        averagedartspergame:$scope.playerArray[1].averagedartspergame

                    }),

                    headers: {'Content-Type': 'application/json'}
                }).success(function (data, status, headers, config) {
                    $scope.users = data.users; // assign  $scope.persons here as promise is resolved here
                }).error(function (data, status, headers, config) {
                    $scope.status = status + ' ' + headers;
                });
            };



        };
    };


}]);

