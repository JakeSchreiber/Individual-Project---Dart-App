var passport = require('passport');
var signupController = require('../models/signupController.js');

module.exports = function(express) {
    var router = express.Router();


    var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated())
            return next();
        req.flash('error', 'You have to be logged in to access the page.');
        res.redirect('/')
    };


    router.get('/home', signupController.show);
    router.post('/home', signupController.signup);


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
                    return res.redirect("/#/profile");
                });
            })(req, res, next);
            return;
        }
    );


    //router.get('/profile', isAuthenticated, function (req, res) {
    //    res.send(req.user);
    //});



    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/home');
    });


    return router;

};
