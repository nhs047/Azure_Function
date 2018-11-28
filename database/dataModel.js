const {sequelize} = require('./dataConnection');
const Sequelize = require('sequelize');
const ServerLessPoc = sequelize.define('ServerLessPoc', {
    id:{
        type:Sequelize.BIGINT,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    passportId: {
        type: Sequelize.STRING,
        allowNull: true
    },
    nId: {
        type: Sequelize.STRING,
        allowNull: true
    },

});
module.exports.ServerLessPoc = ServerLessPoc;