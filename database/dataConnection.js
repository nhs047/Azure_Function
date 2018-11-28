const Sequelize = require('sequelize');

const sequelize = new Sequelize('serverless', 'nobihossain', 'Onto@123', {
    host: 'serverlesspoc.database.windows.net',
    dialect: 'mssql',
    dialectOptions: {
        encrypt: true
    },
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

module.exports.sequelize = sequelize;