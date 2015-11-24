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

    //Profile Call on Sucess Attampt//


    //router.get('/login',
    //        passport.authenticate('local',
    //        function(req, res) {
    //
    //         res.render('/#/profile', { username: req.user.username });
    //}));

    //router.post('/login',
    //    passport.authenticate('local',
    //        function(req, res) {
    //
    //            res.redirect('/#/profile' + {user: req.user});
    //            console.log(username);
    //            //return res.send(user);
    //
    //        }));


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
                    console.log(req.user);
                    console.log(req.user.username);
                    console.log(req.user.location);
                    console.log(req.user.email);
                    //res.send({ user: req.user });
                    return res.redirect("/#/profile");
                    //return res.redirect("/#/profile", {user: req.user});
                    //return req.user;
                    //res.render('/#/profile', { user: req.user});

                });
            })(req, res, next);
            return;
        }
    );




    //Profile Call on Sucess Attampt End...working codeblock below//

    //router.post('/login', passport.authenticate('local', {
    //    successRedirect: '/#/profile',
    //    failureRedirect: '/#/home',
    //    failureFlash: true
    //}));

    //router.get('/', function(req, res) {
    //    res.render('home');
    //});


    /////CALL FOR PROFILE DATA HERE?????????



    router.get('/profile', isAuthenticated, function (req, res) {

        res.render('profile');
    });

    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/home');
    });


    router.get('/*', function (req, res) {
        var file = req.params[0] || 'assets/views/index.html';
        res.sendFile(path.join(__dirname, "../public/", file));
    });

    return router;

};
