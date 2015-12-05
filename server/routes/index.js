var passport = require('passport');
var signupController = require('../models/signupController.js');

var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var connectionString=process.env.DATABASE_URL || 'postgres://localhost:5432/Darts';

router.use(jsonParser);
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/createAccount', signupController.show);
router.post('/createAccount', signupController.signup);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/#/profile',
    failureRedirect: '/#/home',
    failureFlash: 'Invalid username or password.'
}));

router.get('/stats', function(req, res){
    var results=[];

    pg.connect(connectionString, function(err, client, next){
        var query = client.query("SELECT * FROM stats");

        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function(){
            client.end();
            return res.json(results);
        });

        if(err) console.log(err);

    })
});

router.get('/getprofile', function(req, res){
    var results=[];

    pg.connect(connectionString, function(err, client, next){
        var query = client.query("SELECT * FROM stats WHERE username = $1", [req.user.username]);

        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function(){
            client.end();
            return res.json(results);
        });

        if(err) console.log(err);
    })

});


router.post('/createuser', function(req, res){
    var results=[];

    pg.connect(connectionString, function(err, client, next){
        var query = client.query("INSERT INTO stats (username, firstname, lastname, location, date) SELECT username, firstname, lastname, location, 'today' FROM users WHERE username = ($1)", [req.user.username]);

        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function(){
            client.end();
            return res.json(results);
        });

        if(err) console.log(err);

    })
});


router.get('/getallplayers', function(req, res){
    var results=[];

    pg.connect(connectionString, function(err, client, next){
        var query = client.query("SELECT * FROM defaultstats CROSS JOIN stats");

        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function(){
            client.end();
            return res.json(results);
        });

        if(err) console.log(err);
    })
});


router.get('/getloggedinplayer', function(req, res){
    var results=[];

    pg.connect(connectionString, function(err, client, next){
        var query = client.query("SELECT * FROM defaultstats CROSS JOIN stats WHERE stats.username = ($1)", [req.user.username]);

        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function(){
            client.end();
            return res.json(results);
        });

        if(err) console.log(err);

    })
});

router.post("/updateplayer1stats", function(req,res){
    var results=[];

    console.log(req);

    var player1Stats = {
        "_100" : req.body._100,
        "_140" : req.body._140,
        "_180" : req.body._180,
        "hattricks" : req.body.hattricks,
        "deadeyes" : req.body.deadeyes,
        "totalgames" : req.body.totalgames,
        "wins" : req.body.wins,
        "ppd" : req.body.ppd,
        "average" : req.body.average,
        "username" : req.body.username,
        "totaldartsthrown" : req.body.totaldartsthrown,
        "totalpointsscored" : req.body.totalpointsscored,
        "averagedartspergame" : req.body.averagedartspergame

    };

    pg.connect(connectionString, function(err, client, next){
        var query = client.query("UPDATE stats SET _100 = ($1)," +
            "_140 = ($2)," +
            "_180 = ($3)," +
            "hattricks = ($4)," +
            "deadeyes = ($5)," +
            "totalgames = ($6)," +
            "wins = ($7)," +
            "average = ($8)," +
            "ppd = ($9)," +
            "totaldartsthrown = ($10)," +
            "averagedartspergame = ($11)," +
            "totalpointsscored = ($12) WHERE stats.username = ($13)", [player1Stats._100, player1Stats._140, player1Stats._180, player1Stats.hattricks, player1Stats.deadeyes, player1Stats.totalgames, player1Stats.wins, player1Stats.average, player1Stats.ppd, player1Stats.totaldartsthrown, player1Stats.averagedartspergame, player1Stats.totalpointsscored, player1Stats.username]);
        //var query = client.query("SELECT * FROM users");

        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function(){
            client.end();
            return res.json(results);
        });

        if(err) console.log(err);

    })
});



router.post("/updateplayer2stats", function(req,res){
    var results=[];

    console.log(req);

    var player2Stats = {
        "_100" : req.body._100,
        "_140" : req.body._140,
        "_180" : req.body._180,
        "hattricks" : req.body.hattricks,
        "deadeyes" : req.body.deadeyes,
        "totalgames" : req.body.totalgames,
        "wins" : req.body.wins,
        "ppd" : req.body.ppd,
        "average" : req.body.average,
        "username" : req.body.username,
        "totaldartsthrown" : req.body.totaldartsthrown,
        "totalpointsscored" : req.body.totalpointsscored,
        "averagedartspergame" : req.body.averagedartspergame
    };

    pg.connect(connectionString, function(err, client, next){
        var query = client.query("UPDATE stats SET _100 = ($1)," +
            "_140 = ($2)," +
            "_180 = ($3)," +
            "hattricks = ($4)," +
            "deadeyes = ($5)," +
            "totalgames = ($6)," +
            "wins = ($7)," +
            "average = ($8)," +
            "ppd = ($9)," +
            "totaldartsthrown = ($10)," +
            "averagedartspergame = ($11)," +
            "totalpointsscored = ($12) WHERE stats.username = ($13)", [player2Stats._100, player2Stats._140, player2Stats._180, player2Stats.hattricks, player2Stats.deadeyes, player2Stats.totalgames, player2Stats.wins, player2Stats.average, player2Stats.ppd, player2Stats.totaldartsthrown, player2Stats.averagedartspergame, player2Stats.totalpointsscored, player2Stats.username]);
        //var query = client.query("SELECT * FROM users");

        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function(){
            client.end();
            return res.json(results);
        });

        if(err) console.log(err);

    })
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/home');
});

router.get('/*', function(req, res){
    var file = req.params[0] || 'assets/views/index.html';
    res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;