var bcrypt = require('bcrypt');

var Model = require('../strategies/models.js');

module.exports.show = function(req, res) {
    res.redirect('/#/home')
};

module.exports.signup = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var firstname = req.body.firstName;
    var lastname = req.body.lastName;
    var location = req.body.location;
    var email = req.body.email;


    if (!username || !password || !password2) {
        alert("Please, fill in all the fields.");
        console.log('error', "Please, fill in all the fields.");

        res.redirect('/#/home');
    }

    if (password !== password2) {
        alert("Please, enter the same password twice.");
        res.redirect('/#/home');
    }

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    var newUser = {
        username: username,
        salt: salt,
        password: hashedPassword,
        firstname: firstname,
        lastname: lastname,
        location: location,
        email: email
    };

    Model.User.create(newUser).then(function() {
        res.redirect('/#/login');
    }).catch(function(error) {
        alert("Please, choose a different username.");
        res.redirect('/#/home');
    })
};