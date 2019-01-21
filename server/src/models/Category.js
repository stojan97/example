const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Forum = require('./Forum');

const Category = sequelize.define('category', {

    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
}, {
        timestamps: false,
        underscored: true
    }
);

Category.belongsTo(Forum);

module.exports = Category;