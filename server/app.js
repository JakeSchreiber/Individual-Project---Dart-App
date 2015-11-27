var express = require('express');
var app = express();
var index = require('./routes/index.js');

var setupPassport = require('./strategies/setupPassport');
var flash = require('connect-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jsonParser = bodyParser.json();

app.set("port", (process.env.PORT || 5000));

app.use(cookieParser());
app.use(session({ secret: '4564f6s4fdsfdfd', resave: false, saveUninitialized: false }));

app.use(flash());
app.use(function(req, res, next) {
    res.locals.errorMessage = req.flash('error');
    next();
});

app.use(jsonParser);
app.use(bodyParser.urlencoded({
    extended: true
}));

setupPassport(app);
//setupPassport;

app.use('/', index);

app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});

module.exports = app;