var Sequelize = require('sequelize'),
    sequelize = new Sequelize('postgres://localhost:5432/Darts')

module.exports = sequelize;