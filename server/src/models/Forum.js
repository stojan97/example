const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const Forum = sequelize.define('forum', {

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

Forum.hasMany(Category, { foreignKey: 'forum_id' });

module.exports = Forum;