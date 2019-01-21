const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Thread = require('./Thread');

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
        timestamps: false
    }
);

Category.hasMany(Thread, { foreignKey: 'category_id' });

module.exports = Category;