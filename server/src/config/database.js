const Sequelize = require('sequelize');
const path = require('path');

const config = require('./config');

let database = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password, {
        host: config.development.host,
        dialect: config.development.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        }
    },
);

module.exports = database;