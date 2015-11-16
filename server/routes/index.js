var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var bodyParser = require('body-parser');
//var connectionString=process.env.DATABASE_URL || 'postgres://localhost:5432/Darts';
var connectionString=process.env.DATABASE_URL+"?ssl=true"|| 'postgres://localhost:5432/Darts';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({expanded: true}));


router.get('/stats', function(req, res){
    var results=[];

    pg.connect(connectionString, function(err, client, done){
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

router.get('/*', function(req, res, next){
    var file = req.params[0] || 'assets/views/index.html';
    res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;

