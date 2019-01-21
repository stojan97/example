const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');

const Thread = sequelize.define('thread', {

    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATEONLY,
        field: 'created_at'
    }
}, {
        timestamps: true,
        updatedAt: false
    }
);

Thread.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Thread;