var UserMeta = require('./User.js');
var connection = require('./sequelize.js');

var User = connection.define('users', UserMeta.attributes, UserMeta.options);

module.exports.User = User;