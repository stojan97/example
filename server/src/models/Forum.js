const Sequelize = require('sequelize');
const sequelize = require('../config/database');

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

module.exports = Forum;