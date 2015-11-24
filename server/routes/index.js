var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var playerArray = require('../public/assets/scripts/data/playerArray');


var connectionString=process.env.DATABASE_URL || 'postgres://localhost:5432/Darts';
//var connectionString=process.env.DATABASE_URL+"?ssl=true"|| 'postgres://localhost:5432/Darts';

//router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({expanded: true}));

router.use(jsonParser);
router.use(bodyParser.urlencoded({
    extended: true
}));


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

//TEST FOR GET PROFILE INFO////

router.get('/profileInfo', function(req, res){
    var results=[];

    pg.connect(connectionString, function(err, client, next){
        var query = client.query("SELECT * FROM users WHERE users.username = username");
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


//END PROFILE INFO TEST////






router.get("/players", function(req, res){
    res.send(playerArray);
});


router.get('/*', function(req, res){
    var file = req.params[0] || 'assets/views/index.html';
    res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;

