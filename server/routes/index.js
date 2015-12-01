var passport = require('passport');
var signupController = require('../models/signupController.js');

var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var playerArray = require('../public/assets/scripts/data/playerArray');

var connectionString=process.env.DATABASE_URL || 'postgres://localhost:5432/Darts';
//var connectionString=process.env.DATABASE_URL+"?ssl=true"|| 'postgres://localhost:5432/Darts';

router.use(jsonParser);
router.use(bodyParser.urlencoded({
    extended: true
}));


var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    req.flash('error', 'You have to be logged in to access the page.');
    res.redirect('/')
};

router.get('/createAccount', signupController.show);
router.post('/createAccount', signupController.signup);


router.post('/login',
    function(req, res, next) {
        passport.authenticate('local', function(err, user) {
            if (err) { return next(err) }
            if (!user) {
                res.local("username", req.param('username'));
                return res.render('login', { error: true });
            }

            // make passportjs setup the user object, serialize the user, ...
            req.login(user, {}, function(err) {
                if (err) { return next(err) };
                return res.redirect("/#/home");
            });
        })(req, res, next);
        return;
    }
);

//router.get("INSERT INTO stats (username, firstname, lastname, location) VALUES req.user.username, req.user.firstName, req.user.lastName, req.user.location");
//              username, firstname, lastname, location ($1, $2, $3, $4)
//              FROM  [req.user.username, req.user.firstName, req.user.lastName, req.user.location]
//              UPDATE stats

router.get('/stats', function(req, res){
    var results=[];

    pg.connect(connectionString, function(err, client, next){
        var query = client.query("SELECT * FROM stats");
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

/////if user name doesn't return a match at user to stats table with stats at 0


router.get('/getprofile', function(req, res){
    var results=[];

    pg.connect(connectionString, function(err, client, next){
        var query = client.query("SELECT * FROM stats WHERE username = $1", [req.user.username]);
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

//WORKS LOCALLY BUT NOT ON HEROKU

//router.post('/createuser', function(req, res){
//    var results=[];
//
//    pg.connect(connectionString, function(err, client, next){
//        var query = client.query("INSERT INTO stats (username, firstname, lastname, location, date) VALUES ($1,$2,$3,$4,$5)", [req.user.username, req.user.firstName, req.user.lastName, req.user.location, 'today']);
//        //var query = client.query("SELECT * FROM users");
//
//        query.on('row', function(row){
//            results.push(row);
//        });
//
//        query.on('end', function(){
//            client.end();
//            return res.json(results);
//        });
//
//        if(err) console.log(err);
//
//    })
//});


router.post('/createuser', function(req, res){
    var results=[];

    pg.connect(connectionString, function(err, client, next){
        var query = client.query("INSERT INTO stats (username, firstname, lastname, location, date) SELECT username, firstName, lastName, location, 'today' FROM users WHERE username = ($1)", [req.user.username]);
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

router.get("/players", function(req, res){
    res.send(playerArray);
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

