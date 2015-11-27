var Sequelize = require('sequelize'),
    sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/Darts');

module.exports = sequelize;